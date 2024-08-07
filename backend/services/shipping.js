// controllers/shippingController.js
import axios from "axios";
import { errorResponse } from "../resources/shipmentResources";

// Function to generate shipping label
export const gethippingLabel = async (req) => {
  try {
    const {
      senderName,
      senderAddress,
      recipientName,
      recipientAddress,
      weight,
      dimensions,
    } = req.body;

    // Log dimensions to debug
    console.log("Dimensions:", dimensions);

    // Ensure dimensions is defined and properly formatted
    if (
      !dimensions ||
      typeof dimensions !== "string" ||
      !dimensions.includes("x")
    ) {
      throw new Error(errorResponse("Invalid dimensions format"));
    }

    const [length, width, height] = dimensions.split("x");

    // Log the split dimensions
    console.log("Parsed Dimensions:", { length, width, height });

    // GoShippo API request
    const response = await axios.post(
      "https://api.goshippo.com/shipments/",
      {
        address_from: {
          name: senderName,
          street1: senderAddress,
          city: "City",
          state: "State",
          zip: "Zip",
          country: "Country",
        },
        address_to: {
          name: recipientName,
          street1: recipientAddress,
          city: "City",
          state: "State",
          zip: "Zip",
          country: "Country",
        },
        parcels: [
          {
            length: length.trim(),
            width: width.trim(),
            height: height.trim(),
            weight: weight,
          },
        ],
        async: false,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GO_SHIPPO_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    // Extract the label URL from the response
    const labelUrl = response.data.label_url;

    // Send the label URL back to the client
    return {
      data: labelUrl,
    };
  } catch (error) {
    console.log(error.message);
    throw new Error(errorResponse("Error in Getting shipping label"));
  }
};
