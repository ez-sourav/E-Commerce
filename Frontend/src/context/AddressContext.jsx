import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";

import {
    createAddress,
    getAddresses,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} from "../services/addressService";

import useAuth from "../hooks/useAuth";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const { user } = useAuth();

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all addresses
    const fetchAddresses = useCallback(async () => {
        if (!user) {
            setAddresses([]);
            return;
        }

        try {
            setLoading(true);

            const { addresses } = await getAddresses();

            setAddresses(addresses || []);
        } catch (error) {
            console.error("Failed to fetch addresses:", error);
            setAddresses([]);
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Add address
    const addAddress = async (addressData) => {
        const response = await createAddress(addressData);

        await fetchAddresses();

        return response;
    };

    // Edit address
    const editAddress = async (addressId, addressData) => {
        const response = await updateAddress(addressId, addressData);

        await fetchAddresses();

        return response;
    };

    // Delete address
    const removeAddress = async (addressId) => {
        const response = await deleteAddress(addressId);

        await fetchAddresses();

        return response;
    };

    // Make default
    const makeDefaultAddress = async (addressId) => {
        const response = await setDefaultAddress(addressId);

        await fetchAddresses();

        return response;
    };

    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses]);

    return (
        <AddressContext.Provider
            value={{
                addresses,
                loading,
                fetchAddresses,
                addAddress,
                editAddress,
                removeAddress,
                makeDefaultAddress,
            }}
        >
            {children}
        </AddressContext.Provider>
    );
};

export const useAddress = () => useContext(AddressContext);