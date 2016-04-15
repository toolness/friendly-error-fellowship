---
layout: post
title:  "Towards Zero Errors"
date:   2016-02-12
categories: general
---
What's better than friendly errors? *Zero* errors! We can help ensure this if we have accurate documentation.

But one of the hardest things about fixing a mistake in the documentation is figuring out where it's located in a project's source code.

So I thought that it might be nice to *unintrusively* link to the source code for a p5 API in its documentation. I stress the word *unintrusively* because I don't want to confuse the beginners who may be learning programming for the first time, and could be thrown off by the extra information.

Other benefits of linking to the source:

* It invites users of p5 to become contributors.
* It generally makes it easier to "pop open the hood" and see how p5 works.

Here's what it looks like--the example screenshot below is taken from the documentation for [`plane()`](http://p5js.org/reference/#/p5/plane):

![Screenshot of linking to documentation source]({{ site.baseurl }}/assets/images/link-to-doc-source.png)

The first link there is to [view the source for `plane()`](https://github.com/processing/p5.js/blob/master/src/3d/3d_primitives.js#L14), while the second is to [edit it](https://github.com/processing/p5.js/edit/master/src/3d/3d_primitives.js#L14) (yay to GitHub for providing permalinks to edit files at a specific line number!). My hope is that beginners who don't know anything about git can fix simple typos and issue PRs for them.

This was filed as pull request [#1248](https://github.com/processing/p5.js/pull/1248).
