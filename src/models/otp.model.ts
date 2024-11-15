import { InferSchemaType, model, Model, models, Schema } from "mongoose";

const otpSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		otp: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true, expires: "10m" },
);

export type Otp = InferSchemaType<typeof otpSchema>;
const otpModel: Model<Otp> = models.Otp ? models.Otp : model("Otp", otpSchema);
export default otpModel;
