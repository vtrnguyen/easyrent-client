import { SelectOption } from '@/shared/components/select/select';

export type FilterType = 'text' | 'textarea' | 'select' | 'date';

export interface FilterConfig {
    key: string;
    label: string;
    type: FilterType;
    options?: SelectOption[];
    placeholder?: string;
}

export interface FilterCondition {
    key: string;
    value: any;
}
