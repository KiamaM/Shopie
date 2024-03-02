import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListPageComponent } from './product-list-page.component';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { ProductServiceService } from '../../../Services/product-service.service';

describe('ProductListPageComponent', () => {
  let service:ProductServiceService
  let testingControler:HttpTestingController


  let component: ProductListPageComponent;
  let fixture: ComponentFixture<ProductListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListPageComponent,HttpClientTestingModule ]
    })
    .compileComponents();

    service = TestBed.inject(ProductServiceService);
    
    fixture = TestBed.createComponent(ProductListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
