const Header = () => {
  return (
    <>
      <nav
        class="navbar bg-light"
        style={{ width: "100vw", overflow: "hidden" }}
      >
        <div class="container-fluid">
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Header;
