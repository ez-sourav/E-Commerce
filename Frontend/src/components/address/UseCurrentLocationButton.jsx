import { useState } from "react";
import { Locate, Loader2 } from "lucide-react";
import { toast } from "sonner";

import getCurrentLocationAddress from "../../services/locationService";

const UseCurrentLocationButton = ({ onLocationFound }) => {
    const [loading, setLoading] = useState(false);

    const handleUseCurrentLocation = async () => {
        try {
            setLoading(true);

            const location = await getCurrentLocationAddress();

            if (onLocationFound) {
                onLocationFound(location);
            }

            toast.success("Location detected successfully.");
        } catch (error) {
            toast.error(
                error.message ||
                    "Failed to detect your current location."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={loading}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#0A3D91] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#082f73] disabled:cursor-not-allowed disabled:opacity-60"
        >
            {loading ? (
                <>
                    <Loader2
                        size={16}
                        className="animate-spin"
                    />
                    Detecting...
                </>
            ) : (
                <>
                    <Locate size={16} />
                    Use Current Location
                </>
            )}
        </button>
    );
};

export default UseCurrentLocationButton;