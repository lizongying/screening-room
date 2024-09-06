<script setup>
import {computed, reactive} from 'vue';
import {updateDisplayTime, updateTimeFormatIndex} from "../requests/api.js";

const props = defineProps(['parentWidth', 'settings'])

const labelWidth = computed(() => {
  return props.parentWidth > 768 ? 4 : 24
})
const valueWidth = computed(() => {
  return props.parentWidth > 768 ? 20 : 24
})

const onChange = () => {
  updateDisplayTime({display: props.settings.general.displayTime})
}

const onTimeFormatChange = () => {
  updateTimeFormatIndex({index: props.settings.general.timeFormat})
}

const radioStyle = reactive({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
})

</script>

<template>
  <a-layout style="padding: 10px; min-height: 100%">
    <a-row>
      <a-col :span="labelWidth">
        {{ $t("display_time") }}
      </a-col>
      <a-col :span="valueWidth">
        <a-switch v-model:checked="settings.general.displayTime" :checked-children="$t('display')" :un-checked-children="$t('hidden')"
                  @change="onChange"/>
      </a-col>
    </a-row>
    <a-divider/>
    <a-row>
      <a-col :span="labelWidth">
        {{ $t("time_format") }}
      </a-col>
      <a-col :span="valueWidth">
        <a-radio-group v-model:value="settings.general.timeFormat" @change="onTimeFormatChange">
          <a-radio :style="radioStyle" v-for="(item, index) in settings.general.timeFormats" :key="index" :value="index">
            {{
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
