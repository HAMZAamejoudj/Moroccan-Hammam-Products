import Script from "next/script";

/** Runs before React hydrates so `<html lang/dir>` matches /en, /fr, /ar routes. */
export function SyncDocumentLocale() {
  return (
    <Script id="sync-document-locale" strategy="beforeInteractive">
      {`(function(){var m=location.pathname.match(/^\\/(en|fr|ar)(?=\\/|$)/);if(m){var l=m[1];document.documentElement.lang=l;document.documentElement.dir=l==="ar"?"rtl":"ltr";}function stripExt(){document.querySelectorAll("[bis_skin_checked]").forEach(function(n){n.removeAttribute("bis_skin_checked");});}stripExt();if(typeof MutationObserver!=="undefined"){var t0=Date.now();var obs=new MutationObserver(function(){stripExt();if(Date.now()-t0>8000)obs.disconnect();});obs.observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:["bis_skin_checked"]});}})();`}
    </Script>
  );
}
