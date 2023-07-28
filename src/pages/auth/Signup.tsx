import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext"

export const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate  = useNavigate();
  
  const { user, signUpWithEmailAndPassword }  = useAuthContext();
  
  useEffect(()=>{
    if(user != null){
      console.log(user);
    }
  },[user])

  
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  }
  
  const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.target.value);
  };

  const handleSignUp = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault(); 
    const { user, error } = await signUpWithEmailAndPassword(email, password);
    
    if (error) {
      setError('El correo electrónico o la contraseña son incorrectos');
    } else {
      // setcurrentUser(user);
      navigate('/api/docs'); 
      console.log(user['accessToken']);
    }
  };

  return (
    <>
      <div className="container w-[66%] mt-36 mb-3 mx-36" >
        <div className="grid gap-6 grid-cols-9 grid-flow-col content-center">
          <div className="col-span-5">
            <img src="../src/assets/fm_h.png" className="h-60 mt-10" alt="Logo"></img>
          </div>
          <div className="col-span-4">
            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <label className="block" htmlFor="exampleInputEmail1">
                  Email address
                </label>
                <input
                  type="email"
                  className="mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="form-group">
                <label className="block" htmlFor="exampleInputPassword1">
                  Password
                </label>
                <input
                  type="password"
                  className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="form-group">
                <label className="block" htmlFor="exampleInputPassword2">
                  Repeat Password
                </label>
                <input
                  type="password"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="exampleInputPassword2"
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange}
                />
              </div>
              {error && (
                <div className="error">
                  {error}
                </div>
              )}
              <div className="mt-5 col-span-4">
                <button
                  type="submit"
                  className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-base rounded-lg text-base w-full dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mb-2"
                >
                  Create an Account
                </button>
              </div>
              <div className="text-center">
                <p className="d-block mx-auto">
                  Or you already have an account?
                  <Link to={"/login"} className="item-list">
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

              <footer className="bottom-0">
              <Link to={"/api/docs"}>
              <p className="flex justify-center">
              Public API Docs
              </p>
              </Link>
              </footer>
              </>
              );
  };