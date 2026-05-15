import mongoose from "mongoose"

export interface IUser {
    name: string
    username: string
    email: string
    bio?: string
    image?: string
    location?: string
    portfolio?: string
    reputation?: string
}

export interface IUserDoc extends IUser, mongoose.Document { }


const UserSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        bio: { type: String },
        image: { type: String },
        location: { type: String },
        portfolio: { type: String },
        reputation: { type: Number, default: 0 },
    },
    {
        timestamps: true
    }
)

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User