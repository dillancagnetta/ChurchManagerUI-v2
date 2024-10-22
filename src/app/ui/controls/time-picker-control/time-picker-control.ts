import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Component, forwardRef} from "@angular/core";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'cm-time-picker',
  standalone: true,
  templateUrl: './time-picker-control.html',
  styleUrls: ['./time-picker-control.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerControl),
      multi: true,
    },
  ],
  imports: [
    MatLabel,
    MatFormField,
    MatInput,
    FormsModule,
  ]
})
export class TimePickerControl implements ControlValueAccessor {
  // Properties for hour and minute
  hours: number  = 18;
  minutes: number  = 0;

  // Method to propagate changes to the parent form control
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  // Write value method called when value is set from the parent
  writeValue(value: string): void {
    console.log('TimePickerControl', value)
    if (value == null) return;

    const time = value.split(':');
    if (time && time.length === 2) {
      this.hours = parseInt(time[0], 10);
      this.minutes = parseInt(time[1], 10);
    }
  }

  // Register the onChange callback
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // Register the onTouched callback
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Method to update the value and notify parent when hours or minutes change
  onHoursChange(value: number) {
    this.hours = value;
    this.notifyChange();
  }

  onMinutesChange(value: string) {
    const minutes = parseInt(value, 10);
    if (!isNaN(minutes) && minutes >= 0 && minutes < 60) {
      this.minutes = minutes;
      this.notifyChange();
    }
  }

  // Notify the parent form control of the change
  notifyChange() {
    if (this.hours !== null && this.minutes !== null) {
      const time = `${this.hours}:${this.minutes}`;
      this.onChange(time);
    }
  }

  // Format minutes to add leading zero if needed
  formatMinutes(value: number | null): string {
    if (value !== null && value < 10) {
      return '0' + value;
    }
    return value !== null ? value.toString() : '';
  }

  // Enable/Disable component (Optional)
  setDisabledState?(isDisabled: boolean): void {
    // Handle the disabled state of inputs if needed
  }
}