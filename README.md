Free Memory
===========

> This add-on facilitates the Memory operations provided in about:memory page, in the form of an add-on.aWith this, it's no longer necessary to open a separate tab and goto about:memory to reduce the memory consumed by Firefox. The add-on provides 3 buttons in a widget panel, which helps in performing Garbage collection, Cycle collection and Minimize Memory operations.

Building
--------
1. Download the latest [Add-on SDK](https://addons.mozilla.org/developers/builder) from AMO.
2. Unzip it. Go inside the directory and activate the virtualenv:

    `source bin/activate`

3. Git clone this repo.
4. Go inside the cloned repo and run the add-on:

    `cfx run`
