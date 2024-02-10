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
    club,
    updates
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
      club,
      updates
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
  if (req.body.club) newData.club = req.body.club;
  if (req.body.updates) newData.updates = req.body.updates;

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

module.exports = proposalController;
