import React, { FunctionComponent } from "react";
import { RouterProvider } from "routing/RouterProvider";
import { ThemeProvider } from "theme/ThemeProvider";

const App: FunctionComponent = () => {
  return (
    <ThemeProvider>
      <RouterProvider />
    </ThemeProvider>
  );
};

export default App;
