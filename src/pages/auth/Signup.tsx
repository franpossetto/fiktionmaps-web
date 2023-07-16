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
      <div className="container" style={{ height: "95vh", overflow: "hidden" }}>
        <div className="row d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
          <div className="col-5">
            <img src="../src/assets/fm_h.png" className="logo" style={{ width: "100%" }} alt="Logo"></img>
          </div>
          <div className="col-5">
            <form style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 50 }} onSubmit={handleSignUp}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" style={{ fontSize: "14px" }}>
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control bg-transparent"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  style={{ border: "1px solid #252527", marginBottom: "25px" }}
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1" style={{ fontSize: "14px" }}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control bg-transparent"
                  id="exampleInputPassword1"
                  style={{ border: "1px solid #252527", marginBottom: "25px" }}
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword2" style={{ fontSize: "14px" }}>
                  Repeat Password
                </label>
                <input
                  type="password"
                  className="form-control bg-transparent"
                  id="exampleInputPassword2"
                  style={{ border: "1px solid #252527" }}
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange}
                />
              </div>
              {error && (
                <div className="error" style={{ color: "red", marginBottom: "10px" }}>
                  {error}
                </div>
              )}
              <div className="form-group" style={{ marginTop: error ? "10px" : "20px" }}>
                <button
                  type="submit"
                  className="btn btn-dark"
                  style={{ width: "100%", height: "45px" }}
                >
                  Create an Account
                </button>
              </div>
              <div className="text-center" style={{ marginTop: "14px" }}>
                <p className="d-block mx-auto" style={{ fontSize: "13px" }}>
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

              <div className="footer" style={{ height: "5vh" }}>
              <Link to={"/api/docs"} style={{ textDecoration: "none" }}>
              <p style={{ color: "#ffffff", textAlign: "center", marginTop: "10px" }}>
              Public API Docs
              </p>
              </Link>
              </div>
              </>
              );
  };