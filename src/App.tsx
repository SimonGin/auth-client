// Libs
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// Pages
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="/auth">
            <Route path="/auth/:variant" element={<AuthPage />} />
          </Route>
        </Route>
      </Routes>
      <Toaster containerStyle={{ zIndex: 99999 }} />
    </>
  );
};

export default App;
