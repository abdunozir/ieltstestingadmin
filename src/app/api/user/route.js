import { connect } from "@/app/helpers/dbConfig/dbConnect";
import { Student } from "@/app/helpers/dbConfig/dbModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connect();
    const formData = await req.formData();
    let file = formData.get("audio");
    let name = formData.get("name");

    // const arrayBuffer = await readFileAsArrayBuffer(file);
    if (!file) {
      return NextResponse({
        error: true,
        message: "FIle not found...",
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    let student = await Student.create({
      name: name,
      speakingAudio: buffer,
    });

    return NextResponse.json({
      student: student,
      saved: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: error.message,
    });
  }
}
