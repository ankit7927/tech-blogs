import dbconnect from "@/configs/database.config";
import blogModel from "@/models/blog/blog.model";

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
			.select("title subtitle thumbnail slug")
			.limit(parseInt(limit))
			.skip(parseInt(page))
			.lean()
			.exec();
	},

	getBlogBySlug: async (slug: string) => {
		await dbconnect();
		return await blogModel.findOne({ slug }).lean().exec();
	},

	getUserBlogs: async (userId: string, limit: string, page: string) => {
		await dbconnect();
		return await blogModel
			.find({ userId })
			.select("title subtitle thumbnail slug")
			.limit(parseInt(limit))
			.skip(parseInt(page))
			.lean()
			.exec();
	},

	// private
	updateBlog: async (blogId: string, data: BlogPost) => {
		await dbconnect();
		return await blogModel.findByIdAndUpdate({ _id: blogId }, data, {
			new: true,
		});
	},

	// private
	deleteBlog: async (blogId: string) => {
		await dbconnect();
		return await blogModel.findByIdAndDelete({ _id: blogId });
	},
};

export default blogService;
