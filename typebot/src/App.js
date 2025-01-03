import Home from "./component/home/home";
import React, {useState} from "react";
import Login from "./component/login/login";
// import ChatBot from "./component/Bot/chatbot";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormDashboard from "./component/dashboard/FormDashboard";

function App() {
  const [showAuth, setShowAuth] = useState(false);

  return  (
    <Router>
      <Routes>
        {/* Default Home Page */}
        <Route 
          path="/" 
          element={
            <div>
              {!showAuth ? (
                <Home onSignInClick={() => setShowAuth(true)} />
              ) : (
                <Login onBack={() => setShowAuth(false)} />
              )}
              {/* <ChatBot /> */}
            </div>
          } 
        />

        {/* Dashboard Page */}
        <Route path="/dashboard" element={<FormDashboard/>} />
      </Routes>
    </Router>
  );

    
  

}

export default App;
