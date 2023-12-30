"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Button, Divider, Grid, IconButton, Tooltip } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TextFields from "@/app/components/TextFields/TextFields";
import API from "@/app/components/api/Api";

function page() {
  let [loading, setLoading] = useState(false);
  let [info, setInfo] = useState([
    {
      id: 1,
      question: "",
    },
  ]);

  let handleUpload = async () => {
    setLoading(true);
    let data = await API.part_one({
      questions: [
        ...info.map((el) => {
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
    });
    if (data.success) {
      setInfo([
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
      <div className="container">
        <div>
          <h2 className="text-xl text-bold text-center p-8  underline">
            Add your first part questions here
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
                  disabled={info.length < 10 ? false : true}
                  onClick={() => {
                    if (info.length < 10) {
                      setInfo([
                        ...info,
                        {
                          id: info.length + 1,
                          question: "",
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
            <Tooltip title="Save questions">
              <span className="flex flex-row align-center justify-center">
                <LoadingButton
                  loading={loading}
                  size="medium"
                  disabled={info.length <= 4 ? true : false}
                  variant="outlined"
                  onClick={handleUpload}
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

export default page;
