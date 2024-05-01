const Club = require("../club/club.module");
const { getLatestBlock, populateApprovalChain, nextApprovalBlock } = require("../utils");
const Proposal = require("./proposal.module");

let proposalController = {};

proposalController.getAllProposals = async (req, res) => {
  try {
    let data = await Proposal.find().populate('club', '_id name society').populate("club.society", "_id");
    data = await Promise.all(data.map(async (prp) => await populateApprovalChain(prp)))
    return res.json({ message: "Success", data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

proposalController.createNewProposal = async (req, res) => {


  const {
    title,
    bill,
    supplier,
    quantity,
    amount,
    description,
    category,
    section,
    head,
    fund,
    payment,
    type,
    purpose,
  } = req.body;

  try {
    const club_id = (await Club.findOne({ coordinator_email: req.email }, '_id'))?._id
    if(!club_id) return res.status(401).json({ message: "No club found associated with your email." })

    const data = await Proposal.create({
      title,
      bill,
      supplier,
      quantity,
      amount,
      description,
      category,
      section,
      head,
      fund,
      payment,
      type,
      purpose,
      club: club_id,
      updates: [{
        progress: [{ user: req.user_type, user_type: "club", remark: '', status: 'approved' }]
      }]
    });
    return res.json({
      message: `${data.name} proposal created successfully.`,
      data,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

proposalController.updateProposal = async (req, res) => {
  let newData = {};
  if (req.body.title) newData.title = req.body.title;
  if (req.body.bill) newData.bill = req.body.bill;
  if (req.body.supplier) newData.supplier = req.body.supplier;
  if (req.body.quantity) newData.quantity = req.body.quantity;
  if (req.body.amount) newData.amount = req.body.amount;
  if (req.body.description) newData.description = req.body.description;
  if (req.body.category) newData.category = req.body.category;
  if (req.body.section) newData.section = req.body.section;
  if (req.body.head) newData.head = req.body.head;
  if (req.body.fund) newData.fund = req.body.fund;
  if (req.body.payment) newData.payment = req.body.payment;
  if (req.body.type) newData.type = req.body.type;
  if (req.body.purpose) newData.purpose = req.body.purpose;

  try {
    const data = await Proposal.findByIdAndUpdate(req.params.id, newData);
    return res.json({
      message: `${data.name} proposal updated successfully.`,
      data,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

proposalController.deleteProposal = async (req, res) => {
  try {
    const data = await Proposal.findByIdAndDelete(req.params.id);
    return res.json({
      message: `${data.name} proposal delete successfully.`,
      data,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

proposalController.approveProposal = async (req, res, next) => {
  try {
    const proposal = await Proposal.findById(req.params.id, '_id updates club amount').populate('club', '_id name society').populate('club.society', '_id name')
    if(!proposal) return next(new Error("No such Proposal."))

    const latestChain = getLatestBlock(proposal.updates)
    const proposedChain = nextApprovalBlock(latestChain.progress, proposal.amount, proposal.club.name, proposal.club.society.name, assignIds = false)
    
    if(!proposedChain) {
      return next(new Error("Proposal has already been terminated."))
    }
    const blk = getLatestBlock(proposedChain)
    if(blk.user === req.user_type) {
      blk.status = "approved"
      blk.remark = req.body.remark ?? ""
      await proposal.save()
      return res.json({ message: "Proposal approved." })
    } else {
      return next(new Error("You are not authorized to do this action."))
    } 
  } catch(err) {
    console.log(err)
    return next(err)
  }
}

proposalController.rejectProposal = async (req, res, next) => {
  try {
    const proposal = await Proposal.findById(req.params.id, '_id updates club amount').populate('club', '_id name society').populate('club.society', '_id name')
    if(!proposal) return next(new Error("No such Proposal."))

    const latestChain = getLatestBlock(proposal.updates)
    const proposedChain = nextApprovalBlock(latestChain.progress, proposal.amount, proposal.club.name, proposal.club.society.name, assignIds = false)
    
    if(!proposedChain) {
      return next(new Error("Proposal has already been terminated."))
    }
    const blk = getLatestBlock(proposedChain)
    if(blk.user === req.user_type) {
      blk.status = "rejected"
      blk.remark = req.body.remark ?? ""

      proposal.updates.push({
        progress: {
          user: proposedChain[0].user,
          user_type: proposedChain[0].user_type,
          remark: "",
          status: 'waiting'
        }
      })

      await proposal.save()
      return res.json({ message: "Proposal rejected." })
    } else {
      return next(new Error("You are not authorized to do this action."))
    } 
  } catch(err) {
    console.log(err)
    return next(err)
  }
}

module.exports = proposalController;
