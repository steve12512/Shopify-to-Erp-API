const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_SHOP_URL = process.env.SHOPIFY_SHOP_URL;
const ERP_API_URL = process.env.ERP_API_URL;
const ERP_API_KEY = process.env.ERP_API_KEY;

//fetch orders from Shopify
const fetchShopifyOrders = async () => {
    try {
        const url = `https://${SHOPIFY_SHOP_URL}/admin/api/2021-01/orders.json`;
        const response = await axios.get(url, {
            headers: {
                "X-Shopify-Access-Token": SHOPIFY_API_KEY,
                "Content-Type": "application/json"
            }
        });
        return response.data.orders;
    } catch (error) {
        console.error("Error fetching orders from Shopify:", error);
        throw error;
    }
};

//send orders to ERP
const pushOrdersToERP = async (orders) => {
    try {
        const response = await axios.post(ERP_API_URL, orders, {
            headers: {
                "Authorization": `Bearer ${ERP_API_KEY}`,
                "Content-Type": "application/json"
            }
        });
        return response.status;
    } catch (error) {
        console.error("Error pushing orders to ERP:", error);
        throw error;
    }
};

//endpoint to sync orders from Shopify to ERP
app.get('/sync-orders', async (req, res) => {
    try {
        const orders = await fetchShopifyOrders();
        const status = await pushOrdersToERP(orders);
        res.status(status).send('Orders synced successfully');
    } catch (error) {
        res.status(500).send('Error syncing orders');
    }
});

//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
