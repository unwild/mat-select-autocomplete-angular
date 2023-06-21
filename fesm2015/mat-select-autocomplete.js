import { Injectable, NgModule, Component, EventEmitter, Input, Output, ViewChild, defineInjectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SelectAutocompleteService {
    constructor() { }
}
SelectAutocompleteService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SelectAutocompleteService.ctorParameters = () => [];
/** @nocollapse */ SelectAutocompleteService.ngInjectableDef = defineInjectable({ factory: function SelectAutocompleteService_Factory() { return new SelectAutocompleteService(); }, token: SelectAutocompleteService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SelectAutocompleteComponent {
    constructor() {
        this.selectPlaceholder = "search...";
        this.disabled = false;
        this.display = "display";
        this.value = "value";
        this.formControl = new FormControl();
        this.errorMsg = "Field is required";
        this.showErrorMsg = false;
        this.multiple = true;
        // New Options
        this.labelCount = 1;
        this.appearance = "standard";
        this.selectionChange = new EventEmitter();
        this.filteredOptions = [];
        this.selectedValue = [];
        this.selectAllChecked = false;
        this.displayString = "";
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this.disabled) {
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
        this.filteredOptions = this.options;
        if (this.selectedOptions) {
            this.selectedValue = this.selectedOptions;
        }
        else if (this.formControl.value) {
            this.selectedValue = this.formControl.value;
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (!this.selectedValue.length) {
            this.selectionChange.emit(this.selectedValue);
        }
    }
    /**
     * @return {?}
     */
    toggleDropdown() {
        this.selectElem.toggle();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    toggleSelectAll(val) {
        if (val.checked) {
            this.filteredOptions.forEach(option => {
                if (!this.selectedValue.includes(option[this.value])) {
                    this.selectedValue = this.selectedValue.concat([option[this.value]]);
                }
            });
        }
        else {
            /** @type {?} */
            const filteredValues = this.getFilteredOptionsValues();
            this.selectedValue = this.selectedValue.filter(item => !filteredValues.includes(item));
        }
        this.selectionChange.emit(this.selectedValue);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    filterItem(value) {
        this.filteredOptions = this.options.filter(item => item[this.display].toLowerCase().indexOf(value.toLowerCase()) > -1);
        this.selectAllChecked = true;
        this.filteredOptions.forEach(item => {
            if (!this.selectedValue.includes(item[this.value])) {
                this.selectAllChecked = false;
            }
        });
        if (!this.filteredOptions.length) {
            this.selectAllChecked = false;
        }
    }
    /**
     * @param {?} option
     * @return {?}
     */
    hideOption(option) {
        return !(this.filteredOptions.indexOf(option) > -1);
    }
    /**
     * @return {?}
     */
    getFilteredOptionsValues() {
        /** @type {?} */
        const filteredValues = [];
        this.filteredOptions.forEach(option => {
            filteredValues.push(option.value);
        });
        return filteredValues;
    }
    /**
     * @return {?}
     */
    onDisplayString() {
        this.displayString = "";
        if (this.selectedValue && this.selectedValue.length) {
            /** @type {?} */
            let displayOption = [];
            if (this.multiple) {
                // Multi select display
                for (let i = 0; i < this.labelCount; i++) {
                    displayOption[i] = this.options.filter(option => option[this.value] === this.selectedValue[i])[0];
                }
                if (displayOption.length) {
                    for (let i = 0; i < displayOption.length; i++) {
                        if (displayOption[i] && displayOption[i][this.display]) {
                            this.displayString += displayOption[i][this.display] + ",";
                        }
                    }
                    this.displayString = this.displayString.slice(0, -1);
                    if (this.selectedValue.length > 1 &&
                        this.selectedValue.length > this.labelCount) {
                        this.displayString += ` (+${this.selectedValue.length -
                            this.labelCount} others)`;
                    }
                }
            }
            else {
                // Single select display
                displayOption = this.options.filter(option => option[this.value] === this.selectedValue);
                if (displayOption.length) {
                    this.displayString = displayOption[0][this.display];
                }
            }
        }
        return this.displayString;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    onSelectionChange(val) {
        /** @type {?} */
        const filteredValues = this.getFilteredOptionsValues();
        /** @type {?} */
        let count = 0;
        if (this.multiple) {
            this.selectedValue.filter(item => {
                if (filteredValues.includes(item)) {
                    count++;
                }
            });
            this.selectAllChecked = count === this.filteredOptions.length;
        }
        this.selectedValue = val.value;
        this.selectionChange.emit(this.selectedValue);
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackByFn(index, item) {
        return item.value;
    }
}
SelectAutocompleteComponent.decorators = [
    { type: Component, args: [{
                selector: "mat-select-autocomplete",
                template: `
    <mat-form-field appearance="{{ appearance }}">
      <mat-select
        #selectElem
        [placeholder]="placeholder"
        [formControl]="formControl"
        [multiple]="multiple"
        [(ngModel)]="selectedValue"
        (selectionChange)="onSelectionChange($event)"
      >
        <div class="box-search">
          <mat-checkbox
            *ngIf="multiple"
            color="primary"
            class="box-select-all"
            [(ngModel)]="selectAllChecked"
            (change)="toggleSelectAll($event)"
          ></mat-checkbox>
          <input
            #searchInput
            type="text"
            [ngClass]="{ 'pl-1': !multiple }"
            (input)="filterItem(searchInput.value)"
            [placeholder]="selectPlaceholder"
          />
          <div
            class="box-search-icon"
            (click)="filterItem(''); searchInput.value = ''"
          >
            <button mat-icon-button class="search-button">
              <mat-icon class="mat-24" aria-label="Search icon">clear</mat-icon>
            </button>
          </div>
        </div>
        <mat-select-trigger>
          {{ onDisplayString() }}
        </mat-select-trigger>
        <mat-option
          *ngFor="let option of options; trackBy: trackByFn"
          [disabled]="option.disabled"
          [value]="option[value]"
          [style.display]="hideOption(option) ? 'none' : 'flex'"
          >{{ option[display] }}
        </mat-option>
      </mat-select>
      <mat-hint style="color:red" *ngIf="showErrorMsg">{{ errorMsg }}</mat-hint>
    </mat-form-field>
  `,
                styles: [`
      .box-search {
        margin: 8px;
        border-radius: 2px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16),
          0 0 0 1px rgba(0, 0, 0, 0.08);
        transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
      }
      .box-search input {
        flex: 1;
        border: none;
        outline: none;
      }
      .box-select-all {
        width: 36px;
        line-height: 33px;
        color: #808080;
        text-align: center;
      }
      .search-button {
        width: 36px;
        height: 36px;
        line-height: 33px;
        color: #808080;
      }
      .pl-1 {
        padding-left: 1rem;
      }
    `]
            }] }
];
/** @nocollapse */
SelectAutocompleteComponent.ctorParameters = () => [];
SelectAutocompleteComponent.propDecorators = {
    selectPlaceholder: [{ type: Input }],
    placeholder: [{ type: Input }],
    options: [{ type: Input }],
    disabled: [{ type: Input }],
    display: [{ type: Input }],
    value: [{ type: Input }],
    formControl: [{ type: Input }],
    errorMsg: [{ type: Input }],
    showErrorMsg: [{ type: Input }],
    selectedOptions: [{ type: Input }],
    multiple: [{ type: Input }],
    labelCount: [{ type: Input }],
    appearance: [{ type: Input }],
    selectionChange: [{ type: Output }],
    selectElem: [{ type: ViewChild, args: ["selectElem",] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SelectAutocompleteModule {
}
SelectAutocompleteModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    CommonModule,
                    MatIconModule,
                    MatButtonModule,
                    MatSelectModule,
                    MatCheckboxModule,
                    MatFormFieldModule,
                    ReactiveFormsModule,
                ],
                declarations: [SelectAutocompleteComponent],
                exports: [SelectAutocompleteComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { SelectAutocompleteService, SelectAutocompleteComponent, SelectAutocompleteModule };

//# sourceMappingURL=mat-select-autocomplete.js.map