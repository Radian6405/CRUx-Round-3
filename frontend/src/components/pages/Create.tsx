import {
  Autocomplete,
  Button,
  Chip,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { auctionCategories, Header } from "../util/Misc";
import React from "react";
import axios, { AxiosError } from "axios";
import Notifbar from "../util/Notifbar";
import { useCookies } from "react-cookie";

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
  );
  const [selectedTags, setSelectedTags] = React.useState<any | null>([]);
  const [selectedRooms, setSelectedRooms] = React.useState<any | null>([]);

  const [notifOpen, setNotifOpen] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");

  const [cookie] = useCookies(["token"]);
  const [roomData, setRoomData] = React.useState<any | null>([]);

  async function handleSubmit() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/makeone/auction",
        {
          title: title,
          description: description,
          basePrice: basePrice,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          tags: selectedTags,
          rooms: selectedRooms,
        },
        {
          withCredentials: true,
          headers: { Authorization: cookie.token },
        }
      );

      if (response.status === 201) {
        setNotifMessage(response.data);
        setNotifOpen(true);
      }
    } catch (error) {
      let errorMessage: string = "Failed to create auction";
      if (error instanceof AxiosError) {
        errorMessage = error.message;
      }
      setNotifMessage(errorMessage);
      setNotifOpen(true);
    }
  }

  async function getRoomData() {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/getall/rooms",
        {
          withCredentials: true,
          headers: { Authorization: cookie.token },
        }
      );

      setRoomData(response.data.map((room: { name: string }) => room.name));
    } catch (error) {
      let errorMessage: string = "Failed to retrieve room data ";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data;
      }
      setNotifMessage(errorMessage);
      setNotifOpen(true);
    }
  }
  useEffect(() => {
    getRoomData();
  }, []);

  return (
    <>
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
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
          }}
        />
        <TextField
          id="auction-description"
          label="Description"
          multiline
          rows={4}
          sx={{ width: "500px" }}
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value);
          }}
        />
        <TextField
          required
          id="auction-base-price"
          label="Base Price"
          sx={{ width: "500px" }}
          type="number"
          value={basePrice}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setBasePrice(
              parseInt(event.target.value) >= 0
                ? parseInt(event.target.value)
                : 0
            );
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
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
          limitTags={2}
          options={auctionCategories}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="Tags" />}
          sx={{ width: "500px" }}
          value={selectedTags}
          onChange={(_event: any, newValue: any | null) => {
            setSelectedTags(
              newValue.map((option: { value: any }) => option.value || option)
            );
          }}
        />
        <div>
          <Autocomplete
            multiple
            id="user-rooms"
            limitTags={2}
            options={roomData}
            getOptionLabel={(roomData) => roomData}
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} label="Rooms" />}
            sx={{ width: "500px" }}
            value={selectedRooms}
            onChange={(_event: any, newValue: any | null) => {
              setSelectedRooms(
                newValue.map((option: { value: any }) => option.value || option)
              );
            }}
          />
          <div className="text-md text-gray-500 text-center">
            if no room is selected, auction is listed as public
          </div>
        </div>
        <Button variant="outlined" size="large" onClick={() => handleSubmit()}>
          Confirm
        </Button>
      </div>
      <Notifbar
        open={notifOpen}
        setOpen={setNotifOpen}
        message={notifMessage}
      />
    </>
  );
}

function CreateRoom() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAdmins, setSelectedAdmins] = React.useState<any | null>([]);
  const [selectedMembers, setSelectedMembers] = React.useState<any | null>([]);

  const [notifOpen, setNotifOpen] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");

  const [cookie] = useCookies(["token"]);

  async function handleSubmit() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/makeone/room",
        {
          name: name,
          description: description,
          admins: selectedAdmins,
          members: selectedMembers,
        },
        {
          withCredentials: true,
          headers: { Authorization: cookie.token },
        }
      );

      if (response.status === 201) {
        setNotifMessage(response.data);
        setNotifOpen(true);
      }
    } catch (error) {
      let errorMessage: string = "Failed to create auction data ";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data;
      }
      setNotifMessage(errorMessage);
      setNotifOpen(true);
    }
  }

  return (
    <>
      <div className="p-5 flex flex-col gap-5 items-center border-2">
        <Header text="Rooms" />
        <div className="w-3/4 text-md text-gray-500 text-center">
          Create private room to create auctions which are visible to only
          selected users
        </div>
        <TextField
          required
          id="room-name"
          label="Name"
          sx={{ width: "500px" }}
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />
        <TextField
          id="room-description"
          label="Description"
          multiline
          rows={4}
          sx={{ width: "500px" }}
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value);
          }}
        />
        <Stack spacing={3} sx={{ width: 500 }}>
          <Autocomplete
            multiple
            options={[]}
            freeSolo
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <Chip
                    variant="outlined"
                    label={option}
                    key={key}
                    {...tagProps}
                  />
                );
              })
            }
            value={selectedAdmins}
            onChange={(_event: any, newValue: any | null) => {
              setSelectedAdmins(
                newValue.map((option: { value: any }) => option.value || option)
              );
            }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Admins" />
            )}
          />
        </Stack>

        <div>
          <Stack spacing={3} sx={{ width: 500 }}>
            <Autocomplete
              multiple
              options={[]}
              freeSolo
              renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return (
                    <Chip
                      variant="outlined"
                      label={option}
                      key={key}
                      {...tagProps}
                    />
                  );
                })
              }
              value={selectedMembers}
              onChange={(_event: any, newValue: any | null) => {
                setSelectedMembers(
                  newValue.map(
                    (option: { value: any }) => option.value || option
                  )
                );
              }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Members" />
              )}
            />
          </Stack>
          <div className="text-md text-gray-500 text-center">
            Enter a username to add them to the room
          </div>
        </div>
        <Button variant="outlined" size="large" onClick={() => handleSubmit()}>
          Confirm
        </Button>
      </div>
      <Notifbar
        open={notifOpen}
        setOpen={setNotifOpen}
        message={notifMessage}
      />
    </>
  );
}

export default Create;
