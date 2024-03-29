import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    profileImage: { type: String },
    occupation: { type: String, },
    address: { type: String, },
    email: { type: String, },
    phoneNumber: { type: String, },
    profileDescription: { type: String, },
    socialNetworks: { type: Array, },
    academicEducation: { type: Array, },
    skills: { type: Array, },
    workExperiences: { type: Array, },
    certificates: { type: Array, },
    projects: { type: Array, },
  },
  { collection: "user" }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
