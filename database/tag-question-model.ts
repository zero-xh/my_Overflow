import mongoose from "mongoose";

export interface ITagQuestion {
    tag: mongoose.Types.ObjectId
    question: mongoose.Types.ObjectId
}

export interface ITagQuestionDoc extends ITagQuestion, mongoose.Document { }

const TagQuestionSchema = new mongoose.Schema<ITagQuestion>(
    {
        tag: { type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true },
        question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    },
    {
        timestamps: true
    }
)

const TagQuestion = mongoose.models.TagQuestion || mongoose.model<ITagQuestion>("TagQuestion", TagQuestionSchema)

export default TagQuestion