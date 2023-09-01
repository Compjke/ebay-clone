"use client";

import { createContext, useEffect, useState, useContext } from "react";

import { useRouter } from "next/navigation";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [picture, setPicture] = useState(null);

  const supabaseCLient = createClientComponentClient();

  const getCurrentSession = async () => {
    const res = await supabaseCLient.auth.getSession();
    if (res && res.data.session) {
      return res.data.session;
    }

    clearUser();
    return null;
  };

  const getCurrentUser = async () => {
    if (id) {
      return;
    }
    const res = await supabaseCLient.auth.getUser();
    if (res && res.data.user) {
      const curUser = res.data.user;

      setUser(curUser);
      setId(curUser.id);
      setEmail(curUser.email);
      setName(curUser.identities[0].identity_data.name);
      setPicture(curUser.identities[0].identity_data.picture);
    }
  };

  useEffect(() => {
    const isUser = async () => {
      const currentSession = getCurrentSession();
      if (currentSession) {
        await getCurrentUser();
      }
    };
    isUser();
  }, []);

  const signOut = async () => {
    await supabaseCLient.auth.signOut();
    clearUser();
    router.push("/");
  };
  const clearUser = () => {
    setUser(null);
    setId(null);
    setEmail(null);
    setName(null);
    setPicture(null);
  };

  const exposed = { user, id, email, name, picture, signOut };
  
  return(
     <UserContext.Provider value={exposed}>
         {children}
      </UserContext.Provider>
  ) 
};

export const useUser = () => useContext(UserContext);


export default UserProvider;