import blogService from "@/services/blog.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
	req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
	const data: BlogPost = await req.json();

	try {
		const result = await blogService.createBlog(data);
		return NextResponse.json({
			success: true,
			message: "post created",
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

export async function GET(
	req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
	const url = new URL(req.url);

	const limit = url.searchParams.get("limit") || "10";
	const page = url.searchParams.get("page") || "0";

	try {
		const result = await blogService.getAllPost(limit, page);
		return NextResponse.json({
			success: true,
			message: "featched posts successfully",
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
