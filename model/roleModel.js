const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        permission: {
            type: Array,
            default: []
        },
        deleted: {
            type: Boolean,
            default: false
        },
        datedelete: Date
    },
    {
        timestamp: true
    }
)
const Role = mongoose.model("Role",roleSchema,"Roles");
module.exports = Role;