let Mock = require("mockjs")
// /aa 拦截
let arr = ["zhangsan","list","wangwu","zhaoliu"]
// /api/aa
// Mock.mock("/api/aa","get",(options)=>{
//     console.log(options); //{url:"/api/aa",type:"get",body:null}
//     return arr;
// })
// 正则 /api/aa \/
Mock.mock(/\/api\/aa/,"get",(options)=>{
    //console.log(66,options); //{url:"/api/aa",type:"get",body:null}
    return arr;
})

// 第二个接口
Mock.mock("/api/ab","post",(options)=>{
    console.log(11,options); 
    return {
        status:200,
        message:"success",
        data:arr
    }
})