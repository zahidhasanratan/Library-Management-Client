// src/App.tsx
import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: { fontSize: "0.9rem" },
        }}
      />
      <AppRouter />
    </>
  );
}
