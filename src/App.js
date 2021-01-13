import Header from './components/common/Header';
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import FormsPage from './components/forms/FormsPage';
import SeniorsPage from "./components/seniors/SeniorsPage";
import ManageFormPage from "./components/forms/ManageFormPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageSeniorPage from './components/seniors/ManageSeniorPage';

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route path="/forms" component={FormsPage} exact />
        <Route path="/form/:id" component={ManageFormPage} />
        <Route path="/form" component={ManageFormPage} />
        <Route path="/seniors" component={SeniorsPage} />
        <Route path="/senior/:id" component={ManageSeniorPage} />
        <Route path="/senior" component={ManageSeniorPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
