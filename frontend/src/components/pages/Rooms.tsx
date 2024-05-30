import { Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { Header, SplitBar } from "../../util/Misc";

function Rooms() {
  return (
    <>
      <div className="flex flex-col gap-2 p-5">
        <Header text="My Rooms"/>
        <SplitBar />
        <RoomListItem
          to="/rooms/1"
          title="Room1"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          activeListings={5}
          adminUsername="GoodBoi"
        />
      </div>
    </>
  );
}

interface RoomListItemProps {
  to: string;
  title: string;
  description: string;
  activeListings: number;
  adminUsername: string;
}

function RoomListItem({
  to,
  title,
  description,
  activeListings,
  adminUsername,
}: RoomListItemProps) {
  return (
    <Link to={to}>
      <div className="flex flex-col gap-3 p-5 border-2 text-left">
        <div className="flex flex-row gap-2 items-end">
          <div className="text-4xl font-bold">{title}</div>
          <Chip label={adminUsername} variant="outlined" size="small" />
        </div>
        <div className="text-lg text-gray-500 truncate">{description}</div>
        <div className="text-xl ">Active Listings: {activeListings}</div>
      </div>
    </Link>
  );
}

export default Rooms;
