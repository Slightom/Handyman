import Header from './components/common/Header';
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import FormsPage from './components/forms/FormsPage';
import SeniorsPage from "./components/seniors/SeniorsPage";
import ManageFormPage from "./components/forms/ManageFormPage";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route path="/forms" component={FormsPage} exact />
        <Route path="/seniors" component={SeniorsPage} />
        <Route path="/form/:id" component={ManageFormPage} />
        <Route path="/form" component={ManageFormPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
