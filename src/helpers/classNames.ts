// src/helpers/classNames.ts

/**
 * A utility function to conditionally concatenate class names.
 * @param classes - A list of classes to be filtered and joined.
 * @returns A string with concatenated class names.
 */
function classNames(...classes: (string | boolean | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
  }
  
  export default classNames;