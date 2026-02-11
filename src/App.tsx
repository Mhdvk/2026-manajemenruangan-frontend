import { BrowserRouter, Routes, Route } from "react-router-dom";
import BorrowingLandingPage from "./pages/BorrowingLandingPage";
import BorrowingFormPage from "./pages/BorrowingFormPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BorrowingLandingPage />} />
        <Route path="/borrowings/create" element={<BorrowingFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}
