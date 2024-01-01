import React from "react";
import TextField from "@mui/material/TextField";

export default function TextFields({ setInfo, info, i }) {
  return (
    <TextField
      key={i}
      value={info[i].question}
      onChange={(e) => {
        setInfo([
          ...info.map((el, inx) => {
            if (inx == i) {
              return {
                id: i,
                question: e.target.value,
              };
            }
            return el;
          }),
        ]);
      }}
      fullWidth
      label={`Write A Question - ${i + 1}`}
      id="fullWidth"
    />
  );
}
