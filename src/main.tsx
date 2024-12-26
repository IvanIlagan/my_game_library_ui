import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import GameList from "./GameList";
import GameDetail from "./GameDetail";

createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
      <StrictMode>
          <Routes>
              <Route path="/" element={<GameList />} />

              <Route path=":game" element={<GameDetail />} />
          </Routes>
      </StrictMode>
  </BrowserRouter>
)
