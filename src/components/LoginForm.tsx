import {} from "react";
import { Box, Button, Link, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

export type LoginInputsType = {
  name: string;
  password: string;
};

type props = {
  onSubmitData: (data: LoginInputsType) => void;
  onClickRegister: () => void;
};

const LoginForm = ({ onSubmitData, onClickRegister }: props) => {
  const loginForm = useForm<LoginInputsType>({
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState } = loginForm;
  const { errors } = formState;

  const onSubmit = (data: LoginInputsType) => {
    onSubmitData(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        width: "80%",
        height: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Stack spacing={2}>
        <TextField
          label="Username"
          variant="outlined"
          required
          {...register("name", {
            required: "Username is required",
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Password"
          type="password"
          required
          variant="outlined"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </Stack>
      <Button type="submit" variant="contained">
        Login
      </Button>
      <Link
        onClick={onClickRegister}
        variant="body2"
        sx={{ cursor: "pointer", textAlign: "center" }}
      >
        {"Don't have an account? Sign Up"}
      </Link>
    </Box>
  );
};

export default LoginForm;
