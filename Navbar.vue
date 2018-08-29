<template>
  <header>
    <div v-if="username" v-on:click.stop="toggleAccount" class="user">
      {{username.charAt(0).toUpperCase()}}
    </div>
    <a v-else href="/login" class="btn green float">Login</a>

    <div v-if="accountExpanded" v-on:click.stop class="dropdown">
      <div class="pic">{{username.charAt(0).toUpperCase()}}</div>
      <div class="username">{{username}}</div>
    </div>
  </header>
</template>

<script>
export default {
  data(){
    return {
      accountExpanded: false,
      username: false
    }
  },

  methods: {
    toggleAccount(){
      this.accountExpanded = !this.accountExpanded;

      // Handle event listener to close expand when clicked
      if(this.accountExpanded){
        document.addEventListener('click', this.toggleAccount);
      }else{
        document.removeEventListener('click', this.toggleAccount);
      }
    }
  },

  beforeMount(){
    // Check if we're logged in
    try{
      const username = JSON.parse(atob(localStorage.authToken.split('.')[1])).sub;

      if(username){
        this.username = username;
      }else{
        this.username = false;
      }
    }catch(e){
      this.username = false;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './colors.scss';
  $height: 32px;

  header{
    position: relative;
    width: 100vw;
    height: 55px;
    border-bottom: 1px solid #dadada;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0.5em 1em;
    box-sizing: border-box;

    .btn.float{
      padding: 0.5em 2em;
    }
  }

  .user{
    background-color: $red;
    width: $height;
    height: $height;
    line-height: $height;
    text-align: center;
    font-size: 20px;
    margin-left: auto;
    color: #fff;
    border-radius: 50%;
    user-select: none;
    cursor: pointer;
  }

  .dropdown{
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    right: 1em;
    top: 100%;
    padding: 1em 2em;
    margin: 5px 0;
    // width: 250px;
    // height: 150px;
    box-shadow: 0 2px 4px rgba(#000, 0.1);
    border: 1px solid #e5e5e5;
    border-radius: 8px;

    .pic{
      background-color: $red;
      color: #fff;
      height: 50px;
      width: 50px;
      border-radius: 50%;
      text-align: center;
      line-height: 50px;
      font-size: 25px;
      user-select: none;
      cursor: default;
    }

    .username{
      margin-top: 5px;
      font-size: 12px;
      color: #888;
    }
  }
</style>
