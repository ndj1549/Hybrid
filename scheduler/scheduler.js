const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require('../startup/db')
const config = require('config')
const axios = require('axios')
const oracleDB = require('oracledb')

const dbConfig = {
    user: config.get('connStr.oracle.user'),
    password: config.get('connStr.oracle.password'),
    connectString: config.get('connStr.oracle.db')
};




const SYNC_SQL_WITH_ORA_Products = async () => {
    let connection;
    try {
        connection = await oracleDB.getConnection(dbConfig);

        const list = await connection.execute("select KALA_CODE AS ProductIDOra, \
                                                   CENTER_TAF AS CenterID, \
                                                   KALA_NAME AS Title,\
                                                   MOJODI AS Mojudi,\
                                                   KALA_VAHED AS Vahed,\
                                                   KALA_NERKH AS Price,\
                                                   RASTE_ID AS Category_L1_ID,\
                                                   RASTE_NAME AS Category_L1_Name,\
                                                   PACK_ID AS PackageIDOra,\
                                                   PACK_NAME AS PackageName,\
                                                   PACK_VALUE AS PackageQuantity,\
                                                   PACK_WEIGHT AS PackageWeight\
                                                   from V_STUFF_DETAIL", [], { outFormat: oracleDB.OUT_FORMAT_OBJECT });

        if (list.rows.length === 0) {
            throw new Error('No rows returned from V_STUFF_DETAIL')
        }



        // let output = [];
        // list.rows.map(rec => {
        //     let obj = new OrderModel(rec);
        //     output.push(obj);
        // });

        console.log(list.rows)

        // let tran1;
        // tran1 = await sequelize.transaction();
        // var productModel = require('../models/domain/Product_Repository')(sequelize, DataTypes)


        // await productModel.destroy({ where: {} }, { transaction: tran1 });
        // await productModel.bulkCreate(list.rows, { transaction: tran1 });

        // // commit
        // await tran1.commit();



        // const FormData = require('form-data');
        // const form = new FormData();
        // form.append('my_field', 'my value');
        // form.append('my_buffer', new Buffer(10));
        // form.append('my_file', fs.createReadStream('/foo/bar.jpg'));
        // axios.post('https://example.com', form, { headers: form.getHeaders() })

        let result = await axios({
            method: 'post',
            url: 'http://localhost:5000/api/v1/products/bulk',
            data: list.rows,
            timeout: 500000, // 5 minutes
            headers: { 'X-Custom-Header': 'foobar' }
        });

        if(result.status == 200) {
            console.log('Transaction Performed Successfully ! at: '+ new Date().toLocaleTimeString())
        } else {
            console.log('Sync Operation failed')
            console.log(result)
        }


    } catch (err) {
        console.log(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}



module.exports = SYNC_SQL_WITH_ORA_Products



