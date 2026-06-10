import User from "../models/User.js";
import Product from "../models/Product.js";

// @desc    Add or remove a product from reserve bag
// @route   POST /api/user/reserve
// @access  Private
export const toggleReserveBag = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const inBagIndex = user.reserveBag.findIndex(
      (item) => item.product.toString() === productId
    );

    if (inBagIndex > -1) {
      user.reserveBag.splice(inBagIndex, 1);
    } else {
      user.reserveBag.push({ product: productId });
    }

    await user.save();
    
    // Populate before returning
    await user.populate("reserveBag.product");

    res.status(200).json({
      success: true,
      reserveBag: user.reserveBag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get user's reserve bag
// @route   GET /api/user/reserve
// @access  Private
export const getReserveBag = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("reserveBag.product");
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      reserveBag: user.reserveBag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Record a viewed product
// @route   POST /api/user/journey/view
// @access  Private
export const recordProductView = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if already viewed recently (prevent spam)
    const existingViewIndex = user.viewedProducts.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingViewIndex > -1) {
      // Move to top and update time
      user.viewedProducts.splice(existingViewIndex, 1);
    }

    user.viewedProducts.unshift({ product: productId, viewedAt: Date.now() });

    // Keep only last 20 viewed products
    if (user.viewedProducts.length > 20) {
      user.viewedProducts = user.viewedProducts.slice(0, 20);
    }

    await user.save();
    await user.populate("viewedProducts.product");

    res.status(200).json({
      success: true,
      viewedProducts: user.viewedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get user's journey (viewed products + reservations)
// @route   GET /api/user/journey
// @access  Private
export const getJourney = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("viewedProducts.product");
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // You could also fetch reservations here if you want a complete timeline
    // const reservations = await Reservation.find({ userId: req.user.id }).populate('productId');

    res.status(200).json({
      success: true,
      viewedProducts: user.viewedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
