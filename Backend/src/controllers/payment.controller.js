import { createPaymentIntentService } from "../services/payment.service.js";

export const createPaymentIntent = async (req, res) => {
    try {
        const result = await createPaymentIntentService(
            req.user._id,
            req.body
        );

        return res.status(result.status).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};