import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BorrowingHistoryPage from "./pages/BorrowingHistoryPage";
import BorrowingFormPage from "./pages/BorrowingFormPage";
import BorrowingDetailPage from "./pages/BorrowingDetailPage";
import BorrowingEditPage from "./pages/BorrowingEditPage";
import BorrowingApprovalPage from "./pages/BorrowingApprovalPage";
import RoomPage from "./pages/RoomPage";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/borrowings/create" element={<BorrowingFormPage />} />
        <Route path="/borrowings" element={<BorrowingHistoryPage />} />
        <Route path="/borrowings/create" element={<BorrowingFormPage />} />
        <Route path="borrowings/:id" element={<BorrowingDetailPage/>}/>
        <Route path="borrowings/:id/edit" element={<BorrowingEditPage/>}/>
        <Route path="borrowings/admin/approval" element={<BorrowingApprovalPage/>}/>
        <Route path="borrowings/room" element={<RoomPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
