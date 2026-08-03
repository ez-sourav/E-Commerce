import { Plus, MapPin } from "lucide-react";

const ManageAddressHeader = ({ onAddAddress }) => {
    return (
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Left */}
            <div>
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A3D91]/10">
                        <MapPin
                            size={24}
                            className="text-[#0A3D91]"
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Manage Addresses
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Add, edit, delete, and manage your delivery
                            addresses.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right */}
            <button
                onClick={onAddAddress}
                className="inline-flex items-center justify-center cursor-pointer gap-2 rounded-xl bg-[#0A3D91] px-5 py-3 font-medium text-white transition hover:bg-[#083170]"
            >
                <Plus size={18} />
                Add Address
            </button>
        </div>
    );
};

export default ManageAddressHeader;