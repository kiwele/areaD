import express from "express";
import { register, Login, resetPassword, updateResetPassword } from "../controllers/auth.js";
import { verifyaccessToken } from "../middlewares/auth.js";
import { getUserProfile, updateProfile } from "../controllers/user.js";

const router =  express.Router()
router.get('/', (req, res) => {
    res.send('tumefika')
})
router.post('/register', register)
router.post('/login', Login)
router.post('/reset_password', resetPassword)
router.get('/reset_password/:id/:token', updateResetPassword)

router.get('/profile', verifyaccessToken, getUserProfile)
router.get('/update_profile', verifyaccessToken, updateProfile)


let userRouter = router;
export default userRouter