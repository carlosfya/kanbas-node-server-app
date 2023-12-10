import mongoose from "mongoose";
const schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    postId: String,
    title: String,
  },
  { collection: "likes" }
);

export default schema;