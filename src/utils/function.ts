/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-this-alias */
/**
 * @template C
 * @param {C extends Function} callback
 * @param {number} wait
 * @returns {C & {flush: Function, cancel: Function}}
 */
export function debounce<C extends () => any>(
  callback: C,
  wait = 0
): C & { flush: () => void; cancel: () => void } {
  let debounceTimer: string | number | NodeJS.Timeout | undefined;
  let triggerArgs: any[];
  let triggerThis: any;

  function trigger(...arg: any[]) {
    triggerArgs = arg;
    triggerThis = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      return callback.apply(triggerThis, triggerArgs as any);
    }, wait);
  }

  trigger.cancel = () => clearTimeout(debounceTimer);
  trigger.flush = () => {
    clearTimeout(debounceTimer);
    callback.apply(triggerThis, triggerArgs as any);
  };

  return trigger as any;
}

export function throttle<C extends () => any>(callback: C, wait = 0) {
  let throttleTimer: string | number | boolean | NodeJS.Timeout | undefined;
  let triggerArgs: any[];
  let triggerThis: any;

  function trigger() {
    //@ts-expect-error
    triggerArgs = arguments;
    triggerThis = this;
    if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
      callback.apply(triggerThis, triggerArgs);
      throttleTimer = false;
    }, wait);
  }

  //@ts-expect-error
  trigger.cancel = () => clearTimeout(throttleTimer);
  trigger.flush = () => {
    //@ts-expect-error
    clearTimeout(throttleTimer);
    callback.apply(triggerThis, triggerArgs);
  };

  return trigger;
}

/**
 * @template F
 * @param  {...F} funcs
 */
export function compose<F extends any[]>(...funcs: F) {
  if (!funcs.length) return (...args: any[]) => args;
  return funcs
    .slice()
    .reverse()
    .reduce(
      (a, b) =>
        (...args: any) =>
          a(b(...args))
    );
}
