import { useEffect, useState } from "react";
import "../components/movies/SearchFiction.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { MediaType } from "../types/MediaType";
import { Season } from "../types/Season";
import { SearchFiction } from "../components/movies/SearchFiction";
import { SearchPlace } from "../components/places/SearchPlace";
import { FictionDTO } from "../types/dto/FictionDTO";
import { useSelector } from "react-redux";

export const AddFiction = () => {
  const [mediaType, setMediaType] = useState<MediaType>(MediaType.MOVIE);

  const selectedPlace = useSelector((state: any) => state.placeReducer);

  const [reset, setReset] = useState<boolean>(true);
  const [query, setQuery] = useState("");
  const [place, setPlace] = useState("");
  const [fictionDTO, setFictionDTO] = useState<FictionDTO[]>([]);

  // Handle close or media type change
  useEffect(() => {
    setQuery("");
    setReset(!reset);
  }, [mediaType]);

  function handleChange(selectedOption: MediaType) {
    setMediaType(selectedOption);
  }

  const EnableCreateButton = () => {};

  function CreateFiction(): void {
    throw new Error("Function not implemented.");
  }

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
            onChange={() => handleChange(MediaType.MOVIE)}
            checked={mediaType == MediaType.MOVIE}
          />
          <label className="btn btn-outline-primary" htmlFor="movie">
            Movie
          </label>
          <input
            type="radio"
            className="btn-check"
            name="btnradio2"
            id="tv"
            onChange={() => handleChange(MediaType.TV)}
            checked={mediaType == MediaType.TV}
          />
          <label className="btn btn-outline-primary" htmlFor="tv">
            TV Show
          </label>
          <input
            type="radio"
            className="btn-check"
            name="btnradio3"
            id="book"
            onChange={() => handleChange(MediaType.BOOK)}
            checked={mediaType == MediaType.BOOK}
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
              <SearchFiction
                mediaType={mediaType}
                setFictionDTO={setFictionDTO}
              />
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
                onClick={() => CreateFiction()}
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
