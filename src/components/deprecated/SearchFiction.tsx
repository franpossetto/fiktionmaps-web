import { useContext, useEffect, useState } from "react";
import TMDBService from "../../services/TMDBService";
import "./SearchFiction.css";
import { MediaType } from "../../types/MediaType";
import { Fiction } from "../../types/Fiction";
import { Season, TVSeason } from "../../types/Season";
import { FictionDTO } from "../../types/dto/FictionDTO";
import FictionContext from "../../contexts/FictionContext";
import { FictionProvider } from "../../types/providers/FictionProvider";

export const SearchFiction = ({ mediaType, setFiction }: any) => {
  const formData = useContext(FictionContext);

  const [fictions, setFictions] = useState<Fiction[]>([]); // result list
  const [episodes, setEpisodes] = useState<any[]>([]); // result list

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<boolean>(false);
  const [close, setClose] = useState<boolean>(false);

  const [seasons, setSeasons] = useState<Season>();

  const [selectedFiction, setSelectedFiction] = useState<Fiction | undefined>(
    undefined
  );
  const [selectedSeason, setSelectedSeason] = useState<number>(0);
  const [selectedEpisode, setselectedEpisode] = useState<number>(1);

  const [fictionPlaceholderType, setFictionPlaceholderType] =
    useState("Movie Name");

  useEffect(() => {
    if (MediaType[mediaType] == "MOVIE") {
      setFictionPlaceholderType("Movie Name");
    }
    if (MediaType[mediaType] == "TV") {
      setFictionPlaceholderType("TV Show Name");
    }
    if (MediaType[mediaType] == "BOOK") {
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
    setSelectedFiction(undefined);
  }, [close, mediaType]);

  const searchMovie = async (fictionName: string) => {
    if (fictionName == "") {
      setFictions([]);
      return;
    } else {
      try {
        const res = await TMDBService.search(fictionName, mediaType);
        const fiction: Fiction[] = res.results.map((fiction: any) => ({
          title: fiction.title || fiction.name,
          id: fiction.id,
          img: fiction.poster_path,
          overview:
            fiction.overview.length > 30
              ? fiction.overview.slice(0, 120) + "..."
              : fiction.overview,
          provider: FictionProvider.TMDB,
          episode: null,
          type: mediaType,
        }));
        setFictions(fiction);
      } catch (err) {
        console.log("err");
      }
    }
  };

  const setQueryCustom = async (res: Fiction) => {
    setQuery(res.title);
    setSelected(true);
    setSelectedFiction(res);
    setFictions([res]);
    const result = await TMDBService.getDetails(res.id, mediaType);
    const number_of_seasons = result.number_of_seasons;

    const tvSeasons: TVSeason[] =
      result.seasons?.map((tv: any) => ({
        title: tv.name,
        id: tv.id,
        number: 1,
        episodes: tv.episode_count,
      })) ??
      (result.seasons && result.seasons.length > 0
        ? [
            {
              title: result.seasons[0].name,
              id: result.seasons[0].id,
              number: 1,
              episodes: result.seasons[0].episode_count,
            },
          ]
        : []);

    setSeasons({
      number_of_seasons: number_of_seasons,
      seasons: tvSeasons,
    });

    if (mediaType == MediaType.TV) {
      const episodes = await TMDBService.getAllEpisodes(
        res.id,
        selectedSeason,
        tvSeasons[selectedSeason].episodes || 0
      );
      setEpisodes(episodes);
    }
  };

  useEffect(() => {
    if (selectedSeason) {
      TMDBService.getAllEpisodes(
        selectedFiction?.id || 0,
        selectedSeason,
        seasons?.seasons[selectedSeason].episodes || 1
      )
        .then((episodes: any[]) => {
          setEpisodes(episodes);
        })
        .catch((error) => {
          // manejar el error
        });
    }
  }, [selectedSeason]);

  useEffect(() => {
    console.log(selectedFiction);
    const fictionDTO: FictionDTO = {
      name: selectedFiction?.title || "",
      type: selectedFiction?.type || MediaType.MOVIE,
      provider: selectedFiction?.provider || FictionProvider.TMDB,
    };

    if (selectedFiction?.type == MediaType.TV) {
      fictionDTO.episode = selectedFiction.episode;
    }
    console.log(selectedFiction);
    setFiction({ ...formData, fiction: fictionDTO });
  }, [selectedFiction]);

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

      {fictions.length > 0 && (
        <div
          className="card"
          style={{
            marginTop: "15px",
          }}
        >
          {fictions.map((result: Fiction) => (
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
      {MediaType[mediaType] == "TV" && selected && (
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
                <option key={i} value={i}>
                  {season.title}
                </option>
              ))}
          </select>
          <br></br>
          <label> Episode </label>
          <select className="form-select" aria-label="Default select example">
            {episodes.map((episode: any, index: number) => (
              <option key={index} value={episode.id}>
                {episode.display_name}
              </option>
            ))}
          </select>
          <br></br>
        </>
      )}
    </>
  );
};
