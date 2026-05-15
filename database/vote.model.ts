import mongoose from "mongoose";

export interface IVote {
    author: mongoose.Types.ObjectId
    id: mongoose.Types.ObjectId
    type: "question" | "answer"
    voteType: "upvote" | "downvote"
}

export interface IVoteDoc extends IVote, mongoose.Document { }

const VoteSchema = new mongoose.Schema<IVote>(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        id: { type: mongoose.Schema.Types.ObjectId, required: true },
        type: { type: String, enum: ["question", "answer"], required: true },
        voteType: { type: String, enum: ["upvote", "downvote"], required: true }
    },
    {
        timestamps: true
    }
)

const Vote = mongoose.models.Vote || mongoose.model<IVote>("Vote", VoteSchema)

export default Vote