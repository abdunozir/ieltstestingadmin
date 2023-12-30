import { connect } from "@/app/helpers/dbConfig/dbConnect";
import { Student } from "@/app/helpers/dbConfig/dbModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    let data = await Student.countDocuments({});

    return NextResponse.json({
      count: data,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
