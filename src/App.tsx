import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="/auth">
          <Route path="/auth/:variant" element={<AuthPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
