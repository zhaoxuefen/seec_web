let Mock = require("mockjs")
let arr = ["1","2","3","4"]
Mock.mock(/\/api\/acd/,"get",(options)=>{
    console.log(66,options); //{url:"/api/aa",type:"get",body:null}
    return arr;
})

// 第二个接口
Mock.mock("/api/asd","post",(options)=>{
    console.log(12,options); 
    return {
        status:200,
        message:"success",
        data:arr
    }
})