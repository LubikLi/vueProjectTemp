<template>
  <div>
    <el-upload
      :action="uploadImgUrl"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-success="successClick"
      :before-upload="judgeTypeClick"
      :headers="header"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :limit="number"
      :file-list="files"
      :on-exceed="beyondClick">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'upLoad',
    props: {
      number: {
        type:Number,
        default: 1
      },
      files:Array
    },
    computed: {
      ...mapGetters({
        'accountInfo': 'accountInfo'
      })
    },
    data () {
      return {
        //上传图片
        uploadImgUrl:'',
        dialogImageUrl: '',
        dialogVisible: false,
        header: {
          token: ''
        },
      }
    },
    created(){
      this.uploadImgUrl = this.$api.upLoadImgApi
    },
    mounted() {
      this.header.token = this.accountInfo.token
    },
    methods: {
      //删除时调用
      handleRemove(file, fileList) {
        // if(file.response !== undefined){
        //   this.$emit("deletePic",file.response.data)
        //   this.$message.success('删除成功');
        // }else if(file.physicalPath !== undefined){
        //   this.$emit("deletePic",file);
        //   this.$message.success('删除成功');
        // }
      },
      beforeRemove(file, fileList) {

      },
      //处理图片预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      //成功时调用
      successClick(file){
        this.$emit("addPic",file)
        this.$message.success('上传成功');
      },

      //判断
      judgeTypeClick(file){
        var type = file.name.split('.')[1];
        if( type === 'jpg' || type === 'jpeg' || type === 'gif' || type === 'png'){
          if(file.size  <  1024*1024*5 ){
            return true;
          }
          this.$message.warning('上传图片大小不能超过 5MB!');
          return false;
        }
        this.$message.warning('上传图片必须是 jpg/jpeg/gif/png 格式');
        return false;
      },

      //超出规定数量调用
      beyondClick(){
        this.$message.warning('超出数量范围,只支持上传'+this.number+'张');
      },

      //图片回显
      getPic(files) {
        console.log(files)
        this.files = files;
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
