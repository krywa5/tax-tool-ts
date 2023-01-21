import React, { FunctionComponent } from "react";
import { AppTemplate } from "components/app-template/AppTemplate";
import { AppContext } from "contexts/AppContext";

const App: FunctionComponent = () => {
  return (
    <AppContext>
      <AppTemplate>hi</AppTemplate>
    </AppContext>
  );
};

export default App;
