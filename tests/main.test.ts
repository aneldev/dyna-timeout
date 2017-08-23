declare let jasmine: any, describe: any, expect: any, it: any;
if (typeof jasmine !== 'undefined') jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

import {DynaTimeout} from '../src';

const dynaTimeout = new DynaTimeout();

const flags: any = {};
const setFlag = (id: string, ...args: any[]) => flags[id] = args;

describe('Dyna Timeout test', () => {

  it('should add a simple cb', () => {
    dynaTimeout.add('red', 100, (...args) => setFlag('red', ...args), 'red1', 'red2', 'red3');
    expect(dynaTimeout.length).toBe(1);
  });

  it('should be called the simple cb', (done: Function) => {
    setTimeout(() => {
      expect(Object.keys(flags).length).toBe(1);
      expect(dynaTimeout.length).toBe(0);
      expect(flags.red[0]).toBe('red1');
      expect(flags.red[1]).toBe('red2');
      expect(flags.red[2]).toBe('red3');
      done()
    }, 200)
  });

  it('should add a cb that will be updated', () => {
    dynaTimeout.add('green', 1000, (...args) => setFlag('green', ...args), 'green2', 'green2', 'green1');
    expect(dynaTimeout.length).toBe(1);
  });
  it('should update this cb', () => {
    dynaTimeout.update('green', 100, (...args) => setFlag('green', ...args), 'green1', 'green2', 'green3');
    expect(dynaTimeout.length).toBe(1);
  });
  it('should be called the updated cb', (done: Function) => {
    setTimeout(() => {
      expect(dynaTimeout.length).toBe(0);
      expect(Object.keys(flags).length).toBe(2);
      expect(flags.green[0]).toBe('green1');
      expect(flags.green[1]).toBe('green2');
      expect(flags.green[2]).toBe('green3');
      done()
    }, 200)
  });

  it('should add a cb that will be updated with no arguments', () => {
    dynaTimeout.add('pink', 100, (...args) => setFlag('pink', ...args), 'pink1', 'pink2', 'pink3');
    expect(dynaTimeout.length).toBe(1);
  });
  it('should update this cb', () => {
    dynaTimeout.update('pink');
    expect(dynaTimeout.length).toBe(1);
  });
  it('should be called the updated cb witn no arguments', (done: Function) => {
    setTimeout(() => {
      expect(dynaTimeout.length).toBe(0);
      expect(Object.keys(flags).length).toBe(3);
      expect(flags.pink[0]).toBe('pink1');
      expect(flags.pink[1]).toBe('pink2');
      expect(flags.pink[2]).toBe('pink3');
      done()
    }, 200)
  });


  it('should add a cb that will be canceled', () => {
    dynaTimeout.add('blue', 1000, (...args) => setFlag('blue', ...args), 'blue1', 'blue2', 'blue3');
    expect(dynaTimeout.length).toBe(1);
  });
  it('should cancel the cb', () => {
    dynaTimeout.cancel('blue');
    expect(dynaTimeout.length).toBe(0);
  });
  it('should be not called the canceled cb', (done: Function) => {
    setTimeout(() => {
      expect(dynaTimeout.length).toBe(0);
      expect(Object.keys(flags).length).toBe(3);
      expect(flags.blue).toBe(undefined);
      done()
    }, 200)
  });

  it('should add many that will be canceled', () => {
    dynaTimeout.add('black1', 1000, (...args) => setFlag('black1', ...args));
    dynaTimeout.add('black2', 1000, (...args) => setFlag('black2', ...args));
    dynaTimeout.add('black3', 1000, (...args) => setFlag('black3', ...args));
    expect(dynaTimeout.length).toBe(3);
  });
  it('should cancel the cb', () => {
    dynaTimeout.cancelAll();
    expect(dynaTimeout.length).toBe(0);
  });
  it('should be not called the canceled cb', (done: Function) => {
    setTimeout(() => {
      expect(dynaTimeout.length).toBe(0);
      expect(Object.keys(flags).length).toBe(3);
      expect(flags.black1).toBe(undefined);
      expect(flags.black2).toBe(undefined);
      expect(flags.black3).toBe(undefined);
      done()
    }, 100)
  });


});
