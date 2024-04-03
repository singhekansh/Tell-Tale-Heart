require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./backend/app')
const Database = require('./backend/db')
const port = process.env.PORT || 5000

const db = new Database(process.env.MONGODB_URI);

db.connect().catch((error) => {
  console.log("Error connecting to database due to: ", error);
});

process.on("SIGINT", async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from database!");
    process.exit(0);
  } catch (error) {
    console.log("Error disconnecting from database due to: ", error);
    process.exit(1);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})