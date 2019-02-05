import express from 'express';


// RECORD CONTROLLER
import {
  createRecord,
  getAllRecords,
  updateRecordById,
} from '../controllers/recordController';

// ORDER CONTROLLER
import {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrderById,
  deleteOrder,
} from '../controllers/orderController';

// MERCHANT CONTROLLER
import {
  deleteRecord
} from '../controllers/merchantController'

// MIDDLEWARE
import { 
  login,
  registerUser,
  registerMerchant,
  loginRequired,
  loginMerchant,
  verifyMerchant,
  createdBy
} from '../middleware/authenticate';

const router = express.Router();


// RECORD ROUTES
router.post('/api/v1/records',  verifyMerchant, loginRequired, createRecord); // DONE
router.get('/api/v1/records', loginRequired, getAllRecords); // DONE 
router.put('/api/v1/records/:record_id', verifyMerchant, loginRequired, updateRecordById) // DONE
//router.delete('/api/v1/records/:record_id', verifyMerchant, loginRequired, deleteRecord) // DONE


// ORDER ROUTES
router.post('/api/v1/orders', loginRequired, createOrder)// DONE
//router.get('/api/v1/orders/:order_id', loginRequired, getOrder) // DONE
router.get('/api/v1/orders', loginRequired, getAllOrders) // DONE
router.put('/api/v1/orders/:order_id', loginRequired, updateOrderById) // DONE MAKE PRIVATE ******************
router.delete('/api/v1/orders/:order_id', loginRequired, deleteOrder) // DONE MAKE PRIVATE ******************

// MERCHANT ROUTES
// router.get('/api/v1/merchants/:merchant_id/records', loginRequired, getAllMerchantRecords) // get all records by merchant
// router.get('/api/v1/merchants/:merchant_id/orders', loginRequired, getAllMerchantOrders) // get all orders by merchant PRIVATE - find by _createdBY
// router.get('/api/v1/merchants/:merchant_id', loginRequired, getMerchant) // get merchant information 
// router.put('/api/v1/merchants/:merchant_id', loginRequired, updateMerchant) // update merchant account information PRIVATE
router.delete('/api/v1/merchants/:merchant_id/records/:record_id', loginRequired, createdBy, deleteRecord) // delete record PRIVATE

// USER ROUTES
// router.get('/api/v1/users/:user_id', loginRequired, updateUser) // get user info PRIVATE
// router.put('/api/v1/users/:user_id') // update user info PRIVATE
// router.put('/api/v1/users/:user_id/orders/:order_id') // get orders by user PRIVATE


// AUTHORIZATION ROUTES / USER ROUTES
router.post('/auth/register/user', registerUser)
router.post('/auth/login/user', login)


// AUTHORIZATION ROUTES / MERCHANT
router.post('/auth/register/merchant', registerMerchant)
router.post('/auth/login/merchant', loginMerchant)


// VIEW ROUTES
router.get('/', (req, res) => {
  res.render('home')
});







// const Merchant = mongoose.model('Merchant', MerchantSchema);

// USER ROUTES - MEAD
// router.post('/users', createUser)
// router.get('/users/me', authenticateUser, (req, res) => {
//   let token = req.header('Authorization');

//   Merchant.findByToken(token).then((user) => {
//     if(!user) {
//       return Promise.reject();
//     }
//   })

//   res.send(req.user);
// }).catch((e) => {
//   res.status(401).send();
// })

// router.post('/users', (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;
//   let body = { email, password}
//   let user = new Merchant(body)

//   user.save().then(() => {
//     return user.generateAuthToken();
//   }).then((token) => {
//     res.header('Authorization', token).send(user);
//   }).catch((e) => {
//     res.status(400).send(e)
//   })
// })


export default router;