import express from 'express';
import {
  createRecord,
  getAllRecords,
  updateRecordById,
  deleteRecord,
} from '../controllers/recordController';
import { 
  login,
  registerUser,
  registerMerchant,
  loginRequired,
  merchantLoginRequired,
  loginMerchant,
  verifyMerchant,
  verifyRecordCreatedby
  
  
} from '../middleware/authenticate';
import {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrderById,
  deleteOrder,
} from '../controllers/orderController';


const router = express.Router();


// RECORD ROUTES
router.post('/api/v1/records',  verifyMerchant, loginRequired, createRecord); // DONE
router.get('/api/v1/records', loginRequired, getAllRecords); // DONE 
router.put('/api/v1/records/:record_id', verifyMerchant, verifyRecordCreatedby, loginRequired, updateRecordById) // DONE
router.delete('/api/v1/records/:record_id', verifyMerchant, loginRequired, deleteRecord) // DONE


// ORDER ROUTES
router.post('/api/v1/orders', loginRequired, createOrder)// DONE
router.get('/api/v1/orders/:order_id', loginRequired, getOrder) // DONE
router.get('/api/v1/orders', loginRequired, getAllOrders) // DONE
router.put('/api/v1/orders/:order_id', loginRequired, updateOrderById) // DONE
router.delete('/api/v1/orders/:order_id', loginRequired, deleteOrder) // DONE


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