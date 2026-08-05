import { CardElement } from "@stripe/react-stripe-js";
import { CreditCard, Lock } from "lucide-react";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1f2937",
      fontFamily: "Inter, sans-serif",
      "::placeholder": {
        color: "#9ca3af",
      },
    },
    invalid: {
      color: "#ef4444",
    },
  },
  hidePostalCode: true,
};

const CardPaymentForm = () => {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <CreditCard
          size={24}
          className="text-[#0A3D91]"
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Credit / Debit Card
          </h3>

          <p className="text-sm text-gray-500">
            Enter your card details to complete your payment securely.
          </p>
        </div>
      </div>

      {/* Card Details */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Secure Card Details
        </label>

        <div className="rounded-lg border border-gray-300 p-4 transition focus-within:border-[#0A3D91] focus-within:ring-2 focus-within:ring-[#0A3D91]/10">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>

      {/* Demo Notice */}
      <div className="rounded-xl border border-green-200 bg-green-50 p-4">
        <div className="flex items-start gap-3">
          <Lock
            size={18}
            className="mt-0.5 text-green-600"
          />

          <div>
            <p className="font-semibold text-green-700">
              Secure Demo Payment
            </p>

            <p className="mt-1 text-sm text-green-600">
              This checkout uses <strong>Stripe Test Mode</strong>. No real
              money will be charged.
            </p>
          </div>
        </div>
      </div>

      {/* Test Card */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <h4 className="font-semibold text-[#0A3D91]">
          Test Card
        </h4>

        <div className="mt-3 space-y-1 text-sm text-gray-700">
          <p>
            <strong>Success:</strong> 4242 4242 4242 4242
          </p>

          <p>
            <strong>Declined:</strong> 4000 0000 0000 0002
          </p>

          <p>
            <strong>Expiry:</strong> Any future date
          </p>

          <p>
            <strong>CVC:</strong> Any 3 digits
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardPaymentForm;