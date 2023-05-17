import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";

function App() {


  return (

    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default App;
