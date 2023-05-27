import db from "../database.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import Jwt from "jsonwebtoken";
import { generateAccessToken } from "../middlewares/auth.js";
import { sendResetEmail } from "../middlewares/sendEmail.js";

const User = db.User;

// check for the empty body data
const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// register controller
const register = async (req, res) => {
  try {
    if (isEmpty(req.body) === true) {
     return res.status(400).json({ message: "enter data to register" });
    }

    // check if user exist
    let userExist = await User.findOne({
      where: {
        [Op.or]: [
          { email: req.body.email },
          { phone: req.body.phone }
        ]
      }
    });

    if (userExist !== null) {
    return res.status(400).json({ message: "user already exist" });
    }

    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      // add user to the database

      let newUser = {
        fullName: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hash,
        country: req.body.country,
        city: req.body.country,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        // verification_status: req.body.verification_status,
      };

      await User.create(newUser);

    return  res.status(200).json({
        status: 'success',
        message: "registered successifully",
      });
    });
  } catch (error) {
    return res.status(500).json({ 
      status: 'error',
      messgae: "internal server error" });
  }
};

const Login = async (req, res) => {
  try {
    if (isEmpty(req.body) === true) {
      res.status(400).json({ message: "enter data to login" });
    }
    // check if user exist
    let userExist = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExist === null) {
     return res
        .status(400)
        .json({ message: "You have no account yet, please register" });
    }

    if (userExist !== null) {
      bcrypt.compare(req.body.password, userExist.password, async (err, result) => {
        if (result === true) {
          const accessToken = Jwt.sign(
            {
              email: userExist.dataValues.email,
              id: userExist.dataValues.userId,
              // role: userExist.dataValues.roleId,
            },
            process.env.ACCESS_TOKEN_SECRETE,
            { expiresIn: "1h" }
          );

          const expiration = 3600000;
          // eslint-disable-next-line quotes
          res.cookie("accessToken", accessToken, {
            secure: true,
            httpOnly: true,
            expires: new Date(Date.now() + expiration),
          });

         return res.status(200).json({
            status: 'success',
            mesage: "successifully login",
            data: userExist,
          });
        } else {
         return res.status(400).json({ 
            status: 'error',
            message: "invalid password" });
        }
      });
    }
  } catch (error) {
  return res.status(500).json({ 
      status: 'error',
      message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const userExist = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExist !== null) {
      let id = userExist.dataValues.userId;
      let hassPassword = userExist.dataValues.password;
      let email = req.body.email;

      let secrete = process.env.RESET_TOKE_SECETE + hassPassword;

      let token = Jwt.sign(
        {
          id: id,
          email: email,
        },
        secrete,
        { expiresIn: "5min" }
      );

      let link = `${process.env.BASE_URL}/reset_password/${id}/${token}`;

      await sendResetEmail(email, link);

     return res
        .status(200)
        .json({ 
          status:'success',
          message: "reset link has been sent to your email" });
    }
  } catch (error) {
   return res.status(500).json({ 
      status:'error',
      message: error.message });
  }
};

const updateResetPassword = async (req, res) => {

  try {
    const userExist = await User.findOne({
      where: { userId: req.params.id },
    });

    if (userExist !== null) {
      let hassPassword = userExist.dataValues.password;
      let secrete = process.env.RESET_TOKE_SECETE + hassPassword;

      Jwt.verify(req.params.token, secrete, async (err, result) => {
        if (err) {
          return res.status(400).json({ message: "invalid token" });
        }

        bcrypt.hash(req.body.newPassword, 10, async (err, hash) => {
          if (err) throw err;

          // update password
          await User.update(
            {
              password: hash,
            },
            {
              where: {
                userId: req.params.id,
              },
            }
          );

         return res.status(200).json({ 
            status:'success',
            message: "password successifully reseted" });
        });
      });
    }
  } catch (error) {

    return res.status(500).json({ 
      status:'error',
      message: error.message });

  }
};
export { register, Login, resetPassword, updateResetPassword };
