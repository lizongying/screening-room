import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import {createI18n} from 'vue-i18n'

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            "screening_room": "Screening Room",
            "sync": "Sync",
            "home": "Home",
            "settings": "Settings",
            "theme": "Theme",
            "dark": "Dark",
            "light": "Light",
            "language": "Language",
            "general": "General",
            "display_time": "Display Time",
            "display": "Display",
            "hidden": "Hidden",
            "time_format": "Time Format",
            "repo": "Repo",
            "success": "Success",
            "failed": "Failed",
            "edit": "Edit",
            "delete": "delete",
            "delete_sure": "Are you sure delete this?",
            "add_repo": "Add Repo",
            "update_repo": "Update Repo",
            "confirm": "Confirm",
            "cancel": "Cancel",
            "search": "Search",
            "search_empty": "Search is empty",
            "name": "Name",
            "url": "Url",
            "username": "Username",
            "password": "Password",
            "buy_ali": "Buy Aliyunpan",
        },
        'zh-CN': {
            "screening_room": "放映厅",
            "sync": "同步",
            "home": "主页",
            "settings": "设置",
            "theme": "主题",
            "dark": "黑暗",
            "light": "明亮",
            "language": "语言",
            "general": "常规",
            "display_time": "显示时间",
            "display": "显示",
            "hidden": "隐藏",
            "time_format": "时间格式",
            "repo": "仓库",
            "success": "成功",
            "failed": "失败",
            "edit": "编辑",
            "delete": "删除",
            "delete_sure": "确认删除吗?",
            "add_repo": "增加仓库",
            "update_repo": "更新仓库",
            "confirm": "确认",
            "cancel": "取消",
            "search": "搜索",
            "search_empty": "搜索为空",
            "name": "名称",
            "url": "链接",
            "username": "用户",
            "password": "密码",
            "buy_ali": "购买阿里云盘",
        },
        'zh-TW': {
            "screening_room": "放映廳",
            "sync": "同步",
            "home": "主頁",
            "settings": "設置",
            "theme": "主題",
            "dark": "黑暗",
            "light": "明亮",
            "language": "語言",
            "general": "常規",
            "display_time": "顯示時間",
            "display": "顯示",
            "hidden": "隱藏",
            "time_format": "時間格式",
            "repo": "倉庫",
            "success": "成功",
            "failed": "失敗",
            "edit": "編輯",
            "delete": "刪除",
            "delete_sure": "確認刪除嗎?",
            "add_repo": "增加倉庫",
            "update_repo": "更新倉庫",
            "confirm": "確認",
            "cancel": "取消",
            "search": "搜索",
            "search_empty": "搜索為空",
            "name": "名稱",
            "url": "鏈接",
            "username": "用戶",
            "password": "密碼",
            "buy_ali": "購買阿里雲盤",
        },
    },
});

createApp(App).use(Antd).use(i18n).mount('#app')
