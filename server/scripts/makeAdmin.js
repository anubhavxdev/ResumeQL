const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const User = require("../models/User");

const promoteUser = async (email) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");

    const user = await User.findOneAndUpdate(
      { email },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      console.log("User not found!");
    } else {
      console.log(`Success! User ${user.email} is now an ADMIN.`);
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const email = process.argv[2];
if (!email) {
  console.log("Usage: node makeAdmin.js <email>");
  process.exit(1);
}

promoteUser(email);
