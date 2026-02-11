import bcrypt from "bcryptjs";

router.post("/reset-admin-password", async (req, res) => {
  const hashed = await bcrypt.hash("Admin123!", 10);

  await User.findOneAndUpdate(
    { email: "admin@test.com" },
    { password: hashed }
  );

  res.json({ message: "Admin password reset to Admin123!" });
});
