<script setup>
import {computed, reactive} from 'vue';
import {updateThemeIndex} from "../requests/api.js";

const props = defineProps(['parentWidth', 'settings'])

const labelWidth = computed(() => {
  return props.parentWidth > 768 ? 4 : 24
})
const valueWidth = computed(() => {
  return props.parentWidth > 768 ? 20 : 24
})

const radioStyle = reactive({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
})

const onChange = () => {
  updateThemeIndex({themeIndex: props.settings.theme})
}
</script>

<template>
  <a-layout style="padding: 10px; min-height: 100%">
    <a-row>
      <a-col :span="labelWidth">
                        {{ $t("theme")}}
      </a-col>
      <a-col :span="valueWidth">
        <a-radio-group v-model:value="settings.theme" @change="onChange">
          <a-radio :style="radioStyle" v-for="(item, index) in settings.themes" :key="index" :value="index">{{
              $t(item.name.toLowerCase())
            }}
          </a-radio>
        </a-radio-group>
      </a-col>
    </a-row>
  </a-layout>
</template>

<style scoped>
</style>
