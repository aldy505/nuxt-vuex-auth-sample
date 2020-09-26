import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import formRoute from './form'
import userRoute from './user'
const app = express()
app.set('json spaces', 2)
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(userRoute)
app.use(formRoute)
// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 8000
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
