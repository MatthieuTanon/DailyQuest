import mongoose from 'mongoose';

export interface IQuest extends mongoose.Document {
    id: Number,
    name: String,
    description: String
}

export const questSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true}
});

export const Quest = mongoose.model<IQuest>('Quest', questSchema);