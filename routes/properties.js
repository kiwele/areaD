import express from "express";
import multer from 'multer';
import path from 'path';
import { verifyaccessToken } from "../middlewares/auth.js";
import {
  comentProperty,
  deleteProperty,
  editProperty,
  getMyProperties,
  getProCategories,
  getProperties,
  getPropertyById,
  getPropertyService,
  likeProperty,
  rateProperty,
  registerCategories,
  registerProperty,
  registerService,
  searchProperty,
  uploadGallery,
} from "../controllers/properties.js";

const router = express.Router();


// handle upload issues
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({ storage });


router.post("/register", upload.single('file'), verifyaccessToken, registerProperty);
router.get("/properties", verifyaccessToken, getProperties);
router.get('/my_properties', verifyaccessToken, getMyProperties )
router.post("/properties/:id", verifyaccessToken, getPropertyById);
router.post('/gallery/:propertyId', upload.array('files'), uploadGallery)
router.post("/delete/:id", verifyaccessToken, deleteProperty);
router.post("/edit/:id", verifyaccessToken, editProperty);
router.post("/search", verifyaccessToken, searchProperty);
router.post("/like/:id", verifyaccessToken, likeProperty);
router.post("/comment/:id", verifyaccessToken, comentProperty);
router.post("/rate/:id", verifyaccessToken, rateProperty);

// property categories and categories
router.post('/add_categories',upload.single('file'), registerCategories)
router.get('/categories', getProCategories)
router.post('/add_service', registerService)
router.get('/service_type', getPropertyService)

let propertiesRouter = router;
export default propertiesRouter;
