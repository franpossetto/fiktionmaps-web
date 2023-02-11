import { useEffect, useState } from "react";
import "../components/movies/SearchFiction.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { MediaType } from "../types/MediaType";
import { Fiction } from "../types/Fiction";
import TMDBService from "../services/TMDBService";
import { Season } from "../types/Season";
import { SearchFiction } from "../components/movies/SearchFiction";
import { SearchPlace } from "../components/places/SearchPlace";

export const AddFiction = () => {
  const [movieChecked, setMovieChecked] = useState<boolean>(true);
  const [tvChecked, setTvChecked] = useState<boolean>(false);
  const [bookChecked, setBookChecked] = useState<boolean>(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [mediaType, setMediaType] = useState<MediaType>(MediaType.movie);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Fiction[]>([]);
  const [selected, setSelected] = useState<boolean>(false);
  const [close, setClose] = useState<boolean>(false);
  const [seasons, setSeasons] = useState<Season>();
  const [place, setPlace] = useState("");
  const [reset, setReset] = useState<boolean>(true);

  useEffect(() => {
    if (!selected) {
      searchMovie(query);
      setSelected(false);
    }
  }, [query]);

  useEffect(() => {
    setQuery("");
    setSelected(false);
    setReset(!reset);
  }, [close, mediaType]);

  function handleChange(selectedOption: string) {
    if (selectedOption == "movie") {
      setMovieChecked(true);
      setTvChecked(false);
      setBookChecked(false);
      setMediaType(MediaType.movie);
    }
    if (selectedOption == "tv") {
      setMovieChecked(false);
      setTvChecked(true);
      setBookChecked(false);
      setMediaType(MediaType.tv);
    }
    if (selectedOption == "book") {
      setMovieChecked(false);
      setTvChecked(false);
      setBookChecked(true);
      setMediaType(MediaType.book);
    }
  }
  const searchMovie = async (fictionName: string) => {
    if (fictionName == "") {
      setResults([]);
    } else {
      try {
        const res = await TMDBService.search(fictionName, mediaType);
        if (MediaType[mediaType] == "movie") {
          setResults(
            res.results.map((movie: any) => ({
              title: movie.title,
              id: movie.id,
              img: movie.poster_path,
              overview:
                movie.overview.length > 30
                  ? movie.overview.slice(0, 120) + "..."
                  : movie.overview,
            }))
          );
        } else if (MediaType[mediaType] == "tv") {
          setResults(
            res.results.map((tv: any) => ({
              title: tv.name,
              id: tv.id,
              img: tv.poster_path,
              overview:
                tv.overview.length > 30
                  ? tv.overview.slice(0, 120) + "..."
                  : tv.overview.length > 0
                  ? tv.overview
                  : "No description provided",
            }))
          );
        }
      } catch (err) {
        console.log("err");
      }
    }
  };

  return (
    <>
      <div className="container" style={{ width: "30%", paddingTop: "30px" }}>
        <h1> New Place </h1>
        <p> Add a new Place and specify the Fiction you wanna to associate</p>
        <div
          className="btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check"
            name="btnradio1"
            id="movie"
            onChange={() => handleChange("movie")}
            checked={movieChecked}
          />
          <label className="btn btn-outline-primary" htmlFor="movie">
            Movie
          </label>
          <input
            type="radio"
            className="btn-check"
            name="btnradio2"
            id="tv"
            onChange={() => handleChange("tv")}
            checked={tvChecked}
          />
          <label className="btn btn-outline-primary" htmlFor="tv">
            TV Show
          </label>
          <input
            type="radio"
            className="btn-check"
            name="btnradio3"
            id="book"
            onChange={() => handleChange("book")}
            checked={bookChecked}
            disabled
          />
          <label className="btn btn-outline-primary" htmlFor="book">
            Book
          </label>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Fiction
              </label>
              <SearchFiction mediaType={mediaType} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <SearchPlace setPlace={setPlace} reset={reset} />
            </div>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              placeholder="Scene Description..."
            ></textarea>
          </div>
        </div>

        <br></br>
        <br></br>
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => console.log("Wohoooo")}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
