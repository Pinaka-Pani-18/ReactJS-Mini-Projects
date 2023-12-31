import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import RootLayout from "./components/RootLayout.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Store from "./pages/Store.tsx";
import ShoppingContextProvider from "./context/ShoppingContext.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/store" element={<Store />} />
    </Route>
  )
);

const App = () => {
  return (
    <ShoppingContextProvider>
      <RouterProvider router={router} />
    </ShoppingContextProvider>
  );
};

export default App;
