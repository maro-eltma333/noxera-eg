import { createBrowserRouter } from "react-router";
import Root from "./layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import CraftQualityPage from "./pages/CraftQuality";
import BoxFitPage from "./pages/BoxFit";
import ProfilePage from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import OurBranches from "./pages/OurBranches";
import ErrorBoundary from "./pages/ErrorBoundary";
import ProductDetailsPage from "./pages/ProductDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorBoundary />,
        children: [
            { index: true, element: <Home />, errorElement: <ErrorBoundary /> },
            { path: "login", element: <Login />, errorElement: <ErrorBoundary /> },
            { path: "register", element: <Register />, errorElement: <ErrorBoundary /> },
            { path: "craft-quality", element: <CraftQualityPage />, errorElement: <ErrorBoundary /> },
            { path: "boxfit", element: <BoxFitPage />, errorElement: <ErrorBoundary /> },
            { path: "product/:id", element: <ProductDetailsPage />, errorElement: <ErrorBoundary /> },
            { path: "women", element: <BoxFitPage />, errorElement: <ErrorBoundary /> },
            { path: "men", element: <BoxFitPage />, errorElement: <ErrorBoundary /> },
            { path: "branches", element: <OurBranches />, errorElement: <ErrorBoundary /> },
            { path: "profile", element: <ProfilePage />, errorElement: <ErrorBoundary /> },
            { path: "admin", element: <AdminDashboard />, errorElement: <ErrorBoundary /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);
