<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
import trTR from 'ant-design-vue/lib/locale-provider/tr_TR'
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  mixins: [AppDeviceEnquire],
  data () {
    return {
      locale: trTR
    }
  },
  mounted () {

  }
}
</script>
