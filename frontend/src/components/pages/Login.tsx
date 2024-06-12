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
import axios, { AxiosError } from "axios";
import { useCookies } from "react-cookie";
import Notifbar from "../util/Notifbar";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [notifOpen, setNotifOpen] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");
  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  async function handleLogin() {
    const isValidUsername = /^[0-9A-Za-z]{6,16}$/;

    if (username === "" || password === "") {
      setNotifMessage("fill all the required fields");
      setNotifOpen(true);
      return;
    }
    if (!isValidUsername.test(username)) {
      setNotifMessage("Not a valid username");
      setNotifOpen(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        { username, password },
        { withCredentials: true }
      );
      setCookie("token", response.data, { path: "/", maxAge: 60 * 60 * 24 });

      return navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setNotifMessage(error.response?.data);
        setNotifOpen(true);
      }
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
      <Notifbar
        open={notifOpen}
        setOpen={setNotifOpen}
        message={notifMessage}
      />
    </>
  );
}

export default Login;
