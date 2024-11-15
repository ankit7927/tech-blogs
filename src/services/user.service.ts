import dbconnect from "@/configs/database.config";
import userModel from "@/models/user/user.model";

const userService = {
	userProfile: async (userId: string) => {
		await dbconnect();
		return await userModel
			.findById({ _id: userId })
			.select("name email")
			.lean()
			.exec();
	},

	getUserPrivateBlogs: async (
		userId: string,
		type: "saved" | "liked",
		limit: string,
		page: string,
	) => {
		await dbconnect();
		const blogs = await userModel
			.findById({ _id: userId })
			.select(type)
			.populate({
				path: type,
				select: "thumbnail title slug",
				options: { lean: true, limit: parseInt(limit), skip: parseInt(page) },
			})
			.lean()
			.exec();
		console.log(blogs);
		return blogs?.saved;
	},
};

export default userService;
