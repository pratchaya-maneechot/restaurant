type IsOptional<T, K extends keyof T> = undefined extends T[K] ? ({} extends Pick<T, K> ? true : false) : false;

// Utility type to add null to optional properties
export type OptionalWithNull<T> = {
  [K in keyof T]: K extends IsOptional<T, K> ? T[K] | string : T[K];
};
