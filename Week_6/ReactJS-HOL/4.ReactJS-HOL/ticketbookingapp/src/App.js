import { useState } from "react";
import Login from "./Components/Login";
import Guest from "./Components/Guest";
import User from "./Components/User";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div style={{ margin: "20px" }}>

      <h1>Ticket Booking App</h1>

      {
        isLoggedIn ? (
          <User onLogout={() => setIsLoggedIn(false)} />
        ) : (
          <>
            <Guest />
            <Login onLogin={() => setIsLoggedIn(true)} />
          </>
        )
      }

    </div>
  );
}

export default App;