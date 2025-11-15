import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Layout from './Layout';
import Correlative from './pages/Correlative';
import Descriptive from './pages/Descriptive';
import Predictive from './pages/Predictive';

function App() {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path='correlative' index element={<Correlative />} />
        <Route path='descriptive' index element={<Descriptive />} />
        <Route path='predictive' index element={<Predictive />} />
      </Route>
    </Routes>
  )
}

export default App