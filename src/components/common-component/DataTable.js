import * as React from "react";
import { size } from "lodash";
import { Eye, UserPlus, Edit, Delete } from "react-feather";
import AppContext from "../../app-context/AppContext";

const DataTable = ({
  tableHeader,
  tableData,
  actionBtnTypes,
  dataTableBtnProps,
}) => {
  const [limit, setLimit] = React.useState(2);

  const displayNumberOfProductsHandler = (event) => {
    setLimit(Number(event.target.value));
  };
  const appContext = React.useContext(AppContext);
  const { modalProps, setModalProps } = appContext;

  return (
    <div className="container data-table">
      <div className="row bg-backround-body">
        <div className="col-md-12 mb-3">
          {dataTableBtnProps && dataTableBtnProps}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="search-bar text-right mb-5">
            <div className="select-data-limit-section">
              <p className="me-2">Display </p>
              <div>
                <select
                  class="form-select"
                  onChange={displayNumberOfProductsHandler}
                >
                  <option selected>Select</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </div>
              <p className="ms-2"> products</p>
              {/* <p className="ms-2">
                {size(tableData)} items of {size(tableData)} found!
              </p> */}
            </div>
            <input type="text" className="search-bar" placeholder="Search" />
          </div>
          <table class="table">
            <thead>
              <tr>
                {size(tableHeader)
                  ? tableHeader?.map((item) => {
                      return <th scope="col">{Object.entries(item)[0][1]}</th>;
                    })
                  : ""}
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {size(tableData)
                ? tableData?.slice(0, limit)?.map((data, index) => {
                    return (
                      <tr>
                        {size(tableHeader)
                          ? tableHeader?.map((item) => {
                              // added badge when table header indicates the status
                              if (
                                Object.entries(item)[0][0] === "status" &&
                                data[Object.entries(item)[0][0]] === "active"
                              ) {
                                return (
                                  <td>
                                    <span className="badge rounded-pill text-bg-success">
                                      {data[
                                        Object.entries(item)[0][0]
                                      ]?.toUpperCase()}
                                    </span>
                                  </td>
                                );
                              }

                              if (
                                Object.entries(item)[0][0] === "status" &&
                                data[Object.entries(item)[0][0]] !== "active"
                              ) {
                                return (
                                  <td>
                                    <span className="badge rounded-pill text-bg-danger">
                                      {data[
                                        Object.entries(item)[0][0]
                                      ]?.toUpperCase()}
                                    </span>
                                  </td>
                                );
                              }

                              if (Object.entries(item)[0][0] === "product") {
                                return (
                                  <td>
                                    <span className="badge rounded-pill text-bg-danger">
                                      {data[
                                        Object.entries(item)[0][0]
                                      ]?.toUpperCase()}
                                    </span>
                                  </td>
                                );
                              }

                              return (
                                <td>{data[Object.entries(item)[0][0]]}</td>
                              );
                            })
                          : ""}
                        <td>
                          {actionBtnTypes?.includes("user-details") && (
                            <>
                              <button
                                key={index}
                                className="details-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#user-details"
                                data-bs-whatever="@mdo"
                                onClick={() =>
                                  setModalProps({ userId: data?.ID })
                                }
                              >
                                <Eye />
                              </button>
                              <button
                                className="details-btn"
                                onClick={() =>
                                  setModalProps({ userId: data?.ID })
                                }
                              >
                                <Edit />
                              </button>
                              <button
                                className="details-btn"
                                onClick={() =>
                                  setModalProps({ userId: data?.ID })
                                }
                              >
                                <Delete style={{ color: "red" }} />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
