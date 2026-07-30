import {
    createOrderService,
    getMyOrdersService,
    getOrderByIdService,
} from "../services/order.service.js";

export const createOrder = async (req, res) => {
    try {
        const result = await createOrderService(
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

export const getMyOrders = async (req, res) => {
    try {
        const result = await getMyOrdersService(req.user._id);

        return res.status(result.status).json(result);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const result = await getOrderByIdService(
            req.user._id,
            req.params.orderId
        );

        return res.status(result.status).json(result);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};