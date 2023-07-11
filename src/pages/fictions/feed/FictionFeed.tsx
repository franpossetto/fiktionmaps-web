import { Outlet, useNavigate } from "react-router-dom";
import "./FictionFeed.css";
import { useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import Navbar from "../../../components/shared/NavBar/NavBar";

interface CardData {
  title: string;
  imageUrl: string;
}

interface CardData {
  title: string;
  imageUrl: string;
}

interface Props {
  cards: CardData[];
}

const movies = [
  {
    title: "The Godfather",
    imageUrl: "https://image.tmdb.org/t/p/w500/iVZ3JAcAjmguGPnRNfWFOtLHOuY.jpg",
  },
  {
    title: "The Shawshank Redemption",
    imageUrl: "https://image.tmdb.org/t/p/w500/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg",
  },
  {
    title: "The Dark Knight",
    imageUrl: "https://image.tmdb.org/t/p/w500/1PrltG8an7azbKmb9Qd7AOEx0gh.jpg",
  },
  {
    title: "Pulp Fiction",
    imageUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  },
  {
    title: "Forrest Gump",
    imageUrl: "https://image.tmdb.org/t/p/w500/yE5d3BUhE8hCnkMUJOo1QDoOGNz.jpg",
  },
  {
    title: "The Matrix",
    imageUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  {
    title: "Inception",
    imageUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  },
  {
    title: "The Empire Strikes Back",
    imageUrl: "https://image.tmdb.org/t/p/w500/6u1fYtxG5eqjhtCPDx04pJphQRW.jpg",
  },
  {
    title: "Fight Club",
    imageUrl: "https://image.tmdb.org/t/p/w500/adw6Lq9FiC9zjYEpOqfq03ituwp.jpg",
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    imageUrl: "https://image.tmdb.org/t/p/w500/56zTpe2xvaA4alU51sRWPoKPYZy.jpg",
  },
  {
    title: "Interstellar",
    imageUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    title: "The Avengers",
    imageUrl: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UHpdWHOQlrgCk.jpg",
  },
  {
    title: "The Godfather: Part II",
    imageUrl: "https://image.tmdb.org/t/p/w500/bVq65huQ8vHDd1a4Z37QtuyEvpA.jpg",
  },
  {
    title: "Gladiator",
    imageUrl: "https://image.tmdb.org/t/p/w500/6WBIzCgmDCYrqh64yDREGeDk9d3.jpg",
  },
  {
    title: "Schindler's List",
    imageUrl: "https://image.tmdb.org/t/p/w500/cSRCiw8UbsdC3qY98n0VKDgHJri.jpg",
  },
  {
    title: "The Lion King",
    imageUrl: "https://image.tmdb.org/t/p/w500/bKPtXn9n4M4s8vvZrbw40mYsefB.jpg",
  },
  {
    title: "Back to the Future",
    imageUrl: "https://image.tmdb.org/t/p/w500/pTpxQB1N0waaSc3OSn0e9oc8kx9.jpg",
  },
  {
    title: "The Silence of the Lambs",
    imageUrl: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg",
  },
  {
    title: "The Lord of the Rings: The Two Towers",
    imageUrl: "https://image.tmdb.org/t/p/w500/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg",
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    imageUrl: "https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg",
  },
];

interface CardData {
  title: string;
  imageUrl: string;
}

interface Props {
  cards: CardData[];
}

const handleHomeClick = () => {
  console.log("Home clicked");
};

const handleLoginClick = () => {
  console.log("Login clicked");
};

const handleSignupClick = () => {
  console.log("Signup clicked");
};

export const FictionFeed = () => {

  const [error, setError] = useState("")
  const { logout } = useAuthContext()
  const navigate = useNavigate();
  
  async function handleLogout() {
    setError("")

    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Navbar
        onHomeClick={handleHomeClick}
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
      />
      <div style={{ width: "80%" }}>
        <Outlet />
      </div>
      <div className="row">
        <div className="col-3">
          <div className="search-input-container">
          <button onClick={()=>{ handleLogout()}}>logout</button>
            <input
              className="form-control search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </div>
        <div className="col-8">
          <div className="card-row-wrapper"></div>
          <div className="card-grid">
            {movies.map((card, index) => (
              <div
                className="card"
                style={{ backgroundImage: `url(${card.imageUrl})` }}
              >
                {/* <div className="card-info">
                    <button className="map-button">Map</button>
                    <div className="card-title">{card.title}</div>
                  </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
