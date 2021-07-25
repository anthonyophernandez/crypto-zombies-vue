<template>
  <NavBar />
  <router-view></router-view>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
</script>

<style>
.address-container {
  @apply cursor-pointer truncate py-1 px-3 text-base font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200;
}
.btn {
  @apply font-bold py-1 px-3 rounded focus:outline-none;
}
.btn-indigo {
  @apply bg-indigo-500 text-gray-200 hover:bg-indigo-600;
}
.btn-red {
  @apply bg-white text-black hover:bg-red-600 hover:text-white;
}
.input-field {
  @apply text-base text-gray-700 py-1 px-3 leading-8 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200;
}
.circle {
  @apply rounded-full bg-indigo-500 text-white;
}
.card {
  @apply bg-gray-200 rounded-lg shadow-md;
}
.grid-layout {
  @apply grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2;
}
</style>
