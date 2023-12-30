import { connect } from "@/app/helpers/dbConfig/dbConnect";
import { PartOne } from "@/app/helpers/dbConfig/dbModel";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connect();
    let body = await req.json();

    let partOne = await PartOne.create({
      questions: [...body.questions],
      thinkingTime: {
        count: body.thinkingTime.count,
        count_type: body.thinkingTime.count_type,
      },
      speakingTime: {
        count: body.thinkingTime.count,
        count_type: body.thinkingTime.count_type,
      },
      isPremium: body.isPremium,
    });

    return NextResponse.json({
      success: true,
      partOne: partOne,
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: error.message,
    });
  }
}

export async function GET() {
  try {
    let partOne = await PartOne.find();

    NextResponse.json({
      succes: true,
      partOne: partOne,
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: error.message,
    });
  }
}
