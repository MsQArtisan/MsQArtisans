import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PriceRatesPage } from './price-rates.page';

describe('PriceRatesPage', () => {
  let component: PriceRatesPage;
  let fixture: ComponentFixture<PriceRatesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceRatesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PriceRatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
