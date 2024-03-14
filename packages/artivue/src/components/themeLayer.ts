import { type Component, type PropType, type SlotsType, defineComponent, h, toRefs } from 'vue'
import { type BaseTheme, useThemeLayer } from '..'

interface Props {
  is?: string | Component
  multiplier?: number
  theme?: BaseTheme
}

export const ThemeLayer = defineComponent({
  name: 'ThemeLayer',
  inheritAttrs: false,
  props: {
    is: {
      type: [String, Object] as PropType<Props['is']>,
      default: undefined,
      required: false,
    },
    multiplier: {
      type: Number,
      default: undefined,
      required: false,
    },
    theme: {
      type: Object as PropType<Props['theme']>,
      default: undefined,
      required: false,
    },
  },
  slots: Object as SlotsType<{
    default: ReturnType<typeof useThemeLayer>
  }>,
  setup(props, { slots, attrs }) {
    const { multiplier, theme } = toRefs(props)

    const {
      theme: newTheme,
      className,
      isDark,
    } = useThemeLayer(multiplier, theme.value)

    const slotContent = slots.default({
      theme: newTheme,
      isDark,
      className,
    })

    return () => {
      if (props.is) {
        return h(props.is, {
          className,
          ...attrs,
        }, slotContent)
      }
      else {
        return slotContent
      }
    }
  },
})
