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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  async function handleLogin() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        { username, password },
        { withCredentials: true }
      );
      setCookie("token", response.data, { path: "/", maxAge: 60 * 60 * 24 });

      return navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      return null;
    }
  }
  return (
    <>
      <div className="p-10 flex flex-col gap-5 items-center">
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
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
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
          Submit
        </Button>
        <div className="text-md">
          New here? click here to{" "}
          <span className="text-blue-500 hover:cursor-pointer">
            <Link to="/register">register</Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;
