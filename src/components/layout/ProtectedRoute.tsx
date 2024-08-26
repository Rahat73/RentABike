import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import {
  logout,
  selectCurrentToken,
  TUser,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TRoles } from "../../types";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRouteProps = {
  children: ReactNode;
  role: TRoles | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();

  if (token) {
    const { role: userRole } = verifyToken(token) as TUser;
    console.log(role);
    if (role === userRole) return children;
    else {
      dispatch(logout());
      return <Navigate to="/login" replace={true} />;
    }
  } else {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
