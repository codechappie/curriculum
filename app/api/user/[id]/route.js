import dbConnect from "../../../../lib/connect-db";
import User from "../../../../models/User";

export async function GET(req, { params }) {
    await dbConnect();
    console.log("PARAMS", params)
    try {
        const user = await User.findOne({ id: params.id });
        return Response.json({ success: true, user })
    } catch (error) {
        console.log(error)
        return Response.json({ success: false });
    }
}


export async function PUT(req, { params }) {
    await dbConnect();
    const data = await req.json()
    console.log(params, data)
    try {
        const user = await User.findOneAndUpdate({ id: params.id },
            data, { upsert: true });

        // const user = await User.findOneAndUpdate({ id: params.id, username: { $ne: username } },
        //     { username }, { upsert: true });

        return Response.json({ updated: true, user, message: "Usuario actualizado correctamente" })
        return Response.json({ updated: true, message: "Usuario actualizado correctamente" })
    } catch (error) {
        console.log("ERRORCODE", error)
        if (error.keyValue.id === params.id) {
            return Response.json({ updated: false, message: "" });
        } else {
            return Response.json({ updated: false, message: "Error" });
        }

    }
}
