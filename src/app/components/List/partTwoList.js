import { removeOne } from "@/redux/features/questions/PartTwo";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function PartTwoList({ el, i }) {
  let dispatch = useDispatch();
  let [loading, setLoading] = useState(false);

  let deleteFunc = async () => {
    setLoading(true);
    let { data } = await axios.delete(`/api/part_two?id=${el._id}`);
    console.log(data);
    if (data.isDeleted && data.deleted.deletedCount > 0) {
      dispatch(removeOne({ id: el._id }));
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-row gap-[30px] border-b-2 border-slate-500 justify-between pt-2 mb-20">
      <div className="flex flex-row gap-[30px]">
        <p>{i + 1}</p>
        <ol className="border-l-2 border-slate-500 pl-10">
          <li>Part Two:</li>
          {el.part_two.questions.map((quest, num) => {
            return (
              <li key={quest._id}>
                {num + 1}. {quest.question}
              </li>
            );
          })}
          <li>Part Three:</li>
          {el.part_three.questions.map((quest, num) => {
            return (
              <li key={quest._id}>
                {num + 1}. {quest.question}
              </li>
            );
          })}
        </ol>
      </div>
      <div className="felx flex-row align-bottom">
        {loading ? (
          <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            Deleting...
          </button>
        ) : (
          <button
            onClick={deleteFunc}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
