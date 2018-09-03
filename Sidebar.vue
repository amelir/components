<template>
  <div v-if="visible" class="sidebar">
    <div class="brand">amelir</div>
    <div class="links">
      <router-link v-for="link in links" :key="link.to" :to="{name: link.to}">{{link.label}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      visible: true,
      links: []
    }
  },

  beforeMount(){
    this.checkRoute(this.$route);
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
        this.visible = false;
        return;
      }

      const sidebarConfig = currentComponent.components.default.sidebar;

      if(!sidebarConfig){
        this.visible = false;
        return;
      }else{
        this.visible = true;
      }

      this.links = sidebarConfig.links;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'components/colors.scss';
  $color: #2e4051;

  .sidebar{
    background-color: $color;
    position: fixed;
    height: 100vh;
    overflow-y: auto;
    overflow-y: overlay;
    padding-bottom: 2em;
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
  @import 'components/colors.scss';
  $width: 15em;

  @media screen and (min-width: $mobile-break){
    .sidebar{
      width: $width;

      + .main{
        margin-left: $width;
        width: calc(100vw - $width);
      }
    }
  }
</style>
