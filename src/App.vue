<template>
  <nav class="scoped-nav">
    <router-link class="router-link" to="/">
      <button class="button-router">Home</button>
    </router-link>
    <router-link class="router-link" to="/about"
      ><button class="button-router">
        About
      </button></router-link
    >
  </nav>
  <router-view></router-view>
  <footer class="scoped-footer"></footer>
</template>
