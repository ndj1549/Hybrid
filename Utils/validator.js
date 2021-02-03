const { check, param } = require('express-validator')


const Insert_Order_ValidationRules = () => {
    return [
        check('CustomerID_TFOra')
            .notEmpty(),
        check('ShipAddress')
            .notEmpty(),
        // check('ShipCity')
        //     .notEmpty()
        //     .isNumeric(),
        check('OrderDetails.*.ProductID')
            .notEmpty()
            .withMessage('اجباری')
            .isNumeric()
            .withMessage('مقدار عددی مجاز'),
        check('OrderDetails.*.Quantity')
            .notEmpty()
            .withMessage('اجباری')
            .isNumeric()
            .withMessage('مقدار عددی مجاز'),
        check('OrderDetails.*.PackgID')
            .notEmpty()
            .withMessage('اجباری')
            .isNumeric()
            .withMessage('مقدار عددی مجاز'),
        check('OrderDetails.*.PackSize')
            .notEmpty()
            .withMessage('اجباری')
            .isNumeric()
            .withMessage('مقدار عددی مجاز'),
        check('OrderDetails.*.Price_SingleItem')
            .notEmpty()
            .withMessage('اجباری')
            .isNumeric()
            .withMessage('مقدار عددی مجاز'),
        check('OrderDetails.*.TotalPrice_AfterTax')
            .notEmpty()
            .withMessage('اجباری')
            .isNumeric()
            .withMessage('مقدار عددی مجاز'),
        check('OrderDetails.*.Tax')
            .notEmpty()
            .withMessage('اجباری')
            .isNumeric()
            .withMessage('مقدار عددی مجاز'),
        check('OrderDetails.*.Avarez')
            .notEmpty()
            .withMessage('اجباری')
            .isNumeric()
            .withMessage('مقدار عددی مجاز'),

    ]
}



const FROM_TO_ValidationRules = () => {
    return [
        param('FROM').custom(_Validate_Date_Format),
        param('TO').custom(_Validate_Date_Format)
    ]
}


const Product_PageID_ValidationRule = () => {
    return [
        param('page')
            .notEmpty().withMessage('پارامتر اجباری')            
            .isNumeric().withMessage('مقدار عددی')
    ]
}


const _Validate_Date_Format = value => {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!value.match(regEx)) { //return false;  // Invalid format
        return Promise.reject('Wrong Format, use like: (1397-05-24)');
    }
    var d = new Date(value);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) { //return false; // NaN value, Invalid date
        return Promise.reject('Wrong Format, use like: (1397-05-24)');
    }
    //return d.toISOString().slice(0, 10) === value;
    if(d.toISOString().slice(0, 10) !== value) {
        return Promise.reject('Wrong Format, use like: (1397-05-24)');
    }
    
    return Promise.resolve()
}

module.exports = {
    Insert_Order_ValidationRules,
    FROM_TO_ValidationRules,
    Product_PageID_ValidationRule
}