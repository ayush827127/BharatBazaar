import { Schema , model, models } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

const User = models.User || model("User", UserSchema);

export default User;