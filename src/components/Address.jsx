import { useEffect, useState } from "react";
import Countries from "../utils/country.js";
import Cities from "../utils/cities.js";

const Address = ({debouncedHandleInput}) => {
  const [country, setCountry] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  //To populte available states for a given country
  useEffect(() => {
    const filtered = Countries.filter(
      (coun) => coun.name === country
    );
    setStates(filtered);
  }, [country]);

  //To populate available cities in a country
  useEffect(() => {
    for (const city in Cities) {
      if (city === country) setCities(Cities[city]);
    }
  }, [cities, country]);
  return (
    
      <fieldset>
        <legend>Address</legend>
      <label htmlFor="country">Country</label>
      <select
        name="country"
        id="country"
        onMouseUp={(event) => {
          setCountry(event.target.value);
        }}
        onChange={debouncedHandleInput}
      >
        <option value="select">select</option>
        {Countries.map((country, index) => (
          <option
            value={country.name}
            key={`${country.name}-${index}`}
          >
            {country.name}
          </option>
        ))}
      </select>
      <label htmlFor="state">State</label>
      <select name="state" id="state"   onChange={debouncedHandleInput}>
        <option value="select">select</option>
        {states[0]?.states?.map((state, index) => (
          <option
            value={state.name}
            key={`${state.name}-${index}`}
          >
            {state.name}
          </option>
        ))}
      </select>
      <label htmlFor="city">City</label>
      <select name="city" id="city"   onChange={debouncedHandleInput}>
        <option value="select">select</option>
        {cities.map((city, index) => (
          <option value={city} key={`${city}-${index}`}>
            {city}
          </option>
        ))}
      </select>
      <label htmlFor="street">Street</label>
      <input type="text" name="street" id="street"   onChange={debouncedHandleInput} />
      </fieldset>
   
  );
};

export default Address;
