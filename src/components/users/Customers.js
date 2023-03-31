import React, { useEffect, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { size } from "lodash";
import { UserPlus } from "react-feather";
import DataTable from "../common-component/DataTable";
import AppModal from "../common-component/AppModal";
import avatar from "../../assets/images/avatar.webp";
import AppContext from "../../app-context/AppContext";
import { uniqueId } from "lodash";
import { showToastMessage } from "../common-component/utils/toastMessage";
import { customerList } from "../common-component/utils/dummyData";
import { cutomersTableHeader } from "../common-component/utils/tableHeaders";

const CustomerList = () => {
  const [currentUserDetails, setCurrentUserDetails] = useState({});
  const [newCustomerInfo, setNewCustomerInfo] = useState({
    ID: "",
    name: "",
    email: "",
    phone: "",
    location: "",
    status: "",
  });

  console.log(newCustomerInfo);
  const appContext = useContext(AppContext);
  const { modalProps, setModalProps } = appContext;

  const modalCloseBtn = document.getElementById("close-add-new-user-btn");

  const [tableData, setTableData] = useState(customerList);

  const addNewCustomerOnChangeHandler = (event) => {
    setNewCustomerInfo({
      ...newCustomerInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddNewUser = () => {
    if (
      newCustomerInfo?.email &&
      newCustomerInfo?.location &&
      newCustomerInfo?.status &&
      newCustomerInfo?.phone &&
      newCustomerInfo?.name
    ) {
      if (
        size(tableData?.filter((item) => item?.email === newCustomerInfo.email))
      ) {
        showToastMessage("warning", "User already exists with this email");
      } else {
        setTableData([
          {
            ...newCustomerInfo,
            ID: uniqueId(),
            total_order: 0,
            total_purchased: "$0",
            canceled: 0,
            avatar: "https://i.pravatar.cc/150?img=68",
          },
          ...tableData,
        ]);
        // setNewCustomerInfo({});
        modalCloseBtn?.click();
        showToastMessage("success", "New user has been added successfully");
      }
    } else {
      showToastMessage("warning", "Something went wrong");
    }
  };

  useEffect(() => {
    setCurrentUserDetails({
      ...tableData?.find((item) => item?.ID === modalProps?.userId),
    });
  }, [modalProps]);

  const AddNewCustomerBtn = () => {
    return (
      <>
        <button
          // key={index}
          className="btn-bg-success btn-180 "
          data-bs-toggle="modal"
          data-bs-target="#add-new-user"
          data-bs-whatever="@mdo"
          // onClick={() => setModalProps({ userId: data?.ID })}
        >
          <UserPlus /> Add new customer
        </button>
      </>
    );
  };

  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
              Customers
            </li>
          </ol>
        </nav>
      </div>
      <DataTable
        tableHeader={cutomersTableHeader}
        tableData={tableData}
        actionBtnTypes={["user-details"]}
        dataTableBtnProps={<AddNewCustomerBtn />}
      />
      <AppModal id="user-details">
        <div class="modal-dialog user-details-card modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              {/* <h1 class="modal-title fs-5" id="exampleModalLabel">
              User
            </h1> */}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="card">
                <div class="text-center">
                  <img
                    src={currentUserDetails?.avatar || avatar}
                    className="card-img-top avatar"
                    alt="..."
                  />
                </div>
                <ul className="list-group list-group-flush text-center">
                  <h4 class="list-group-item">{currentUserDetails?.name}</h4>
                  <p style={{ marginTop: "-10px" }}>Member since 2015</p>
                  <h6 class="list-group-item">
                    <strong>Email: </strong>
                    {currentUserDetails?.email}
                  </h6>
                  <h6 class="list-group-item mb-5">
                    <strong>Phone: </strong> {currentUserDetails?.phone}
                  </h6>
                </ul>

                <div class="card-body">
                  <div className="row">
                    <div className="col-6">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          <b>Status: </b>
                          <span
                            className={`badge rounded-pill text-bg-${
                              currentUserDetails.status !== "active"
                                ? "warning"
                                : "success"
                            }`}
                          >
                            {currentUserDetails.status?.toUpperCase()}
                          </span>
                        </li>
                        <li class="list-group-item">
                          <b>Location: </b>
                          {currentUserDetails?.location}
                        </li>
                        <li class="list-group-item">
                          <b>Last order: </b> March 20, 2023
                        </li>
                      </ul>
                    </div>

                    <div className="col-6">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          <b>Orders: </b> {currentUserDetails?.total_order}
                        </li>
                        <li class="list-group-item">
                          <b>Canceled: </b> {currentUserDetails?.canceled}
                        </li>
                        <li class="list-group-item">
                          <b>Purchased: </b>
                          {currentUserDetails?.total_purchased}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* <div class="card-body">
                <a href="#" class="card-link">
                  Card link
                </a>
                <a href="#" class="card-link">
                  Another link
                </a>
              </div> */}
              </div>
            </div>
            {/* <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Send message
            </button>
          </div> */}
          </div>
        </div>
      </AppModal>

      {/* app modal for adding new user/admin */}
      <AppModal id="add-new-user">
        <div class="modal-dialog user-details-card">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add new customer
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    id="recipient-name"
                    onChange={addNewCustomerOnChangeHandler}
                    value={newCustomerInfo?.name}
                    placeholder="Name..."
                  />
                </div>

                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    id="recipient-name"
                    onChange={addNewCustomerOnChangeHandler}
                    value={newCustomerInfo?.email}
                    placeholder="Email..."
                  />
                </div>

                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Phone*
                  </label>
                  <input
                    type="text"
                    name="phone"
                    class="form-control"
                    id="recipient-name"
                    onChange={addNewCustomerOnChangeHandler}
                    value={newCustomerInfo?.phone}
                    placeholder="Phone..."
                  />
                </div>

                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Address/Location*
                  </label>
                  <textarea
                    class="form-control"
                    id="message-text"
                    placeholder="Address..."
                    name="location"
                    onChange={addNewCustomerOnChangeHandler}
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Satus*
                  </label>
                  <select
                    class="form-select"
                    name="status"
                    aria-label="Default select example"
                    onChange={addNewCustomerOnChangeHandler}
                  >
                    <option selected>Specify status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                id="close-add-new-user-btn"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-success"
                onClick={() => handleAddNewUser()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </AppModal>
    </div>
  );
};

export default CustomerList;
