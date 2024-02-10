const Club = require('./club.module')

let clubController = {}

clubController.getAllClubs = async (req, res) => {
  try {
    const data = await Club.find();
    return res.json({ message: 'Success', data })
  } catch(err) {
    return res.status(500).json({ message: err.message })
  }
}

clubController.createNewClub = async (req, res) => {
  const { name, society, budget, fa_uid, coordinator_uid } = req.body

  try {
    const data = await Club.create({ name, society, budget, fa_uid, coordinator_uid })
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
  if(req.body.fa_uid) newData.fa_uid = req.body.fa_uid
  if(req.body.coordinator_uid) newData.coordinator_uid = req.body.coordinator_uid

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