import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import CryptoCard from "../components/crypto/CryptoCard";
import { fetchMarketData } from "../services/cryptoService";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import CryptoSearch from "../components/crypto/CryptoSearch";

function Dashboard() {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const getMarketData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMarketData();
        setMarketData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching market data:", err);
        setError("Failed to load cryptocurrency data.");
        setLoading(false);
      }
    };

    getMarketData();

    // Optional: Real-time updates (polling - adjust interval as needed)
    const intervalId = setInterval(getMarketData, 15000);
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const filterCryptos = () => {
      if (!searchTerm) {
        setFilteredData(marketData);
        return;
      }
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = marketData.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(lowercasedSearchTerm) ||
          crypto.symbol.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredData(filtered);
    };

    filterCryptos();
  }, [searchTerm, marketData]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="py-8">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Real-Time Cryptocurrency Prices
        </h1>

        {/* Optional Search Bar */}
        <div className="mb-4">
          <CryptoSearch searchTerm={searchTerm} onSearch={handleSearch} />
        </div>

        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
              key="loading"
            >
              <LoadingSpinner size="lg" />
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4"
              key="error"
            >
              <ErrorMessage message={error} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              key="crypto-cards"
            >
              {filteredData.map((crypto) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  key={crypto.id}
                >
                  <CryptoCard crypto={crypto} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredData.length > 0 && (
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Data last updated: {new Date().toLocaleTimeString()}
          </p>
        )}

        {filteredData.length === 0 && !loading && !error && searchTerm && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-600 dark:text-gray-300"
          >
            No cryptocurrencies found matching "{searchTerm}".
          </motion.p>
        )}

        {filteredData.length === 0 && !loading && !error && !searchTerm && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-600 dark:text-gray-300"
          >
            No cryptocurrency data available.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export default Dashboard;
