import mongoose from "mongoose";

export interface ICollection {
    userId: mongoose.Types.ObjectId
    name: string
    description?: string
    questions: mongoose.Types.ObjectId[]
}

export interface ICollectionDoc extends ICollection, mongoose.Document { }

const CollectionSchema = new mongoose.Schema<ICollection>(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        description: { type: String },
        questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
    },
    {
        timestamps: true
    }
)

const Collection = mongoose.models.Collection || mongoose.model<ICollection>("Collection", CollectionSchema)

export default Collection