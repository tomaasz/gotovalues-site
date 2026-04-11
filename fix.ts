const originalStr = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "brandName",
    "url": "https://gotovalues.com",
    "description": "Dedykowane aplikacje webowe i narzędzia AI dla firm, które chcą uporządkować dokumenty, workflow i ręczną pracę w procesach operacyjnych.",
    "inLanguage": "pl"
  });

console.log(originalStr.split('<').join('\\u003c').split('>').join('\\u003e').split('&').join('\\u0026'));
