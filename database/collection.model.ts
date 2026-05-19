import mongoose from "mongoose";

export interface ICollection {
    userId: mongoose.Types.ObjectId
    name: string
    description?: string
    questions: mongoose.Types.ObjectId[]
}

export interface ICollectionDoc extends ICollection, Document { }
const CollectionSchema = new mongoose.Schema<ICollection>(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    },
    { timestamps: true }
);

const Collection = mongoose.models.Collection || mongoose.model<ICollection>("Collection", CollectionSchema)

export default Collection