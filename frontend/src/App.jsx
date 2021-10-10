import './App.css';
import './Additional.css';
import {BrowserRouter, Switch} from "react-router-dom";
import routes from './routes';
import PrivateRoute from './pages/privateRoute';

const privateRoutesList = Object.values(routes);

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {privateRoutesList.map((route) =>
          <PrivateRoute key={route.path} exact path={route.path} component={route.component} />,
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
