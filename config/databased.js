const mongoose = require("mongoose");
module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGOLINKED);
        console.log("Success to connect");
    } catch (error) {
        console.log("Fail to connect");
    }
}

