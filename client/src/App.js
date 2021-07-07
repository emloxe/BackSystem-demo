import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import Index from "./routes/Index/Index";
import NoPage from "./routes/NoPage/NoPage";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/admin">
          <Index />
        </Route>
        <Route path="/">
          <NoPage />
        </Route>
      </Switch>
    </Router>
  );
}
