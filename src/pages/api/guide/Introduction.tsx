import React from "react";
import "../APIDocs.css";

const Introduction = () => {
  return (
    <div className="container-api">
      <h1 className="section-title">Introduction</h1>
      <br />
      <br />
      <h3 className="title-api">API Documentation</h3>
      <div className="desc-api">
        <p>
          Use the FiktionMaps API to retrieve locations featured in books, TV
          shows, and movies and integrate them seamlessly into your own
          applications.
        </p>
      </div>
      <br />
      <h3 className="title-api">Getting Started</h3>
      <div className="desc-api">
        <p>
          To use the FiktionMaps API, developers must first obtain an API key.
          This can be done by creating an account and generating the API key
          from the account dashboard. The API key is used to authenticate API
          requests, and it's essential to keep it secure. Once an API key is
          obtained, developers can use the API documentation to explore the
          available endpoints and make API requests.
        </p>
      </div>
      <br />
      <h3 className="title-api">Tutorials</h3>
      <div className="desc-api">
        <p>
          The Tutorials section provides step-by-step guides that help
          developers get started using the FiktionMaps API. These tutorials
          guide developers through the process of creating an account,
          generating an API key, and making API requests to consume data from
          the API. The tutorials cover a range of topics, from basic API
          requests to more advanced topics such as working with webhooks.
        </p>
      </div>
    </div>
  );
};

export default Introduction;
