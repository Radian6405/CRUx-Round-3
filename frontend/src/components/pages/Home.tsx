import { useEffect, useState } from "react";
import { AuctionCard } from "../util/Cards";
import { Header, SplitBar } from "../util/Misc";
import axios from "axios";

function Home() {
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

  async function getAuctionData() {
    const response = await axios.get(
      "http://localhost:8000/api/getall/auctions/public",
      {
        withCredentials: true,
      }
    );
    setAuctionData(response.data);
    // console.log(response.data);
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
                currentBid={0} //placeholder
                auctionTags={auction.tags}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
