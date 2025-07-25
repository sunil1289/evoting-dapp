// import mongoose from "mongoose";
// const Schema = mongoose.Schema;

// const adminSchema = mongoose.Schema(
//   {
//     chatBotQuestions: [{ type: String }],
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "users",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Admin = mongoose.model("admin", adminSchema);

// export default Admin;
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store plain text password
  user_type: { type: String, default: "admin" },
});

export default mongoose.model("Admin", adminSchema);