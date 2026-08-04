export enum SortOrder {
    Ascending = 'asc',
    Descending = 'desc',
}

export enum SearchOperator {
    Equals = 'equals',
    Contains = 'contains',
    In = 'in',
}

export enum FilterLogics {
    And = 'and',
    Or = 'or',
}

export interface SearchFilter {
    field: string;
    operator: SearchOperator;
    value: unknown;
}

export interface SearchSort {
    field: string;
    direction: SortOrder;
}

export interface SearchRequest {
    page: number;
    limit: number;
    filter_logic: FilterLogics;
    filters: SearchFilter[];
    sorts: SearchSort[];
}
