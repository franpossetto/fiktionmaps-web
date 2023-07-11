import Resource from "../../../components/shared/Resource/Resource";
import "../APIDocs.css";

const endpoints = [
  {
    verb: "GET",
    url: "api/v1/fictions",
    title: "List all Fictions",
    description: "Unique identifier for the fiction.",
    color: "green",
  },
  {
    verb: "POST",
    url: "api/v1/fictions",
    title: "Create a Fiction",
    description: "Unique identifier for the fiction.",
    color: "blue",
  },
  {
    verb: "DELETE",
    url: "api/v1/fiction/:id",
    title: "Delete a Fiction",
    description: "Unique identifier for the fiction.",
    color: "red",
  },
  {
    verb: "PUT",
    url: "api/v1/fiction/:id",
    title: "Modify a Fiction",
    description: "Unique identifier for the fiction.",
    color: "yellow",
    optionalParameters: [
      {
        name: "limit",
        type: "integer",
        description: "Unique identifier for the fiction.",
      },
    ],
  },
];

const parameters = [
  {
    name: "id",
    type: "string",
    description: "unique identifier",
  },
  {
    name: "name",
    type: "string",
    description: "name of the fiction",
  },
  {
    name: "scene",
    type: "Scene",
    description:
      "stores information about the scene such us description, segment and location",
  },
];

const Fictions = () => {
  return (
    <div className="container-api">
      <Resource
        sectionTitle="Fictions"
        titleApi="What is a Fiction?"
        descriptionApi='A "Fiction" represents a work of Fiction, which can fall into one of three categories: TV show, movie, or book. Depending on the types of fiction included in the API, there may be separate resources created for each type (i.e. TV_SHOW, MOVIE, BOOK).'
        idType="string"
        parameters={parameters}
        endpoints={endpoints}
      />
    </div>
  );
};

export default Fictions;
