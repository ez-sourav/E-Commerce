import { useEffect, useMemo } from "react";

const VariantSelector = ({
  variants = [],
  setSelectedVariant,
  selectedAttributes,
  setSelectedAttributes,
}) => {
  // Group all attribute values
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
      Object.entries(groups).map(([key, values]) => [key, [...values]])
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
    } else {
      setSelectedVariant(null);
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
      <h2 className="text-lg font-semibold text-gray-900">
        Select Options
      </h2>

      {Object.entries(attributeGroups).map(([attribute, values]) => (
        <div key={attribute}>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-sm font-bold capitalize text-gray-800">
              {attribute} :
            </span>

            <span className="text-sm font-medium text-gray-700">
              {selectedAttributes[attribute]}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {values.map((value) => {
              const isSelected =
                selectedAttributes[attribute] === value;

              // Check if selecting this value creates a valid combination
              const nextSelection = {
                ...selectedAttributes,
                [attribute]: value,
              };

              const matchedVariant = variants.find(
                (variant) =>
                  variant.stock > 0 &&
                  Object.entries(nextSelection).every(
                    ([key, val]) => variant.attributes[key] === val
                  )
              );

              // Pattern C
              // Enable the button if ANY in-stock variant contains this value.
              const isAvailable = variants.some(
                (variant) =>
                  variant.stock > 0 &&
                  variant.attributes[attribute] === value
              );

              return (
                <button
                  key={value}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => {
                    // Exact match exists
                    if (matchedVariant) {
                      setSelectedAttributes(nextSelection);
                      setSelectedVariant(matchedVariant);
                      return;
                    }

                    // Pattern C
                    // Find the first valid variant having the selected value
                    const nearestVariant =
                      variants.find(
                        (variant) =>
                          variant.stock > 0 &&
                          variant.attributes[attribute] === value &&
                          Object.entries(selectedAttributes).every(
                            ([key, val]) =>
                              key === attribute || variant.attributes[key] === val
                          )
                      ) ||
                      variants.find(
                        (variant) =>
                          variant.stock > 0 &&
                          variant.attributes[attribute] === value
                      );

                    if (!nearestVariant) return;

                    setSelectedAttributes(nearestVariant.attributes);
                    setSelectedVariant(nearestVariant);
                  }}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all
                      ${isSelected
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : isAvailable
                        ? "border-gray-300 bg-white text-gray-700 hover:border-indigo-500 hover:text-indigo-600 hover:cursor-pointer"
                        : "border-gray-200 bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed"
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