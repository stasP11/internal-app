import { Navigate } from "react-router-dom";

function ProtectedPages({ status, children }: any) {

  if (status === 200 || status == "200") {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedPages;