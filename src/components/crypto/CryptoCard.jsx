import React from "react";

function CryptoCard({ crypto }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        {crypto.name} ({crypto.symbol.toUpperCase()})
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Price: ${crypto.current_price}
      </p>
      <p
        className={`mt-1 text-sm font-semibold ${
          crypto.price_change_percentage_24h >= 0
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        24h Change: {crypto.price_change_percentage_24h?.toFixed(2)}%
      </p>
      <p className="text-gray-500 dark:text-gray-500 mt-1 text-sm">
        Market Cap: ${crypto.market_cap?.toLocaleString()}
      </p>
      {/* Add more details as needed */}
    </div>
  );
}

export default CryptoCard; // This is the crucial part - default export
