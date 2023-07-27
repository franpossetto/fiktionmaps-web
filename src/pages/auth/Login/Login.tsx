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
      <div className="container">
        <div>
          <div className="flex h-50 shrink-10 items-center justify-center">
              <img src="../src/assets/fm_h.png" className="h-40 mt-8"></img>
          </div>
          <div className="flex items-center justify-center">
          <div className="px-8 py-6 mt-4 text-lef shadow-lg">
            <form onSubmit={handleLogin}>
                <div className="flex space-x-4">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                  <input type="email" className="form-control bg-transparent col" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={handleEmailChange} />
                </div>
                <div className="flex space-x-12">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control bg-transparent" id="exampleInputPassword1" value={password} onChange={handlePasswordChange} />
                </div>
                {error && <div className="error">{error}</div>}
                <div className="flex items-baseline justify-between"></div>
                <div className="flex items-baseline justify-between">
                <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" >Login</button>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                </div>
                <div className="text-center" >
                  <p className="d-block mx-auto">Don't have an account?<Link to={"/signup"} className="item-list">Create one</Link></p>
                </div>            
              </form>
              </div>  
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
