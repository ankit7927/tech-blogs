type ParagraphPost = {
	paragraphType: string;
	paragraphHeading?: string;
	paragraphContent: string;
};

type BlogPost = {
	title: string;
	subTitle?: string;
	thumbnail?: string;
	tags?: string[];
	categories?: string[];
	paragraphs: ParagraphPost[];
};

type ApiResponse = {
	success: boolean;
	message: string;
	data?: unknown;
};
