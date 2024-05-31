import { AuctionCard } from "../util/Cards";
import { Header, SplitBar } from "../util/Misc";

function Home() {
  return (
    <>
      <div className="m-5 ">
        <Header text="Active Listings" />
        <SplitBar />
        <div className="flex flex-wrap justify-start gap-4">
          <AuctionCard
            to="/auctions/1"
            title="Auction 1"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            listerUsername="Gamerboi1"
            startBid={35}
            currentBid={45}
            auctionTags={["hallo", "hi", "sup" + "hi", "sup", "test", "hmmm"]}
          />
          <AuctionCard
            to="/auctions/1"
            title="Auction 1"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            listerUsername="Gamerboi1"
            startBid={35}
            currentBid={45}
            auctionTags={["hallo", "hi", "sup" + "hi", "sup", "test", "hmmm"]}
          />
          <AuctionCard
            to="/auctions/1"
            title="Auction 1"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            listerUsername="Gamerboi1"
            startBid={35}
            currentBid={45}
            auctionTags={["hallo", "hi", "sup" + "hi", "sup", "test", "hmmm"]}
          />
          <AuctionCard
            to="/auctions/1"
            title="Auction 1"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            listerUsername="Gamerboi1"
            startBid={35}
            currentBid={45}
            auctionTags={["hallo", "hi", "sup" + "hi", "sup", "test", "hmmm"]}
          />
          <AuctionCard
            to="/auctions/1"
            title="Auction 1"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            listerUsername="Gamerboi1"
            startBid={35}
            currentBid={45}
            auctionTags={["hallo", "hi", "sup" + "hi", "sup", "test", "hmmm"]}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
