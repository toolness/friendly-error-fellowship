---
layout: post
title:  "Using p5 Globals in Top-Level Code"
date:   2016-02-22 21:05:19 +0000
categories: general
---
One of the unintuitive aspects of p5 that beginners often make is using
p5 globals in their "top level" code, i.e. outside of `setup()` and `draw()`:

{% highlight javascript %}
var myColor = color('blue');

function setup() {
  background(myColor);
}
{% endhighlight %}

Believe it or not, this sketch doesn't work, and will result in the
following error being thrown:

<pre>
ReferenceError: color is not defined
</pre>

The full reasoning and workaround for this is described in the [p5 FAQ][],
suffice to say that programmers of all experience levels [encounter](https://github.com/processing/p5.js/issues/903) [it](https://github.com/processing/p5.js/issues/1237) a [lot](https://forum.processing.org/two/discussion/12985/color-is-not-defined).

It's hard to detect such errors with 100% accuracy, but in [#1130](https://github.com/processing/p5.js/pull/1130) I added some code that attempts to detect it, and in [#1256](https://github.com/processing/p5.js/pull/1256) I improved on it so that the following console message is now displayed when the above sketch runs:

<pre>
Did you just try to use p5.js's color() function? If so, you may want to move it into your sketch's setup() function.

For more details, see: https://github.com/processing/p5.js/wiki/Frequently-Asked-Questions#why-cant-i-assign-variables-using-p5-functions-and-variables-before-setup
</pre>

I wish there was an easy way to get feedback on whether users actually find this message helpful. I can think of a few solutions to this, but more on that in a future blog post!

[p5 FAQ]: https://github.com/processing/p5.js/wiki/Frequently-Asked-Questions#why-cant-i-assign-variables-using-p5-functions-and-variables-before-setup
