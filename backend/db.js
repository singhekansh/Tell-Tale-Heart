const mongoose = require('mongoose')
mongoose.set("strictQuery", false);

class Database {
    constructor(uri, options) {
        this.uri = uri;
        this.options = options;
    }

    async connect() {
        try {
            await mongoose.connect(this.uri, this.options);
            console.log(`Connected to ${mongoose.connection.db.databaseName} successfully!`);
        } catch (error) {
            console.log("Error connecting to database due to: ", error);
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
            console.log(`Disconnected from ${mongoose.connection.db.databaseName} successfully!`);
        } catch (error) {
            console.log("Error closing Database instance due to: ", error);  
        }
    }
}

module.exports = Database // Export the class to be used in other files