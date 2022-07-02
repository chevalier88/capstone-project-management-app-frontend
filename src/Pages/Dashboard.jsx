import React from 'react';

import AppliedProjectsCards from '../components/Card/AppliedProjectsCards.jsx';
import ClosedProjectsCards from '../components/Card/ClosedProjectsCards.jsx';
import InProgressProjectsCards from '../components/Card/InProgressProjectsCards.jsx';

export default function Dashboard() {
  return (
    <div id="page-container">
      <h1>Dashboard</h1>
      <div><AppliedProjectsCards /></div>
      <div><InProgressProjectsCards /></div>
      <div><ClosedProjectsCards /></div>
    </div>
  );
}
