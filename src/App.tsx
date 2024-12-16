import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LayoutWebsite from "@views/website/layout";
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
