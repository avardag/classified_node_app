module.exports = {
  asyncErrorHandler: (fn)=> {
    return (req, res, next)=>{
      Promise
        .resolve(fn(req, res, next))
        .catch(next)
    }
  }
}