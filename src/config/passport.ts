import passport from 'passport'
import bcrypt from 'bcrypt'
import GoogleTokenStrategy from 'passport-google-id-token'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'
import UserService from '../services/user'

export const googleStrategy = new GoogleTokenStrategy(
  {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  async (
    parsedToken: any, //contains user's info
    googleId: any,
    done: any //done: like next function
  ) => {
    const userInfo = parsedToken.payload
    const user = await UserService.findOrCreate(userInfo)
    const token = jwt.sign({ email: user.email }, JWT_SECRET)
    done(
      null, //any error?,
      { token } //will be passed to next controller
    )
  }
)

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload, done) => {
    const user = await UserService.findByEmail(payload.email)
    done(null, user)
  }
)

export const loginLocalStrategy = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
  },
  (username, password, done) => {
    const user = UserService.findByUsername(username)

    if (!user) {
      done(null, false, { message: 'Incorrect email or password.' })
    }

    const token = jwt.sign({ userId: (user as any)._id }, JWT_SECRET)
    done(null, token)
  }
)

const BCRYPT_SALT_ROUNDS = 12
export const registerLocalStrategy = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
    session: false,
  },
  async (req, username, password, done) => {
    const user = UserService.findByUsername(username)

    if (user) {
      done(null, false, { message: 'Username has already taken.' })
    }

    const { firstname, lastname } = req.body
    const hashPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
    const newUser = await UserService.createUser(
      firstname,
      lastname,
      username,
      hashPassword
    )

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET)
    done(null, token)
  }
)
