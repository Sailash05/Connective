import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
  follower: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who follows
  following: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who is followed
  createdAt: { type: Date, default: Date.now }
});

followSchema.index({ follower: 1, following: 1 }, { unique: true });
followSchema.index({ createAt: -1 });

const Follow = mongoose.model("Follow", followSchema);

export default Follow;