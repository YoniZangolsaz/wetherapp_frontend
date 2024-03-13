import { Box } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import NavBar from "./NavBar";
import Home from "../pages/Home";

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <Box sx={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <NavBar show={!(pathname == "/")} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Box>
  );
};

export default Layout;
