import express from 'express'
import passport from 'passport'

import { isInRole, isProfileOwner } from '../middlewares/authorization'
import { roles } from '../util/roles'

import {
  registerUser,
  findById,
  updateUserProfile,
  banUser,
  unbanUser,
} from '../controllers/user'

const router = express.Router()

// @route        POST api/v1/users
// @description  Register a user
// @access       Public
router.post(
  '/register',
  passport.authenticate('register', { session: false }),
  registerUser
)

// @route        POST api/v1/users/login/google
// @description  Login a user
// @access       Public
router.post(
  '/login/google',
  passport.authenticate('google-id-token', { session: false }),
  (req, res) => {
    res.json(req.user)
  }
)

// @route        POST api/v1/users/login/local
// @description  Login a user
// @access       Public
router.post(
  '/login/local',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    res.json(req.user)
  }
)

// @route        GET api/v1/users/userId
// @desciption   Get user profile
// @access       Public
router.get('/:userId', findById)

// @route        PUT api/v1/users/userId
// @desciption   Update user profile
// @access       Private: Only that user can update their profile
router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  isProfileOwner,
  updateUserProfile
)

// @route        PUT api/v1/users/userId/ban
// @description  Ban a user
// @access       Private: only admin
router.put(
  '/:userId/ban',
  passport.authenticate('jwt', { session: false }),
  isInRole(roles.Admin),
  banUser
)

// @route        PUT api/v1/users/userId/unban
// @desciption   Unban a user
// @access       Private: only admin
router.put(
  '/:userId/unban',
  passport.authenticate('jwt', { session: false }),
  isInRole(roles.Admin),
  unbanUser
)

export default router
