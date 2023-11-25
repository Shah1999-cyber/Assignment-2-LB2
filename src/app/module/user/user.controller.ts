import { Request, Response } from "express";
import { UserServices } from "./user.service";


const createUser =async (req: Request, res: Response) => {
   try{
    const user = req.body;
    const result = await UserServices.createUserIntoDB(user);
    res.status(200).json({
        success: true,
        message: "User created successfully!",
        data : result,
    })
   }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            err,
        })

   }
}
const getAllUsers =async (req: Request, res: Response) => {
   try{
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
        success: true,
        message: "All Users retrieved successfully!",
        data : result,
    })
   }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            err,
        })
   }
}

const getSingleUser =async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);
    console.log(result)
    try{
        res.status(200).json({
            success: true,
            message: "User retrieved successfully!",
            data : result,
        })
       }catch(err: any){
            res.status(500).json({
                success: false,
                message: err.message || "something went wrong",
                err,
            })
       }
}

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
}