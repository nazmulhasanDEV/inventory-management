const AppModal = ({ id, children }) => {
  return (
    <div
      class="modal fade"
      id={id}
      tabindex="1"
      aria-labelledby="exampleModalLabel"
    >
      {children}
    </div>
  );
};

export default AppModal;
