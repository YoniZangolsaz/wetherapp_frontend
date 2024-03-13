import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Wether from "../components/Weather";
import ListOfImage from "../components/ImageList";
import DialogForm from "../components/Dialog";
import { createPhoto, deletePhoto, getAllPhotos } from "../api/api";
import DialogPhoto from "../components/DialogPhoto";
import { useNavigate } from "react-router-dom";

type formImage = {
  image: File;
  description: string;
};

const Home = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openPhoto, setOpenPhoto] = useState<formImage | undefined>(undefined);
  const [imgs, setImgs] = useState([]);
  const navigate = useNavigate();

  const getImages = async () => {
    const images = await getAllPhotos();
    setImgs(images);
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    } else {
      getImages();
    }
  }, []);
  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const photoHandaleSubmit = async (data: FormData) => {
    try {
      await createPhoto(data);
      getImages();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePhoto = async (id: string) => {
    await deletePhoto(id);
    await getImages();
    setOpenPhoto(undefined);
  };
  return (
    <Box
      sx={{ display: "flex", height: "100%", justifyContent: "space-evenly" }}
    >
      <Wether />
      <ListOfImage
        imgs={imgs}
        addPhotoButton={openDialog}
        choosePhoto={(photo) => setOpenPhoto(photo)}
      />
      <DialogForm
        open={open}
        handleClose={closeDialog}
        title={"add Photo"}
        addPhotoHandale={photoHandaleSubmit}
      />
      {!!openPhoto && (
        <DialogPhoto
          deletePhoto={handleDeletePhoto}
          open={!!openPhoto}
          handleClose={() => setOpenPhoto(undefined)}
          photo={openPhoto}
        />
      )}
    </Box>
  );
};

export default Home;
