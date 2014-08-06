---
layout: post
title: New site & move to Jekyll
description: Migrating my website and blog to Jekyll and GitHub Pages
---

Well, that was a long hiatus. Much longer than I'd like to admit or count. I almost let this domain expire a year ago. I decided I didn't want to put my old site back up, so the domain sat in limbo for awhile. Eight months ago I decided to make a new site, and got about as far as making a header. Meanwhile, [kevinsweet.com]({{site.baseurl}}/) was returning a 404. Yesterday I decided to finally get something up and running, and I'm pretty satisfied with the setup I worked together.

## New platform

My old site was built on the Drupal CMS. I really had no desire to continue using Drupal. I worked a lot with this CMS at my last job, so it made sense to use it at the time. Nowadays, I would never voluntarily expose myself to PHP in my spare time.

I heard about [GitHub Pages](https://pages.github.com/) and how you can host a site on it for free. We're already using [Jekyll](http://jekyllrb.com/) at SendGrid and everyone seems to love it. I'm a big fan of fast-loading websites, and the idea of a *free* solution that served static pages was too good to pass up.

I was also using GitHub Pages and Jekyll eight months ago when I started rebuilding this site. However, I wanted more flexibility than what GitHub offers by default. Due to security concerns, they won't build your Jekyll project with plugins. I wanted to use HAML insead of Markdown / HTML, and Rails' Asset Pipeline for CSS and Javascript management. The solution I managed was to locally compile a Jekyll site with the plugins I wanted and commit that to GitHub. My main problem with this (beyond feeling hacky) is that it ties me to a computer with Ruby and RubyGems if I want to make a minor change to a page.

After considerable deliberation, I decided that this was too big of a dependency for me. If I'm traveling and don't have access to a Macbook with Ruby installed, it might be difficult to make a blog post. I want a site that I can update from my phone if I need to, and with my new setup I can do just that! In fact, anyone can [view the code for this website](https://github.com/DynamicDyno/dynamicdyno.github.io) and create a pull request to modify my site. GitHub even gives you an editor to do it on the web. It's maybe not as convenient as a WordPress CMS, but the fact that PHP isn't used and it can serve a static file without touching a database is well worth it in my opinion. I'll have more http requests since I can't easily manipulate my assets, and I'll have to use Markdown / HTML, but at least the newest version of Jekyll now supports SCSS.

## Easy to start

My desire to get a website going after returning from my thru-hike of the Colorado Trail was perfectly timed with the release of a [Jekyll and GitHub Pages tutorial on Smashing Magazine](http://www.smashingmagazine.com/2014/08/01/build-blog-jekyll-github-pages/). Forking the repo in this guide will get you a free GitHub Pages website in seconds. The author did a pretty good job following performance best practices, too.

So far I'm loving Jekyll and its ease-of-use and speed. It's hard to believe that I can get such a high quality setup on free hosting!