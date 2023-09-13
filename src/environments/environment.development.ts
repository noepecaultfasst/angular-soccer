type Environment = {
  season: number | "current"
  shownCountries: string[]
  countriesTopLeagues: Map<string, number>
}

export const environment: Environment= {
  season: "current",
  // Stub data for the exam but could be replaced by an Observable containing user preferences.
  shownCountries: [
    "england",
    "spain",
    "germany",
    "france",
    "italy"
  ],

  countriesTopLeagues: new Map([
    ["england", 39],
    ["spain", 140],
    ["germany", 78],
    ["france", 61],
    ["italy", 135],
  ])
};
