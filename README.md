StrongPass.js
==============


What does it do?
----------------

Scoring on password strength. WIP as of commit date.

See it live in action on this jsfiddle [here](wee).


How to use
----------

Get Mootools. Have a password field.

```html
<input type="password" id="foo" />
```

Tests
-----

Via Buster.js, go to `test/index.html` to run.

You can also test via node. To install buster:

    # npm install -g buster
    
To start the static tester:    
    
    # buster static
    
To start in capture mode for multiple browsers:

    # buster server &

Once you have captured your target browsers, just run:

    # buster test

More details on testing in `the tests/README.md`, including examples.

License
-------

Licensed under the MIT License. You are not allowed to [use for evil](http://www.youtube.com/watch?v=-hCimLnIsDA)