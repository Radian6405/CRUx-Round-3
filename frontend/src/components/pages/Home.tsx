import { useEffect, useState } from "react";
import { AuctionCard } from "../util/Cards";
import { Header, SplitBar } from "../util/Misc";
import axios from "axios";
import Notifbar from "../util/Notifbar";

function Home() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");
  const [auctionData, setAuctionData] = useState([
    {
      _id: "",
      title: "",
      description: "",
      basePrice: 0,
      tags: [],
      seller: { username: "" },
      currentBid: {
        _id: "",
        value: 0,
      },
    },
  ]);

  async function getAuctionData() {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/getall/auctions/public",
        { withCredentials: true }
      );
      setAuctionData(response.data);
    } catch (error) {
      let errorMessage: string = "Failed to retrieve auction data ";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setNotifMessage(errorMessage);
      setNotifOpen(true);
    }
  }

  useEffect(() => {
    getAuctionData();
  }, []);

  return (
    <>
      <div className="m-5 ">
        <Header text="Active Listings" />
        <SplitBar />
        <div className="flex flex-wrap justify-start gap-4">
          {auctionData.map((auction) => {
            return (
              <AuctionCard
                key={crypto.randomUUID()}
                to={`/auctions/${auction._id}`}
                title={auction.title}
                description={auction.description}
                listerUsername={auction.seller.username}
                startBid={auction.basePrice}
                currentBid={
                  auction.currentBid === undefined
                    ? auction.basePrice
                    : auction.currentBid.value
                }
                auctionTags={auction.tags}
              />
            );
          })}
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

export default Home;
