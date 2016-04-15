---
layout: post
title:  "Unit Testing Reference Documentation"
date:   2016-03-05
categories: general
---
Part of the work of the Friendly Error Fellowship involves resurrecting
the original work on p5's Friendly Debugger, which was disabled due to
various limitations documented in [#971][].

One of the core features of the legacy Friendly Debugger was an argument
validator, which would:

* Check that a function call contains the correct number of parameters, and
* Check that a function call contains the correct type of parameters.

This would be useful for beginners in particular. For instance, imagine
passing a number into a p5 function that expects a string; if the function's
implementation calls `toUpperCase()` on the argument, this will result in
`TypeError: toUpperCase is not a function` being raised, which will be quite
confusing to newcomers. Much more helpful will be to log a friendly error 
suggesting the user pass in a string instead.

Now, let's take a quick detour to look at how p5's reference documentation is
defined. We use a tool called [YUIDoc][] that generates it from some
specially-formatted comment blocks in p5's source code that look like this:

{% highlight javascript %}
 * @method color
 * @param  {Number|String} v1   gray value or red or hue value relative to
 *                              the current color range, or a color string
 * @param  {Number}        [v2]    gray value or green or saturation value
 *                                 relative to the current color range (or
 *                                 alpha value if first param is gray value)
 * @param  {Number}        [v3]    gray value or blue or brightness value
 *                                 relative to the current color range
 * @param  {Number}        [alpha] alpha value relative to current color range
{% endhighlight %}

The above is a snippet taken from the source code for [`p5.color()`][], and
is used to generate its documentation.

As Jason Sigal brought up in [#759][], it should *theoretically* be possible
to take the metadata extracted from such comment blocks, and leverage it to
do some of our type-checking for us, rather than violating [DRY][],
potentially introducing more errors, and complicating our codebase by
manually writing extra type validation code.

However, we're also in a bit of a bind because we don't actually know
if our reference documentation is *correct*. It would be really
unfortunate for the friendly error system to give the wrong kind of
advice to beginners, increasing their frustration even more!

So how might we "unit test" our own reference documentation?

Here's one approach: write a type-checker that uses p5's own YUIDoc
metadata, and use it to type check p5's own example snippets.

Doing this has a few advantages:

* It ensures that our documentation is accurate. For example, if a working
  example snippet is passing a `p5.Color` instance as a first
  argument to `lerpColor()` but this isn't documented as a valid
  argument type, our type checker will complain. We fix the bug by
  fixing our documentation.

* Conversely, it helps ensure the quality of our example snippets. If
  our example snippet is calling a p5 API the wrong way, it's probably
  broken!

* It's possible that we can reuse the type-checking logic to resurrect
  the Friendly Debugger's type-checking system going forward.

I'm now working on one approach to this kind of solution in [#1287][].

[#971]: https://github.com/processing/p5.js/issues/971
[#759]: https://github.com/processing/p5.js/issues/759
[DRY]: https://en.wikipedia.org/wiki/Don't_repeat_yourself
[YUIDoc]: http://yui.github.io/yuidoc/
[`p5.color()`]: http://p5js.org/reference/#/p5/color
[#1287]: https://github.com/processing/p5.js/pull/1287
