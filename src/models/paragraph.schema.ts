import { InferSchemaType, Schema } from "mongoose";

const paragraphSchema = new Schema({
	paragraphType: {
		type: String,
		enum: ["code", "paragraph"],
	},
	paragraphHeading: String,
	paragraphContent: {
		type: String,
		required: true,
	},
});

export type Paragraph = InferSchemaType<typeof paragraphSchema>;
export default paragraphSchema;
