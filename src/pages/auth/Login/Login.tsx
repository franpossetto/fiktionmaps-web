//Login.tsx
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, loginWithEmailAndPassword }  = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const navigate  = useNavigate();
  
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  }
  
  const handleLogin = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault(); 
    const { user, error } = await loginWithEmailAndPassword(email, password);
    
    if (error) {
      setError('El correo electrónico o la contraseña son incorrectos');
    } else {
      navigate('/search'); 
      console.log(user);
    }
  };
  return (
    <>
      <div className="container w-[66%] mt-36 mb-3 mx-36">
        <div className="grid gap-10 grid-cols-9 grid-flow-col content-center">
          <div className="col-span-5">
              <img src="../src/assets/fm_h.png" className="h-60"></img>
          </div>
          <div className="col-span-4">
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label className="block" htmlFor="exampleInputEmail1">Email address</label>
                  <input type="email" 
                  className="mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="exampleInputEmail1" 
                  aria-describedby="emailHelp" 
                  value={email} onChange={handleEmailChange} />
                </div>
                <div className="form-group">
                  <label className="block" htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" 
                  className="mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="exampleInputPassword1" value={password} onChange={handlePasswordChange} />
                </div>
                {error && <div className="error">{error}</div>}
                <div className="col-span-4">
                <button type="submit" 
                 className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-base rounded-lg text-base w-full dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mb-2">Login</button>
                </div>
                <div className="text-center" >
                  <p className="d-block mx-auto">Don't have an account?<Link to={"/signup"} className="item-list">Create one</Link></p>
                </div>            
              </form>
              </div>  
            </div>
          </div>
      <footer>
        <div className="container">
        <Link to={"/search"}>
          <p className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-down-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
            </svg>
            Search Fiktion Maps</p>
        </Link>
        </div>
      </footer>
    </>
  );
};
