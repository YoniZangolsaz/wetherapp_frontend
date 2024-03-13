import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import weatherIcon from "../images/weatherIcon.png";
import LoginForm, { LoginInputsType } from "../components/LoginForm";
import RegisterForm, { RegisterServer } from "../components/RegisterForm";
import {
  createGoogleUser,
  createUser,
  login,
  loginWithGoogle,
} from "../api/api";
import SnackBar from "../components/SnackBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import googleIcon from "../images/googleIcon.png";

export type messageType = {
  open: boolean;
  type: any;
  message: string;
};

export type googleUser = {
  name: string;
  password: string;
  fullPath: string;
};

const Login = () => {
  const [loginState, setLoginState] = useState<string>("login");
  const [openMessage, setOpenMessage] = useState<messageType>({
    open: false,
    type: "",
    message: "",
  });

  let navigate = useNavigate();

  const registerSubmit = async (data: RegisterServer) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("password", data.password);
    formData.append("image", data.image);
    try {
      await createUser(formData);
      setOpenMessage({
        open: true,
        type: "success",
        message: "The user create successfully",
      });
      setLoginState("login");
    } catch (error) {
      setOpenMessage({
        open: true,
        type: "error",
        message: "There is a problem to create the user",
      });
    }
  };

  const loginSumbit = async (data: LoginInputsType) => {
    try {
      const loginUser = await login(data);
      localStorage.setItem("token", loginUser.token);
      localStorage.setItem("refreshToken", loginUser.refreshToken);
      localStorage.setItem("user", JSON.stringify(loginUser.user));
      navigate("/home");
    } catch (error) {
      setOpenMessage({
        open: true,
        type: "error",
        message: "The user or password is incorrect",
      });
    }
  };

  const onClickRegister = () => {
    setLoginState("sign up");
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await loginWithGoogle(response);
        try {
          const user = {
            name: res.email,
            password: res.sub,
            fullPath: res.picture,
          };

          const loginUser = await createGoogleUser(user);
          localStorage.setItem("token", loginUser.token);
          localStorage.setItem("refreshToken", loginUser.refreshToken);
          localStorage.setItem("user", JSON.stringify(loginUser.user));
          navigate("/home");
        } catch (error: any) {
          setOpenMessage({
            open: true,
            type: "error",
            message: "The user not found",
          });
        }
      } catch (error) {
        setOpenMessage({
          open: true,
          type: "error",
          message: "There is a prblem to sign in with google",
        });
      }
    },
  });

  return (
    <Container
      maxWidth="xs"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Card
        sx={{
          width: 400,
          height: 550,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        {loginState && loginState === "sign up" && (
          <Stack sx={{ width: "100%", ml: 1 }}>
            <IconButton
              sx={{ width: "10%" }}
              onClick={() => setLoginState("login")}
            >
              <ArrowBackIcon />
            </IconButton>
          </Stack>
        )}
        <img
          src={weatherIcon}
          alt="weather logo"
          style={{
            width: 80,
            height: 80,
            marginTop: loginState === "login" ? "16px" : "0px",
          }}
        />
        <Typography
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "bold",
            letterSpacing: "0.2rem",
            fontSize: "3rem",
            fontFamily: "poppins",
            opacity: 0.8,
          }}
        >
          {loginState}
        </Typography>
        {loginState && loginState === "login" ? (
          <>
            <LoginForm
              onSubmitData={loginSumbit}
              onClickRegister={onClickRegister}
            />
            <Box sx={{ mb: 2 }}>
              <Button
                variant="outlined"
                color="inherit"
                sx={{
                  mt: 2,
                  textTransform: "capitalize",
                  borderColor: "Gray",
                  fontFamily: "Google Sans,arial,sans-serif",
                }}
                onClick={() => handleGoogleLogin()}
              >
                <img
                  width="30"
                  height="30"
                  src={googleIcon}
                  style={{ marginRight: "8px" }}
                />
                Sign in with Google
              </Button>
            </Box>
          </>
        ) : (
          <RegisterForm onSubmitData={registerSubmit} />
        )}
        <SnackBar
          msg={openMessage.message}
          type={openMessage.type}
          open={openMessage.open}
          onClose={() => setOpenMessage({ open: false, type: "", message: "" })}
        />
      </Card>
    </Container>
  );
};

export default Login;
