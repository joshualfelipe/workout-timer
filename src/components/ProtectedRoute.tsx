import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Token {
  granted: boolean;
  expiry: number;
}

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const raw = sessionStorage.getItem("access");

  if (!raw) return <Navigate to="/" replace />;

  let token: Token;

  try {
    token = JSON.parse(raw);
  } catch {
    sessionStorage.removeItem("access");
    return <Navigate to="/" replace />;
  }

  const { granted, expiry } = token;
  const isExpired = expiry < Date.now();

  if (!granted || isExpired) {
    sessionStorage.removeItem("access");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
