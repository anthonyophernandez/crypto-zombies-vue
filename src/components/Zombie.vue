<template>
  <div class="relative flex flex-row p-8">
    <span class="absolute text-xs bottom-0 left-0 mb-2 ml-3 text-gray-500">
      {{ zombie.owner }}
    </span>
    <span class="absolute text-xs top-0 right-0 mt-2 mr-3 text-gray-500">
      {{ zombie.dna }}
    </span>
    <span class="absolute text-xs bottom-0 right-0 mb-2 mr-3 text-gray-500">
      W: {{ zombie.winCount }} L: {{ zombie.lossCount }}
    </span>
    <div class="w-1/3 mr-3 inline-flex flex-col items-center justify-center">
      <div
        class="circle w-12 h-12 mb-6 inline-flex items-center justify-center"
      >
        <span>{{ zombieId }}</span>
      </div>
      <span class="mb-4 text-gray-900 text-lg font-medium">
        {{ zombie.name }}
        <span class="ml-2 text-xs text-gray-500">
          lvl. {{ zombie.level }}
        </span>
      </span>
      <button
        v-if="state.account"
        class="btn btn-indigo mx-auto border-0 text-xs"
        @click="levelUp(zombieId)"
      >
        Level Up
      </button>
    </div>
    <ul class="w-2/3 border-l-2 border-gray-300 p-2">
      <li
        class="text-xs ml-4 my-2"
        v-for="(value, key) in zombie.details"
        :key="key"
      >
        {{ key }} : {{ value }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { helper } from "../modules/helper.js";

import {
  watchEffect,
  onUpdated,
  onMounted,
  defineProps,
  reactive,
  toRefs,
} from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  zombieId: Number,
});

const { zombieId } = toRefs(props);

const state = reactive({
  account: null,
  zombieCount: 0,
});

const zombie = reactive({
  id: null,
  owner: null,
  name: null,
  dna: null,
  level: null,
  winCount: null,
  lossCount: null,
  details: {
    headGene: null,
    eyeGene: null,
    shirtGene: null,
    skinColorGene: null,
    eyeColorGene: null,
    clothesColorGene: null,
  },
});

async function levelUp(zombieId) {
  await helper.levelUp(zombieId);
  zombie.level++;
}

async function setZombieDetails(id, zombieFetched) {
  zombie.id = id.toString();
  zombie.owner = await helper.getOwner(zombie.id);
  zombie.name = zombieFetched.name.toString();
  zombie.level = zombieFetched.level;
  zombie.winCount = zombieFetched.winCount;
  zombie.lossCount = zombieFetched.lossCount;

  const dnaStr = zombieFetched.dna.toString();
  zombie.dna = dnaStr;

  zombie.details.headGene = (dnaStr.substring(0, 2) % 7) + 1;
  zombie.details.eyeGene = (dnaStr.substring(2, 4) % 11) + 1;
  zombie.details.shirtGene = (dnaStr.substring(4, 6) % 6) + 1;
  zombie.details.skinColorGene = parseInt((dnaStr.substring(6, 8) / 100) * 360);
  zombie.details.eyeColorGene = parseInt((dnaStr.substring(8, 10) / 100) * 360);
  zombie.details.clothesColorGene = parseInt(
    (dnaStr.substring(10, 12) / 100) * 360
  );
}
watchEffect(() => {
  window.ethereum.on("accountsChanged", async function (accounts) {
    state.account = await store.dispatch("loadAccount");
  });
});
onMounted(async () => {
  const zombieFetched = await helper.getZombieById(zombieId.value);
  setZombieDetails(zombieId.value, zombieFetched);
});

onUpdated(async () => {
  state.account = await store.dispatch("loadAccount");
  const zombieFetched = await helper.getZombieById(zombieId.value);
  setZombieDetails(zombieId.value, zombieFetched);
});
</script>

<style></style>
