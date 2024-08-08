import { errorResponse, successResponse } from "../resources/index.js";
import { gethippingLabel } from "../services/shipping.js";

export const generateShippingLabel = async (req, res) => {
  try {
    const result = await gethippingLabel(req);
    res.status(200).json(successResponse(result.data));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
};
