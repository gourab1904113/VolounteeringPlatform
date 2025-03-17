import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventPage from "./pages/EventPage";
import toast, { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import MyEvents from "./pages/MyEvents";
import Myparticipation from "./pages/Myparticipation";
import Helps from "./pages/Helps";
import CommentPage from "./pages/CommentPage";
import Teams from "./pages/Teams";
import InfoPage from "./pages/infoPage";

export default function App() {
  return (
    <div
      className="min-h-screen bg-base-200 transition-colors duration-300"
      data-theme="light"
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/myparticipation" element={<Myparticipation />} />
        <Route path="/helps" element={<Helps />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:team_id/info" element={<InfoPage />} />
        <Route path="/post/:post_id/comments" element={<CommentPage />} />
      </Routes>
      <div>
        <Toaster />
      </div>
    </div>
  );
}
