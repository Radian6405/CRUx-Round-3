import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { Header } from "../util/Misc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

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

  async function handleRegister() {
    if (password !== confirmPassword)
      return console.log("invalid confirm password");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        { username, email, password },
        { withCredentials: true }
      );
      setCookie("token", response.data.token, {
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      return navigate("/verify");
    } catch (error) {
      console.error("Error during login:", error);
      return null;
    }
  }

  return (
    <div className="p-10 flex flex-col gap-5 items-center">
      <Header text="Register" />
      <TextField
        required
        label="Username"
        sx={{ width: "400px" }}
        value={username}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUsername(event.target.value);
        }}
      />
      <TextField
        required
        label="Email"
        sx={{ width: "400px" }}
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value);
        }}
      />
      <FormControl required sx={{ width: "400px" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-register-password">
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-register-password"
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
          value={confirmPassword}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(event.target.value);
          }}
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
      <Button variant="outlined" size="large" onClick={() => handleRegister()}>
        Sumbit
      </Button>
      <div className="text-md">
        Already have an account? click here to{" "}
        <span className="text-blue-500 hover:cursor-pointer">
          <Link to="/login">login</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
