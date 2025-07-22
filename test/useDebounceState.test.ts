import { renderHook, act } from '@testing-library/react';
import { useDebouncedState } from '../src/useDebouncedState';
import { describe, test, expect, vi } from 'vitest';

describe('useDebouncedState', () => {
  test('debounces updates', async () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useDebouncedState('start', 500));

    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('start');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(result.current[0]).toBe('new value');

    vi.useRealTimers(); // reset
  });
});