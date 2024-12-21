import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase";

export type AuthState = {
  user: User | null;
  userId: string | null;
  loading: boolean;
};

function useAuthenticated(): AuthState {
  const [user, setUser] = useState<User | null>(() => auth.currentUser);
  const [loading, setLoading] = useState<boolean>(
    () => auth.currentUser === null,
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (next) => {
      setUser(next);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return {
    user,
    userId: user?.uid ?? null,
    loading,
  };
}

export default useAuthenticated;
