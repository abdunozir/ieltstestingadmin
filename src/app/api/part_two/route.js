import { connect } from "@/app/helpers/dbConfig/dbConnect";
import { PartOne, PartTwo } from "@/app/helpers/dbConfig/dbModel";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connect();
    let body = await req.json();

    let partTwo = await PartTwo.create({
      part_two: {
        questions: [...body.part_two.questions],
        thinkingTime: {
          count: body.part_two.thinkingTime.count,
          count_type: body.part_two.thinkingTime.count_type,
        },
        speakingTime: {
          count: body.part_two.speakingTime.count,
          count_type: body.part_two.speakingTime.count_type,
        },
        isPremium: body.part_two.isPremium,
      },

      part_three: {
        questions: [...body.part_three.questions],

        thinkingTime: {
          count: body.part_three.thinkingTime.count,
          count_type: body.part_three.thinkingTime.count_type,
        },
        speakingTime: {
          count: body.part_three.speakingTime.count,
          count_type: body.part_three.speakingTime.count_type,
        },
        isPremium: body.part_three.isPremium,
      },
    });

    return NextResponse.json({
      success: true,
      partOne: partTwo,
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
    let partTwo = await PartTwo.find();

    return NextResponse.json({
      succes: true,
      partTwo: partTwo,
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
    let url = new URL(req.url);
    let id = url.searchParams.get("id");
    let deleted = await PartTwo.deleteOne({ _id: id });

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
