---
layout: page
title: About
permalink: /about/
---

Below is the original application for the Friendly Error Fellowship,
originally submitted as a
[gist](https://gist.github.com/toolness/d994ff777db79e493a6f).

About Us
========

### Jess Klein

If you ask about her passions, Jess will draw you a venn diagram with the
words community, freedom, and learning, and point to the sweet spot where
all three overlap. She is dedicated to connecting people and ideas through
new technologies and interactive experiences.

Jess currently works at Bocoup as an Open Web Designer and previously was at
the Mozilla Foundation, where she served as Creative Lead. A Rockaway Beach
native, Jess co-founded Rockaway Help in the wake of Hurricane Sandy to
empower the community to find solutions for emergency response, preparedness
and rebuilding through hyperlocal open news and the development of innovative
community-designed technologies. She was named a 
[White House Champion of Change][] for her civic hacktivism.

### Atul Varma

Atul enjoys building bridges of understanding between humans and machines.
He has written illuminating software that's been used as the centerpiece of
[TED Talks][], in [maker events][] around the world, and by individuals who
are just trying to have a less frustrating time using their computer. But his
favorite moments are very personal: understanding where another person is
coming from, constructing a metaphor they can relate to, and using it to
explain technology in a way that liberates, excites, and empowers.

Atul previously worked at the Mozilla Foundation as a Lead Developer and
currently freelances on a variety of open governance and education-related
projects.

Introduction and Timeline
=========================

We're interested in making p5.js the most helpful JavaScript library
in the world by improving its friendly error system. Specifically,
we'd like to approach the work outlined in [issue #971][] through the
lens of human-centered design.

Over the course of the three-month fellowship, we'd like to spend the
first month doing some research and prototyping:

* Conducting interviews with teachers, students, and other users of
  p5.js to generate personas, journey maps, and wireframes to identify
  pain points and ideate on what an ideal error experience might be.
* Observing the most common errors beginners encounter through teaching
  p5 ourselves (and potentially observing others teach p5), and using this
  insight to devise new ways of making the library even more helpful. For
  example, in [pull request #1130][] Atul added a helpful error message 
  when users used global APIs like `color()` at top-level code, after
  being confused by it himself and noticing others posting about it
  on the Processing forum.
* Exploring the error feedback of other friendly systems like
  Processing 3, [Ruby 2.3][], [Inform 7][], [Elm][], and even [jokes][] to
  gain further insight on potential solutions.
* Prototyping innovative ways to make the friendly error system feel
  more like interactive documentation, and less like an intimidating
  browser console. This may include, but not be limited to, the
  inclusion of links to existing documentation and guides on p5js.org;
  a glossary of terms that may be unfamiliar to individuals new to
  coding and/or Web programming in particular; and more.
* Reading through existing issues related to the friendly error system
  and proposing a roadmap/plan of attack.

The second and third months of our work would involve implementation and
iteration:

* Fixing all the current friendly error system issues.
* Productionalizing compelling prototypes to ensure that they handle
  all edge cases and work properly 100% of the time.
* Using teaching as a way to "user test" the friendly error system
  itself, and validate that the solutions devised for the error system are
  actually helpful. Further exploration may be done to add additional
  ways of getting feedback on our solutions, e.g. a mechanism for users who
  encountered errors to indicate whether particular friendly error
  system messages were helpful or not.

During this time, work would be done to ensure that the implementation
follows best practices so that it can be easily understood,
maintained, and extended by the Processing community:

* Documenting the design work and requesting feedback from the Processing
  community through blog posts and github issues.
* Developing a robust test suite to ensure that the friendly error system
  never breaks.
* Documenting the friendly error system API so that libraries which build
  upon p5, like p5.speech, can easily provide their own friendly errors.
* Potentially decoupling parts of the friendly error system from p5 itself,
  so that other JS libraries and open-source projects can easily leverage
  its functionality too.
* Ensuring that the friendly error system works well with screen readers,
  so that seeing-impaired users can benefit from it.
* Potentially devising a way to internationalize the friendly error
  system so that it's helpful to beginners who may not know English.

Atul's current understanding of the internal workings of the p5.js library,
developed through the past few months of [contributions][], will 
allow us to hit the ground running.

In addition, we believe we're particularly qualified for this work due to
our experience developing beginner-friendly software, as well as our
teaching experience. 

Beginner-Friendly Software Experience
=====================================

In general, we've both always been excited about building software that is
particularly approachable for users who don't have a traditional
technical background. Our favorite example of this is [Hackasaurus][], a
tool we designed and developed during our time at Mozilla that makes it
easy for non-technical people to peek under the hood of a web page,
understand how it works, and tinker with it.

Other beginner-friendly software projects that we've worked on includes:

* [Hack the Firefox Home Page][], an experience we designed and prototyped
  that introduces Firefox users to the basics of CSS by inviting them to
  "hack" Firefox's default home page.
* [lovebomb.me][], a tool we created to introduce beginners to HTML and
  CSS through the creation of love bomb "e-cards".
* [Data Voyager][], a tool Jess worked on at Bocoup in collaboration with
  the Knight Foundation and the Interactive Data Lab at the University
  of Washington to help journalists new to data exploration learn
  about the potential of a dataset through visualization recommendations.
* [Minicade][], a tool Atul created with Chloe Varelidi at Mozilla and
  Eyebeam for making microgames that allows designers to "level up" from
  building games using a Blockly-based drag-and-drop UI to coding in
  JavaScript.
* [Slowparse][], an i18n-friendly HTML/CSS parser focused on providing
  helpful error feedback that has historically been used by Mozilla Thimble
  and Khan Academy.
* [SlowmoJS][], a tool for understanding how JavaScript is evaluated
  by leveraging Edward Tufte’s concept of “adjacent multiples”.
* [Collusion][], a tool for helping non-technical users understand who is
  tracking them as they browse the web.
* [css-selector-game][], a simple mobile-friendly tutorial/game that
  teaches beginners about CSS selectors.
* [Navigator Badge Challenge][], an interactive assessment we created
  to help learners gauge their Web literacy skills.
* [Security Adventure][], an interactive tutorial that attempts
  to make learning about web security more accessible by having
  programmers exploit and then fix security holes in a simple NodeJS-based
  web application.

Teaching Experience
===================

Atul has always been excited about teaching and currently volunteers at
Brooklyn International High School, teaching ESL freshmen and sophomores 
about HTML, CSS, and JavaScript through [ScriptEd][]. He has also already
scheduled a professional development workshop with [Global Kids][] to
teach them p5 later this month, and will be doing the same for his
colleagues at [GovLab][] as well. He's also informally mentored
friends and coworkers throughout his life.

Jess is constantly teaching and was on the founding team of the
[Hive NYC Learning Network][], where she taught educators and youth
via workshops, online curriculum and hackjams about remixing and
innovating using technology. In the Rockaways, she also led public events
to teach Web literacy to the hurricane-affected community.

In general we gain some of our best insights on user experience by
observing others use products, so when it comes to p5.js, we feel that
teaching and helping beginners ourselves is of core importance.

[issue #971]: https://github.com/processing/p5.js/issues/971
[pull request #1130]: https://github.com/processing/p5.js/pull/1130
[ScriptEd]: https://scripted.org/
[Global Kids]: http://www.globalkids.org/
[GovLab]: http://thegovlab.org/
[Hackasaurus]: http://portfolio.toolness.org/hackasaurus/
[Slowparse]: http://mozilla.github.io/slowparse/
[SlowmoJS]: http://toolness.github.io/slowmo-js/
[Minicade]: http://portfolio.toolness.org/minicade/
[contributions]: https://github.com/processing/p5.js/issues?q=author%3Atoolness
[Collusion]: http://portfolio.toolness.org/collusion/
[Security Adventure]: https://github.com/toolness/security-adventure#readme
[css-selector-game]: http://toolness.github.io/css-selector-game/
[Ruby 2.3]: http://nithinbekal.com/posts/ruby-2-3-features/#did-you-mean
[Inform 7]: http://inform7.com/
[Elm]: http://elm-lang.org/blog/compilers-as-assistants
[jokes]: https://twitter.com/gafferongames/status/696774357218041856
[lovebomb.me]: http://lovebomb.me/
[Data Voyager]: https://bocoup.com/weblog/our-work-with-data-voyager
[Navigator Badge Challenge]: http://toolness.github.io/hackasaurus-parable/navigator-badge/
[White House Champion of Change]: https://www.whitehouse.gov/champions/civic-hacking-and-open-government/jessica-klein
[TED Talks]: http://blog.ted.com/meet-collusion-announced-today-onstage-at-ted-u/
[maker events]: http://www.theatlantic.com/technology/archive/2012/01/hackasaurus-x-ray-goggles-for-the-web/250865/
[Hive NYC Learning Network]: http://hivenyc.org/
[Hack the Firefox Home Page]: http://jessicaklein.blogspot.com/2014/08/remix-hack-firefox-home-page-no-really.html
