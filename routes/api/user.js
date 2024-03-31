const express=require('express')
const router=express.Router({mergeParams:true})
const userController=require('../../controller/userController')

router.get('/fetch',userController.fetch)
router.put('/edit/:id', userController.resetPassword)
router.delete('/delete/:id', userController.delete);
router.delete('/adminDelete/:id', userController.adminDelete);

module.exports=router;