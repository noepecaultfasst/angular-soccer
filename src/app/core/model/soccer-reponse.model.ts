/**
 * Custom utility type to wrap expected response type in a response property since other returned values are not needed.
 */
export type SoccerResponse<T> = { response: T }
