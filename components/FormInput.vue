<template>
  <div v-bind:class="{input: true, focus: active}">
    <label :for="name">{{label}}</label>
    <input ref="input" v-bind="$attrs" v-on:input="focus" v-on:focus="focus" v-on:blur="focus" :id="name"/> 
  </div>
</template>

<script>
export default {
  inheritAttrs: false,

  props: ['name', 'label'],

  data(){
    return {
      active: false
    }
  },

  methods: {
    focus(e){
      this.active = Boolean(e.target.value.trim())
    }
  }
}
</script>


<style lang="scss" scoped>
  @import '../settings.scss';
  
  .input{
    position: relative;
    border: 1px solid #bbb;
    height: 2.5em;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
    transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;

    label{
      position: absolute;
      top: 50%;
      left: 0.7em;
      transform: translateY(-50%);
      color: #888;
      transition: all 0.2s ease-in-out;
      user-select: none;
      cursor: text;
    }

    input{
      height: 100%;
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      padding: 0 0.7em;
      box-sizing: border-box;
      font-size: 16px;
      font-family: 'Source Sans Pro', sans-serif;
    }

    &.focus, &:focus-within{
      label{
        top: 0;
        padding: 0 5px;
        background-color: #fff;
        box-sizing: border-box;
        z-index: 1;
        font-size: 14px;
        cursor: default;
      }

      &:focus-within{
        border-color: $blue;
        box-shadow: 0 0 1px 0 $blue;

        label{
          color: $blue;
        }
      }
    }
  }
</style>
