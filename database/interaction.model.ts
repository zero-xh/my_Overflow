import mongoose from "mongoose";

export interface Iinteraction {
    user: mongoose.Types.ObjectId
    action: string
    actionId: mongoose.Types.ObjectId
    actionType: string
}

const interactionSchema = new mongoose.Schema<Iinteraction>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
        action: { type: String, required: true },
        actionId: { type: mongoose.Schema.Types.ObjectId, require: true },
        actionType: { type: String, enum: ["question", "answer"], require: true }
    },
    {
        timestamps: true
    }
)

const interaction = mongoose.models.interaction || mongoose.model<Iinteraction>("interaction", interactionSchema)

export default interaction