import mongoose from "mongoose";
export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("connected...");
    });

    connection.on("error", (err) => {
      console.log("could not connect to db..." + err.message);
    });
  } catch (error) {
    console.log(error + "something went wrong");
  }
}
