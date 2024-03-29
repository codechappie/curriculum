import dbConnect from "../../../../lib/connect-db";
import User from "../../../../models/User";


export async function GET(req) {
    await dbConnect();
    const username = req.nextUrl.searchParams.get("username");

    try {
        const user = await User.findOne({ username });
        console.log("USEEEER", user);
        return Response.json({ success: true, user })
    } catch (error) {
        console.log(error)
        return Response.json({ success: false });
    }
}