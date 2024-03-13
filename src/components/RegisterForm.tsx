import {
  Box,
  Button,
  Checkbox,
  Fab,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";

type RegisterInputsType = {
  name: string;
  password: string;
  confirmPassword: string | undefined;
  image: FileList | null;
};

export type RegisterServer = {
  name: string;
  password: string;
  image: File;
};

type props = {
  onSubmitData: (data: RegisterServer) => void;
};

const RegisterForm = ({ onSubmitData }: props) => {
  const loginForm = useForm<RegisterInputsType>({
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
      image: null,
    },
  });

  const { register, handleSubmit, formState, watch } = loginForm;
  const { errors } = formState;

  const onSubmit = (data: RegisterInputsType) => {
    const newData = {
      name: data.name,
      password: data.password,
      image: data.image![0],
    };
    onSubmitData(newData);
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
      <Stack spacing={1.5}>
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
        <Stack direction="row" spacing={1}>
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
          <TextField
            label="Confirm Password"
            type="password"
            required
            variant="outlined"
            {...register("confirmPassword", {
              required: "confirm is required",
              validate: (value) =>
                value === loginForm.getValues("password") ||
                "passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </Stack>
        <Stack direction="row">
          <label htmlFor="upload-photo" style={{ marginTop: 1 }}>
            <TextField
              id="upload-photo"
              sx={{ display: "none" }}
              required
              type="file"
              variant="outlined"
              {...register("image", {
                required: "image is required",
              })}
              helperText={errors.image?.message}
            />
            <Fab
              color="primary"
              size="small"
              variant="extended"
              component="span"
              aria-label="add"
            >
              <AddIcon /> Upload photo
            </Fab>
            <Checkbox disabled checked={!!watch("image")} />

            {!!errors.image && (
              <Typography
                sx={{ fontSize: "0.9rem", textAlign: "start", ml: 1 }}
                color="error"
              >
                {errors.image?.message}
              </Typography>
            )}
          </label>
        </Stack>
      </Stack>
      <Button type="submit" variant="contained">
        sign up
      </Button>
    </Box>
  );
};

export default RegisterForm;
