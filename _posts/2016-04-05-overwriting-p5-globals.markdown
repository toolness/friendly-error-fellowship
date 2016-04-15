---
layout: post
title:  "Overwriting p5 Globals"
date:   2016-04-05
categories: general
---
It turns out that one of the problems with having global functions
with very simple names like `text` is that beginners may accidentally
overwrite them, and then become confused when they try using them.

This was first brought to our attention when a newcomer to p5
filed issue [#1314][].

Ultimately, the problem was fixed by PR [#1318][], which logs helpful
warnings if the user overwrites global functions.

For example, the following sketch:

{% highlight javascript %}
function setup() {
  text += "blarg";
}
{% endhighlight %}

logs this warning:

<pre>
You just changed the value of "text", which was a p5 function.
This could cause problems later if you're not careful.
</pre>

Hopefully this change will make it easier for users to debug
their sketches.

## A Note About Community

One of the particular things I like about this story is the way
the p5 community responded to it. While many open-source projects
would immediately dismiss an issue like [#1314][] as "user error"
and be done with it, the p5 community instead helped the user debug
their problem, and then wondered if there was a way to alleviate such
a frustrating experience. Potential solutions were proposed,
community members responded with [helpful feedback][], and the original 
bug reporter was treated like a valuable contributor (which they were!)
rather than being dismissed as a noob.

I wish all open-source communities worked this way.

[#1314]: https://github.com/processing/p5.js/issues/1314
[#1317]: https://github.com/processing/p5.js/issues/1317
[#1318]: https://github.com/processing/p5.js/pull/1318
[helpful feedback]: https://github.com/processing/p5.js/issues/1317#issuecomment-199930427
