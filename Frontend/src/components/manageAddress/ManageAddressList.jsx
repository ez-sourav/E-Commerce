import { motion } from "framer-motion";

import ManageAddressCard from "./ManageAddressCard";

const listVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const ManageAddressList = ({
    addresses,
    onEdit,
    onDelete,
    onSetDefault,
    defaultLoadingId,
}) => {
    return (
        <motion.div
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="grid gap-5 sm:gap-6 lg:grid-cols-2"
        >
            {addresses.map((address) => (
                <ManageAddressCard
                    key={address._id}
                    address={address}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onSetDefault={onSetDefault}
                    defaultLoading={
                        defaultLoadingId === address._id
                    }
                />
            ))}
        </motion.div>
    );
};

export default ManageAddressList;