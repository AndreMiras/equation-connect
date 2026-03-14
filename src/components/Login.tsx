import { auth, FirebaseConfig, init, login } from "equation-connect";
import { Auth, onAuthStateChanged } from "firebase/auth";
import { ChevronDown } from "lucide-react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { anonymousUser, User, UserContext } from "../context/provider";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setUser } = useContext(UserContext);

  const registerOnAuthStateChanged = useCallback(
    (auth: Auth) => {
      onAuthStateChanged(auth, (currentUser) => {
        const user = currentUser === null ? anonymousUser : currentUser;
        setUser(user);
      });
    },
    [setUser],
  );

  useEffect(() => {
    registerOnAuthStateChanged(auth!);
  }, [setUser, registerOnAuthStateChanged]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onLogin = async () => {
    try {
      const user: User = await login(email, password);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const onConfig = (conf: FirebaseConfig) => {
    const { auth } = init(conf);
    registerOnAuthStateChanged(auth);
    setDropdownOpen(false);
  };

  const onLoginClick = () => onLogin();

  const onFormSubmit = (e: React.FormEvent) => e.preventDefault();

  return (
    <form className="flex items-center gap-2" onSubmit={onFormSubmit}>
      <input
        type="email"
        placeholder="Email"
        aria-label="Email"
        onChange={onEmailChange}
        className="h-9 rounded-lg border border-edge bg-input px-3 text-sm text-fg outline-none focus:border-edge-focus"
      />
      <input
        type="password"
        placeholder="Password"
        aria-label="Password"
        onChange={onPasswordChange}
        className="h-9 rounded-lg border border-edge bg-input px-3 text-sm text-fg outline-none focus:border-edge-focus"
      />
      <div className="relative" ref={dropdownRef}>
        <div className="flex">
          <button
            type="submit"
            onClick={onLoginClick}
            className="h-9 rounded-l-lg bg-btn px-4 text-sm font-medium text-btn-fg hover:bg-btn-hover"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex h-9 items-center rounded-r-lg border-l border-btn-edge bg-btn px-2 text-btn-fg hover:bg-btn-hover"
            aria-label="Login options"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-edge bg-card py-1 shadow-lg">
            <button
              type="button"
              onClick={() => onConfig(FirebaseConfig.EquationConnect)}
              className="w-full px-4 py-2 text-left text-sm text-fg-secondary hover:bg-inset"
            >
              Equation Login
            </button>
            <button
              type="button"
              onClick={() => onConfig(FirebaseConfig.RointeConnect)}
              className="w-full px-4 py-2 text-left text-sm text-fg-secondary hover:bg-inset"
            >
              Rointe Login
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default Login;
