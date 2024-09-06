<script setup>
import {computed, ref} from 'vue';
import {search} from "../requests/api.js";
import {message} from "ant-design-vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

const props = defineProps(['parentWidth', 'settings'])

const labelWidth = computed(() => {
  return props.parentWidth > 768 ? 4 : 24
})
const valueWidth = computed(() => {
  return props.parentWidth > 768 ? 20 : 24
})

const value = ref('');

const onSearch = searchValue => {
  const query = searchValue.trim()
  if (query.length > 0) {
    search({query: searchValue.trim()}).then(_ => {
      message.success(t('search'), query)
    })
  } else {
    message.success(t('search_empty'))
  }
};
</script>

<template>
  <a-layout style="padding: 10px; min-height: 100%">
    <a-row>
      <a-col :span="labelWidth">
        {{ $t("search") }}
      </a-col>
      <a-col :span="valueWidth">
        <a-input-search
            v-model:value="value"
            :placeholder="$t('search')"
            enter-button
            @search="onSearch"
        />
      </a-col>
    </a-row>
  </a-layout>
</template>

<style scoped>
</style>
