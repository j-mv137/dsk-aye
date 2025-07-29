import { Outlet } from "react-router";
import { Titlebar } from "./components/titlebar/titlebar";
import { Sidebar } from "./components/sidebar/sidebar";

function App(): React.JSX.Element {
  return (
    <>
      <Titlebar />
      <main>
        <Sidebar />
        <div className="mainContainer">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
