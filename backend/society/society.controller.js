const Society = require('./society.module');

let societyController = {};

societyController.getAllSocieties = async (req, res) => {
  try {
    const data = await Society.find();
    return res.json({ message: 'Success', data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

societyController.createSociety = async (req, res) => {
  const { name, budget, fa_email, secretary_email } = req.body;

  try {
    const data = await Society.create({ name, budget, fa_email, secretary_email });
    return res.json({ message: `${data.name} society created successfully.`, data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

societyController.updateSociety = async (req, res) => {
  let newData = {};
  if (req.body.name) newData.name = req.body.name;
  if (req.body.budget) newData.budget = req.body.budget;
  if (req.body.fa_email) newData.fa_email = req.body.fa_email;
  if (req.body.secretary_email) newData.secretary_email = req.body.secretary_email;

  try {
    const data = await Society.findByIdAndUpdate(req.params.id, newData, { new: true });
    return res.json({ message: `${data.name} society updated successfully.`, data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

societyController.deleteSociety = async (req, res) => {
  try {
    const data = await Society.findByIdAndDelete(req.params.id);
    return res.json({ message: `${data.name} society deleted successfully.` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = societyController;
