import {
  Truck,
  RotateCcw,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
  },
  {
    icon: RotateCcw,
    title: "7 Days Return",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
  },
  {
    icon: BadgeCheck,
    title: "Original Products",
  },
];

const DeliveryInfo = () => {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Icon
                size={18}
                className="text-indigo-600 shrink-0"
              />
              <span>{feature.title}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DeliveryInfo;