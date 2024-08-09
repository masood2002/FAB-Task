// import axios from "axios";

// // Function to generate shipping label
// export const getShippingLabel = async (req, res) => {
//   try {
//     // Extract necessary details from the request body
//     const {
//       senderName,
//       senderAddress,
//       recipientName,
//       recipientAddress,
//       weight,
//       dimensions,
//     } = req.body;

//     // Hardcode additional data
//     const address_from = {
//       name: senderName,
//       street1: senderAddress,
//       city: "San Francisco", // Hardcoded city
//       state: "CA", // Hardcoded state
//       zip: "94117", // Hardcoded ZIP code
//       country: "US", // Hardcoded country
//     };

//     const address_to = {
//       name: recipientName,
//       street1: recipientAddress,
//       city: "San Francisco", // Hardcoded city
//       state: "CA", // Hardcoded state
//       zip: "94105", // Hardcoded ZIP code
//       country: "US", // Hardcoded country
//     };

//     // Parse dimensions
//     const [length, width, height] = dimensions.split("x").map(Number);

//     // Parcel data with hardcoded values
//     const parcels = [
//       {
//         length: length,
//         width: width,
//         height: height,
//         distance_unit: "cm", // Hardcoded distance unit
//         weight: weight,
//         mass_unit: "kg", // Hardcoded mass unit
//       },
//     ];

//     // Shippo API endpoint
//     const shippoApiUrl = "https://api.goshippo.com/shipments/";
//     const apiToken = "shippo_test_fcb724022117bd0066fe4a5231bbfba421ce345d"; // Replace with your actual Shippo API token

//     // Make the API call to Shippo to generate the shipping label
//     const response = await axios.post(
//       shippoApiUrl,
//       {
//         address_from: address_from,
//         address_to: address_to,
//         parcels: parcels,
//         async: false, // Set to false to get the response synchronously
//       },
//       {
//         headers: {
//           Authorization: `ShippoToken ${apiToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Send back the label URL to the frontend
//     // console.log(response.data.rates);

//     const firstUSPSRate = response.data.rates.find(
//       (rate) => rate.provider === "USPS"
//     );

//     // firstUSPSRate.carrier_account;
//     const response2 = await axios.post(
//       "https://api.goshippo.com/transactions/",
//       {
//         shipment: {
//           address_from: {
//             name: "Mr. Hippo",
//             street1: "215 Clayton St.",
//             city: "San Francisco",
//             state: "CA",
//             zip: "94117",
//             country: "US",
//             phone: "+1 555 341 9393",
//             email: "support@shippo.com",
//           },
//           address_to: {
//             name: "Mrs. Hippo",
//             street1: "965 Mission St.",
//             city: "San Francisco",
//             state: "CA",
//             zip: "94105",
//             country: "US",
//             phone: "+1 555 341 9393",
//             email: "support@shippo.com",
//           },
//           parcels: [
//             {
//               length: "5",
//               width: "5",
//               height: "5",
//               distance_unit: "in",
//               weight: "2",
//               mass_unit: "lb",
//             },
//           ],
//         },
//         carrier_account: firstUSPSRate.carrier_account,
//         servicelevel_token: "usps_priority",
//       },
//       {
//         headers: {
//           Authorization: `ShippoToken ${apiToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log(response2.data.label_url);
//     res.json({ labelUrl: response2.data.label_url });
//   } catch (error) {
//     console.error("Error generating shipping label:", error);
//     res.status(500).json({ error: "Error generating shipping label" });
//   }
// };
import { shippingLable } from "../services/index.js";

export const getShippingLabel = async (req, res) => {
  try {
    const result = await shippingLable(req);
    res.status(200).json({
      labelUrl: result.labelUrl,
      status: true,
      message: "Got Label Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
