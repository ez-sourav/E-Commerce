import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
} from "../services/wishlistService";

import useAuth from "../hooks/useAuth";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { user } = useAuth();

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    // ----------------------------------
    // Fetch Wishlist
    // ----------------------------------
    const fetchWishlist = useCallback(async () => {
        if (!user) {
            setWishlist([]);
            return;
        }

        try {
            setLoading(true);

            const { wishlist } = await getWishlist();

            setWishlist(wishlist?.products || []);
        } catch (error) {
            console.error(
                "Failed to fetch wishlist:",
                error
            );

            setWishlist([]);
        } finally {
            setLoading(false);
        }
    }, [user]);

    const addProductToWishlist = async (
        productId
    ) => {
        const { wishlist } =
            await addToWishlist(productId);

        setWishlist(wishlist.products || []);

        return wishlist;
    };

    
    const removeProductFromWishlist =
        async (productId) => {
            const { wishlist } =
                await removeFromWishlist(productId);

            setWishlist(wishlist.products || []);

            return wishlist;
        };

    const isWishlisted = (productId) => {
        return wishlist.some(
            (item) =>
                item.product?._id === productId
        );
    };

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                loading,

                fetchWishlist,

                addToWishlist:
                    addProductToWishlist,

                removeFromWishlist:
                    removeProductFromWishlist,

                isWishlisted,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);