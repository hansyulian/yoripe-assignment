import { useAuth } from "../providers/AuthProvider";

export function useUserInfo() {
  const { userInfo } = useAuth();
  return userInfo;
}