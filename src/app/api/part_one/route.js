import { connect } from "@/app/helpers/dbConfig/dbConnect";
import { PartOne } from "@/app/helpers/dbConfig/dbModel";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connect();
    let body = await req.json();
    console.log(body);
    let partOne = await PartOne.create({
      questions: [...body.questions],
      thinkingTime: {
        count: body.thinkingTime.count,
        count_type: body.thinkingTime.count_type,
      },
      speakingTime: {
        count: body.speakingTime.count,
        count_type: body.speakingTime.count_type,
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
    await connect();
    let partOne = await PartOne.find();

    return NextResponse.json({
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

export async function DELETE(req) {
  try {
    await connect();
    let url = new URL(req.url);
    let id = url.searchParams.get("id");
    let deleted = await PartOne.deleteOne({ _id: id });

    return NextResponse.json({
      isDeleted: true,
      deleted: deleted,
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: error.message,
    });
  }
}
