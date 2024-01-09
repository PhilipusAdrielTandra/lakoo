import { createBrowserRouter } from "react-router-dom";
import DetailsPage from "../pages/DetailsPage";
import AdminPage from "../pages/AdminPage";
import Layout from "./Layout";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <AdminPage />
            },
            {
                path: "/detail/:id",
                element: <DetailsPage />,
            }
        ],
    },
]);