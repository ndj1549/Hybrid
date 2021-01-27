const { check } = require('express-validator')


const Insert_Order_ValidationRules = () => {
    return [
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

module.exports = {
    Insert_Order_ValidationRules
}