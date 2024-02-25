const express=require('express')
const router=express.Router({mergeParams:true})
const userController=require('../../controller/userController')

router.get('/fetch',userController.fetch)
router.delete('/delete/:id', userController.delete)
router.put('/edit/:id', userController.resetPassword)

module.exports=router;