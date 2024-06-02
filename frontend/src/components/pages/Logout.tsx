import { Button } from "@mui/material";
import { Header } from "../util/Misc";

function Logout() {
  return (
    <>
      <div className="flex flex-col justify-center gap-10 p-5 xl:flex-row">
        <div className="p-10 flex flex-col gap-5 items-center border-2">
          <Header text="Are you sure you want to logout?" />
          <br />
          <div className="flex flex-row gap-5">
            <Button variant="outlined" size="large">
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
