<template>
<div id="main_container">
  <div class="container">
    <ul class="tab-group">
      <li class="tab active" id="loginTab">
          <a href="#"  v-on:click="changeFormLogin()">Log In</a>
      </li>
      <li class="tab" id="regTab">
          <a href="#" v-on:click="changeFormRegistration()">Registration</a>
        </li>
    </ul>
    <div id="form_container_lgn" class="form_container_lgn">
      <form id="lgn_form" @submit.prevent="login">
        <h1>Login Here</h1>
        <div id="lgn_user">
          <label id="lg_name_label">Enter UserName : </label>
          <input type="text" id="lgusername" v-model="lgn_name" autocomplete="off"/>
        </div>
        <br /><br />
        <div id="lgn_password">
          <label id="lg_password_label">Enter PassWord : </label>
          <input type="password" id="lgpassword" v-model="lgn_password" autocomplete="off"/>
        </div>
         <p v-if="errors.length">
          <b>Pls Correct Following Errors</b>
          <ul>
              <li v-for="e in errors" :key="e.id">
                  {{e}}
              </li>
          </ul>
      </p>
        <div id="lgn_login">
          <button id="lgn_btn" type="submit">Login</button>
        </div>
      </form>
    </div>

  
    <div id="form_container_rg" class="form_container_rg">
        
      <form id="rg_form" @submit.prevent="register">
        <h1>Registartion Here</h1>
        <div id="rg_user">
          <label id="rg_name_label">Enter UserName : </label>
          <input type="text" id="username" v-model="rg_name" autocomplete="off"/>
        </div>
        <div id="rg_email">
          <label id="rg_email_label">Enter Email : </label>
          <input type="email" id="email" v-model="rg_email" autocomplete="off"/>
        </div>
        <div id="rg_password">
          <label id="rg_password_label">Enter PassWord : </label>
          <input type="password" id="password" v-model="rg_password" autocomplete="off"/>
        </div>
        <div id="rg_c_password">
          <label id="rg_c_password_label">Confirm PassWord : </label>
          <input type="password" id="password1" v-model="rg_password1" autocomplete="off"/>
        </div>
        <p v-if="errors.length">
          <b>Pls Correct Following Errors</b>
          <ul>
              <li v-for="e in errors" :key="e.id">
                  {{e}}
              </li>
          </ul>
      </p>
        <div id="rg_register">
          <button id="rg_btn" type="submit">Register</button>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
import Home from "../components/Home.vue";
//import {state} from '../store/index'
export default {
  name: "SignInUp",

  components: {
    Home,
  },

  data() {
    return {
      errors: [],
      userStringify: "",
      User: {
        usr_name: null,
        usr_email: null,
        usr_password: null,
        usr_cpassword: null,
      },
      rg_name : '',
      rg_email : '',
      rg_password : '',
      rg_password1 : '',
      lgn_name : '',
      lgn_password : '',
      isLogin: false,
      localUsers: {
        User: {},
      },
    };
  },

  methods: {
    changeFormRegistration() {
      this.errors = [];
      var loginElement = document.getElementById("form_container_lgn");
      loginElement.classList.add("hidden");
      var regElement = document.getElementById("form_container_rg");
      regElement.classList.remove("form_container_rg");
      regElement.classList.add("form_container_rg_v");
      var rgtabElement = document.getElementById("regTab");
      rgtabElement.classList.add("active");
      var lgtabElement = document.getElementById("loginTab");
      lgtabElement.classList.remove("active");
    },

    changeFormLogin() {
      this.errors = [];
      var regElement = document.getElementById("form_container_rg");
      regElement.classList.remove("form_container_rg_v");
      var rgtabElement = document.getElementById("regTab");
      rgtabElement.classList.remove("active");
      regElement.classList.add("form_container_rg");
      var loginElement = document.getElementById("form_container_lgn");
      loginElement.classList.remove("hidden");
      var lgtabElement = document.getElementById("loginTab");
      lgtabElement.classList.add("active");

      // regElement.classList.add("form_container_lgn_v");
    },

    login() {
      this.errors = [];
      if (!this.lgn_name) {
        this.errors.push("Username Is Required");
      }
      if (!this.lgn_password) {
        this.errors.push("Password is Required");
      } else {
        var userJson = JSON.parse(localStorage.getItem("User"));
        console.log("USerJson", userJson);

        if (userJson == null) {
          alert("No registrations");
        } else {
          var isValid = false;
          for (var i = 0; i < userJson.length; i++) {
            if (userJson[i].usr_name == this.lgn_name && userJson[i].usr_password == this.lgn_password)
            {
              isValid = true;
              this.$store.state.current_login ={
                current_usr : userJson[i].usr_name,
                current_email : userJson[i].usr_email,
                current_password : userJson[i].usr_password,
                current_cnf_password : userJson[i].usr_cpassword,
                current_isLogin :true
              }
              break;
            }
          }
          if (isValid) {
            console.log(userJson[0]);
            this.isLogin = this.$store.state.isLogin = true;
            //this.current_login = this.userJson;
              console.log(this.$store.state.current_login);
              this.$store.state.dctHome = true; 
            //console.log("IS Login :", this.isLogin);
            this.$router.push("/Home");
          } else {
            alert("Wrong Password");
          }

        }
      }
    },

    register() {
      this.errors = [];
      if (!this.rg_name) {
        this.errors.push("Username Is Required");
      }
      if (!this.rg_email) {
        this.errors.push("Email Is Required");
      }
      if (!this.rg_password) {
        this.errors.push("Password Is Required");
      }
      if (!this.rg_password1) {
        this.errors.push(" Confirm Password Is Required");
      } else {
        console.log(localStorage.getItem("User"));
        var userJson = JSON.parse(localStorage.getItem("User"));
        console.log("USerJson", userJson);
        if (userJson == null) {
          this.User = {
            usr_name: this.rg_name,
            usr_email: this.rg_email,
            usr_password: this.rg_password,
            usr_cpassword: this.rg_password1,
          };
          var arr = [];
          this.localUsers = this.User;
          console.log("LOCALUSER 1", this.localUsers);
          arr.push(this.localUsers);
          this.userStringify = JSON.stringify(arr);
          console.log(this.userStringify);

          localStorage.setItem("User", this.userStringify);
        } else {
          this.User = {
            usr_name: this.rg_name,
            usr_email: this.rg_email,
            usr_password: this.rg_password,
            usr_cpassword: this.rg_password1,
          };

          userJson.push(this.User);

          this.userStringify = JSON.stringify(userJson);
          console.log(this.userStringify);

          localStorage.setItem("User", this.userStringify);
        }
      }
    },
  },
};
</script>

<style>

/* Button Link */

.hidden {
  display: none;
}

.visible {
  display: block;
}

/* Both Form Container */
.container {  
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
}
/* Upside link  */
a {
  text-decoration: none;
}

.tab-group {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tab {
  display: inline-block;
  width: 50%;
  text-align: center;
  background-color:peru;
}
.tab > a {
  display: block;
  padding: 15px 0px;
  color: #fff;
  
}
.active {
  background-color: rgb(0, 113, 128);
}

/* Login Css */
.form_container_lgn {
  width: 100%;
  height: 400px;
  background-color: teal;
  color: aliceblue;
  float: left;
  background: linear-gradient(to bottom, #33ccff 0%, #ff99cc 100%);
}

h1 {
  padding-top: 15px;
}
/* Login User Div */
#lgn_user {
  padding-top: 50px;
}

/* Login Button Div  */
#lgn_login {
  margin-top: 60px;
}
#lgn_btn {
  border-radius: 10px;
  outline: 0;
  font-size: 20px;
   background-color: rgb(0, 113, 128);
  color: white;
}

/* Login Both Input text Css */
#lgusername{
     outline: 0;
     border: 0;
}

#lgpassword{
     outline: 0;
     border: 0;
}

/* Login Both Input Lable */

#lg_name_label{
    font-family :'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
#lg_password_label{
    font-family :'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

/*Registration Css  */

.form_container_rg {
  width: 400px;
  height: 500px;
  background-color: teal;
  color: white;
  margin-left: 550px;
  display: none;
  background: linear-gradient(to bottom, #33ccff 0%, #ff99cc 100%);
}

.form_container_rg_v {
  width: 400px;
  height: 600px;
  background-color: teal;
  color: white;
  display: block;
  margin-top: -22px;
   background: linear-gradient(to bottom, #33ccff 0%, #ff99cc 100%);
}

h1 {
  padding-top: 15px;
}

/* Div tag of all input in register */
#rg_user {
  padding-top: 50px;
  padding-left: 10px;
}
#rg_password {
  padding-top: 50px;
   padding-left: 10px;
}
#rg_c_password {
  padding-top: 50px;
   padding-left: 10px;
}
#rg_email {
  padding-top: 50px;
   padding-left: 10px;
}

/* Register Button */
#rg_btn {
  border-radius: 10px;
  outline: 0;
  font-size: 20px;
  background-color: rgb(0, 113, 128);
  color: white;
  margin-top: 60px;
  
}
/* #rg_register {
  margin-top: 60px;
} */

/* Registration Lable */
#rg_name_label{
    font-family :'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
#rg_email_label{
    font-family :'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
#rg_password_label{
    font-family :'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
#rg_c_password_label{
    font-family :'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}

/* Registration Input Id */
#username{
     outline: 0;
     border: 0;
}
#email{
     outline: 0;
     border: 0;
}
#password{
     outline: 0;
     border: 0;
}
#password1{
     outline: 0;
     border: 0;
}


</style>