import BaseCtrl from "./base.controller.js";
import User from "../models/user.model.js";
class WebCtrl extends BaseCtrl{
    constructor(){
        super();
    }
    home = async (req, res) => {
        try {
            res.render("home", {
                user: req.cookies.user || null
            });
        } catch (error) {
            return this.response(res, 500, "Error rendering home page", error);
        }
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
            res.cookie("user", user);
            res.redirect("/");
        } catch (error) {   
            return this.response(res, 500, "Error logging in", error);
        }   
    }

    logout = async (req, res) => {
        try {
            res.clearCookie("user");
            res.redirect("/");
        } catch (error) {
            return this.response(res, 500, "Error logging out", error);
        }
    }
}
export default WebCtrl;