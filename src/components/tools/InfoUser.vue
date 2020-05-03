<template>
  <div class="info-user">
    <router-link :to="{name:'dashboard'}">
      <a-avatar size="small" icon="user" />
      <transition name="fade">
        <div class="information" v-if="fadeShowInformation">
          <h1>{{ title }}</h1>
          <p>{{ jobTitle }}</p>
        </div>
      </transition>
      <div class="">

      </div>
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'InfoUser',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: 'Deniz Arkan',
      required: false
    },
    jobTitle: {
      type: String,
      default: 'Data Warehouse Analyst',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  },

  data () {
    return {
      fadeShowInformation: true
    }
  },

  watch: {
    showTitle (val) {
      val ? setTimeout(() => { this.fadeShowInformation = val }, 200) : this.fadeShowInformation = val
    }
  }
}
</script>
<style lang="less" >
  .info-user{
    position: relative;
    height: 100px;
    padding-left: 24px;
    overflow: hidden;
    line-height: 64px;
    background: #032b3e;
    transition: all .7s;
    margin-top: 20px;
    display: flex;
    align-items: center;
    border-top: 1px solid #095f88;
    border-bottom: 1px solid #095f88;
    a{
      display: flex;
      align-items: center;
    }
    .information{
      display: grid;
    }
    img,
    svg,
    .information > h1 {
      display: inline-block;
      overflow: hidden;
      vertical-align: middle;
    }

    img,
    svg {
      height: 32px;
      width: 32px;
    }

    .information > h1 {
      color: #fff;
      font-size: 20px;
      margin: 0 0 0 12px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      font-weight: 600;
      line-height: 32px;
      vertical-align: middle;
    }
    .information > p {
      color: #fff;
      font-size: 12px;
      margin: 0 0 0 12px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      font-weight: 600;
      vertical-align: middle;
      line-height: 11px;
    }
  }
  .fade-enter-active {
    transition: all .1s ease;
  }
  .fade-leave-active {
    transition: all 0s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-enter, .fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
