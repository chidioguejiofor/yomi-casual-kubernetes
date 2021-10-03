import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_G2V660pg99einMvpRu732vAJ00euLyvULi';
  const onToken = token => {
    console.log(token);
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Yomi Casual Ltd'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    ></StripeCheckout>
  );
};

export default StripeCheckoutButton;
