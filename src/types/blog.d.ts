type ParagraphPost = {
	paragraphType: string;
	paragraphHeading?: string;
	paragraphContent: string;
};

type BlogPost = {
	title: string;
	subtitle?: string;
	thumbnail?: string;
	tags?: string[];
	categories?: string[];
	paragraphs: ParagraphPost[];
};
