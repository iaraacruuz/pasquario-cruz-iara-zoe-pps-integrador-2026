import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAula } from './chat-aula';

describe('ChatAula', () => {
  let component: ChatAula;
  let fixture: ComponentFixture<ChatAula>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatAula]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatAula);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
