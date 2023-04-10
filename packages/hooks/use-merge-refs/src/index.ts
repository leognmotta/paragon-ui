import { useMemo } from 'react'
import type { LegacyRef, MutableRefObject, RefCallback } from 'react'

export function mergeRefs<T = any>(
  ...refs: Array<MutableRefObject<T> | LegacyRef<T>>
): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as MutableRefObject<T | null>).current = value
      }
    })
  }
}

export function useMergeRefs<T>(...refs: Array<MutableRefObject<T> | LegacyRef<T>>) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => mergeRefs(...refs), refs)
}
