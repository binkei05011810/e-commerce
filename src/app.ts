import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'
import compression from 'compression'
import passport from 'passport'
import cors from 'cors'

import userRouter from './routers/user'
import productRouter from './routers/product'
import cartRouter from './routers/cart'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

import {
  googleStrategy,
  jwtStrategy,
  loginLocalStrategy,
  registerLocalStrategy,
} from './config/passport'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)
app.use(cors())
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(compression())
app.use(express.json())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

//Using passport
app.use(passport.initialize())

//Passport strategy
passport.use(googleStrategy)
passport.use(jwtStrategy)
passport.use('login', loginLocalStrategy)
passport.use('register', registerLocalStrategy)

// Use user router
app.use('/api/v1/users', userRouter)
// Use product router
app.use('/api/v1/products', productRouter)
// Use cart router
app.use('/api/v1/carts', cartRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
