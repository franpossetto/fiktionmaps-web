import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/fm_h.png"
import { toast } from "react-toastify";

export const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { user, signUpWithEmailAndPassword } = useAuthContext();

  useEffect(() => {
    if (user != null) {
      console.log(user);
    }
  }, [user]);

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

  const handleRepeatPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(event.target.value);
  };

  const handleSignUp = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    try{
      const { user } = await signUpWithEmailAndPassword(email, password);
    } catch{
      toast.error("Email must be specified and passwords must be equals");
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center xl:space-x-16 lg:space-x-16 md:space-x-0 sm:space-x-0 h-screen items-center">
        <div>
          <img
            src={logo}
            className="object-cover h-52 lg:h-72 xl:h-72"
          ></img>
          <h1 className="flex justify-center text-lg ">
            Connecting people with movies through cities
          </h1>
        </div>
        <div>
          <form onSubmit={handleSignUp}>
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
              <label htmlFor="inputPassword">Password</label>
              <input
                type="password"
                className="w-full rounded-lg bg-white/5 py-1.5 text-white ring-inset ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-500 sm:text-sm sm:leading-6 focus:outline-none p-2.5 mb-5 mt-1"
                id="InputPassword"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <label htmlFor="inputRepeatPassword">Repeat Password</label>
              <input
                type="password"
                className="w-full rounded-lg bg-white/5 py-1.5 text-white ring-inset ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-500 sm:text-sm sm:leading-6 focus:outline-none p-2.5 mb-5 mt-1"
                id="InputRepeatPassword"
                value={repeatPassword}
                onChange={handleRepeatPasswordChange}
              />
            </div>
            {error && <div className="error">{error}</div>}
            <div className="col-span-4">
              <button
                type="submit"
                className="rounded-lg w-full dark:focus:ring-gray-600 bg-slate-950 dark:text-white dark:hover:bg-blue-800 h-10 mb-8"
              >
                Create Account
              </button>
            </div>
            <div className="text-center">
              <p className="text-gray-300">
                You already have an account?
                <Link
                  to={"/login"}
                  className="text-blue-500 hover:text-blue-400 ml-2 font-semibold"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
