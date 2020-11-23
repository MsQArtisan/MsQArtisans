import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotifSettingsPage } from './notif-settings.page';

describe('NotifSettingsPage', () => {
  let component: NotifSettingsPage;
  let fixture: ComponentFixture<NotifSettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifSettingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotifSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
