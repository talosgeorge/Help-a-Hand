// src/AppWrapper.jsx
import GoogleMapsProvider from "../src/components/GoogleMapsProvider";
import App from "./App";

export default function AppWrapper() {
  return (
    <GoogleMapsProvider>
      <App />
    </GoogleMapsProvider>
  );
}
