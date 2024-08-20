import { NextResponse } from "next/server";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BASE_URL;

export const GET = async (req: Request) => {
  if (!URL) return;
  try {
    const data = await axios.get(URL);
    return NextResponse.json(data.data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
