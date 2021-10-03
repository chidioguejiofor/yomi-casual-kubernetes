import React, { useEffect } from "react";
import "./new-collection-modal.styles.scss";

const NewCollectionModal = ({ onClose, onCreate }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(Array.from(formData.values()).map((item) => item));
    console.log(formData.values());
  };
  return (
    <div className="new-collection-modal">
      <div className="new-collection-modal__container">
        <header>
          <h3>Add new Collection Item</h3>
        </header>

        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-item">
              <label htmlFor="name">Name</label>
              <input name="name" type="text" placeholder="name" />
            </div>
            <div className="form-item">
              <label htmlFor="name">Price</label>
              <input name="price" type="number" placeholder="price" />
            </div>
            <div className="form-item">
              <label htmlFor="image">Image</label>
              <input type="file" name="image" />
            </div>

            <div className="form-item button-container">
              <button type="submit">Create New Item</button>
              <button type="button" onClick={onClose}>
                Close
              </button>
            </div>
            <div className="image-preview"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCollectionModal;
