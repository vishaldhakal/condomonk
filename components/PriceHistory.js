import { formatPrice } from "@/utils/formatting";
import TimeAgo from "@/helper/timeAgo";

export default function PriceHistory({ priceHistory }) {
  if (!priceHistory || priceHistory.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Price History</h3>
      <div className="space-y-4">
        {priceHistory.map((record, index) => {
          const priceChange =
            index < priceHistory.length - 1
              ? record.price - priceHistory[index + 1].price
              : 0;

          return (
            <div
              key={record.date}
              className="flex items-center justify-between"
            >
              <div>
                <div className="font-medium">${formatPrice(record.price)}</div>
                <div className="text-sm text-gray-500">
                  <TimeAgo timestamp={record.date} />
                </div>
              </div>
              {priceChange !== 0 && (
                <div
                  className={`text-sm font-medium ${
                    priceChange > 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {priceChange > 0 ? "+" : ""}
                  {formatPrice(priceChange)}
                  <span className="text-gray-500 ml-1">
                    ({((priceChange / record.price) * 100).toFixed(1)}%)
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
