
const { MyErrorHandler } = require('../../../Utils/error')
const { Sequelize, DataTypes, Op } = require("sequelize")
const { sequelize } = require('../../../startup/db')
const { DateTime } = require('mssql')


var DB = require('../../../models/domain/init-models')(sequelize, DataTypes)


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


    const allProducts = await DB.Product_Repository.findAll({
      where: {
        CENTERID: req.user.CID
      }
    });

    let result = allProducts.map(rec => ({ ...rec.dataValues, MOJUDI: Math.floor((rec.MOJUDI / rec.PACKAGEQUANTITY)) }));

    if (result && result.length != 0 && result[0]) {      
      if (new Date().toDateString() !== new Date(Date.parse(result[0].LASTUPDATE.toString())).toDateString()) {
        return res.status(200).send([])
        // res.status(200).send([])
        // return
      }
    }


    res.status(200).send(result)
  } catch (err) {
    next(err)
  }
}




const List_Products_By_Category = async (req, res, next) => {
  try {


    const allProducts = await DB.Product_Repository.findAll({
      where: {
        [Op.and]: [
          { Category_L1_ID: req.params.catID },
          { CENTERID: req.user.CID }
        ]
      }
    });

    let result = allProducts.map(rec => ({ ...rec.dataValues, MOJUDI: Math.floor((rec.MOJUDI / rec.PACKAGEQUANTITY)) }));

    if (result && result.length != 0 && result[0]) {
      
      if (new Date().toDateString() !== new Date(Date.parse(result[0].LASTUPDATE.toString())).toDateString()) {
        return res.status(200).send([])
        // res.status(200).send([])
        // return
      }
    }

    res.status(200).send(result)
  } catch (err) {
    next(err)
  }
}


const List_Products_By_Category_Paginated = async (req, res, next) => {
  try {
    const Count_Per_page = 10;
    let page = req.params.page && req.params.page == 0 ? 1 : req.params.page;
    // console.log('page = ' + page)

    if (!page) {
      List_Products_By_Category(req, res, next)
    } else {


      await DB.Product_Repository.findAndCountAll({
        where: {
          [Op.and]: [
            { Category_L1_ID: req.params.catID },
            { CENTERID: req.user.CID }
          ]
        },
        order: [],
        limit: Count_Per_page,
        offset: Count_Per_page * (page - 1),
      }).then(function (result) {
        let list = result.rows.map(rec => ({ ...rec.dataValues, MOJUDI: Math.floor((rec.MOJUDI / rec.PACKAGEQUANTITY)) }));

        if (list && list.length != 0 && list[0]) {
          // let q = new Date();
          // let m = q.getMonth();
          // let d = q.getDay();
          // let y = q.getFullYear();

          if (new Date().toDateString() !== new Date(Date.parse(list[0].LASTUPDATE.toString())).toDateString()) {
            return res.status(200).json({ count: 0, rows: [] });
          }
        }

        res.status(200).json({ count: result.count, rows: list });
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



    await DB.Product_Repository.destroy({ where: {}, transaction: tran1 });
    await DB.Product_Repository.bulkCreate(req.body, { transaction: tran1 });

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
    await DB.Product_Repository.increment('MOJUDI', {
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