<template>
<header-layout></header-layout>
  <router-view></router-view>
  <alert></alert>
</template>

<script>
import HeaderLayout from './HeaderLayout.vue';
import Alert        from '../components/atomic/Alert.vue';

export default {
  name: 'HomeLayout',
  components: {Alert, HeaderLayout}
}
</script>

<style scoped>

</style>
