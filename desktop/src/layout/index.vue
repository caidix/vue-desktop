<template>
  <div class="cd-layout-header">
    <div class="left-options"></div>
    <div class="right-options">
      <full-screen />
      <template v-for="item in iconList" :key="item.icon">
        <span
          class="iconfont"
          :class="'icon-' + item.icon"
          v-on="item.eventObject || {}"
        ></span>
      </template>
      <div class="timer">
        {{ week }} {{ year }}/{{ month }}/{{ day }}
        {{ hour + ':' + minute + ':' + second }} {{ meridiem }}
      </div>
    </div>
  </div>
  <div class="cd-layout-body">
    <button @click="showModal">Open Modal</button>
    <a-modal v-model:visible="visible" title="Basic Modal">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
    <router-view />
  </div>
</template>

<script>
import FullScreen from './components/FullScreen.vue'
import { useNow } from '@/hooks/useNow'
import { Modal } from 'ant-design-vue'
import { ref } from 'vue'
export default {
  components: {
    FullScreen,
    [Modal.name]: Modal
  },
  setup() {
    const { ...state } = useNow(true)
    const visible = ref(false)

    const showModal = () => {
      visible.value = true
    }
    const iconList = [
      {
        icon: 'GitHub',
        tips: 'github',
        eventObject: {
          click: () => window.open('https://github.com/caidix')
        }
      },
      {
        icon: 'setting',
        tips: '网站设置'
      },
      {
        icon: 'LockShield',
        tips: '锁屏',
        eventObject: {
          click: () => console.log('lock')
        }
      }
    ]
    return {
      ...state,
      iconList,
      visible,
      showModal
    }
  }
}
</script>

<style lang="less">
.cd-layout-body {
  padding-top: 30px;
  height: 100vh;
  box-sizing: border-box;
}
.cd-layout-header {
  position: fixed;
  top: 0;
  height: 30px;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .right-options {
    display: flex;
    align-items: center;
    margin-right: 10px;
    .timer {
      margin-left: 10px;
      font-size: 14px;
    }
    .iconfont {
      margin: 0 10px;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        color: #1890ff;
      }
    }
  }
}
</style>
