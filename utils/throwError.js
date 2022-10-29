const throwError = (credential, status, message, place) => {

  if (credential) {
    const error = new Error 
    error.status = status
    error.message = message
    error.place = place

    throw error
  } 

  return 
}

module.exports = throwError