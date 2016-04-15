---
layout: post
title:  "TypeScript to the Rescue"
date:   2016-03-16
categories: general
---

After writing about [Unit Testing Reference Documentation][], I realized
that there's a very interesting tool that can help us ensure the quality
of our documentation *and* improve the development experience for p5
beginners and experts alike.

It's called [TypeScript][]. It basically adds a nice layer of type-checking
on top of JavaScript, and the great thing about it is that you don't even
really need to know anything about it in order to benefit from it. For
example, it allows us to build helpful autocomplete interfaces like this:

![Animated GIF of autocomplete in Sublime Text]({{ site.baseurl }}/assets/images/typescript-autocomplete.gif)

The above animated GIF happens to be taken from a session of Sublime Text
with the TypeScript plugin installed, but similar plugins exist for 
other editors like Atom. With a bit of work, we can build similar
functionality into the p5 IDE itself!

Thanks to TypeScript's static analysis, we can also use it to provide
friendly error feedback before the user has even started running their code.
For example, here's what it looks like in Sublime Text when we pass a string
instead of a number as the first parameter of [`createCanvas()`][]:

![Animated GIF of error feedback in Sublime Text]({{ site.baseurl }}/assets/images/typescript-error.gif)

Compared to the standards of the friendly error system, that feedback isn't
particularly amicable, but we can do better if we integrate
custom support into the p5 IDE. The important thing here is that we're
able to leverage the rich set of static analysis functionality that
TypeScript provides us, all without needing the user to know anything
about TypeScript itself.

## How It Works

*Before reading this section, you'll probably want to review the
[Unit Testing Reference Documentation][] post if you haven't already.*

I wrote a [`generate-typescript-annotations.js`][] script that essentially
converts p5's YUIDoc metadata into something called a **TypeScript
declaration file**. For example, here's what the auto-generated entry for
`createCanvas()` looks like:

<pre>
/**
 * Creates a canvas element in the document, and sets the dimensions of it
 * in pixels.
 */
declare function createCanvas(w: number, h: number, renderer?: string): any;
</pre>

Actually, the aforementioned script generates *two* TypeScript declaration
files, which correspond to the different ways in which p5 can be used:

* [`p5.d.ts`][] contains TypeScript declarations for p5's *instance mode*,
  which is the way to use p5.js if you want to work with other third-party
  libraries (or just generally keep your global scope clean).
* [`p5.global-mode.d.ts`][] contains TypeScript declarations for p5's
  *global mode*, which is what beginners use, and what most example
  code snippets lying around the Web use.

Note that these files aren't completely accurate yet, as there are some
wrinkles involved in converting p5's YUIDoc metadata into TypeScript 
declaration files. The methods and properties that haven't been converted
yet are commented-out, with additional comments explaining the problems
the conversion script ran into.

While it's certainly possible to *not* auto-generate the TypeScript
declaration files from p5's YUIDoc metadata, I think that doing so keeps
things nice and [DRY][]. It also serves as a nice "forcing function" to
ensure the quality of our documentation!

## Ensuring Quality

Aside from making it easier for people to learn p5 and fix their errors
before they run their code, we can also use these TypeScript declaration
files to ensure that p5's own example snippets are error-free.

Because TypeScript works via static analysis, we don't even need to *run* our
example snippets: it should be fairly straightforward to write a test suite
that just iterates through all of p5's reference documentation examples,
[manual test examples][], and [examples on p5js.org][] to ensure that
our YUIDoc metadata and our example code agree with one another.

[TypeScript]: http://typescriptlang.org/
[`createCanvas()`]: http://p5js.org/reference/#/p5/createCanvas
[`generate-typescript-annotations.js`]: https://github.com/toolness/friendly-error-fellowship/blob/gh-pages/experiments/typescript/generate-typescript-annotations.js
[`p5.d.ts`]: https://github.com/toolness/friendly-error-fellowship/blob/gh-pages/experiments/typescript/p5.d.ts
[`p5.global-mode.d.ts`]: https://github.com/toolness/friendly-error-fellowship/blob/gh-pages/experiments/typescript/p5.global-mode.d.ts
[manual test examples]: https://github.com/processing/p5.js/tree/master/test/manual-test-examples
[examples on p5js.org]: https://github.com/processing/p5.js-website/tree/master/examples/examples_src
[DRY]: https://en.wikipedia.org/wiki/Don't_repeat_yourself
[Unit Testing Reference Documentation]: {% post_url 2016-03-05-unit-testing-reference-docs %}
