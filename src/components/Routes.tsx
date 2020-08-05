import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../screens/Home";
import Room from "../screens/Room";
import AddRoom from "../screens/AddRoom";
import Profile from "../screens/Profile";
import Places from "../screens/Places";
import Auth from "./Auth";
import RoomEdit from "../screens/RoomEdit";
import { IS_LOGGED_IN } from "../queries/globalQueries";
import Question from "../screens/Question";

const PublicRoutes: React.FunctionComponent = () => (
  <Switch>
    <Route path="/" exact={true} component={Home} />
    <Route path="/auth" component={Auth} />
    <Route path="/places" component={Places} />
    <Route path="/question" component={Question} />
    <Route path="/room/:roomId" component={Room} />
    <Redirect from="*" to="/" />
  </Switch>
);

// ! "/room/:roomId/edit"는 "/room/:roomId"보다 위에 있어야 합니다.
const PrivateRoutes: React.FunctionComponent = () => (
  <Switch>
    <Route path="/" exact={true} component={Home} />
    <Route path="/me" component={Profile} />
    <Route path="/places" component={Places} />
    <Route path="/question" component={Question} />
    <Route path="/add/room" component={AddRoom} />
    <Route path="/room/:roomId/edit" exact={true} component={RoomEdit} />
    <Route path="/room/:roomId" component={Room} />
    <Redirect from="*" to="/" />
  </Switch>
);

function Routes() {
  const { data } = useQuery<{ isLoggedIn: boolean }>(IS_LOGGED_IN);
  return <>{!data?.isLoggedIn ? <PublicRoutes /> : <PrivateRoutes />}</>;
}

export default Routes;
