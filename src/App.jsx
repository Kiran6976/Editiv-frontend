import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AddPortfolio from "./admin/AddPortfolio";
import ManageFolders from "./admin/ManageFolder";
import FolderItems from "./admin/FolderItems";
import PortfolioFolder from "./pages/PortfolioFolder";
import ManageBookings from "./admin/ManageBookings";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/add-portfolio" element={<AdminLayout><AddPortfolio /></AdminLayout>} />
        <Route path="/admin/folders" element={<AdminLayout><ManageFolders /></AdminLayout>} />
        <Route path="/admin/folder/:id" element={<AdminLayout><FolderItems /></AdminLayout>} />
        <Route path="/admin/bookings" element={<AdminLayout><ManageBookings /></AdminLayout>} />
        <Route path="/portfolio/:id" element={<PortfolioFolder />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
