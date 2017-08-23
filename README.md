# About

Handles execution on multiple callbacks by timeout.

Reset an execution by id. Cancel an execution all cancel them all at once. Check easy how many executions are pending, get the ids of them.

Written in Typescript but runs everywhere (universal).

# Example

```
import {DynaTimeout} from 'dyna-timeput';

const dynaTimer = new DynaTimeout();

// this will be executed in 10 seconds
dynaTimer.add('forName', 10000,(name) => console.log('My name is', name), 'John');

// we want to reset the timer, to start again
dynaTimer.update('forName');

// we want to reset the timer and called in 1000 sec
dynaTimer.update('forName', 1000);

// in 1 sec the next line is consoled
// My name is John

```

# Methods

## add(id: string, timeout: number, cb: Function, ...args): void

The `id` can be used in other methods.
 
`timeout` is ms. 

`cb` the function that will be executed

... and the rest are the arguments that will me passed to the `cb`.

The syntax is _like_ this one of the native `setTimeout`.

## update(id: string, timeout?: number, cb?: Function, ...args)

The `id` used for get which execution will be updated.
 
(optional) `timeout` is ms. 

(optional) `cb` the function that will be executed

(optional) ... and the rest are the arguments that will overwrite **all** the previous one.

The update can by calles with out passing the `timeout` and in this case with reset the timer.

## cancel(id: string): void

Cancels the execution of a `cb`.

## cancelAll():void

Cancels all executions.

## getIds():Array<string>

Returns a string array with all `ids` of the `cbs` that are not executed yet.

# Properties

# length: number

The pending executions.