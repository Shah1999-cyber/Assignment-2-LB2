import { Request, Response } from 'express'
import { UserServices } from './user.service'
import { ZUserSchema } from './user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const zodValidatedData = ZUserSchema.parse(user)
    const result = await UserServices.createUserIntoDB(zodValidatedData)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      err,
    })
  }
}
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB()
    res.status(200).json({
      success: true,
      message: 'All Users retrieved successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      err,
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getSingleUserFromDB(userId)

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      err,
    })
  }
}

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
}
