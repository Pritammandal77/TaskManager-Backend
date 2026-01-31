// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema(
//     {
//         email: {
//             type: String,
//             required: true,
//             unique: true,
//             lowercase: true,
//             trim: true,
//         },
//         password: {
//             type: String,
//             required: true,
//             select: false,
//         },
//         refreshToken: {
//             type: String,
//         },
//     },
//     { timestamps: true }
// );

// // Hash password
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 12);
//     next();
// });

// // Compare password
// userSchema.methods.comparePassword = function (password) {
//     return bcrypt.compare(password, this.password);
// };

// export const User = mongoose.model("User", userSchema);

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// ✅ Pre-save hook without next (async function)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // skip if not modified
  this.password = await bcrypt.hash(this.password, 12);
});

// ✅ Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export model
export const User = mongoose.model("User", userSchema);
