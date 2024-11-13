import { InferSchemaType, Model, model, models, Schema } from "mongoose";
import paragraphSchema from "./paragraph.schema";

const blogSchema = new Schema(
	{
		thumbnail: String,
		title: {
			type: String,
			required: true,
		},
		subTitle: String,
		slug: String,
		authors: [
			{
				name: {
					type: String,
					default: "Admin",
				},
			},
		],
		visible: {
			type: Boolean,
			default: false,
		},
		tags: [String],
		categories: [String],
		paragraphs: [paragraphSchema],
	},
	{ timestamps: true },
);

blogSchema.pre("save", function (next) {
	const date = new Date();
	const suf = "-" + date.toJSON().split(".")[0].replaceAll(":", "-");
	this.slug = this.title.replaceAll(" ", "-") + suf;
	next();
});

export type Blog = InferSchemaType<typeof blogSchema>;
const blogModel: Model<Blog> = models.Blog
	? models.Blog
	: model("Blog", blogSchema);
export default blogModel;
