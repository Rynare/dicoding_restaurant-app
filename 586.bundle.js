(self.webpackChunkrestaurant_apps=self.webpackChunkrestaurant_apps||[]).push([[586],{879:t=>{!function(e,r){var n=function(t,e,r){"use strict";var n,o;if(function(){var e,r={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",fastLoadedClass:"ls-is-cached",iframeLoadMode:0,srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};for(e in o=t.lazySizesConfig||t.lazysizesConfig||{},r)e in o||(o[e]=r[e])}(),!e||!e.getElementsByClassName)return{init:function(){},cfg:o,noSupport:!0};var i=e.documentElement,a=t.HTMLPictureElement,s="addEventListener",c="getAttribute",u=t[s].bind(t),l=t.setTimeout,f=t.requestAnimationFrame||l,d=t.requestIdleCallback,h=/^picture$/i,p=["load","error","lazyincluded","_lazyloaded"],y={},v=Array.prototype.forEach,g=function(t,e){return y[e]||(y[e]=new RegExp("(\\s|^)"+e+"(\\s|$)")),y[e].test(t[c]("class")||"")&&y[e]},m=function(t,e){g(t,e)||t.setAttribute("class",(t[c]("class")||"").trim()+" "+e)},w=function(t,e){var r;(r=g(t,e))&&t.setAttribute("class",(t[c]("class")||"").replace(r," "))},b=function(t,e,r){var n=r?s:"removeEventListener";r&&b(t,e),p.forEach((function(r){t[n](r,e)}))},E=function(t,r,o,i,a){var s=e.createEvent("Event");return o||(o={}),o.instance=n,s.initEvent(r,!i,!a),s.detail=o,t.dispatchEvent(s),s},z=function(e,r){var n;!a&&(n=t.picturefill||o.pf)?(r&&r.src&&!e[c]("srcset")&&e.setAttribute("srcset",r.src),n({reevaluate:!0,elements:[e]})):r&&r.src&&(e.src=r.src)},L=function(t,e){return(getComputedStyle(t,null)||{})[e]},C=function(t,e,r){for(r=r||t.offsetWidth;r<o.minSize&&e&&!t._lazysizesWidth;)r=e.offsetWidth,e=e.parentNode;return r},x=(mt=[],wt=[],bt=mt,Et=function(){var t=bt;for(bt=mt.length?wt:mt,vt=!0,gt=!1;t.length;)t.shift()();vt=!1},zt=function(t,r){vt&&!r?t.apply(this,arguments):(bt.push(t),gt||(gt=!0,(e.hidden?l:f)(Et)))},zt._lsFlush=Et,zt),A=function(t,e){return e?function(){x(t)}:function(){var e=this,r=arguments;x((function(){t.apply(e,r)}))}},_=function(t){var e,n=0,i=o.throttleDelay,a=o.ricTimeout,s=function(){e=!1,n=r.now(),t()},c=d&&a>49?function(){d(s,{timeout:a}),a!==o.ricTimeout&&(a=o.ricTimeout)}:A((function(){l(s)}),!0);return function(t){var o;(t=!0===t)&&(a=33),e||(e=!0,(o=i-(r.now()-n))<0&&(o=0),t||o<9?c():l(c,o))}},I=function(t){var e,n,o=99,i=function(){e=null,t()},a=function(){var t=r.now()-n;t<o?l(a,o-t):(d||i)(i)};return function(){n=r.now(),e||(e=l(a,o))}},B=(Q=/^img$/i,U=/^iframe$/i,Y="onscroll"in t&&!/(gle|ing)bot/.test(navigator.userAgent),J=0,X=0,Z=0,tt=-1,et=function(t){Z--,(!t||Z<0||!t.target)&&(Z=0)},rt=function(t){return null==K&&(K="hidden"==L(e.body,"visibility")),K||!("hidden"==L(t.parentNode,"visibility")&&"hidden"==L(t,"visibility"))},nt=function(t,r){var n,o=t,a=rt(t);for($-=r,V+=r,q-=r,H+=r;a&&(o=o.offsetParent)&&o!=e.body&&o!=i;)(a=(L(o,"opacity")||1)>0)&&"visible"!=L(o,"overflow")&&(n=o.getBoundingClientRect(),a=H>n.left&&q<n.right&&V>n.top-1&&$<n.bottom+1);return a},ot=function(){var t,r,a,s,u,l,f,d,h,p,y,v,g=n.elements;if((T=o.loadMode)&&Z<8&&(t=g.length)){for(r=0,tt++;r<t;r++)if(g[r]&&!g[r]._lazyRace)if(!Y||n.prematureUnveil&&n.prematureUnveil(g[r]))dt(g[r]);else if((d=g[r][c]("data-expand"))&&(l=1*d)||(l=X),p||(p=!o.expand||o.expand<1?i.clientHeight>500&&i.clientWidth>500?500:370:o.expand,n._defEx=p,y=p*o.expFactor,v=o.hFac,K=null,X<y&&Z<1&&tt>2&&T>2&&!e.hidden?(X=y,tt=0):X=T>1&&tt>1&&Z<6?p:J),h!==l&&(R=innerWidth+l*v,G=innerHeight+l,f=-1*l,h=l),a=g[r].getBoundingClientRect(),(V=a.bottom)>=f&&($=a.top)<=G&&(H=a.right)>=f*v&&(q=a.left)<=R&&(V||H||q||$)&&(o.loadHidden||rt(g[r]))&&(O&&Z<3&&!d&&(T<3||tt<4)||nt(g[r],l))){if(dt(g[r]),u=!0,Z>9)break}else!u&&O&&!s&&Z<4&&tt<4&&T>2&&(j[0]||o.preloadAfterLoad)&&(j[0]||!d&&(V||H||q||$||"auto"!=g[r][c](o.sizesAttr)))&&(s=j[0]||g[r]);s&&!u&&dt(s)}},it=_(ot),at=function(t){var e=t.target;e._lazyCache?delete e._lazyCache:(et(t),m(e,o.loadedClass),w(e,o.loadingClass),b(e,ct),E(e,"lazyloaded"))},st=A(at),ct=function(t){st({target:t.target})},ut=function(t,e){var r=t.getAttribute("data-load-mode")||o.iframeLoadMode;0==r?t.contentWindow.location.replace(e):1==r&&(t.src=e)},lt=function(t){var e,r=t[c](o.srcsetAttr);(e=o.customMedia[t[c]("data-media")||t[c]("media")])&&t.setAttribute("media",e),r&&t.setAttribute("srcset",r)},ft=A((function(t,e,r,n,i){var a,s,u,f,d,p;(d=E(t,"lazybeforeunveil",e)).defaultPrevented||(n&&(r?m(t,o.autosizesClass):t.setAttribute("sizes",n)),s=t[c](o.srcsetAttr),a=t[c](o.srcAttr),i&&(f=(u=t.parentNode)&&h.test(u.nodeName||"")),p=e.firesLoad||"src"in t&&(s||a||f),d={target:t},m(t,o.loadingClass),p&&(clearTimeout(F),F=l(et,2500),b(t,ct,!0)),f&&v.call(u.getElementsByTagName("source"),lt),s?t.setAttribute("srcset",s):a&&!f&&(U.test(t.nodeName)?ut(t,a):t.src=a),i&&(s||f)&&z(t,{src:a})),t._lazyRace&&delete t._lazyRace,w(t,o.lazyClass),x((function(){var e=t.complete&&t.naturalWidth>1;p&&!e||(e&&m(t,o.fastLoadedClass),at(d),t._lazyCache=!0,l((function(){"_lazyCache"in t&&delete t._lazyCache}),9)),"lazy"==t.loading&&Z--}),!0)})),dt=function(t){if(!t._lazyRace){var e,r=Q.test(t.nodeName),n=r&&(t[c](o.sizesAttr)||t[c]("sizes")),i="auto"==n;(!i&&O||!r||!t[c]("src")&&!t.srcset||t.complete||g(t,o.errorClass)||!g(t,o.lazyClass))&&(e=E(t,"lazyunveilread").detail,i&&D.updateElem(t,!0,t.offsetWidth),t._lazyRace=!0,Z++,ft(t,e,i,n,r))}},ht=I((function(){o.loadMode=3,it()})),pt=function(){3==o.loadMode&&(o.loadMode=2),ht()},yt=function(){O||(r.now()-W<999?l(yt,999):(O=!0,o.loadMode=3,it(),u("scroll",pt,!0)))},{_:function(){W=r.now(),n.elements=e.getElementsByClassName(o.lazyClass),j=e.getElementsByClassName(o.lazyClass+" "+o.preloadClass),u("scroll",it,!0),u("resize",it,!0),u("pageshow",(function(t){if(t.persisted){var r=e.querySelectorAll("."+o.loadingClass);r.length&&r.forEach&&f((function(){r.forEach((function(t){t.complete&&dt(t)}))}))}})),t.MutationObserver?new MutationObserver(it).observe(i,{childList:!0,subtree:!0,attributes:!0}):(i[s]("DOMNodeInserted",it,!0),i[s]("DOMAttrModified",it,!0),setInterval(it,999)),u("hashchange",it,!0),["focus","mouseover","click","load","transitionend","animationend"].forEach((function(t){e[s](t,it,!0)})),/d$|^c/.test(e.readyState)?yt():(u("load",yt),e[s]("DOMContentLoaded",it),l(yt,2e4)),n.elements.length?(ot(),x._lsFlush()):it()},checkElems:it,unveil:dt,_aLSL:pt}),D=(M=A((function(t,e,r,n){var o,i,a;if(t._lazysizesWidth=n,n+="px",t.setAttribute("sizes",n),h.test(e.nodeName||""))for(i=0,a=(o=e.getElementsByTagName("source")).length;i<a;i++)o[i].setAttribute("sizes",n);r.detail.dataAttr||z(t,r.detail)})),k=function(t,e,r){var n,o=t.parentNode;o&&(r=C(t,o,r),(n=E(t,"lazybeforesizes",{width:r,dataAttr:!!e})).defaultPrevented||(r=n.detail.width)&&r!==t._lazysizesWidth&&M(t,o,n,r))},P=I((function(){var t,e=S.length;if(e)for(t=0;t<e;t++)k(S[t])})),{_:function(){S=e.getElementsByClassName(o.autosizesClass),u("resize",P)},checkElems:P,updateElem:k}),N=function(){!N.i&&e.getElementsByClassName&&(N.i=!0,D._(),B._())};var S,M,k,P;var j,O,F,T,W,R,G,$,q,H,V,K,Q,U,Y,J,X,Z,tt,et,rt,nt,ot,it,at,st,ct,ut,lt,ft,dt,ht,pt,yt;var vt,gt,mt,wt,bt,Et,zt;return l((function(){o.init&&N()})),n={cfg:o,autoSizer:D,loader:B,init:N,uP:z,aC:m,rC:w,hC:g,fire:E,gW:C,rAF:x}}(e,e.document,Date);e.lazySizes=n,t.exports&&(t.exports=n)}("undefined"!=typeof window?window:{})},552:(t,e,r)=>{var n,o,i;!function(a,s){if(a){s=s.bind(null,a,a.document),t.exports?s(r(879)):(o=[r(879)],void 0===(i="function"==typeof(n=s)?n.apply(e,o):n)||(t.exports=i))}}("undefined"!=typeof window?window:0,(function(t,e,r){"use strict";if(t.addEventListener){var n=/\s+(\d+)(w|h)\s+(\d+)(w|h)/,o=/parent-fit["']*\s*:\s*["']*(contain|cover|width)/,i=/parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/,a=/^picture$/i,s=r.cfg,c={getParent:function(e,r){var n=e,o=e.parentNode;return r&&"prev"!=r||!o||!a.test(o.nodeName||"")||(o=o.parentNode),"self"!=r&&(n="prev"==r?e.previousElementSibling:r&&(o.closest||t.jQuery)&&(o.closest?o.closest(r):jQuery(o).closest(r)[0])||o),n},getFit:function(t){var e,r,n=getComputedStyle(t,null)||{},a=n.content||n.fontFamily,s={fit:t._lazysizesParentFit||t.getAttribute("data-parent-fit")};return!s.fit&&a&&(e=a.match(o))&&(s.fit=e[1]),s.fit?(!(r=t._lazysizesParentContainer||t.getAttribute("data-parent-container"))&&a&&(e=a.match(i))&&(r=e[1]),s.parent=c.getParent(t,r)):s.fit=n.objectFit,s},getImageRatio:function(e){var r,o,i,c,u,l,f,d=e.parentNode,h=d&&a.test(d.nodeName||"")?d.querySelectorAll("source, img"):[e];for(r=0;r<h.length;r++)if(o=(e=h[r]).getAttribute(s.srcsetAttr)||e.getAttribute("srcset")||e.getAttribute("data-pfsrcset")||e.getAttribute("data-risrcset")||"",i=e._lsMedia||e.getAttribute("media"),i=s.customMedia[e.getAttribute("data-media")||i]||i,o&&(!i||(t.matchMedia&&matchMedia(i)||{}).matches)){(c=parseFloat(e.getAttribute("data-aspectratio")))||((u=o.match(n))?"w"==u[2]?(l=u[1],f=u[3]):(l=u[3],f=u[1]):(l=e.getAttribute("width"),f=e.getAttribute("height")),c=l/f);break}return c},calculateSize:function(t,e){var r,n,o,i=this.getFit(t),a=i.fit,s=i.parent;return"width"==a||("contain"==a||"cover"==a)&&(n=this.getImageRatio(t))?(s?e=s.clientWidth:s=t,o=e,"width"==a?o=e:(r=e/s.clientHeight)&&("cover"==a&&r<n||"contain"==a&&r>n)&&(o=e*(n/r)),o):e}};r.parentFit=c,e.addEventListener("lazybeforesizes",(function(t){if(!t.defaultPrevented&&t.detail.instance==r){var e=t.target;t.detail.width=c.calculateSize(e,t.detail.width)}}))}}))},452:t=>{var e=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var i=e&&e.prototype instanceof g?e:g,a=Object.create(i.prototype),s=new D(n||[]);return o(a,"_invoke",{value:A(t,r,s)}),a}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var d="suspendedStart",h="suspendedYield",p="executing",y="completed",v={};function g(){}function m(){}function w(){}var b={};u(b,a,(function(){return this}));var E=Object.getPrototypeOf,z=E&&E(E(N([])));z&&z!==r&&n.call(z,a)&&(b=z);var L=w.prototype=g.prototype=Object.create(b);function C(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){function r(o,i,a,s){var c=f(t[o],t,i);if("throw"!==c.type){var u=c.arg,l=u.value;return l&&"object"==typeof l&&n.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,a,s)}),(function(t){r("throw",t,a,s)})):e.resolve(l).then((function(t){u.value=t,a(u)}),(function(t){return r("throw",t,a,s)}))}s(c.arg)}var i;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}})}function A(t,r,n){var o=d;return function(i,a){if(o===p)throw new Error("Generator is already running");if(o===y){if("throw"===i)throw a;return{value:e,done:!0}}for(n.method=i,n.arg=a;;){var s=n.delegate;if(s){var c=_(s,n);if(c){if(c===v)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===d)throw o=y,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=p;var u=f(t,r,n);if("normal"===u.type){if(o=n.done?y:h,u.arg===v)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(o=y,n.method="throw",n.arg=u.arg)}}}function _(t,r){var n=r.method,o=t.iterator[n];if(o===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,_(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),v;var i=f(o,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,v;var a=i.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function I(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function B(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function D(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(I,this),this.reset(!0)}function N(t){if(null!=t){var r=t[a];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}throw new TypeError(typeof t+" is not iterable")}return m.prototype=w,o(L,"constructor",{value:w,configurable:!0}),o(w,"constructor",{value:m,configurable:!0}),m.displayName=u(w,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,u(t,c,"GeneratorFunction")),t.prototype=Object.create(L),t},t.awrap=function(t){return{__await:t}},C(x.prototype),u(x.prototype,s,(function(){return this})),t.AsyncIterator=x,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new x(l(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},C(L),u(L,c,"Generator"),u(L,a,(function(){return this})),u(L,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=N,D.prototype={constructor:D,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(B),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return s.type="throw",s.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),B(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;B(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:N(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=e}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}},602:(t,e,r)=>{"use strict";r.d(e,{P2:()=>y});const n=(t,e)=>e.some((e=>t instanceof e));let o,i;const a=new WeakMap,s=new WeakMap,c=new WeakMap;let u={get(t,e,r){if(t instanceof IDBTransaction){if("done"===e)return a.get(t);if("store"===e)return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return h(t[e])},set:(t,e,r)=>(t[e]=r,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function l(t){u=t(u)}function f(t){return(i||(i=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(p(this),e),h(this.request)}:function(...e){return h(t.apply(p(this),e))}}function d(t){return"function"==typeof t?f(t):(t instanceof IDBTransaction&&function(t){if(a.has(t))return;const e=new Promise(((e,r)=>{const n=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",i),t.removeEventListener("abort",i)},o=()=>{e(),n()},i=()=>{r(t.error||new DOMException("AbortError","AbortError")),n()};t.addEventListener("complete",o),t.addEventListener("error",i),t.addEventListener("abort",i)}));a.set(t,e)}(t),n(t,o||(o=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(t,u):t)}function h(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,r)=>{const n=()=>{t.removeEventListener("success",o),t.removeEventListener("error",i)},o=()=>{e(h(t.result)),n()},i=()=>{r(t.error),n()};t.addEventListener("success",o),t.addEventListener("error",i)}));return c.set(e,t),e}(t);if(s.has(t))return s.get(t);const e=d(t);return e!==t&&(s.set(t,e),c.set(e,t)),e}const p=t=>c.get(t);function y(t,e,{blocked:r,upgrade:n,blocking:o,terminated:i}={}){const a=indexedDB.open(t,e),s=h(a);return n&&a.addEventListener("upgradeneeded",(t=>{n(h(a.result),t.oldVersion,t.newVersion,h(a.transaction),t)})),r&&a.addEventListener("blocked",(t=>r(t.oldVersion,t.newVersion,t))),s.then((t=>{i&&t.addEventListener("close",(()=>i())),o&&t.addEventListener("versionchange",(t=>o(t.oldVersion,t.newVersion,t)))})).catch((()=>{})),s}const v=["get","getKey","getAll","getAllKeys","count"],g=["put","add","delete","clear"],m=new Map;function w(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(m.get(e))return m.get(e);const r=e.replace(/FromIndex$/,""),n=e!==r,o=g.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!o&&!v.includes(r))return;const i=async function(t,...e){const i=this.transaction(t,o?"readwrite":"readonly");let a=i.store;return n&&(a=a.index(e.shift())),(await Promise.all([a[r](...e),o&&i.done]))[0]};return m.set(e,i),i}l((t=>({...t,get:(e,r,n)=>w(e,r)||t.get(e,r,n),has:(e,r)=>!!w(e,r)||t.has(e,r)})));const b=["continue","continuePrimaryKey","advance"],E={},z=new WeakMap,L=new WeakMap,C={get(t,e){if(!b.includes(e))return t[e];let r=E[e];return r||(r=E[e]=function(...t){z.set(this,L.get(this)[e](...t))}),r}};async function*x(...t){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...t)),!e)return;const r=new Proxy(e,C);for(L.set(r,e),c.set(r,p(e));e;)yield r,e=await(z.get(r)||e.continue()),z.delete(r)}function A(t,e){return e===Symbol.asyncIterator&&n(t,[IDBIndex,IDBObjectStore,IDBCursor])||"iterate"===e&&n(t,[IDBIndex,IDBObjectStore])}l((t=>({...t,get:(e,r,n)=>A(e,r)?x:t.get(e,r,n),has:(e,r)=>A(e,r)||t.has(e,r)})))}}]);
//# sourceMappingURL=586.bundle.js.map