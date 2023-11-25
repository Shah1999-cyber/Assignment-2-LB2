import { Schema, model } from "mongoose";
import { TUserAddress, TUserName, TUserOrders, TUser, UserModel } from "./user/user.interface";


const UserNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
        minLength: [4, 'First Name cannot be less then 8 character'],
        maxlength: [20, 'First Name cannot be more then 20 character'],
      },
      lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        trim: true,
        minLength: [4, 'Last Name cannot be less then 8 character'],
        maxlength: [20, 'Last Name cannot be more then 20 character'],
      }
})

const UserAddressSchema = new Schema<TUserAddress>({
    street: {
        type: String,
    },
    city: {
        type: String,
        required: [true, "Please give a valid city"]
    },
    country: {
        type: String,
        required: [true, "Please give a valid country"]
    }
})


const UserOrdersSchema = new Schema<TUserOrders>({
    productName: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    }

})

const UserSchema = new Schema<TUser>({
    userId: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        },
    password: {
        type: String,
        required: true,
        maxlength: [40, 'Password must be less then 40 character'],
        minlength: [6, 'password must be at least 6 characters']
    },
    fullName: {
        type : UserNameSchema,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: String,
        enum: ['active','blocked'],
        default: 'active',
    },
    hobbies: {
        type: [String],
    },
    address: {
        type: UserAddressSchema,
        required: true,
    },
    orders: {
        type: [UserOrdersSchema],

    }
})

export const UsersModel = model<TUser,UserModel>('User',UserSchema)