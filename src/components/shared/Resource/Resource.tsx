import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  arta,
  dark,
  docco,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import Endpoint, { EndpointProps } from "../Endpoint/Endpoint";
import Parameter, { ParameterProps } from "../Endpoint/Parameter";

interface ResourceProps {
  endpoints: EndpointProps["endpoint"][];
  parameters: ParameterProps["parameter"][];
  sectionTitle: string;
  titleApi: string;
  descriptionApi: string;
  idType: string;
}
const codigo = `{
  "data": {
    "resource": "Millenium",
    "type": "book"
  },
  "status": 200,
  "statusText": "OK"
}
`;

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#161b24",
  borderBottom: "1px solid #ddd",
  borderRadius: "20px 20px 0px 0px",
  height: "40px",
  color: "white",
  fontSize: "10px",
  padding: "25px",
};

const codeContainerStyle: React.CSSProperties = {
  position: "relative",
  fontSize: "15px",
  padding: "15px",
};

const Resource: React.FC<ResourceProps> = ({
  endpoints,
  parameters,
  sectionTitle,
  titleApi,
  descriptionApi,
  idType,
}: any) => {
  return (
    <div className="container-api">
      <h1 className="section-title">{sectionTitle}</h1>
      <br />
      <br />
      <h3 className="title-api">{titleApi}</h3>
      <div className="desc-api">
        <p>{descriptionApi}</p>
      </div>
      <br />
      {parameters.map((parameter: ParameterProps["parameter"]) => (
        <Parameter key={parameter.name} parameter={parameter} />
      ))}

      <div style={{ borderBottom: "1px solid #252527" }} />
      <br></br>
      {endpoints.map((endpoint: EndpointProps["endpoint"]) => (
        <Endpoint key={endpoint.title} endpoint={endpoint}></Endpoint>
      ))}
      <div className="row">
        <div className="col">
          {endpoints
            .filter(
              (endpoint: EndpointProps["endpoint"]) =>
                endpoint.optionalParameters
            )
            .map((endpoint: EndpointProps["endpoint"]) => (
              <Endpoint key={endpoint.title} endpoint={endpoint}></Endpoint>
            ))}
        </div>
        <div className="col">
          <div style={codeContainerStyle}>
            <div style={headerStyle}>
              <span>{"response"}</span>
              <button style={{ fontSize: "10px", padding: "15px" }}>
                {" "}
                {"Copiar código"}
              </button>
            </div>
            <SyntaxHighlighter
              language={"typescript"}
              style={dark}
              customStyle={{
                margin: 0,
                padding: "20px",
                backgroundColor: "rgb(22 28 36 / 35%)",
                borderRadius: "0px 0px 20px 20px",
              }}
            >
              {codigo}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resource;
