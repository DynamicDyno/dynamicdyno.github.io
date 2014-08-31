---
layout: post
title: WordPress Permalinks and Nginx
description: A tutorial for setting up permalinks on WordPress and Nginx
image: wordpress-permalinks-nginx/wordpress.jpg
---

When you spin up a new WordPress instance, the default URLs are very ugly. The URL for your first post will look like:

~~~
http://example.com/?p=1
~~~

That's ugly and not at all SEO friendly. Thankfully, WordPress has a built in method of rewriting these URLs. In wp-admin, go to Settings -> Permalinks.

![WordPress Permalinks](/images/wordpress-permalinks-nginx/permalinks.png)

This will generate nice and pretty URLs like:

~~~
http://example.com/hello-world
~~~

Well doesn't that just beat all. Until you try to navigate to the page and you get a 404 error. Apparently most people who use WordPress use Apache instead of Nginx, because everyone else I could find on Google who was having this problem was using Apache. In fact, on [The WordPress Codex](http://codex.wordpress.org/Using_Permalinks), they don't even mention that this will work with Nginx:

![WordPress Permalinks is available for...](/images/wordpress-permalinks-nginx/permalinks-available-for.png)

I wasn't convinced.

On Apache, you need to install mod_rewrite. Simple enough.

As it turns out, all you need to do for this to work with Nginx is add one line to your Nginx config in the sites-available folder.

~~~
# /etc/nginx/sites-available/default

location / {
  try_files $uri $uri/ /index.php?$args;
}
~~~

You should already have the `location /` directive. Find it and add this line to it. If you already have a try_files line, comment it out and add the one here.

Now when Nginx can't find a file to serve, it will serve /index.php and send the URL path along as an argument. WordPress will then figure out where it should go.

This will work with actual 404s as well.

Restart Nginx:

~~~
sudo service nginx restart
~~~

And your pretty URLs should be going to actual posts. Hooray!