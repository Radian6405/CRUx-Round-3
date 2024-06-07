import { Header, SplitBar } from "../util/Misc";
import { AuctionCard, UserCard } from "../util/Cards";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Notifbar from "../util/Notifbar";

function RoomView() {
  const navigate = useNavigate();

  const [notifOpen, setNotifOpen] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");

  const { roomID } = useParams();
  const [roomData, setRoomData] = useState({
    _id: "",
    name: "",
    description: "",
    creator: { _id: "", username: "" },
    admins: [{ _id: "", username: "" }],
    members: [{ _id: "", username: "" }],
    auctionCount: 0,
  });
  const [auctionData, setAuctionData] = useState([
    {
      _id: "",
      title: "",
      description: "",
      basePrice: 0,
      tags: [],
      seller: { username: "" },
    },
  ]);

  async function getRoomData() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/getone/room",
        { id: roomID },
        { withCredentials: true }
      );
      setRoomData(response.data);
    } catch (error) {
      let errorMessage: string = "Failed to retrieve room data ";
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          return navigate("/notfound");
        }
      }
      setNotifMessage(errorMessage);
      setNotifOpen(true);
    }
  }

  async function getAuctionData() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/getall/auctions/room",
        { id: roomID },
        { withCredentials: true }
      );
      setAuctionData(response.data);
    } catch (error) {
      let errorMessage: string = "Failed to retrieve auction data ";
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          return navigate("/notfound");
        }
      }
      setNotifMessage(errorMessage);
      setNotifOpen(true);
    }
  }

  useEffect(() => {
    getRoomData();
    getAuctionData();
  }, []);

  return (
    <>
      <div className="mx-10 mt-5">
        <div className="flex flex-row justify-between  ">
          <div className="text-left">
            <Header text={roomData.name} />
            <div className="text-lg text-gray-500 text-wrap truncate">
              {roomData.description}
            </div>
          </div>
          <div className="text-right text-xl">
            <div>by {roomData.creator.username}</div>
            <div>Active auctions: {roomData.auctionCount}</div>
          </div>
        </div>
        <SplitBar />
        <div className="flex flex-row justify-end">
          <div className="w-4/5 flex flex-wrap justify-start gap-4 pr-5 ">
            {auctionData.map((auction) => {
              return (
                <AuctionCard
                  key={crypto.randomUUID()}
                  to={`/auctions/${auction._id}`}
                  title={auction.title}
                  description={auction.description}
                  listerUsername={auction.seller.username}
                  startBid={auction.basePrice}
                  currentBid={0} //placeholder
                  auctionTags={auction.tags}
                />
              );
            })}
          </div>
          <div className="w-1/5 min-w-80 p-5 flex flex-col gap-2 bg-blue-500  ">
            <Header text="Users" />
            <SplitBar />
            <UserCard userName={roomData.creator.username} userRole="Creator" />
            {roomData.admins.map((admin) => {
              return (
                <UserCard
                  key={crypto.randomUUID()}
                  userName={admin.username}
                  userRole="Admin"
                />
              );
            })}
            {roomData.members.map((member) => {
              return (
                <UserCard
                  key={crypto.randomUUID()}
                  userName={member.username}
                  userRole="Member"
                />
              );
            })}
          </div>
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

export default RoomView;
