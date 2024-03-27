import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    profileImage: { type: String },
    bio: { type: String, },
  },
  { collection: "user" }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
