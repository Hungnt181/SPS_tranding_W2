import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LayoutWebsite from "./component/website/layout";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={LayoutWebsite} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
