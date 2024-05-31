import { PersonOutlineTwoTone } from "@mui/icons-material";
import { Chip, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface AuctionCardProps {
  to: string;
  title: string;
  description: string;
  listerUsername: string;
  startBid: number;
  currentBid: number;
  auctionTags: string[];
}

export function AuctionCard({
  to,
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
      <Link to={to}>
        <Button variant="outlined" size="large" sx={{ width: "200px" }}>
          Bid
        </Button>
      </Link>
    </div>
  );
}

interface UserCardProps {
  userName: string;
  userRole: string;
}

export function UserCard({ userName, userRole }: UserCardProps) {
  return (
    <div className="flex flex-row justify-between px-5 py-3 bg-gray-100 ">
      <div className="text-2xl">{userName}</div>
      <div className="text-xl text-gray-400 ">{userRole}</div>
    </div>
  );
}

export function CommentCard({
  username,
  body,
}: {
  username: string;
  body: string;
}) {
  return (
    <>
      <div className="flex flex-row items-start p-3 gap-2 border-2 border-gray-300 rounded-md">
        <PersonOutlineTwoTone fontSize="large" />
        <div className="flex flex-col">
          <div className="text-xl">{username}</div>
          <div className="text-lg truncate text-wrap">{body}</div>
        </div>
      </div>
    </>
  );
}
