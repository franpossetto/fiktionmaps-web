import React from "react";
import "../APIDocs.css";

const Quickstart = () => {
  return (
    <div className="container-api">
      <h1 className="section-title">Quickstart</h1>
      <br />
      <br />
      <h3 className="title-api">Getting an API Key</h3>
      <div className="desc-api">
        <p>
          To use the FiktionMaps API, developers must first obtain an API key.
          This can be done by creating an account and generating the API key
          from the account dashboard. The API key is used to authenticate API
          requests, and it's essential to keep it secure.
        </p>
      </div>
      <br />
      <h3 className="title-api">Making API Requests</h3>
      <div className="desc-api">
        <p>
          Once you have obtained an API key, you can start making requests to
          the FiktionMaps API. The API documentation provides details on the
          available endpoints and how to format your API requests. You can
          retrieve data on locations featured in specific books, TV shows, or
          movies by specifying the relevant parameters in your API requests.
        </p>
      </div>
      <br />
      <h3 className="title-api">Next Steps</h3>
      <div className="desc-api">
        <p>
          Congratulations! You've successfully completed the Quickstart guide
          for the FiktionMaps API. Now that you have a basic understanding of
          how the API works, you can explore the API documentation and start
          building your own applications that integrate with the FiktionMaps
          API.
        </p>
      </div>
    </div>
  );
};

export default Quickstart;
