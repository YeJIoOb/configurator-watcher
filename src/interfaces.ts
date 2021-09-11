
export type Optional<T> = {
  [K in keyof T]?: T[K];
}[keyof T];

export type OptionalKeysBool<T> = {
  [K in keyof T]?: boolean;
}[keyof T];
