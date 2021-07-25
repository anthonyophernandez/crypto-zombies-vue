<template>
  <h2 class="text-center text-2xl font-semibold text-gray-500">Zombie Army</h2>
  <div v-if="state.account" class="container px-5 py-24 mx-auto grid-layout">
    <div
      class="relative select-none cursor-pointer w-full card"
      v-for="zombieId in state.zombies"
      :key="zombieId"
    >
      <router-link
        class="absolute inset-0 z-10"
        :to="{ name: 'zombie', params: { id: zombieId } }"
      >
      </router-link>
      <Zombie class="z-0" :zombieId="zombieId.toNumber()" />
    </div>
  </div>
</template>

<script setup>
import Zombie from "../components/Zombie.vue";
import { helper } from "../modules/helper.js";

import { onMounted, reactive, watchEffect } from "vue";
import { useStore } from "vuex";

const store = useStore();

const state = reactive({
  account: null,
  zombies: [],
});

async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

async function loadAccount() {
  await requestAccount();
  state.account = await store.dispatch("loadAccount");
}

watchEffect(() => {
  window.ethereum.on("accountsChanged", async function (accounts) {
    state.account = await store.dispatch("loadAccount");
    if (state.account) {
      state.zombies = await helper.getZombiesByAddress(state.account);
    }
  });
});

onMounted(async () => {
  state.account = await store.dispatch("loadAccount");
  if (state.account) {
    state.zombies = await helper.getZombiesByAddress(state.account);
  }
});
</script>

<style></style>
