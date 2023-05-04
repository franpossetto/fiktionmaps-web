export interface ParameterProps {
  parameter: ParameterValues;
}

interface ParameterValues {
  name: string;
  type: string;
  description: string;
}
const Parameter: React.FC<ParameterProps> = ({ parameter }: any) => {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="prop-api">{parameter.name}</div>
        <div>
          <span className="type-api">{parameter.type}</span>
        </div>
      </div>
      <p className="desc-api" style={{ padding: 5 }}>
        {parameter.description}
      </p>
    </>
  );
};

export default Parameter;
