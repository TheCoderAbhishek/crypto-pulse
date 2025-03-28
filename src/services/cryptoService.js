// src/services/cryptoService.js

const API_BASE_URL = "https://api.coingecko.com/api/v3"; // Example API base URL

async function fetchMarketData() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error; // Re-throw the error so the Dashboard component can handle it
  }
}

// Correct way to export the function
export { fetchMarketData };

// Alternatively, you could choose to make it the default export:
// export default fetchMarketData;
// If you use the default export, your import in Dashboard.jsx would be:
// import fetchMarketData from '../services/cryptoService';
