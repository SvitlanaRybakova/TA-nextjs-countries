import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BASE_URL;

const CountrySchema = z.object({
  country: z.string(),
});

export const GET = async (req: Request) => {
  if (!URL) return;
  try {
    const data = await axios.get(URL);
    return NextResponse.json(data.data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  if (!URL) return;

  try {
    const body = await req.json();

    if (!body || !body.country) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const parsedBody = CountrySchema.parse(body);

    const data = await axios.post(URL, parsedBody);

    return NextResponse.json(data.data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(error, { status: 500 });
  }
};
