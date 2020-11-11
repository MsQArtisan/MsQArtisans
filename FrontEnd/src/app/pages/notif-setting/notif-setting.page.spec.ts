import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotifSettingPage } from './notif-setting.page';

describe('NotifSettingPage', () => {
  let component: NotifSettingPage;
  let fixture: ComponentFixture<NotifSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifSettingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotifSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
