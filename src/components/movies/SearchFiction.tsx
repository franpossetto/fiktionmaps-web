import { useEffect, useState } from "react";
import TMDBService from "../../services/TMDBService";
import "./SearchFiction.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { MediaType } from "../../types/MediaType";
import { Fiction } from "../../types/Fiction";
import { Season, TVSeason } from "../../types/Season";

export const SearchFiction = (props: any) => {
  const mediaType: MediaType = props.mediaType;

  const [results, setResults] = useState<Fiction[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<boolean>(false);
  const [close, setClose] = useState<boolean>(false);

  const [seasons, setSeasons] = useState<Season>();

  const [selectedFiction, setSelectedFiction] = useState<number>();
  const [selectedSeason, setSelectedSeason] = useState<number>(0);
  const [selectedEpisode, setselectedEpisode] = useState<number>(1);

  const [fictionPlaceholderType, setFictionPlaceholderType] =
    useState("Movie Name");

  // Set the Fiction placeholder type
  useEffect(() => {
    if (MediaType[mediaType] == "movie") {
      setFictionPlaceholderType("Movie Name");
    }
    if (MediaType[mediaType] == "tv") {
      setFictionPlaceholderType("TV Show Name");
    }
    if (MediaType[mediaType] == "book") {
      setFictionPlaceholderType("Book Name");
    }
  }, [mediaType]);

  useEffect(() => {
    if (!selected) {
      searchMovie(query);
      setSelected(false);
    }
  }, [query]);

  useEffect(() => {
    setQuery("");
    setSelected(false);
  }, [close, mediaType]);

  const getEp = async (session_id: number) => {
    if (selectedFiction) {
      const episodes = await TMDBService.getEpisodes(
        selectedFiction,
        selectedSeason,
        selectedEpisode
      );
      return episodes;
    }
  };

  const searchMovie = async (fictionName: string) => {
    if (fictionName == "") {
      setResults([]);
      return;
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

  const setQueryCustom = async (res: Fiction) => {
    setQuery(res.title);
    setSelected(true);
    setSelectedFiction(res.id);
    setResults([res]);
    const result = await TMDBService.getDetails(res.id, mediaType);
    const number_of_seasons = result.number_of_seasons;
    console.log(result);

    const seasons: TVSeason[] = result.seasons?.map((tv: any) => ({
      title: tv.name,
      id: tv.id,
      number: 1,
      episodes: tv.episode_count,
    }));

    setSeasons({
      number_of_seasons: number_of_seasons,
      seasons: seasons,
    });
    console.log(seasons);
  };

  useEffect(() => {
    if (selectedSeason) {
      const a = getEp(selectedSeason);
      console.log(a);
    }
  }, [selectedSeason]);

  const _setSelectedSeason = (season_number: number) => {
    console.log(season_number);
  };

  return (
    <>
      <input
        type="input"
        value={query}
        disabled={selected}
        onChange={(e) => setQuery(e.target.value)}
        className="form-control"
        id="exampleFormControlInput1"
        placeholder={fictionPlaceholderType}
      />

      {results.length > 0 && (
        <div
          className="card"
          style={{
            marginTop: "15px",
          }}
        >
          {results.map((result: Fiction) => (
            <div
              key={result.id}
              className="row selected-title"
              style={{
                borderBottom: "1px solid lightgray",
                margin: "0px",
                paddingLeft: "0px",
              }}
              onClick={() => setQueryCustom(result)}
            >
              <div className="col-2">
                {result.img && (
                  <img
                    src={"https://image.tmdb.org/t/p/w500/" + result.img}
                    className="img-fluid"
                    style={{
                      objectFit: "cover",
                      height: "100%",
                    }}
                  />
                )}
              </div>
              <div className="col-9">
                <h6 className="fiction-title">{result.title}</h6>
                <p className="fiction-desc">{result.overview}</p>
              </div>
              {selected && (
                <div className="col-1" style={{ paddingTop: "3px" }}>
                  <i
                    className="bi bi-x-circle-fill"
                    style={{
                      color: "lightgrey",
                    }}
                    onClick={() => setClose(!close)}
                  ></i>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {MediaType[mediaType] == "tv" && selected && (
        <>
          <br />
          <label> Seasson </label>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setSelectedSeason(e.target.value as any)}
          >
            {seasons?.seasons &&
              seasons?.seasons.map((season, i) => (
                <option key={i + 1} value={i + 1}>
                  {season.title}
                </option>
              ))}
          </select>
          <br></br>
          <label> Episode </label>
          <select className="form-select" aria-label="Default select example">
            {seasons?.seasons &&
              Array.from(
                { length: seasons?.seasons[selectedSeason].episodes || 19 },
                (_, index) => (
                  <option key={index} value={index}>
                    {index + 1}
                  </option>
                )
              )}
          </select>
          <br></br>
        </>
      )}
    </>
  );
};
