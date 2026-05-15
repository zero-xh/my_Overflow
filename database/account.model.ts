import mongoose from "mongoose";

export interface IAccount {
    userId: mongoose.Types.ObjectId
    name: string
    image?: string
    password: string
    provider: string
    providerAccountId: string
}

export interface IAccountDoc extends IAccount, mongoose.Document { }

const AccountSchema = new mongoose.Schema<IAccount>(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        image: { type: String },
        password: { type: String },
        provider: { type: String, required: true },
        providerAccountId: { type: String, required: true },
    },
    {
        timestamps: true
    }
)

const Account = mongoose.models.Account || mongoose.model<IAccount>("Account", AccountSchema)

export default Account