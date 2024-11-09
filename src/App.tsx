// Libs
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// Pages
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
import ProfilePage from "./pages/Profile";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/:auth_variant" element={<AuthPage />} />
      </Routes>
      <Toaster containerStyle={{ zIndex: 99999 }} />
    </>
  );
};

export default App;
