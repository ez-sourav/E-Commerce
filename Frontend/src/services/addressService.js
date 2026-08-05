import api from "./api";

export const createAddress = async (addressData) => {
    const { data } = await api.post("/addresses", addressData);
    return data;
};

export const getAddresses = async () => {
    const { data } = await api.get("/addresses");
    return data;
};

export const updateAddress = async (addressId, addressData) => {
    const { data } = await api.patch(
        `/addresses/${addressId}`,
        addressData
    );
    return data;
};

export const deleteAddress = async (addressId) => {
    const { data } = await api.delete(
        `/addresses/${addressId}`
    );
    return data;
};

export const setDefaultAddress = async (addressId) => {
    const { data } = await api.patch(
        `/addresses/${addressId}/default`
    );
    return data;
};