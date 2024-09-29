import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaCartPlus, FaAngleDown, FaAngleUp } from "react-icons/fa6";

import {
  postOrder,
  decrementItems,
  incrementItems,
  removeFromCart,
  addToOrder,
} from "../features/orderSlice";

const Cart = () => {
  const dispatch = useDispatch();
  //get orders from store
  let order = useSelector((state) => state.order);
  const [showCart, setShowCart] = useState(false);
  //Place customer order
  const placeCustomerOrder = async () => {
    let items = [];
    const itemsubTotal = order.cart.lineItems.reduce((acc, item) => {
      //calculate total sub items
      acc += item.subTotal;
      items.push(item.lineItem.id, item.lineItem.price, item.numberOfItems);
      return acc;
    }, 0);
    const newOrder = {
      orderID: uuidv4(),
      reference: order.cart.reference,
      lineItems: {
        items,
        quantity: order.cart.numberOfItems,
        subTotal: itemsubTotal,
      },
      numberOfItems: order.cart.numberOfItems,
      totalPrice: order.cart.totalPrice,
      orderedBy: "Gemechu",
      shippingInstructions: {
        name: "Gemechu",
        phone: {
          home: ["0912345678", "0912345678", "0912345678"],
          mobile: ["0912345678", "0912345678", "0912345678", "0912345678"],
          work: ["0912345678", "0912345678"],
        },
        country: "Ethiopia",
        city: "Sululta",
        state: "Oromia",
        postalCode: "1235402",
        street: "Shufune",
        coordinates: {
          lat: 0.225,
          lng: 0.225,
        },
      },
      deliveryDate: "String",
      deliveryMode: "String",
      status: "inprogress",
    };
    setShowCart(false);

    return new Promise((resolve) => {
      //add order
      return resolve(dispatch(addToOrder(newOrder)));
    }).then((data) => completeOrder(data.payload));
  };
  //compelete user order
  const completeOrder = (payload) => {
    //find in the order and add to active orders
    const requestbody = {
      query: `
      mutation{
      createOrder(newOrder: {
        orderID: "${payload.orderID}",
        reference: "${payload.reference}",
        lineItems: {
          items: ["${payload.lineItems.items}"],
                    quantity: ${payload.lineItems.quantity}
          subTotal: ${payload.lineItems.subTotal}
    },    
        numberOfItems: ${payload.numberOfItems},
        totalPrice: ${payload.totalPrice},
        orderedBy: "${payload.orderedBy}",
      
        shippingInstructions: {
          name: "Gemechu",
         phone: {
          home:"${payload.shippingInstructions.phone.home}",
          mobile:"${payload.shippingInstructions.phone.mobile}",
          work:"${payload.shippingInstructions.phone.work}",
        },
          country: "Ethiopia",
          city: "Sululta",
          state: "Oromia",
          postalCode: "1235402",
          street: "Shufune",
          coordinates: {
            lat: 0.225,
            lng: 0.225
          },
        },
        deliveryDate: "String",
        deliveryMode: "String",
        status: "inprogress",
    })
      {
        reference
        orderedBy
        lineItems{
        items
        quantity
        subTotal
        }
        shippingInstructions{
          name
          phone{
            home
            mobile
            work
          }
          country
          city
          state
          postalCode
          street
          coordinates{
            lat
            lng
          }
        }
      }
    }
        `,
    };
    return order.orders.length && dispatch(postOrder(requestbody));
  };
  return (
    <div className="app__cart">
      <div className="app__cart-icons" onClick={() => setShowCart(!showCart)}>
        <FaCartPlus color="coral" className="cart-icon" />
        <span className="app__cart-count"> {order.cart.numberOfItems}</span>
        {showCart ? (
          <FaAngleUp className="cart-icon" onClick={() => setShowCart(false)} />
        ) : (
          <FaAngleDown
            className="cart-icon"
            onClick={() => setShowCart(true)}
          />
        )}
      </div>
      {showCart ? (
        <table className="app__cart-items">
          <tbody>
            <tr>
              <th>title</th>
              <th>price</th>
              <th>quantity </th>
              <th>sub-total</th>
              <th>action</th>
            </tr>

            {order.cart.lineItems.map((data, index) => (
              <tr key={`${data.lineItem.title}-${index}`}>
                <td>{data.lineItem.title}</td>
                <td>{data.lineItem.price}</td>
                <td>
                  <span>
                    {data.numberOfItems}
                    <span className="app__cart-action">
                      <span
                        className="app__cart-action increase"
                        onClick={() => {
                          dispatch(incrementItems(data.lineItem.id));
                        }}
                      >
                        +
                      </span>
                      <span
                        className="app__cart-action decrease"
                        onClick={() =>
                          dispatch(decrementItems(data.lineItem.id))
                        }
                      >
                        -
                      </span>
                    </span>
                  </span>
                </td>
                <td>{data.subTotal}</td>
                <td>
                  <button
                    className="app__cart-action remove"
                    onClick={() => dispatch(removeFromCart(data.lineItem.id))}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <th className="default"></th>
              <th className="default"></th>
              <th className="default">Grand Total</th>
              <th className="default">
                <button
                  style={{
                    display: "flex",
                    width: "auto",
                    justifyItems: "center",
                    alignItems: "center",
                    backgroundColor: "#2264a7",
                    color: "white",
                  }}
                >
                  <span onClick={placeCustomerOrder}>
                    Place Order ${order.cart.totalPrice}
                  </span>
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default Cart;
