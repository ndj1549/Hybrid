
const { MyErrorHandler } = require('../../../Utils/error')
const { Sequelize, DataTypes } = require("sequelize")
const { sequelize } = require('../../../startup/db')




const List_Category_Of_Products = async (req, res, next) => {
  try {
    var cats = require('../../../models/domain/Product_Repository')(sequelize, DataTypes)

    const allCats = await cats.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('Category_L1_ID')), 'Category_L1_ID'],
        'Category_L1_Name'],
      where: {
        CENTERID: req.user.CID
      }
    });
    res.status(200).send(allCats)
  } catch (err) {
    next(err)
  }
}





const List_Products = async (req, res, next) => {
  try {
    var productRepo = require('../../../models/domain/Product_Repository')(sequelize, DataTypes)

    const allProducts = await productRepo.findAll({
      where: {
        CENTERID: req.user.CID
      }
    });
    res.status(200).send(allProducts)
  } catch (err) {
    next(err)
  }
}




const List_Products_By_Category = async (req, res, next) => {
  try {
    var productRepo = require('../../../models/domain/Product_Repository')(sequelize, DataTypes)

    const allProducts = await productRepo.findAll({
      where: {
        Category_L1_ID: req.params.catID
      }
    });
    res.status(200).send(allProducts)
  } catch (err) {
    next(err)
  }
}


const List_Products_By_Category_Paginated = async (req, res, next) => {
  try {
    const Count_Per_page = 10;
    let page = req.params.page && req.params.page == 0 ? 1 : req.params.page;
    console.log('page = ' + page)

    if (!page) {
      List_Products_By_Category(req, res, next)
    } else {
      var productRepo = require('../../../models/domain/Product_Repository')(sequelize, DataTypes)

      await productRepo.findAndCountAll({
        where: {
          Category_L1_ID: req.params.catID
        },
        order: [],
        limit: Count_Per_page,
        offset: Count_Per_page * (page - 1),
      }).then(function (result) {
        res.status(200).send(result);
      });
    }

  } catch (err) {
    next(err)
  }
}

const Bulk_Insert_Products = async (req, res, next) => {
  // Note:
  // This is how to disable Foreign keys and enable them again after your desired operation
  // sequelize.transaction(function(t) {
  //   var options = { raw: true, transaction: t }

  //   sequelize
  //     .query('SET FOREIGN_KEY_CHECKS = 0', null, options)
  //     .then(function() {
  //       return sequelize.query('truncate table myTable', null, options)
  //     })
  //     .then(function() {
  //       return sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, options)
  //     })
  //     .then(function() {
  //       return t.commit()
  //     })
  // }).success(function() {
  //   // go on here ...
  // })

  let tran1;

  try {
    tran1 = await sequelize.transaction();
    var productModel = require('../../../models/domain/Product_Repository')(sequelize, DataTypes)


    await productModel.destroy({ where: {}, transaction: tran1 });
    await productModel.bulkCreate(req.body, { transaction: tran1 });

    // commit
    await tran1.commit();
    res.status(200).send('OK');



  } catch (err) {
    await tran1.rollback();// Is this the right place?
    next(err)
  }
}

const Increment_Product_Mojudi = async (req, res, next) => {

  try {
    var productModel = require('../../../models/domain/Product_Repository')(sequelize, DataTypes)

    productModel.increment('MOJUDI', {
      by: Number(req.params.input),
      where: {
        [Op.and]: [
          { PRODUCTIDORA: Number(req.params.productID) },
          { CENTERID: Number(req.params.centerID) },
        ]
      }
    })

    res.sendStatus(200)

  } catch (err) {
    next(err)
  }
}


const Set_Mojudi_Kala = async (req, res, next) => {
  try {
    var productModel = require('../../../models/domain/Product_Repository')(sequelize, DataTypes)

    await productModel.update({ MOJUDI: Number(req.params.input) }, {
      where: {
        [Op.and]: [
          { PRODUCTIDORA: Number(req.params.productID) },
          { CENTERID: Number(req.params.centerID) },
        ]
      }
    })

    res.sendStatus(200)

  } catch (err) {
    next(err)
  }
}



// const Simple_Select_EagerLoad = async (req, res, next) => {
//   try {
//     const productRepo = require('../../../models/domain/Product_Repository')(sequelize, DataTypes)
//     const ProductImage = require('../../../models/domain/ProductImage')(sequelize, DataTypes)

//     const allProducts = await productRepo.findAll({
//       include: {
//         model: ProductImage,
//       }
//     });
//     res.status(200).send(allProducts)
//   } catch (err) {
//     next(err)
//   }
// }





module.exports = {
  List_Category_Of_Products,
  List_Products,
  List_Products_By_Category,
  List_Products_By_Category_Paginated,
  //Simple_Select_EagerLoad,
  //Update_Product_Attributes,
  Bulk_Insert_Products,
  Set_Mojudi_Kala,
  Increment_Product_Mojudi
}