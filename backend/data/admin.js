import bcrypt from "bcryptjs";

const admin = {
  email: "admin@footballfans.com",
  passwordHash: bcrypt.hashSync("admin123", 10),
};

export default admin;
