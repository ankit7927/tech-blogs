import dbconnect from "@/configs/database.config";
import blogService from "@/services/blog.service";
import { NextRequest, NextResponse } from "next/server";

type Params = {
	params: Promise<{
		slug: string;
	}>;
};

export async function GET(req: NextRequest, { params }: Params) {
	await dbconnect();
	const slug = (await params).slug;
	if (!slug)
		return NextResponse.json({
			success: false,
			message: "blog slug is not found",
		});
	try {
		const result = await blogService.getBlogBySlug(slug);
		if (!result) throw new Error("Blog not found");
		return NextResponse.json({
			success: true,
			message: "featched blog successfully",
			data: result,
		});
	} catch (error) {
		if (error instanceof Error)
			return NextResponse.json(
				{
					success: false,
					message: error.message,
				},
				{ status: 400 },
			);
		else
			return NextResponse.json(
				{
					success: false,
					message: "internal server error",
				},
				{ status: 500 },
			);
	}
}
