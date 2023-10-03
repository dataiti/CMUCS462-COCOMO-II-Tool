const express = require("express");
const {
  userById,
  constructionById,
  getDetailConstruction,
  saveConstruction,
  updateConstruction,
  deleteConstruction,
  getListConstructionProject,
} = require("../controllers/construction.controller");

const router = express.Router();

router.get("/list-construction/:userId", getListConstructionProject);
router.get(
  "/detail-construction/:userId/:constructionId",
  getDetailConstruction
);

router.post("/save-construction/:userId", saveConstruction);

router.put("/update-construction/:userId/:constructionId", updateConstruction);

router.delete(
  "/delete-construction/:userId/:constructionId",
  deleteConstruction
);

router.param("userId", userById);
router.param("constructionId", constructionById);

module.exports = router;
