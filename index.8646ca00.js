!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},r=e.parcelRequire262f;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in t){var r=t[e];delete t[e];var i={id:e,exports:{}};return n[e]=i,r.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){t[e]=n},e.parcelRequire262f=r),r.register("jcFG7",(function(e,n){var t,r,i,o;t=e.exports,r="createPaginationButtons",i=function(){return a},Object.defineProperty(t,r,{get:i,set:o,enumerable:!0,configurable:!0});function a(e,n){var t=function(t){var i=document.createElement("button");i.textContent=t,t===e&&i.classList.add("active"),i.addEventListener("click",(function(){n(t)})),r.appendChild(i)},r=document.querySelector(".pagination");r.innerHTML="";var i=document.createElement("button");i.innerHTML="&laquo;",i.addEventListener("click",(function(){e>1&&n(1)})),r.appendChild(i);for(var o=Math.min(e+2,500),a=Math.max(1,o-4);a<=o;a++)t(a);var c=document.createElement("button");c.innerHTML="&raquo;",c.addEventListener("click",(function(){e<500&&n(500)})),r.appendChild(c)}})),r("jcFG7")}();
//# sourceMappingURL=index.8646ca00.js.map