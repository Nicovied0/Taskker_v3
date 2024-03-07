import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home/Home";
import CalendarDay from "./pages/CalendarDay/CalendarDay";
import AuthGuard from "./core/guards/Auth.guard";


import "@ionic/react/css/core.css";

import "@mobiscroll/react/dist/css/mobiscroll.min.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Profile from "./pages/Profile/Profile";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" render={() => <AuthGuard component={Home} isAuthenticated={false} authenticationPath={"/auth"} />} />
        <Route exact path="/home/day" render={() => <AuthGuard component={CalendarDay} isAuthenticated={false} authenticationPath={"/auth"} />} />
        <Route exact path="/profile" render={() => <AuthGuard component={Profile} isAuthenticated={false} authenticationPath={"/auth"} />} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/" component={Landing} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;