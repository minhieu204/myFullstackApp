require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) =>{

    const white_lists = ["/", "/register", "/login", ""]
    if (white_lists.find(item => '/v1/api' + item === req.originalUrl)){
        next();
    }else {
        if (req?.headers?.authorization?.split(' ')?.[1]){
            const token = req.headers.authorization.split(' ')[1];
            //verify
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET, );
                next();
            } catch (error) {
                return res.status(401).json({
                    message: "Token het han hoac khong hop le"
                })   
            }
            
        }else{
            //return exception
            return res.status(401).json({
                message: "Chua truyen Access Token hoac het han"
            })
        }
    }


}

module.exports = auth;