import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
    // providers: [ProductService] to inject service only into this component and its child components
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List Binding';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(v : string) {
        this._listFilter = v;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: Array<IProduct>;
    products: Array<IProduct>;;

    constructor(private productService: ProductService) {}

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(listFilter: string): Array<IProduct> {
        listFilter = listFilter.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
        product.productName.toLocaleLowerCase().indexOf(listFilter) !== -1);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error => this.errorMessage = <any>error
        );
    }
}