import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./component/Home";
import "./App.css";
import Error from "./component/Error";
import Sign from "./component/Sign";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/users/sign" element={<Sign />} />
          <Route path="*" exact={true} element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
