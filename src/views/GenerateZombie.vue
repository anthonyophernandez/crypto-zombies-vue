<template>
  <div v-if="state.zombieCount == 0" class="container px-5 py-24 mx-auto flex">
    <div class="w-1/2 mx-auto flex flex-col card p-8">
      <h2 class="text-gray-900 text-lg mb-1 font-medium">
        Generate a Random Zombie
      </h2>
      <div class="mb-4">
        <label for="name" class="leading-7 text-sm text-gray-600"> Name </label>
        <input
          type="text"
          name="name"
          v-model="state.name"
          class="w-full input-field outline-none"
        />
      </div>
      <button
        class="btn btn-indigo border-0 text-lg"
        @click="generate(state.name)"
      >
        Generate
      </button>
    </div>
  </div>
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
  zombieCount: null,
  name: "",
});

async function generate(name) {
  await helper.generateRandomZombie(name);
  router.push("/zombie-army");
}

watchEffect(() => {
  window.ethereum.on("accountsChanged", async function (accounts) {
    state.account = await store.dispatch("loadAccount");
  });
});

onMounted(async () => {
  state.account = await store.dispatch("loadAccount");
  state.zombieCount = await helper.balanceOf(state.account);
});
</script>
