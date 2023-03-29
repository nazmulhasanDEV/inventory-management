import Header from "./Header";
import SideBar from "./SideBar";

const NavigationBar = () => {
  return (
    <>
      <div className="d-flex">
        <div className="sidenav">
          <SideBar />
        </div>

        {/* <div className="top-navbar">
          <Header />
        </div> */}
      </div>
    </>
  );
};

export default NavigationBar;
