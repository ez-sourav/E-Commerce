import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { useAddress } from "../context/AddressContext";

import AddressModal from "../components/address/AddressModal";
import ConfirmModal from "../components/common/ConfirmModal";

import ManageAddressHeader from "../components/manageAddress/ManageAddressHeader";
import ManageAddressList from "../components/manageAddress/ManageAddressList";
import ManageAddressCardSkeleton from "../components/manageAddress/ManageAddressCardSkeleton";
import EmptyManageAddress from "../components/manageAddress/EmptyManageAddress";

const ManageAddresses = () => {
    const navigate = useNavigate();

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

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [defaultLoadingId, setDefaultLoadingId] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const handleAddAddress = () => {
        setEditingAddress(null);
        setIsModalOpen(true);
    };

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setIsModalOpen(true);
    };

    const handleSubmitAddress = async (values) => {
        try {
            setSubmitLoading(true);

            if (editingAddress) {
                await editAddress(editingAddress._id, values);

                toast.success("Address updated successfully.");
            } else {
                await addAddress(values);

                toast.success("Address added successfully.");
            }

            setIsModalOpen(false);
            setEditingAddress(null);
        } catch (error) {
            toast.error(
                error.message || "Failed to save address."
            );
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDeleteClick = (addressId) => {
        setSelectedAddressId(addressId);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            setDeleteLoading(true);

            await removeAddress(selectedAddressId);

            toast.success("Address deleted successfully.");

            setDeleteModalOpen(false);
            setSelectedAddressId(null);
        } catch (error) {
            toast.error(
                error.message ||
                "Failed to delete address."
            );
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleSetDefault = async (addressId) => {
        try {
            setDefaultLoadingId(addressId);

            await makeDefaultAddress(addressId);

            toast.success("Default address updated.");
        } catch (error) {
            toast.error(
                error.message ||
                "Failed to update default address."
            );
        } finally {
            setDefaultLoadingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">

                <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-black "
                >
                    <ArrowLeft size={18} />
                    <span>Back</span>
                </button>

                <ManageAddressHeader
                    onAddAddress={handleAddAddress}
                />

                {loading ? (
                    <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <ManageAddressCardSkeleton key={i} />
                        ))}
                    </div>
                ) : addresses.length === 0 ? (
                    <EmptyManageAddress
                        onAddAddress={handleAddAddress}
                    />
                ) : (
                    <ManageAddressList
                        addresses={addresses}
                        onEdit={handleEditAddress}
                        onDelete={handleDeleteClick}
                        onSetDefault={handleSetDefault}
                        defaultLoadingId={defaultLoadingId}
                    />
                )}

                <AddressModal
                    isOpen={isModalOpen}
                    initialValues={editingAddress}
                    loading={submitLoading}
                    onSubmit={handleSubmitAddress}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingAddress(null);
                    }}
                />

                <ConfirmModal
                    isOpen={deleteModalOpen}
                    title="Delete Address"
                    message="Are you sure you want to delete this address? This action cannot be undone."
                    confirmText="Delete"
                    cancelText="Cancel"
                    loading={deleteLoading}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => {
                        setDeleteModalOpen(false);
                        setSelectedAddressId(null);
                    }}
                />
            </div>
        </div>
    );
};

export default ManageAddresses;