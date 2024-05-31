import { Button, Chip } from "@mui/material";
import { Header, SplitBar } from "../util/Misc";

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

interface AuctionCardProps {
  title: string;
  description: string;
  listerUsername: string;
  startBid: number;
  currentBid: number;
  auctionTags: string[];
}

function AuctionCard({
  title,
  description,
  listerUsername,
  startBid,
  currentBid,
  auctionTags,
}: AuctionCardProps) {
  return (
    <div className="flex flex-col w-[500px] gap-3 p-5 text-left bg-gray-300">
      <div className="flex flex-row gap-2 items-end">
        <div className="text-4xl font-bold">{title}</div>
        <Chip label={listerUsername} variant="outlined" size="medium" />
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        <Chip label={auctionTags[0]} variant="outlined" size="small" />
        <Chip label={auctionTags[1]} variant="outlined" size="small" />
        <Chip label={auctionTags[2]} variant="outlined" size="small" />
        <Chip label={auctionTags[3]} variant="outlined" size="small" />
        <Chip label={auctionTags[4]} variant="outlined" size="small" />
        <Chip label={auctionTags[5]} variant="outlined" size="small" />
      </div>
      <div className="text-lg text-gray-500 text-wrap line-clamp-3">
        {description}
      </div>
      <div className="text-xl">Start Bid: ${startBid}</div>
      <div className="text-xl">Current Bid: ${currentBid}</div>
      <Button variant="outlined" size="large" sx={{ width: "200px" }}>
        Bid
      </Button>
    </div>
  );
}

interface UserCardProps {
  userName: string;
  userRole: string;
}

function UserCard({ userName, userRole }: UserCardProps) {
  return (
    <div className="flex flex-row justify-between px-5 py-3 bg-gray-100 ">
      <div className="text-2xl">{userName}</div>
      <div className="text-xl text-gray-400 ">{userRole}</div>
    </div>
  );
}

export default RoomView;
