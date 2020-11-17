import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccInfoPage } from './acc-info.page';

describe('AccInfoPage', () => {
  let component: AccInfoPage;
  let fixture: ComponentFixture<AccInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
