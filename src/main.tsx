import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import GameList from "./pages/GameList";
import GameDetail from "./pages/GameDetail";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
      <StrictMode>
          <Routes>
              <Route path="/" element={<GameList />} />

              <Route path="/my_games/:game" element={<GameDetail />} />

              <Route path="/sign_up" element={<SignUp />} />

              <Route path="/login" element={<Login />} />
          </Routes>
      </StrictMode>
  </BrowserRouter>
)
