import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    User,
    Phone,
    Home,
    Building2,
    MapPin,
    MapPinned,
    Globe,
    Loader2
} from "lucide-react";
import UseCurrentLocationButton from "./UseCurrentLocationButton";

const AddressForm = ({
    initialValues = null,
    onSubmit,
    loading = false,
    onCancel,
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        trigger
    } = useForm({
        defaultValues: {
            fullName: "",
            mobile: "",
            houseNo: "",
            building: "",
            landmark: "",
            city: "",
            state: "",
            postalCode: "",
            country: "India",
        },
        mode: "onBlur"
    });

    useEffect(() => {
        if (initialValues) {
            reset({
                fullName: initialValues.fullName || "",
                mobile: initialValues.mobile || "",
                houseNo: initialValues.houseNo || "",
                building: initialValues.building || "",
                landmark: initialValues.landmark || "",
                city: initialValues.city || "",
                state: initialValues.state || "",
                postalCode: initialValues.postalCode || "",
                country: initialValues.country || "India",
            });
        } else {
            reset({
                fullName: "",
                mobile: "",
                houseNo: "",
                building: "",
                landmark: "",
                city: "",
                state: "",
                postalCode: "",
                country: "India",
            });
        }
    }, [initialValues, reset]);

    const handleLocationFound = (location) => {
        try {
            // Update form fields with location data
            const fieldsToUpdate = {
                houseNo: location.houseNo || "",
                building: location.building || "",
                landmark: location.landmark || "",
                city: location.city || "",
                state: location.state || "",
                postalCode: location.postalCode || "",
                country: location.country || "India",
            };

            Object.entries(fieldsToUpdate).forEach(([key, value]) => {
                setValue(key, value, { shouldValidate: true });
            });

            // Trigger validation for updated fields
            trigger(['city', 'state', 'postalCode']);

        } catch (error) {
            toast.error(error.message || 'Failed to fill location data');
        }
    };

    const onSubmitForm = (data) => {

        if (!data.fullName || !data.mobile || !data.city || !data.state || !data.postalCode) {
            toast.error('Please fill all required fields marked with *');
            return;
        }

        onSubmit(data);
    };

    const inputClass = "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#0A3D91]  focus:ring-[#0A3D91]/10 placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed";
    const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";
    const errorClass = "mt-1.5 text-xs font-medium text-red-500";
    const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400";
    const sectionLabelClass = "text-xs font-semibold uppercase tracking-wide text-gray-900";

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5 sm:space-y-6">
            {/* Contact section */}
            <div className="space-y-4 sm:space-y-5">
                <p className={sectionLabelClass}>Contact Details</p>

                {/* Full Name */}
                <div>
                    <label htmlFor="fullName" className={labelClass}>
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <User size={18} className={iconClass} />
                        <input
                            id="fullName"
                            type="text"
                            {...register('fullName', {
                                required: 'Full name is required',
                                minLength: {
                                    value: 2,
                                    message: 'Full name must be at least 2 characters'
                                },
                                maxLength: {
                                    value: 100,
                                    message: 'Full name must not exceed 100 characters'
                                }
                            })}
                            placeholder="Enter full name"
                            className={`${inputClass} pl-10 ${errors.fullName ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                        />
                    </div>
                    {errors.fullName && (
                        <p className={errorClass}>{errors.fullName.message}</p>
                    )}
                </div>

                {/* Mobile */}
                <div>
                    <label htmlFor="mobile" className={labelClass}>
                        Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Phone size={18} className={iconClass} />
                        <input
                            id="mobile"
                            type="tel"
                            maxLength={10}
                            inputMode="numeric"
                            {...register("mobile", {
                                required: "Mobile number is required",
                                setValueAs: (value) => value.replace(/\D/g, ""),
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Please enter a valid 10-digit mobile number",
                                },
                            })}
                            placeholder="Enter mobile number"
                            className={`${inputClass} pl-10 ${errors.mobile ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""
                                }`}
                        />
                    </div>
                    {errors.mobile && (
                        <p className={errorClass}>{errors.mobile.message}</p>
                    )}
                </div>
            </div>

            {/* Use Current Location */}
            <div className="flex items-center justify-between gap-3 rounded-xl bg-[#0A3D91]/5 px-4 py-3">
                <p className="text-xs text-gray-500 sm:text-sm">
                    Let us auto-fill your address
                </p>
                <UseCurrentLocationButton onLocationFound={handleLocationFound} />
            </div>

            {/* Address section */}
            <div className="space-y-4 sm:space-y-5">
                <p className={sectionLabelClass}>Address Details</p>

                {/* House No */}
                <div>
                    <label htmlFor="houseNo" className={labelClass}>
                        House No
                    </label>
                    <div className="relative">
                        <Home size={18} className={iconClass} />
                        <input
                            id="houseNo"
                            type="text"
                            {...register('houseNo')}
                            placeholder="Flat / House No."
                            className={`${inputClass} pl-10 ${errors.houseNo ? 'border-red-400' : ''}`}
                        />
                    </div>
                    {errors.houseNo && (
                        <p className={errorClass}>{errors.houseNo.message}</p>
                    )}
                </div>

                {/* Building */}
                <div>
                    <label htmlFor="building" className={labelClass}>
                        Building / Apartment
                    </label>
                    <div className="relative">
                        <Building2 size={18} className={iconClass} />
                        <input
                            id="building"
                            type="text"
                            {...register('building')}
                            placeholder="Building / Apartment"
                            className={`${inputClass} pl-10 ${errors.building ? 'border-red-400' : ''}`}
                        />
                    </div>
                    {errors.building && (
                        <p className={errorClass}>{errors.building.message}</p>
                    )}
                </div>

                {/* Landmark */}
                <div>
                    <label htmlFor="landmark" className={labelClass}>
                        Landmark
                    </label>
                    <div className="relative">
                        <MapPin size={18} className={iconClass} />
                        <input
                            id="landmark"
                            type="text"
                            {...register('landmark')}
                            placeholder="Nearby landmark"
                            className={`${inputClass} pl-10 ${errors.landmark ? 'border-red-400' : ''}`}
                        />
                    </div>
                    {errors.landmark && (
                        <p className={errorClass}>{errors.landmark.message}</p>
                    )}
                </div>

                {/* City & State */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="city" className={labelClass}>
                            City <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="city"
                            type="text"
                            {...register('city', {
                                required: 'City is required',
                                minLength: {
                                    value: 2,
                                    message: 'City must be at least 2 characters'
                                }
                            })}
                            placeholder="City"
                            className={`${inputClass} ${errors.city ? 'border-red-400' : ''}`}
                        />
                        {errors.city && (
                            <p className={errorClass}>{errors.city.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="state" className={labelClass}>
                            State <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="state"
                            type="text"
                            {...register('state', {
                                required: 'State is required',
                                minLength: {
                                    value: 2,
                                    message: 'State must be at least 2 characters'
                                }
                            })}
                            placeholder="State"
                            className={`${inputClass} ${errors.state ? 'border-red-400' : ''}`}
                        />
                        {errors.state && (
                            <p className={errorClass}>{errors.state.message}</p>
                        )}
                    </div>
                </div>

                {/* Postal Code & Country */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="postalCode" className={labelClass}>
                            Postal Code <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <MapPinned size={18} className={iconClass} />
                            <input
                                id="postalCode"
                                type="text"
                                {...register('postalCode', {
                                    required: 'Postal code is required',
                                    pattern: {
                                        value: /^[0-9]{4,6}$/,
                                        message: 'Please enter a valid postal code (4-6 digits)'
                                    }
                                })}
                                placeholder="Postal Code"
                                className={`${inputClass} pl-10 ${errors.postalCode ? 'border-red-400' : ''}`}
                            />
                        </div>
                        {errors.postalCode && (
                            <p className={errorClass}>{errors.postalCode.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="country" className={labelClass}>
                            Country
                        </label>
                        <div className="relative">
                            <Globe size={18} className={iconClass} />
                            <input
                                id="country"
                                type="text"
                                {...register('country')}
                                placeholder="Country"
                                className={`${inputClass} pl-10 ${errors.country ? 'border-red-400' : ''}`}
                            />
                        </div>
                        {errors.country && (
                            <p className={errorClass}>{errors.country.message}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-full rounded-lg border border-gray-200 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A3D91] px-6 py-2.5 font-medium text-white transition hover:bg-[#082f73] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                    {loading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            {initialValues ? "Updating..." : "Saving..."}
                        </>
                    ) : initialValues ? (
                        "Update Address"
                    ) : (
                        "Save Address"
                    )}
                </button>
            </div>
        </form>
    );
};

export default AddressForm;