import Header from './components/Header/Header';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import RiderDetails from './components/RiderDetails/RiderDetails';
import { createContext, useState } from 'react';
import Login from './components/Login/Login';
import Destination from './components/Destination/Destination';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';


export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  console.log('data is ', loggedInUser);
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {/* name : {loggedInUser.email} */}
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <PrivateRoute path="/riderDetails/:id">
            <Destination />
          </PrivateRoute>

          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/destination">
            <Destination />
          </PrivateRoute>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
