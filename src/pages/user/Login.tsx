import { Link } from "react-router-dom";

export const Login = () => {
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
                  Don't have an account?
                  <Link to={"/signup"} className="item-list">
                    Create one
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="footer" style={{ height: "5vh" }}>
        <Link to={"/search"} style={{ textDecoration: "none" }}>
          <p
            style={{
              color: "#ffffff",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-arrow-down-short"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
              />
            </svg>
            Search Fiktion Maps
          </p>
        </Link>
      </div>
    </>
  );
};
