import { Button, Chip, InputAdornment, TextField } from "@mui/material";
import { CommentCard, UserCard } from "../util/Cards";
import { Header, SplitBar } from "../util/Misc";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import Notifbar from "../util/Notifbar";
import { useCookies } from "react-cookie";

function AuctionPage() {
  const [bidValue, setBidValue] = useState(0);

  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");
  const [cookie] = useCookies(["token"]);

  const { auctionID } = useParams();
  const [auctionData, setAuctionData] = useState({
    _id: "",
    title: "",
    description: "",
    basePrice: 0,
    tags: [],
    seller: { username: "", email: "" },
    startDate: "",
    endDate: "",
    isPrivate: false,
    currentBid: {
      _id: "",
      value: 0,
      bidder: {
        _id: "",
        username: "",
      },
    },
  });
  const [biddingData, setBiddingData] = useState([
    {
      _id: "",
      value: 0,
      bidder: {
        _id: "",
        username: "",
      },
    },
  ]);

  async function getAuctionData() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/getone/auction",
        { id: auctionID },
        { withCredentials: true }
      );
      if (response.status === 200) setAuctionData(response.data);
    } catch (error) {
      let errorMessage: string = "Failed to retrieve auction data ";
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) return navigate("/notfound");
        errorMessage = error.message;
      }
      setNotifMessage(errorMessage);
      setNotifOpen(true);
    }
  }
  async function getBiddingData() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/getall/bids",
        { id: auctionID },
        { withCredentials: true }
      );
      if (response.status === 200) setBiddingData(response.data);
    } catch (error) {
      let errorMessage: string = "Failed to retrieve bidding data ";
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) return navigate("/notfound");
        errorMessage = error.message;
      }
      setNotifMessage(errorMessage);
      setNotifOpen(true);
    }
  }
  useEffect(() => {
    getAuctionData();
    getBiddingData();
  }, [, notifOpen]);

  async function handleBid() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/makeone/bid",
        { value: bidValue, auction: auctionID },
        { withCredentials: true, headers: { Authorization: cookie.token } }
      );

      if (response.status === 201) {
        setNotifMessage(response.data);
        setNotifOpen(true);
      }
    } catch (error) {
      let errorMessage: string = "Failed to create room";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data;
      }
      setNotifMessage(errorMessage);
      setNotifOpen(true);
    }
  }

  function showDays() {
    const start = new Date(auctionData.startDate).getTime();
    const today = new Date().getTime();
    const end = new Date(auctionData.endDate).getTime();

    if (today < start) {
      return (
        <div className="text-lg">
          <span className="text-gray-500">Starts in: </span>
          {Math.round((start - today) / (1000 * 60 * 60 * 24))} days ({" "}
          {new Date(auctionData.startDate).toDateString()} )
        </div>
      );
    } else if (start <= today && today <= end) {
      return (
        <div className="text-lg">
          <span className="text-gray-500">Ends in: </span>
          {Math.round((end - today) / (1000 * 60 * 60 * 24))} days ({" "}
          {new Date(auctionData.endDate).toDateString()} )
        </div>
      );
    } else {
      return (
        <div className="text-lg">
          <span className="text-gray-500">Ended on: </span>
          {new Date(auctionData.endDate).toDateString()}
        </div>
      );
    }
  }
  return (
    <>
      <div className="m-5">
        <div className="flex flex-row justify-end">
          <div className="w-3/4 flex flex-col pr-5">
            <div className="text-left flex flex-col gap-1 capitalize">
              <Header text={auctionData.title} />
              <div className="flex flex-row flex-wrap gap-1 pt-2">
                {auctionData.tags.map((tag) => {
                  return (
                    <Chip
                      key={crypto.randomUUID()}
                      label={tag}
                      variant="outlined"
                      size="small"
                    />
                  );
                })}
              </div>
              <div className="text-xl text-wrap truncate">
                {auctionData.description}
              </div>
              <SplitBar />
            </div>

            <div className="flex flex-col gap-2">
              {showDays()}
              <div className="flex flex-row items-center gap-5">
                <div className="text-2xl w-[130px]">Start Bid:</div>
                <div className="text-xl border-2 border-gray-00 rounded-md py-2 px-5">
                  $ {auctionData.basePrice}
                </div>
              </div>
              <div className="flex flex-row items-center gap-5">
                <div className="text-2xl w-[130px]">Current Bid:</div>
                <div className="text-xl border-2 border-gray-00 rounded-md py-2 px-5">
                  ${" "}
                  {auctionData.currentBid === undefined
                    ? auctionData.basePrice
                    : auctionData.currentBid.value}
                </div>
              </div>

              <div className="flex flex-row items-center justify-start gap-4">
                <div className="text-3xl">Set Amount:</div>
                <TextField
                  required
                  sx={{ width: "150px" }}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  autoComplete="off"
                  value={bidValue === 0 ? "" : bidValue}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setBidValue(
                      parseFloat(event.target.value) > 0
                        ? parseFloat(event.target.value)
                        : 0
                    );
                  }}
                />
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => handleBid()}
                >
                  Bid
                </Button>
              </div>
              <SplitBar />
            </div>

            <div className="flex flex-col gap-4">
              <Header text="Comments:" />
              {/* placeholder */}
              <CommentCard
                username="HelloDude"
                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua."
              />
              <CommentCard
                username="HelloDude"
                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua."
              />
              <CommentCard
                username="HelloDude"
                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua."
              />
              <CommentCard
                username="HelloDude"
                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua."
              />
            </div>
          </div>
          <div className="w-1/4 min-w-80 p-5 flex flex-col gap-2 bg-blue-500  ">
            <Header text="Users" />
            <div className="text-left text-xl">
              <div>Current Bids: {biddingData.length}</div>
            </div>
            <SplitBar />
            <UserCard
              userName={auctionData.seller.username}
              userRole="Seller"
            />
            <div className="flex flex-col-reverse gap-2">
              {biddingData.map((bid) => {
                return (
                  <UserCard
                    key={crypto.randomUUID()}
                    userName={bid.bidder.username}
                    userRole={`$ ${bid.value}`}
                  />
                );
              })}
            </div>
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

export default AuctionPage;
