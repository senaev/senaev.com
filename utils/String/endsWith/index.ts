/**
 * Проверка на то, что строка имеет определенное окончание
 */
export function endsWith(str: string, suffix: string): boolean {
    return suffix === str.substring(str.length - suffix.length);
}
