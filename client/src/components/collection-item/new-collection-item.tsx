import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useCreateProduct } from "../../hooks/shopHooks";
import { addItem } from "../../redux/cart/cart.actions";

import CustomButton from "../custom-button/custom-button";
import NewCollectionModal from "../new-collection-modal/new-collection-modal";
import "./collection-item.styles.scss";

const NewCollectionItem = ({ categoryId }) => {
  const [showModal, setModal] = useState(false);
  const { user } = useAuth0();
  const changeModalState = (newState) => () => setModal(newState);

  const [createProductState, createProduct] = useCreateProduct(categoryId);
  const handleCreate = async (formData) => {
    const created = await createProduct(formData);
    if (created) {
      alert("Successfully created product");
      setModal(false);
    } else {
      alert("An error occured while creating product");
    }
  };

  return (
    <div className="collection-item">
      {createProductState.loading && <div>Loading...</div>}
      {showModal && (
        <NewCollectionModal
          onClose={changeModalState(false)}
          onCreate={handleCreate}
        />
      )}
      <div
        className="image add-new-item"
        style={{
          backgroundImage: `url(/add-new-item.svg)`,
        }}
      />
      <div className="collection-footer">
        <span className="name"></span>
      </div>
      {user && (
        <CustomButton onClick={changeModalState(true)}>
          Add new Item
        </CustomButton>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(NewCollectionItem);
