//Login.tsx
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState } from "react";

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
    const { user, error } = await loginWithEmailAndPassword(email, password);

    if (error) {
      setError("El correo electrónico o la contraseña son incorrectos");
    } else {
      navigate("/profile");
      console.log(user);
    }
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center xl:space-x-16 lg:space-x-16 md:space-x-0 sm:space-x-0 h-screen items-center">
        <div>
          <img
            src="../src/assets/fm_h.png"
            className="object-cover h-52 lg:h-72 xl:h-72"
          ></img>
        </div>
        <div>
          <form onSubmit={handleLogin}>
            <div className="w-[400px]">
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
