import { User, onAuthStateChanged } from "firebase/auth";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { FIREBASE_AUTH } from "@/config/firebaseConfig";

interface AuthProps {
  user?: User | null;
  initialized?: boolean;
}

const AuthContext = createContext<AuthProps>({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>();
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("onAuthStateChanged", user);

      setUser(user);
      setInitialized(true);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, initialized }}>
      {children}
    </AuthContext.Provider>
  );
};
