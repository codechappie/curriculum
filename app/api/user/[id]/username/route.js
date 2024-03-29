import dbConnect from "../../../../../lib/connect-db";
import User from "../../../../../models/User";

export async function PUT(req, { params }) {
    await dbConnect();
    const { username } = await req.json()
    try {
        const user = await User.findOneAndUpdate({ id: params.id, username: { $ne: username } },
            { username }, { upsert: true });

        return Response.json({ updated: true, user, message: "Usuario actualizado correctamente" })
    } catch (error) {
        console.log("ERRORCODE", error)
        if (error.keyValue.id === params.id) {
            return Response.json({ updated: false, message: "" });
        } else if (error.keyPattern.username === 1) {
            return Response.json({ updated: false, message: "Este usuario se encuentra en uso" });
        } else {
            return Response.json({ updated: false, message: "Error" });
        }

    }
}


export async function GET(req, { params }) {
    await dbConnect();
    console.log("PARAMS", params)
    try {
        const user = await User.findOne({ username: params.username });
        return Response.json({ success: true, user })
    } catch (error) {
        console.log(error)
        return Response.json({ success: false });
    }
}