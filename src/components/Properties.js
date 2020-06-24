import React, { useState, useEffect } from "react";
import Proptypes from "prop-types";
import { useLocation } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import Alert from "./Alert";
import Sidebar from "./SideBar";
import { getProperties, filterProperties } from "../requests";

import "../styles/Properties.css";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [alert, setAlert] = useState({ message: "", isSuccess: false });
  useEffect(() => {
    getProperties(setProperties, setAlert);
  }, []);

  const { search } = useLocation();
  useEffect(() => {
    filterProperties(search, setProperties, setAlert);
  }, [search]);

  return (
    <div className="Properties">
      <Sidebar />
      <Alert message={alert.message} success={alert.isSuccess} />
      {properties.map((property) => (
        <PropertyCard key={property._id} {...property} />
      ))}
    </div>
  );
};

Properties.propTypes = {
  location: Proptypes.shape({
    search: Proptypes.string,
  }).isRequired,
};

export default Properties;
