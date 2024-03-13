import { Alert, Snackbar } from "@mui/material";

type alertType = {
  msg: string;
  type: any;
  open: boolean;
  onClose: () => void;
};

function SnackBar({ msg, type, open, onClose }: alertType) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
}

export default SnackBar;
