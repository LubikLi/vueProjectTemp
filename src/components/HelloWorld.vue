<template>
  <div id="helloWorld" class="ly_flex ly_flex_col ly_flex_just_start">
    <img src="../assets/img/logo.png">
    <p class="ly_text_center">让青春吹动你的长发,让他牵引你的梦</p>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
<style lang="scss" scoped>
  #helloWorld {
    overflow: hidden;
    @include center;
    @include  wh(240px, initial);
    p {
      @include fontSizeColor($size14, $font-graw)
    }
  }

</style>
