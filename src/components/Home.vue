<template>
  <div>
    <div id="logout_nav">
      <h1 id="headingTitle">User Management</h1>
      <button id="logout_btn"  v-if="isLogin" v-on:click="logoutUser()">LogOut</button>
    </div>
    <div id="table_div">
      <table id="table_id">
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Password</th>
        </tr>
        <tr v-for="(user, index) in userdata" :key="user.index">
          <td>{{ user.usr_name }}</td>
          <td>{{ user.usr_email }}</td>
          <td>{{ user.usr_password }}</td>
          <button id="edt_btn" v-on:click="editUser(user, index)">Edit</button>
          
            <button id="dlt_btn" v-on:click="deleteUser(user, index) in userdata">
              Delete
            </button>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  // props : ['isLogin'],
  data() {
    return {
      userdata: {},
      user: [],
      setfirstcol: undefined,
      isLogin: undefined,
    };
  },

  methods: {
    displayUser() {
      this.userdata = JSON.parse(localStorage.getItem("User"));
      console.log(this.userdata);
      console.log("After change :", this.$store.state.current_login);
      this.isLogin = this.$store.state.current_login.current_isLogin;
      console.log("Check first is Login", this.isLogin);
    },

    editUser(user, index) {
      //check for global var . if true then edit, else login
      this.isLogin = this.$store.state.current_login.current_isLogin;
      console.log("Check first is Login", this.isLogin);
      var selectedUserName = user["usr_name"];
      console.log(selectedUserName);
      // Store index

      console.log(this.$store.state.current_login);
      if (this.isLogin) {
        if (this.$store.state.current_login.current_usr == selectedUserName) {
          console.log("Both User Match");
          var newPass = prompt("Enter New Password");
          if (newPass != null) {
            console.log("New Pass Value is :", newPass);
            var jsonFromLocalStore = JSON.parse(localStorage.getItem("User"));

            jsonFromLocalStore[index].usr_password = newPass;

            localStorage.setItem("User", JSON.stringify(jsonFromLocalStore));
            this.$store.state.current_login.current_password = newPass;
            this.displayUser();
          } else {
            console.log("Prompt Is Empty");
          }
          //break;
        } else {
          console.log("Login and Home else part");
          alert("U can not Change anyone else data");
        }
      } else {
        alert("U r not login or register");

        //Change Value of Global isEdit, Dcthome, Row(index), userObj
        this.$store.state.isEdit = true;
        this.$store.state.userName = selectedUserName;
        this.$store.state.row = index;
        this.$router.push("/");
      }
    },

    newFuncForEdit() {
     
      if (this.$store.state.userName == this.$store.state.current_login.current_usr)
       {
        console.log("Match", this.$store.state.userName);
        console.log("Both User Match");
        var newPass = prompt("Enter New Password");
        if (newPass != null) {
          console.log("New Pass Value is :", newPass);
          var jsonFromLocalStore = JSON.parse(localStorage.getItem("User"));

          jsonFromLocalStore[this.$store.state.row].usr_password = newPass;

          localStorage.setItem("User", JSON.stringify(jsonFromLocalStore));
          this.$store.state.current_login.current_password = newPass;
          this.$store.state.isEdit = false;
          this.$store.state.dctHome = false;
          this.displayUser();
        } 
        else {
          console.log("Prompt Is Empty");
          this.$store.state.isEdit = false;
          this.$store.state.dctHome = false;
        }
      } else {
        console.log("Diff", this.$store.state.userName);
        alert("You cannot change data of other user");
        this.$store.state.isEdit = false;
        this.$store.state.dctHome = false;
      }
    },

    newFuncForDelete()
    {
      if(this.$store.state.userName == this.$store.state.current_login.current_usr)
      {
          console.log("Both User Match");
          var jsonFromLocalStore = JSON.parse(localStorage.getItem("User"));
          console.log(jsonFromLocalStore[0]);
          var tempArr = jsonFromLocalStore;
          const remainingRecords = tempArr.filter((e) => {
            return e.usr_name !== selectedUserName;
          });
          console.log(remainingRecords);
          //jsonFromLocalStore.ser[id].splice(id,1);
          localStorage.setItem("User", JSON.stringify(remainingRecords));
           this.$store.state.isDelete = false;
        this.$store.state.dctHome = false;
          this.displayUser();
        }
        else {
          this.$store.state.isDelete = false;
          this.$store.state.dctHome = false;
          alert("U can not Change anyone else data");
        }
    },

    deleteUser(user, id) {
      console.log("Delete", id);
      console.log("Delete User", user["usr_name"]);

      console.log(
        "After edit call store data in delete : ",
        this.$store.state.current_login
      );

      this.isLogin = this.$store.state.current_login.current_isLogin;
      console.log("Check first is Login", this.isLogin);
      var selectedUserName = user["usr_name"];
      console.log(selectedUserName);
      if (this.isLogin) {
        if (this.$store.state.current_login.current_usr == selectedUserName) {
          console.log("Both User Match");
          var jsonFromLocalStore = JSON.parse(localStorage.getItem("User"));
          console.log(jsonFromLocalStore[0]);
          var tempArr = jsonFromLocalStore;
          const remainingRecords = tempArr.filter((e) => {
            return e.usr_name !== selectedUserName;
          });
          console.log(remainingRecords);
          //jsonFromLocalStore.ser[id].splice(id,1);
          localStorage.setItem("User", JSON.stringify(remainingRecords));
          this.displayUser();
        } else {
          alert("U can not Change anyone else data");
        }
      } else {
        alert("U r not login or register");
        this.$store.state.isDelete = true;
        this.$store.state.userName = selectedUserName;
        this.$store.state.row = id;
        this.$router.push("/");
      }
    },

    logoutUser() {
      //localStorage.removeItem('User');
      this.isLogin = this.$store.state.current_login.current_isLogin = false;
      //console.log(this.$store.state.current_login);
      console.log(this.isLogin);
      this.$router.push("/");
    },
  },
  beforeMount() {
    this.displayUser();
    //check for isEdit or isDelete and call appropriate func if true.
    if (this.$store.state.isEdit && this.$store.state.dctHome) {
      this.newFuncForEdit();
    }
    if(this.$store.state.isDelete && this.$store.state.dctHome)
    {
      this.newFuncForDelete();
    }
  },
};
</script>
<style>
#table_div {
  margin: 20px;
  background-color: white;
  margin-right: 971px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

#table_id {
  margin-left: auto;
  margin-right: auto;
}

tr:nth-child(even) {
  background-color: #ddd;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

#logout_nav {
  background-color: #299be4;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  padding-bottom: 20px;
}

#headingTitle {
  color: white;
  font-size: 35px;
  /* float: left; */
  margin-left: 60px;
  margin-top: 0px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

#logout_btn {
  font-size: 25px;
  /* margin: 10px; */
  /* margin-top: 20px; */
  margin-right: -1200px;
  /* float: right; */
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

#edt_btn {
 border-radius: 10px;
  outline: 0;
  font-size: 20px;
   background-color: rgb(0, 113, 128);
  color: white;
  margin: 10px;
}

#dlt_btn
{
  border-radius: 10px;
  outline: 0;
  font-size: 20px;
   background-color: rgb(0, 113, 128);
  color: white;
  margin: 10px;
}
</style>