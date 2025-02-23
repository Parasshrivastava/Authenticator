import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dBconfig/dbconfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        console.log("User ID:", userID);

        if (!userID) {
            return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
        }

        const user = await User.findOne({ _id: userID }).select("-password");
        console.log("User Data:", user);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "USER FOUND",
            data: user,
        });

    } catch (error: any) {
        console.error("Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
