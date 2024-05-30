import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Rooms from "./components/pages/Rooms";
import Create from "./components/pages/Create";
import RoomView from "./components/pages/RoomView";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:roomID" element={<RoomView />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>
  );
}

export default App;
