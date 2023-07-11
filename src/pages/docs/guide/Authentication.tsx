import SyntaxHighlighter from "react-syntax-highlighter";
import "../APIDocs.css";
import { arta } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ResponseCode = () => {
  const JsonResponse = {
    data: {
      fiction: "Millenium",
      type: "book",
    },
    status: 200,
    statusText: "OK",
  };
  return JSON.stringify(JsonResponse);
};

const Authentication = () => {
  return (
    <div className="container-api">
      <h1 className="section-title2">Authentication</h1>
      <br />
      <h3 className="title-api">API Key</h3>
      <div className="desc-api">
        <p>
          To use the FiktionMaps API, developers must first obtain an API key.
          This key is used to authenticate API requests and should be kept
          secure. The API key can be obtained by creating an account and
          generating the key from the account dashboard.
        </p>
      </div>
      <br />
      <h3 className="title-api">Using the API Key</h3>
      <div className="desc-api">
        <p>
          To authenticate API requests, developers must include their API key in
          the request header. The key should be included in the "Authorization"
          header as follows:
        </p>

        <SyntaxHighlighter language="typescript" style={arta}>
          {ResponseCode()}
        </SyntaxHighlighter>
        <p>
          Replace "YOUR_API_KEY" with the actual API key obtained from the
          account dashboard.
        </p>
      </div>
      <br />
      <h3 className="title-api">Rate Limiting</h3>
      <div className="desc-api">
        <p>
          The FiktionMaps API has a rate limit for API requests. The free tier
          of the API allows for a limited number of requests per day, while the
          premium tier offers a higher limit. Developers can check their API
          usage and rate limit status from the account dashboard.
        </p>
      </div>
    </div>
  );
};

export default Authentication;
