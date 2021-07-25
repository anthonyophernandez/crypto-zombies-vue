<template>
  <h2 class="mb-4 text-center text-2xl font-semibold text-gray-500">
    Zombie Details
  </h2>
  <div class="select-none w-1/3 mx-auto card">
    <Zombie :zombieId="state.zombieId" />
  </div>
  <div v-if="state.account" class="flex justify-center w-full mt-2">
    <button
      class="btn btn-red border-2 border-black text-xs"
      @click="randomAttack(state.zombieId)"
    >
      Attack
    </button>
  </div>
  <div v-if="state.account" class="grid-layout px-5 py-24 mx-auto">
    <!-- Change Name -->
    <div class="w-full max-w-lg mx-auto flex flex-col card p-8">
      <h2 class="text-gray-900 text-lg mb-1 font-medium">Change Name</h2>
      <div class="mb-4">
        <label for="name" class="leading-7 text-sm text-gray-600"
          >New name
        </label>
        <input
          type="text"
          name="name"
          v-model="state.name"
          class="w-full input-field outline-none"
        />
      </div>
      <button
        class="btn btn-indigo border-0 text-lg"
        @click="changeName(state.zombieId, state.name)"
      >
        Change Name
      </button>
    </div>
    <!-- Approve -->
    <div class="w-full max-w-lg mx-auto flex flex-col card p-8">
      <h2 class="text-gray-900 text-lg mb-1 font-medium">Approve</h2>
      <div class="mb-4">
        <label for="to_approve" class="leading-7 text-sm text-gray-600"
          >To:
        </label>
        <input
          type="text"
          name="to_approve"
          v-model="state.to_approve"
          class="w-full input-field outline-none"
        />
      </div>
      <button
        class="btn btn-indigo border-0 text-lg"
        @click="approve(state.to_approve, state.zombieId)"
      >
        Approve
      </button>
    </div>
    <!-- Transfer -->
    <div class="w-full max-w-lg mx-auto flex flex-col card p-8">
      <h2 class="text-gray-900 text-lg mb-1 font-medium">Transfer</h2>
      <div class="mb-4">
        <label for="from" class="leading-7 text-sm text-gray-600">From: </label>
        <input
          type="text"
          name="from"
          v-model="state.from"
          class="w-full input-field outline-none"
        />
      </div>
      <div class="mb-4">
        <label for="to_transfer" class="leading-7 text-sm text-gray-600"
          >To:
        </label>
        <input
          type="text"
          name="to_transfer"
          v-model="state.to_transfer"
          class="w-full input-field outline-none"
        />
      </div>
      <button
        class="btn btn-indigo border-0 text-lg"
        @click="transferFrom(state.from, state.to_transfer, state.zombieId)"
      >
        Transfer
      </button>
    </div>
  </div>
</template>

<script setup>
import Zombie from "../components/Zombie.vue";
import { helper } from "../modules/helper.js";
import { reactive, watchEffect, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();

const state = reactive({
  account: null,
  zombieId: parseInt(route.params.id),
  zombies: [],
  name: null,
  to_approve: null,
  to_transfer: null,
  from: null,
});

async function randomAttack(targetId) {
  const zombieId =
    state.zombies[Math.floor(Math.random() * state.zombies.length)].toNumber();
  await helper.attack(zombieId, targetId);
}

async function changeName(zombieId, newName) {
  await helper.changeName(zombieId, newName);
}

async function approve(to_approve, zombieId) {
  await helper.approve(to_approve, zombieId);
}

async function transferFrom(from, to_transfer, zombieId) {
  await helper.transferFrom(from, to_transfer, zombieId);
}

watchEffect(() => {
  window.ethereum.on("accountsChanged", async function (accounts) {
    state.account = await store.dispatch("loadAccount");
  });
  state.zombieId = parseInt(route.params.id);
});

onMounted(async () => {
  state.account = await store.dispatch("loadAccount");
  if (state.account) {
    state.zombies = await helper.getZombiesByAddress(state.account);
  }
});
</script>

<style></style>
