const cookieController = {};

cookieController.setSSIDCookie = setSSIDCookie;
cookieController.setCookie = setCookie;


function setCookie(req, res, next) {
  let randomNum =  Math.floor(Math.random()*10).toString();
  let randomName = Math.floor(Math.random()*100).toString();
  res.cookie(randomName, randomNum, {maxAge: 120000});
  res.locals.cookieValue = randomNum;
  next();
}


function setSSIDCookie(req, res, next) {
  console.log('in setssidcookie')
  console.log('res.locals.user._id: ' + res.locals.user._id)
   res.cookie('ssid', res.locals.user._id, {maxAge: 120000});
   next();
}

module.exports = cookieController;