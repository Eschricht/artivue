import { type Component, type PropType, type SlotsType, type UnwrapNestedRefs, computed, defineComponent, h, toRefs } from 'vue'
import type { PartialTheme, Theme } from '../types'
import { useThemeLayer } from '../composables'

interface Props {
  as?: string | Component
  multiplier?: number
  theme?: PartialTheme | ((parent: Theme, isParentDark: boolean) => PartialTheme)
}

export const ThemeLayer = defineComponent({
  name: 'ThemeLayer',
  inheritAttrs: false,
  props: {
    as: {
      type: [String, Object] as PropType<Props['as']>,
      default: undefined,
      required: false,
    },
    multiplier: {
      type: Number,
      default: undefined,
      required: false,
    },
    theme: {
      type: [Object, Function] as PropType<Props['theme']>,
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
      id,
      _multiplier,
    } = useThemeLayer(arg, multiplier)

    return () => {
      if (props.as) {
        return h(props.as, {
          ...attrs,
          class: [className.value, attrs.class],
        }, slots.default({
          theme: newTheme.value,
          generatedTheme: generatedTheme.value,
          isDark: isDark.value,
          className: className.value,
          id: id.value,
          _multiplier: _multiplier.value,
        }))
      }
      else {
        return slots.default({
          theme: newTheme.value,
          generatedTheme: generatedTheme.value,
          isDark: isDark.value,
          className: className.value,
          id: id.value,
          _multiplier: _multiplier.value,

        })
      }
    }
  },
})
