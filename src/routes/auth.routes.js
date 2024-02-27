const verifySignUp = require("../middleware/verifySignUp.js");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {

  app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Requested-Method, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Max-Age', 86400);
  
  
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Requested-Method, Authorization');
      res.setHeader('Access-Control-Max-Age', 86400);
      res.setHeader('Content-Length', 0);
      res.end();
    } else {
      next();
    }
  });


  app.options('*', (req, res) => {
    res.sendStatus(200);
  });

  app.post(
    "/api/auth/signup",
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
