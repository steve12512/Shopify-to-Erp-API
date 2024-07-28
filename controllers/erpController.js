const { fetchErpProducts } = require('../services/erpService');
const { updateShopifyProduct, createShopifyProduct } = require('../services/shopifyService');

const syncProductsToShopify = async (req, res) => {
    try {
        const erpProducts = await fetchErpProducts();
        for (const product of erpProducts) {
            const shopifyProductData = {
                title: product.name,
                body_html: product.description,
                vendor: product.vendor,
                variants: [{
                    price: product.price,
                    inventory_quantity: product.stock
                }]
            };

            if (product.shopify_id) {
                await updateShopifyProduct(product.shopify_id, shopifyProductData);
            } else {
                await createShopifyProduct(shopifyProductData);
            }
        }
        res.status(200).send('ERP products synced to Shopify');
    } catch (error) {
        console.error('Error syncing ERP products to Shopify:', error);
        res.status(500).send('Error syncing ERP products to Shopify');
    }
};

module.exports = {
    syncProductsToShopify,
};
