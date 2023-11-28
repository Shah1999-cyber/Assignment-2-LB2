"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/users', user_controller_1.userController.createUser);
router.get('/users', user_controller_1.userController.getAllUsers);
router.get('/users/:userId', user_controller_1.userController.getSingleUser);
router.put('/users/:userId', user_controller_1.userController.UpdateSingleUser);
router.delete('/users/:userId', user_controller_1.userController.DeleteSingleUser);
router.put('/users/:userId/orders', user_controller_1.userController.UpdateOrderOfSingleUser);
router.get('/users/:userId/orders', user_controller_1.userController.GetOrderOfSingleUser);
router.get('/users/:userId/orders/total-price', user_controller_1.userController.GetOrderTotalPriceOfSingleUser);
exports.userRoutes = router;
