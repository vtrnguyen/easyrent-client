import TextField from '../text-field/text-field';

interface DateRangeFieldProps {
    startValue?: string;
    endValue?: string;
    onStartChange: (value: string) => void;
    onEndChange: (value: string) => void;
}

export default function DateRangeField({ startValue, endValue, onStartChange, onEndChange }: DateRangeFieldProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Từ ngày" type="date" value={startValue} onChange={(e) => onStartChange(e.target.value)} />

            <TextField label="Đến ngày" type="date" value={endValue} onChange={(e) => onEndChange(e.target.value)} />
        </div>
    );
}
