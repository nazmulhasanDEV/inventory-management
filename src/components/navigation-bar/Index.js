import Header from "./Topbar";
import SideBar from "./SideBar";
import Dashboard from "../dashboard/Index";

const NavigationBar = () => {
  return (
    <>
      <div className="d-flex">
        <div className="sidenav">
          <SideBar />
          {/* <Dashboard /> */}
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
