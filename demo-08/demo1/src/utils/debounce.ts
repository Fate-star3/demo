
export const debounce = (func: { apply: (arg1: any, arg2: any) => void }, delay: number | undefined) => {
  let timer: any;
  return function (this: any, ...args: any) {
      if (timer) {
          clearTimeout(timer);
      }
      timer = setTimeout(() => {
          func.apply(this, args);
          clearTimeout(timer);
      }, delay);
  };
};