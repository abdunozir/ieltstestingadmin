import { connect } from "../../helpers/dbConfig/dbConnect";
import { Student } from "@/app/helpers/dbConfig/dbModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    let data = await Student.find();

    return NextResponse.json({
      student: data,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
