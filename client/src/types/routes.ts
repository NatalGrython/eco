export interface RouteObjectStore {
  caseSensitive?: boolean;
  children?: RouteObjectStore[];
  element?: string;
  index?: boolean;
  path?: string;
}
