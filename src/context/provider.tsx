import React, { createContext, useState, FunctionComponent } from "react";

type User = {
  uid: string;
  email: string | null;
  isAnonymous: boolean;
};

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

const anonymousUser = {
  uid: "",
  email: null,
  isAnonymous: true,
};

const userContextDefault = {
  user: anonymousUser,
  setUser: () => {},
};

const UserContext = createContext<UserContextType>(userContextDefault);

const UserContextProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User>(userContextDefault.user);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export type { User };
export { anonymousUser, UserContext, UserContextProvider };
