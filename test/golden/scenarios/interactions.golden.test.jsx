import {describe, it} from 'vitest';
import {scenarios} from './cases';
import {runScenario} from './runScenario';
import {expectGolden} from '../expectGolden';

describe('golden interaction traces (current behavior, including bugs)', () => {
  for (const scenario of scenarios) {
    it(scenario.name, () => {
      expectGolden(scenario.name, runScenario(scenario));
    });
  }
});
