import React, { useState } from "react";
import axios from "axios";
import "./ShippingForm.css"; // Import the CSS file

const ShippingForm = () => {
  const [formData, setFormData] = useState({
    senderName: "",
    senderAddress: "",
    recipientName: "",
    recipientAddress: "",
    weight: "",
    dimensions: "",
  });
  const [labelUrl, setLabelUrl] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shipping",
        formData
      );
      setLabelUrl(response.data.labelUrl);
    } catch (error) {
      console.error("Error generating shipping label:", error);
    }
  };

  return (
    <div className="shipping-form">
      <form onSubmit={handleSubmit} className="form">
        <h2>Shipping Details</h2>

        <h3>Sender Information</h3>
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              name="senderName"
              value={formData.senderName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Address:
            <input
              type="text"
              name="senderAddress"
              value={formData.senderAddress}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <h3>Recipient Information</h3>
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Address:
            <input
              type="text"
              name="recipientAddress"
              value={formData.recipientAddress}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <h3>Package Information</h3>
        <div className="form-group">
          <label>
            Weight (kg):
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Dimensions (LxWxH cm):
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button type="submit">Generate Shipping Label</button>
      </form>
      {/* {labelUrl && (
        <div className="label-display">
          <h2>Shipping Label</h2>
          <img src={labelUrl} alt="Shipping Label" />
        </div>
      )} */}
      {labelUrl && (
        <div className="label-display">
          <h2>Shipping Label</h2>
          {/* Option 1: Using <iframe> */}
          <iframe
            src={labelUrl}
            width="100%"
            height="600px"
            title="Shipping Label"
          />

          {/* Option 2: Using <embed> */}
          {/* <embed src={labelUrl} width="100%" height="600px" type="application/pdf" /> */}
        </div>
      )}
    </div>
  );
};

export default ShippingForm;
