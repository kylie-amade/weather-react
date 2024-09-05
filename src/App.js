import "./App.css";
import Weather from "./Weather";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Weather defaultCity="New York" />
      <div>
        This project was coded by{" "}
        <a href="https://famous-sprinkles-6ad026.netlify.app/">Kylie Amade</a>{" "}
        view it{" "}
        <a href="https://github.com/kylie-amade/weather-react"> here </a>.
      </div>
    </div>
  );
}

export default App;
