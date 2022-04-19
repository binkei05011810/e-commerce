import { Request, Response, NextFunction } from 'express'

import { UnauthorizedError } from '../helpers/apiError'

export const isInRole =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any

    if (!user) {
      next(new UnauthorizedError())
    }

    if (!roles.includes(user.role)) {
      next(new UnauthorizedError())
    }

    next()
  }

export const isProfileOwner = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params

  if (!userId === (req.user as any)._id) {
    next(new UnauthorizedError())
  }

  next()
}

export const isCartOwner = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cartId } = req.params

  if (!cartId === (req.user as any).cart) {
    next(new UnauthorizedError())
  }

  next()
}
