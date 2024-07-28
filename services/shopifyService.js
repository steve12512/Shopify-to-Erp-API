const axios = require('axios');

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_SHOP_URL = process.env.SHOPIFY_SHOP_URL;

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

const updateShopifyProduct = async (productId, productData) => {
    try {
        const url = `https://${SHOPIFY_SHOP_URL}/admin/api/2021-01/products/${productId}.json`;
        await axios.put(url, { product: productData }, {
            headers: {
                "X-Shopify-Access-Token": SHOPIFY_API_KEY,
                "Content-Type": "application/json"
            }
        });
        console.log(`Product ${productId} updated successfully.`);
    } catch (error) {
        console.error(`Error updating product ${productId}: ${error}`);
    }
};

const createShopifyProduct = async (productData) => {
    try {
        const url = `https://${SHOPIFY_SHOP_URL}/admin/api/2021-01/products.json`;
        await axios.post(url, { product: productData }, {
            headers: {
                "X-Shopify-Access-Token": SHOPIFY_API_KEY,
                "Content-Type": "application/json"
            }
        });
        console.log('Product created successfully.');
    } catch (error) {
        console.error(`Error creating product: ${error}`);
    }
};

module.exports = {
    fetchShopifyOrders,
    updateShopifyProduct,
    createShopifyProduct,
};
