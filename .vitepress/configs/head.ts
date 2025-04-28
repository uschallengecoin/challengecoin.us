import env from './env';

export default [
    [
      'link',
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    [
      'link',
      { rel: 'icon', type: 'image/svg+xml', href: '/images/logo.svg' },
    ],
    [
      'meta',
      {
        name: 'og:image:width',
        content: '200',
      },
    ],
    [
      'meta',
      {
        name: 'og:image:height',
        content: '200',
      },
    ],
    [
      'meta',
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    [
      'meta',
      {
        name: 'twitter:creator',
        content: env.author,
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/logo200x200.png',
      },
    ],
    [
      'meta',
      {
        name: 'mobile-web-app-capable',
        content: 'yes',
      },
    ],
    [
      'meta',
      {
        name: 'theme-color',
        content: '#2e2e33',
      },
    ],
    [
      'link',
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
    [
      'meta',
      {
        name: 'msapplication-config',
        content: '/browserconfig.xml',
      },
    ],
    [
      'script',
      {},
      `(function() {
        window.addEventListener('load', function() {
          setTimeout(function() {
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:''; 
              j.async=true; 
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${env.GTM}');
          }, 3000); // Delay by 3 seconds to ensure async loading
        });
      })();`,
    ],
    [
      'script',
      {},
      `!function(){
        function loadSegment() {
          setTimeout(function() {
            var analytics=window.analytics=window.analytics||[];
            if(!analytics.initialize) if(analytics.invoked) 
              window.console && console.error && console.error("Segment snippet included twice.");
            else {
              analytics.invoked=!0;
              analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];
              analytics.factory=function(e){return function(){if(window.analytics.initialized)return window.analytics[e].apply(window.analytics,arguments);
              var i=Array.prototype.slice.call(arguments);i.unshift(e);analytics.push(i);return analytics}};
              for(var i=0;i<analytics.methods.length;i++){var key=analytics.methods[i];analytics[key]=analytics.factory(key)}
              analytics.load=function(key,i){
                var t=document.createElement("script");
                t.type="text/javascript";
                t.async=!0;
                t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";
                var n=document.getElementsByTagName("script")[0];
                n.parentNode.insertBefore(t,n);
                analytics._loadOptions=i
              };
              analytics._writeKey="${env.SEGMENT_KEY}";
              analytics.SNIPPET_VERSION="4.16.1";
              analytics.load("${env.SEGMENT_KEY}");
              analytics.page();
              
              // Observe changes in the document's body for SPA navigation
              var currentPath = window.location.pathname;
              var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                  if (mutation.type === "childList") {
                    var newPath = window.location.pathname;
                    if (newPath !== currentPath) {
                      currentPath = newPath;
                      analytics.page();
                    }
                  }
                });
              });
              observer.observe(document.body, { childList: true, subtree: true });
            }
          }, 3000); // Delayed loading by 3 seconds
        }
        
        window.addEventListener('load', loadSegment);
      }();`,
    ],
    [
      'link',
      {
        rel: 'preload',
        as: 'video',
        href: '/video/video-bg.mp4',
        type: "video/mp4",
      }
    ]
  ];