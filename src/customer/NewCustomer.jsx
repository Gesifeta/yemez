import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import { createMyCustomer } from "../features/customerSlice.js";
import Address from "../components/Address.jsx";
import Toaster from "../utils/Toaster.jsx";

const NewCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customerStatus } = useSelector(
    (state) => state.customer
  );
  const [customer, setCustomer] = useState({
    id: uuidv4(),
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    birthDate: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    coordinates: {
      lat: 0,
      lng: 0,
    },
  });
  //input handler
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  //to create debounce for change event
  function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const debouncedHandleInput = debounce(handleInput, 300); // Debounce with a 300ms delay
  //get navigator coordinates

  const getCoordinates = async () => {
    let coordinates = new Promise((resolve, reject) => {
    
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        (error) => {
          reject(error);
        }
      );
    }).then((data) =>
      setCustomer((prev) => {
        return {
          ...prev,
          coordinates: {
            lat: data.latitude,
            lng: data.longitude,
          },
        };
      })
    );
    return await coordinates;
  };
  //run get coordinates on page load
  useEffect(() => {
    getCoordinates();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !customer.firstName ||
      !customer.lastName ||
      !customer.gender ||
      !customer.email
    )
      return;
    const requestBody = {
      query: `mutation {
      createCustomer(newCustomer:{
        id:"${customer.id}",
        firstName:"${customer.firstName}",
        lastName:"${customer.lastName}",
        gender:"${customer.gender}",
        email:"${customer.email}",
        phone:"${customer.phone}",
        birthDate:"${customer.birthDate}",
        address:{
          street:"${customer.street}",
          city:"${customer.city}",
          state:"${customer.state}",
          zipCode:"${customer.zipCode}",
          country:"${customer.country}",
          coordinates:{
            lat:${customer.coordinates?.lat},
            lng:${customer.coordinates?.lng}
          }
    }}){
        id
        firstName
        lastName
        gender
        email
        phone
        birthDate
        address{
        city
        state
        zipCode
        country
        coordinates{
          lat
          lng
        }
    }
        }
    }`,
    };
    let data = new Promise((resolve) => {
      dispatch(createMyCustomer(requestBody));
      resolve(setCustomer({}));
    });
    return data && navigate("/", { replace: true });
  };

  // handle cancel
  const handleCancel = () => {
    return navigate("/");
  };
  return (
    <form className="app__form">
      <div className="app__form-customer">
        {customerStatus ? (
          <Toaster trigger={customerStatus} message="Successfully added" />
        ) : (
          <></>
        )}
        <div className="app__customer-basic">
          <fieldset>
            <legend>Basic Information</legend>
            <div className="app__input-container">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={customer.firstName}
                onChange={debouncedHandleInput}
              />
            </div>
            <div className="app__input-container">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                onChange={debouncedHandleInput}
              />
            </div>

            {/* gender */}
            <div className="app__input-container">
              <label htmlFor="gender">Gender</label>
              <select name="gender" id="gender" onChange={debouncedHandleInput}>
                <option value="select">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="app__input-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={debouncedHandleInput}
              />
            </div>
            <div className="app__input-container">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                onChange={debouncedHandleInput}
              />
            </div>
            {/* BIRTHDAY  */}
            <div className="app__input-container">
              <label htmlFor="birthDate">Birth Date</label>
              <input
                type="date"
                name="birthDate"
                id="birthDate"
                onChange={debouncedHandleInput}
              />
            </div>
          </fieldset>
        </div>

        <div className="app__customer-details">
          <Address
            debouncedHandleInput={debouncedHandleInput}
            handleInput={handleInput}
          />
        </div>
      </div>
      <div className="app__action-container">
        <button onClick={handleSubmit}>Register</button>
        <button type="cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewCustomer;
