import { Button } from "@mui/material";
import { Header } from "../util/Misc";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";

function Logout() {
  const [cookie, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  async function getUserData() {
    try {
      const statusResponse = await axios.get(
        "http://localhost:8000/api/status",
        {
          withCredentials: true,
          headers: { Authorization: cookie.token },
        }
      );
      return statusResponse;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) return navigate("/login");
      }
    }
  }
  useEffect(() => {
    getUserData();
  }, [, cookie]);

  function handleLogout() {
    removeCookie("token");
    return navigate("/");
  }
  return (
    <>
      <div className="flex flex-col justify-center gap-10 p-5 xl:flex-row">
        <div className="p-10 flex flex-col gap-5 items-center border-2">
          <Header text="Are you sure you want to logout?" />
          <br />
          <div className="flex flex-row gap-5">
            <Button
              variant="outlined"
              size="large"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
            <Button variant="outlined" size="large">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Logout;
