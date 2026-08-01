import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useAddress } from "../../context/AddressContext";

import SelectedAddressCard from "../address/SelectedAddressCard";
import AddressSelectionModal from "../address/AddressSelectionModal";
import AddressModal from "../address/AddressModal";
import ConfirmModal from "../common/ConfirmModal";

const AddressSelector = ({
    selectedAddressId,
    setSelectedAddressId,
}) => {
    const {
        addresses,
        loading,
        addAddress,
        editAddress,
        removeAddress,
        makeDefaultAddress,
    } = useAddress();

    // Add/Edit Address Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Change Address Modal
    const [isSelectionModalOpen, setIsSelectionModalOpen] =
        useState(false);

    const [editingAddress, setEditingAddress] = useState(null);

    const [submitLoading, setSubmitLoading] = useState(false);

    const [deleteId, setDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [defaultLoadingId, setDefaultLoadingId] =
        useState(null);

    // Auto Select Default Address
    useEffect(() => {
        if (!addresses.length) return;

        if (!selectedAddressId) {
            const defaultAddress =
                addresses.find((a) => a.isDefault) ||
                addresses[0];

            setSelectedAddressId(defaultAddress._id);
        }
    }, [addresses, selectedAddressId, setSelectedAddressId]);

    // Lock page scroll while any modal is open
    useEffect(() => {
        const hasOpenModal =
            isModalOpen ||
            isSelectionModalOpen ||
            !!deleteId;

        document.body.style.overflow = hasOpenModal
            ? "hidden"
            : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [
        isModalOpen,
        isSelectionModalOpen,
        deleteId,
    ]);

    // Currently Selected Address
    const selectedAddress =
        addresses.find(
            (address) =>
                address._id === selectedAddressId
        ) || null;

    // Open Add Address Modal
    const handleAddAddress = () => {
        setEditingAddress(null);
        setIsModalOpen(true);
    };

    // Open Edit Address Modal
    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setIsModalOpen(true);
    };

    // Close Add/Edit Modal
    const handleCloseModal = () => {
        setEditingAddress(null);
        setIsModalOpen(false);
    };

    // Add / Edit Address
    const handleSubmit = async (formData) => {
        try {
            setSubmitLoading(true);

            if (editingAddress) {
                await editAddress(
                    editingAddress._id,
                    formData
                );

                toast.success(
                    "Address updated successfully."
                );
            } else {
                await addAddress(formData);

                toast.success(
                    "Address added successfully."
                );
            }

            handleCloseModal();
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong."
            );
        } finally {
            setSubmitLoading(false);
        }
    };

    // Delete Address
    const handleDeleteAddress = (id) => {
        setDeleteId(id);
    };

    const confirmDeleteAddress = async () => {
        try {
            setDeleteLoading(true);

            await removeAddress(deleteId);

            if (selectedAddressId === deleteId) {
                setSelectedAddressId(null);
            }

            toast.success(
                "Address deleted successfully."
            );

            setDeleteId(null);
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to delete address."
            );
        } finally {
            setDeleteLoading(false);
        }
    };

    // Make Default Address
    const handleMakeDefault = async (id) => {
        try {
            setDefaultLoadingId(id);

            await makeDefaultAddress(id);

            setSelectedAddressId(id);

            toast.success(
                "Default address updated."
            );
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update default address."
            );
        } finally {
            setDefaultLoadingId(null);
        }
    };

    if (loading) {
        return (
            <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 sm:p-6">

                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200" />

                    <div className="flex-1">
                        <div className="h-5 w-44 rounded bg-gray-200" />
                        <div className="mt-2 h-4 w-72 max-w-full rounded bg-gray-100" />
                    </div>
                </div>

                <div className="mt-6 rounded-xl border border-gray-100 p-5">

                    {/* Badge */}
                    <div className="h-7 w-24 rounded-full bg-gray-200" />

                    {/* Name + Buttons */}
                    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200" />

                            <div>
                                <div className="h-5 w-44 rounded bg-gray-200" />
                                <div className="mt-3 h-4 w-36 rounded bg-gray-100" />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className="h-10 w-24 rounded-lg bg-gray-200" />
                            <div className="h-10 w-32 rounded-lg bg-gray-200" />
                        </div>

                    </div>

                    {/* Address */}
                    <div className="mt-6 space-y-3">
                        <div className="h-4 w-full rounded bg-gray-100" />
                        <div className="h-4 w-11/12 rounded bg-gray-100" />
                        <div className="h-4 w-3/4 rounded bg-gray-100" />
                    </div>

                </div>

            </div>
        );
    }
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <SelectedAddressCard
                    address={selectedAddress}
                    onChange={() => setIsSelectionModalOpen(true)}
                    onAddAddress={handleAddAddress}
                />
            </motion.div>

            {/* Address Selection Modal */}
            <AddressSelectionModal
                isOpen={isSelectionModalOpen}
                onClose={() => setIsSelectionModalOpen(false)}
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                setSelectedAddressId={setSelectedAddressId}
                onConfirm={() => setIsSelectionModalOpen(false)}
                onAddAddress={() => {
                    setIsSelectionModalOpen(false);
                    handleAddAddress();
                }}
            />

            {/* Add / Edit Address Modal */}
            <AddressModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                initialValues={editingAddress}
                onSubmit={handleSubmit}
                loading={submitLoading}
            />

            {/* Delete Confirmation */}
            <ConfirmModal
                isOpen={!!deleteId}
                title="Delete Address"
                message="Are you sure you want to delete this address? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                loading={deleteLoading}
                onConfirm={confirmDeleteAddress}
                onCancel={() => setDeleteId(null)}
            />
        </>
    );
};

export default AddressSelector;