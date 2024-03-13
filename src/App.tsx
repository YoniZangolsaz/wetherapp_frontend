import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Typography, Button } from "@mui/material";
import LoginForm from "./components/LoginForm";
import Login from "./pages/Login";
import Test from "./pages/Test";
import Layout from "./components/Layout";
import App1 from "./components/DynamicForm";

function App() {
  return (
    <>
      {/* <Login /> */}
      <Layout />
      {/* <App1 /> */}
    </>
  );
}

export default App;
