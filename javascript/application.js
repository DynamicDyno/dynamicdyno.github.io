---
---
{% include javascript/modernizr.js %}
{% include javascript/turbolinks.js %}
{% include javascript/scrollr.js %}

if (Modernizr.touch)
  skrollr.init().destroy();
else
  var s = skrollr.init();