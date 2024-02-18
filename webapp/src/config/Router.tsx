import { Route, Routes, Navigate } from "react-router-dom";
import { BaseLayout } from "../layouts/BaseLayout";
import AuthLoginScreen from "../screens/AuthLoginScreen";
import AuthRegisterScreen from "../screens/AuthRegisterScreen";
import TaskIndexScreen from "../screens/TaskIndexScreen";
import { useAuth } from "../providers/AuthProvider";
import NotFoundScreen from "../screens/NotFoundScreen";

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return <Routes>
    {!isAuthenticated && <>
      <Route path="auth" element={<BaseLayout />}>
        <Route path="login" element={<AuthLoginScreen />} />
        <Route path="register" element={<AuthRegisterScreen />} />
      </Route>
      <Route path='*' element={<Navigate to='/auth/login' />} />
    </>
    }
    {isAuthenticated && <>
      <Route path='' element={<TaskIndexScreen />} />
    </>
    }
    <Route path='*' element={<NotFoundScreen />} />
  </Routes>
}