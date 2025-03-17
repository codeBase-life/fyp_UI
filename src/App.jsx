import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "./components/UserForm";
import Dashboard from "./components/Dashboard";
import Authentication from "./UserAuth/Authentication";
import { AppProvider } from "./Context/AppContext";

import "./App.css";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/user" element={<UserForm />} />
          <Route element={<Authentication />}>
            <Route path="/" element={<Dashboard />} />
          </Route>

          

          {/* protected route - now uses context instead of props */}
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
