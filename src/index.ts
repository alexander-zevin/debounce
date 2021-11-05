/**
 * Декоратор для предотвращения повторного вызова в течении переданного промежутка времени.
 * Автоматически привязывает this.
 * Возвращает промис.
 *
 * @example
 * ```ts
 * @debounce(500)
 requestMethod() { ... };
 или
 const debouncedFn = debounce(500, fn);
 ```
 * @param duration - Промежуток времени
 * @param cb - Вызываемая функция, по истечении времени
 */

export type TDebouncedFn<R> = (...args: unknown[]) => Promise<R> | void;

export default function debounce<R = unknown>(
  duration = 500,
  cb?: TDebouncedFn<R>
): Function {
  function innerDebounce<R>(cb: TDebouncedFn<R>, duration: number): TDebouncedFn<R> {
    let timeoutId: NodeJS.Timeout;

    return function (...args: unknown[]): Promise<R> {
      clearTimeout(timeoutId);

      return new Promise<R>(resolve => {
        timeoutId = setTimeout(() => {
          resolve(cb.apply(this, args));
        }, duration);
      });
    };
  }

  if (cb) {
    return innerDebounce<R>(cb, duration);
  }

  return (target: never, propertyKey: string, descriptor: PropertyDescriptor) => {
    Object.defineProperty(target, propertyKey, {
      ...descriptor,
      value: innerDebounce<R>(target[propertyKey], duration),
    });
  };
}
