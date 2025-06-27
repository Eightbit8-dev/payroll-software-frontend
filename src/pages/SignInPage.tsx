// File: src/pages/AuthPage.tsx

import { useEffect, useState } from "react";
import Input from "../components/common/Input";
import { useSignInMutation } from "../queries/signInQuery";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../routes/appRoutes";
import { toast } from "react-toastify";

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending, isSuccess } = useSignInMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(appRoutes.dashboardPage, { replace: true });
    }
  }, [isSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      return toast.error("Username and password are required");
    }

    mutate({ username, password });
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col items-center justify-center px-8 md:w-1/2">
        <div className="flex w-[400px] flex-col gap-2">
          <div className="mb-3 text-center">
            <img
              src="./icons/logo-icon.svg"
              alt="Payroll Logo"
              className="mb-4 h-24 w-24"
            />
            <p className="text-md text-start font-medium text-gray-500">
              Please sign in!
            </p>
            <h2 className="head mt-1 text-start text-2xl font-medium">
              Welcome to Payroll
            </h2>
          </div>

          <div>
            <form
              className="flex w-full max-w-sm flex-col gap-3"
              onSubmit={handleSubmit}
            >
              <Input
                type="str"
                name="email"
                placeholder="Enter your username or email"
                title="Email"
                inputValue={username}
                onChange={setUsername}
              />

              <div className="relative w-full min-w-[180px] self-stretch">
                <h3 className="mb-0.5 w-full justify-start text-xs leading-loose font-semibold text-slate-700">
                  Password
                </h3>
                <div className="parent-input-wrapper flex cursor-text items-center justify-between overflow-clip rounded-xl border-2 border-slate-300 bg-white px-3 py-2.5 transition-all autofill:bg-blue-500 focus-within:border-slate-500">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-sm font-medium text-slate-600 placeholder:text-slate-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="ml-2 cursor-pointer text-slate-500 transition-transform hover:text-blue-600 focus:outline-none active:scale-95"
                  >
                    <img
                      src={
                        showPassword
                          ? "/icons/eye-off-icon.svg"
                          : "/icons/eye-icon.svg"
                      }
                      alt={showPassword ? "Hide Password" : "Show Password"}
                      className="h-6 w-6"
                    />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-[16px] bg-blue-500 px-3.5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-40"
                disabled={isPending || !username || !password}
              >
                {isPending ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="bg-primary relative hidden w-1/2 items-center justify-center md:flex">
        <img
          src="./images/Login-image.png"
          alt="Login art"
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
      </div>
    </div>
  );
};

export default AuthPage;
