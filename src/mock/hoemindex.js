let Mock = require("mockjs")
// /aa 拦截
let dayjs = require("dayjs")
let arr = [{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小狗',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小猪',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小鸭',
    address: '上海市普陀区金沙江路 1516 弄'
  }]
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



// 请求
Mock.mock("/api/all","get",(options)=>{
    console.log(10,options); 
    return {
        status:200,
        message:"success",
        data:arr
    }
})
// 增加数据
Mock.mock("/api/add","post",(options)=>{
    console.log(45,options); 
    let body = JSON.parse(options.body)
    body.date = dayjs(new Date(body.date)).format("YYYY-MM-DD")
    console.log(body);
    arr.push(body);
    // let {date,name,address} = body
    return {
        status:200,
        message:"success",
        data:arr
    }
})
// 删除
Mock.mock(/\/api\/delete\?index=\d/,"delete",(options)=>{
    console.log(10,options); 
    let url = options.url
    let index = url.split("=")[1]
    console.log(20,index);
    let newarr = arr.splice(index,1)
    console.log(newarr); //删除后的数据
    return {
        status:200,
        message:"删除成功",
        data:arr
    }
})
// 修改
Mock.mock("/api/update","put",(options)=>{
    console.log(68,options); 
    let body = JSON.parse(options.body)
    console.log(body);
    let {date,name,address,index} = body
    arr[index].date = date
    arr[index].name = name
    arr[index].address = address
    return {
        status:200,
        message:"success",
        data:arr
    }
})