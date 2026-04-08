import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import DsNumberInput from '@/components/DsNumberInput.vue'

describe('DsNumberInput', () => {
  it('санитизирует ввод: оставляет только цифры и один дробный разделитель', async () => {
    const wrapper = mount(DsNumberInput, {
      props: {
        modelValue: '',
        decimalSeparator: ',',
      },
    })

    const input = wrapper.get('input')
    await input.setValue('12a3,4.5')

    expect(wrapper.emitted()['update:modelValue']?.[0]?.[0]).toBe('123,45')
  })

  it('при вводе "." или "," всегда подставляет заданный decimalSeparator', async () => {
    const wrapper = mount(DsNumberInput, {
      props: {
        modelValue: '',
        decimalSeparator: '.',
      },
    })

    const input = wrapper.get('input')
    await input.setValue('12,34')

    expect(wrapper.emitted()['update:modelValue']?.[0]?.[0]).toBe('12.34')
  })

  it('поддерживает textAlign', () => {
    const wrapper = mount(DsNumberInput, {
      props: {
        modelValue: '123',
        textAlign: 'center',
      },
    })

    const input = wrapper.get('input')
    expect(input.attributes('class')).toContain('text-center')
  })

  it('скрывает плейсхолдер на focus (через focus:placeholder:text-transparent)', () => {
    const wrapper = mount(DsNumberInput, {
      props: {
        modelValue: '',
        placeholder: '0.00',
      },
    })

    const input = wrapper.get('input')
    expect(input.attributes('class')).toContain('focus:placeholder:text-transparent')
  })

  it('horizontal controls: клиппит hover-состояние внутри общего бордера (overflow-hidden на wrapper)', () => {
    const wrapper = mount(DsNumberInput, {
      props: {
        modelValue: '1',
        controls: true,
        controlsDirection: 'horizontal',
      },
    })

    expect(wrapper.attributes('class')).toContain('overflow-hidden')
    expect(wrapper.attributes('class')).toContain('rounded-md')
  })

  it('учитывает suffix + controls: добавляет padding-right под оба аддона', () => {
    const wrapper = mount(DsNumberInput, {
      props: {
        modelValue: '1',
        size: 'md',
        controls: true,
      },
      slots: {
        suffix: 'kg',
      },
    })

    const inputEl = wrapper.get('input').element as HTMLInputElement
    // 40px (suffix) + 40px (controls) + 12px (base px-3)
    expect(inputEl.style.paddingRight).toBe('92px')

    // Суффикс внешний, а controls смещены внутрь.
    expect(wrapper.get('[data-testid="number-input-controls-vertical"]').attributes('style')).toContain('right: 40px')
  })

  it('horizontal controls: размещает кнопки слева/справа от input, а prefix/suffix остаются внешними', () => {
    const wrapper = mount(DsNumberInput, {
      props: {
        modelValue: '1',
        size: 'md',
        controls: true,
        controlsDirection: 'horizontal',
      },
      slots: {
        prefix: '$',
        suffix: 'kg',
      },
    })

    const inputEl = wrapper.get('input').element as HTMLInputElement
    // 40px (prefix) + 40px (controls) + 12px (base px-3)
    expect(inputEl.style.paddingLeft).toBe('92px')
    // 40px (suffix) + 40px (controls) + 12px (base px-3)
    expect(inputEl.style.paddingRight).toBe('92px')

    expect(wrapper.get('[data-testid="number-input-controls-horizontal-left"]').attributes('style')).toContain('left: 40px')
    expect(wrapper.get('[data-testid="number-input-controls-horizontal-right"]').attributes('style')).toContain('right: 40px')

    // Суффикс должен быть внешним (в самом правом положении).
    expect(wrapper.get('div[aria-hidden="true"][style*="right: 0px"]').exists()).toBe(true)
  })

  it('controls: stepBy увеличивает значение с учётом decimalSeparator', async () => {
    const wrapper = mount(DsNumberInput, {
      props: {
        modelValue: '1,5',
        decimalSeparator: ',',
        controls: true,
      },
    })

    await wrapper.get('button[aria-label="Increase"]').trigger('click')

    expect(wrapper.emitted()['update:modelValue']?.[0]?.[0]).toBe('2,5')
  })

  it('controls: по умолчанию использует step=1', async () => {
    const wrapper = mount(DsNumberInput, {
      props: {
        modelValue: '10',
        controls: true,
      },
    })

    await wrapper.get('button[aria-label="Decrease"]').trigger('click')
    expect(wrapper.emitted()['update:modelValue']?.[0]?.[0]).toBe('9')
  })

  it('controls: precision округляет значение при инкременте/декременте', async () => {
    const wrapper = mount(DsNumberInput, {
      props: {
        modelValue: '1,234',
        decimalSeparator: ',',
        step: 0.1,
        precision: 2,
        controls: true,
      },
    })

    await wrapper.get('button[aria-label="Increase"]').trigger('click')
    expect(wrapper.emitted()['update:modelValue']?.[0]?.[0]).toBe('1,33')
  })

  it('позволяет ограничить ширину prefix/suffix через min/max props', () => {
    const wrapper = mount(DsNumberInput, {
      props: {
        modelValue: '1',
        size: 'md',
        prefixMinWidth: '10px',
        prefixMaxWidth: '30px',
        suffixMinWidth: '20px',
        suffixMaxWidth: '40px',
      },
      slots: {
        prefix: 'very-long-prefix',
        suffix: 'very-long-suffix',
      },
    })

    const prefix = wrapper.get('[data-testid="number-input-prefix"]').element as HTMLElement
    expect(prefix.style.minWidth).toBe('10px')
    expect(prefix.style.maxWidth).toBe('30px')

    const suffix = wrapper.get('[data-testid="number-input-suffix"]').element as HTMLElement
    expect(suffix.style.minWidth).toBe('20px')
    expect(suffix.style.maxWidth).toBe('40px')
  })

  it('если реальная ширина suffix больше minWidth — увеличивает paddingRight и right-offset controls', async () => {
    const wrapper = mount(DsNumberInput, {
      props: {
        modelValue: '1',
        size: 'md',
        controls: true,
      },
      slots: {
        suffix: 'suffix',
      },
    })

    const suffix = wrapper.get('[data-testid="number-input-suffix"]').element as HTMLElement
    ;(suffix as any).getBoundingClientRect = () => ({
      width: 70,
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    })

    await wrapper.setProps({ modelValue: '2' })
    await nextTick()

    const inputEl = wrapper.get('input').element as HTMLInputElement
    // 70px (measured suffix) + 40px (controls) + 12px (base px-3)
    expect(inputEl.style.paddingRight).toBe('122px')

    expect(wrapper.get('[data-testid="number-input-controls-vertical"]').attributes('style')).toContain('right: 70px')
  })
})
