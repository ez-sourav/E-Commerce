import Address from "../model/address.model.js";
export const createAddressService = async (userId, addressData) => {
    // If this is the user's first address, make it default
    const addressCount = await Address.countDocuments({ user: userId });

    const address = await Address.create({
        ...addressData,
        user: userId,
        isDefault: addressCount === 0,
    });

    return address;
};

export const getUserAddressesService = async (userId) => {
    const addresses = await Address.find({ user: userId }).sort({
        isDefault: -1,
        createdAt: -1,
    });

    return addresses;
};


export const updateAddressService = async (
    addressId,
    userId,
    addressData
) => {
    const address = await Address.findOneAndUpdate(
        {
            _id: addressId,
            user: userId,
        },
        addressData,
        {
            new: true,
            runValidators: true,
        }
    );

    return address;
};


export const deleteAddressService = async (addressId, userId) => {
    const address = await Address.findOne({
        _id: addressId,
        user: userId,
    });

    if (!address) {
        return null;
    }

    const wasDefault = address.isDefault;

    await address.deleteOne();

    // If deleted address was default,
    // make another address default automatically
    if (wasDefault) {
        const anotherAddress = await Address.findOne({ user: userId }).sort({
            createdAt: -1,
        });

        if (anotherAddress) {
            anotherAddress.isDefault = true;
            await anotherAddress.save();
        }
    }

    return true;
};


export const setDefaultAddressService = async (addressId, userId) => {
    const address = await Address.findOne({
        _id: addressId,
        user: userId,
    });

    if (!address) {
        return null;
    }

    // Remove default from all user's addresses
    await Address.updateMany(
        { user: userId },
        {
            $set: {
                isDefault: false,
            },
        }
    );

    // Set selected address as default
    address.isDefault = true;
    await address.save();

    return address;
};