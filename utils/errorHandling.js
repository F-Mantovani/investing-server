const errorHandling = (res, error) => {
  res
  .status(error.status)
  .json({ 
        place: error.place, 
        message: error.message
        })
}

module.exports = errorHandling