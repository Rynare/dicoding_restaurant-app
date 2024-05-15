(()=>{var e={778:e=>{e.exports={RESTAURANT_ENDPOINT:"https://restaurant-api.dicoding.dev",INDEXED_DB_NAME:"restaurant-catalogue-database",INDEXED_DB_VERSION:1}},136:()=>{"use strict";try{self["workbox:core:7.0.0"]&&_()}catch(e){}},447:()=>{"use strict";try{self["workbox:precaching:7.0.0"]&&_()}catch(e){}},227:()=>{"use strict";try{self["workbox:routing:7.0.0"]&&_()}catch(e){}},390:()=>{"use strict";try{self["workbox:strategies:7.0.0"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,s),r.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var a in t)s.o(t,a)&&!s.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";s(136);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),r=e=>e||n(a.precache),i=e=>e||n(a.runtime);function c(e,t){const s=t();return e.waitUntil(s),s}s(447);function o(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),r=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:r.href}}class h{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class l{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let u;async function d(e,s){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new t("cross-origin-copy-response",{origin:a});const n=e.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=s?s(r):r,c=function(){if(void 0===u){const e=new Response("");if("body"in e)try{new Response(e.body),u=!0}catch(e){u=!1}u=!1}return u}()?n.body:await n.blob();return new Response(c,i)}const f=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");function p(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class g{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const y=new Set;function w(e){return new Promise((t=>setTimeout(t,e)))}s(390);function m(e){return"string"==typeof e?new Request(e):e}class _{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new g,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let a=m(e);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const r=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=m(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,r=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(r,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(e,s){const a=m(e);await w(0);const n=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:f(n.url)});const r=await this._ensureResponseSafeToCache(s);if(!r)return!1;const{cacheName:i,matchOptions:c}=this._strategy,o=await self.caches.open(i),h=this.hasCallback("cacheDidUpdate"),l=h?await async function(e,t,s,a){const n=p(t.url,s);if(t.url===n)return e.match(t,a);const r=Object.assign(Object.assign({},a),{ignoreSearch:!0}),i=await e.keys(t,r);for(const t of i)if(n===p(t.url,s))return e.match(t,a)}(o,n.clone(),["__WB_REVISION__"],c):null;try{await o.put(n,h?r.clone():r)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of y)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:i,oldResponse:l,newResponse:r.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=m(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class R{constructor(e={}){this.cacheName=i(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new _(this,{event:t,request:s,params:a}),r=this._getResponse(n,s,t);return[r,this._awaitComplete(r,n,s,t)]}async _getResponse(e,s,a){let n;await e.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const r of e.iterateCallbacks("handlerDidError"))if(n=await r({error:t,event:a,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,r;try{n=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(r=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:r}),t.destroy(),r)throw r}}class v extends R{constructor(e={}){e.cacheName=r(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(v.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const t=n.integrity,r=e.integrity,i=!r||r===t;if(a=await s.fetch(new Request(e,{integrity:"no-cors"!==e.mode?r||t:void 0})),t&&i&&"no-cors"!==e.mode){this._useDefaultCacheabilityPluginIfNeeded();await s.cachePut(e,a.clone());0}}return a}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(e);if(!await s.cachePut(e,a.clone()))throw new t("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==v.copyRedirectedCacheableResponsesPlugin&&(a===v.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(v.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}v.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},v.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await d(e):e};class b{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new v({cacheName:r(e),plugins:[...t,new l({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const a of e){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=o(a),r="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,a.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return c(e,(async()=>{const t=new h;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),r=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return c(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}let C;const U=()=>(C||(C=new b),C);s(227);const q=e=>e&&"object"==typeof e?e:{handle:e};class L{constructor(e,t,s="GET"){this.handler=q(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=q(e)}}class T extends L{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class k{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const a=s.origin===location.origin,{params:n,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:a,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return void 0;let o;try{o=i.handle({url:s,request:e,event:t,params:n})}catch(e){o=Promise.reject(e)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async a=>{if(h){0;try{return await h.handle({url:s,request:e,event:t,params:n})}catch(e){e instanceof Error&&(a=e)}}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw a}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:a}){const n=this._routes.get(s.method)||[];for(const r of n){let n;const i=r.match({url:e,sameOrigin:t,request:s,event:a});if(i)return n=i,(Array.isArray(n)&&0===n.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,q(e))}setCatchHandler(e){this._catchHandler=q(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let N;const K=()=>(N||(N=new k,N.addFetchListener(),N.addCacheListener()),N);function E(e,s,a){let n;if("string"==typeof e){const t=new URL(e,location.href);0;n=new L((({url:e})=>e.href===t.href),s,a)}else if(e instanceof RegExp)n=new T(e,s,a);else if("function"==typeof e)n=new L(e,s,a);else{if(!(e instanceof L))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}return K().registerRoute(n),n}class P extends L{constructor(e,t){super((({request:s})=>{const a=e.getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:n}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(a){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(n){const e=n({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=a.get(n);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}}),e.strategy)}}const x={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};var O,M=s(778),W=s.n(M);(function(e){U().precache(e)})([{'revision':null,'url':'39795c0b4513de014cf8.woff?dd67030699838ea613ee6dbda90effa6'},{'revision':'599260b200a0403639bd3ad232214637','url':'465.bundle.js'},{'revision':'5bb11936abebdfac92531cbd3981a3f0','url':'586.bundle.js'},{'revision':'f3f88219edbd3693bcefcd6e56dd5815','url':'692.bundle.js'},{'revision':'d27a5a3ac6474e780559b9cb0ae5fb36','url':'692.bundle.js.LICENSE.txt'},{'revision':'311065839865367eb1ad2ba1b61b2706','url':'819.css'},{'revision':'624c23411720410aaad29b2b6c4209fb','url':'assets/android-chrome-144x144.png'},{'revision':'0a7467c86196fbc00cdaee38fa6cf85c','url':'assets/android-chrome-192x192.png'},{'revision':'c6d6e621008b7afc5623fd714085f287','url':'assets/android-chrome-256x256.png'},{'revision':'a8e05143e7efdb061c4f9a7ff8077732','url':'assets/android-chrome-36x36.png'},{'revision':'bdca27f15f35e565f93234e0b8ae6f2f','url':'assets/android-chrome-384x384.png'},{'revision':'29bcdda9912fde609a9499fdf45a1a19','url':'assets/android-chrome-48x48.png'},{'revision':'2e150d25f983100fcafb943b7cb40dc2','url':'assets/android-chrome-512x512.png'},{'revision':'b5299dcc24b16d038cfaedc495e9f82b','url':'assets/android-chrome-72x72.png'},{'revision':'7a809cd9bc2ada5c677b438fce626172','url':'assets/android-chrome-96x96.png'},{'revision':'a9ec8d183a5a9dc2b9d161417176a321','url':'assets/apple-touch-icon-1024x1024.png'},{'revision':'655480728dc9ddd7f408c5519fa8a10c','url':'assets/apple-touch-icon-114x114.png'},{'revision':'7ebbe9aa5c5e8a7d846bb5fca95153ef','url':'assets/apple-touch-icon-120x120.png'},{'revision':'06ba0dd74d5d098a50e1c4cf8d220fd4','url':'assets/apple-touch-icon-144x144.png'},{'revision':'98d3a1fc417281771259a73e5ca391a8','url':'assets/apple-touch-icon-152x152.png'},{'revision':'18c13e7f3a474a714f155b68c79dff68','url':'assets/apple-touch-icon-167x167.png'},{'revision':'9296c2d9f114f383df1f5e37a61f7f2e','url':'assets/apple-touch-icon-180x180.png'},{'revision':'ecd0c54af805d39fbd5566ceff46f592','url':'assets/apple-touch-icon-57x57.png'},{'revision':'a9abd5a3f19aacaeddd86c821a235c85','url':'assets/apple-touch-icon-60x60.png'},{'revision':'971e157280b564c97d450260f78f2fdb','url':'assets/apple-touch-icon-72x72.png'},{'revision':'51eb97fd6e87330c77290e06b2c7b145','url':'assets/apple-touch-icon-76x76.png'},{'revision':'9296c2d9f114f383df1f5e37a61f7f2e','url':'assets/apple-touch-icon-precomposed.png'},{'revision':'9296c2d9f114f383df1f5e37a61f7f2e','url':'assets/apple-touch-icon.png'},{'revision':'5fc5e2690e1f1b52c4108af48d88800d','url':'assets/apple-touch-startup-image-1125x2436.png'},{'revision':'d1ae67b915171c90121076a860ad3398','url':'assets/apple-touch-startup-image-1136x640.png'},{'revision':'4d7e1338c5ad5bd18c777481508988fa','url':'assets/apple-touch-startup-image-1170x2532.png'},{'revision':'14199a33fadc0264f1669c434216fdac','url':'assets/apple-touch-startup-image-1179x2556.png'},{'revision':'25572d7e21c1b86ffeca33d027d04858','url':'assets/apple-touch-startup-image-1242x2208.png'},{'revision':'bec1dc4d269a3f555a364c6bbdf39314','url':'assets/apple-touch-startup-image-1242x2688.png'},{'revision':'3a93f0215fa6b2e32873a8f1e9d3608d','url':'assets/apple-touch-startup-image-1284x2778.png'},{'revision':'295e67b735861c02547377d65d27db95','url':'assets/apple-touch-startup-image-1290x2796.png'},{'revision':'341ba8c585c4e22502ee738677a7df1d','url':'assets/apple-touch-startup-image-1334x750.png'},{'revision':'ddb58524e542d918c6e2f16329d44cf6','url':'assets/apple-touch-startup-image-1488x2266.png'},{'revision':'dfe8439a147494318a8ce56a45712996','url':'assets/apple-touch-startup-image-1536x2048.png'},{'revision':'f799500fa5b5b5e4048f33daa553d2bd','url':'assets/apple-touch-startup-image-1620x2160.png'},{'revision':'ff8c2886edee926b0b7c26f1293e5508','url':'assets/apple-touch-startup-image-1640x2160.png'},{'revision':'1ecdc3a2e4fa4895d7f49432ba284803','url':'assets/apple-touch-startup-image-1668x2224.png'},{'revision':'3e5dd030046f1ec44cb99044b095520e','url':'assets/apple-touch-startup-image-1668x2388.png'},{'revision':'38e49f700b872ffd9ef3201198d653ab','url':'assets/apple-touch-startup-image-1792x828.png'},{'revision':'f29ded6c53bf1d8ed53b2ec19b182002','url':'assets/apple-touch-startup-image-2048x1536.png'},{'revision':'7d76b8bea29616c4d2a407e747291e71','url':'assets/apple-touch-startup-image-2048x2732.png'},{'revision':'b17729bc0076ba576e9ccdd0a0a839db','url':'assets/apple-touch-startup-image-2160x1620.png'},{'revision':'b773833feb29321c9636f369ca3b8a07','url':'assets/apple-touch-startup-image-2160x1640.png'},{'revision':'ac0f4840eb40d77dae11a38bae7221a9','url':'assets/apple-touch-startup-image-2208x1242.png'},{'revision':'0653d8c53a151b6b6c4f14f74a71bb0e','url':'assets/apple-touch-startup-image-2224x1668.png'},{'revision':'62b9e408fcd95f7909e8eff09ba5c7f7','url':'assets/apple-touch-startup-image-2266x1488.png'},{'revision':'d29067ac5c9e00e5cfc8fd8dad6d7f35','url':'assets/apple-touch-startup-image-2388x1668.png'},{'revision':'c8e35d35d39e96423e3ef00502344ee6','url':'assets/apple-touch-startup-image-2436x1125.png'},{'revision':'9359aeaf729a657eca201e6605bcdf30','url':'assets/apple-touch-startup-image-2532x1170.png'},{'revision':'9014244d3b619445946aed6d87fbf1fb','url':'assets/apple-touch-startup-image-2556x1179.png'},{'revision':'a9bfe7a40660334916ebebdcca6061d0','url':'assets/apple-touch-startup-image-2688x1242.png'},{'revision':'0c6d45655084e9614867885d33a9a603','url':'assets/apple-touch-startup-image-2732x2048.png'},{'revision':'56e10262a0f19d253c2350359494aebe','url':'assets/apple-touch-startup-image-2778x1284.png'},{'revision':'ccd2a5470640091ed5ed35d9a77ad4db','url':'assets/apple-touch-startup-image-2796x1290.png'},{'revision':'236a376ee621dc29fddef2f05dc28d5b','url':'assets/apple-touch-startup-image-640x1136.png'},{'revision':'6a578953c4a83a95a6ee5114ccdc28e6','url':'assets/apple-touch-startup-image-750x1334.png'},{'revision':'2258ba0150ce45a5d98de215c4e7fadc','url':'assets/apple-touch-startup-image-828x1792.png'},{'revision':'b2c5abf2b91648116fdf6e412f6d2677','url':'assets/browserconfig.xml'},{'revision':'15e424e7d71bbc4deb0f7955dd4586b8','url':'assets/favicon-16x16.png'},{'revision':'8e85e59571a2ecdfa90e26ef9cc663fa','url':'assets/favicon-32x32.png'},{'revision':'29bcdda9912fde609a9499fdf45a1a19','url':'assets/favicon-48x48.png'},{'revision':'595812fd279563657242ba2b4fa73017','url':'assets/favicon.ico'},{'revision':'86763cc590a1bce51a49adaf5be7b4c2','url':'assets/manifest.webmanifest'},{'revision':'624c23411720410aaad29b2b6c4209fb','url':'assets/mstile-144x144.png'},{'revision':'f633f5c7a2e8d8b953d32b9362bdfb3d','url':'assets/mstile-150x150.png'},{'revision':'4242fc2ceb681f473938456a49dedead','url':'assets/mstile-310x150.png'},{'revision':'c9aaabd76948d067a95a651dfc398cc5','url':'assets/mstile-310x310.png'},{'revision':'f9251e9f77d27e5e7bee56b4ce4f611d','url':'assets/mstile-70x70.png'},{'revision':'1e1da41e7de37298d091228d5bde9ae6','url':'assets/yandex-browser-50x50.png'},{'revision':'1fa786b96e710d40404b454e3f54141c','url':'assets/yandex-browser-manifest.json'},{'revision':null,'url':'b7bcc075b395c14ce8c2.woff2?dd67030699838ea613ee6dbda90effa6'},{'revision':'6eda704017c1374e7e3957d81a36f1b6','url':'components.bundle.js'},{'revision':'0760fae8cf2d2b172678847987d1d95c','url':'data/DATA.json'},{'revision':'62333ca2f6352c3ef28b0f12c68f3199','url':'images/assets/error-pict-landscape-large.jpg'},{'revision':'ca5e67de63ab0b798629d57aa847f25c','url':'images/assets/error-pict-landscape-small.jpg'},{'revision':'7d9f78bb2df980cf3047a92d4cbe6329','url':'images/assets/error-pict-landscape.png'},{'revision':'f55426082e354720b7530a522532dcc6','url':'images/heros/hero-image_1-large.jpg'},{'revision':'f283ab4e4f3f1cf6f73f8717579bfd00','url':'images/heros/hero-image_1-small.jpg'},{'revision':'a2f444d9e2e43a5d0373b1a0d8cb2236','url':'images/heros/hero-image_1.jpg'},{'revision':'10c09eac688c83445d9fae66f79a7fe9','url':'images/heros/hero-image_2-large.jpg'},{'revision':'e600b54f9aabb7a00b7d960ec94dae67','url':'images/heros/hero-image_2-small.jpg'},{'revision':'49f78cae81de4f48caf1c2fe0271c828','url':'images/heros/hero-image_2.jpg'},{'revision':'db02aeeb331d5bbc9c1088713070a340','url':'images/heros/hero-image_3-large.jpg'},{'revision':'39b79b7df7bdf374a9e192ed4ccb2825','url':'images/heros/hero-image_3-small.jpg'},{'revision':'d232e05589056e05f52cf2689f315c6c','url':'images/heros/hero-image_3.jpg'},{'revision':'6241b882870f6ed8f27e0a26e554b7be','url':'images/heros/hero-image_4-large.jpg'},{'revision':'19fe841c9f096d9e79b538aeb1859bc0','url':'images/heros/hero-image_4-small.jpg'},{'revision':'4ea98fe648a0b853ab379c928b5fd0bf','url':'images/heros/hero-image_4.jpg'},{'revision':'470d90500ea6bc968afe9e4e2b06238c','url':'images/icon/dicoding-test-icon-large.jpg'},{'revision':'cbc194df33be88d4df5dd7848a6fa4c1','url':'images/icon/dicoding-test-icon-small.jpg'},{'revision':'3d7d7aa15b44ef9c864b1b3d9c1c3c67','url':'images/icon/dicoding-test-icon.jpeg'},{'revision':'97d54a764091f92ab7e988b075f959dc','url':'images/icon/logo-fit-large.jpg'},{'revision':'465ca50c59149174f74fae32dccf0039','url':'images/icon/logo-fit-small.jpg'},{'revision':'92e133835fa61cbc5d6976fa74e8e7e2','url':'images/icon/logo-fit.png'},{'revision':'5a7fbd081374a43f7e8a81a535170bb9','url':'images/icon/logo-only-icon-large.jpg'},{'revision':'49d9395a97fed076f4ba0f5354069737','url':'images/icon/logo-only-icon-small.jpg'},{'revision':'56c73f17fb68b6a4be7ba6f0b393ecb7','url':'images/icon/logo-only-icon.png'},{'revision':'42adf66d1c3d4325b5a59bac7e070d10','url':'images/icon/logo-ori-large.jpg'},{'revision':'2247ae9e3cf64c7c0b2c9a5824d9f987','url':'images/icon/logo-ori-small.jpg'},{'revision':'29be83b07d785f32036c1cfd080add1e','url':'images/icon/logo-ori.png'},{'revision':'b6fdfc721c020f5d7e96df42c7040bc3','url':'index.html'},{'revision':'684719b9881a77b12a8fc44e96aee880','url':'index~a51fa3f5.bundle.js'},{'revision':'4e0e34f265fae8f33b01b27ae29d9d6f','url':'index~a51fa3f5.bundle.js.LICENSE.txt'},{'revision':'2e7a7ec21d85b9b2f69f734cb5c94a57','url':'index~ab203b3b.bundle.js'},{'revision':'4e0e34f265fae8f33b01b27ae29d9d6f','url':'index~ab203b3b.bundle.js.LICENSE.txt'},{'revision':'d1a96e4111cae5f9da4c7e6efc9e06e1','url':'index~cd449d55.bundle.js'},{'revision':'4e0e34f265fae8f33b01b27ae29d9d6f','url':'index~cd449d55.bundle.js.LICENSE.txt'},{'revision':'4361bc99f58d6feeddf8275d7f114f5f','url':'index~e4317507.bundle.js'},{'revision':'1b573005bfe92c372d42c912f467f9cf','url':'index~e4317507.bundle.js.LICENSE.txt'},{'revision':'445e3cb4825ed5d45375451ec822ed58','url':'serviceWorkerHandler.bundle.js'},{'revision':'4e0e34f265fae8f33b01b27ae29d9d6f','url':'serviceWorkerHandler.bundle.js.LICENSE.txt'},{'revision':'d41d8cd98f00b204e9800998ecf8427e','url':'style.bundle.js'},{'revision':'cec2caf6d1bc796be414d77641780eeb','url':'style.css'},{'revision':'8aa8c8ba22f0242d2143438632665368','url':'views/pages/404.html'},{'revision':'6492c5d618bde9cf7b39ac979de8be92','url':'views/pages/favorite.html'},{'revision':'b9bc8870163ac6e959d8273b6116c188','url':'views/pages/home.html'},{'revision':'490d0cc3ad393f554e51e5faef94d137','url':'views/pages/resto-detail.html'},{'revision':'04bafca59a3de2276de8362dd75df77b','url':'views/pages/testing.html'}]),function(e){const t=U();E(new P(t,e))}(O);var I=new L((function(e){return e.url.href.startsWith("".concat(W().RESTAURANT_ENDPOINT,"/"))}),new class extends R{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(x)}async _handle(e,s){const a=s.fetchAndCachePut(e).catch((()=>{}));s.waitUntil(a);let n,r=await s.cacheMatch(e);if(r)0;else{0;try{r=await a}catch(e){e instanceof Error&&(n=e)}}if(!r)throw new t("no-response",{url:e.url,error:n});return r}}({cacheName:"restaurants-api"}));E(I),self.addEventListener("install",(function(){console.log("Service Worker: Installed"),self.skipWaiting()})),self.addEventListener("push",(function(e){console.log("Service Worker: Pushed");var t="Push Notification",s={body:"This is a push notification",icon:"/favicon.webp",image:"/icon-512x512/icon-512x512.webp"},a=self.registration.showNotification(t,s);e.waitUntil(a)}))})()})();
//# sourceMappingURL=sw.bundle.js.map