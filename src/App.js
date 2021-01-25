import Header from './components/common/Header';
import { Route, Switch, Redirect } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import FormsPage from './components/forms/FormsPage';
import SeniorsPage from "./components/seniors/SeniorsPage";
import ManageFormPage from "./components/forms/ManageFormPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageSeniorPage from './components/seniors/ManageSeniorPage';
import BillsPage from './components/bills/BillsPage';
import ManageBillPage from './components/bills/ManageBillPage';
import SummaryContainer from './components/summary/SummaryContainer';
import Home from './Home';
import LoggingContainer from './components/logging/LoggingContainer';
import currentUser from './components/common/Helper';

function App() {

  return (
    <div className="container-fluid">
      {currentUser()
        ? <>
          <Header />
          <Switch>
            <Route path="/" exact component={FormsPage} />
            <Route path="/forms" component={FormsPage} />
            <Route path="/form/:id" component={ManageFormPage} />
            <Route path="/form" component={ManageFormPage} />
            <Route path="/seniors" component={SeniorsPage} />
            <Route path="/senior/:id" component={ManageSeniorPage} />
            <Route path="/senior" component={ManageSeniorPage} />
            <Route path="/bills" component={BillsPage} />
            <Route path="/bill/:id" component={ManageBillPage} />
            <Route path="/bill" component={ManageBillPage} />
            <Route path="/summary" component={SummaryContainer} />
            <Route component={PageNotFound} />
          </Switch>
        </>
        : <>
          <Route path="/" component={LoggingContainer} />
        </>}
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
