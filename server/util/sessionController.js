const Session = require('./sessionModel');

const sessionController = {};

sessionController.verifySession = (req, res) => {
  console.log(req.cookies)
  Session.findOne({cookieId: req.cookies}, (err, result) => {
    if(err || !result){
      return res.send({
        activeSession: false
      });
    }
    res.send({
      activeSession: true
    });
  });
};

sessionController.startSession = (req, res, next) => {
  Session.create({cookieId: res.locals.user._id}, (err, createdSession) => {
    if(err) console.log(err);
    if(createdSession) {
      return res.send({activeSession: true});
    }
    else res.status(500).send('Username already in use'); //Need to handle when username already exists
  });
};

module.exports = sessionController;