import { useRouteError } from "react-router-dom";
import ErrorPage from "../pages/Error/ErrorView";

function ErrorBoundary () {
    const error = useRouteError();
    return <ErrorPage error={error} />;
  }

export default ErrorBoundary;