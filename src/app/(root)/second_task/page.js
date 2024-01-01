"use client";
import PartTwoList from "@/app/components/List/partTwoList.js";
import { getPartTwo } from "@/redux/features/questions/PartTwo";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();

  let questions = useSelector((state) => state.PartTwo);

  useEffect(() => {
    dispatch(getPartTwo());
  }, []);

  console.log(questions);

  if (questions.loading) {
    return (
      <div>
        <h2 className="text-xl text-bold text-center p-8  underline">
          Loading...
        </h2>
      </div>
    );
  }

  if (questions.message.length > 0) {
    return (
      <div>
        <h1>{questions.message}</h1>
      </div>
    );
  }

  if (questions.questions.length == 0) {
    return (
      <div className="container">
        <div>
          <h2 className="text-xl text-bold text-center p-8  underline">
            Part One Questions
          </h2>
        </div>
        <div className="p-[20px] pb-[50px] flex flex-row justify-end">
          <Link
            href="/second_task/add"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add New
          </Link>
        </div>
        <h2 className="text-xl text-bold text-center p-8  underline">
          Question Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div>
        <h2 className="text-xl text-bold text-center p-8  underline">
          Add your first part questions here
        </h2>
      </div>
      <div className="p-[20px] pb-[50px] flex flex-row justify-end">
        <Link
          href="/second_task/add"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add New
        </Link>
      </div>
      {questions.questions.map((el, i) => {
        return (
          <div key={el._id}>
            <PartTwoList el={el} i={i} />
          </div>
        );
      })}
    </div>
  );
}
