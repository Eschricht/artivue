import { type Component, type PropType, type SlotsType, type UnwrapNestedRefs, computed, defineComponent, h, toRefs } from 'vue'
import type { BaseTheme } from '..'
import { useThemeLayer } from '../composables'

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
    default: UnwrapNestedRefs<ReturnType<typeof useThemeLayer>>
  }>,
  setup(props, { slots, attrs }) {
    const { multiplier, theme } = toRefs(props)

    const arg = computed(() => theme.value ? theme.value : multiplier.value)

    const {
      theme: newTheme,
      generatedTheme,
      className,
      isDark,
    } = useThemeLayer(arg)

    return () => {
      if (props.is) {
        return h(props.is, {
          ...attrs,
          class: [className.value, attrs.class],
        }, slots.default({
          theme: newTheme.value,
          generatedTheme: generatedTheme.value,
          isDark: isDark.value,
          className: className.value,
        }))
      }
      else {
        return slots.default({
          theme: newTheme.value,
          generatedTheme: generatedTheme.value,
          isDark: isDark.value,
          className: className.value,
        })
      }
    }
  },
})
