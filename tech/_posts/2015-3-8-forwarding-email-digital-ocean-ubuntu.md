---
layout: post
title: Forwarding Email to Gmail with Digital Ocean and Ubuntu
description: Set up a mail server on your Droplet to forward mail to your Gmail address.
---

For my [new website](http://goodandlost.com), I'm using Digital Ocean as a host. Since my DNS is going through them and not NameCheap (my registrar), I needed to figure out how to forward any email that came to @goodandlost.com to my own personal email account. It turns out there isn't much documentation on it, and Digital Ocean, the creators of some of the best technical documentation available on the Internet, even wrote a guide trying to [convince us not to try to do this](https://www.digitalocean.com/community/tutorials/why-you-should-not-run-your-own-mail-server){:rel="nofollow"}. Uhhh.

Who needs them anyway? Start by adding the appropriate DNS records. You need two of them:

- An A record with the name ```mail``` and your server's IP address.
- An MX record with a priority (I used 1, it doesn't matter) and ```mail.yourdomainname.com.``` Note the period at the end!

Here's what mine look like:

![DNS records](/images/dns.png)

Now we need an MTA, so let's install Postfix.

{% highlight bash %}
sudo apt-get install postfix
{% endhighlight %}

It'll ask you to input your domain name. Enter the full domain name with no subdomain, for example, ```goodandlost.com```.

Next we need to edit the Postfix config. The values you need to pay attention to here are **myhysthome**, **virtual_alias_maps**, **virtual_alias_domains**, and **inet_protocols**. My entire config is below for reference.

{% highlight bash %}
# /etc/postfix/main.cf

smtpd_banner = $myhostname ESMTP $mail_name (Ubuntu)
biff = no

# appending .domain is the MUA's job.
append_dot_mydomain = no

# Uncomment the next line to generate "delayed mail" warnings
#delay_warning_time = 4h

readme_directory = no

# TLS parameters
smtpd_tls_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
smtpd_tls_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
smtpd_use_tls=yes
smtpd_tls_session_cache_database = btree:${data_directory}/smtpd_scache
smtp_tls_session_cache_database = btree:${data_directory}/smtp_scache

# See /usr/share/doc/postfix/TLS_README.gz in the postfix-doc package for
# information on enabling SSL in the smtp client.

smtpd_relay_restrictions = permit_mynetworks permit_sasl_authenticated defer_unauth_destination
myhostname = goodandlost.com
alias_maps = hash:/etc/aliases
alias_database = hash:/etc/aliases
virtual_alias_domains = goodandlost.com
virtual_alias_maps = hash:/etc/postfix/virtual
myorigin = /etc/mailname
mydestination = goodandlost, localhost.localdomain, localhost
relayhost =
mynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128
mailbox_size_limit = 0
recipient_delimiter = +
inet_interfaces = all
inet_protocols = ipv4
{% endhighlight %}

After that, we want to map some aliases to our Gmail (or whatever) accounts.

{% highlight bash %}
# /etc/postfix/virtual

admin@yourdomain.com youremail@gmail.com
{% endhighlight %}

Or, if you want to make a catch-all for any email that's sent to your domain:

{% highlight bash %}
# /etc/postfix/virtual

@yourdomain.com youremail@gmail.com
{% endhighlight %}

Next, reload Postfix:

{% highlight bash %}
sudo postmap /etc/postfix/virtual
sudo /etc/init.d/postfix reload
{% endhighlight %}

And that's it! You should be good to go. Send a message from a different account (for whatever reason, Gmail wouldn't deliver my messages from the same account) and see if it arrives in your inbox. If it's not arriving, try tailing the Postfix error log whiel you send an email:

{% highlight bash %}
tail -f /var/log/mail.log
{% endhighlight %}

I hope that helps!
