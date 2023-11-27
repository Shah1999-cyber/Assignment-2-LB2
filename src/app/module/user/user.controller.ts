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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
const DeleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.DeleteSingleUserFromDB(userId)

    res.status(200).json({
      success: true,
      message: 'User Deleted successfully!',
      data: null,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      err,
    })
  }
}

const UpdateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.UpdateSingleUserFromDB(userId, req.body)
    res.status(200).json({
      success: true,
      message: 'User update succesfully',
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
const UpdateOrderOfSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    await UserServices.UpdateOrderOfSingleUserFromDB(userId, req.body)
    res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: null,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      err,
    })
  }
}

const GetOrderOfSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.GetOrderOfSingleUserFromDB(userId, req.body)
    res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
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
  UpdateSingleUser,
  DeleteSingleUser,
  UpdateOrderOfSingleUser,
  GetOrderOfSingleUser
}
