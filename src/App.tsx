import React, { FunctionComponent } from "react";

import { AppProvider } from "contexts/AppContext";
import { CountryProvider } from "contexts/CountryContext";
import { RouterProvider } from "routing/RouterProvider";
import { ThemeProvider } from "theme/ThemeProvider";

const App: FunctionComponent = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        {/*  TODO: ogarnąć data, Chyba najlepiej wewnątrz country providera to zrobić */}
        <CountryProvider data={{}}>
          <RouterProvider />
        </CountryProvider>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
