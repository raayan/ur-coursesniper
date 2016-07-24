/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { PollViewComponent } from './poll-view.component';

describe('Component: PollView', () => {
  it('should create an instance', () => {
    let component = new PollViewComponent();
    expect(component).toBeTruthy();
  });
});
