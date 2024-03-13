import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { baseUrl, deleteUser, updateUserNameByUserId } from "../api/api";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

type props = {
  open: boolean;
  handleClose: () => void;
};

const DialogUser = ({ open, handleClose }: props) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(user.name);
  const navigate = useNavigate();

  const saveUpdate = async () => {
    try {
      if (editName === "") return;
      const newUser = await updateUserNameByUserId(user._id, editName);
      localStorage.setItem("user", JSON.stringify(newUser));
      setIsEdit((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccount = async () => {
    try {
      await deleteUser(user._id);
      localStorage.clear();
      navigate("/");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          borderRadius: "10px",
          width: "80%",
          height: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <img
          srcSet={
            user.imagePath ? `${baseUrl}/${user.imagePath}` : user.fullPath
          }
          src={user.imagePath ? `${baseUrl}/${user.imagePath}` : user.fullPath}
          alt={user.name}
          loading="lazy"
          style={{ width: "100%", height: "70%" }}
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center", mt: 3 }}
        >
          {!isEdit ? (
            <>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  mt: 2,
                  border: "1px solid grey",
                  px: 5,
                  py: 1,
                  borderRadius: 2,
                  fontWeight: "bold",
                  boxShadow: 1,
                  fontFamily: "cursive",
                }}
              >
                {editName}
              </Typography>
              {user.imagePath && (
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  color="info"
                  onClick={() => setIsEdit((prev) => !prev)}
                >
                  Update Name
                </Button>
              )}
            </>
          ) : (
            <>
              <TextField
                id="outlined-basic"
                label="Edit User Name"
                variant="outlined"
                value={editName}
                onChange={(e) => {
                  setEditName(e.target.value);
                }}
              />
              <Button
                variant="contained"
                endIcon={<SaveIcon />}
                onClick={saveUpdate}
              >
                save
              </Button>
            </>
          )}
        </Stack>
        <Button
          variant="contained"
          endIcon={<DeleteIcon />}
          onClick={deleteAccount}
          color="error"
          sx={{ width: "50%" }}
        >
          Delete Account
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUser;
