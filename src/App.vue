<template>
  <!-- <div id="app"> -->
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      bacimg: {
        backgroundImage: 'url(' + require('../static/img/bailu.jpg') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  }
}
</script>

<style>
@import './icons/iconfont/iconfont.css';
/* html,body {
  height: 100%;
} */
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding:0px;
  margin:0px;
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  border:hidden;
  background:#E0FFFF
} */
</style>
