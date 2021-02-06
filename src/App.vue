<template>
  <div id="nav">
    <!-- <router-link to="/">SignInUp</router-link> |
    <router-link to="/Home">Home</router-link> -->
    <router-view/>
  </div>
  
</template>

<script>
export default {

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  

}
body{
    /* background-image: url('C:\\Users\\choks\\OneDrive\\Desktop\\pexels-photo.jpg');
    background-repeat: no-repeat; */
    background-color :#f9f9f9;
    background-size: 100%;
    margin-top: 10px;
}

#nav {
  padding: 30px;
   
}

/* #nav a {
  font-weight: bold;
  color:white;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
