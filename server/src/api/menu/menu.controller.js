const { Menu, User } = require('../../../db/models');
const { AppError, UploadToCloudinary, cloudinary } = require('../../utils');

const createMenu = async (req, res, next) => {
  try {
    const userId = req.userId;
    const file = req.file;
    let imageUrl = null;

    if (file) {
      const path = file.path;
      const result = await UploadToCloudinary(path, 'Dinas_Menus');
      imageUrl = result.url;
    }

    const newMenu = await Menu.create({ ...req.body, imageUrl, userId });

    res.status(201).json({
      status: 'success',
      message: 'Menu created successfully.',
      data: newMenu,
    });
  } catch (error) {
    return next(error);
  }
};

const getMenu = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const userId = req.userId;
    const menu = await Menu.findOne({ where: { id: menuId, userId } });

    if (!menu) {
      throw new AppError(404, 'Menu not found');
    }

    res.status(200).json({
      status: 'success',
      message: 'Menu retrieved successfully.',
      data: menu,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllMenus = async (req, res, next) => {
  try {
    const { limit, offset, page } = req.pagination;
    const userId = req.userId;
    const { count, rows: menus } = await Menu.findAndCountAll({
      where: { userId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'restaurantName'],
        },
      ],
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });
    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      status: 'success',
      message: 'All menus retrieved successfully.',
      data: menus,
      meta: {
        totalItems: count,
        currentPage: page,
        totalPages,
        pageSize: limit,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const userId = req.userId;
    const menu = await Menu.findOne({ where: { id: menuId, userId } });

    if (!menu) {
      throw new AppError(404, 'Menu not found');
    }

    if (menu.imageUrl) {
      const publicId = `Dinas_Menus/${menu.imageUrl.split('/').pop().split('.')[0]}`;
      await cloudinary.uploader.destroy(publicId);
    }

    await menu.destroy();

    res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

const updateMenu = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const userId = req.userId;
    const menu = await Menu.findOne({ where: { id: menuId, userId } });

    if (!menu) {
      throw new AppError(404, 'Menu not found');
    }

    if (menu.imageUrl) {
      const publicId = `Dinas_Menus/${menu.imageUrl.split('/').pop().split('.')[0]}`;
      await cloudinary.uploader.destroy(publicId);
    }

    let newImageUrl = menu.imageUrl;

    if (req.file) {
      const path = req.file.path;
      const result = await UploadToCloudinary(path, 'Dinas_Menus');
      newImageUrl = result.url;
    }

    await menu.update({ ...req.body, imageUrl: newImageUrl });
    await menu.save();

    res.status(200).json({
      status: 'success',
      message: 'Menu retrieved successfully.',
      data: menu,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createMenu, getMenu, getAllMenus, deleteMenu, updateMenu };
