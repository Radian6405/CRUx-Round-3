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
  const [comment, setComment] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

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
    isCommentDisabled: false,
    images: [],
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
  const [commentData, setCommentData] = useState([
    {
      _id: "",
      text: "",
      user: {
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
      if (response.status === 200) {
        setAuctionData(response.data.data);
        setIsAuthenticated(response.data.isAuthenticated);
        console.log(response.data.isAuthenticated);
      }
    } catch (error) {
      let errorMessage: string = "Failed to retrieve auction data ";
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) return navigate("/notfound");
        else errorMessage = error.message;
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
        else errorMessage = error.message;
      }
      setNotifMessage(errorMessage);
      setNotifOpen(true);
    }
  }
  async function getCommentData() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/getall/comments",
        { id: auctionID },
        { withCredentials: true }
      );
      if (response.status === 200) setCommentData(response.data);
    } catch (error) {
      let errorMessage: string = "Failed to retrieve bidding data ";
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) return navigate("/notfound");
        else errorMessage = error.message;
      }
      setNotifMessage(errorMessage);
      setNotifOpen(true);
    }
  }
  useEffect(() => {
    getAuctionData();
    getBiddingData();
    getCommentData();
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
      let errorMessage: string = "Failed to create a bid";
      if (error instanceof AxiosError) {
        if (error.response?.status === 403)
          errorMessage = "Login to start bidding";
        else errorMessage = error.response?.data;
      }
      setNotifMessage(errorMessage);
      setNotifOpen(true);
    }
  }
  async function handleComment() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/makeone/comment",
        { text: comment, auction: auctionID },
        { withCredentials: true, headers: { Authorization: cookie.token } }
      );

      if (response.status === 201) {
        setNotifMessage(response.data);
        setNotifOpen(true);
        setComment("");
      }
    } catch (error) {
      let errorMessage: string = "Failed to create a comment";
      if (error instanceof AxiosError) {
        if (error.response?.status === 403)
          errorMessage = "Login to start commenting";
        else errorMessage = error.response?.data;
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
            </div>
            <SplitBar />
            <div
              className={auctionData.images.length !== 0 ? "block" : "hidden"}
            >
              <div className="flex flex-wrap gap-5">
                {auctionData.images.map((image) => {
                  return <img src={image} alt="image" className="w-[30%]" />;
                })}
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

              <div
                className={"flex flex-row items-center justify-start gap-4".concat(
                  " ",
                  isAuthenticated ? "" : "hidden"
                )}
              >
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
              <Header
                text={
                  auctionData.isCommentDisabled
                    ? "Comments diabled"
                    : "Comments:"
                }
              />
              {!auctionData.isCommentDisabled && isAuthenticated && (
                <div className="flex flex-row flex-wrap justify-between">
                  <TextField
                    multiline
                    id="auction-comment"
                    placeholder="type here to comment"
                    rows={3}
                    className="w-5/6"
                    value={comment}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setComment(event.target.value);
                    }}
                  />
                  <div className="w-1/6 flex justify-center items-center">
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => handleComment()}
                    >
                      Comment
                    </Button>
                  </div>
                </div>
              )}
              <div
                className={"flex flex-col-reverse gap-2".concat(
                  " ",
                  auctionData.isCommentDisabled ? "hidden" : ""
                )}
              >
                {commentData.map((comment) => {
                  return (
                    <CommentCard
                      key={crypto.randomUUID()}
                      username={comment.user.username}
                      body={comment.text}
                    />
                  );
                })}
              </div>
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
