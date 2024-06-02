import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Navbar() {
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
          <Link to={"/login"}>
            <Button color="inherit">Login</Button>
          </Link>
          <Link to={"/logout"}>
            <Button color="inherit">Logout</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
