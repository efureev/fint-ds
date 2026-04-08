import { describe, expect, it, vi } from 'vitest'
import { useToast } from '@/composables/useToast'

describe('useToast', () => {
  it('push adds toast and dismiss removes it', () => {
    const { list, push, dismiss, clear } = useToast()

    clear()
    const id = push({ title: 'Hello', message: 'World', variant: 'info', timeoutMs: 0 })

    expect(list.value.length).toBe(1)
    expect(list.value[0]?.id).toBe(id)

    dismiss(id)
    expect(list.value.length).toBe(0)
  })

  it('auto dismisses after timeout', async () => {
    vi.useFakeTimers()

    const { list, push, clear } = useToast()
    clear()
    push({ title: 'Auto', timeoutMs: 100 })

    expect(list.value.length).toBe(1)
    await vi.advanceTimersByTimeAsync(120)
    expect(list.value.length).toBe(0)
  })
})
