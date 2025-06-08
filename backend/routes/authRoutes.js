import express from "express";
import validator from "validator";
import bcrypt, { hash } from "bcryptjs";

const authRoues = express.Router();

authRoues.get("/signup", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Missing fields" });
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }
  if (password.length <= 6)
    return res
      .status(400)
      .json({ message: "Password must be more than 6 characters" });

  // If all conditions satisfied, has the password and store
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  console.log(hash);

  res.status(201).json({ message: "User registered successfully!" });
});

authRoues.get("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Missing fields" });
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  const loginResult = bcrypt.compareSync(
    password,
    hashedPassword
  );

  if(loginResult)
    return res.status(200).json({message:"Sign up successful"})
  return res.status(400).json({message:"Invalid credentails"})
});

export default authRoues;
