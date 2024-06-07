import { CloseOutlined } from "@mui/icons-material";
import { IconButton, Snackbar } from "@mui/material";
import React from "react";

function Notifbar({
  open,
  setOpen,
  message,
}: {
  open: boolean;
  setOpen: Function;
  message: string;
}) {
  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseOutlined fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={action}
    />
  );
}

export default Notifbar;
