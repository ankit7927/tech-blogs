import dbconnect from "@/configs/database.config";
import otpModel from "@/models/otp.model";
import userModel from "@/models/user/user.model";

const authService = {
	userSignup: async (data: UserSignup): Promise<string> => {
        await dbconnect();
		const newUser = await userModel.create({ ...data });
		await otpModel.create({
			email: newUser.email,
			otp: "121212",
		});
		return newUser.id;
	},

	userSignin: async (data: UserSignin): Promise<string> => {
        await dbconnect();
		const user = await userModel
			.findOne({ email: data.email })
			.select("password")
			.lean()
			.exec();

		if (!user) throw new Error("user not found");
		if (data.password === user.password) {
			return user._id.toString(); //TODO will return token to set in cookies
		} else throw new Error("Wrong password");
	},

	verifyUser: async (data: UserVerification): Promise<string> => {
        await dbconnect();
		const otp = await otpModel.findOne({ email: data.email });
		if (!otp) throw new Error("wrong email or otp expired");
		if (otp.otp === data.otp) {
			await otp.deleteOne();
			return data.email;
		} else throw new Error("wrong otp");
	},
};

export default authService;
