const customer_schema = require('../model/customer_schema')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');
module.exports = {
    customer_register_controller: async (req, res) => {

        const {
            email,
            phone_number,
            password,
            name,
            address,
            area,
            city,
            pincode,

        } = req.body
        try {
            const user = await customer_schema.findOne({ $or: [{ email }, { phone_number }] })
            if (user) {
                return res.status(400).json({
                    message: 'user already exist'
                })
            }

            const hash_password = await bcrypt.hash(password, 10);

            const userdata = new customer_schema({
                email,
                phone_number,
                password: hash_password,
                name,
                address,
                area,
                city,
                pincode,
            })

            await userdata.save();
            res.status(200).json({
                message: 'Your account is created',
                userdata: userdata
            })

        } catch (error) {
            res.status(500).json({
                message: 'Server error'
            })
        }
    },

    customer_login_controller: async (req, res) => {
        const { email, password } = req.body;

        const customer = await customer_schema.findOne({ email });
        if (customer) {
            const hased_password = await bcrypt.compare(password, customer.password);
            if (hased_password) {
                // console.log("--------------------")
                const token = jwt.sign({id:customer._id}, process.env.SECRET_KEY);
                res.cookie('ct', token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true,
                });
                res.status(200).json({
                    message: 'user login successfull',
                    userData: customer
                })
            } else {
                res.status(400).json({
                    message: 'wrong credencial'
                })
            }
        } else {
            res.status(400).json({
                message: 'please register first'
            })
        }
    },

    customer_update_controller: async (req, res) => {
        try {

            const update = await customer_schema.findOneAndUpdate({ _id: req.params.customerId }, req.body, {
                new: true
            })

            if (update) {
                res.status(200).json({
                    message: 'Customer detail updated successfully'
                })
            } else {
                res.status(400).json({
                    message: 'Customer detail not updated'
                })
            }

        } catch (error) {
            res.status(500).send('error')
        }
    },

}