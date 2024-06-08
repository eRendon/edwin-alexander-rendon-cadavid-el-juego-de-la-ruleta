<template>
  <div class="wheel-container">
    <div class="wheel"  ref="wheel">
      <div class="outerRim"></div>
      <div v-for="(number, index) in numbers" :key="index" :id="'sect' + (index + 1)" class="sect">
        <span :class="number < 10 ? 'single' : 'double'">{{ number }}</span>
        <div class="block"></div>
      </div>
      <div class="pocketsRim"></div>
      <div class="ballTrack" ref="ballTrack">
        <div class="ball" ref="ball" ></div>
      </div>
      <div class="pockets"></div>
      <div class="cone"></div>
      <div class="turret"></div>
      <div class="turretHandle">
        <div class="thendOne"></div>
        <div class="thendTwo"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const numbers = ref([0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26]);
const wheelNumberAC = ref([0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32])

const wheel = ref<HTMLDivElement | null>(null);
const ballTrack = ref<HTMLDivElement | null>(null);
const ball = ref<HTMLDivElement | null>(null);
const emits = defineEmits(['isWheel', 'onStopWheel'])

const spinWheel = async (winningSpin:number): Promise<void> => {
  emits('isWheel', true)
  try {
    let degree = 0;
    for (let i = 0; i < wheelNumberAC.value.length; i++) {
      console.log(wheelNumberAC.value[i] === winningSpin)
      if (wheelNumberAC.value[i] === winningSpin) {
        degree = (i * 9.73) + 362
      }
    }

    if (wheel.value) {
      wheel.value!.style.cssText = 'animation: wheelRotate 5s linear infinite;';
    }
    if (ballTrack.value) {
      ballTrack.value!.style.cssText = 'animation: ballRotate 1s linear infinite;';
    }

    setTimeout(() => {
      if (ballTrack.value) {

        const style = document.createElement('style');
        style.type = 'text/css';
        console.log(degree)
        style.innerText = `@keyframes ballStop {from {transform: rotate(0deg);} to {transform: rotate(-${degree}deg);}}`;
        document.head.appendChild(style);

        setTimeout(() => {
          if (ballTrack.value) {
            ballTrack.value!.style.cssText = 'animation: ballStop 3s linear;';
          }

          setTimeout(() => {
            if (ballTrack.value) {
              ballTrack.value!.style.cssText = `transform: rotate(-${degree}deg);`;
            }

            setTimeout(() => {
              if (wheel.value) {
                wheel.value!.style.cssText = '';
              }
              style.remove();
              emits('isWheel', false)
              emits('onStopWheel', true)
            }, 3000);
          }, 3000);
        }, 2000);
      }
    }, 2000);
  } catch (error) {
    console.error('Error spinning the wheel:', error);
    emits('isWheel', false)
  }
}

defineExpose({ spinWheel })
</script>

<style scoped>

.spin-ball {
  animation: 1s linear 0s infinite normal none running ballRotate;
}

.spin-wheel {
  animation: 5s linear 0s infinite normal none running wheelRotate;
}


</style>
