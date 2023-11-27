import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

router.post('/users', userController.createUser)

router.get('/users', userController.getAllUsers)

router.get('/users/:userId', userController.getSingleUser)

router.put('/users/:userId', userController.UpdateSingleUser)

router.delete('/users/:userId', userController.DeleteSingleUser)

router.put('/users/:userId/orders', userController.UpdateOrderOfSingleUser)

router.get('/users/:userId/orders', userController.GetOrderOfSingleUser)



export const userRoutes = router
