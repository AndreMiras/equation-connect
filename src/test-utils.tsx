import { render, RenderOptions } from "@testing-library/react";
import React, { FC, PropsWithChildren } from "react";
import { HashRouter as Router } from "react-router";

import { User, UserContext } from "./context/provider";

const anonymousUser: User = {
  uid: "",
  email: null,
  isAnonymous: true,
};

interface WrapperOptions {
  user?: User;
  setUser?: ReturnType<typeof vi.fn>;
}

const createWrapper = ({
  user = anonymousUser,
  setUser = vi.fn(),
}: WrapperOptions = {}): FC => {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>{children}</Router>
    </UserContext.Provider>
  );
  return Wrapper;
};

const renderWithProviders = (
  ui: React.ReactElement,
  options: WrapperOptions & Omit<RenderOptions, "wrapper"> = {},
) => {
  const { user, setUser, ...renderOptions } = options;
  return render(ui, {
    wrapper: createWrapper({ user, setUser }),
    ...renderOptions,
  });
};

export { anonymousUser, renderWithProviders };
