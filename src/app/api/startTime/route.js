// StartTime
import { connect } from "@/app/helpers/dbConfig/dbConnect";
import { StartTime } from "@/app/helpers/dbConfig/dbModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connect();
    let body = await req.json();
    let data = await StartTime.deleteMany({});
    let res = await StartTime.create({
      hour: body.hour,
      year: body.year,
    });
    return NextResponse.json({
      date: res,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
