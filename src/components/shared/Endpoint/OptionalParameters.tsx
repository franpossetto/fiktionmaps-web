const OptionalParameters = ({ parameters }: any) => {
  return (
    <>
      <h6 className="section-title">Optional Parameters</h6>
      {parameters.map((parameter: any) => (
        <div key={parameter.name}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="prop-api">{parameter.name}</div>
            <div>
              <span className="api-type">{parameter.type}</span>
            </div>
          </div>
          <p className="desc-api">{parameter.description}</p>
        </div>
      ))}
    </>
  );
};

export default OptionalParameters;
