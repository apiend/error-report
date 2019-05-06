declare module "cache" {
    /**
     * 判断是否有缓存
     */
    export function has(key: string): any;
    /**
     * get value
     */
    export function getItem(key: string): any;
    export function setItem(key: string, repeat: any): boolean;
    export function removeItem(key: string): void;
    export function clear(): void;
}
declare module "index" { }
declare module "is" {
    /**
     * Checks whether given value's type is one of a few Error or Error-like
     * {@link isError}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    export function isError(wat: any): boolean;
    /**
     * Checks whether given value's type is ErrorEvent
     * {@link isErrorEvent}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    export function isErrorEvent(wat: any): boolean;
    /**
     * Checks whether given value's type is DOMError
     * {@link isDOMError}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    export function isDOMError(wat: any): boolean;
    /**
     * Checks whether given value's type is DOMException
     * {@link isDOMException}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    export function isDOMException(wat: any): boolean;
    /**
     * Checks whether given value's type is an undefined
     * {@link isUndefined}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    export function isUndefined(wat: any): boolean;
    /**
     * Checks whether given value's type is a function
     * {@link isFunction}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    export function isFunction(wat: any): boolean;
    /**
     * Checks whether given value's type is a string
     * {@link isString}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    export function isString(wat: any): boolean;
    /**
     * Checks whether given value's type is an array
     * {@link isArray}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    export function isArray(wat: any): boolean;
    /**
     * Checks whether given value's type is an object literal
     * {@link isPlainObject}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    export function isPlainObject(wat: any): boolean;
    /**
     * Checks whether given value's type is an regexp
     * {@link isRegExp}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    export function isRegExp(wat: any): boolean;
    /**
     * Checks whether given value's type is a NaN
     * {@link isNaN}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    export function isNaN(wat: any): boolean;
}
declare module "util" { }
