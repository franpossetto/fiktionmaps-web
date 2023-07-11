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
      <div className="container" style={{ height: "95vh", overflow: "hidden" }}>
        <div className="row d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
          <div className="col-5">
            <img src="../src/assets/fm_h.png" className="logo" style={{ width: "100%" }}></img>
          </div>
          <div className="col-5">
            <form style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 50 }} onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" style={{ fontSize: "14px" }}>Email address</label>
                <input type="email" className="form-control bg-transparent" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ border: "1px solid #252527", marginBottom: "25px" }} value={email} onChange={handleEmailChange} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1" style={{ fontSize: "14px" }}>Password</label>
                <input type="password" className="form-control bg-transparent" id="exampleInputPassword1" style={{ border: "1px solid #252527", marginBottom: "25px" }} value={password} onChange={handlePasswordChange} />
              </div>
              {error && <div className="error">{error}</div>}
              <button type="submit" className="btn btn-dark" style={{ width: "100%", height: "45px" }}>Login</button>
              <div className="text-center" style={{ marginTop: "14px" }}>
                <p className="d-block mx-auto" style={{ fontSize: "13px" }}>Don't have an account?<Link to={"/signup"} className="item-list">Create one</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="footer" style={{ height: "5vh" }}>
        <Link to={"/search"} style={{ textDecoration: "none" }}>
          <p style={{ color: "#ffffff", textAlign: "center", marginTop: "10px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-down-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
            </svg>
            Search Fiktion Maps
          </p>
        </Link>
      </div>
    </>
  );
};
