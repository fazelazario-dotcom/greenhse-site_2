/* ============================================================
   home/09-legal-pages.js
   privacy / terms / returns draft text and the overlay that shows them
   Part of the homepage app: built into home-app.js by
   scripts/build-home-app.js - edit HERE, not the built file.
   ============================================================ */
/* ---------- LEGAL PAGES (first drafts — have reviewed before publishing) ---------- */
const DISCLAIMER='<div class="disclaimer"><b>Please note:</b> this is a starting template provided for review. Have it checked by a legal professional and confirm it reflects Greenhse\'s actual practices before publishing.</div>';
const LEGAL={
 privacy:{title:"Privacy Policy",html:`
   <p>Greenhse Technologies ("we", "us") respects your privacy. This policy explains what we collect, how we use it, and your rights. It applies to greenhse.com and our services.</p>
   <h3>What we collect</h3>
   <ul><li>Details you give us — name, email, phone, delivery/billing address, and order information.</li>
   <li>Technical data — IP address, browser/device type, and pages visited, via cookies and analytics.</li></ul>
   <h3>How we use it</h3>
   <ul><li>To process orders, quotes and enquiries and provide support.</li>
   <li>To improve our website and range, and (if you opt in) to send updates you can unsubscribe from at any time.</li>
   <li>To meet our legal and tax obligations.</li></ul>
   <h3>Cookies</h3>
   <p>We use essential cookies to make the site work and, with your consent, analytics cookies to understand usage. You can control cookies through your browser and our consent banner.</p>
   <h3>Sharing</h3>
   <p>We share data only with providers who help us operate (e.g. payment, delivery and IT providers) and where required by law. We do not sell your personal information.</p>
   <h3>Your rights</h3>
   <p>You may request access to, or correction of, your personal information, and ask us to stop marketing to you. Contact us on (08) 9297 2969 or at our Ellenbrook showroom. We handle information in line with the Australian Privacy Principles.</p>`+DISCLAIMER},
 terms:{title:"Terms & Conditions",html:`
   <p>These terms govern your use of greenhse.com and any purchase from Greenhse Technologies. By using the site you agree to them.</p>
   <h3>Products & pricing</h3>
   <p>We aim to keep product information, availability and pricing accurate, but errors can occur and prices may change without notice. Prices are shown in Australian dollars; GST is shown where applicable. An order is only accepted once we confirm it.</p>
   <h3>Orders</h3>
   <p>We may decline or cancel an order (for example, where stock or a pricing error applies) and will refund any payment taken in that case.</p>
   <h3>Intellectual property</h3>
   <p>All content on this site is owned by or licensed to Greenhse Technologies and may not be copied or reused without permission.</p>
   <h3>Liability</h3>
   <p>Nothing in these terms excludes rights you have under the Australian Consumer Law. To the extent permitted by law, our liability is limited to resupplying the relevant goods or the cost of doing so.</p>
   <h3>Governing law</h3>
   <p>These terms are governed by the laws of Western Australia.</p>`+DISCLAIMER},
 returns:{title:"Returns & Shipping",html:`
   <h3>Shipping</h3>
   <p>We ship Australia-wide and offer local pick-up from our Ellenbrook showroom. Delivery times and freight are calculated at checkout based on your location and order. You'll receive tracking once your order is dispatched.</p>
   <h3>Change of mind</h3>
   <p>Unused items in original, undamaged packaging may be returned within 30 days of delivery. Return freight for change-of-mind is the customer's responsibility, and a restocking fee may apply to some items.</p>
   <h3>Faulty or incorrect items</h3>
   <p>Our goods come with guarantees that cannot be excluded under the Australian Consumer Law. If an item is faulty, not as described, or arrives damaged, contact us and we'll arrange a repair, replacement or refund as required by law.</p>
   <h3>How to return</h3>
   <p>Call us on (08) 9297 2969 or bring the item to 5/1 Locke Ln, Ellenbrook WA 6069 with your proof of purchase, and we'll help you sort it out.</p>`+DISCLAIMER},
};
function openLegal(key){
  const L=LEGAL[key]; if(!L) return;
  $("#legalContent").innerHTML='<h2>'+L.title+'</h2><div class="upd">Last updated — for review</div>'+L.html;
  $("#legal").classList.add("open");
  $("#legalContent").scrollTop=0;
}
function closeLegal(){ $("#legal").classList.remove("open"); }


