import {
    Clock3,
    BadgeCheck,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const STATUS_CONFIG = {
    pending: {
        label: "Pending",
        icon: Clock3,
        className:
            "border-yellow-200 bg-yellow-50 text-yellow-700",
        dotClassName: "bg-yellow-500",
    },

    confirmed: {
        label: "Confirmed",
        icon: BadgeCheck,
        className:
            "border-blue-200 bg-blue-50 text-blue-700",
        dotClassName: "bg-blue-500",
    },

    delivered: {
        label: "Delivered",
        icon: CheckCircle2,
        className:
            "border-green-200 bg-green-50 text-green-700",
        dotClassName: "bg-green-500",
    },

    cancelled: {
        label: "Cancelled",
        icon: XCircle,
        className:
            "border-red-200 bg-red-50 text-red-700",
        dotClassName: "bg-red-500",
    },
};

const OrderStatusBadge = ({
    status = "pending",
}) => {
    const currentStatus =
        STATUS_CONFIG[status?.toLowerCase()] ??
        STATUS_CONFIG.pending;

    const Icon = currentStatus.icon;
    const isPending = status?.toLowerCase() === "pending";

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${currentStatus.className}`}
        >
            {isPending ? (
                <span className="relative flex h-2 w-2">
                    <motion.span
                        animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                        transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                        className={`absolute inline-flex h-full w-full rounded-full ${currentStatus.dotClassName}`}
                    />
                    <span
                        className={`relative inline-flex h-2 w-2 rounded-full ${currentStatus.dotClassName}`}
                    />
                </span>
            ) : (
                <Icon size={14} />
            )}
            {currentStatus.label}
        </span>
    );
};

export default OrderStatusBadge;