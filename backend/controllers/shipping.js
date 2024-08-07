import { errorResponse, successResponse } from "../resources/index.js";
import { generateShippingLabel } from "../services/shipping.js";

export const GetShippingLabel = async (req, res) => {
  try {
    const result = await generateShippingLabel(req);
    res.status(200).json(successResponse(result.data));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
};
