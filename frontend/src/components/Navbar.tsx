import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
// import { Cookies } from "react-cookie";

export default function Navbar() {
  const [username, setUsername] = useState("");
  const [cookie] = useCookies(["token"]);
  async function getUserData() {
    const statusResponse = await axios.get("http://localhost:8000/api/status", {
      withCredentials: true,
      headers: { Authorization: cookie.token },
    });
    statusResponse.data.username !== undefined
      ? setUsername(statusResponse.data.username)
      : setUsername("");
    // console.log(statusResponse.data.username);
  }
  useEffect(() => {
    getUserData();
  }, [, cookie]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="justify-between gap-10">
          <div className="mx-10">
            <Link to={"/"}>
              <Button color="inherit">Auctions</Button>
            </Link>
            <Link to={"/rooms"}>
              <Button color="inherit">Rooms</Button>
            </Link>
            <Link to={"/create"}>
              <Button color="inherit">Create</Button>
            </Link>
          </div>
          <div className="mx-10">
            {username !== "" ? (
              <>
                <Link to={"/logout"}>
                  <Button color="inherit">Logout</Button>
                </Link>
                <Button variant="contained">{username}</Button>
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <Button color="inherit">Login</Button>
                </Link>
                <Link to={"/register"}>
                  <Button color="inherit">Register</Button>
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
