import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState({isLoggedIn: false});
  async function getUserData() {
    const response = await fetch("http://localhost:8000/api/status");
    const data = await response.json();
    setUser(data);
    // console.log(data)
  }
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Link to={"/"}>
            <Button color="inherit">Auctions</Button>
          </Link>
          <Link to={"/rooms"}>
            <Button color="inherit">Rooms</Button>
          </Link>
          <Link to={"/create"}>
            <Button color="inherit">Create</Button>
          </Link>
          {user.isLoggedIn ? (
            <Link to={"/logout"}>
              <Button color="inherit">Logout</Button>
            </Link>
          ) : (
            <Link to={"/login"}>
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
