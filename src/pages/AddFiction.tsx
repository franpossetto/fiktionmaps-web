import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MediaType } from "../types/MediaType";
import { SearchFiction } from "../components/movies/SearchFiction";
import { SearchPlace } from "../components/places/SearchPlace";
import { FictionDTO } from "../types/dto/FictionDTO";
import FictionContext from "../context/FictionContext";
import { LocationDTO } from "../types/dto/LocationDTO";
import { MapsProvider } from "../types/MapsProvider";
import { Map2FictionService } from "../services/Map2FictonService";

import "../components/movies/SearchFiction.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const AddFiction = () => {
  const [mediaType, setMediaType] = useState<MediaType>(MediaType.MOVIE);

  const [reset, setReset] = useState<boolean>(true);
  const [query, setQuery] = useState("");
  const [place, setPlace] = useState<LocationDTO>();
  const [fictionDTO, setFictionDTO] = useState<FictionDTO[]>([]);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [description, setDescription] = useState<string>("");

  // Handle close or media type change
  useEffect(() => {
    setQuery("");
    setReset(!reset);
  }, [mediaType]);

  function handleChange(selectedOption: MediaType) {
    setMediaType(selectedOption);
  }

  useEffect(() => {
    console.log(fictionDTO);
    if (fictionDTO != undefined && place != null) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [fictionDTO, place]);

  function CreateFiction(): void {
    if (fictionDTO.length == 1 && place != null) {
      const fiction: any = {
        name: fictionDTO[0].name,
        type: MediaType[fictionDTO[0].type],
        episodes: null,
        scenes: null,
      };
      const location: any = {
        formatted_address: place.formatted_address,
        place_id: place.place_id,
        latitude: place.latitude,
        longitude: place.longitude,
        provider: MapsProvider.GOOGLE_MAPS,
        city: place.city,
      };

      const map2FictionService: Map2FictionService = new Map2FictionService();
      map2FictionService.createFictionMap("/api/v1/fiction-maps/", {
        fiction,
        location,
      });
    }
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return (
    <FictionContext.Provider value={[fictionDTO, place]}>
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
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
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
                value={description}
                onChange={handleDescriptionChange}
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
                  disabled={isDisable}
                  onClick={() => CreateFiction()}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </FictionContext.Provider>
  );
};
