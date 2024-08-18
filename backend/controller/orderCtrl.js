const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../model/OrderModel");
const Product = require("../model/ProductModel");
const orderCtrl = {
  createOrder: async (req, res) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
      // Group items by its shopID
      const shopItemsMap = new Map();
      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }
      //Create order for each shop
      const orders = [];
      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }
      res.status(200).json({ success: true, orders });
    } catch (error) {
      return res.status(400).json({ msg: error });
    }
  },
  getUserOrder: async (req, res) => {
    try {
      const order = await Order.find({ "user._id": req.user.newUser._id }).sort(
        { createdAt: -1 }
      );
      if (!order) return res.status(400).json({ msg: "No order exist" });
      res.status(200).json({ order });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateOrderStatus: async (req, res) => {
    try {
      const newStatus = req.body.status;
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(400).json({ msg: "No order exists" });
      }

      order.status = newStatus;

      if (newStatus === "Delivered") {
        order.deliveredAt = Date.now();
      }

      await order.save();

      // Define the updateProduct function
      const updateProduct = async (id, qty) => {
        const product = await Product.findById(id);
        if (!product) {
          throw new Error("No product exists");
        }
        product.stock -= qty;
        product.sold_out += qty;
        await product.save();
      };

      // Only update the product stock if the status is not "Processing"
      if (newStatus !== "Processing") {
        // Use Promise.all to wait for all product updates to complete
        const updatePromises = order.cart.map((item) =>
          updateProduct(item._id, item.qty)
        );
        await Promise.all(updatePromises);
      }

      // Send the response after all operations are complete
      res.status(200).json({ order });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  refundOrder: async (req, res) => {
    try {
      const { status, orderId } = req.body;
      console.log({ status, orderId });
      const refundOrder = await Order.findById(orderId);
      if (!refundOrder) return res.status(400).json({ msg: "No order exist" });
      refundOrder.status = status;

      await refundOrder.save();
      res
        .status(200)
        .json({ refundOrder, msg: "Order refund request success!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateRefundOrder: async (req, res) => {
    try {
      const status = req.body.status;
      console.log({ status });
      const refundOrder = await Order.findById(req.params.id);
      if (!refundOrder) return res.status(400).json({ msg: "No order exist" });
      refundOrder.status = status;

      await refundOrder.save();
      res.status(200).json({ refundOrder, msg: "Success!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAdminOrders: async (req, res) => {
    try {
      if (req.admin.newUser.role === "Admin") {
        const adminOrders = await Order.find();
        return res.status(201).json({ adminOrders });
      } else {
        return res.status(500).json({ msg: "access denied" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = orderCtrl;
