import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CashInPage } from './cash-in.page';

describe('CashInPage', () => {
  let component: CashInPage;
  let fixture: ComponentFixture<CashInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashInPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CashInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
