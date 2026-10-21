/**
 * Bitdefender (and similar) inject `bis_skin_checked` on divs before React
 * hydrates, which shows up as a hydration mismatch. Strip it as early as
 * possible and keep stripping until hydration has settled.
 */
const STRIP_EXTENSION_ATTRS = `(function(){function strip(){document.querySelectorAll("[bis_skin_checked],[__processed]").forEach(function(n){n.removeAttribute("bis_skin_checked");n.removeAttribute("__processed");});}strip();if(typeof MutationObserver==="undefined")return;var t0=Date.now();var obs=new MutationObserver(function(){strip();if(Date.now()-t0>8000)obs.disconnect();});obs.observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:["bis_skin_checked","__processed"]});})();`;

export function StripExtensionHydrationAttrs() {
  return (
    <script
      id="strip-extension-hydration-attrs"
      dangerouslySetInnerHTML={{ __html: STRIP_EXTENSION_ATTRS }}
    />
  );
}
