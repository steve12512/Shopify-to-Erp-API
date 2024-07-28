const { fetchShopifyOrders } = require('../services/shopifyService');
const { pushOrdersToERP } = require('../services/erpService');

const syncOrders = async (req, res) => {
    try {
        const orders = await fetchShopifyOrders();
        await pushOrdersToERP(orders);
        res.status(200).send('Orders synced successfully');
    } catch (error) {
        console.error('Error syncing orders:', error);
        res.status(500).send('Error syncing orders');
    }
};

module.exports = {
    syncOrders,
};
