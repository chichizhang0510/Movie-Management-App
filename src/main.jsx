import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import StarRating from "./components/StarRating";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["terrible", "bad", "okay", "good", "amazing"]}
      defaultRating={3}
    />
    <StarRating maxRating={10} defaultRating={6} />
    <StarRating maxRating={4} size={24} defaultRating={2} /> */}
  </StrictMode>
);
