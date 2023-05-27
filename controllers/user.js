import db from "../database.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import Jwt from "jsonwebtoken";
import { generateAccessToken } from "../middlewares/auth.js";
import { sendResetEmail } from "../middlewares/sendEmail.js";

const User = db.User;

const getUserProfile = async (req, res) => {
  let data = await User.findOne({
    where: {
      userId: req.userDetails.id,
    },
  });
  return res.status(200).json({
    data,
  });
};

const updateProfile = async (req, res) => {
  let { name, email, phone } = req.body;

  try {
    await User.update(
      {
        fullName: name,
        email: email,
        phone: phone,
      },
      {
        where: {
          userId: req.userDetails.id,
        },
      }
    );

    return res.status(200).json({
      staus: "success",
      message: "profile successifully updated",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
};

export { getUserProfile, updateProfile };
