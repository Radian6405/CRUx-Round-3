import { Autocomplete, Button, TextField } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Header } from "../util/Misc";

function Create() {
  return (
    <>
      <div className="flex flex-col justify-center gap-10 p-5 xl:flex-row">
        <CreateAuctions />
        <CreateRoom />
      </div>
    </>
  );
}

function CreateAuctions() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const tags: string[] = ["hi", "hello", "sup"];
  return (
    <div className="p-5 flex flex-col gap-5 items-center border-2">
      <Header text="Auctions" />
      <div className="w-3/4 text-md text-gray-500 text-center">
        Create public auctions which are visible to all the users
      </div>
      <TextField
        required
        id="auction-title"
        label="Title"
        sx={{ width: "500px" }}
      />
      <TextField
        id="auction-description"
        label="Description"
        multiline
        rows={4}
        sx={{ width: "500px" }}
      />
      <TextField
        required
        id="auction-base-price"
        label="Base Price"
        sx={{ width: "500px" }}
        type="number"
      />
      <div className="flex flex-row gap-10">
        <div>
          <div className="text-xl px-3 text-left ">Start Date</div>
          <DatePicker
            className="w-[230px] h-14 border-[1px] rounded-lg p-4"
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
        </div>
        <div>
          <div className="text-xl px-3 text-left ">End Date</div>
          <DatePicker
            className="w-[230px] h-14 border-[1px] rounded-lg p-4 focus:border-blue-400  "
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
          />
        </div>
      </div>
      <Autocomplete
        multiple
        id="auction-tags"
        options={tags}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} label="Tags" />}
        sx={{ width: "300px" }}
      />
      <Button variant="outlined" size="large">
        Confirm
      </Button>
    </div>
  );
}

function CreateRoom() {
  return (
    <div className="p-5 flex flex-col gap-5 items-center border-2">
      <Header text="Rooms" />
      <div className="w-3/4 text-md text-gray-500 text-center">
        Create private room to create auctions which are visible to only
        selected users
      </div>
      <TextField required id="room-name" label="Name" sx={{ width: "500px" }} />
      <TextField
        id="room-description"
        label="Description"
        multiline
        rows={4}
        sx={{ width: "500px" }}
      />
      <Button variant="outlined" size="large">
        Confirm
      </Button>
    </div>
  );
}

export default Create;
