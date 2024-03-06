import mongoose from "mongoose";

const FriendRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sentTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);
export default FriendRequest;
