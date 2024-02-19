import { Route, Routes, Navigate } from "react-router-dom";
import { AuthenticatedLayout } from "../layouts/AuthenticatedLayout";
import AuthLoginScreen from "../screens/AuthLoginScreen";
import AuthRegisterScreen from "../screens/AuthRegisterScreen";
import TaskIndexScreen from "../screens/TaskIndexScreen";
import { useAuth } from "../providers/AuthProvider";
import NotFoundScreen from "../screens/NotFoundScreen";
import { UnauthenticatedLayout } from "../layouts/UnauthenticatedLayout";

export const AppRoutes = () => {
  const { isAuthenticated, isLoaded } = useAuth();
  if (!isLoaded) {
    return null;
  }

  return <Routes>
    {!isAuthenticated && <>
      <Route path="auth" element={<UnauthenticatedLayout />}>
        <Route path="login" element={<AuthLoginScreen />} />
        <Route path="register" element={<AuthRegisterScreen />} />
      </Route>
      <Route path='*' element={<Navigate to='/auth/login' />} />
    </>
    }
    {isAuthenticated && <Route path='' element={<AuthenticatedLayout />}>

      <Route path='' element={<TaskIndexScreen />} />
    </Route>
    }
    <Route path='*' element={<NotFoundScreen />} />
  </Routes>
}