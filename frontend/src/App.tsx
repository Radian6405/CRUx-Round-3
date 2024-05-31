import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Rooms from "./components/pages/Rooms";
import Create from "./components/pages/Create";
import RoomView from "./components/pages/RoomView";
import AuctionPage from "./components/pages/AuctionPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:roomID" element={<RoomView />} />
        <Route path="/create" element={<Create />} />
        <Route path="/auctions/:auctionID" element={<AuctionPage />} />
      </Routes>
    </>
  );
}

export default App;
