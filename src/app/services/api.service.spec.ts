import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    }).compileComponents();

    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
