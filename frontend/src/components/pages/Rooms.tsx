import { Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { Header, SplitBar } from "../util/Misc";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import Notifbar from "../util/Notifbar";

function Rooms() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");

  const [cookie] = useCookies(["token"]);
  const [roomData, setRoomData] = useState([
    {
      _id: "",
      name: "",
      description: "",
      creator: { username: "" },
      auctionCount: 0,
    },
  ]);

  async function getRoomData() {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/getall/rooms",
        {
          withCredentials: true,
          headers: { Authorization: cookie.token },
        }
      );
      setRoomData(response.data);
    } catch (error) {
      let errorMessage: string = "Failed to retrieve room data ";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setNotifMessage(errorMessage);
      setNotifOpen(true);
    }
  }

  useEffect(() => {
    getRoomData();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-2 p-5">
        <Header text="My Rooms" />
        <SplitBar />
        {roomData.map((room) => {
          return (
            <RoomListItem
              key={crypto.randomUUID()}
              to={`/rooms/${room._id}`}
              title={room.name}
              description={room.description}
              activeListings={room.auctionCount}
              adminUsername={room.creator.username}
            />
          );
        })}
      </div>
      <Notifbar
        open={notifOpen}
        setOpen={setNotifOpen}
        message={notifMessage}
      />
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
