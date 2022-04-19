import { Request, Response, NextFunction } from 'express'
import UserService from '../services/user'
import User from '../models/User'
import Cart from '../models/Cart'

import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

// @route        POST api/v1/users
// @description  Register a user
// @access       Public
export const registerUser = async (req: Request, res: Response) => {
  console.log(req.user)
  res.json(req.user)
}

// @route        GET api/v1/users/userId
// @desciption   Get user profile
// @access       Public
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserService.findById(req.params.userId)
    res.json(user)
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

// @route        PUT api/v1/users/userId
// @desciption   Update user profile
// @access       Private: Only that user can update their profile
export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const { firstname, lastname, username, email, password } = req.body
    const newProfile = await UserService.updateProfile(userId, {
      firstname,
      lastname,
      username,
      email,
      password,
    })
    res.json(newProfile)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

// @route        PUT api/v1/users/userId/ban
// @description  Ban a user
// @access       Private: only admin
export const banUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserService.ban(req.params.userId)
    res.json(user)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

// @route        PUT api/v1/users/userId/unban
// @desciption   Unban a user
// @access       Private: only admin
export const unbanUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserService.unban(req.params.userId)
    res.json(user)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}
