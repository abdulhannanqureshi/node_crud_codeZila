const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // split isliye kiy ahi qk bear work token ke sath ata hai to use remove karne k liye splite ka use 
    const token = req.headers?.authorization && req.headers.authorization.split(' ')[1]

    //token check karege aya hai ya nahi
    if (!token) return res.status(401).json({ status: false, message: 'Token not provided' });

    // jwt plugin se token verify karege  
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) return res.status(403).json({ status: false, message: "Invalid Token" })
        req.data = data;
        next()
    })
}

module.exports = { verifyToken };