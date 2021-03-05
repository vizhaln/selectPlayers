import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/home';
import Selected from './components/selected';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/selected" component={Selected} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
