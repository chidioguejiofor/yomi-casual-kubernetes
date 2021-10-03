import React from "react";
import "./new-collection-modal.styles.scss";

const NewCollectionModal = () => {
  return (
    <div className="new-collection-modal">
      <div className="new-collection-modal__container">
        <header>
          <h3>Add new Collection Item</h3>
        </header>

        <div className="form-wrapper">
          <form>
            <div className="form-item">
              <label htmlFor="name">Name</label>
              <input anme="name" type="text" placeholder="name" />
            </div>
            <div className="form-item">
              <label htmlFor="name">Price</label>
              <input type="number" placeholder="price" />
            </div>
            <div className="form-item">
              <label htmlFor="image">Image</label>
              <input type="file" name="image" />
            </div>

            <div className="image-preview"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCollectionModal;
