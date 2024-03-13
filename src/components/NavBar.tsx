import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import weatherIcon from "../images/weatherIcon.png";
import { baseUrl, logout } from "../api/api";
import DialogUser from "./DialogUser";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const NavBar = ({ show }: { show: boolean }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, display: show ? "flex" : "none" }}>
      <AppBar position="static">
        <Toolbar>
          <img
            src={weatherIcon}
            alt="weather logo"
            style={{
              width: 50,
              height: 50,
            }}
          />
          <Typography sx={{ flexGrow: 1, ml: 2 }} variant="h6">
            Weather app
          </Typography>

          <Avatar
            onClick={() => setIsOpen(true)}
            alt={JSON.parse(localStorage.getItem("user") || "{}")?.name || ""}
            src={
              baseUrl +
              "/" +
              JSON.parse(localStorage.getItem("user") || "{}")?.imagePath
            }
            sx={{ cursor: "pointer" }}
          />
          <IconButton
            onClick={async () => {
              await logout();
              localStorage.clear();
              navigate("/");
            }}
            color="inherit"
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {isOpen && (
        <DialogUser open={isOpen} handleClose={() => setIsOpen(false)} />
      )}
    </Box>
  );
};

export default NavBar;
