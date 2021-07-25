<template>
  <header class="text-gray-600 body-font">
    <div
      class="
        container
        mx-auto
        flex flex-wrap
        justify-between
        p-5
        flex-col
        md:flex-row
        items-center
      "
    >
      <router-link
        to="/"
        class="flex font-medium items-center text-gray-900 mb-4 md:mb-0"
      >
        <span class="text-xl">Crypto Zombies</span>
      </router-link>
      <nav
        v-if="state.account"
        class="md:ml-auto flex flex-wrap items-center text-base justify-center"
      >
        <router-link to="/zombie-army" class="mr-5 hover:text-gray-900">
          My Zombie Army
        </router-link>
      </nav>
      <div
        v-if="!state.isLoading && state.account"
        class="w-32 address-container mt-4 md:mt-0 mr-2"
      >
        {{ state.account }}
      </div>
      <button
        v-if="!state.isLoading && !state.account"
        class="btn btn-indigo border-0 text-base mt-4 md:mt-0"
        @click="connect"
      >
        Connect
      </button>
    </div>
  </header>
</template>

<script setup>
import { onMounted, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { helper } from "../modules/helper.js";

const store = useStore();
const router = useRouter();

const state = reactive({
  account: null,
  isLoading: true,
});

async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

async function loadAccount() {
  await requestAccount();
  state.account = await store.dispatch("loadAccount");
}

async function connect() {
  await loadAccount();
  const zombieCount = await helper.balanceOf(state.account);
  if (zombieCount > 0) {
    router.push("/zombie-army");
  } else {
    router.push("/generate-random-zombie");
  }
}

watchEffect(() => {
  window.ethereum.on("accountsChanged", async function (accounts) {
    state.account = await store.dispatch("loadAccount");
  });
});

onMounted(async () => {
  state.account = await store.dispatch("loadAccount");
  state.isLoading = false;
});
</script>
