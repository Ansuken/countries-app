import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'shared-search-box',
    templateUrl: './search-box.component.html',
    styles: []
})
export class SearchBoxComponent {

    @Input()
    public placeholder: string = '';

    @Output() 
    public onValue = new EventEmitter<string>();

    emitValue( term: string ): void {
        if (!term) return;
        this.onValue.emit(term);
    }
}
