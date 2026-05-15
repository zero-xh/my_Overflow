import mongoose from "mongoose";

export interface IAnswer {
    author: mongoose.Types.ObjectId
    question: mongoose.Types.ObjectId
    content: string
    upvotes: number
    downvotes: number
}

const AnswerSchema = new mongoose.Schema<IAnswer>(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
        content: { type: String, required: true },
        upvotes: { type: Number, default: 0 },
        downvotes: { type: Number, default: 0 },
    },
    { timestamps: true }
)

const Answer = mongoose.models.Answer || mongoose.model<IAnswer>("Answer", AnswerSchema)

export default Answer