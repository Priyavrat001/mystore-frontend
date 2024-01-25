import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children?: ReactElement;
  isAuthenticated: boolean;
  adminOnly?: boolean;
  admin?: boolean;
  redirect?: string;
}

const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminOnly,
  admin,
  redirect = "/",
}: Props) => {
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate(redirect);
    return null;
  };
  if (adminOnly && !admin) {
    navigate(redirect);
    return null;
  };

  return children;
};

export default ProtectedRoute;