import { BrowserRouter, Route } from "react-router-dom";
import Home from "./views/Home";

const App = () => {
  return (
    <div className="bs-campaigns-app">
      <BrowserRouter>
        <Route
          exact={true}
          path={"/bs-campaigns"}
          component={Home}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;