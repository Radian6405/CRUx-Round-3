import { Button, Chip, InputAdornment, TextField } from "@mui/material";
import { CommentCard, UserCard } from "../util/Cards";
import { Header, SplitBar } from "../util/Misc";
// import { useParams } from "react-router-dom";

function AuctionPage() {
  // const {auctionID} = useParams();
  return (
    <>
      <div className="m-5">
        <div className="flex flex-row justify-end">
          <div className="w-3/4 flex flex-col gap-2 pr-5">
            <div className="text-left">
              <Header text="Auction 1" />
              <div className="flex flex-row flex-wrap gap-2 pt-2">
                <Chip label={"Private"} variant="outlined" size="small" />
                <Chip label={"hello"} variant="outlined" size="small" />
                <Chip label={"hi"} variant="outlined" size="small" />
                <Chip label={"test"} variant="outlined" size="small" />
                <Chip label={"hello1"} variant="outlined" size="small" />
                <Chip label={"hello3"} variant="outlined" size="small" />
                <Chip label={"hello2"} variant="outlined" size="small" />
              </div>
              <SplitBar />
              <div className="text-lg text-gray-500 text-wrap truncate">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
              <div className="text-xl">Ends in: 5 days</div>
              {/* <div className="text-xl">Starts in: 5 days</div> */}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-5">
                <div className="text-2xl w-[130px]">Start Bid:</div>
                <div className="text-xl border-2 border-gray-00 rounded-md py-2 px-5">
                  $ 40
                </div>
              </div>
              <div className="flex flex-row items-center gap-5">
                <div className="text-2xl w-[130px]">Current Bid:</div>
                <div className="text-xl border-2 border-gray-00 rounded-md py-2 px-5">
                  $ 60
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
                />
                <Button variant="outlined" size="large">
                  Bid
                </Button>
              </div>
              <SplitBar />
            </div>

            <div className="flex flex-col gap-4">
              <Header text="Comments:" />
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
              <div>Current Biddings: 7</div>
            </div>
            <SplitBar />
            <UserCard userName="FunnyGuy" userRole="Seller" />
            <UserCard userName="superMan" userRole="Bid: $60" />
            <UserCard userName="superMan" userRole="Bid: $59" />
            <UserCard userName="spiderMan" userRole="Bid: $57" />
            <UserCard userName="spiderMan" userRole="Bid: $55" />
            <UserCard userName="spiderMan" userRole="Bid: $50" />
            <UserCard userName="spiderMan" userRole="Bid: $47" />
            <UserCard userName="spiderMan" userRole="Bid: $45" />
          </div>
        </div>
      </div>
    </>
  );
}

export default AuctionPage;
