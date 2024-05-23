import React from "react";
import PropTypes from "prop-types";

const Notification = ({ message, type }) => {
  if (!message) {
    return null;
  }

  const notificationStyle = {
    color: type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={notificationStyle}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["error", "success"]),
};

export default Notification;
