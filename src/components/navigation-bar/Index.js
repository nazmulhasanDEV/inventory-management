import { useProSidebar } from "react-pro-sidebar";
import NavbarContext from "./context/NavbarContext";
import Topbar from "./Topbar";
import SideBar from "./SideBar";
import { useLocation } from "react-router-dom";

const NavigationBar = ({ children }) => {
  const location = useLocation();
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

  return (
    <NavbarContext.Provider
      value={{ collapseSidebar, toggleSidebar, collapsed, toggled, broken }}
    >
      <div style={{ display: "flex", height: "100%" }}>
        {!location?.pathname?.includes("/login") && <SideBar />}

        <div style={{ position: "relative" }}>
          {!location?.pathname?.includes("/login") && <Topbar />}
          <div className="container content-section">{children}</div>
        </div>
      </div>
    </NavbarContext.Provider>
  );
};

export default NavigationBar;
