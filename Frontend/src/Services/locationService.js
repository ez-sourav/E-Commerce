const getCurrentLocationAddress = async () => {
    if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser. Please enter your address manually.');
    }

    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            });
        });

        const { latitude, longitude } = position.coords;

        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'MERN-Ecommerce-App/1.0'
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch address from location service');
        }

        const data = await response.json();

        if (!data || !data.address) {
            throw new Error('No address data found for your location');
        }

        const address = data.address;

        const addressLineParts = [
            address.house_number,
            address.road,
            address.suburb,
            address.neighbourhood
        ].filter(Boolean);

        const city = address.city || address.town || address.village || address.hamlet || '';
        const state = address.state || address.region || address.county || '';
        const postalCode = address.postcode || '';
        const country = address.country || '';

        if (!addressLineParts.length && !city && !state) {
            throw new Error('Incomplete address data received. Please enter your address manually.');
        }

        return {
            houseNo: address.house_number || "",
            building: address.building || "",
            landmark:
                address.landmark ||
                address.neighbourhood ||
                address.suburb ||
                "",

            city,
            state,
            postalCode,
            country,

            latitude,
            longitude,
        };
    } catch (error) {
        if (error.message.includes('User denied Geolocation')) {
            throw new Error('Location permission denied. Please enable location services or enter your address manually.');
        } else if (error.message.includes('timeout')) {
            throw new Error('Location request timed out. Please try again or enter your address manually.');
        } else if (error.message.includes('position unavailable')) {
            throw new Error('Unable to determine your location. Please enter your address manually.');
        }
        throw error;
    }
};

export default getCurrentLocationAddress;