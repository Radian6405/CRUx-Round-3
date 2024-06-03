import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Header } from "../util/Misc";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="flex flex-col justify-center gap-10 p-5 xl:flex-row">
        <LoginCard />
        <RegisterCard />
      </div>
    </>
  );
}

function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  async function handleLogin() {
    const response: Response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    return response;
  }

  return (
    <div
      className={
        "p-10 flex flex-col gap-5 items-center border-2" +
        (searchParams.get("page") === "register" ? " hidden" : " block")
      }
    >
      <Header text="Login" />
      <TextField
        required
        label="Username"
        sx={{ width: "400px" }}
        value={username}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUsername(event.target.value);
        }}
      />
      <FormControl required sx={{ width: "400px" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button variant="outlined" size="large" onClick={() => handleLogin()}>
        Login
      </Button>
      <div className="text-md">
        New here? click here to{" "}
        <span
          className="text-blue-500 hover:cursor-pointer"
          onClick={() => setSearchParams({ page: "register" })}
        >
          register
        </span>
      </div>
    </div>
  );
}

function RegisterCard() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div
      className={
        "p-10 flex flex-col gap-5 items-center border-2" +
        (searchParams.get("page") === "register" ? " block" : " hidden")
      }
    >
      <Header text="Register" />
      <TextField required label="Username" sx={{ width: "400px" }} />
      <TextField required label="Email" sx={{ width: "400px" }} />
      <FormControl required sx={{ width: "400px" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-register-password">
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-register-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm password"
        />
      </FormControl>
      <FormControl required sx={{ width: "400px" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-confirm-password">
          Confirm password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-confirm-password"
          type={showConfirmPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownConfirmPassword}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button variant="outlined" size="large">
        Register
      </Button>
      <div className="text-md">
        Already have an account? click here to{" "}
        <span
          className="text-blue-500 hover:cursor-pointer"
          onClick={() => setSearchParams({ page: "login" })}
        >
          login
        </span>
      </div>
    </div>
  );
}

export default Login;
