import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/variables.css";
import "./styles/global.css";
<<<<<<< HEAD
import "./styles/layout.css";
import "./styles/buttons.css";
=======
import "./styles/button.css";
>>>>>>> 351919bcf2220adfb8e8a668761739d25303e54d
import "./styles/cards.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
