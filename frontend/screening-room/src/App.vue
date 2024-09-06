<script setup>
import {useI18n} from 'vue-i18n'
import {AppstoreOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SyncOutlined} from "@ant-design/icons-vue";
import {computed, h, onMounted, reactive, ref, watch} from "vue";
import Settings from './components/Settings.vue'
import Theme from './components/Theme.vue'
import Repo from './components/Repo.vue'
import General from './components/General.vue'
import Language from './components/Language.vue'
import Search from './components/Search.vue'
import {getSettings} from "./requests/api.js"
import {message} from "ant-design-vue";

const {t, locale} = useI18n()

const routes = {
  '/': Settings,
  '/search': Search,
  '/settings': Settings,
  '/settings/theme': Theme,
  '/settings/language': Language,
  '/settings/general': General,
  '/settings/repo': Repo,
}

const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || Settings
})

const onItemClick = (item) => {
  switch (item.key) {
    case 'home': {
      window.location.hash = '/'
      state.breadcrumb = []
      break
    }
    case 'search': {
      window.location.hash = '/search'
      state.breadcrumb = [t('search')]
      break
    }
    case 'settings': {
      window.location.hash = '/settings'
      state.breadcrumb = [t('settings')]
      break
    }
    case 'theme': {
      window.location.hash = '/settings/theme'
      state.breadcrumb = [t('settings'), t('theme')]
      break
    }
    case 'language': {
      window.location.hash = '/settings/language'
      state.breadcrumb = [t('settings'), t('language')]
      break
    }
    case 'general': {
      window.location.hash = '/settings/general'
      state.breadcrumb = [t('settings'), t('general')]
      break
    }
    case 'repo': {
      window.location.hash = '/settings/repo'
      state.breadcrumb = [t('settings'), t('repo')]
      break
    }
    default:
  }
}

const state = reactive({
  collapsed: false,
  selectedKeys: ['home'],
  openKeys: ['home'],
  preOpenKeys: ['home'],
  mainMarginLeft: '200',
  breadcrumb: []
});

const computedWidth = computed(() => `calc(100vw - ${state.mainMarginLeft}px)`)

const items = reactive([
  {
    key: 'home',
    icon: () => h(AppstoreOutlined),
    label: t('home'),
    title: t('home'),
  },
  {
    key: 'search',
    icon: () => h(AppstoreOutlined),
    label: t('search'),
    title: t('search'),
  },
  {
    key: 'settings',
    icon: () => h(AppstoreOutlined),
    label: t('settings'),
    title: t('settings'),
    children: [
      {
        key: 'theme',
        label: t('theme'),
        title: t('theme'),
      },
      {
        key: 'language',
        label: t('language'),
        title: t('language'),
      },
      {
        key: 'general',
        label: t('general'),
        title: t('general'),
      },
      {
        key: 'repo',
        label: t('repo'),
        title: t('repo'),
      },
    ],
  },
])

watch(
    () => state.openKeys,
    (_val, oldVal) => {
      state.preOpenKeys = oldVal;
    },
)

const onBreakpoint = broken => {
  state.collapsed = broken
  state.openKeys = state.collapsed ? [] : state.preOpenKeys
  state.mainMarginLeft = state.collapsed ? '0' : '200'
}

const toggleCollapsed = () => {
  onBreakpoint(!state.collapsed)
}

const viewWidth = ref(
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
);

onMounted(() => {
  window.onresize = () => {
    viewWidth.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  }
})

const settings = reactive({
  themes: [],
  theme: 0,
  languages: [],
  language: 0,
  general: {
    displayTime: false,
    timeFormats: [],
    timeFormat: 0,
  },
  repos: [],
  repo: 0,
})

onMounted(() => {
  sync()
})

function updateLabel(key, newLabel) {
  const item = items.find(item => item.key === key);
  if (item) {
    item.label = newLabel;
  }
}

const sync = () => {
  getSettings().then(resp => {
    if (resp.data === null) {
      message.error(t('failed'));
      return
    }
    settings.themes = resp.data.themes
    settings.theme = resp.data?.theme ?? 0
    settings.languages = resp.data.languages
    settings.language = resp.data.language ?? 0
    settings.general.displayTime = resp.data?.general?.display_time ?? false
    settings.general.timeFormats = resp.data.general.time_formats
    settings.general.timeFormat = resp.data?.general?.time_format ?? 0
    settings.repos = resp.data.repos
    settings.repo = resp.data?.repo ?? 0
  }).then(
      () => {
        switch (settings.language) {
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
        const titleHome = t('home')
        items[0].title = titleHome
        items[0].label = titleHome
        const titleSearch = t('search')
        items[1].title = titleSearch
        items[1].label = titleSearch
        const titleSettings = t('settings')
        items[2].title = titleSettings
        items[2].label = titleSettings
        const titleTheme = t('theme')
        items[2].children[0].title = titleTheme
        items[2].children[0].label = titleTheme
        const titleLanguage = t('language')
        items[2].children[1].title = titleLanguage
        items[2].children[1].label = titleLanguage
        const titleGeneral = t('general')
        items[2].children[2].title = titleGeneral
        items[2].children[2].label = titleGeneral
        const titleRepo = t('repo')
        items[2].children[3].title = titleRepo
        items[2].children[3].label = titleRepo
      }
  )
}
</script>

<template>
  <a-layout has-sider>
    <a-layout-sider
        breakpoint="md"
        collapsed-width="0"
        :style="{ overflow: 'auto', height: '100vh', width: '0', position: 'fixed', left: 0, top: 0, bottom: 0 }"
        :collapsed="state.collapsed"
        :trigger="null"
        @breakpoint="onBreakpoint"
        collapsible
    >
      <a-button type="primary" class="logo" @click="sync">
        <template #icon>
          <SyncOutlined/>
        </template>
        {{ $t("sync") }}
      </a-button>
      <SyncOutlined/>
      <a-menu
          v-model:openKeys="state.openKeys"
          v-model:selectedKeys="state.selectedKeys"
          mode="inline"
          theme="dark"
          :collapsed="state.collapsed"
          :items="items"
          @click="onItemClick"
      ></a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: `${state.mainMarginLeft}px`, width: '100vw', position: 'absolute', top: '0'}">
      <a-layout-header
          :style="{ background: '#fff', paddingLeft: '0', paddingRight: '24px', overflow: 'auto', height: '80px', width: computedWidth, position: 'fixed', left: `${state.mainMarginLeft}px`, top: '0'}"
      >
        <div style="display: flex; justify-content: space-between; ">
          <div style="height: 80px; display: flex; align-items: center;">
            <MenuUnfoldOutlined
                v-if="state.collapsed"
                class="trigger"
                @click="toggleCollapsed"
            />
            <MenuFoldOutlined v-else class="trigger" @click="toggleCollapsed"/>
          </div>
          <div>
            <a-breadcrumb style="height: 80px; display: flex; align-items: center;">
              <a-breadcrumb-item v-for="(item, index) in state.breadcrumb" :key="index">{{ item }}</a-breadcrumb-item>
            </a-breadcrumb>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content
          :style="{ margin: '0', padding: '24px', overflowY: 'auto', height: `calc(100vh - 160px)`, width: computedWidth, position:'fixed', top:'80px' }"
          class="site-layout-background"
      >
        <component :is="currentView" :parentWidth="viewWidth" :settings="settings"/>
      </a-layout-content>
      <a-layout-footer ref="footerRef"
                       :style="{ margin: '0', textAlign: 'center', height:'80px', width: computedWidth, position: 'fixed', left: `${state.mainMarginLeft}px`, bottom: '0' }">
        {{ $t("screening_room") }}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.logo {
  height: 32px;
  width: 168px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout-background {
  background: #141414;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>
