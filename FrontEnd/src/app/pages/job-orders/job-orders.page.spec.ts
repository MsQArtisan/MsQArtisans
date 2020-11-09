import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobOrdersPage } from './job-orders.page';

describe('JobOrdersPage', () => {
  let component: JobOrdersPage;
  let fixture: ComponentFixture<JobOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobOrdersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
