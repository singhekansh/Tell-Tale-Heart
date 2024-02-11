const { getLatestBlock } = require("../utils");
const Proposal = require("./proposal.module");

let proposalController = {};

proposalController.getAllProposals = async (req, res) => {
  try {
    const data = await Proposal.find();
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
      club_email: req.email,
      updates: {
        progress: [{ user: req.name, user_type: req.user_type, remark: '', status: 'Approved' }]
      }
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
    const data = await Proposal.findByIdAndDelete(req.param.id);
    return res.json({
      message: `${data.name} proposal delete successfully.`,
      data,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

proposalController.approveBySecretary = async (req, res) => {
  try {
    if (!req.user_type.contains('Secretary'))
      return res.status(401).json({ message: 'You are not authorized.' })

    const proposal = await Proposal.findById(req.params.id)
    const updateChain = getLatestBlock(proposal.updates)
    const progressBlock = getLatestBlock(updateChain.progress)

    if (progressBlock.user_type.contains('Cordinator') && progressBlock.status === 'Approved') {
      updateChain.push({ user: req.user, user_type: req.user_type, status: 'Approved', remark: req.body.remark })
      const updatedProposal = await proposal.save()
      return res.json({ message: 'success', data: updatedProposal })
    } else {
      return res.status(500).json({ message: 'You are not allowed to approve yet.' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

proposalController.approveByClubFA = async (req, res) => {
  try {
    if (!req.user_type.contains('Club FA'))
      return res.status(401).json({ message: 'You are not authorized.' })

    const proposal = await Proposal.findById(req.params.id)
    const updateChain = getLatestBlock(proposal.updates)
    const progressBlock = getLatestBlock(updateChain.progress)

    if (progressBlock.user_type.contains('Secretary') && progressBlock.status === 'Approved') {
      updateChain.push({ user: req.user, user_type: req.user_type, status: 'Approved', remark: req.body.remark })
      const updatedProposal = await proposal.save()
      return res.json({ message: 'success', data: updatedProposal })
    } else {
      return res.status(500).json({ message: 'You are not allowed to approve yet.' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

proposalController.approveBySocietyFA = async (req, res) => {
  try {
    if (!req.user_type.contains('Society FA'))
      return res.status(401).json({ message: 'You are not authorized.' })
    const proposal = await Proposal.findById(req.params.id)
    const updateChain = getLatestBlock(proposal.updates)
    const progressBlock = getLatestBlock(updateChain.progress)

    if (progressBlock.user_type.contains('Club FA') && progressBlock.status === 'Approved') {
      updateChain.push({ user: req.user, user_type: req.user_type, status: 'Approved', remark: req.body.remark })
      const updatedProposal = await proposal.save()
      return res.json({ message: 'success', data: updatedProposal })
    } else {
      return res.status(500).json({ message: 'You are not allowed to approve yet.' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

proposalController.approveByCSAP = async (req, res) => {
  try {
    if (!req.user_type.contains('CSAP'))
      return res.status(401).json({ message: 'You are not authorized.' })
    const proposal = await Proposal.findById(req.params.id)
    const updateChain = getLatestBlock(proposal.updates)
    const progressBlock = getLatestBlock(updateChain.progress)

    if (progressBlock.user_type.contains('Society FA') && progressBlock.status === 'Approved') {
      updateChain.push({ user: req.user, user_type: req.user_type, status: 'Approved', remark: req.body.remark })
      const updatedProposal = await proposal.save()
      return res.json({ message: 'success', data: updatedProposal })
    } else {
      return res.status(500).json({ message: 'You are not allowed to approve yet.' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

proposalController.approveByDeanStudents = async (req, res) => {
  try {
    if (!req.user_type.contains('Dean Students'))
      return res.status(401).json({ message: 'You are not authorized.' })
    const proposal = await Proposal.findById(req.params.id)
    const updateChain = getLatestBlock(proposal.updates)
    const progressBlock = getLatestBlock(updateChain.progress)

    if (progressBlock.user_type.contains('CSAP') && progressBlock.status === 'Approved') {
      updateChain.push({ user: req.user, user_type: req.user_type, status: 'Approved', remark: req.body.remark })
      const updatedProposal = await proposal.save()
      return res.json({ message: 'success', data: updatedProposal })
    } else {
      return res.status(500).json({ message: 'You are not allowed to approve yet.' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = proposalController;
