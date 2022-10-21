import mongoose from "mongoose";

const user = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    pass: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("User", user);