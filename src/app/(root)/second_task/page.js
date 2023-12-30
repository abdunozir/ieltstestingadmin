"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { IconButton, Tooltip } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TextFields from "@/app/components/TextFields/TextFields";
import API from "@/app/components/api/Api";
import LoadingButton from "@mui/lab/LoadingButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomModal from "@/app/components/modal/CustomModal";

export default function page() {
  let [loading, setLoading] = useState(false);
  let [keyWord, setKeyWord] = useState("");
  let [info, setInfo] = useState([
    {
      id: 1,
      question: "",
    },
  ]);
  let [partThreeInfo, setPartThreeInfo] = useState([
    {
      id: 1,
      question: "",
    },
  ]);

  const notify = (text) => toast(text);

  let handleUpload = async () => {
    setLoading(true);
    let data = await API.part_two({
      part_two: {
        questions: [
          {
            question: info.reduce((accumulator, currentValue) => {
              if (currentValue.question.length > 0) {
                return accumulator + " " + currentValue.question;
              }
            }, ""),
          },
        ],

        thinkingTime: {
          count: 60,
          count_type: "Sekund",
        },
        speakingTime: {
          count: 120,
          count_type: "Secund",
        },
        isPremium: false,
      },
      part_three: {
        questions: [
          ...partThreeInfo.map((el) => {
            if (el.question.length > 0) {
              return {
                question: el.question,
              };
            }
          }),
        ],

        thinkingTime: {
          count: 5,
          count_type: "Sekund",
        },
        speakingTime: {
          count: 30,
          count_type: "Secund",
        },
        isPremium: false,
      },
    });

    if (data.success) {
      notify("Part two question was saved!");
      setInfo([
        {
          id: 1,
          question: "",
        },
      ]);
      setPartThreeInfo([
        {
          id: 1,
          question: "",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <section>
      <ToastContainer />
      <div className="container">
        <div>
          <h2 className="text-xl text-bold text-center p-8  underline">
            Add Your{" "}
            <span className="text-slate-600 text-2xl">
              Second Part Questions
            </span>{" "}
            Here
          </h2>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 ">
          {info.map((el, i) => {
            return (
              <div key={i}>
                <TextFields setInfo={setInfo} info={info} i={i} />
              </div>
            );
          })}
        </div>
        <br />
        <div className="flex flex-row align-center justify-end">
          <Box className="flex flex-row  align-center">
            <Tooltip title="Remove One Last Question">
              <span className="flex flex-row align-center justify-center">
                <IconButton
                  disabled={info.length != 0 ? false : true}
                  onClick={() => {
                    if (info.length > 0) {
                      info.pop();
                      setInfo([...info]);
                    }
                  }}
                  color="delete"
                >
                  <HighlightOffIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Add New Question">
              <span className="flex flex-row align-center justify-center">
                <IconButton
                  disabled={info.length <= 4 ? false : true}
                  onClick={() => {
                    if (info.length <= 4) {
                      setInfo([
                        ...info,
                        {
                          id: info.length + 1,
                        },
                      ]);
                    }
                  }}
                  color="primary"
                >
                  <ControlPointIcon />
                </IconButton>
              </span>
            </Tooltip>
            {/* <Tooltip title="Save New Question">
              <span className="flex flex-row align-center justify-center">
                <CustomModal
                  loading={loading}
                  info={info}
                  handleUpload={handleUpload}
                  setKeyWord={setKeyWord}
                  keyWord={keyWord}
                />
              </span>
            </Tooltip> */}
          </Box>
        </div>
        <div>
          <h2 className="text-xl text-bold text-center p-8  underline">
            Add Your{" "}
            <span className="text-slate-600 text-2xl">
              Third Part Questions
            </span>{" "}
            Here
          </h2>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 ">
          {partThreeInfo.map((el, i) => {
            return (
              <div key={i}>
                <TextFields
                  setInfo={setPartThreeInfo}
                  info={partThreeInfo}
                  i={i}
                />
              </div>
            );
          })}
        </div>
        <br />
        <div className="flex flex-row align-center justify-end">
          <Box className="flex flex-row  align-center">
            <Tooltip title="Remove One Last Question">
              <span className="flex flex-row align-center justify-center">
                <IconButton
                  disabled={partThreeInfo.length != 0 ? false : true}
                  onClick={() => {
                    if (partThreeInfo.length > 0) {
                      partThreeInfo.pop();
                      setPartThreeInfo([...partThreeInfo]);
                    }
                  }}
                  color="delete"
                >
                  <HighlightOffIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Add New Question">
              <span className="flex flex-row align-center justify-center">
                <IconButton
                  disabled={partThreeInfo.length <= 4 ? false : true}
                  onClick={() => {
                    if (partThreeInfo.length <= 4) {
                      setPartThreeInfo([
                        ...partThreeInfo,
                        {
                          id: partThreeInfo.length + 1,
                        },
                      ]);
                    }
                  }}
                  color="primary"
                >
                  <ControlPointIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Save New Question">
              <span className="flex flex-row align-center justify-center">
                <LoadingButton
                  onClick={handleUpload}
                  loading={loading}
                  size="small"
                  disabled={
                    info.length + partThreeInfo.length < 3 ? true : false
                  }
                  variant="outlined"
                >
                  Save
                </LoadingButton>
              </span>
            </Tooltip>
          </Box>
        </div>
      </div>
    </section>
  );
}
