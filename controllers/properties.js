import db from "../database.js";
import { Op } from "sequelize";
let properties = db.properties;
let likedProperty = db.likedProperty;
let ratings = db.ratings;
let categories = db.categories;
let serviceType = db.serviceType;
const User = db.User;
const pictures = db.pictures;

const registerProperty = async (req, res) => {
  let {
    name,
    description,
    price,
    serviceType,
    period,
    country,
    city,
    latitude,
    longitude,
    hasWater,
    hasElectricity,
    hasParking,
    hasFance,
    hasWifi,
    hasToilates,
    hasBathroom,
    hasKitchen,
  } = req.body;
  try {
    let data = {
      name: name,
      description: description,
      price: price,
      serviceType: serviceType,
      period: period,
      // verification_status: 0,
      // availabilty_status: 0,
      // datePublished: new Date(date.now()),
      image: req.file.filename,
      country: country,
      city: city,
      latitude: latitude,
      longitude: longitude,
      userId: req.userDetails.id,
      categoryId: 1,
      hasWater: hasWater,
      hasElectricity: hasElectricity,
      hasParking: hasParking,
      hasFance: hasFance,
      hasWifi: hasWifi,
      hasToilates: hasToilates,
      hasBathroom: hasBathroom,
      hasKitchen: hasKitchen,
    };

    await properties.create(data);

    return res.status(204).json({
      status: "success",
      message: "created successifully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
};

const getProperties = async (req, res) => {
  try {
    let items = await properties.findAll({
      include: {
        model: User,
      },
    });
    res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
};

const getMyProperties = async (req, res) => {
  try {
    let items = await properties.findAll({
      where: {
        userId: req.userDetails.id,
      },
      include: {
        model: User,
      },
    });
    res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
};

const registerCategories = async (req, res) => {
  console.log(req.file);
  let { name } = req.body;

  try {
    let checkExist = await categories.findOne({
      where: {
        categoryName: name,
      },
    });

    if (checkExist !== null) {
      return res.status(400).json({
        status: "error",
        message: "category already exist",
      });
    }

    await categories.create({
      categoryName: name,
      picture: req.file.filename,
    });

    return res.status(200).json({
      status: "success",
      message: "category addedd successifuly",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
};

// register services
const registerService = async (req, res) => {
  let { name } = req.body;

  try {
    let checkExist = await serviceType.findOne({
      where: {
        serviceName: name,
      },
    });

    if (checkExist !== null) {
      return res.status(400).json({
        status: "error",
        message: "service already exist",
      });
    }

    await serviceType.create({
      serviceName: name,
    });

    return res.status(200).json({
      status: "success",
      message: "service addedd successifuly",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
};

const uploadGallery = async (req, res) => {
  try {
    let images = req.files;

    await images.forEach((x) => {
      pictures.create({
        propertyId: req.params.propertyId,
        pictureName: x.filename,
      });
    });

    return res.status(200).json({
      status: "success",
      message: "pictures uploaded successifully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
};

const getPropertyService = async (req, res) => {
  let service = await serviceType.findAll();
  return res.status(200).json(service);
};

const getProCategories = async (req, res) => {
  try {
    let propCtaegories = await categories.findAll();

    const newCategories = [];
    await propCtaegories.forEach((x) => {
      newCategories.push({
        name: x.dataValues.categoryName,
        pictureUrl: `${process.env.BASE_URL}/uploads/${x.dataValues.picture}`,
      });
    });

    return res.status(200).json(newCategories);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    let item = await properties.findOne({
      where: {
        propertyId: req.params.id,
      },
    });
   return res.status(200).json(item);
  } catch (error) {
   return res.status(500).json({ message: "internal server error" });
  }
};

const deleteProperty = async (req, res) => {
  try {
    await properties.destroy({
      where: {
        [Op.and]: [
          { propertyId: req.params.id },
          { userId: req.userDetails.id },
        ],
      },
    });
    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

const editProperty = async (req, res) => {
  try {
    //   code goes here
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const searchProperty = async (req, res) => {
  try {
    // code goes here
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
const likeProperty = async (req, res) => {
  try {
    await likedProperty.create({
      propertyId: req.params.id,
      userId: req.userDetails.id,
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const comentProperty = async (req, res) => {
  try {
    // code goes here
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const rateProperty = async (req, res) => {
  try {
    let { star } = req.body;

    // check if rating exist per property
    const rateExist = ratings.findOne({
      where: {
        [Op.and]: [
          { userId: req.userDetails.id },
          { propertyId: req.params.id },
        ],
      },
    });

    if (rateExist !== null) {
      await ratings.update(
        { star: star },
        {
          where: {
            [Op.and]: [
              { userId: req.userDetails.id },
              { propertyId: req.params.id },
            ],
          },
        }
      );
    }

    if (rateExist === null) {
      await ratings.create({
        userId: req.userDetails.id,
        propertyId: req.params.id,
        star: star,
      });
    }

    let totalRatings = await ratings.findAll({
      where: {
        propertyId: req.params.id,
      },
      attributes: ["star"],
    });

    let sum = 0;

    for (var i = 0; i < totalRatings.length; i++) {
      return (sum += totalRatings[i]);
    }

    let averageRating = Math.round(sum / totalRatings.length);

    await properties.update(
      {
        totalRatings: averageRating,
      },
      {
        where: {
          propertyId: req.params.id,
        },
      }
    );

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export {
  registerProperty,
  getProperties,
  getMyProperties,
  registerCategories,
  uploadGallery,
  getProCategories,
  registerService,
  getPropertyService,
  getPropertyById,
  deleteProperty,
  editProperty,
  searchProperty,
  likeProperty,
  comentProperty,
  rateProperty,
};
