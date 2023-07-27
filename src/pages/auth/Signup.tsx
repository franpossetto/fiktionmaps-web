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
      <div className="container" >
        <div className="grid gap-6 mt-36 mb-3 md:grid-cols-2">
          <div className="items-center">
            <img src="../src/assets/fm_h.png" className="h-65" alt="Logo"></img>
          </div>
          <div>
            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <label className="block" htmlFor="exampleInputEmail1">
                  Email address
                </label>
                <input
                  type="email"
                  className="mt-2 mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  className="mt-2 mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <div className="mt-10 mx-56">
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-black rounded-lg hover:bg-blue-900"
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

              <footer>
              <Link to={"/api/docs"}>
              <p className="flex justify-center">
              Public API Docs
              </p>
              </Link>
              </footer>
              </>
              );
  };