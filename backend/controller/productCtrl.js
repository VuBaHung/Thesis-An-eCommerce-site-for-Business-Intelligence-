const express = require("express");
const Shop = require("../model/ShopModel");
const Order = require("../model/OrderModel");
const Product = require("../model/ProductModel");
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  // filtering() {
  //   const queryObj = { ...this.queryString }; //queryString = req.query

  //   const excludedFields = ["page", "sort", "limit"];
  //   excludedFields.forEach((el) => delete queryObj[el]);

  //   let queryStr = JSON.stringify(queryObj);
  //   queryStr = queryStr.replace(
  //     /\b(gte|gt|lt|lte|regex)\b/g,
  //     (match) => "$" + match
  //   );

  //   //    gte = greater than or equal
  //   //    lte = lesser than or equal
  //   //    lt = lesser than
  //   //    gt = greater than
  //   this.query.find(JSON.parse(queryStr));

  //   return this;
  // }

  // sorting() {
  //   if (this.queryString.sort) {
  //     const sortBy = this.queryString.sort.split(",").join(" ");
  //     this.query = this.query.sort(sortBy);
  //   } else {
  //     this.query = this.query.sort("-createdAt");
  //   }

  //   return this;
  // }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productCtrl = {
  createProduct: async (req, res) => {
    try {
      // console.log(req.body);
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return res.status(400).json({ msg: "The Shop is not valid." });
      } else {
        const files = req.files;
        // const imgUrls = files.map((file) => `${file.fileName}`);
        const productData = req.body;
        productData.images = req.body.images;
        productData.shop = shop;
        const product = await Product.create(productData);

        return res.status(201).json({
          product,
        });
      }
    } catch (error) {
      return console.log(error);
    }
  },

  getAllShopProduct: async (req, res) => {
    try {
      const products = await Product.find({ shopId: req.params.id });
      res.json(products);
      // return res.status(200).json({ msg: "The email already exists." });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  getProductDetail: async (req, res) => {
    try {
      const product = await Product.find({ _id: req.params.id });
      res.json(product);
      // return res.status(200).json({ msg: "The email already exists." });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  getAllProducts: async (req, res) => {
    // console.log(req.query);
    try {
      const features = new APIfeatures(Product.find(), req.query)
        // .filtering()
        // .sorting()
        .paginating();

      const allProducts = await features.query;

      // const allProducts = await Product.find();
      res.json(allProducts);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  deteleShopProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return res.status(400).json({ msg: "The product is not exist" });
      }
      return res.status(201).json({ msg: "Delete product success" });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  updateProductReview: async (req, res) => {
    try {
      const { user, comment, rating, productId, orderId } = req.body;
      const product = await Product.findById(productId);
      const review = { user, rating, comment, productId };
      if (!product) {
        return res.status(400).json({ msg: "The product is not exist" });
      }

      const isReviewedCheck = product.reviews.find(
        (rev) => rev.user._id === user._id
      );
      if (isReviewedCheck) {
        return res
          .status(400)
          .json({ msg: "You are already review for this product!" });
        // product.reviews.forEach((rev)=>{
        //   if(rev.user._id===req.user._id){
        //     rev.rating=rating,rev.comment=comment
        //   }
        // })
      } else {
        product.reviews.push(review);
        const order = await Order.findById(orderId);
        order.isReviewed = true;
        order.save();
      }
      let avg = 0;
      product.reviews.forEach((rev) => (avg += rev.rating));
      product.ratings = avg / product.reviews.length;
      product.save();

      return res.status(200).json({ product });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
module.exports = productCtrl;
