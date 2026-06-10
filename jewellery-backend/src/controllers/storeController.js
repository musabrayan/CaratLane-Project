import Store from "../models/Store.js";

export const getStores = async (req, res) => {
  try {
    const stores = await Store.find();

    res.status(200).json({
      success: true,
      stores,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStorePulse = async (req, res) => {
  try {
    const stores = await Store.find().limit(3);
    
    // Mock live data for the sake of the demo
    const pulseStores = stores.map((store, index) => ({
      ...store.toObject(),
      isOpen: true,
      closingTime: "9:00 PM",
      distance: `${(Math.random() * 5 + 1).toFixed(1)} km`,
      crowdLevel: index === 0 ? "Busy" : "Quiet"
    }));

    res.status(200).json({
      success: true,
      pulseStores,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};