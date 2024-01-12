const jwt = require('jsonwebtoken');

const middlewareController = {
  // Custom middleware
  customMiddleware: (req, res, next) => {
    const sessionId = req.cookies['connect.sid'];

    if (sessionId) {
      sessionStore.get(sessionId, (err, sessionData) => {
        if (err) {
          console.error('Lỗi khi truy cập dữ liệu phiên:', err);
          return res.status(500).json("Lỗi server");
        }
        req.user = sessionData.user;

        next();
      });
    } else {
      res.status(401).json("Bạn chưa đăng nhập.");
    }
  },

  // verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.token || req.headers.authorization;

    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json("Token không đúng");
        }
        req.user = decoded;
        next();
      });
    } else {
      res.status(401).json("Bạn chưa được xác thực");
    }
  },

  // checkAuthentication
  checkAuthentication: (req, res, next) => {
    if (!req.user) {
      res.status(401).json("Bạn chưa đăng nhập.");
    } else {
      next();
    }
  },
};

module.exports = middlewareController;
