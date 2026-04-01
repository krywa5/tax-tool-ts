import React, { FunctionComponent } from "react";
import { HashRouter } from "react-router-dom";

import { AppProvider } from "contexts/AppContext";
import { ToastProvider } from "infrastructure/services/ToastProvider";
import { RouterProvider } from "routing/RouterProvider";
import { ThemeProvider } from "theme/ThemeProvider";

const App: FunctionComponent = () => {
  return (
    <HashRouter>
      <ThemeProvider>
        <ToastProvider />
        <AppProvider>
          <RouterProvider />
        </AppProvider>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
