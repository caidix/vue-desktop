import { Modal } from 'ant-design-vue'
import { defineComponent, toRefs } from 'vue-demi'
import { extendSlots } from "@/utils/helper/tsxHelper";

export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  setup(props, { slots }) {
    const { visible, graggable, destoryOnClose } = toRefs(props)
    return () => {
      retrun <Modal>{extendSlots(slots)}</Modal>
    }
  }
})
