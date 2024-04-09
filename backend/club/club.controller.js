const Club = require('./club.module')

let clubController = {}

clubController.getAllClubs = async (req, res, next) => {
  try {
    let data = await Club.find().populate('society');
    data = await Promise.all(data.map(async (i) => { 
      return { ...i.toObject(), spent: await i.getBudgetSpent() }
    }))
    return res.json({ message: 'Success', data })
  } catch(err) {
    next(err)
  }
}

clubController.createNewClub = async (req, res, next) => {
  const { name, society, budget, fa_email, coordinator_email } = req.body

  try {
    const data = await Club.create({ name, society, budget, fa_email, coordinator_email })
    return res.json({ 
      message: `${data.name} club created successfully.`, 
      ...data.toObject(),
      spent: 0 
    })
  } catch (err) {
    next(err)
  }
}

clubController.updateClub = async (req, res, next) => {
  let newData = {}
  if(req.body.name) newData.name = req.body.name
  if(req.body.society) newData.society = req.body.society
  if(req.body.budget) newData.budget = req.body.budget
  if(req.body.fa_email) newData.fa_email = req.body.fa_email
  if(req.body.coordinator_email) newData.coordinator_email = req.body.coordinator_email

  try {
    const data = await Club.findByIdAndUpdate(
      req.params.id,
      newData
    )
    return res.json({ 
      message: `${data.name} club updated successfully.`, 
      ...data.toObject(),
      spent: data.getBudgetSpent()
    })
  } catch (err) {
    next(err)
  }
}

clubController.deleteClub = async (req, res, next) => {
  try {
    const data = await Club.findByIdAndDelete(req.params.id)
    return res.json({ message: `${data.name} club deleted successfully.`, data })
  } catch (err) {
    next(err)
  }
}

module.exports = clubController