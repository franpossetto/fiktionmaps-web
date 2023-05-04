import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MediaType } from "../../types/MediaType";
import { SearchFiction } from "../../components/movies/SearchFiction";
import { SearchPlace } from "../../components/places/SearchPlace";
import { FictionDTO } from "../../types/dto/FictionDTO";
import FictionContext from "../../context/FictionContext";
import PlaceContext from "../../context/PlaceContext";
import { LocationDTO } from "../../types/dto/LocationDTO";
import { MapsProvider } from "../../types/providers/MapsProvider";
import { Map2FictionService } from "../../services/Map2FictonService";

import "bootstrap-icons/font/bootstrap-icons.css";

interface FormState {
  reset: boolean;
  query: string;
  isDisable: boolean;
  description: string;
}

interface FormData {
  fiction?: FictionDTO;
  place: LocationDTO | null;
  description: string;
}

interface PlaceFormData {
  place: LocationDTO | null;
  description: string;
}

export const AddFictionForm = () => {
  const [formState, setFormState] = useState<FormState>({
    reset: true,
    query: "",
    isDisable: true,
    description: "",
  });

  const [formData, setFormData] = useState<FormData>({
    fiction: undefined,
    place: null,
    description: "",
  });

  const [placeFormData, setplaceFormData] = useState<PlaceFormData>({
    place: null,
    description: "",
  });

  const [selectedMediaType, setSelectedMediaType] = useState<MediaType>(
    MediaType.MOVIE
  );

  // Handle close or media type change
  useEffect(() => {
    setFormState({ ...formState, reset: !formState.reset, query: "" });
  }, [selectedMediaType]);

  function handleChange(selectedOption: MediaType) {
    setSelectedMediaType(selectedOption);
  }

  useEffect(() => {
    if (formData.fiction != undefined && placeFormData.place != null) {
      setFormState({ ...formState, isDisable: false });
    } else {
      setFormState({ ...formState, isDisable: true });
    }
  }, [formData.fiction, placeFormData.place]);

  function CreateFiction(): void {
    if (formData.fiction && placeFormData.place != null) {
      const fiction: any = {
        name: formData.fiction.name,
        type: MediaType[formData.fiction.type],
      };
      console.log(formData);
      if (formData.fiction.episode) {
        fiction.episodes = formData.fiction.episode;
      }

      const location: any = {
        formatted_address: placeFormData.place.formatted_address,
        place_id: placeFormData.place.place_id,
        latitude: placeFormData.place.latitude,
        longitude: placeFormData.place.longitude,
        provider: MapsProvider.GOOGLE_MAPS,
        city: placeFormData.place.city,
      };

      const map2FictionService: Map2FictionService = new Map2FictionService();
      map2FictionService.createFictionMap("api/v1/fictions/", {
        fiction,
        location,
      });
    }
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, description: event.target.value });
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
            onChange={() => handleChange(MediaType.MOVIE)}
            checked={selectedMediaType == MediaType.MOVIE}
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
            checked={selectedMediaType == MediaType.TV}
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
            checked={selectedMediaType == MediaType.BOOK}
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
              <FictionContext.Provider value={formData}>
                <SearchFiction
                  mediaType={selectedMediaType}
                  setFiction={setFormData}
                />
              </FictionContext.Provider>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <PlaceContext.Provider value={placeFormData}>
                <SearchPlace
                  setPlace={setplaceFormData}
                  reset={formState.reset}
                />
              </PlaceContext.Provider>
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
              value={formData.description}
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
                disabled={formState.isDisable}
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
