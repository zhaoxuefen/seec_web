<template>
  <div>
    <h3>数据的增删改查</h3>
    <el-table :data="tableData" style="width:100%">
      <el-table-column label="日期" prop="date" width="100px" align="center"></el-table-column>
      <el-table-column label="姓名" prop="name" width="100px" align="center"></el-table-column>
      <el-table-column label="地址" prop="address" width="400px" align="center">
        <template slot="header" slot-scope="scope">
          <!-- slot 和 slot-scope 干什么的 -->
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
      </el-table-column>
      <el-table-column label="修改" width="300px" align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-button @click="addfn">增加新用户</el-button>
    </div>
    <!-- 表单 -->
    <MyDialog
      @my_cancel="cancelfn"
      :form="form"
      :formLabelWidth="formLabelWidth"
      :dialogFormVisible="dialogFormVisible"
      @confirmfn_my="confirmfn"
    ></MyDialog>
    <!-- 增加的弹窗 -->
    <AddDialog @my-addcancel="addcancelfn" @my_addconfirmfn="addconfirmfn" :incrementform="incrementform"
     :addform="addform" :formLabelWidth="formLabelWidth"></AddDialog>
    <!-- <button @click="getkan">看数据改了没</button> -->
  </div>
</template>

<script>
import dayjs from "dayjs"
import instance from "../api/api"
import MyDialog from "@/components/MyDialog"
import AddDialog from "@/components/AddDialog"
    export default {

        name:"Index",
        components:{
          MyDialog,
          AddDialog
        },
        data(){
            return{
                search:"",
                tableData:[],
                dialogFormVisible:false, //表单显示隐藏
                form: {//表单的内容
                    index:0,
                    date:null,
                    name:"",
                    address:""
                } ,
                formLabelWidth:"120px",
                incrementform:false,//决定表单显示隐藏
                addform:{ //增加表单绑定的数据
                  date:null,
                  name:"",
                  address:""
                }
            }
        },
        created() {
            this.getall()
        },
        methods: {
          // 增加取消功能
          addcancelfn(){

          },
           // 增加确定功能
          addconfirmfn(){
              this.incrementfn()
              .then(()=>{
                this.$message({
                  type:"success",
                  message:"添加成功",
                  duration:3000,
                  onClose:()=>{
                     this.incrementform = false
                     this.getall()
                  }
                })
              })
              .catch(()=>{

              })
          },
            addfn(){
              this.incrementform = true
            },
            // getkan(){
            //   instance.get("/all")
            //   .then(res=>{
            //     console.log(123,res);
            //   })
            // },
            handleEdit(scope) {
              console.log(scope.row)
             
              this.form = scope.row;
              // this.form.date = JSON.stringify(this.form.date)
              this.form.index = scope.$index // 当前修改的索引
              console.log(11111111,this.form);
              
              this.dialogFormVisible = true;
            },
            handleDelete(scope) {
               console.log(scope);
               this.$confirm("确定删除吗","提升",{
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
               }).then(()=>{
                 //异步 this.deletefn(scope.$index)
                  this.deletefn(scope.$index).then(()=>{
                     this.$message({
                     type: 'success',
                     message: '删除成功!'
                    });
                  })
                   
                  // alert 同步
               }).catch(()=>{
                   this.$message({
                   type: 'info',
                   message: '已取消删除'
                  });       
               })
              //  this.deletefn(scope.$index)
            },
           
            confirmfn(){
              this.dialogFormVisible = false
              
              this.form.date = dayjs(new Date(this.form.date)).format("YYYY-MM-DD")
              console.log(this.form.date);
              
              // this.form.date = this.form.date.toDateString();
              // console.log(this.form,"98");

              this.updatefn();
            },
            cancelfn(){
              this.dialogFormVisible = false
            },
            // 修改业务
            async updatefn() {
              let {date,name,address,index} = this.form
              let {data} = await instance.put("/update",{date,name,address,index})
              console.log(data);
            },
            // 删除业务
            async deletefn(index){
              let {data} = await instance.delete("/delete",{params:{index}})
              console.log(data);
              this.getall() //删除完 在重新获取数据
            },
            // 增加业务
            async incrementfn(){
                let {date,name,address} = this.addform
                let {data} = await instance.post("/add",{date,name,address})
                console.log(data);
                
            },
            // 请求数据的业务
            async getall(){
                let {data} = await instance.get("/all")
                console.log(data);
                this.tableData = data.data
            }
        },
    }
</script>

<style lang="sass" scoped>

</style>= 