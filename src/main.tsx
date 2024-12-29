import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import GameList from "./GameList";
import GameDetail from "./GameDetail";
import SignUp from "./SignUp";
import Login from "./Login";

createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
      <StrictMode>
          <Routes>
              <Route path="/" element={<GameList />} />

              <Route path=":game" element={<GameDetail />} />

              <Route path="/sign_up" element={<SignUp />} />

              <Route path="/login" element={<Login />} />
          </Routes>
      </StrictMode>
  </BrowserRouter>
)
