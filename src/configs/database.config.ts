import mongoose from "mongoose";

type ConnectionObject = {
	isConnected: number;
};

const connectionObject: ConnectionObject = {
	isConnected: 0,
};

async function dbconnect() {
	if (connectionObject.isConnected == 1) return;
	const connString: string = process.env.MONGODB_URI as string;
	const mongoUser: string = process.env.MONGO_USER as string;
	const mongoPass: string = process.env.MONGO_PASS as string;
	if (!connString || !mongoUser || !mongoPass)
		throw new Error("mongo connection string is not defined");
	try {
		const db = await mongoose.connect(connString, {
			auth: {
				username: mongoUser,
				password: mongoPass,
			},
			authSource: "admin",
		});
		connectionObject.isConnected = db.connections[0].readyState;
	} catch (error) {
		console.error("MongoDB Atlas connection failed:", error);
	}
}

export default dbconnect;
