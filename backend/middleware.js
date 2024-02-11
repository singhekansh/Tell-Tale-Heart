const { getAuth } = require("firebase-admin/auth")

module.exports.authenticate = async (req, res, next) => {
  const header = req.header('Authorization')
  if(!header) return res.status(401).json({ message: 'You are not authorized.' })

  const idtoken = header.split(" ")[0]
  const auth = getAuth()
  auth
    .verifyIdToken(idtoken)
    .then((decodedtoken) => {
      auth.getUser(decodedtoken.uid)
        .then((userRecord) => {
          req.user = userRecord
          return next()
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