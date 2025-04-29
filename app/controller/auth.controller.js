import BaseCtrl from "./base.controller.js";
import User from "../models/user.model.js";

class AuthCtrl extends BaseCtrl{
    constructor(){
        super();
    }
    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return this.response(res, 404, "User not found");
            }
            if (!user.comparePassword(password)) {
                return this.response(res, 401, "Invalid password");
            }
            const token = await user.generateToken();
            return this.response(res, 200, "Login successful", { token });  
        }catch (error) {
            return this.response(res, 500, "Error logging in", error);
        }
    }
    logout = async (req, res) => {
        try {
            
        } catch (error) {
            return this.response(res, 500, "Error logging out", error);
        }
    }
}
export default AuthCtrl;