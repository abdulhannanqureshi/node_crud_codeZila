const { generateToken } = require("../../helper/common.helper");
const { isEmailDuplicate, createUser, getUserDetails } = require("../../Model/users/user.model");
const bcryptjs = require("bcryptjs")

const signup = async (req, res) => {
    try {
        // Check Email duplicate
        const isEmailDuplicateCheck = await isEmailDuplicate(req.body.email)

        if (isEmailDuplicateCheck?.length) {
            return res.status(409).json({ success: false, message: 'Email already exist, choose another email!' })
        }

        //Password String convert into hash  string
        //Password ko direct store nahi karte hai hash password revers nahi hot hai
        req.body.password = await bcryptjs.hash(req.body.password, 10)
        const userResponse = await createUser(req.body)

        // Get user details for response of created user
        const getUserRes = await getUserDetails(userResponse?.insertId)
        delete getUserRes[0].password;

        res.status(200).json({
            success: true,
            message: 'Signup successful',
            data: getUserRes
        })

    } catch (error) {
        res.status(500).json({ success: false, message: 'There was an error', error: error.message });
    }
}


const login = async (req, res) => {
    try {
        const isEmailDuplicateCheck = await isEmailDuplicate(req.body.email)
        // 401 Unauthorized first email check 
        if (!isEmailDuplicateCheck?.length) {
            return res.status(401).json({ success: false, message: 'Invalid Credentials E' })
        }
        // Password match
        // body me pasowrd user se or is email me db se qk query se puri roe aegi
        const isPasswordMatch = await bcryptjs.compare(req.body.password, isEmailDuplicateCheck[0].password);
        if (!isPasswordMatch) return res.status(401).json({ success: false, message: 'Invalid Credentials P' });
        delete isEmailDuplicateCheck[0].password; // paswword delet karte hai qk passowrd respons me nahi dete hai 

        const userData = { ...isEmailDuplicateCheck[0] }

        // Iske through Token Generate hoge 
        const token = generateToken(userData, process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        )
        // Iske through refresh Token Generate hoge 
        const refreshToken = generateToken(userData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION });

        res.status(200).json({ success: true, message: "Login successfully", data: { ...userData, token, refreshToken } });

    } catch (error) {
        res.status(500).json({ success: false, message: 'There was an error', error: error.message });
    }
}

module.exports = { signup, login }