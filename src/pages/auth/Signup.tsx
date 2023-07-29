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
      <div className="flex flex-col mt-36 mb-3 mx-28" >
        <div className="grid gap-6 md:grid-cols-2 content-center">
        <div>
            <img src="../src/assets/fm_h.png" className={"h-80"} alt="Logo"></img>
        </div>
          <div className="mr-40">
            <form onSubmit={handleSignUp}>
              
              <div className="mb-5">
                <label className="block text-sm font-medium leading-6 text-white" htmlFor="exampleInputEmail1">
                  Email address
                </label>
                <div className="mt-2">

                <input
                  type="email"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              </div>

              <div className="mb-5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium leading-6 text-white" htmlFor="exampleInputPassword2">
                  Repeat Password
                </label>
                <div className="mt-2">
                <input
                  type="password"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  id="exampleInputPassword2"
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange}
                />
                </div>
              </div>
              {error && (
                <div className="error">
                  {error}
                </div>
              )}
              <div className="mt-10">
                <button
                  type="submit"
                  className="px-40 py-2.5 text-white bg-black rounded-lg hover:bg-blue-900"
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

              </>
              );
  };