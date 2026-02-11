const { email, password } = req.body;

const cleanEmail = email.trim().toLowerCase();

console.log("LOGIN EMAIL RECEIVED:", cleanEmail);

const user = await User.findOne({ email: cleanEmail });

if (!user) {
  return res.status(401).json({ message: "Invalid credentials" });
}

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  return res.status(401).json({ message: "Invalid credentials" });
}

const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

res.json({ token });
