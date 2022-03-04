import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UniversityTable from "../TableComp/UniversityTable";
import AdmissionTable1 from "../AdmissionPage/AdmissionTable1";
import Sidebar from "./Sidebar";
import LandingPage from "./LandingPage";
import Tile from "../HomePage/Tile";

function RoutesFile() {
  return (
    <>
      <Sidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
      <div className="RoutesFile" id="outer-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="home" element={<Tile />} />
            <Route path="university" element={<UniversityTable />} />
            <Route path="admission" element={<AdmissionTable1 />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default RoutesFile;
