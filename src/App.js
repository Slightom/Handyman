import logo from './logo.svg';
import './App.css';
import Header from './components/common/Header';
import { Route, Switch } from "react-router-dom";
import FormsPage from './components/forms/FormsPage';
import SeniorsPage from "./components/seniors/SeniorsPage";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route path="/forms" component={FormsPage} exact />
        <Route path="/seniors" component={SeniorsPage} />
      </Switch>
    </div>
  );
}

export default App;
