import { model, models, Schema, Types } from "mongoose";

export interface IAccount {
    userId: Types.ObjectId
    name: string
    image: string
    password: string
    provider: string
    providerAccountId: string
}

const AccountSchema = new Schema<IAccount>(
    {
        userId: { type: Types.ObjectId, ref: "User", require: true },
        name: { type: String, require: true },
        image: { type: String },
        password: { type: String, require: true },
        provider: { type: String, require: true },
        providerAccountId: { type: String, require: true },
    },
    {
        timestamps: true
    }
)

const Account = models?.Account || model<IAccount>("Account", AccountSchema)

export default Account