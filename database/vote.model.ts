import mongoose from "mongoose";

export interface IVote {
    author: mongoose.Types.ObjectId
    actionId: mongoose.Types.ObjectId
    actionType: "question" | "answer"
    voteType: "upvote" | "downvote"
}

export interface IVoteDoc extends IVote, mongoose.Document { }

const VoteSchema = new mongoose.Schema<IVote>(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        actionId: { type: mongoose.Schema.Types.ObjectId, required: true },
        actionType: { type: String, enum: ["question", "answer"], required: true },
        voteType: { type: String, enum: ["upvote", "downvote"], required: true }
    },
    {
        timestamps: true
    }
)

const Vote = mongoose.models.Vote || mongoose.model<IVote>("Vote", VoteSchema)

export default Vote