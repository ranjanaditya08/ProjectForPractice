import React, { useMemo } from "react";
import CartCard from "./CartCard";
import { useShoppingCart } from "../utils/ShoopingCartContext";
import { BiRupee } from "react-icons/bi";
import CartShimmer from "./CartShimmer";

const Cart = () => {
  const { cartItems, specsData, totalCartQuantity } = useShoppingCart();

  const quantity = totalCartQuantity();

  const cartData = useMemo(
    () =>
      specsData.filter((item) =>
        cartItems.some((cartItem) => cartItem.id === item.id)
      ),
    [cartItems, specsData]
  );

  return quantity === 0 ? (
    <CartShimmer />
  ) : (
    <section className="h-100">
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0">Shopping Cart</h3>
            </div>

            {cartData.map((data) => (
              <CartCard data={data} key={data.id} />
            ))}

            <div className="card">
              <div className="card-body">
                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-warning btn-block btn-lg"
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
