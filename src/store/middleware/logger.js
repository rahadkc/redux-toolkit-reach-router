const logger = store => next => action => {
  // console.log('store', store)
  next(action)
}

export default logger
