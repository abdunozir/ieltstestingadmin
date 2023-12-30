import { connect } from "@/app/helpers/dbConfig/dbConnect";
import { Student } from "@/app/helpers/dbConfig/dbModel";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    await connect();
    let data = await Student.deleteMany({});

    return NextResponse.json({
      deleted: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
