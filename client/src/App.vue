<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <header>
    <img alt="logo" class="logo" src="@/assets/logo.png" width="125" height="125" />

    <div class="wrapper">
      <Header msg="clientLink" />
      <nav>
        <RouterLink to="/">Clients</RouterLink>
        <RouterLink to="/contacts">Contacts</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1rem;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  transition: transform .15s;
}

.logo:hover {
  transform: scale(1.1);
}

nav {
  width: 100%;
  font-size: 14px;
  text-align: center;
  margin-top: 1.5rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
