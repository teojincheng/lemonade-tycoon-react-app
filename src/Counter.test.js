import React from 'react';
import Counter from './Counter';

test('test update value of counter', () => {
    let c1 = new Counter();
    c1.update(78);
    expect(c1.getValue()).toBe(78);
  });


  test('test displayValue() function',() => {
     let c1 = new Counter();
     c1.update(188);
     let expectedElement = <div>188</div>
     expect(c1.displayValue().toString()).toBe(expectedElement);
  });