import { TestBed } from '@angular/core/testing';

import { DonutChartService } from './donut-chart.service';

describe('DonutChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonutChartService = TestBed.get(DonutChartService);
    expect(service).toBeTruthy();
  });
});
