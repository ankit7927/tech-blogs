type UserSignup = {
	name: string;
	email: string;
	password: string;
};

type UserSignin = {
	email: string;
	password: string;
};

type UserVerification = {
	email: string;
	otp: string;
};
