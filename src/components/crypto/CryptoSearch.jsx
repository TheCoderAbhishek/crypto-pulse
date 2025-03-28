import React from "react";

function CryptoSearch({ searchTerm, onSearch }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search Cryptocurrencies..."
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        value={searchTerm}
        onChange={onSearch}
      />
      {searchTerm && (
        <button
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
          onClick={() => onSearch({ target: { value: "" } })} // Clear search
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default CryptoSearch; // Make sure this line is present!
