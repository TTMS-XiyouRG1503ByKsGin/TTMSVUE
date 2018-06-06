<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  font-family: sans-serif;
}
#app {
  position: relative;
  height: 100%;
}
</style>
