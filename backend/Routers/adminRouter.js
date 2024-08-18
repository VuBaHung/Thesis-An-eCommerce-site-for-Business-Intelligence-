const orderCtrl = require("../controller/orderCtrl");
const shopCtrl = require("../controller/shopCtrl");
const userCtrl = require("../controller/userCtrl");
const authAdmin = require("../middleware/authAdmin");

const router = require("express").Router();

router.get("/get-all-orders", authAdmin, orderCtrl.getAdminOrders);
router.get("/get-all-sellers", authAdmin, shopCtrl.getAllShops);
router.get("/shop-infor/:id", authAdmin, shopCtrl.getShopInfor);
router.get("/get-all-users", authAdmin, userCtrl.getAllUser);
router.delete("/delete-user/:id", authAdmin, userCtrl.deleteUser);
module.exports = router;
