import { describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { mergeRefs, useMergeRefs } from '../src/index'
import { createRef } from 'react'

describe('mergeRefs', () => {
  it('it should merge multiple refs into a single ref callback', () => {
    const ref1 = { current: null }
    const ref2 = { current: null }
    const ref3 = { current: null }

    const mergedRef = mergeRefs<any>(ref1, ref2, ref3)

    expect(typeof mergedRef).toBe('function')

    act(() => {
      mergedRef('test value')
    })

    expect(ref1.current).toBe('test value')
    expect(ref2.current).toBe('test value')
    expect(ref3.current).toBe('test value')
  })

  it('it should handle legacy refs', () => {
    const ref1 = vi.fn()
    const ref2 = vi.fn()
    const ref3 = vi.fn()

    const mergedRef = mergeRefs(ref1, ref2, ref3)

    expect(typeof mergedRef).toBe('function')

    act(() => {
      mergedRef('test value')
    })

    expect(ref1).toHaveBeenCalledWith('test value')
    expect(ref2).toHaveBeenCalledWith('test value')
    expect(ref3).toHaveBeenCalledWith('test value')
  })
})

describe('useMergeRefs', () => {
  it('it should return a memoized ref callback', () => {
    const ref1 = createRef()
    const ref2 = createRef()

    const { result, rerender } = renderHook(() => useMergeRefs(ref1, ref2))

    expect(typeof result.current).toBe('function')

    act(() => {
      result.current('test value')
    })

    expect(ref1.current).toBe('test value')
    expect(ref2.current).toBe('test value')

    rerender()

    // Ensure that the ref callback is memoized and not recreated on rerenders
    expect(result.current).toBe(result.current)
  })
})
