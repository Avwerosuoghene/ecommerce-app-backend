import { User } from "../../database/models";
import user from "../../database/models/user";
import { logingPayload, ModError, resetPassPayload, signUpPayload, UserI } from "../../database/types/type";
import { comparePassword, hashPassword } from "../../helpers/auth";

export class AuthService {
     static async signUp   (signupPayload: signUpPayload): Promise<{message: string, id: string} >  {
        const {email, password, name} = signupPayload
        const hashedPw = await hashPassword(password, 12);
        const user = new User({
            email: email,
            password: hashedPw,
            name: name,
          });
          const result = await user.save();
    
          return {
            message: "User created succesfully",
            id: result._id
          }
    };

    static async login (loginPayload: logingPayload): Promise<{message: string, id: string} >  {
        const {email, password} = loginPayload
        const user = await User.findOne({ email: email });
  
        if (!user) {
          const error = new ModError("User not found");
          error.statusCode = 401;
          throw error;
        }
        const passwordMatch = await comparePassword(password,user.password )
        if (!passwordMatch) {
          const error = new ModError("Passwords do not match");
          error.statusCode = 401;
          throw error;
        }

        return {
            message: "Login succesful",
            id: user._id
          }
    };

    static async passwordReset (resetPassPayload: resetPassPayload): Promise<{message: string, id: string | undefined} >  {

        const {email, password, confirmPassword} = resetPassPayload;
        const hashedPw = await hashPassword(password, 12);
        const user = User.findOne({ email: email });
  
        if (!user) {
          const error = new ModError("User not found");
          error.statusCode = 401;
          throw error;
        }
        const modifiedUser : UserI | null = await User.findOneAndUpdate(
          { email: email },
          { password: hashedPw },
          { new: true }
        );

        return {
            message: "Password reset succesful",
            id: modifiedUser?._id
        }
    }
}
    


 