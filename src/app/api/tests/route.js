import { connect } from "@/app/helpers/dbConfig/dbConnect";
import { PartOne, PartTwo } from "@/app/helpers/dbConfig/dbModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    let partOne = await PartOne.aggregate([{ $sample: { size: 1 } }]);
    let partTwo = await PartTwo.find();

    if (partOne.length > 0 && partTwo.length > 0) {
      let partTwoRandom = generateRandomNumber(partTwo.length);
      let partOneRandom = generateRandomNumber(partOne.length);
      console.log(partTwoRandom);
      return NextResponse.json({
        succes: true,
        partTwo: {
          partTwo:
            partTwo[partTwoRandom != 0 ? partTwoRandom - 1 : partTwoRandom]
              .part_two,
          partThree:
            partTwo[partTwoRandom != 0 ? partTwoRandom - 1 : partTwoRandom]
              .part_three,
        },
        partOne:
          partOne[partOneRandom != 0 ? partOneRandom - 1 : partOneRandom],
      });
    } else {
      throw new Error("Question not found.");
    }
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: error.message,
    });
  }
}

function generateRandomNumber(maxNumber) {
  // Generate a random number between 0 (inclusive) and 1 (exclusive)
  const randomNumber = Math.random();

  // Scale the random number to be between 0 (inclusive) and maxNumber (exclusive)
  const scaledNumber = Math.round(randomNumber * maxNumber);

  return scaledNumber;
}
// dewed

