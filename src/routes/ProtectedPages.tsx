import { Navigate } from "react-router-dom";

function ProtectedPages({ status, children }: any) {

  if (status === "OK") {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedPages;
