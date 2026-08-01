import { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import { useAddress } from "../context/AddressContext";

import AddressList from "../components/address/AddressList";
import AddressModal from "../components/address/AddressModal";
import ConfirmModal from "../components/common/ConfirmModal";

const AddressPage = () => {
    const {
        addresses,
        loading,
        addAddress,
        editAddress,
        removeAddress,
        makeDefaultAddress,
    } = useAddress();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    // UI Loading States
    const [submitLoading, setSubmitLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [defaultLoadingId, setDefaultLoadingId] = useState(null);

    // Delete Modal State
    const [deleteId, setDeleteId] = useState(null);

    // Open Add Modal
    const handleAddAddress = () => {
        setEditingAddress(null);
        setIsModalOpen(true);
    };

    // Open Edit Modal
    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setIsModalOpen(true);
    };

    // Close Modal
    const handleCloseModal = () => {
        setEditingAddress(null);
        setIsModalOpen(false);
    };

    // Add / Edit Address
    const handleSubmit = async (formData) => {
        try {
            setSubmitLoading(true);

            if (editingAddress) {
                await editAddress(editingAddress._id, formData);

                toast.success("Address updated successfully.");
            } else {
                await addAddress(formData);

                toast.success("Address added successfully.");
            }

            handleCloseModal();
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong."
            );
        } finally {
            setSubmitLoading(false);
        }
    };

    // Open Delete Modal
    const handleDeleteAddress = (id) => {
        setDeleteId(id);
    };

    // Delete Address
    const confirmDeleteAddress = async () => {
        try {
            setDeleteLoading(true);

            await removeAddress(deleteId);

            toast.success("Address deleted successfully.");

            setDeleteId(null);
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to delete address."
            );
        } finally {
            setDeleteLoading(false);
        }
    };

    // Make Default
    const handleMakeDefault = async (id) => {
        try {
            setDefaultLoadingId(id);

            await makeDefaultAddress(id);

            toast.success("Default address updated.");
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update default address."
            );
        } finally {
            setDefaultLoadingId(null);
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        My Addresses
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage your delivery addresses.
                    </p>
                </div>

                <button
                    onClick={handleAddAddress}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <Plus size={18} />
                    Add Address
                </button>
            </div>

            {/* Address List */}
            {loading ? (
                <div className="flex items-center justify-center py-24">
                    <p className="text-gray-500">
                        Loading addresses...
                    </p>
                </div>
            ) : (
                <AddressList
                    addresses={addresses}
                    onEdit={handleEditAddress}
                    onDelete={handleDeleteAddress}
                    onMakeDefault={handleMakeDefault}
                    defaultLoadingId={defaultLoadingId}
                />
            )}

            {/* Add/Edit Modal */}
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
        </div>
    );
};

export default AddressPage;