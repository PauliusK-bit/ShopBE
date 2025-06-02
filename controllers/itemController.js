const Item = require("../models/itemModel");

const createItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).send({ error: "Item Not found" });
    }

    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).send({ error: "Item Not found" });
    }

    res.send(updatedItem);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).send({ error: "Item Not found" });
    }

    res.send({ message: "Item was removed", data: deletedItem });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};
