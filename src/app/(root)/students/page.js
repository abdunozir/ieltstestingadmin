"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { IconButton } from "@mui/material";
import CustomModal from "@/app/components/modal/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "@/redux/features/student/student";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Delete from "@/app/components/Delete/Delete";

export default function Page() {
  // let [students, setStudents] = useState(null);
  const notify = (text) => toast(text);

  const [open, setOpen] = React.useState(false);
  let [count, setCount] = useState(0);

  let dispatch = useDispatch();
  useEffect(() => {
    let getCount = async () => {
      let { data } = await axios.get("/api/student/paginition");

      setCount(data.count);
    };

    // getCount();

    dispatch(fetchStudents());
  }, [dispatch]);

  useCallback(() => {}, [count]);

  let students = useSelector((state) => state.students);

  if (students.message) {
    notify("unexpected Error occured! \n " + students.message);
  }

  let getUrl = (data) => {
    try {
      let buf = Buffer.from(data);
      const audioBlob = new Blob([buf], { type: "audio/mp3" });
      const blobUrl = URL.createObjectURL(audioBlob);

      return (
        <div>
          <audio controls>
            <source src={blobUrl} type="audio/wav" />
          </audio>
          <a href={blobUrl} download={true}>
            Load it now
          </a>
        </div>
      );
    } catch (error) {
      console.error("Error creating Blob URL:", error);
      return <p>Error creating Blob URL</p>;
    }
  };
  if (students?.loading) {
    return (
      <section>
        <div className="container">
          <div>
            <h2 className="text-xl text-bold text-center p-8  underline">
              Loading...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    let { data } = await axios.delete("/api/student/deleteAll");
    if (data.delete) {
      setOpen(false);
      dispatch(fetchStudents());
    }
  };

  if (
    !students?.loading &&
    students?.student?.length > 0 &&
    !students?.message
  ) {
    return (
      <section>
        <ToastContainer />
        <div className="container">
          <div>
            <h2 className="text-xl text-bold text-center p-8  underline">
              Check and Write the reults of each Student by clicking pen
            </h2>
          </div>
          <div className="flex flex-row items-center justify-end ">
            <Delete
              open={open}
              handleClose={handleClose}
              handleClickOpen={handleClickOpen}
            />
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          No
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Full Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Writing
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Reading
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Listening
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Speaking
                        </th>
                        <th scope="col" className="px-6 py-4">
                          download spaeking
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {students?.student.map((el, i) => {
                        return (
                          <tr
                            key={i}
                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {i + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {el.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {el.writing}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {el.reading}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {el.listening}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {el.speaking}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {getUrl(el.speakingAudio) ? (
                                getUrl(el.speakingAudio)
                              ) : (
                                <p>Yuklanmoqda...</p>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <CustomModal el={el} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (students.student.length == 0) {
    return (
      <section>
        <div className="container">
          <div>
            <h2 className="text-xl text-bold text-center p-8  underline">
              Students were not Found
            </h2>
          </div>
        </div>
      </section>
    );
  }
}
