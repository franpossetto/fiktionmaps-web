import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  PropsWithChildren,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { auth } from "../config/firebase";

import { UserService } from "../services/UserService";
import { UserDTO, UserRole } from "../types/dto/UserDTO";

const AuthContext = createContext<any>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      return { user };
    } catch (err) {
      const message = (err as Error).message;
      throw new Error(message);
    }
  };

  const signUpWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user: any = userCredentials.user;

      const actionCodeSettings = {
        url: import.meta.env.VITE_REDIRECT_URL_SIGNUP,
        handleCodeInApp: true,
      };

      sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
          window.localStorage.setItem("emailForSignIn", email);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });

      if (user) {
        const userDto: UserDTO = {
          externalUserId: user.uid,
          name: "",
          email: user.email || "",
          role: UserRole.USER,
        };

        const userService = new UserService();
        await userService.create(userDto);

        await logout();
      }

      return { user };
    } catch (err) {
      const message = (err as Error).message;
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (err) {
      const message = (err as Error).message;
      return { error: message };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Email enviado");
    } catch (error) {
      console.error(
        "Error al enviar el correo de restablecimiento de contraseña",
        error
      );
    }
  };

  // function updateEmail(email) {
  //   return currentUser.updateEmail(email)
  // }

  // function updatePassword(password) {
  //   return currentUser.updatePassword(password)
  // }

  const _auth: any = {
    user,
    loginWithEmailAndPassword,
    signUpWithEmailAndPassword,
    logout,
    resetPassword,
    // updateEmail,
    // updatePassword
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={_auth}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const ProtectedItem: React.FC<
  PropsWithChildren<{ fallback: ReactNode }>
> = ({ children, fallback }) => {
  const { user } = useAuthContext();

  // Auth Logic to decided if we should reder the item or not
  if (user) {
    return children;
  } else {
    return fallback;
  }
};
