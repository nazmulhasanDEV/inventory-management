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
  //   useEffect(() => {
  //     fetch("https://dummyjson.com/users")
  //       .then((res) => res.json())
  //       .then(console.log);
  //   }, []);

  const [currentUserDetails, setCurrentUserDetails] = useState({});
  const [newUserInfo, setNewUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    is_admin: "",
    is_staff: "",
  });
  const appContext = useContext(AppContext);
  const { modalProps, setModalProps } = appContext;

  const modalCloseBtn = document.getElementById("close-add-new-user-btn");

  const [tableData, setTableData] = useState(customerList);

  const addNewUserOnChangeHandler = (event) => {
    if (event.target.name !== "is_admin") {
      setNewUserInfo({
        ...newUserInfo,
        [event.target.name]: event.target.value,
      });
    } else {
      if (event.target.value === "admin") {
        setNewUserInfo({ ...newUserInfo, is_admin: "Yes", is_staff: "No" });
      } else {
        setNewUserInfo({ ...newUserInfo, is_staff: "Yes", is_admin: "No" });
      }
    }
  };

  const handleAddNewUser = () => {
    if (
      newUserInfo?.email &&
      newUserInfo?.is_admin &&
      newUserInfo?.is_staff &&
      newUserInfo?.phone &&
      newUserInfo?.name
    ) {
      if (
        size(tableData?.filter((item) => item?.email === newUserInfo.email))
      ) {
        showToastMessage("warning", "User already exists with this email");
      } else {
        setTableData([
          {
            ...newUserInfo,
            ID: uniqueId(),
            avatar: "https://i.pravatar.cc/150?img=68",
          },
          ...tableData,
        ]);
        setNewUserInfo({});
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
        <div class="modal-dialog user-details-card">
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

                {/* <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div> */}
                <ul className="list-group list-group-flush text-center">
                  <h4 class="list-group-item">{currentUserDetails?.name}</h4>
                  <p>Admin</p>
                  <h6 class="list-group-item">
                    <strong>Email: </strong>
                    {currentUserDetails?.email}
                  </h6>
                  <h6 class="list-group-item mb-5">
                    <strong>Phone: </strong> {currentUserDetails?.phone}
                  </h6>
                </ul>
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
                Add new user
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
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    id="recipient-name"
                    onChange={addNewUserOnChangeHandler}
                    value={newUserInfo?.name}
                  />
                </div>

                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    id="recipient-name"
                    onChange={addNewUserOnChangeHandler}
                    value={newUserInfo?.email}
                  />
                </div>

                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    class="form-control"
                    id="recipient-name"
                    onChange={addNewUserOnChangeHandler}
                    value={newUserInfo?.phone}
                  />
                </div>

                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Role
                  </label>
                  <select
                    class="form-select"
                    name="is_admin"
                    aria-label="Default select example"
                    onChange={addNewUserOnChangeHandler}
                  >
                    <option selected>Specify role</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
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
