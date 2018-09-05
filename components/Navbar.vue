<template>
  <header>
    <div v-if="sidebarStore.visible" v-on:click="toggleSidebar" v-bind:class="{active: sidebarStore.mobileOpen}" class="menu">
      <div/>
    </div>

    <div v-if="username" v-on:click.stop="toggleAccount" class="user">
      {{username.charAt(0).toUpperCase()}}
    </div>
    <router-link v-else :to="{name: 'account_login'}" class="btn green float">Login</router-link>

    <div v-if="accountExpanded" v-on:click.stop class="dropdown">
      <div class="pic">{{username.charAt(0).toUpperCase()}}</div>
      <div class="username">{{username}}</div>
      <div class="buttons">
        <a class="btn red">Sign Out</a>
        <router-link v-on:click.native="toggleAccount" :to="{name: 'account_settings'}" class="btn main">My Account</router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data(){
    return {
      accountExpanded: false
    }
  },

  computed: {
    sidebarStore(){
      return this.$store.state.sidebar;
    },

    username(){
      return this.$store.state.user.email;
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
    },

    toggleSidebar(){
      this.$store.commit('toggleMobileSidebar');
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../settings.scss';
  $height: 32px;

  header{
    position: relative;
    width: 100%;
    height: 55px;
    border-bottom: 1px solid #dadada;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0.5em 0.75em;
    box-sizing: border-box;

    .btn.float{
      padding: 0.5em 2em;
    }
  }

  .menu{
    position: absolute;
    left: 1em;
    height: 30px;
    width: 30px;
    padding: 5px;
    border-radius: 8px;
    transition: background-color 0.2s linear, margin-left 0.4s ease;
    z-index: 10;
    cursor: pointer;

    @media screen and (min-width: $mobile-break){
      display: none;
    }

    &:hover{
      background-color: rgba(#000, 0.1);
    }

    div{
      transition: all 1s ease;
      top: 50%;
      transform: translateY(-50%);

      &, &::before, &::after{
        content: '';
        position: absolute;
        width: 30px;
        height: 2px;
        background-color: #333;
        border-radius: 2px;
        transition: all 0.5s ease, width 0.2s;
      }

      &::before{
        margin-top: -9px;
      }

      &::after{
        margin-top: 9px;
      }
    }

    &.active{
      margin-left: 15em;

      div{
        width: 0;
      }

      div::before, div::after{
        margin-top: 0;
      }

      div::before{
        transform: rotate(45deg);
      }

      div::after{
        transform: rotate(-45deg);
      }
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
    background: #fff;
    position: absolute;
    display: flex;
    width: 10em;
    flex-direction: column;
    align-items: center;
    right: 0.75em;
    top: 100%;
    padding: 1em 2em;
    margin: 0.75em 0;
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
      margin-top: 1em;
      font-size: 12px;
      color: #888;
    }

    .buttons{
      display: flex;
      margin-top: 1em;
      justify-content: space-between;
      margin-left: -2em;
      margin-right: -2em;

      .btn{
        padding: 0.5em 0.75em;

        &:last-child{
          margin-left: 1em;
        }
      }
    }
  }
</style>
