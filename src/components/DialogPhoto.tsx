import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Box,
  Stack,
  TextField,
  Typography,
  IconButton,
  Divider,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  baseUrlPhoto,
  getCommentsByPhotoId,
  postComment,
  updateDescription,
} from "../api/api";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

type props = {
  open: boolean;
  handleClose: () => void;
  photo: any;
  deletePhoto: (id: string) => void;
};

const DialogPhoto = ({ open, handleClose, photo, deletePhoto }: props) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editDescription, setEditDescription] = useState<string>(
    photo.description
  );
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<
    {
      comment: string;
      userName: string;
    }[]
  >([]);

  const getComments = async () => {
    const data = await getCommentsByPhotoId(photo._id);
    setComments(data);
  };
  useEffect(() => {
    getComments();
  }, []);

  const addComment = async () => {
    await postComment(photo._id, comment);
    setComment("");
    getComments();
  };

  const saveUpdate = async () => {
    try {
      if (editDescription === "") return;
      await updateDescription(photo._id, editDescription);
      setIsEdit((prev) => !prev);
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
          width: "80%",
        }}
      >
        {user._id == photo.user._id ? (
          <IconButton
            onClick={() => deletePhoto(photo._id)}
            style={{ position: "absolute", top: 2, right: 2 }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        ) : (
          <></>
        )}
        <img
          srcSet={`${baseUrlPhoto}${photo.path}`}
          src={`${baseUrlPhoto}${photo.path}`}
          alt={photo.title}
          loading="lazy"
          style={{ width: "100%", height: "55%" }}
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center", mt: 3 }}
        >
          {!isEdit ? (
            <Typography variant="h5" sx={{ textAlign: "center", mt: 2 }}>
              {editDescription}
            </Typography>
          ) : (
            <TextField
              id="outlined-basic"
              label="Edit Description"
              variant="outlined"
              value={editDescription}
              onChange={(e) => {
                setEditDescription(e.target.value);
              }}
            />
          )}
          {user._id == photo.user._id ? (
            !isEdit ? (
              <IconButton onClick={() => setIsEdit((prev) => !prev)}>
                <EditIcon sx={{ fontSize: 20 }} color="primary" />
              </IconButton>
            ) : (
              <IconButton onClick={saveUpdate}>
                <SaveIcon sx={{ fontSize: 20 }} color="primary" />
              </IconButton>
            )
          ) : (
            <></>
          )}
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center", mt: 3 }}
        >
          <TextField
            id="outlined-basic"
            label="Add Comment"
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={addComment}
          >
            Add
          </Button>
        </Stack>
        <Box sx={{ height: "40%", overflow: "auto" }}>
          {comments.map((comment, index) => {
            return (
              <>
                <Box sx={{ display: "flex", mt: 1, alignItems: "center" }}>
                  <Chip
                    size="small"
                    label={index}
                    color="primary"
                    variant="outlined"
                  />

                  <Typography
                    key={index}
                    variant="h6"
                    sx={{ ml: 1, width: "90%" }}
                  >
                    {comment.comment}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                  by: {comment.userName}
                </Typography>
                <Divider />
              </>
            );
          })}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPhoto;
