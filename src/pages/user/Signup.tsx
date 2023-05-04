import { Link } from "react-router-dom";

export const SignUp = () => {
  return (
    <>
      <div className="container" style={{ height: "95vh", overflow: "hidden" }}>
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          <div className="col-5">
            <img
              src="../src/assets/fm_h.png"
              className="logo"
              style={{ width: "100%" }}
            ></img>
          </div>
          <div className="col-5">
            <form style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 50 }}>
              <div className="form-group">
                <label
                  htmlFor="exampleInputEmail1"
                  style={{ fontSize: "14px" }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control bg-transparent"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  style={{ border: "1px solid #252527", marginBottom: "25px" }}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="exampleInputPassword1"
                  style={{ fontSize: "14px" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control bg-transparent"
                  id="exampleInputPassword1"
                  style={{ border: "1px solid #252527", marginBottom: "25px" }}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="exampleInputPassword1"
                  style={{ fontSize: "14px" }}
                >
                  Repeat Password
                </label>
                <input
                  type="password"
                  className="form-control bg-transparent"
                  id="exampleInputPassword1"
                  style={{ border: "1px solid #252527" }}
                />
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-dark"
                style={{ width: "100%", height: "45px" }}
              >
                Create an Account
              </button>

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
          <p
            style={{
              color: "#ffffff",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Public API Docs
          </p>
        </Link>
      </div>
    </>
  );
};
