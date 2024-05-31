import { Header, SplitBar } from "../util/Misc";
import { AuctionCard, UserCard } from "../util/Cards";

function RoomView() {
  return (
    <>
      <div className="mx-10 mt-5">
        <div className="flex flex-row justify-between  ">
          <div className="text-left">
            <Header text="Room 1" />
            <div className="text-lg text-gray-500 text-wrap truncate">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
          <div className="text-right text-xl">
            <div>by FunnyGuy</div>
            <div>Active auctions: 4</div>
          </div>
        </div>
        <SplitBar />
        <div className="flex flex-row justify-end">
          <div className="w-3/4 flex flex-wrap justify-start gap-4 pr-5 ">
            <AuctionCard
              title="Auction 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              listerUsername="Gamerboi1"
              startBid={35}
              currentBid={45}
              auctionTags={["hallo", "hi", "sup" + "hi", "sup", "test", "hmmm"]}
            />
            <AuctionCard
              title="Auction 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              listerUsername="Gamerboi2"
              startBid={35}
              currentBid={45}
              auctionTags={["hallo", "hi", "sup" + "hi", "sup", "test", "hmmm"]}
            />
            <AuctionCard
              title="Auction 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              listerUsername="Gamerboi4"
              startBid={35}
              currentBid={45}
              auctionTags={["hallo", "hi", "sup" + "hi", "sup", "test", "hmmm"]}
            />
            <AuctionCard
              title="Auction 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              listerUsername="Gamerboi3"
              startBid={35}
              currentBid={45}
              auctionTags={["hallo", "hi", "sup" + "hi", "sup", "test", "hmmm"]}
            />
          </div>
          <div className="w-1/4 min-w-80 p-5 flex flex-col gap-2 bg-blue-500  ">
            <Header text="Users" />
            <SplitBar />
            <UserCard userName="FunnyGuy" userRole="Creator" />
            <UserCard userName="superMan" userRole="Admin" />
            <UserCard userName="superMan" userRole="Admin" />
            <UserCard userName="spiderMan" userRole="Member" />
            <UserCard userName="spiderMan" userRole="Member" />
            <UserCard userName="spiderMan" userRole="Member" />
            <UserCard userName="spiderMan" userRole="Member" />
            <UserCard userName="spiderMan" userRole="Member" />
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomView;
