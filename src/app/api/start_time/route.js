import { connect } from "@/app/helpers/dbConfig/dbConnect";
import { PartOne, StartTime } from "@/app/helpers/dbConfig/dbModel";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connect();
    let body = await req.json();

    let startTime = await StartTime.create({
      date: {
        hour: body.hour,
        year: body.year,
      },
    });

    return NextResponse.json({
      success: true,
      partOne: startTime,
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: error.message,
    });
  }
}
