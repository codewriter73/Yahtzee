// eslint-disable-next-line import/prefer-default-export
export function toPascalCase(string: string): string {
  return string.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
