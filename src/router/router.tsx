import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Login } from "../pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="">
      <Route index element={<Navigate to="/" replace />} />
      <Route path="/log-in" element={<Login />} />
    </Route>
  )
);

export default router;
