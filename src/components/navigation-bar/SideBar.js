import { useContext } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { X } from "react-feather";
import NavbarContext from "./context/NavbarContext";
import avatar from "../../assets/images/avatar.webp";

const SideBar = () => {
  const navbarContext = useContext(NavbarContext);

  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken } =
    navbarContext;

  return (
    <>
      <div className="sidebar-section">
        <Sidebar
          className="navigation-section"
          backgroundColor="#313a46"
          breakPoint="md"
        >
          {broken ? (
            <button className="close-btn p-3" onClick={() => toggleSidebar()}>
              <X />
            </button>
          ) : (
            ""
          )}

          <div className="admin-profile pt-3 text-white">
            <div className="admin-avatar">
              <img src={avatar} />
            </div>
            <h6 className="text-center pt-2">
              {collapsed ? "Admin" : "Nazmul Hasan - Admin"}
            </h6>
          </div>

          <Menu
            className="mt-5"
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (level === 0)
                  return {
                    color: active ? "white" : "#6f7b8b",
                    backgroundColor: active ? "red" : undefined,
                    "&:hover": {
                      backgroundColor: "#313a46 !important",
                      color: "white !important",
                      // borderRadius: "8px !important",
                      // fontWeight: "bold !important",
                    },
                  };
                if (level === 1)
                  return {
                    color: disabled ? "gray" : "#6F7B8B",
                    backgroundColor: "#313a46 !important",
                    "&:hover": {
                      backgroundColor: "#313a46 !important",
                      color: "white !important",
                      // borderRadius: "8px !important",
                      // fontWeight: "bold !important",
                    },
                  };
              },
            }}
          >
            <MenuItem component={<Link to="/" />}> Dashboard </MenuItem>
            <SubMenu label="Users">
              <MenuItem component={<Link to="/users" />}>User/Admin</MenuItem>
              <MenuItem component={<Link to="/customer-list" />}>
                Customers
              </MenuItem>
            </SubMenu>

            <SubMenu label="Charts">
              <MenuItem> Pie charts </MenuItem>
              <MenuItem> Line charts </MenuItem>
            </SubMenu>

            <MenuItem> Documentation </MenuItem>
            <MenuItem> Calendar </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default SideBar;
