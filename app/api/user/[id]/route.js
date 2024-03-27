import dbConnect from "../../../../lib/connect-db";
import User from "../../../../models/User";

export async function GET(req, { params }) {
    await dbConnect();
    console.log(params)
    try {
        const user = await User.findOne({ id: params.id });
        return Response.json({ success: true, user })
    } catch (error) {
        console.log(error)
        return Response.json({ success: false });
    }
}
