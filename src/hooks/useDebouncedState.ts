import { debounce } from 'utils/function';
import { useEffect, useMemo, useState } from 'react';

/**
 * @template V
 * @param {V} initialState
 * @param {{wait: 0, enableReInitialize: boolean}} options
 */
function useDebouncedState<V>(
    initialState: V,
    options: { wait?: number; enableReInitialize?: boolean } = {}
): [V, (newState: V) => void] {
    const { wait = 0, enableReInitialize = false } = options;
    const [state, setState] = useState<V>(initialState);

    const debouncedSetState = useMemo(
        () => debounce(setState as any, wait),
        [wait]
    );

    useEffect(() => {
        if (enableReInitialize) {
            debouncedSetState(initialState);
        }
    }, [debouncedSetState, enableReInitialize, initialState]);

    return [state, debouncedSetState];
}

export default useDebouncedState;
