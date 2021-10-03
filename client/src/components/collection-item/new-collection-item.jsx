import React, { useState } from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";

import CustomButton from "../custom-button/custom-button";
import NewCollectionModal from "../new-collection-modal/new-collection-modal";
import "./collection-item.styles.scss";

const NewCollectionItem = ({ item, addItem }) => {
  const [showModal, setModal] = useState(false);
  const changeModalState = (newState) => () => setModal(newState);

  return (
    <div className="collection-item">
      {showModal && <NewCollectionModal onClose={changeModalState(false)} />}
      <div
        className="image add-new-item"
        style={{
          backgroundImage: `url(/add-new-item.svg)`,
        }}
      />
      <div className="collection-footer">
        <span className="name"></span>
      </div>
      <CustomButton onClick={changeModalState(true)}>Add new Item</CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(NewCollectionItem);
