import { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { baseUrlPhoto, getAllPhotos } from "../api/api";

type props = {
  imgs: any;
  addPhotoButton: () => void;
  choosePhoto: (image: any) => void;
};
export default function ListOfImage({
  imgs,
  addPhotoButton,
  choosePhoto,
}: props) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [checked, setChecked] = useState(false);

  return (
    <Paper elevation={3} sx={{ height: "80%", mt: 6, width: "35%" }}>
      <Stack
        direction="row"
        sx={{
          mt: 2,
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            textTransform: "capitalize",
            color: "#546e7a",
            fontWeight: "bold",
            fontFamily: "poppins",
            flexGrow: 1,
          }}
        >
          whether images
        </Typography>
        <Tooltip title="Add Image" placement="top" sx={{ mr: 1 }}>
          <IconButton onClick={addPhotoButton}>
            <AddCircleIcon sx={{ fontSize: 40 }} color="primary" />
          </IconButton>
        </Tooltip>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={() => setChecked((prev) => !prev)}
            />
          }
          label="My photo"
        />
      </Stack>

      <Box
        sx={{
          width: "100%",
          height: "90%",
          display: "flex",
          alignContent: "flex-start",
          justifyContent: "center",
          flexWrap: "wrap",
          overflow: "auto",
        }}

        // variant="quilted"
      >
        {imgs
          .filter((item: any) => !checked || item.user._id === user._id)
          .map((item: any) => {
            return (
              <ImageListItem
                key={item.path}
                sx={{
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px 0px #000000",
                  // padding: "10px",
                  width: "40%",
                  margin: "10px",
                  "& .MuiImageListItem-img": {
                    height: "100px",
                    objectFit: "fill",
                  },
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  choosePhoto(item);
                }}
              >
                <img
                  srcSet={`${baseUrlPhoto}${item.path}`}
                  src={`${baseUrlPhoto}${item.path}`}
                  alt={item.title}
                  loading="lazy"
                />

                {/* <ImageListItemBar
                  title={item.description}
                  subtitle={<span>by: {item.user.name}</span>}
                  position="below"
                /> */}
              </ImageListItem>
            );
          })}
      </Box>
    </Paper>
  );
}
