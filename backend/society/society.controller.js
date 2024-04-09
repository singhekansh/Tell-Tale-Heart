const Society = require('./society.module');

let societyController = {};

societyController.getAllSocieties = async (req, res, next) => {
  try {
    let data = await Society.find();
    data = await Promise.all(data.map(async (soc) => 
      ({ ...soc.toObject(),  spent: await soc.getBudgetSpent() })
    ))
    return res.json({ message: 'Success', data });
  } catch (err) {
    next(err)
  }
};

societyController.createSociety = async (req, res, next) => {
  const { name, budget, fa_email, secretary_email } = req.body;

  try {
    const data = await Society.create({ name, budget, fa_email, secretary_email });
    return res.json({ 
      message: `${data.name} society created successfully.`, 
      data: { ...data.toObject(), spent: 0 } 
    });
  } catch (err) {
    next(err)
  }
};

societyController.updateSociety = async (req, res, next) => {
  let newData = {};
  if (req.body.name) newData.name = req.body.name;
  if (req.body.budget) newData.budget = req.body.budget;
  if (req.body.fa_email) newData.fa_email = req.body.fa_email;
  if (req.body.secretary_email) newData.secretary_email = req.body.secretary_email;

  try {
    const data = await Society.findByIdAndUpdate(req.params.id, newData, { new: true });
    return res.json({ 
      message: `${data.name} society updated successfully.`, 
      data: { ...data.toObject(), spent: (await data.getBudgetSpent()) }
    });
  } catch (err) {
    next(err)
  }
};

societyController.deleteSociety = async (req, res, next) => {
  try {
    const data = await Society.findByIdAndDelete(req.params.id);
    return res.json({ message: `${data.name} society deleted successfully.` });
  } catch (err) {
    next(err)
  }
};

module.exports = societyController;
