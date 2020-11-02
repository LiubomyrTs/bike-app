export type MakeAllPropertiesNumbers<T> = {
  [P in keyof T]: number;
}