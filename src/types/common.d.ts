type ApiResponse<Type> = {
	success: boolean;
	message: string;
	data?: Type;
};
