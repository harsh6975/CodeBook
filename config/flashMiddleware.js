module.exports.flash=function(req,res,next){
  res.locals.flash={
      'sucess':req.flash('sucess'),
      'error':req.flash('error')
  }
  next();
}