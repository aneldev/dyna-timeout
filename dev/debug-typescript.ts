declare let global: any, window: any;
import {DynaTimeout} from '../src/index';

const dynaTimer = new DynaTimeout();
window.dynaTimer = dynaTimer;

// this will be executed in 10 seconds
dynaTimer.add('forName', 10000,(name) => console.log('My name is', name), 'John');

// we want to reset the timer, to start again
dynaTimer.update('forName');

// we want to reset the timer and called in 1000 sec
dynaTimer.update('forName', 1000);

// in 1 sec the next line is printed in console
// My name is John

