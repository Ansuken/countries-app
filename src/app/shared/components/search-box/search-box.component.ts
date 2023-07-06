import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
    selector: 'shared-search-box',
    templateUrl: './search-box.component.html',
    styles: []
})
export class SearchBoxComponent implements OnInit{

    private debouncer: Subject<string> = new Subject<string>();
    private debouncerSubscription?: Subscription;

    @Input()
    public placeholder: string = '';

    @Input()
    public initialValue: string = '';

    @Output() 
    public onValue = new EventEmitter<string>();

    @Output() 
    public onDebounce = new EventEmitter<string>();

    ngOnInit(): void {
        this.debouncerSubscription = this.debouncer
            .pipe( debounceTime(600) )
            .subscribe(value=> {
                this.onDebounce.emit( value )
            });
    }

    emitValue( term: string ): void {
        if (!term) return;
        this.onValue.emit(term);
    }

    onKeyPress( searchTerm: string ): void {
        this.debouncer.next( searchTerm );
    }

    ngOnDestroy(): void {
        this.debouncerSubscription?.unsubscribe();
    }
}
