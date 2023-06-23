import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DatePickerProps {
    selectedDate: Date | null
    onChange: (date: Date | null) => void
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
    selectedDate,
    onChange,
}) => {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={onChange}
            dateFormat="dd/MM/yyyy"
            className="input input-bordered w-full"
        />
    )
}

export default CustomDatePicker
