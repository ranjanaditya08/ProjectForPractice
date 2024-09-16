import React from "react";
import "../cartShimmer.css"

const CartShimmer = () => {
  return (
    <div className="container-fluid cartShimmer mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body cart">
              <div className="col-sm-12 empty-cart-cls text-center">
                <img
                  src="https://i.imgur.com/dCdflKN.png"
                  alt=""
                  width="130"
                  height="130"
                  className="img-fluid mb-4 mr-3"
                />
                <h3>
                  <strong>Your Cart is Empty</strong>
                </h3>
                <h4>Add something to make me happy :)</h4>
                <a
                  href="/"
                  className="btn btn-primary cart-btn-transform m-3"
                  data-abc="true"
                >
                  continue shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartShimmer;
