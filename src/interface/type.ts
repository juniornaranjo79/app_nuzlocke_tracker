export interface Info {
  count: number;
  next: string;
  previous: string | null;
  results: Result[];
}

export interface Result {
  // Define the properties of Result here
  name: string;
  url: string;
}
