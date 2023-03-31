import React, { useEffect, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { size } from "lodash";
import { Plus } from "react-feather";
import DataTable from "../common-component/DataTable";
import AppModal from "../common-component/AppModal";
import avatar from "../../assets/images/avatar.webp";
import AppContext from "../../app-context/AppContext";
import { uniqueId } from "lodash";
import { showToastMessage } from "../common-component/utils/toastMessage";
import { productList } from "../common-component/utils/dummyData";
import { productsTableHeader } from "../common-component/utils/tableHeaders";
import { modalCloseById } from "../common-component/utils/appHelper";

const ProductList = () => {
  const [currentProductDetails, setCurrentProductDetails] = useState({});
  const [newProductInfo, setNewProductInfo] = useState({
    ID: "",
    title: "",
    description: "",
    category: "",
    price: "",
    available_in_stock: "",
    img: "",
  });

  console.log(newProductInfo);
  const appContext = useContext(AppContext);
  const { modalProps, setModalProps } = appContext;

  const modalCloseBtn = document.getElementById("close-add-new-user-btn");

  const [tableData, setTableData] = useState(productList);

  console.log(modalProps);
  const addNewProductOnChangeHandler = (event) => {
    setNewProductInfo({
      ...newProductInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddNewProduct = () => {
    if (
      newProductInfo?.title &&
      newProductInfo?.description &&
      newProductInfo?.category &&
      newProductInfo?.price &&
      newProductInfo?.available_in_stock &&
      newProductInfo?.img
    ) {
      setTableData([
        {
          ...newProductInfo,
          ID: uniqueId(),
          stock_status: "In stock",
        },
        ...tableData,
      ]);
      // setNewCustomerInfo({});
      modalCloseBtn?.click();
      showToastMessage("success", "New product added successfully");
    } else {
      showToastMessage("warning", "Something went wrong");
    }
  };

  const deleteProductHandler = () => {
    if (modalProps?.context && modalProps?.context === "delete") {
      setTableData([
        ...tableData?.filter((item) => item?.ID !== modalProps?.productId),
      ]);
    }
    modalCloseById("close-delete-btn");
    showToastMessage("success", "Product has been deleted successfully");
  };

  const AddNewCustomerBtn = () => {
    return (
      <>
        <button
          // key={index}
          className="btn-bg-success btn-180 btn-float-right"
          data-bs-toggle="modal"
          data-bs-target="#add-new-user"
          data-bs-whatever="@mdo"
          // onClick={() => setModalProps({ userId: data?.ID })}
        >
          <Plus /> Add new product
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
              Products
            </li>
          </ol>
        </nav>
      </div>
      <DataTable
        tableHeader={productsTableHeader}
        tableData={tableData}
        actionBtnTypes={["edit", "delete"]}
        dataTableBtnProps={<AddNewCustomerBtn />}
      />

      <AppModal id="delete-item">
        <div class="modal-dialog user-details-card ">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title fs-5" id="exampleModalLabel">
                Are you sure want to delete this item?
              </h6>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                id="close-delete-btn"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => deleteProductHandler()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </AppModal>

      {/* app modal for adding new user/admin */}
      <AppModal id="add-new-user">
        <div class="modal-dialog user-details-card modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add new product
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
                    Title*
                  </label>
                  <input
                    type="text"
                    name="title"
                    class="form-control"
                    id="recipient-name"
                    onChange={addNewProductOnChangeHandler}
                    value={newProductInfo?.title}
                    placeholder="title..."
                  />
                </div>

                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Description*
                  </label>
                  <textarea
                    class="form-control"
                    id="message-text"
                    placeholder="Address..."
                    name="description"
                    onChange={addNewProductOnChangeHandler}
                  >
                    {newProductInfo.description}
                  </textarea>
                </div>

                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Category*
                  </label>
                  <select
                    class="form-select"
                    name="category"
                    aria-label="Default select example"
                    onChange={addNewProductOnChangeHandler}
                  >
                    <option selected>Select category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="mens_shirt">Men's shirt</option>
                    <option value="accessories">Accessories</option>
                    <option value="jewellery">Jewellery</option>
                    <option value="women_cloth">Women cloths</option>
                    <option value="furniture">Furniture</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Price*
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    name="price"
                    class="form-control"
                    id="recipient-name"
                    onChange={addNewProductOnChangeHandler}
                    value={newProductInfo?.price}
                    placeholder="Price..."
                  />
                </div>

                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Available in stock*
                  </label>
                  <input
                    type="number"
                    name="available_in_stock"
                    class="form-control"
                    id="recipient-name"
                    onChange={addNewProductOnChangeHandler}
                    value={newProductInfo?.available_in_stock}
                    placeholder="Available in stock..."
                  />
                </div>

                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Upload product image*(for testing purpose. It would be
                    filed/image field)
                  </label>
                  <input
                    type="url"
                    name="img"
                    class="form-control"
                    id="recipient-name"
                    onChange={addNewProductOnChangeHandler}
                    value={newProductInfo?.img}
                    placeholder="image..."
                  />
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
                onClick={() => handleAddNewProduct()}
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

export default ProductList;
