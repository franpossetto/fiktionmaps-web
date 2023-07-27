//import "./EndPoint.css";
import OptionalParameters from "./OptionalParameters";

export interface EndpointProps {
  endpoint: {
    verb: string;
    url: string;
    title: string;
    description: string;
    color: string;
    optionalParameters?: {
      name: string;
      type: string;
      description: string;
    }[];
  };
}

const Endpoint: React.FC<EndpointProps> = ({ endpoint }: any) => {
  return (
    <div style={{ marginBottom: "40px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className={`prop-api-color ${endpoint.color}`}>
          {endpoint.verb}
        </div>
        <div>
          <span className="api-url">{endpoint.url}</span>
        </div>
      </div>
      <h5 className="section-title">{endpoint.title}</h5>
      <p className="desc-api">{endpoint.description}</p>
      {endpoint.optionalParameters && (
        <OptionalParameters parameters={endpoint.optionalParameters} />
      )}
    </div>
  );
};
export default Endpoint;
