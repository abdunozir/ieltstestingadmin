import * as React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { LoadingButton } from "@mui/lab";
import { IconButton, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { editStudent } from "@/redux/features/student/student";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomModal({ el }) {
  const [open, setOpen] = React.useState(false);
  let [scores, setScores] = useState({ ...el });

  let dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (scores) {
      dispatch(editStudent({ ...scores }));
      handleClose();
    }
  };
  return (
    <React.Fragment>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <ModeEditOutlineIcon />
      </IconButton>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Student Name"}</DialogTitle>
        <DialogContent>
          <div className="grid grid-rows-2 grid-cols-2 gap-2 align-center justify-center">
            <TextField
              className="mt-2"
              fullWidth
              id="outlined-basic"
              label="Writing"
              variant="outlined"
              value={scores.writing}
              onChange={(e) => {
                setScores({ ...scores, writing: e.target.value });
              }}
            />
            <TextField
              className="mt-2"
              fullWidth
              id="outlined-basic"
              label="Reading"
              variant="outlined"
              value={scores.reading}
              onChange={(e) => {
                setScores({ ...scores, reading: e.target.value });
              }}
            />
            <TextField
              className="mt-2"
              fullWidth
              id="outlined-basic"
              label="Listening"
              variant="outlined"
              value={scores.listening}
              onChange={(e) => {
                setScores({ ...scores, listening: e.target.value });
              }}
            />
            <TextField
              className="mt-2"
              fullWidth
              id="outlined-basic"
              label="Speaking"
              variant="outlined"
              value={scores.speaking}
              onChange={(e) => {
                setScores({ ...scores, speaking: e.target.value });
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <LoadingButton onClick={handleSave} size="small" variant="outlined">
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
