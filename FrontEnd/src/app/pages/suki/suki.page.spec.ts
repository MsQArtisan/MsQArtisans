import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SukiPage } from './suki.page';

describe('SukiPage', () => {
  let component: SukiPage;
  let fixture: ComponentFixture<SukiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SukiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SukiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
