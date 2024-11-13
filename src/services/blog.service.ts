import dbconnect from "@/configs/database.config";
import blogModel from "@/models/blog.model";

const blogService = {
	createBlog: async (data: BlogPost) => {
		await dbconnect();
		const newPost = await blogModel.create(data);
		return newPost.id;
	},

	getAllPost: async (limit: string, page: string) => {
		await dbconnect();
		return await blogModel
			.find({})
			.select("title subTitle thumbnail slug")
			.limit(parseInt(limit))
			.skip(parseInt(page))
			.lean()
			.exec();
	},

	getBlogBySlug: async (slug: string) => {
		await dbconnect();
		return await blogModel.findOne({ slug }).lean().exec();
	},
};

export default blogService;
