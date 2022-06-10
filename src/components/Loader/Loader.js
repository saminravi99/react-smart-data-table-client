import Spinner from "react-bootstrap/Spinner";
import "./Loader.css"

function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center spinner-height">
      <Spinner
        className="d-flex justify-content-center align-items-center"
        animation="border"
        variant="primary"
      />
    </div>
  );
}

export default Loader;
