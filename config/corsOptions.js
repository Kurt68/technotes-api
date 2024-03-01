const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Take out after development !origin or leave in for it to work with thunder client
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true, // handles headers (Access-Control-Allow-Credentials)
  optionsSuccessStatus: 200, // (204 is default but causes problems in old browsers & smart tv's etc)
}

module.exports = corsOptions
