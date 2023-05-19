import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import FeedView from "../pages/Feed/FeedView";
import LoginView from "../pages/Login/LoginView";
import MomentDetailsView from "../pages/MomentDetails/MomentDetailsView";
import NewMoment from "../pages/NewMoment";
import Profile from "../pages/Profile";
import ErrorBoundary from "../services/ErrorBoundary";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorBoundary />,
        children: [
            { path: "/", element: <FeedView />},
            { path: "/moment/:id", element: <MomentDetailsView /> },
            { path: "/new-moment", element: <NewMoment />},
            { path: "/profile", element: <Profile />}
        ],
    },
    {
        path: "/login",
        element: <LoginView />,
    }
]);



export default router;