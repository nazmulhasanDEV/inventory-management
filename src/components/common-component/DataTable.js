import * as React from "react";
import { size } from "lodash";
import { Eye, UserPlus } from "react-feather";
import AppContext from "../../app-context/AppContext";

const DataTable = ({
  tableHeader,
  tableData,
  actionBtnTypes,
  dataTableBtnProps,
}) => {
  console.log();
  const appContext = React.useContext(AppContext);
  const { modalProps, setModalProps } = appContext;

  return (
    <div className="container data-table">
      <div className="row">
        <div className="col-md-12">
          <div className="search-bar text-right mb-2">
            {dataTableBtnProps && dataTableBtnProps}
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
                ? tableData?.map((data, index) => {
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

                              return (
                                <td>{data[Object.entries(item)[0][0]]}</td>
                              );
                            })
                          : ""}
                        <td>
                          {actionBtnTypes?.includes("user-details") && (
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
