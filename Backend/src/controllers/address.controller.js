import {createAddressService,getUserAddressesService,updateAddressService,deleteAddressService,setDefaultAddressService,
} from "../services/address.service.js";


export const createAddress = async (req, res) => {
    try {
        const address = await createAddressService(req.user.id, req.body);

        return res.status(201).json({
            success: true,
            message: "Address added successfully.",
            address,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to add address.",
        });
    }
};

export const getUserAddresses = async (req, res) => {
    try {
        const addresses = await getUserAddressesService(req.user.id);

        return res.status(200).json({
            success: true,
            addresses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch addresses.",
        });
    }
};

export const updateAddress = async (req, res) => {
    try {
        const address = await updateAddressService(
            req.params.id,
            req.user.id,
            req.body
        );

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Address updated successfully.",
            address,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update address.",
        });
    }
};

export const deleteAddress = async (req, res) => {
    try {
        const deleted = await deleteAddressService(
            req.params.id,
            req.user.id
        );

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Address not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Address deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to delete address.",
        });
    }
};

export const setDefaultAddress = async (req, res) => {
    try {
        const address = await setDefaultAddressService(
            req.params.id,
            req.user.id
        );

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Default address updated successfully.",
            address,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update default address.",
        });
    }
};