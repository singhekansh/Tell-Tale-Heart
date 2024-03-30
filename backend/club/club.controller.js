const Club = require('./club.module')

let clubController = {}

clubController.getAllClubs = async (req, res) => {
  try {
    const data = await Club.find({}).populate('society');
    return res.json({ message: 'Success', data })
  } catch(err) {
    return res.status(500).json({ message: err.message })
  }
}

clubController.createNewClub = async (req, res) => {
  const { name, society, budget, fa_email, coordinator_email } = req.body

  try {
    const data = await Club.create({ name, society, budget, fa_email, coordinator_email })
    return res.json({ message: `${data.name} club created successfully.`, data })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

clubController.updateClub = async (req, res) => {
  let newData = {}
  if(req.body.name) newData.name = req.body.data
  if(req.body.society) newData.society = req.body.society
  if(req.body.budget) newData.budget = req.body.budget
  if(req.body.fa_email) newData.fa_email = req.body.fa_email
  if(req.body.coordinator_email) newData.coordinator_email = req.body.coordinator_email

  try {
    const data = await Club.findByIdAndUpdate(
      req.params.id,
      newData
    )
    return res.json({ message: `${data.name} club updated successfully.`, data })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

clubController.deleteClub = async (req, res) => {
  try {
    const data = await Club.findByIdAndDelete(req.param.id)
    return res.json({ message: `${data.name} club delete successfully.`, data })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = clubController