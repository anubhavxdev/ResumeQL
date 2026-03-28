const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const User = require("../models/User");

async function checkUser() {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email: "testadmin@example.com" });
  if (user) {
    console.log(`STATUS: ROLE=${user.role}, STATUS=${user.status}`);
  } else {
    console.log("STATUS: USER NOT FOUND");
  }
  process.exit(0);
}

checkUser();
