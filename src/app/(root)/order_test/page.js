"use client";
import API from "@/app/components/api/Api";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Page() {
  let [loading, setLoading] = useState();
  let [date, setDate] = useState({
    hour: null,
    year: null,
  });
  useEffect(() => {});

  let handleRequest = async () => {
    if (date.year && date.hour) {
      setLoading(true);
      let data = await API.order_test(date);
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <div>
        <h2 className="text-xl text-bold text-center p-8  underline">
          Pick a time to Start Test
        </h2>
      </div>
      <div className="flex flex-col items-center gap-4 justify-center mb-3 fullwidth ">
        <input
          className="peer w-40 block min-h-[auto]  rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          type="date"
          id="form1"
          onChange={(e) => {
            setDate({ ...date, year: e.target.value });
          }}
        />
        <input
          className="w-40"
          type="time"
          id="appt"
          name="appt"
          min="09:00"
          max="18:00"
          onChange={(e) => {
            setDate({ ...date, hour: e.target.value });
          }}
        />
        <Button
          disabled={date.hour && date.year ? false : true}
          variant="outlined "
          onClick={handleRequest}
        >
          {loading ? "Yuklanmoqda" : "Yuklash"}
        </Button>
      </div>
    </div>
  );
}
