const axios = require('axios');

const ERP_API_URL = process.env.ERP_API_URL;
const ERP_API_KEY = process.env.ERP_API_KEY;

const pushOrdersToERP = async (orders) => {
    try {
        await axios.post(ERP_API_URL, orders, {
            headers: {
                "Authorization": `Bearer ${ERP_API_KEY}`,
                "Content-Type": "application/json"
            }
        });
        console.log('Orders pushed to ERP successfully.');
    } catch (error) {
        console.error("Error pushing orders to ERP:", error);
        throw error;
    }
};

const fetchErpProducts = async () => {
    try {
        const response = await axios.get(ERP_API_URL, {
            headers: {
                'Authorization': `Bearer ${ERP_API_KEY}`
            }
        });
        return response.data.products;
    } catch (error) {
        console.error(`Error fetching ERP products: ${error}`);
        return [];
    }
};

module.exports = {
    pushOrdersToERP,
    fetchErpProducts,
};
