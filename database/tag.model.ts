import mongoose from "mongoose";

export interface ITag {
    name: string
    questions: number
}

export interface ITagDoc extends ITag, mongoose.Document { }

const TagSchema = new mongoose.Schema<ITag>(
    {
        name: { type: String, requie: true, unique: true },
        questions: { type: Number, default: 0 }
    },
    {
        timestamps: true
    }
)

const Tag = mongoose.models.Tag || mongoose.model<ITag>("Tag", TagSchema)

export default Tag