import { Link } from "react-router-dom";
import "./SideBar.css";

const items = [
  { title: "Introduction", path: "/api/docs/introduction" },
  { title: "Quickstart", path: "/api/docs/quickstart" },
  { title: "Authentication", path: "/api/docs/authentication" },
  { title: "Pagination", path: "/api/docs/pagination" },
  { title: "Error", path: "/api/docs/error" },
  { title: "Webhooks", path: "/api/docs/webhooks" },
];

const resources = [
  { title: "Fictions", path: "/api/docs/fictions" },
  { title: "Cities", path: "/api/docs/cities" },
];

interface MyComponentProps {
  isCollap: boolean;
}
export const SideBar: React.FC<MyComponentProps> = ({ isCollap }) => {
  return (
    <div className={`col-2 side-bar${isCollap ? " collapsed" : ""}`}>
      <div className="logo-container">
        <img src="../../src/assets/fm_h.png" className="logo" alt="logo" />
        <img
          src="../../src/assets/fm_h.png"
          className="small-logo"
          alt="logo"
        />
      </div>

      <br />
      <br />
      <ul className="item-list">
        <li className="section-title">Guide</li>
        {items.map((item, index) => (
          <li key={index}>
            <Link to={item.path} className="item-list">
              {item.title}
            </Link>
          </li>
        ))}
        <br />
        <li className="section-title">Resources</li>
        {resources.map((resource, index) => (
          <li key={index}>
            <Link to={resource.path} className="item-list">
              {resource.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
