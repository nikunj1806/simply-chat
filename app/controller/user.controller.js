import BaseCtrl from "./base.controller.js";
import User from "../models/user.model.js";
class UserCtrl extends BaseCtrl {
  constructor() {
    super();
    this.name = "user";
  }

  createUser = async(req, res) =>{
    try {
      const {first_name, last_name, email, address, mobile, password} = req.body;
      const user = await User.insertOne({
        first_name,
        last_name,
        email,
        address,
        mobile,
        password
      }, { password: 0, __v: 0 });
      
      return this.response(res, 201, "User created", user);
    } catch (error) {
      return this.response(res, 500, "Error creating user", error);
    }
  }

  getAllUsers = async(req, res) => {
    const users = await User.find({}, { password: 0, __v: 0 });
    return this.response(res, 200, "Users found", users);
  }
  getUserById = async(req, res) => {
    const user = await User.findById(req.params.id, { password: 0, __v: 0 });
    if (!user) {
      return this.response(res, 404, "User not found");
    }
    this.response(res, 200, "User found", user);
  } 
  deleteUser = async(req, res) => {
    const user = User.findByIdAndDelete(req.params.id);
    if (!user) {
      return this.response(res, 404, "User not found");
    }
    return this.response(res, 200, "User deleted", user);
  }
  updateUser = async(req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body , { new: true }, { password: 0, __v: 0 });
    if (!user) {
      return this.response(res, 404, "User not found");
    }
    return this.response(res, 200, "User updated", user);  
  }
}

export default UserCtrl;