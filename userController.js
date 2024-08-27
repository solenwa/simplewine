const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("./database/userQueries")

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  };

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { firstName,lastName, email, password } = req.body;
  
    if (!firstName || !lastName || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
  
    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    // create hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
  
    if (user) {
      res.status(201).json({
        customer_id: user.customer_id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });

//Authenticate User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
  
    // Check for user email
    const user = await User.findOne({ email });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        customer_id: user.customer_id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  });

  // Get current user data
  const getLoggedInUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json({
      id: _id,
      name,
      email,
    });
  });

  module.exports = {
    registerUser,
    loginUser,
    getLoggedInUser,
  };