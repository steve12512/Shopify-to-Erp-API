const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const { sync_Shopify_Orders_toErp } = require('./controllers/shopifyController');
const { sync_Erp_ProductsToShopify } = require('./controllers/erpController');

//sync orders from Shopify to ERP
app.get('/sync-orders', sync_Shopify_Orders_toErp);

//sync ERP products to Shopify
app.get('/sync-products', sync_Erp_ProductsToShopify);

//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
