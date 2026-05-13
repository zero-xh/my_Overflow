import { model, models, Schema, Types } from "mongoose";

export interface Iinteraction {
    user: Types.ObjectId
    action: string
    actionId: Types.ObjectId
    actionType: string
}

const interactionSchema = new Schema<Iinteraction>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", require: true },
        action: { type: String, required: true },
        actionId: { type: Schema.Types.ObjectId, require: true },
        actionType: { type: String, enum: ["question", "answer"], require: true }
    },
    {
        timestamps: true
    }
)

const interaction = models?.interaction || model<Iinteraction>("interaction", interactionSchema)

export default interaction