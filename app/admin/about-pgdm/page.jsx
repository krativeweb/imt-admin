"use client";

import MobileMenu from "../../../components/header/AdminMobileMenu";
import DashboardHeader from "../../../components/header/DashboardAdminheader";
import DashboardEmployerSidebar from "../../../components/header/DashboardAdminsidebar"; 
import CopyrightFooter from "../../../components/admin/CopyrightFooter"; 
 
import { useState } from "react";
import Table from "./components/table";
const MandatoryDisclosure = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
   const openModalRH = () => {
     setIsModalOpen(true);
     document.body.style.overflow = "hidden";
   };

   const openCsvModal = () => {
     setIsCsvModalOpen(true);
     document.body.style.overflow = "hidden"; // Disable background scrolling
   };

   const closeModalRH = () => {
     setIsModalOpen(false);
     document.body.style.overflow = "auto";
   };

   const closeModalCsv = () => {
     setIsCsvModalOpen(false);
     document.body.style.overflow = "auto"; // Re-enable background scrolling
   };
  return (
    <> 
      <div className="page-wrapper dashboard">
        <span className="header-span"></span>

        {/* Header */}
        <DashboardHeader />

        {/* Mobile Menu */}
        <MobileMenu />

        {/* Sidebar */}
        <DashboardEmployerSidebar />

        {/* Main Content */}
        <section className="user-dashboard">
          <div className="dashboard-outer">
            <div className="row">
              <div className="col-lg-12">
                <div className="applicants-widget ls-widget">
               
                  <Table />
                </div>
              </div>
            </div>
          </div>
          {/* End dashboard-outer */}
        </section>
        {/* Footer */}
        <CopyrightFooter />
      </div>

      {isModalOpen && (
        <AddCompanyModal show={isModalOpen} onClose={closeModalRH} />
      )}

      {isCsvModalOpen && (
        <AddCsvModal show={openCsvModal} onClose={closeModalCsv} />
      )}
    </>
  );
};

export default MandatoryDisclosure;
