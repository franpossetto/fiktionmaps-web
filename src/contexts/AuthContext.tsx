import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from '../firebase';
import { UserService } from '../services/UserService';
import { UserDTO, UserRole } from '../services/dto/UserDTO';

const AuthContext = createContext<any>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true)

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      return { user };
    } catch (err) {
      const message = (err as Error).message;
      throw new Error(message);
    }
  };
  
  const signUpWithEmailAndPassword = async (email: string, password: string) => {
      try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
        
        if (user) {
        const userDto: UserDTO = {
            externalUserId: user.uid,
            name: "",
            email: user.email || "",
            password: "",
            role: UserRole.USER, 
        }

        // Create an instance of UserService and call the create method
        const userService = new UserService();
        const response = await userService.create(userDto);
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
  
  // function resetPassword(email) {
  //   return auth.sendPasswordResetEmail(email)
  // }

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
    // resetPassword,
    // updateEmail,
    // updatePassword
  }
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setUser(user)
        setLoading(false)
      })
  
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
  }