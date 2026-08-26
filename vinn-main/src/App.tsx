/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationTab } from './types';
import { TopBar } from './components/layout/TopBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { DepartmentListPage } from './pages/DepartmentListPage';
import { DepartmentDetailPage } from './pages/DepartmentDetailPage';
import { PlacementPage } from './pages/PlacementPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { CampusPage } from './pages/CampusPage';
import { NaacPage } from './pages/NaacPage';
import { CommitteesPage } from './pages/CommitteesPage';
import { ContactPage } from './pages/ContactPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AdminPortalPage } from './pages/AdminPortalPage';
import { AdminDataProvider } from './context/AdminDataContext';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [activeAnchor, setActiveAnchor] = useState<string | undefined>(undefined);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

  // Sync hash routing if desired
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab, selectedDepartmentId]);

  const handleTabChange = (tab: NavigationTab, anchorId?: string, departmentId?: string) => {
    setCurrentTab(tab);
    setActiveAnchor(anchorId);
    if (departmentId) {
      setSelectedDepartmentId(departmentId);
    } else if (tab !== 'department') {
      setSelectedDepartmentId(null);
    }
  };

  const handleSelectDepartment = (id: string) => {
    setCurrentTab('department');
    setSelectedDepartmentId(id);
  };

  const renderCurrentView = () => {
    switch (currentTab) {
      case 'home':
        return <HomePage onTabChange={handleTabChange} />;

      case 'about':
        return <AboutPage initialAnchor={activeAnchor || 'vision'} />;

      case 'admissions':
        return <AdmissionsPage initialAnchor={activeAnchor || 'eligibility-ug'} />;

      case 'department':
        if (selectedDepartmentId) {
          return (
            <DepartmentDetailPage
              departmentId={selectedDepartmentId}
              onBack={() => setSelectedDepartmentId(null)}
              onNavigateAdmission={handleTabChange}
            />
          );
        }
        return <DepartmentListPage onSelectDepartment={handleSelectDepartment} />;

      case 'placement':
        return <PlacementPage />;

      case 'facilities':
        return <FacilitiesPage />;

      case 'campus':
        return <CampusPage />;

      case 'naac':
        return <NaacPage initialView="naac" />;

      case 'iqac':
        return <NaacPage initialView="iqac" />;

      case 'committees':
        return <CommitteesPage />;

      case 'contact':
        return <ContactPage />;

      case 'notifications':
        return <NotificationsPage onNavigateAdmission={() => handleTabChange('admissions')} />;

      case 'admin':
        return <AdminPortalPage onNavigate={handleTabChange} />;

      default:
        return <HomePage onTabChange={handleTabChange} />;
    }
  };

  return (
    <AdminDataProvider>
      <div className="min-h-screen bg-[#f6f5f2] text-[#222224] font-sans selection:bg-[#363538] selection:text-white flex flex-col justify-between">
        <div>
          {/* Global Sticky Layout Header (TopBar + Navbar) */}
          <div className="sticky top-0 z-50 shadow-md">
            <TopBar onNavigate={handleTabChange} currentTab={currentTab} />
            <Navbar currentTab={currentTab} onTabChange={handleTabChange} />
          </div>

          {/* Main View Page */}
          <main className="transition-all duration-200">
            {renderCurrentView()}
          </main>
        </div>

        {/* Global Layout Footer */}
        <Footer onTabChange={handleTabChange} />
      </div>
    </AdminDataProvider>
  );
}
