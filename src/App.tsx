import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ClubProvider } from './context/ClubContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MembershipModal } from './components/MembershipModal';
import { ClassBookingModal } from './components/ClassBookingModal';
import { SearchModal } from './components/SearchModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TrainingProgramsPage } from './pages/TrainingProgramsPage';
import { ProgramDetailsPage } from './pages/ProgramDetailsPage';
import { ClassesPage } from './pages/ClassesPage';
import { SchedulePage } from './pages/SchedulePage';
import { TrainersPage } from './pages/TrainersPage';
import { TrainerProfilePage } from './pages/TrainerProfilePage';
import { MembershipPage } from './pages/MembershipPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { GalleryPage } from './pages/GalleryPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailsPage } from './pages/BlogDetailsPage';
import { FreeTrialPage } from './pages/FreeTrialPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { MemberDashboardPage } from './pages/MemberDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ClubProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#171916] text-[#F5F4EF]">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/training" element={<TrainingProgramsPage />} />
              <Route path="/training/:slug" element={<ProgramDetailsPage />} />
              <Route path="/classes" element={<ClassesPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/trainers" element={<TrainersPage />} />
              <Route path="/trainers/:slug" element={<TrainerProfilePage />} />
              <Route path="/membership" element={<MembershipPage />} />
              <Route path="/facilities" element={<FacilitiesPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailsPage />} />
              <Route path="/free-trial" element={<FreeTrialPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/member" element={<MemberDashboardPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
          <MembershipModal />
          <ClassBookingModal />
          <SearchModal />
        </div>
      </ClubProvider>
    </BrowserRouter>
  );
}
