const mongoose = require("mongoose");
const generate = require("../helpers/generate");
const accountSche = new mongoose.Schema(
    {
        fullname: String,
        email: String,
        password: String,
        token: {
            type: String,
            default: generate.generateRandomer(20),
        },
        phone: String,
        avatar: String,
        role_id: String,
        status: String,
        deleted: {
            type: Boolean,
            default: false
        },
        deleteAt: Date
    },
    {
        timestamp: true
    }
)
const Account = mongoose.model("Account",accountSche,"Accounts");
module.exports = Account;