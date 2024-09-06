<script setup>
import {PlusOutlined} from "@ant-design/icons-vue";
import {reactive, ref} from 'vue';
import {message} from "ant-design-vue";
import {deleteRepo, updateRepo, updateRepoIndex} from "../requests/api.js";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

const props = defineProps(['parentWidth', 'settings'])

const onChange = () => {
  updateRepoIndex({index: props.settings.repo})
}

const onTypeChange = () => {
  if (repo.type === 'ALI' && repo.name === '') {
    repo.name = '阿里雲盤'
  }
}

const radioStyle = reactive({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
})

const confirm = (id) => {
  deleteRepo({
    id: id,
  }).then(() => {
    props.settings.repos.splice(props.settings.repos.findIndex(v => v.id === id), 1)
    message.success(t('success'))
  })
}
const cancel = () => {
}

const open = ref(false);
const isNew = ref(false)
const title = ref(t('add_repo'))

const repo = reactive({
  id: '',
  type: 'WEBDAV',
  name: '',
  url: '',
  username: '',
  password: '',
  sum: '',
})

const showModal = (name) => {
  if (name === '') {
    isNew.value = true
    title.value = t('add_repo')
    repo.type = 'WEBDAV'
    repo.id = ''
    repo.name = ''
    repo.url = ''
    repo.username = ''
    repo.password = ''
    repo.password = ''
    open.value = true
    return
  }

  isNew.value = false
  title.value = t('update_repo')
  const item = props.settings.repos.find(v => v.name === name)
  repo.id = item.id
  repo.type = item.type
  repo.name = item.name
  repo.url = item.url
  repo.username = item.username
  repo.password = item.password
  repo.sum = item.sum
  open.value = true;
}
const handleOk = _ => {
  open.value = false
  if (isNew.value) {
    if (props.settings.repos.findIndex(v => v.name === repo.name) > -1) {
      message.success(t('failed'))
      return
    }

    updateRepo({
      type: repo.type,
      name: repo.name,
      url: repo.url,
      username: repo.username,
      password: repo.password,
    }).then((resp) => {
      props.settings.repos.push({
        id: resp.data.id,
        type: resp.data.type,
        name: resp.data.name,
        url: resp.data.url,
        username: resp.data.username,
        password: resp.data.password,
        sum: resp.data.sum,
      })
      message.success(t('success'))
    })
    return
  }
  updateRepo({
    id: repo.id,
    type: repo.type,
    name: repo.name,
    url: repo.url,
    username: repo.username,
    password: repo.password,
    sum: repo.sum,
  }).then(() => {
    const item = props.settings.repos.find(v => v.id === repo.id)
    item.type = repo.type
    item.name = repo.name
    item.url = repo.url
    item.username = repo.username
    item.password = repo.password
    item.sum = repo.sum
    message.success(t('success'))
  })
}

</script>

<template>
  <a-layout style="padding: 10px; min-height: 100%">
    <a-row>
      <a-col :span="4">
        {{ $t("repo") }}
      </a-col>
      <a-col :span="20">
        <div style="width:100%; display: flex; justify-content: flex-end;">
          <a-button type="primary" shape="round" @click="showModal('')">
            <template #icon>
              <PlusOutlined/>
            </template>
          </a-button>
        </div>
      </a-col>
      <a-col :span="24">
        <a-radio-group v-model:value="settings.repo" @change="onChange" style="width: 100%;">
          <a-list
              class="demo-loadmore-list"
              item-layout="horizontal"
              :data-source="settings.repos"
          >
            <template #renderItem="{ item, index }">
              <a-list-item style="padding: 12px 0;">
                <template #actions>
                  <a-radio :style="radioStyle" :value="index"/>
                  <a key="list-loadmore-edit" @click="showModal(item.name)">{{ $t('edit') }}</a>
                  <a-popconfirm
                      :title="$t('delete_sure')"
                      :ok-text="$t('confirm')"
                      :cancel-text="$t('cancel')"
                      @confirm="confirm(item.id)"
                      @cancel="cancel"
                  >
                    <a key="list-loadmore-more">{{ $t('delete') }}</a>
                  </a-popconfirm>
                </template>
                <a-list-item-meta
                    :title="item.name"
                    :description="item.url"
                >
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-radio-group>
      </a-col>
    </a-row>
  </a-layout>

  <a-modal :title="title" v-model:open="open" @ok="handleOk">
    <a-layout style="background: white">
      <a-space direction="vertical">
        <a-select
            ref="select"
            v-model:value="repo.type"
            style="width: 100%"
            @change="onTypeChange"
        >
          <a-select-option value="WEBDAV">WEBDAV</a-select-option>
          <a-select-option value="BOX">BOX</a-select-option>
          <a-select-option value="ALI">ALIYUNPAN</a-select-option>
        </a-select>
        <a-input v-model:value="repo.name" :placeholder="$t('name')" style="width: 100%"/>
        <a-input v-model:value="repo.url" :placeholder="$t('url')" style="width: 100%"/>
        <a-input v-model:value="repo.username" :placeholder="$t('username')" style="width: 100%"/>
        <a-input v-model:value="repo.password" :placeholder="$t('password')" style="width: 100%"/>
      </a-space>
    </a-layout>
  </a-modal>
</template>

<style scoped>
.demo-loadmore-list {
  min-height: 350px;
}
</style>
