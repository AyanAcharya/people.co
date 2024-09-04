/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Container/Sidebar";
import Header from "./Container/Header";
import Overview from "./Container/Overview";
import PeopleDirectory from "./Container/PeopleDirectory";


function App() {
  return (
    <Router>
      <div className="min-w-full min-h-full">
        {/* Header at the top */}

        <Header />
        <div className="flex bg-backgroundWhite">
          {/* Sidebar below the header */}
          <Sidebar />
          {/* Main content area */}
          <div className="flex-grow py-4 pr-4">
            <Routes>
              <Route path="/overview" element={<Overview />} />
              <Route path="/people-directory" element={<PeopleDirectory />} />
              <Route
                path="/people-directory/search=:keyword"
                element={<PeopleDirectory />}
              />
              <Route
                path="/people-directory/:username"
                element={<PeopleDirectory />}
              />

              {/* Optional: For handling undefined routes */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
