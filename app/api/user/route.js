import dbConnect from "../../../lib/connect-db";
import User from "../../../models/User";

export async function GET(req, res) {
  await dbConnect();

  try {
    const user = await User.find({});
    return Response.json({ success: true, user })
  } catch (error) {
    console.log(error)
    return Response.json({ success: false });
  }
}

export async function POST(req, res) {
  await dbConnect();
  const body = await req.json()

  console.log(body)
  try {
    console.log("RE", body)
    const user = await User.create(body);
    console.log("USER", user)
    return Response.json({ success: true, user });
  } catch (error) {
    return Response.json({ success: false });
  }
}

export async function PUT(req, res) {
  await dbConnect();
  const body = await req.json()

  try {
    console.log("RE", body)
    const user = await User.updateOne(body);
    return Response.json({ success: true, user });
  } catch (error) {
    return Response.json({ success: false });
  }
}