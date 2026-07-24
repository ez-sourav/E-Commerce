import { Minus, Plus } from "lucide-react";

const QuantitySelector = ({ quantity, setQuantity, max }) => {
  const increase = () => {
    if (quantity < max) setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-semibold text-gray-900">Quantity</span>

      <div className="flex items-center rounded-full border border-gray-300">
        <button
          onClick={decrease}
          disabled={quantity === 1}
          aria-label="Decrease quantity"
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus size={16} />
        </button>

        <span className="min-w-10 text-center text-sm font-semibold">
          {quantity}
        </span>

        <button
          onClick={increase}
          disabled={quantity >= max}
          aria-label="Increase quantity"
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={16} />
        </button>
      </div>

      {max > 0 && (
        <span className="text-xs text-gray-400">{max} available</span>
      )}
    </div>
  );
};

export default QuantitySelector;