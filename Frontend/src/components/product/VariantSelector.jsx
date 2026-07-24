import { useEffect, useMemo } from "react";

const VariantSelector = ({
  variants = [],
  selectedVariant,
  setSelectedVariant,
  selectedAttributes,
  setSelectedAttributes,
}) => {
  // Group attribute values
  const attributeGroups = useMemo(() => {
    const groups = {};

    variants.forEach((variant) => {
      Object.entries(variant.attributes || {}).forEach(([key, value]) => {
        if (!groups[key]) {
          groups[key] = new Set();
        }

        groups[key].add(value);
      });
    });

    return Object.fromEntries(
      Object.entries(groups).map(([key, values]) => [
        key,
        [...values],
      ])
    );
  }, [variants]);

  // Auto-select first available variant
  useEffect(() => {
    if (!variants.length) return;

    if (Object.keys(selectedAttributes).length === 0) {
      const first =
        variants.find((variant) => variant.stock > 0) || variants[0];

      setSelectedAttributes(first.attributes);
      setSelectedVariant(first);
      return;
    }

    const matched = variants.find((variant) =>
      Object.entries(selectedAttributes).every(
        ([key, value]) => variant.attributes[key] === value
      )
    );

    if (matched) {
      setSelectedVariant(matched);
    }
  }, [
    variants,
    selectedAttributes,
    setSelectedAttributes,
    setSelectedVariant,
  ]);

  if (!variants.length) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold text-gray-900">
        Select Options
      </h2>

      {Object.entries(attributeGroups).map(([attribute, values]) => (
        <div key={attribute}>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-sm font-medium capitalize text-gray-700">
              {attribute}
            </span>

            <span className="text-sm text-gray-500">
              {selectedAttributes[attribute]}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {values.map((value) => {
              const isSelected =
                selectedAttributes[attribute] === value;

              // Check if this option exists in stock
              const hasStock = variants.some(
                (variant) =>
                  variant.attributes[attribute] === value &&
                  variant.stock > 0
              );

              return (
                <button
                  key={value}
                  type="button"
                  disabled={!hasStock}
                  onClick={() =>
                    setSelectedAttributes((prev) => ({
                      ...prev,
                      [attribute]: value,
                    }))
                  }
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition
                    ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-indigo-500 hover:text-indigo-600"
                    }
                    ${
                      !hasStock
                        ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400 line-through"
                        : ""
                    }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VariantSelector;