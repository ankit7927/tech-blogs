import { InferSchemaType, Model, model, models, Schema } from "mongoose";

const userSchema = new Schema({
	image: String,
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["user", "author", "admin"],
		default: "user",
	},
	verified: {
		type: Boolean,
		default: false,
	},
	saved: [
		{
			type: Schema.Types.ObjectId,
			ref: "Blog",
		},
	],
	liked: [
		{
			type: Schema.Types.ObjectId,
			ref: "Blog",
		},
	],
});

export type User = InferSchemaType<typeof userSchema>;
const userModel: Model<User> = models.User
	? models.User
	: model("User", userSchema);
export default userModel;
