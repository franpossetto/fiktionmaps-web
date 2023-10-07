//Login.tsx
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState } from "react";

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const { user, resetPassword } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      await resetPassword(email);
      setEmailSent(true);
      console.log("Email enviado");
    } catch (error) {
      console.error(
        "Error al enviar el correo de restablecimiento de contraseña",
        error
      );
      navigate("/login");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center space-x-16 md:space-x-0 h-screen items-center">
        <div>
          <img
            src="../src/assets/fm_h.png"
            className="object-cover h-52 lg:h-32 xl:h-32 mb-7"
          ></img>
        </div>
        {emailSent ? (
          <div className="text-center w-[600px]">
            <p>
              An email has been sent to <strong>{email} </strong>, follow the
              instructions to reset your password.
            </p>
            <button className="rounded-lg w-[200px] dark:focus:ring-gray-600 bg-slate-950 dark:text-white dark:hover:bg-blue-800 h-10 mt-8">
              <Link to={"/login"} className="font-semibold">
                Back to login
              </Link>
            </button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleResetPassword}>
              <div className="w-[400px]">
                <p className="mb-2 text-center">
                  Please enter your email to recover your account.
                </p>
                <input
                  type="email"
                  className="w-full rounded-lg bg-white/5 py-1.5 text-white ring-inset ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-500 sm:text-sm sm:leading-6 focus:outline-none p-2.5 mb-5 mt-1"
                  id="InputEmail"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              {error && <div className="error">{error}</div>}
              <div className="col-span-4">
                <button
                  type="submit"
                  className="rounded-lg w-full dark:focus:ring-gray-600 bg-slate-950 dark:text-white dark:hover:bg-blue-800 h-10 mb-8"
                >
                  Reset Password
                </button>
              </div>
              <div className="text-center">
                <p className="text-gray-300">
                  After reset, you should receive an email soon.
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
        )}
      </div>
    </>
  );
};
