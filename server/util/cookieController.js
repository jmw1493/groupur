const cookieController = {};

cookieController.setSSIDCookie = setSSIDCookie;
cookieController.setCookie = setCookie;


function setCookie(req, res, next) {
  let randomNum =  'dskaljfd';
  res.cookie('asdjgkl', randomNum, {maxAge: 120000});
  res.locals.cookieValue = randomNum;
  next();
}


function setSSIDCookie(req, res, next) {
   res.cookie('ssid', res.locals.user._id, {maxAge: 120000});
   next();
}

module.exports = cookieController;