<template>
  <div v-if="sidebarStore.visible" v-bind:class="{open: sidebarStore.mobileOpen}" class="sidebar">
    <div class="brand">amelir</div>
    <div class="links">
      <router-link v-for="link in sidebarStore.links" :key="link.to" :to="{name: link.to}">{{link.label}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  beforeMount(){
    this.checkRoute(this.$route);
  },

  computed: {
    sidebarStore(){
      return this.$store.state.sidebar;
    }
  },

  watch: {
    $route(to){
      this.checkRoute(to);
    }
  },

  methods: {
    checkRoute(route){
      const components = [...route.matched].reverse();

      // Find closest component with sidebar config
      const currentComponent = components.find(obj => {
        if(typeof obj.components === 'undefined'){
          return false;
        }

        if(typeof obj.components.default === 'undefined'){
          return false;
        }

        return typeof obj.components.default.sidebar !== 'undefined';
      });

      if(!currentComponent){
        this.$store.commit('toggleSidebar', false);
        return;
      }

      const sidebarConfig = currentComponent.components.default.sidebar;

      if(!sidebarConfig){
        this.$store.commit('toggleSidebar', false);
        return;
      }else{
        this.$store.commit('toggleSidebar', true);
      }

      this.$store.commit('setSidebarLinks', sidebarConfig.links);
    },


  }
}
</script>

<style lang="scss" scoped>
  @import '../settings.scss';
  $color: #2e4051;
  $width: 15em;

  .sidebar{
    width: 15em;
    background-color: $color;
    position: fixed;
    height: 100vh;
    overflow-y: auto;
    overflow-y: overlay;
    padding-bottom: 2em;
    z-index: 11;

    @media screen and (max-width: $mobile-break){
      transform: translateX(-100%);
      transition: transform 0.4s ease, box-shadow 0.4s ease;

      &.open{
        transform: translateX(0);
        box-shadow: 0 0 20px 2px rgba(#000, 0.75);
      }
    }
  }

  .brand{
    height: 55px;
    line-height: 55px;
    font-size: 28px;
    text-align: center;
    box-sizing: border-box;
  }

  .links{
    width: 100%;
    margin-top: 2em;

    a{
      display: block;
      padding: 0.75em 0 0.75em 2em;
      color: #efefef;
      user-select: none;
      text-decoration: none;
      cursor: pointer;

      &:hover{
        background-color: lighten($color, 10%);
      }

      &.router-link-exact-active{
        background-color: darken($green, 15%);
        color: #fff;
      }
    }
  }
</style>

<style lang="scss">
  @import '../settings.scss';
  $width: 15em;

  @media screen and (min-width: $mobile-break){
    .sidebar + .main{
      margin-left: $width;
      width: calc(100vw - $width);
    }
  }

  @media screen and (max-width: $mobile-break){
    .main::before{
      content: '';
      position: fixed;
      display: block;
      height: 100vh;
      width: 100vw;
      transition: background-color 0.3s ease;
      z-index: 9;
      pointer-events: none;
    }

    .sidebar.open + .main::before{
      background-color: rgba(#000, 0.2);
      pointer-events: auto;
    }
  }
</style>
