import { TestBed } from '@angular/core/testing';

import { CouchDBService } from './couchdb.service';

describe('CouchdbService', () => {
  let service: CouchDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouchDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});