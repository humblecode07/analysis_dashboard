import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from './Layout';
import Correlative from './pages/Correlative';
import Descriptive from './pages/Descriptive';
import Predictive from './pages/Predictive';
import { Dataset } from './pages/Dataset';
import { TheoreticalFramework } from './pages/TheoreticalFramework';
import { DataPreprocessing } from './pages/DataPreprocessing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Navigate to="Dataset" replace />} />

        <Route path="Dataset" element={<Dataset />} />
        <Route path="TheoreticalFramework" element={<TheoreticalFramework />} />
        <Route path="DataPreprocessing" element={<DataPreprocessing />} />
        <Route path="correlative" element={<Correlative />} />
        <Route path="descriptive" element={<Descriptive />} />
        <Route path="predictive" element={<Predictive />} />
      </Route>
    </Routes>
  );
}


export default App