import "./Background.css";
import Stars from "./Stars";

function Background() {
  return (
    <div classame="background-container">
      <div className="starfield-A">
        <Stars />
      </div>
      <div className="starfield-B">
        <Stars />
      </div>
    </div>
  );
}
export default Background;
