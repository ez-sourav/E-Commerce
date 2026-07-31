import AddressCard from "./AddressCard";
import EmptyAddress from "./EmptyAddress";

const AddressList = ({
    addresses = [],
    onEdit,
    onDelete,
    onMakeDefault,
    defaultLoadingId,
}) => {
    if (!addresses.length) {
        return <EmptyAddress />;
    }

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:gap-7">
            {addresses.map((address) => (
                <AddressCard
                    key={address._id}
                    address={address}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onMakeDefault={onMakeDefault}
                    defaultLoading={defaultLoadingId === address._id}
                />
            ))}
        </div>
    );
};

export default AddressList;