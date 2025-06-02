const Category = require("../models/categoryModel");

const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCategories = async (req, res) => {
  try {
    const subjectId = req.query._subjectId;

    const filter = {};
    if (subjectId) {
      filter.subjectId = subjectId;
    }
    const categories = await Category.find(filter);
    res.send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).send({ error: "Category Not found" });
    }

    res.send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).send({ error: "Category Not found" });
    }

    res.send(updatedCategory);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).send({ error: "Category Not found" });
    }

    res.send({ message: "Category was removed", data: deletedCategory });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
