import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";

import { UserContext, UserContextProvider } from "./provider";

const TestConsumer = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <span data-testid="uid">{user.uid}</span>
      <span data-testid="email">{user.email ?? "null"}</span>
      <span data-testid="anonymous">{user.isAnonymous.toString()}</span>
      <button
        onClick={() =>
          setUser({ uid: "u1", email: "a@b.com", isAnonymous: false })
        }
      >
        Login
      </button>
    </div>
  );
};

test("provides anonymous user by default", () => {
  render(
    <UserContextProvider>
      <TestConsumer />
    </UserContextProvider>
  );
  expect(screen.getByTestId("uid")).toHaveTextContent("");
  expect(screen.getByTestId("email")).toHaveTextContent("null");
  expect(screen.getByTestId("anonymous")).toHaveTextContent("true");
});

test("setUser updates propagate to consumers", async () => {
  render(
    <UserContextProvider>
      <TestConsumer />
    </UserContextProvider>
  );
  await userEvent.click(screen.getByText("Login"));
  expect(screen.getByTestId("uid")).toHaveTextContent("u1");
  expect(screen.getByTestId("email")).toHaveTextContent("a@b.com");
  expect(screen.getByTestId("anonymous")).toHaveTextContent("false");
});
