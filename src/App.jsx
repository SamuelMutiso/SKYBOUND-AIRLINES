import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile"; // 1. Added this import

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="profile" element={<Profile />} />{" "}
        {/* 2. Added profile route */}
        <Route
          path="*"
          element={
            <div className="p-20 text-center font-black">404 - SKY LOST</div>
          }
        />
      </Route>
    </Routes> );
}