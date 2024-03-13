import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  addPhotoHandale: (data: FormData) => void;
};

type formImage = {
  image: File | null;
  description: string;
};

type formImageError = {
  image: boolean;
  description: boolean;
};

const DialogForm = ({ open, handleClose, title, addPhotoHandale }: props) => {
  const [imageForm, setImageForm] = useState<formImage>({
    image: null,
    description: "",
  });
  const [errors, setErrors] = useState<formImageError>({
    image: false,
    description: false,
  });

  const addPhotoButton = () => {
    if (imageForm.image === null || imageForm.description === "") {
      setErrors({
        image: imageForm.image === null ? true : false,
        description: imageForm.description === "" ? true : false,
      });
      return;
    }
    const formData = new FormData();
    formData.append("image", imageForm.image!);
    formData.append("description", imageForm.description);
    addPhotoHandale(formData);

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          borderRadius: "10px",
          width: "30%",
          height: "40%",
          display: "flex",
          //   flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "2rem",
          textTransform: "capitalize",
          fontWeight: "bold",
          fontFamily: "cursive",
          color: "#546e7a",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <TextField
          id="upload-photo"
          sx={{}}
          required
          type="file"
          variant="outlined"
          onChange={(e) => {
            setImageForm({
              ...imageForm,
              image: (e.target as HTMLInputElement).files![0],
            });
            setErrors({ ...errors, image: false });
          }}
          error={errors.image}
          helperText={"image is required"}
        />
        <TextField
          label="Description"
          variant="outlined"
          required
          multiline
          onChange={(e) => {
            setErrors({ ...errors, description: false });
            setImageForm({
              ...imageForm,
              description: e.target.value,
            });
          }}
          error={errors.description}
          helperText={"description is required"}
        />
        <Stack spacing={2} direction="row" justifyContent="center">
          <Button variant="contained" onClick={handleClose} autoFocus>
            CANCEL
          </Button>
          <Button
            variant="contained"
            onClick={addPhotoButton}
            endIcon={<AddIcon />}
          >
            ADD
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
