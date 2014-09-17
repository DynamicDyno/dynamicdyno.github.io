---
layout: post
title: Inline SCSS with Jekyll and GitHub Pages
description: Inline critical SCSS without using plugins on Jekyll and GitHub Pages
---

If you stay up-to-date on website performance then you've probably heard of the [critical path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/){:rel="nofollow"} and reducing the time it takes for a browser to start rendering a page. One of the most important things we can do is to remove render-blocking requests.

The browser can't start rendering anything until external CSS files have been loaded. Google [recommends inlining above-the-fold CSS](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery){:rel="nofollow"}. So any CSS that styles content above-the-fold should be inlined in the `<head>` tag, and any non-critical CSS should be loaded asynchronously, so it doesn't block the rendering of the page.

If you're using plain CSS files, this is very simple. Place `critical.css` in the `_includes` directory, and then do:

{% highlight html %}
<head>
  <style type="text/css">
    {% raw  %}{% include critical.css %}{% endraw %}
  </style>
</head>
{% endhighlight %}

If, however, you're using SCSS or SASS files, this has been impossible without using plugins, which aren't allowed on GitHub Pages. That bugged me, so I wrote a couple of Liquid filters for Jekyll. As of [Jekyll 2.3.0](http://jekyllrb.com/news/2014/08/11/jekyll-2-3-0-released/){:rel="nofollow"}, there are two new filters: `sassify` and `scssify`. These work in the same way that `markdownify` does. Pass it some SASS or SCSS and they'll return CSS.

We can use these filters to inline our SCSS like so:

{% highlight html %}
<head>
  <style type="text/css">
    {% raw  %}{% capture include_to_scssify %}{% endraw %}
      {% raw  %}{% include style.scss %}{% endraw %}
    {% raw  %}{% endcapture %}{% endraw %}
    {% raw  %}{{ include_to_scssify | scssify }}{% endraw %}
  </style>
</head>
{% endhighlight %}

If you have a small stylesheet and can inline all of it without your page [exceeding 14kb](https://developers.google.com/speed/docs/insights/mobile){:rel="nofollow"}, then you're good to go. If you have a bigger stylesheet, you'll want to load the rest of your stylesheet asynchronously later. Scott Jehl wrote a great script for [loading CSS asynchronously](https://github.com/filamentgroup/loadCSS){:rel="nofollow"}. 

This is a super easy way to speed up your site speed, and especially the perceived site speed. Be sure to check out [Google PageSpeed Insights](http://developers.google.com/speed/pagespeed/insights/){:rel="nofollow"} to see if your site is passing the Optimize CSS Delivery rule, and [http://www.webpagetest.org/](http://www.webpagetest.org/){:rel="nofollow"} to see a film strip of how your site loads.