import userModel from "../models/user.model.js";
import nodeMailer from "nodemailer";
import JWT from "jsonwebtoken";

export const registerController = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName) {
      next("firstName is requried");
    }
    if (!lastName) {
      next("lastName is requried");
    }
    if (!email) {
      next("Email is required");
    }
    if (!password) {
      next("Password is required");
    }

    const existingUser = await userModel.findOne({ email }).select("+password");

    if (existingUser) {
      res.status(200).json({
        success: false,
        message: "This Email already registered",
      });
    }

    const user = await userModel.create({
      email,
      firstName,
      lastName,
      password,
    });
    user.password = undefined;

    const token = user.createJWT();
    let transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    let url = `http://localhost:8000/api/v1/auth/verify/${token}`;
    let mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "SUBJECT",
      text: "EMAIL BODY",
      html: url,
    };
    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("The email was sent successfully");
      }
    });
    res.status(201).json({
      success: true,
      message: "Sent a verification email to your email id",
      //   user,
      //   token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      next("Please Provide Email");
    }
    if (!password) {
      next("Please Provide Password");
    }
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      res
        .status(200)
        .json({ success: false, message: "Invalid Username or e Password" });
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res
        .status(200)
        .json({ success: false, message: "Invalid Username or Password" });
    }

    user.password = undefined;

    const token = user.createJWT();
    if (!user.verified) {
      res
        .status(200)
        .json({ success: false, message: "Please Verified your account" });
    }
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const verify = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next("Token is missing!");
  }
  let payload = null;
  try {
    payload = JWT.verify(id, process.env.JWT_SECRET);
  } catch (error) {
    next(error);
  }
  try {
    const user = await userModel.findOne({ _id: payload.userId });
    if (!user) {
      next("User does not exists");
    }
    await user.updateOne({ verified: true });
    return res.status(200).json({
      message: "Account Verified",
    });
  } catch (error) {
    next(error);
  }
};

export const userAuthController = (req, res) => {
  res.status(200).json({ ok: true });
};
