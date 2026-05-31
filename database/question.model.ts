import mongoose from "mongoose";

export interface ITag {
    _id: mongoose.Types.ObjectId;
    name: string;
}

export interface IAuthor {
    _id: mongoose.Types.ObjectId;
    name: string;
    image?: string;
}

export interface IQuestion {
    title: string
    content: string
    tags: (mongoose.Types.ObjectId | ITag)[]
    views: number
    upvotes: number
    downvotes: number
    answers: number
    author: mongoose.Types.ObjectId | IAuthor
    createdAt?: Date
    updatedAt?: Date
}

export interface IQuestionDoc extends IQuestion, mongoose.Document { }

const QuestionSchema = new mongoose.Schema<IQuestion>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
        views: { type: Number, default: 0 },
        upvotes: { type: Number, default: 0 },
        downvotes: { type: Number, default: 0 },
        answers: { type: Number, default: 0 },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: true
    }
)

const Question = mongoose.models.Question || mongoose.model<IQuestion>("Question", QuestionSchema)

export default Question