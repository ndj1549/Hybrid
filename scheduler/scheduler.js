const { Sequelize, DataTypes, Op } = require("sequelize");
const { sequelize } = require('../startup/db')
const config = require('config')
const axios = require('axios')
var moment = require('moment')
const oracleDB = require('oracledb')
const _ = require('lodash')

const dbConfig = {
    user: config.get('connStr.oracle.user'),
    password: config.get('connStr.oracle.password'),
    connectString: config.get('connStr.oracle.db')
};


const DB = require('../models/domain/init-models')(sequelize)

const DELETE_Expired_Token_Logs = async () => {
    try {
        var a = moment();
        var yesterday = a.subtract({ hours: 25 });

        await DB.RefTokenLogs.destroy({
            where: {
                LastUpdated: {
                    [Op.lte]: yesterday
                }
            }
        })

        console.log('Old Refresh Tokens Deleted succussfully !')
    } catch(err) {
        console.log(err)
    }
}


const SYNC_SQL_WITH_ORA_Centers = async () => {
    let connection;
    try {
        connection = await oracleDB.getConnection(dbConfig);

        const list = await connection.execute("select TAF_CODE AS CenterID_Ora \
                                                     ,TAF_NAME AS CenterName \
                                               from  V_HBRD_CENTER", [], { outFormat: oracleDB.OUT_FORMAT_OBJECT });

        if (list.rows.length === 0) {
            throw new Error('No rows returned from V_HBRD_CENTER')
        }


        console.log(list.rows)


        var keyMap = {
            CENTERID_ORA: 'CenterID_Ora',
            CENTERNAME: 'CenterName'
        };

        var newList = []

        list.rows.map(item => {
            newList.push(
                _.mapKeys(item, (value, key) => {
                    return keyMap[key]
                })
            )
        });

        // console.log(newList)


        let result = await axios({
            method: 'post',
            url: 'http://localhost:5000/api/v1/centers/bulk',
            data: newList,
            timeout: 500000, // 5 minutes
            //headers: { 'X-Custom-Header': 'foobar' }
        });

        if (result.status == 200) {
            console.log('Transaction Performed Successfully ! at: ' + new Date().toLocaleTimeString())
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

const SYNC_SQL_WITH_ORA_Customers = async () => {
    let connection;
    try {
        connection = await oracleDB.getConnection(dbConfig);

        const list = await connection.execute("select * from V_HBRD_CUSTOMER  where AGENT_CODE is not null", [], { outFormat: oracleDB.OUT_FORMAT_OBJECT });

        if (list.rows.length === 0) {
            throw new Error('No rows returned from V_HBRD_CENTER')
        }


        console.log(list.rows)


        var keyMap = {
            CUSTOMER_CODE: 'CustomerID_TFOra',
            AGENT_CODE: 'CenterID',
            CUSTOMER_NAME: 'CustomerName',
            CUSTOMER_CREDIT: 'MandeEtebar',
            //...            
        };

        var newList = []

        list.rows.map(item => {
            newList.push(
                _.mapKeys(item, (value, key) => {
                    return keyMap[key]
                })
            )
        });

        // console.log(newList)


        let result = await axios({
            method: 'post',
            url: 'http://localhost:5000/api/v1/customers/bulk',
            data: newList,
            timeout: 500000, // 5 minutes
            //headers: { 'X-Custom-Header': 'foobar' }
        });

        if (result.status == 200) {
            console.log('Transaction Performed Successfully ! at: ' + new Date().toLocaleTimeString())
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

const SYNC_SQL_WITH_ORA_CustomerMandeEtebar = async () => {
    let connection;
    try {
        connection = await oracleDB.getConnection(dbConfig);

        const list = await connection.execute("select CUSTOMER_CODE, \
                                                      CUSTOMER_CREDIT from V_HBRD_CUSTOMER  ", [], { outFormat: oracleDB.OUT_FORMAT_OBJECT });

        if (list.rows.length === 0) {
            throw new Error('No rows returned from V_HBRD_CENTER')
        }


        console.log(list.rows)


        var keyMap = {
            CUSTOMER_CODE: 'CustomerID_TFOra',
            // AGENT_CODE: 'CenterID',
            CUSTOMER_CREDIT: 'MandeEtebar'
        };

        var newList = []

        list.rows.map(item => {
            newList.push(
                _.mapKeys(item, (value, key) => {
                    return keyMap[key]
                })
            )
        });

        // console.log(newList)


        let result = await axios({
            method: 'put',
            url: 'http://localhost:5000/api/v1/customers/bulk',
            data: newList,
            timeout: 500000, // 5 minutes
            //headers: { 'X-Custom-Header': 'foobar' }
        });

        if (result.status == 200) {
            console.log('Transaction Performed Successfully ! at: ' + new Date().toLocaleTimeString())
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
                                                   from V_HBRD_STUFF_DETAIL", [], { outFormat: oracleDB.OUT_FORMAT_OBJECT });

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
            url: 'http://192.168.87.61:5000/api/v1/products/bulk',
            data: list.rows,
            timeout: 500000, // 5 minutes
            //headers: { 'X-Custom-Header': 'foobar' }
        });

        if (result.status == 200) {
            console.log('Transaction Performed Successfully ! at: ' + new Date().toLocaleTimeString())
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



module.exports = {
    SYNC_SQL_WITH_ORA_Products,
    SYNC_SQL_WITH_ORA_Centers,
    SYNC_SQL_WITH_ORA_Customers,
    SYNC_SQL_WITH_ORA_CustomerMandeEtebar,
    DELETE_Expired_Token_Logs
}



