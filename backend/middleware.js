const { getAuth } = require("firebase-admin/auth")
const Club = require('./club/club.module')
const Society = require('./society/society.module')

const isClub = async (email) => {
  try {
    const club = await Club.findOne({ coordinator_email: email })
    if(!club) {
      return { data: null, status: false }  
    }
    return { data: club.name, status: true }
  } catch (err) {
    console.error(err)
    throw new Error('Error during querying clubs: ', err.message)
  }

}

const isSecretary = async (email) => {
  try {
    const soc = await Society.findOne({ secretary_email: email })
    if(!soc) {
      return { data: null, status: false }
    }
    return { data: soc.name, status: true }
  } catch(err) {
    console.error(err) 
    throw new Error('Error during querying societies: ', err.message)
  }
}

const assignUserType = async (res, email) => {
  if (email === process.env.csap_email) {
    return "CSAP"
  } else if (email === process.env.dean_students_email) {
    return "Dean Students"
  } else if (email === process.env.students_office_email) {
    return "Student Office"
  } else {
    var data, status
    var { data, status } = await isSecretary(email)
    if (status) {
      return `Secretary - ${data}`
    }
    var { data, status } = await isClub(email)
    if (status) {
      return `Cordinator - ${data}`
    }
  }
}

module.exports.authenticate = async (req, res, next) => {
  const header = req.header('Authorization')
  if (!header) return res.status(401).json({ message: 'You are not authorized.' })

  const [_, idtoken] = header.split(" ")
  const auth = getAuth()
  auth
    .verifyIdToken(idtoken)
    .then((decodedtoken) => {
      auth.getUser(decodedtoken.uid)
        .then((userRecord) => {
          req.name = userRecord.displayName
          req.email = userRecord.email
          try {
            req.user_type = assignUserType(res, userRecord.email)
            if(!req.user_type) return res.status(500).json({ message: 'You are not authorized.' })
            return next()
          } catch(err) {
            console.log('Failed to assign user type because ', err.message)
            res.status(500).json({ message: 'Server Error' })
          }
        })
        .catch((err) => {
          console.log('Failed to load user from id token because ', err.message)
          return res.status(500).json({ message: 'Server error.' })
        })
    })
    .catch(err => {
      console.log('Token Verification failed because ', err.message)
      return res.status(500).json({ message: 'Invalid token. Please login again.' })
    })

}

module.exports.isClub = isClub
module.exports.isSecretary = isSecretary
