import { RouterProvider } from "react-router";
import { router } from "./router/route.ts";
import "./styles/app.css";

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
