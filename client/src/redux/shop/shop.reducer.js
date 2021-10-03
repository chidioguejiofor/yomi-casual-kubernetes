import SHOP_DATA from './shop.data';

const initalState = {
  collections: SHOP_DATA
};

export default (state = initalState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
