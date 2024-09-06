<script setup>
import {computed, reactive} from 'vue';
import {updateLanguageIndex} from "../requests/api.js";
import {useI18n} from "vue-i18n";

const {t, locale} = useI18n()

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
  updateLanguageIndex({languageIndex: props.settings.language})
  switch (props.settings.language) {
    case 0: {
      locale.value = 'zh-TW'
      break
    }
    case 1: {
      locale.value = 'zh-CN'
      break
    }
    case 2: {
      locale.value = 'en'
      break
    }
  }
}
</script>

<template>
  <a-layout style="padding: 10px; min-height: 100%">
    <a-row>
      <a-col :span="labelWidth">
              {{ $t("language")}}
      </a-col>
      <a-col :span="valueWidth">
        <a-radio-group v-model:value="settings.language" @change="onChange">
          <a-radio :style="radioStyle" v-for="(item, index) in settings.languages" :key="index" :value="index">{{
              item.name
            }}
          </a-radio>
        </a-radio-group>
      </a-col>
    </a-row>
  </a-layout>
</template>

<style scoped>
</style>
