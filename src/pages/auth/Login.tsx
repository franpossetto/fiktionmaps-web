import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import logoDesktop from "../../assets/fm_h.png";
import logoMobile from "../../assets/fm_v.png";
import { toast } from "react-toastify";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, loginWithEmailAndPassword } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      await loginWithEmailAndPassword(email, password);
    } catch (err: any) {
      if (err.message == "EMAIL_NOT_VERIFIED") {
        toast.error("Email is not verified");
      }
      if (err.message == "PASSWORD_OR_USER_INCORRECT") {
        toast.error("User or password are incorrect");
      }
    }
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center mx-10 xl:space-x-16 lg:space-x-16 md:space-x-0 sm:space-x-0 h-screen items-center">
        <div>
          <div>
            <img
              src={logoDesktop}
              className="hidden sm:block object-cover h-52 lg:h-72 xl:h-72"
              alt="Logo Desktop"
            />
            <img
              src={logoMobile}
              className="block sm:hidden mx-auto object-cover w-[100%]"
              alt="Logo Mobile"
            />
          </div>
          <h1 className="flex justify-center text-lg text-white">
            Connecting people with movies through cities
          </h1>
        </div>
        <div className="w-[100%] mx-10 sm:w-[420px] text-white">
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="inputEmail">Email address</label>
              <input
                type="email"
                className="w-full rounded-lg bg-white/5 py-1.5 text-white ring-inset ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-500 sm:text-sm sm:leading-6 focus:outline-none p-2.5 mb-5 mt-1"
                id="InputEmail"
                aria-describedby="emailHelp"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <div className="flex flex-row justify-between">
                <label htmlFor="inputPassword">Password</label>
                <label
                  htmlFor="forgotPassword"
                  className="text-blue-500 hover:text-blue-400 ml-2 font-semibold"
                >
                  <Link
                    to={"/forgotPassword"}
                    className="text-blue-500 hover:text-blue-400 ml-2 font-semibold"
                  >
                    Forgot password?
                  </Link>
                </label>
              </div>
              <input
                type="password"
                className="w-full rounded-lg bg-white/5 py-1.5 text-white ring-inset ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-500 sm:text-sm sm:leading-6 focus:outline-none p-2.5 mb-5 mt-1"
                id="InputPassword"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {error && <div className="error">{error}</div>}
            <div className="col-span-4">
              <button
                type="submit"
                className="rounded-lg w-full dark:focus:ring-gray-600 bg-slate-950 dark:text-white dark:hover:bg-blue-800 h-10 mb-8"
              >
                Login
              </button>
            </div>
            <div className="text-center">
              <p className="text-gray-300">
                Don't have an account?
                <Link
                  to={"/signup"}
                  className="text-blue-500 hover:text-blue-400 ml-2 font-semibold"
                >
                  Create one
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
