import { Component, OnChanges, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
    // @Input exposes rating property to container components and makes it available for property binding
    // rating is available to container components for property binding, but notify and starWidth is not
    @Input() rating: number;

    starWidth: number;

    // @Output exposes notify property to container components and makes it available for event binding
    // notify is available to container components for event binding, but rating and starWidth are not
    @Output() ratingClicked = new EventEmitter<string>();

    ngOnChanges(): void {
        this.starWidth = this.rating * 75 / 5;
    }

    onClick() {
        // method raises onClick event to container components
        this.ratingClicked.emit(`product with rating ${this.rating} clicked!`);
    }
}