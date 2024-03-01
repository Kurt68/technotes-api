const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logFileName) => {
  const dateTime = `${format(new Date(), 'MM-dd-yyyy\tHH:mm:ss')}`
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`
  // console.log(logItem)

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', logFileName),
      logItem
    )
  } catch (err) {
    // if (err) throw err
    console.log(err)
  }
}
// middleware below
// Add conditionals to log only if it's not coming from our own url
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.log')
  console.log(`${req.method} ${req.path}`)
  next()
}

module.exports = { logger, logEvents }
