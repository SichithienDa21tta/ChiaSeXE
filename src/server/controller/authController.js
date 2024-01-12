//./server/contronller/authContronller.js
var User = require('../model/userDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {

loginUser: async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
          return  res.status(404).json("Sai username!");
        }
        const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
        ); 
            if (!validPassword) { 
              return res.status(404).json("Sai password");
            }
            if (user && validPassword){
             const accessToken =  jwt.sign({
                id: user.id,
                admin: user.admin
               },
               process.env.JWT_SECRET,
               { expiresIn: "20d" }
               );
               
                // Chỉ chuyển hướng nếu cả hai điều kiện đều đúng
                res.status(200).json({user, accessToken});
            }      
    } catch (err) {
      console.log(err);
        res.status(500).json(err);
    }
}

}
module.exports = authController;