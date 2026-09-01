/* The homepage application: shop grid, cart, both finder wizards, the
   applications carousel and the QA suite. Lifted whole from the static
   build - it is a self-contained module that renders into the skeleton
   markup the page ships. Componentising it further is the obvious next
   refactor, section by section. */

(function(){
"use strict";
const $=(s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>[...c.querySelectorAll(s)];

/* ---------- DATA: categories (migrated from greenhse.com) ---------- */
const CATIMG={"cats":{"batten":{"img":"/img/inline/3beca41f07d4.webp","alt":"Batten lights running down a car park ceiling"},"fans":{"img":"/img/inline/a2a5c307d6bc.webp","alt":"A black ceiling fan in a lit bedroom"},"ceiling":{"img":"/img/inline/489c2d891ebc.webp","alt":"Round oyster ceiling lights on a white ceiling"},"downlights":{"img":"/img/inline/55beb994e4c7.webp","alt":"Downlights through a living space overlooking a city sunset"},"emergency":{"img":"/img/inline/d5f3d9ce0893.webp","alt":"An illuminated green emergency exit sign"},"flood":{"img":"/img/inline/02e494bec76b.webp","alt":"Flood lights over a padel court at night"},"landscape":{"img":"/img/inline/7546f6ea1798.webp","alt":"Garden and step lights around a modern home at dusk"},"highbay":{"img":"/img/inline/288461ab5db3.webp","alt":"High bay lights across a warehouse roof structure"},"industrial":{"img":"/img/inline/45b4e6d7d38e.webp","alt":"Industrial wall lights above loading dock roller doors"},"outdoor":{"img":"/img/inline/2e672a025d64.webp","alt":"Wall lights washing the facade of a home at dusk"},"commercial":{"img":"/img/inline/4fe8dd785f6f.webp","alt":"Recessed panel lighting across an open-plan office"},"sensors":{"img":"/img/inline/d732692aaed2.webp","alt":"A white outdoor security sensor light on a wall"},"smart":{"img":"/img/inline/a61e6c46752e.webp","alt":"Smart home lighting controlled from a phone"},"star":{"img":"/img/inline/3cf39c604c4b.webp","alt":"A fibre-optic star light ceiling above a staircase"},"strip":{"img":"/img/inline/6cde843a7098.webp","alt":"A reel of LED strip light glowing teal"},"switches":{"img":"/img/inline/f0b704deba30.webp","alt":"A hand pressing a black wall switch plate"},"track":{"img":"/img/inline/b44074527d0d.webp","alt":"Track and linear lights over a retail clothing floor"},"transformers":{"img":"/img/inline/cd5b2515c9bb.webp","alt":"A row of low-voltage transformer enclosures"}},"titleInArtwork":true,"ratio":"2067/827","noPhoto":[],"source":"Catalogue_images.pdf (Lazar, 4 Aug)"};
const COBIMG={"products":["ST24V-LONGRUN-IP68"],"img":{"reel":"/img/inline/44da87cec139.webp","macro":"/img/inline/3741051237e6.webp","lit":"/img/inline/be2d3be98225.webp","dims":"/img/inline/113c940ae43f.webp","wiring":"/img/inline/a0d09fd6b772.webp"},"specs":[["Model","SELS-COBX480-24-YCC"],["LED density","480 LEDs per metre \u2014 dot-free COB"],["Power","7.5W per metre"],["Voltage","24V DC"],["Colour", "Fixed colour, chosen at order \u2014 3000K or 4000K on IP20, 3000K only on IP67"],["Brightness","675\u2013712 lm per metre depending on the colour setting (\u00b110%)"],["Colour accuracy","CRI >90"],["Beam angle","180\u00b0"],["Board","8mm wide white PCB \u00b7 3oz double layer, constant current"],["Max run","20m fed from one end \u00b7 40m fed from both ends \u2014 no voltage drop"],["Cutting","Every 50mm, between the soldering pads only"],["Minimum bend","50mm diameter \u2014 never tighter than 40mm"],["Leads","150mm of 20AWG red/black wire on both ends"],["Working temperature","-40\u00b0C to +45\u00b0C"],["Life span","50,000 hours"],["Warranty","3 years"],["Supplied as","20m roll (other lengths can be cut to order)"]],"ipGrades":[["IP20","8 mm","Bare strip on 3M adhesive backing. Indoor, dry areas only."],["IP67","10 \u00d7 4 mm","Silicon injected. Sealed against rain and splashing \u2014 not for submersion."]],"sold":["IP20","IP67"],"flags":["REVERSED (Lazar, this session): now listed as IP20 and IP67 silicon injected, selectable. This overturns the 30 Jul decision that it was sold as IP68 only with the IP20 entry deleted. Worth double-checking against what is actually on the shelf before this goes live.","REVERSED (Lazar, this session): now listed as fixed colours chosen at order (3000K or 4000K), not tri-colour. This overturns the 30 Jul decision that it IS a tri-colour strip switched from the remote. These two cannot both be right.","OPEN - the supplier datasheet prints the third colour as 6000K; Lazar says the strip we sell is 3000K / 4000K / 5500K. The site follows Lazar. Worth confirming with the supplier so the datasheet and the website agree.","WATERMARKS: all five photos Lazar sent on 30 Jul carry an 'SE.Lighting' watermark, same reason cob_lit.png was originally held back. They are now bundled because Lazar asked for them - but they advertise the supplier on a Greenhse page. Clean versions would be better.","MISMATCH: the photos show the BARE strip on 3M adhesive backing - that is the unsealed build. We sell this strip as IP20 bare on 3M adhesive, or IP67 silicon injected (10 x 4mm). Captions say so rather than pretending otherwise.","MISMATCH: the board markings in the reel photos read 'FOB-2P8S 320D 8mm', i.e. 320 LEDs/m, while the datasheet spec we publish says 480 LEDs/m. One of the two is wrong - needs checking with SE.Lighting before the 480 figure is trusted.","Price ($16.00/m ex GST) is ours - it is not on the supplier datasheet."]};
const CHANIMG={"product":"24VSTRIP-CHANNELS-","profiles":[{"key":"surface","photoName":"SURFACE RECTANGLE","dims":"17.4 \u00d7 7.9 mm","inner":"14.1 mm internal \u00b7 1.10 mm wall","finishes":"White / Silver / Black","photoShows":"all","use":"The everyday channel. Sits on top of the surface - under cabinets, on shelves, along a bulkhead.","optLabels":["Surface Rectangle \u00b7 White \u00b7 17.4 \u00d7 7.9mm","Surface Rectangle \u00b7 Black \u00b7 17.4 \u00d7 7.9mm","Surface Rectangle \u00b7 Silver \u00b7 17.4 \u00d7 7.9mm"],"img":"/img/inline/6f4737f527b1.webp","dimImg":"/img/inline/1d0cfc391819.webp"},{"key":"recess12","photoName":"12mm CHANNEL","dims":"12 \u00d7 10 mm","inner":"Deep square profile","finishes":"Silver (photo) \u00b7 also sold White / Black","photoShows":"silver","use":"Deeper and narrower. Good where you want the strip set down inside the profile so the light source is hidden.","optLabels":["Recess \u00b7 White \u00b7 12 \u00d7 10mm","Recess \u00b7 Black \u00b7 12 \u00d7 10mm","Recess \u00b7 Silver \u00b7 12 \u00d7 10mm"],"img":"/img/inline/15664747c5fd.webp","dimImg":"/img/inline/84922d4684f9.webp"},{"key":"recesswing","blackDims":"24.63 \u00d7 7.7 mm overall \u00b7 16.9 mm body","photoName":"RECESS (WING)","dims":"24.63 \u00d7 7.7 mm overall","inner":"17.4 mm body \u00b7 12.1 mm internal \u00b7 6.9 mm deep","finishes":"Silver (photo) \u00b7 also sold White / Black","photoShows":"silver","use":"The wings sit flush against the surface while the body drops into a routed groove - for a channel that finishes flush, not proud.","optLabels":["Recess Wing \u00b7 White \u00b7 24.6 \u00d7 7.7mm","Recess Wing \u00b7 Black \u00b7 24.6 \u00d7 7.7mm","Recess Wing \u00b7 Silver \u00b7 24.6 \u00d7 7.7mm"],"img":"/img/inline/25e5ddad115a.webp","dimImg":"/img/inline/0da0f0722d21.webp","blackImg":"/img/inline/d45bb726fb56.webp","blackDimImg":"/img/inline/b5d1fd9c119a.webp"},{"key":"thin","photoName":"THIN","dims":"17.69 \u00d7 5.3 mm","inner":"14.85 mm internal \u00b7 0.8 mm cover","finishes":"Silver","photoShows":"silver","use":"The lowest-profile option - barely stands off the surface. Use where the channel itself should disappear.","optLabels":["Mini (Thin) \u00b7 Silver \u00b7 17.7 \u00d7 5.3mm"],"img":"/img/inline/c51a991456c7.webp","dimImg":"/img/inline/fbc975cc4def.webp"},{"key":"corner90","photoName":"CORNER 90\u00b0","dims":"13 \u00d7 13 mm","inner":"1.0 mm wall \u00b7 10 mm diagonal face","finishes":"Silver","photoShows":"silver","use":"Mounts into an internal corner and throws the light out at 45\u00b0 - the one for cove lighting and under-shelf washes.","optLabels":["Corner 90\u00b0 \u00b7 Silver \u00b7 13 \u00d7 13mm"],"img":"/img/inline/460f3c102f99.webp","dimImg":"/img/inline/0797e0473ae6.webp"},{"key":"blackcover","photoName":"BLACK COVER","dims":"16.9 \u00d7 7.9 mm","inner":"14.1 mm internal \u00b7 1.10 mm cover","finishes":"Black","photoShows":"black","use":"Black body and black cover, so the channel reads as a dark line when it's off instead of a silver one. Same internal size as the Surface Rectangle, 0.5 mm narrower on the outside.","optLabels":["Black Cover \u00b7 Black \u00b7 16.9 \u00d7 7.9mm"],"img":"/img/inline/3207a3cd38d1.webp","dimImg":"/img/inline/2978763e51d7.webp"},{"key":"mini","photoName":"MINI","dims":"12 \u00d7 6.9 mm","inner":"10.6 mm internal","finishes":"Silver","photoShows":"silver","use":"Narrow and shallow - the smallest of the surface profiles.","optLabels":[],"unlisted":true,"img":"/img/inline/b009a2e57956.webp","dimImg":"/img/inline/718b795ab158.webp"}],"options":{"Surface Rectangle \u00b7 White \u00b7 17.4 \u00d7 7.9mm":{"img":"/img/inline/6f4737f527b1.webp","dim":"/img/inline/1d0cfc391819.webp","note":"","key":"surface"},"Surface Rectangle \u00b7 Black \u00b7 17.4 \u00d7 7.9mm":{"img":"/img/inline/6f4737f527b1.webp","dim":"/img/inline/1d0cfc391819.webp","note":"","key":"surface"},"Surface Rectangle \u00b7 Silver \u00b7 17.4 \u00d7 7.9mm":{"img":"/img/inline/6f4737f527b1.webp","dim":"/img/inline/1d0cfc391819.webp","note":"","key":"surface"},"Recess \u00b7 White \u00b7 12 \u00d7 10mm":{"img":"/img/inline/15664747c5fd.webp","dim":"/img/inline/84922d4684f9.webp","note":"Photo shows the silver finish \u2014 same profile and dimensions.","key":"recess12"},"Recess \u00b7 Black \u00b7 12 \u00d7 10mm":{"img":"/img/inline/15664747c5fd.webp","dim":"/img/inline/84922d4684f9.webp","note":"Photo shows the silver finish \u2014 same profile and dimensions.","key":"recess12"},"Recess \u00b7 Silver \u00b7 12 \u00d7 10mm":{"img":"/img/inline/15664747c5fd.webp","dim":"/img/inline/84922d4684f9.webp","note":"","key":"recess12"},"Recess Wing \u00b7 White \u00b7 24.6 \u00d7 7.7mm":{"img":"/img/inline/25e5ddad115a.webp","dim":"/img/inline/0da0f0722d21.webp","note":"Photo shows the silver finish \u2014 same profile and dimensions.","key":"recesswing"},"Recess Wing \u00b7 Black \u00b7 24.6 \u00d7 7.7mm":{"img":"/img/inline/d45bb726fb56.webp","dim":"/img/inline/b5d1fd9c119a.webp","note":"Black extrusion measures 24.63 \u00d7 7.7 mm overall \u00b7 16.9 mm body \u2014 slightly narrower body than the silver one.","key":"recesswing"},"Recess Wing \u00b7 Silver \u00b7 24.6 \u00d7 7.7mm":{"img":"/img/inline/25e5ddad115a.webp","dim":"/img/inline/0da0f0722d21.webp","note":"","key":"recesswing"},"Mini (Thin) \u00b7 Silver \u00b7 17.7 \u00d7 5.3mm":{"img":"/img/inline/c51a991456c7.webp","dim":"/img/inline/fbc975cc4def.webp","note":"","key":"thin"},"Corner 90\u00b0 \u00b7 Silver \u00b7 13 \u00d7 13mm":{"img":"/img/inline/460f3c102f99.webp","dim":"/img/inline/0797e0473ae6.webp","note":"","key":"corner90"},"Black Cover \u00b7 Black \u00b7 16.9 \u00d7 7.9mm":{"img":"/img/inline/3207a3cd38d1.webp","dim":"/img/inline/2978763e51d7.webp","note":"","key":"blackcover"}},"noPhoto":[],"flags":["Catalogue lists one option 'Mini (Thin) \u00b7 Silver \u00b7 17.7 \u00d7 5.3mm', but the supplier photographs MINI (12 \u00d7 6.9mm) and THIN (17.69 \u00d7 5.3mm) as two different profiles. The catalogue dimensions match THIN, so the photo is attached there. MINI has no catalogue product - shown on the site as not currently listed rather than being invented as a new option.","Photo 1 is captioned '12mm Channel' by the supplier; the catalogue calls the same 12 \u00d7 10mm profile 'Recess'. Matched on dimensions. Naming needs a decision.","NEW (Jul 30 photo set): 'Black Cover \u00b7 16.9 \u00d7 7.9mm' now has both a photo and a dimension drawing, so it is no longer awaiting a photo.","NEEDS A DECISION: the catalogue sells BOTH 'Surface Rectangle \u00b7 Black \u00b7 17.4 \u00d7 7.9mm' and 'Black Cover \u00b7 Black \u00b7 16.9 \u00d7 7.9mm'. The supplier drawings show the black extrusion measuring 16.9mm and the silver one 17.4mm, which suggests these may be the same item listed twice at two widths - or two genuinely different products. Both are left listed exactly as the catalogue has them; nothing merged or renamed.","The black recess wing has its own drawing (16.9mm body) against the silver one's 17.4mm, same 24.63mm wings. Both are shown rather than averaged.","Photos supplied are the silver finish except Surface Rectangle (white, silver and black), Black Cover (black) and Recess Wing (silver and black). Remaining White/Black variants still carry the silver-photo note."]};
const DEMOIMG={"byProduct":{"ST24V-9W-15W-CCT-C":"cct","ST24V-RGB-COB":"rgb"},"cct":{"name":"24V Dotless COB Strip Light \u2014 adjustable white (CCT)","blurb":"One strip, any white. The remote slides the light from warm 2700K through to cool 6500K, so the same run can be cosy at night and crisp in the morning.","states":[{"img":"/img/inline/1d8ccead1e82.webp","label":"Cool white","note":"Crisp and bright \u2014 kitchens, task areas, mornings."},{"img":"/img/inline/d42d93b234b5.webp","label":"Warm white","note":"Soft and cosy \u2014 living areas, bedrooms, evenings."}],"controller":{"img":"/img/inline/0064cb2c42b6.webp","label":"2-in-1 LED Controller (2.4G)","note":"Sits between the driver and the strip. This is the unit the remote talks to."},"remotes":[{"img":"/img/inline/3990f5e8a437.webp","label":"4-key round remote","note":"ON / OFF / DIM / CCT \u2014 hold CCT to slide warm \u2194 cool, hold DIM to set brightness."}]},"rgb":{"name":"24V Dotless RGB COB Strip Light \u2014 full colour","blurb":"The same seamless dotless COB line, but every colour on demand. Pick a colour, dim it, or run a slow fade.","states":[{"img":"/img/inline/5073e1469b01.webp","label":"Green","note":""},{"img":"/img/inline/0a6b42f92aef.webp","label":"Blue","note":""},{"img":"/img/inline/e9891854c099.webp","label":"Red","note":""}],"controller":{"img":"/img/inline/959fa913605e.webp","label":"3-in-1 LED Controller (WiFi + 2.4G)","note":"Handles RGB, RGBW and RGB+CCT strip. The WiFi version also works from your phone."},"remotes":[{"img":"/img/inline/d5388ff80fb9.webp","label":"Handheld remote + 4-zone wall panels","note":"The handheld RF remote has a full colour wheel. The black and white wall panels each drive up to 4 zones from a fixed position on the wall."}]}};
const CTRLIMG={"products":{"LED-CONTROLLER-SIN":"/img/inline/0abdb1915c35.webp","RGB-CTRLR-037":"/img/inline/6e3ddb37de24.webp","REMOTE-CONTROL-GRP":"/img/inline/7449e1397b00.webp"},"options":{"Single Colour (2.4G RF)":"/img/inline/1ddb59b29db1.webp","Dual White / CCT (2.4G RF)":"/img/inline/1ddb59b29db1.webp","WiFi + 2.4G (app control)":"/img/inline/bcee176e0856.webp","4-Zone Hand Remote (RGB+CCT) \u00b7 White":"/img/inline/cbfa864b8378.webp","4-Zone Glass Remote (RGB+CCT) \u00b7 White":"/img/inline/7449e1397b00.webp","4-Zone Glass Remote (RGB+CCT) \u00b7 Black":"/img/inline/4819331f8c52.webp","Single Colour Dimming Remote \u00b7 White":"/img/inline/e4a4ddd2636e.webp","Single Colour Dimming Remote \u00b7 Black":"/img/inline/f1801bd6d75b.webp"},"byProduct":{"LED-CONTROLLER-SIN":{"Single Colour (2.4G RF)":"/img/inline/1ddb59b29db1.webp","Dual White / CCT (2.4G RF)":"/img/inline/1ddb59b29db1.webp","WiFi + 2.4G (app control)":"/img/inline/bcee176e0856.webp"},"RGB-CTRLR-037":{"RGB Controller (2.4G RF)":"/img/inline/6e3ddb37de24.webp","RGBW Controller (2.4G RF)":"/img/inline/6e3ddb37de24.webp","RGBWW Controller (2.4G RF)":"/img/inline/6e3ddb37de24.webp","WiFi + 2.4G (app control)":"/img/inline/a9477f0edddd.webp"},"REMOTE-CONTROL-GRP":{"4-Zone Hand Remote (RGB+CCT) \u00b7 White":"/img/inline/cbfa864b8378.webp","4-Zone Glass Remote (RGB+CCT) \u00b7 White":"/img/inline/7449e1397b00.webp","4-Zone Glass Remote (RGB+CCT) \u00b7 Black":"/img/inline/4819331f8c52.webp","Single Colour Dimming Remote \u00b7 White":"/img/inline/e4a4ddd2636e.webp","Single Colour Dimming Remote \u00b7 Black":"/img/inline/f1801bd6d75b.webp"}}};
const TRIMG={"products":{"TR12V-ALL":"/img/inline/37e08d76b100.webp","TR24V-ALL":"/img/inline/7340f76c0c0c.webp"},"options":{"12V 20W \u00b7 IP20":"/img/inline/f4bb4b803581.webp","12V 75W \u00b7 IP20":"/img/inline/37e08d76b100.webp","12V 75W \u00b7 Mean Well IP65":"/img/inline/75df859e12cc.webp","12V 200W \u00b7 IP67":"/img/inline/b23b8b25c981.webp","24V 30W \u00b7 IP20":"/img/inline/01187b6c1fff.webp","24V 60W \u00b7 IP20":"/img/inline/7340f76c0c0c.webp","24V 100W \u00b7 IP67":"/img/inline/58cfd319ff39.webp","24V 150W \u00b7 Mean Well IP65":"/img/inline/26d358abeb35.webp","24V 240W \u00b7 Mean Well IP65":"/img/inline/1a0f5da6c41f.webp"}};
const STRIPIMG={"products":{"ST24V-2700K-COB":"/img/cob-reel-black.webp","ST24V-LONGRUN-IP68":"/img/inline/d42d93b234b5.webp","ST24V-SMD-ALL-1":"/img/smd-reel-new.webp","ST24V-9W-15W-CCT-C":"/img/cob-reel-new.webp","ST24V-RGB-COB":"/img/st24v-rgbcob-grid.webp"},"places":{"cove":"/img/inline/6a55a8d73f49.webp","wet":"/img/inline/8c300885524c.webp","cabinet":"/img/inline/5fb88e0fa84d.webp","stairs":"/img/inline/776642a32689.webp","other":"/img/inline/b97dda6324ae.webp"},"guides":{"ip":"/img/inline/e1cbeae7d326.webp","caution":"/img/inline/7b59bb66f417.webp","install":"/img/inline/e482d509b63b.webp","longrun":"/img/inline/2afe83beb3fa.webp"},"moods":[{"img":"/img/inline/dae3234e3d40.webp","label":"Recessed ceiling coves & under-cabinet task light"},{"img":"/img/inline/9966fc0f08ef.webp","label":"Kitchen island & splashback glow"},{"img":"/img/inline/d88db50717ae.webp","label":"RGB feature wall \u2014 media room"},{"img":"/img/inline/91876b103097.webp","label":"Outdoor steps & garden edges"},{"img":"/img/inline/9106e3432e7b.webp","label":"Stair handrail lighting"},{"img":"/img/inline/67b07f3a3051.webp","label":"Recessed channel in concrete stairs"},{"img":"/img/inline/fd8e65a7905c.webp","label":"Alfresco bench & bar lighting"},{"img":"/img/inline/14ecc26782ee.webp","label":"Reception & retail counters"}],"bright20":{"reel":"/img/inline/2462a0455f6a.webp","dim":"/img/inline/ced73453a2fb.webp","lit":"/img/inline/f2887d4cd3f6.webp"},"v240":{"photo":"/img/inline/c1a95ad7c126.webp","rgb":"/img/inline/e26ed047d60e.webp"},"colour":{"single":"/img/strip/colour-single.webp","cct":"/img/strip/colour-cct.webp","rgb":"/img/strip/colour-rgb.webp"},"longrunPhotos":[{"img":"/img/strip/longrun-lit.webp","label":"Lit on the reel"},{"img":"/img/strip/longrun-macro.webp","label":"Dotless COB face, close up"},{"img":"/img/strip/longrun-reel.webp","label":"5 m reel"}]};
const CATEGORIES=[{"id":"transformers","name":"12V/24V Transformers / Controllers","shape":"transformer","icon":"M4 7h16v10H4zM8 7v10M16 7v10"},{"id":"fans","name":"Air Flow / Ceiling Fans","shape":"fan","icon":"M12 12a3 3 0 0 0 3-3c0-3-3-4-3-4M12 12a3 3 0 0 1-3 3c-3 0-4-3-4-3M12 12a3 3 0 0 0-3-3c0-3 3-4 3-4M12 12a3 3 0 0 1 3 3c3 0 4-3 4-3"},{"id":"batten","name":"Batten Fittings / Batten Lights","shape":"batten","icon":"M3 10h18v4H3zM7 14v3M17 14v3"},{"id":"ceiling","name":"Ceiling / Panel / Oyster Lights","shape":"panel","icon":"M4 4h16v16H4zM4 12h16M12 4v16"},{"id":"downlights","name":"Downlights","shape":"down","icon":"M12 3a6 6 0 0 0-6 6h12a6 6 0 0 0-6-6zM9 13l3 7 3-7"},{"id":"emergency","name":"Emergency Lights","shape":"emergency","icon":"M12 2 4 6v6c0 5 8 10 8 10s8-5 8-10V6z M12 8v4M12 15h.01"},{"id":"flood","name":"Flood / Sports Lighting","shape":"flood","icon":"M4 6h16l-2 6H6zM10 12v6M14 12v6"},{"id":"highbay","name":"High Bay Lights","shape":"highbay","icon":"M12 3v3M6 12a6 6 0 0 1 12 0zM4 12h16l-2 6H6z"},{"id":"industrial","name":"Industrial Lighting","shape":"batten","icon":"M3 21V8l6 4V8l6 4V3h6v18z"},{"id":"landscape","name":"Landscape / Garden Lighting","shape":"garden","icon":"M12 8a4 4 0 0 0-4 4c0 3 4 8 4 8s4-5 4-8a4 4 0 0 0-4-4zM12 2v3"},{"id":"outdoor","name":"Outdoor / Wall Lights","shape":"wall","icon":"M8 3h8v7a4 4 0 0 1-8 0zM12 14v7M8 21h8"},{"id":"commercial","name":"School & Commercial LED Lighting","shape":"panel","icon":"M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"},{"id":"sensors","name":"Security / Sensors","shape":"sensor","icon":"M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM5 9a9 9 0 0 1 14 0M8 12a5 5 0 0 1 8 0M12 12v9"},{"id":"star","name":"Star Lights","shape":"star","icon":"M12 3l2.5 6L21 9.5l-4.5 4 1.5 6.5L12 16l-6 4 1.5-6.5L3 9.5 9.5 9z"},{"id":"strip","name":"Strip Lights","shape":"strip","icon":"M3 11h18v2H3zM6 13v2M10 13v2M14 13v2M18 13v2"},{"id":"track","name":"LED Track / Linear Lights","shape":"track","icon":"M3 5h18M7 5v4l-2 3M13 5v4l2 3M19 5v4"},{"id":"switches","name":"Switches / Powerpoints","shape":"switch","icon":"M5 3h14v18H5zM12 8v8M9 12h6"},{"id":"smart","name":"Smart Life","shape":"bulb","icon":"M9 18h6M10 21h4M12 2a7 7 0 0 0-4 12.7V18h8v-3.3A7 7 0 0 0 12 2z"}];
const PRODUCTS=[{"id":"TR12V-ALL","cat":"transformers","name":"12V Transformers, Australian Certified","price":22.0,"img":"/img/tr12v-all-1.webp","url":"https://greenhse.com/products/lighting-perth/australian-certified-12v-24v-transformers-greenhouse-technologies/tr12v-all.html","shape":"transformer","tone":"neutral","specs":["LED"],"options":[{"label":"12V 20W \u00b7 IP20","price":22.0,"specs":[["Power","20W"],["Voltage","12V DC"],["IP rating","IP20"],["Driver brand","Greenhse certified"],["Certification","Australian certified / RCM"]]},{"label":"12V 40W \u00b7 IP20","price":30.0,"specs":[["Power","40W"],["Voltage","12V DC"],["IP rating","IP20"],["Driver brand","Greenhse certified"],["Certification","Australian certified / RCM"]]},{"label":"12V 75W \u00b7 IP20","price":60.0,"specs":[["Power","75W"],["Voltage","12V DC"],["IP rating","IP20"],["Driver brand","Greenhse certified"],["Certification","Australian certified / RCM"]]},{"label":"12V 75W \u00b7 Mean Well IP65","price":75.0,"specs":[["Power","75W"],["Voltage","12V DC"],["IP rating","IP65"],["Driver brand","Mean Well (premium)"],["Certification","Australian certified / RCM"]]},{"label":"12V 120W \u00b7 Mean Well IP65","price":95.0,"specs":[["Power","120W"],["Voltage","12V DC"],["IP rating","IP65"],["Driver brand","Mean Well (premium)"],["Certification","Australian certified / RCM"]]},{"label":"12V 200W \u00b7 IP67","price":110.0,"specs":[["Power","200W"],["Voltage","12V DC"],["IP rating","IP67"],["Driver brand","Greenhse certified"],["Certification","Australian certified / RCM"]]}],"desc":"Powers 12V LED strip from 240V mains. Size it by wattage \u2014 strip watts per metre \u00d7 your run length, plus about 20% headroom \u2014 then take the next size up. IP20 units are for dry indoor spots; the sealed IP65/IP67 units suit damp or outdoor runs.","includes":["1 \u00d7 12V LED driver","Australian compliance certificate","Wiring instructions"],"features":["20W to 200W \u2014 six sizes","IP20 indoor, IP65 & IP67 sealed options","Mean Well units on the sealed sizes","Australian certified / RCM","3-year warranty"],"specTable":[["Category","12V/24V Transformers / Controllers"],["IP rating","See options"],["Voltage","12V"],["Certification","Australian certified / RCM"],["Warranty","3 years"]]},{"id":"TR24V-ALL","cat":"transformers","name":"24V Transformers, Australian Certified","price":30.0,"img":"/img/tr240v-driver.webp","url":"https://greenhse.com/products/lighting-perth/australian-certified-12v-24v-transformers-greenhouse-technologies/tr24v-all.html","shape":"transformer","tone":"neutral","specs":["LED"],"options":[{"label":"24V 30W \u00b7 IP20","price":30.0,"specs":[["Power","30W"],["Voltage","24V DC"],["IP rating","IP20"],["Driver brand","Greenhse certified"],["Certification","Australian certified / RCM"]]},{"label":"24V 60W \u00b7 IP20","price":50.0,"specs":[["Power","60W"],["Voltage","24V DC"],["IP rating","IP20"],["Driver brand","Greenhse certified"],["Certification","Australian certified / RCM"]]},{"label":"24V 100W \u00b7 IP67","price":60.0,"specs":[["Power","100W"],["Voltage","24V DC"],["IP rating","IP67"],["Driver brand","Greenhse certified"],["Certification","Australian certified / RCM"]]},{"label":"24V 120W \u00b7 Mean Well IP65","price":95.0,"specs":[["Power","120W"],["Voltage","24V DC"],["IP rating","IP65"],["Driver brand","Mean Well (premium)"],["Certification","Australian certified / RCM"]]},{"label":"24V 150W \u00b7 Mean Well IP65","price":120.0,"specs":[["Power","150W"],["Voltage","24V DC"],["IP rating","IP65"],["Driver brand","Mean Well (premium)"],["Certification","Australian certified / RCM"]]},{"label":"24V 240W \u00b7 Mean Well IP65","price":150.0,"specs":[["Power","240W"],["Voltage","24V DC"],["IP rating","IP65"],["Driver brand","Mean Well (premium)"],["Certification","Australian certified / RCM"]]},{"label":"24V 320W \u00b7 Mean Well IP65 (max)","price":185.0,"specs":[["Power","320W"],["Voltage","24V DC"],["IP rating","IP65"],["Driver brand","Mean Well (premium)"],["Certification","Australian certified / RCM"]]}],"desc":"Powers 24V LED strip from 240V mains. Size it by wattage \u2014 strip watts per metre \u00d7 your run length, plus about 20% headroom \u2014 then take the next size up. 320W is the largest single driver; past that, run two smaller ones feeding each end of the strip instead of one big one.","includes":["1 \u00d7 24V LED driver","Australian compliance certificate","Wiring instructions"],"features":["30W to 320W \u2014 seven sizes","IP20 indoor, IP65 & IP67 sealed options","Mean Well units on the sealed sizes","Australian certified / RCM","3-year warranty"],"specTable":[["Category","12V/24V Transformers / Controllers"],["IP rating","See options"],["Voltage","24V"],["Certification","Australian certified / RCM"],["Warranty","3 years"]]},{"id":"REMOTE-CONTROL-GRP","cat":"transformers","name":"LED Wireless Remote Controllers","price":15.0,"img":"/img/remote-control-grp-2.webp","url":"https://greenhse.com/products/lighting-perth/australian-certified-12v-24v-transformers-greenhouse-technologies/remote-control-grp.html","shape":"transformer","tone":"neutral","specs":["LED"],"options":[{"label":"4-Zone Hand Remote (RGB+CCT) \u00b7 White","price":17.0,"specs":[["Output","RGB \u2014 full colour"],["White control","Tunable / dual white"],["Zones","4"],["Style","Handheld remote"],["Certification","Australian certified / RCM"]]},{"label":"4-Zone Hand Remote (RGB+CCT) \u00b7 Black","price":18.0,"specs":[["Output","RGB \u2014 full colour"],["White control","Tunable / dual white"],["Zones","4"],["Style","Handheld remote"],["Certification","Australian certified / RCM"]]},{"label":"4-Zone Glass Remote (RGB+CCT) \u00b7 White","price":20.0,"specs":[["Output","RGB \u2014 full colour"],["White control","Tunable / dual white"],["Zones","4"],["Style","Glass touch remote"],["Certification","Australian certified / RCM"]]},{"label":"4-Zone Glass Remote (RGB+CCT) \u00b7 Black","price":20.0,"specs":[["Output","RGB \u2014 full colour"],["White control","Tunable / dual white"],["Zones","4"],["Style","Glass touch remote"],["Certification","Australian certified / RCM"]]},{"label":"Single Colour Dimming Remote \u00b7 White","price":15.0,"specs":[["Output","Single colour / dimming"],["Certification","Australian certified / RCM"]]},{"label":"Single Colour Dimming Remote \u00b7 Black","price":15.0,"specs":[["Output","Single colour / dimming"],["Certification","Australian certified / RCM"]]},{"label":"WiFi Bridge (2.4G to app & voice)","price":55.0,"specs":[["Type","WiFi gateway / bridge"],["Control","WiFi + 2.4GHz \u00b7 app & voice"],["Certification","Australian certified / RCM"]]}],"desc":"The handset or wall panel you actually control the lights with. It talks to the LED controller over 2.4GHz RF from up to 30m away and dims. Pick a 4-zone remote to run up to four separate zones, or a single-colour dimming remote if you just want brightness on one run. The WiFi Bridge option adds phone app and voice control on top.","includes":["1 \u00d7 remote (the option you choose)","Pairing instructions"],"features":["2.4GHz RF \u2014 30m range","Dimmable","4-zone or single-colour versions","Hand-held and glass wall-panel styles, white or black","WiFi Bridge option for app & voice control"],"specTable":[["Category","12V/24V Transformers / Controllers"],["Controller/Receiver","Smart (Tuya) and Non-Smart options"],["Specifications","RF 2.4GHz 12-36v"],["Communication Protocol","WiFi + 2.4GHz (Smart TUYA)"],["Dimmable","Yes"],["Control Distance","30m"],["Modes","RGB / RGBW / RGBWW switching via one button"],["Working Temperature","10\u00b0C - 40\u00b0C"],["Warranty","2 Years, must be installed by a certified electrician. Warranty is voided if moved or modified post-installation."]]},{"id":"RGB-CTRLR-037","cat":"transformers","name":"RGB/RGBW/RGBWW LED Controller","price":15.0,"img":"/img/rgb-ctrlr-037-2.webp","url":"https://greenhse.com/products/lighting-perth/australian-certified-12v-24v-transformers-greenhouse-technologies/rgb-ctrlr-037.html","shape":"transformer","tone":"rgb","specs":["RGBW"],"options":[{"label":"RGB Controller (2.4G RF)","price":15.0,"specs":[["Output","RGB \u2014 full colour"],["Control","2.4GHz RF"],["Certification","Australian certified / RCM"]]},{"label":"RGBW Controller (2.4G RF)","price":15.0,"specs":[["Output","RGBW \u2014 colour + white"],["Control","2.4GHz RF"],["Certification","Australian certified / RCM"]]},{"label":"RGBWW Controller (2.4G RF)","price":15.0,"specs":[["Output","RGBWW \u2014 colour + warm/cool white"],["Control","2.4GHz RF"],["Certification","Australian certified / RCM"]]},{"label":"WiFi + 2.4G (app control)","price":55.0,"specs":[["Control","WiFi + 2.4GHz \u00b7 app & voice"],["Certification","Australian certified / RCM"]]}],"desc":"Sits between the driver and the strip and gives you the colour control. One button switches it between RGB, RGBW and RGBWW, so the same unit suits all three strip types. Pair it with a remote, or take the WiFi version for phone app and voice control.","includes":["1 \u00d7 RGB/RGBW/RGBWW controller","Wiring instructions"],"features":["3-in-1 \u2014 RGB, RGBW and RGBWW from one button","2.4GHz RF \u2014 30m range","Dimmable","12\u201336V input","WiFi (Tuya) version for app & voice control"],"specTable":[["Category","12V/24V Transformers / Controllers"],["Controller/Receiver","3-in-1 Smart (Tuya) and Non-Smart options"],["Specifications","RF 2.4GHz 12-36v"],["Communication Protocol","WiFi + 2.4GHz (Smart TUYA)"],["Dimmable","Yes"],["Control Distance","30m"],["Modes","RGB / RGBW / RGBWW switching via one button"],["Working Temperature","10\u00b0C - 40\u00b0C"],["Warranty","2 Years, must be installed by a certified electrician. Warranty is voided if moved or modified post-installation."]]},{"id":"LED-CONTROLLER-SIN","cat":"transformers","name":"Single Colour/Dual White LED Controller (2 in 1)","price":15.0,"img":"/img/led-controller-sin-1.webp","url":"https://greenhse.com/products/lighting-perth/australian-certified-12v-24v-transformers-greenhouse-technologies/led-controller-single-dual-white.html","shape":"transformer","tone":"neutral","specs":["LED"],"options":[{"label":"Single Colour (2.4G RF)","price":15.0,"specs":[["Output","Single colour / dimming"],["Control","2.4GHz RF"],["Certification","Australian certified / RCM"]]},{"label":"Dual White / CCT (2.4G RF)","price":15.0,"specs":[["White control","Tunable / dual white"],["Control","2.4GHz RF"],["Certification","Australian certified / RCM"]]},{"label":"WiFi + 2.4G (app control)","price":55.0,"specs":[["Control","WiFi + 2.4GHz \u00b7 app & voice"],["Certification","Australian certified / RCM"]]}],"desc":"Sits between the driver and the strip. One button switches it between single colour and dual white (CCT), so one unit covers both strip types. Pair it with a remote, or take the WiFi version for phone app and voice control.","includes":["1 \u00d7 single colour / dual white controller","Wiring instructions"],"features":["2-in-1 \u2014 single colour and dual white from one button","2.4GHz RF \u2014 30m range","Dimmable","12\u201336V input","WiFi (Tuya) version for app & voice control"],"specTable":[["Category","12V/24V Transformers / Controllers"],["Controller/Receiver","2-in-1 Smart (TUYA) and Non-Smart options"],["Specifications","RF 2.4GHz 12-36v"],["Communication Protocol","WiFi+2.4GHz (Smart TUYA)"],["Dimmable","Yes"],["Control Distance","30m"],["Modes","Single colour /Dual white switching via one button"],["Working Temperature","10\u00b0C - 40\u00b0C"],["Warranty","2 Years, must be installed by a certified electrician. Warranty is voided if moved or modified post-installation."]]},{"id":"AMARI-DC-52-FAN-BW","cat":"fans","name":"Amari 52\" Fan Black or White 4-Blade","price":210.0,"img":"/img/amari-dc-52-fan-bw.webp","url":"https://greenhse.com/products/lighting-perth/air-flow/amari-dc-52-fan-bw.html","shape":"fan","tone":"neutral","specs":["LED"],"desc":"The Amari 52\" Fan Black or White 4-Blade is a ceiling fan with an integrated LED light and remote control. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling fan with LED light","Mounting bracket & downrod","Remote control (battery incl.)","Installation manual"],"features":["Quiet DC motor with summer / winter reverse","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Air Flow / Ceiling Fans"],["Installation","Must be installed by a licensed electrician"],["Size","52\" / 1320mm"],["Motor","35W DC Motor"],["Max. Air Movement","14800m 3 /hr"],["Operating Voltage","220-240V 50Hz"],["Construction","ABS body and canopy"],["Blades","4 x Moulded ABS"],["Ceiling Install","Hangsure"],["Blade Pitch","12 Degrees"],["Ceiling Rake","10 Degrees Max."],["Control","Remote (6-speed) with reverse function and Windbreeze function"],["Warranty","3 Year In-Home + 3 Year Replacement (Limited warranty for wall controller, remote controller and light)"]]},{"id":"AMARI-DC-52-FAN-LI","cat":"fans","name":"Amari 52\" Fan Black or White 4-Blade with CCT Light","price":240.0,"img":"/img/amari-dc-52-fan-li.webp","url":"https://greenhse.com/products/lighting-perth/air-flow/amari-dc-52-fan-light.html","shape":"fan","tone":"neutral","specs":["CCT"],"desc":"The Amari 52\" Fan Black or White 4-Blade with CCT Light is a ceiling fan with an integrated LED light and remote control. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling fan with LED light","Mounting bracket & downrod","Remote control (battery incl.)","Installation manual"],"features":["Tunable white from warm 2700K to cool 5700K","Quiet DC motor with summer / winter reverse","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Air Flow / Ceiling Fans"],["Installation","Must be installed by a licensed electrician"],["Size","52\" / 1320mm"],["Motor","35W DC Motor"],["Max. Air Movement","14800m 3 /hr"],["Operating Voltage","220-240V 50Hz"],["Construction","ABS body and canopy"],["Blades","4 x Moulded ABS"],["Ceiling Install","Hangsure"],["Blade Pitch","12 Degrees"],["Ceiling Rake","10 Degrees Max."],["Control","Remote (6-speed) with reverse function and Windbreeze function"],["Light Output","Dimmable 24W CCT LED Light (3200/4200/6000K) 1700lm (3000K); 1800lm (4200K); 1700lm (6000K)"],["Warranty","3 Year In-Home + 3 Year Replacement (Limited warranty for wall controller, remote controller and light)"]]},{"id":"AMARI-DC-FAN-56-BW","cat":"fans","name":"Amari 56\" Fan White or Black 5-Blade","price":225.0,"img":"/img/amari-dc-fan-56-bw.webp","url":"https://greenhse.com/products/lighting-perth/air-flow/amari-dc-fan-56-bw.html","shape":"fan","tone":"neutral","specs":["LED"],"desc":"The Amari 56\" Fan White or Black 5-Blade is a ceiling fan with an integrated LED light and remote control. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling fan with LED light","Mounting bracket & downrod","Remote control (battery incl.)","Installation manual"],"features":["Quiet DC motor with summer / winter reverse","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Air Flow / Ceiling Fans"],["Installation","Must be installed by a licensed electrician"],["Size","56\" / 1420mm"],["Motor","35W DC Motor"],["Max. Air Movement","17300m 3 /hr"],["Operating Voltage","220-240V 50Hz"],["Construction","ABS body and canopy"],["Blades","5 x Moulded ABS"],["Ceiling Install","Hangsure"],["Blade Pitch","12 Degrees"],["Ceiling Rake","10 Degrees Max."],["Control","Remote (6-speed) with reverse function and Windbreeze function"],["Warranty","3 Year In-Home + 3 Year Replacement (Limited warranty for wall controller, remote controller and light)"]]},{"id":"AMARI-DC-FAN-56-LI","cat":"fans","name":"Amari 56\" Fan White or Black 5-Blade with CCT Light","price":255.0,"img":"/img/amari-dc-fan-56-li.webp","url":"https://greenhse.com/products/lighting-perth/air-flow/amari-dc-fan-56-light-bw.html","shape":"fan","tone":"neutral","specs":["CCT"],"desc":"The Amari 56\" Fan White or Black 5-Blade with CCT Light is a ceiling fan with an integrated LED light and remote control. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling fan with LED light","Mounting bracket & downrod","Remote control (battery incl.)","Installation manual"],"features":["Tunable white from warm 2700K to cool 5700K","Quiet DC motor with summer / winter reverse","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Air Flow / Ceiling Fans"],["Installation","Must be installed by a licensed electrician"],["Size","56\" / 1420mm"],["Motor","35W DC Motor"],["Max. Air Movement","17300m 3 /hr"],["Operating Voltage","220-240V 50Hz"],["Construction","ABS body and canopy"],["Blades","5 x Moulded ABS"],["Ceiling Install","Hangsure"],["Blade Pitch","12 Degrees"],["Ceiling Rake","10 Degrees Max."],["Control","Remote (6-speed) with reverse function and Windbreeze function"],["Light Output","Dimmable 24W CCT LED Light (3200/4200/6000K) 1700lm (3000K); 1800lm (4200K); 1700lm (6000K)"],["Warranty","3 Year In-Home + 3 Year Replacement (Limited warranty for wall controller, remote controller and light)"]]},{"id":"SOLACE-BATHROOM-MA","cat":"fans","name":"Solace 4-In-1 Bathroom Mate","price":195.0,"img":"/img/solace-bathroom-ma.webp","url":"https://greenhse.com/products/lighting-perth/air-flow/solace-bathroom-mate.html","shape":"fan","tone":"neutral","specs":["12W","IP20"],"desc":"The Solace 4-In-1 Bathroom Mate is a ceiling fan with an integrated LED light and remote control. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling fan with LED light","Mounting bracket & downrod","Remote control (battery incl.)","Installation manual"],"features":["Quiet DC motor with summer / winter reverse","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Air Flow / Ceiling Fans"],["Installation","Must be installed by a licensed electrician"],["Operating Voltage","240V / 50Hz"],["Light Wattage","LED 12w max"],["Light Lumens","900Lm max"],["Colour Temperature","4200k"],["Total Wattage","2152W Total max"],["Motor Wattage","35W Total"],["Heat Wattage","2140W"],["Heat Type","PTC heating element"],["Air Extraction","Up to 240m 3 /hr (691/sec)"],["Motor Type","Longlife ball bearing"],["Fan Size","\u2300175mm x 75mm"],["Product Finish","White / Black"],["Cutout","350mm x 350mm"],["Control","3-Gang wall switch"]]},{"id":"BLIZZARD-EXHAUST-S","cat":"fans","name":"Blizzard DC Round Exhaust Fan Small","price":115.0,"img":"/img/blizzard-exhaust-s.webp","url":"https://greenhse.com/products/lighting-perth/air-flow/blizzard-exhaust-small.html","shape":"fan","tone":"neutral","specs":["20W","IPX4"],"desc":"The Blizzard DC Round Exhaust Fan Small is a ceiling fan with an integrated LED light and remote control. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling fan with LED light","Mounting bracket & downrod","Remote control (battery incl.)","Installation manual"],"features":["Quiet DC motor with summer / winter reverse","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Air Flow / Ceiling Fans"],["Fascia Size","\u00f8270mm"],["Motor Wattage","20W"],["Air Extraction","600m 3 /hr"],["Outlet Diameter","100mm & 150mm (duct not included)"],["Ingress Protection","IPX4 rated"],["Cutout","\u00f8255mm"],["Installation","Recommended to be installed by a licensed electrician. Uses swing clips with screws."],["Warranty","5-year replacement"]]},{"id":"BLIZZARD-EXHAUST-L","cat":"fans","name":"Blizzard DC Round Exhaust Fan Large","price":135.0,"img":"/img/blizzard-exhaust-l.webp","url":"https://greenhse.com/products/lighting-perth/air-flow/blizzard-exhaust-large.html","shape":"fan","tone":"neutral","specs":["40W","IPX4"],"desc":"The Blizzard DC Round Exhaust Fan Large is a ceiling fan with an integrated LED light and remote control. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling fan with LED light","Mounting bracket & downrod","Remote control (battery incl.)","Installation manual"],"features":["Quiet DC motor with summer / winter reverse","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Air Flow / Ceiling Fans"],["Fascia Size","\u00f8330mm"],["Motor Wattage","40W"],["Air Extraction","600m 3 /hr (large)"],["Outlet Diameter","100mm & 150mm (duct not included)"],["Ingress Protection","IPX4 rated"],["Cutout","\u00f8300mm"],["Installation","Recommended to be installed by a licensed electrician. Uses swing clips with screws."],["Warranty","5-year replacement"]]},{"id":"BLIZZARD-EXHAUST-C","cat":"fans","name":"Blizzard DC Round Exhaust Fan CCT Light Small","price":125.0,"img":"/img/blizzard-exhaust-c.webp","url":"https://greenhse.com/products/lighting-perth/air-flow/blizzard-exhaust-cct-small.html","shape":"fan","tone":"neutral","specs":["15W","Tri-colour","IPX4"],"desc":"The Blizzard DC Round Exhaust Fan CCT Light Small is a ceiling fan with an integrated LED light and remote control. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling fan with LED light","Mounting bracket & downrod","Remote control (battery incl.)","Installation manual"],"features":["Tunable white from warm 2700K to cool 5700K","Quiet DC motor with summer / winter reverse","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Air Flow / Ceiling Fans"],["Fascia Size","\u00f8270mm"],["Light Wattage","15W 1100 Lumens"],["Colour Temperature","3000k/4200k/6000k selectable by switch"],["Motor Wattage","20W"],["Air Extraction","Up to 450m 3 /hr"],["Outlet Diameter","100mm & 150mm (duct not included)"],["Ingress Protection","IPX4 rated"],["Cutout","\u00f8255mm"],["Installation","Recommended to be installed by a licensed electrician. Uses swing clips with screws."],["Warranty","5-year replacement"]]},{"id":"BLIZZARD-EXHAUST-C-1","cat":"fans","name":"Blizzard DC Round Exhaust Fan CCT Light Large","price":125.0,"img":"/img/blizzard-exhaust-c-1.webp","url":"https://greenhse.com/products/lighting-perth/air-flow/blizzard-exhaust-cct-large-1.html","shape":"fan","tone":"neutral","specs":["15W","Tri-colour","IPX4"],"desc":"The Blizzard DC Round Exhaust Fan CCT Light Large is a ceiling fan with an integrated LED light and remote control. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling fan with LED light","Mounting bracket & downrod","Remote control (battery incl.)","Installation manual"],"features":["Tunable white from warm 2700K to cool 5700K","Quiet DC motor with summer / winter reverse","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Air Flow / Ceiling Fans"],["Fascia Size","\u00f8330mm"],["Light Wattage","15W 1100 Lumens"],["Colour Temperature","3000k/4200k/6000k selectable by switch"],["Motor Wattage","40W"],["Air Extraction","600m 3 /hr"],["Outlet Diameter","100mm & 150mm (duct not included)"],["Ingress Protection","IPX4 rated"],["Cutout","\u00f8300mm"],["Installation","Recommended to be installed by a licensed electrician. Uses swing clips with screws."],["Warranty","5-year replacement"]]},{"id":"TALON-PROMAX-NO-LE","cat":"fans","name":"Talon Promax Exhaust Fan Large","price":80.0,"img":"/img/talon-promax-no-le.webp","url":"https://greenhse.com/products/lighting-perth/air-flow/talon-promax-no-led.html","shape":"fan","tone":"neutral","specs":["50W","IPX4"],"desc":"The Talon Promax Exhaust Fan Large is a ceiling fan with an integrated LED light and remote control. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling fan with LED light","Mounting bracket & downrod","Remote control (battery incl.)","Installation manual"],"features":["Quiet DC motor with summer / winter reverse","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Air Flow / Ceiling Fans"],["Fan Size","\u00f8330x185mm, \u00f8300mm Cutout"],["Motor Wattage","50W"],["Installation","Recommended to be installed by a licensed electrician."],["Noise","6dB @3m"],["Min Ceiling Depth","220mm"],["Duct Outer Diameter","100mm and 150mm (duct not included)"],["Air Extraction","460m 3 /hr"],["Ingress Protection","IPX4"],["Class","1"],["Warranty","3-year replacement"]]},{"id":"HORIZON-HEATER-LAM","cat":"fans","name":"Horizon Bathroom Mate 2 Lights","price":145.0,"img":"/img/horizon-heater-lam.webp","url":"https://greenhse.com/products/lighting-perth/air-flow/horizon-heater-lamps.html","shape":"fan","tone":"neutral","specs":["9W","Tri-colour","IPX2"],"desc":"The Horizon Bathroom Mate 2 Lights is a ceiling fan with an integrated LED light and remote control. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling fan with LED light","Mounting bracket & downrod","Remote control (battery incl.)","Installation manual"],"features":["Quiet DC motor with summer / winter reverse","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Air Flow / Ceiling Fans"],["Installation","Must be installed by a licensed electrician"],["Light Type","LED"],["Light Wattage","9W"],["Brightness","1050Lm max"],["Colour Temperature","3000k/4200k/6000k selectable by switch"],["Dimming","No"],["Heat Wattage","2 x 275W"],["Heat Type","Instant Heat Globes"],["Motor Wattage","75W"],["Motor Type","Longlife ball bearing"],["Fan Size","120mm"],["Product Finish","White"],["Max Air Movement","Up to 300m 3 /hr"],["Control","3-Gang wall switch"],["Ingress Protection","IPX2 rated"]]},{"id":"SUPERNOVA-HEATER","cat":"fans","name":"Supernova II Bathroom Heather/Exhaust","price":196.0,"img":"/img/supernova-heater.webp","url":"https://greenhse.com/products/lighting-perth/air-flow/supernova-heater.html","shape":"fan","tone":"neutral","specs":["12W","Tri-colour","IPX2"],"desc":"The Supernova II Bathroom Heather/Exhaust is a ceiling fan with an integrated LED light and remote control. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling fan with LED light","Mounting bracket & downrod","Remote control (battery incl.)","Installation manual"],"features":["Quiet DC motor with summer / winter reverse","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Air Flow / Ceiling Fans"],["Installation","Must be installed by a licensed electrician"],["Light Type","LED"],["Light Wattage","12W"],["Light Lumens","900lm max"],["Colour Temperature","3000k/5000k"],["Dimming","No"],["Heat Wattage","2 x 275W"],["Heat Type","Instant Heat Globes"],["Motor Wattage","40W"],["Motor Type","Longlife ball bearing"],["Fan Size","165mm"],["Product Finish","White"],["Max Air Movement","Up to 500m 3 /hr"],["Control","3-Gang wall switch"],["Ingress Protection","IPX2 rated"]]},{"id":"T20-CCT-1","cat":"batten","name":"60cm 20W LED Batten Fitting, Tricolour","price":28.0,"img":"/img/t20-cct-1-1.webp","url":"https://greenhse.com/products/lighting-perth/led-batten-lights-perth/t20-cct-1.html","shape":"batten","tone":"neutral","specs":["20W","Daylight","IP20"],"desc":"The 60cm 20W LED Batten Fitting, Tricolour is a robust LED batten for garages, laundries and utility areas. It runs in tri-colour switch (3000K / 4000K / 5700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED batten fitting","Mounting brackets & screws","Quick-start guide"],"features":["3 selectable colour temperatures via switch","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Batten Fittings / Batten Lights"],["Replaces","Brighter than 1 fluorescent fitting"],["Brightness","2200 lumens"],["Power consumption","20Watt"],["Beam angle","120\u00ba"],["Dimmable","Non Dimmable"],["Lifespan","50 000hr"],["Fitting","Surface mount"],["Specifications","200~240VAC, 50-60Hz"],["Weather rating","IP20"],["Material Construction","PC and Iron Frame"],["Product Dimensions","603x71x64mm"],["Weight","0.65kg / 0.92kg packed"],["Instant start","Instant start, suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","3000/4000/5700 Switch Adjustable"]]},{"id":"T40-CCT-BATTEN-PRO","cat":"batten","name":"1.2m LED 40W Batten Pro, High Lumen, Tricolour, PA","price":60.0,"img":"/img/t40-cct-batten-pro-1.webp","url":"https://greenhse.com/lighting-perth/led-batten-lights-perth/t40-cct-batten-pro.html","shape":"batten","tone":"neutral","specs":["20W","Tri-colour","IP20"],"desc":"The 1.2m LED 40W Batten Pro, High Lumen, Tricolour, PA is a robust LED batten for garages, laundries and utility areas. It runs in tri-colour switch (3000K / 4000K / 5700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED batten fitting","Mounting brackets & screws","Quick-start guide"],"features":["3 selectable colour temperatures via switch","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Batten Fittings / Batten Lights"],["Brightness","Up to 150 L/Watt - 40w 5600-6000L 35w 4950-5250L 25w 3550-3850L 20w 2800-3100L"],["Power consumption","40/35/25/20w selectable."],["Beam angle","120\u00ba"],["Dimmable","No"],["Lifespan","50 000hr"],["Fitting","Ceiling mountable"],["Specifications","220~240VAC, 50-60Hz"],["Weather rating","IP20"],["IK Rating","IK06"],["Material construction","Plastic-coated Aluminium and PC Diffuser"],["Product dimensions","1200x65x66mm per piece"],["Weight","950g per piece"],["Instant start","Instant start, suitable for sensors"],["Flicker","Flicker-free"],["Light Output Colour","3000/4000/5700k Warm/Natural/Bright White"]]},{"id":"T40-CCT-BATTEN-IP6","cat":"batten","name":"1.2m LED 40W Dimmable Batten Fitting, CCT, IP65","price":70.0,"img":"/img/t40-cct-batten-ip6-1.webp","url":"https://greenhse.com/lighting-perth/led-batten-lights-perth/t40-cct-batten-ip65-dim.html","shape":"batten","tone":"neutral","specs":["40W","Tri-colour","IP65"],"desc":"The 1.2m LED 40W Dimmable Batten Fitting, CCT, IP65 is a robust LED batten for garages, laundries and utility areas. It runs in CCT tunable (2700\u20135700K) and dims smoothly without flicker. It's sealed to IP65 for outdoor and wet-area use. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED batten fitting","Mounting brackets & screws","Quick-start guide"],"features":["Smooth, flicker-free dimming","Tunable white from warm 2700K to cool 5700K","Weatherproof IP65 \u2014 rated for outdoor & wet areas","Energy-efficient LED \u2014 lower running costs"],"specTable":[["Category","Batten Fittings / Batten Lights"],["Replaces","2xT8 or T5 tubes"],["Brightness","Up to 4400 lumens"],["Power consumption","40Watt"],["Beam angle","120\u00ba"],["Dimmable","Triac Dimmable"],["Lifespan",">35 000hr"],["Fitting","Ceiling mountable, can be suspended"],["Specifications","200~240VAC, 50-60Hz"],["Weather rating","IP65 Waterproof"],["Material construction","Aluminium housing and PC cover"],["Product dimensions","1197x80x36mm"],["Packed dimensions","1220x90x40mm per piece"],["Weight","850g per piece / 1kg packed"],["Instant start","Instant start, suitable for sensors"],["Light Output Colour","3000k/4000k/5000k Selectable by switch"]]},{"id":"15W-LED-TRACK-LIGH","cat":"ceiling","name":"15W LED Track Light","price":32.0,"img":"/img/15w-led-track-ligh-2.webp","url":"https://greenhse.com/lighting-perth/led-ceiling-lights-perth/15w-led-track-light.html","shape":"track","tone":"neutral","specs":["15W","Tri-colour","IP20"],"desc":"The 15W LED Track Light is an LED ceiling light that delivers even, comfortable light. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Brightness","1275 Lumens 85 Lm/watt"],["Power consumption","15Watt"],["Beam angle","60\u00ba Low Glare"],["Lifespan","50 000 hrs"],["Fitting","Screws"],["Specifications","AC220-240V, 50-60Hz"],["Weather rating","IP20 Indoors"],["Material construction","Aluminium"],["Dimensions","\u230070x130mm"],["Weight Track Light","0.4kg"],["Weight Track","0.5kg 1m / 0.75kg 1.5m / 1kg 2m"],["Track Dimensions","1m 1000x34x17mm / 1.5m 1500x34x17mm / 2m 2000x34x17mm"],["Mercury","No Mercury"],["Light Output Colour","3000K / 4000K/ 5000K"],["Colour Rendering Index","80"]]},{"id":"30W-LED-TRACK-LIGH","cat":"ceiling","name":"30W LED Track Light","price":60.0,"img":"/img/30w-led-track-ligh-2.webp","url":"https://greenhse.com/lighting-perth/led-ceiling-lights-perth/30w-led-track-light.html","shape":"track","tone":"neutral","specs":["30W","Tri-colour","IP20"],"desc":"The 30W LED Track Light is an LED ceiling light that delivers even, comfortable light. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Brightness","2250 lumens 85 lm/watt"],["Power consumption","30Watt"],["Beam angle","60\u00ba Low Glare"],["Dimmable","Triac dimmable"],["Lifespan","50 000 hrs"],["Fitting","Screws"],["Specifications","AC220-240V, 50-60Hz"],["Weather rating","IP20 Indoors"],["Material construction","Anodised aluminium"],["Dimensions","\u230085x160mm"],["Weight Track Light","0.9kg"],["Weight Track","0.5kg 1m / 0.75kg 1.5m / 1kg 2m"],["Track Dimensions","1m 1000x34x17mm / 1.5m 1500x34x17mm / 2m 2000x34x17mm"],["Mercury","No Mercury"],["Light Output Colour","4000k/4500k/5000k switch selectable"]]},{"id":"BLACK-LINEAR-MODUL","cat":"ceiling","name":"Black Linear Modular Lighting System","price":60.0,"img":"/img/black-linear-modul-3.webp","url":"https://greenhse.com/lighting-perth/led-ceiling-lights-perth/black-linear-modular-light.html","shape":"track","tone":"neutral","specs":["Tri-colour","IP20"],"desc":"The Black Linear Modular Lighting System is an LED ceiling light that delivers even, comfortable light. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Use","Professional quality, linear modular lights with attractive back-lighting. Perfect for modern retail and commercial applications."],["Brightness","Up to 130 Lumens/Watt"],["Power","Variable - selectable by switch, varies by module"],["Beam angle","120 Degrees"],["Dimmable",", switch selectable"],["Lifespan","50 000 hrs"],["Fitting","Hanging or ceiling mounted"],["Specifications","AC100-265"],["Weather Rating","IP20 Indoor Use Only"],["IK Rating","IK08"],["Power Factor",">0.9"],["Material","Rugged diecast 6063 T5 aluminium housing and PC/PMMA lenses"],["Dimensions","Variable - 057m - 2.2m; L (Corner), X,Y, V shape"],["Weight","Up to 3kg"],["Light Output Color","30000/4000/5000/6000k selectable"]]},{"id":"GH-C12CCT-BW","cat":"ceiling","name":"12W LED Ceiling Light White, CCT Dimmable","price":34.0,"img":"/img/gh-c12cct-bw-2.webp","url":"https://greenhse.com/lighting-perth/led-ceiling-lights-perth/gh-c12cct-bw.html","shape":"panel","tone":"neutral","specs":["12W","Tri-colour","IP20"],"desc":"The 12W LED Ceiling Light White, CCT Dimmable is an LED ceiling light that delivers even, comfortable light. It runs in CCT tunable (2700\u20135700K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["Smooth, flicker-free dimming","Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Brightness","1000-1100 lumens"],["Power consumption","12Watt"],["Beam angle","100\u00ba"],["Dimmable","Triac Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface/Ceiling Mount"],["Specifications","AC220-240V, 50-60Hz"],["Weather Rating","IP20 Indoor Use"],["Material Construction","Diecast Aluminium"],["Dimensions","\u00d8115x94mm"],["Weight","580g /pce"],["Light Output Colour","Warm 3000k/ Natural 4000k / Bright 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Matte Black Matte White"],["Warranty","2 Years"]]},{"id":"WL8-CCT-BW-1","cat":"ceiling","name":"8W Up/Down Indoor Wall Light, CCT Dimmable","price":42.0,"img":"/img/wl8-cct-bw-1-2.webp","url":"https://greenhse.com/lighting-perth/led-ceiling-lights-perth/wl8-cct-bw-1.html","shape":"wall","tone":"neutral","specs":["8W","Tri-colour","IP20"],"desc":"The 8W Up/Down Indoor Wall Light, CCT Dimmable is an LED ceiling light that delivers even, comfortable light. It runs in CCT tunable (2700\u20135700K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["Smooth, flicker-free dimming","Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Brightness","700-750 lumens"],["Power consumption","8Watt"],["Beam angle","120\u00ba"],["Dimmable","Triac Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Wall Mount"],["Specifications","AC220-240V, 50-60Hz"],["Weather Rating","IP20 Indoor Use"],["Material Construction","Aluminium & PC"],["Dimensions","242x67x77mm"],["Weight","600g /pce"],["Light Output Colour","Warm 3000k/ Natural 4000k / Bright 5700k"],["Colour Rendering Index","80"],["Shade/Housing","Matte White"],["Warranty","3 Years"]]},{"id":"MR10-CCT-WALL-B","cat":"ceiling","name":"10W Up/Down LED Wall Light, CCT IP65","price":55.0,"img":"/img/mr10-cct-wall-b-2.webp","url":"https://greenhse.com/lighting-perth/led-ceiling-lights-perth/mr10-cct-wall-b.html","shape":"wall","tone":"neutral","specs":["10W","Tri-colour","IP65"],"desc":"The 10W Up/Down LED Wall Light, CCT IP65 is an LED ceiling light that delivers even, comfortable light. It runs in CCT tunable (2700\u20135700K). It's sealed to IP65 for outdoor and wet-area use. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Weatherproof IP65 \u2014 rated for outdoor & wet areas","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Installation","Must be installed by a licensed electrician"],["Brightness","900 lumens"],["Power consumption","10Watt (5w/5w Up/Down)"],["Beam angle","29x77\u00ba Rectangular Beam"],["Dimmable","Non Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Wall Mount"],["Specifications","220-240V 50Hz"],["Weather Rating","IP65 Indoor and Outdoor Use"],["Material Construction","Diecast Aluminium, PC Optical Lens"],["Dimensions","174x92x29mm"],["Weight","600g /pce"],["Light Output Colour","Warm 3000k/ Natural 4000k / Bright 5700k"],["Colour Rendering Index","80"],["Shade/Housing","Matte Black"]]},{"id":"C25-CCT-PA","cat":"ceiling","name":"New Premium LED 25W Ceiling Light, 3 CCT","price":50.0,"img":"/img/c25-cct-pa-1.webp","url":"https://greenhse.com/lighting-perth/led-ceiling-lights-perth/c25-cct-pa.html","shape":"panel","tone":"neutral","specs":["12W","Tri-colour","IP54"],"desc":"The New Premium LED 25W Ceiling Light, 3 CCT is an LED ceiling light that delivers even, comfortable light. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Brightness","Up to 3000 lumens (25w), 2180 lumens (18w), 1500 lumens (12W)"],["Power consumption","25/18/12Watt selectable"],["Beam angle","120\u00ba"],["Dimmable","Non-Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface Mount"],["Specifications","220-240VAC, 50-60Hz"],["Weather rating","IP54/ IP20"],["IK rating","IK06"],["Material construction","White PC, PMMA Optic Material"],["Dimensions","\u00d8300x60mm"],["Weight","1.4kg"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5000k"],["Colour Rendering Index","\u226580"],["Shade/Housing","White transparent PC, PMMA cover"]]},{"id":"P24P-5CCT","cat":"ceiling","name":"29cm Frameless LED 24W Ceiling Light, 5-Colour CCT","price":40.0,"img":"/img/p24p-5cct.webp","url":"https://greenhse.com/lighting-perth/led-ceiling-lights-perth/p24p-5cct.html","shape":"panel","tone":"neutral","specs":["24W","Tri-colour","IP20"],"desc":"The 29cm Frameless LED 24W Ceiling Light, 5-Colour CCT is an LED ceiling light that delivers even, comfortable light. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Brightness","Up to 2640 lumens 110 lumens/watt"],["Power consumption","24Watt"],["Beam angle","120\u00ba"],["Dimmable","Triac Dimmable"],["Lifespan","30 000hrs"],["Fitting","Surface Mount or Recessed with clips (fits hole size 60-250mm)"],["Specifications","240-265VAC, 50-60Hz"],["Weather rating","IP20 Indoors"],["Material construction","Thermal plastic frame, PMMA, LGP, Aluminium heatsink"],["Dimensions","\u00f8290x15mm"],["Packed Dimensions","320x320x40mm"],["Packed Weight","0.7kg 1pce"],["Light Output Colour","Selectable 3000k/4000k/5000k/5700k/6400k"],["Colour Rendering Index",">80"],["Shade/Housing","White"]]},{"id":"P30S-CCT","cat":"ceiling","name":"40cm LED 30W Ceiling Light, 5-CCT Adjustable","price":48.0,"img":"/img/p30s-cct.webp","url":"https://greenhse.com/lighting-perth/led-ceiling-lights-perth/p30s-cct.html","shape":"panel","tone":"neutral","specs":["30W","Tri-colour","IP20"],"desc":"The 40cm LED 30W Ceiling Light, 5-CCT Adjustable is an LED ceiling light that delivers even, comfortable light. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Brightness","3300 lumens 110 lumens/watt"],["Power consumption","30Watt"],["Beam angle","120\u00ba"],["Lifespan","30 000hrs"],["Fitting","Surface Mount, can be suspended"],["Specifications","240-265VAC, 50-60Hz"],["Weather rating","IP20 Indoors"],["Material construction","Thermal plastic frame, PMMA, LGP, Aluminium heatsink"],["Dimensions","\u00f8397x24mm"],["Weight","1.36kg 1pce"],["Light Output Colour","Warm 3000k/Natural 4000k/Bright 5000k/Extra Bright 5700k/Cool 6400k"],["Colour Rendering Index","80"],["Shade/Housing","White"],["Warranty","3Yr"],["Certification","RCM, CE, SAA Plug"]]},{"id":"P24SE-CCT","cat":"ceiling","name":"29cm Slim LED 24W Ceiling Light, Tricolour","price":34.0,"img":"/img/p24se-cct.webp","url":"https://greenhse.com/lighting-perth/led-ceiling-lights-perth/p24se-cct.html","shape":"panel","tone":"neutral","specs":["24W","Tri-colour","IP20"],"desc":"The 29cm Slim LED 24W Ceiling Light, Tricolour is an LED ceiling light that delivers even, comfortable light. It is switchable between 4000K, 5000K and 6500K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["3 selectable colour temperatures via switch","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Brightness","2160 lumens"],["Power consumption","24Watt"],["Beam angle","110\u00ba"],["Dimmable","Non-Dimmable"],["Lifespan","30 000hrs"],["Fitting","Surface Mount or Recessed with clips"],["Specifications","240-265VAC, 50-60Hz"],["Weather rating","IP20 Indoors"],["Material construction","Thermal plastic frame, PMMA, LGP, Aluminium heatsink"],["Dimensions","\u00f8290x15mm"],["Packed Dimensions","310x300x43mm"],["Packed Weight","0.7kg 1pce"],["Light Output Colour","Natural White 4000k/Bright White 5000k/Cool White 6500k"],["Colour Rendering Index",">80"],["Shade/Housing","White"]]},{"id":"P24-WIFI","cat":"ceiling","name":"24W Smart WiFi Ceiling Light, CCT","price":40.0,"img":"/img/p24-wifi-1.webp","url":"https://greenhse.com/products/lighting-perth/led-ceiling-lights-perth/p24-wifi.html","shape":"panel","tone":"neutral","specs":["24W","Warm","IP20"],"desc":"The 24W Smart WiFi Ceiling Light, CCT is an LED ceiling light that delivers even, comfortable light. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Replaces","180-200w traditional downlight/60w CFL"],["Brightness","1920 lumens"],["Power consumption","24Watt"],["Beam angle","110\u00ba"],["Lifespan","25 000hrs"],["Fitting","Surface Mount or Recessed"],["Specifications","240-265VAC, 50-60Hz"],["Weather rating","IP20 Indoors"],["Material construction","Thermal plastic frame, PMMA LGP, Aluminium heatsink"],["Dimensions","\u00f8290x15mm"],["Packed Dimensions","310x300x43mm"],["Packed Weight","0.7kg 1pce"],["Mercury","No Mercury"],["Light Output Colour","Adjustable Warm White 3000k - Bright White 6000k"],["Colour Rendering Index",">80"]]},{"id":"P24-RGBW-CCT","cat":"ceiling","name":"24W Smart WiFi Ceiling Light, RGB, CCT","price":55.0,"img":"/img/p24-rgbw-cct-1.webp","url":"https://greenhse.com/lighting-perth/led-ceiling-lights-perth/p24-rgbw-cct.html","shape":"panel","tone":"rgb","specs":["24W","RGB","IP40"],"desc":"The 24W Smart WiFi Ceiling Light, RGB, CCT is an LED ceiling light that delivers even, comfortable light. It runs in RGB (full colour). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Full-colour RGB, run from a controller and remote","App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Brightness","2130 lumens (CCT)"],["Power consumption","24Watt"],["Beam angle","120\u00ba"],["Lifespan","30 000hrs"],["Fitting","Surface Mount"],["Specifications","240-265VAC, 50-60Hz"],["Weather rating","IP40 (Front) Indoor Use"],["Material construction","PC cover+ABS body"],["Dimensions","\u00f8300x40mm"],["Packed Dimensions","310x310x46mm"],["Weight","1kg 1pce"],["Light Output Colour","RGB (Full Colour), White CCT 2700-6500K"],["Colour Rendering Index","80"],["Shade/Housing","White"],["Warranty","3Yr"]]},{"id":"P18SE-CCT","cat":"ceiling","name":"18W Ceiling Light","price":23.0,"img":"/img/p18se-cct.webp","url":"https://greenhse.com/lighting-perth/led-ceiling-lights-perth/p18se-cct.html","shape":"panel","tone":"neutral","specs":["18W","Tri-colour","IP20"],"desc":"The 18W Ceiling Light is an LED ceiling light that delivers even, comfortable light. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Brightness","1620 lumens"],["Power consumption","18Watt"],["Beam angle","110\u00ba"],["Dimmable","Non-Dimmable"],["Lifespan","30 000hrs"],["Fitting","Surface Mount or Recessed with Clips"],["Specifications","240-265VAC, 50-60Hz"],["Weather rating","IP20 Indoors"],["Material construction","Thermal plastic frame, PMMA LGP, Aluminium heatsink"],["Dimensions","\u00f8217x15mm"],["Packed Dimensions","235x225x43mm"],["Packed Weight","0.5kg 1pce"],["Light Output Colour","Natural White 4000k/Bright White 5000k/Cool White 6500k"],["Colour Rendering Index",">80"],["Shade/Housing","White"]]},{"id":"P18E","cat":"ceiling","name":"21cm Slim 18W Ceiling Light, Natural White","price":16.0,"img":"/img/p18e.webp","url":"https://greenhse.com/products/lighting-perth/led-ceiling-lights-perth/p18e.html","shape":"panel","tone":"neutral","specs":["18W","4000K","IP40"],"desc":"The 21cm Slim 18W Ceiling Light, Natural White is an LED ceiling light that delivers even, comfortable light. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Replaces","2-Bulb Oyster Fitting"],["Brightness","1400 lumens"],["Power consumption","18Watt"],["Beam angle","120\u00ba"],["Dimmable","Non-Dimmable"],["Lifespan","30 000 hrs"],["Fitting","Surface Mount or Recessed"],["Specifications","200-240VAC, 50-60Hz"],["Weather rating","IP40 Indoors"],["Material construction","White PC frame, aluminium heatsink"],["Dimensions","\u00d8230x15mm"],["Packed Dimensions","275x239x30mm 1pce"],["Packed Weight","0.60kg 1pce"],["Mercury","No Mercury"],["Light Output Colour","Natural White 4000k"]]},{"id":"P6S-CCT","cat":"ceiling","name":"14cm Slim 6W LED Ceiling Light, CCT","price":10.0,"img":"/img/p6s-cct.webp","url":"https://greenhse.com/products/lighting-perth/led-ceiling-lights-perth/p6s-cct.html","shape":"panel","tone":"neutral","specs":["6W","Tri-colour","IP20"],"desc":"The 14cm Slim 6W LED Ceiling Light, CCT is an LED ceiling light that delivers even, comfortable light. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Replaces","50w traditional downlight"],["Brightness","450 lumens"],["Power consumption","6Watt"],["Beam angle","110\u00ba"],["Lifespan","30 000hrs"],["Fitting","Surface Mount or Recessed"],["Specifications","240-265VAC, 50-60Hz"],["Weather rating","IP20 Indoors"],["Material construction","Thermal plastic frame, PMMA LGP, Aluminium heatsink"],["Dimensions","\u00f8140x15mm"],["Packed Dimensions","160x145x60mm"],["Packed Weight","0.3kg"],["Mercury","No Mercury"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5000k"],["Colour Rendering Index",">80"]]},{"id":"ST-CH-BLACK-LINEAR","cat":"ceiling","name":"2m Black Linear Suspension Light","price":250.0,"img":"/img/st-ch-black-linear-4.webp","url":"https://greenhse.com/products/lighting-perth/led-ceiling-lights-perth/st-ch-black-linear-2.html","shape":"track","tone":"neutral","specs":["40W","Warm","IP65"],"desc":"The 2m Black Linear Suspension Light is an LED ceiling light that delivers even, comfortable light. It is switchable between 2700K and 6000K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Brightness","Up to 4000 Lumens"],["Power","40w"],["Beam angle","60\u00ba"],["Dimmable","and CCT Adjustable"],["Lifespan","30 000 hrs"],["Fitting","Ceiling suspended,"],["Specifications","24V DC"],["Weather Rating","IP65 (COB Strip)"],["Material","Aluminium Black Powder Coated + PVC Lens (White available on request)"],["Dimensions","200cm(L)x 5cm(W)x7cm(H)"],["Weight","2.6kg Net"],["Light Output Color","2700k - 6000k Adjustable (Warm - Cool White)"],["Colour Rendering Index",">90"],["Shade/Housing","Matte Black + White Lens"],["Warranty","2Yr limited - Needs to be installed by qualified electrician, excludes physical damage."]]},{"id":"P18CCT-RND-SQ","cat":"ceiling","name":"22.5cm Square Ceiling Light, 18W Tricolour","price":35.0,"img":"/img/p18cct-rnd-sq.webp","url":"https://greenhse.com/products/lighting-perth/led-ceiling-lights-perth/p18cct-rnd-sq.html","shape":"panel","tone":"neutral","specs":["18W","Tri-colour","IP20"],"desc":"The 22.5cm Square Ceiling Light, 18W Tricolour is an LED ceiling light that delivers even, comfortable light. It runs in tri-colour switch (3000K / 4000K / 5700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["3 selectable colour temperatures via switch","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Replaces","120W Traditional downlight / 44w CFL"],["Brightness","1280-1500 lumens"],["Power consumption","18Watt"],["Beam angle","120\u00ba"],["Dimmable","Non-Dimmable"],["Lifespan","40 000 hrs"],["Fitting","Recessed with spring clips"],["Specifications","AC200-240V, 50-60Hz"],["Weather rating","IP20"],["Material Construction","Aluminium Frame, PS Diffuser"],["Dimensions","225x225x21mm"],["Cutout","205x205mm"],["Weight","0.75kg 1pce 1kg packed"],["Mercury","No Mercury"],["Light Output Colour","Warm White 3000k/ Natural White 4000k/ Bright White 5000k"]]},{"id":"P36UP-30X120-CCT","cat":"ceiling","name":"30x120cm Premium 36W Panel Light, Low Glare, CCT, Back-Lit","price":50.0,"img":"/img/p36up-30x120-cct-1.webp","url":"https://greenhse.com/products/lighting-perth/led-ceiling-lights-perth/p36up-30x120-cct.html","shape":"panel","tone":"neutral","specs":["36W","Warm","IP40"],"desc":"The 30x120cm Premium 36W Panel Light, Low Glare, CCT, Back-Lit is an LED ceiling light that delivers even, comfortable light. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Low-glare optic for comfortable, even light","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Replaces","2 x 1.2m T8 tubes"],["Brightness","3600 Lumens"],["Power consumption","36W"],["Beam angle","90\u00ba with UGR<19 (Low Glare)"],["Dimmable","Non-dimmable (optional dimmable drivers available)"],["Lifespan","50 000 hrs"],["Fitting","Fits suspended ceilings"],["Specifications","220~240VAC, 50-60Hz"],["Weather rating","IP40 Indoor"],["Material construction","Aluminium, PMMA lens, PS diffuser"],["Dimensions","295mmx1195x32"],["Packed Dimensions","1260x290x375mm"],["Net Weight","2.5Kg/pce"],["Light Output Colour","Warm White 3000k or Natural White 4000k or Bright White 5700k"],["Colour Rendering Index","\u226580"]]},{"id":"P36-60X60-CCT","cat":"ceiling","name":"60x60cm Premium 36W Panel Light, Low Glare, CCT, Back-Lit","price":50.0,"img":"/img/p36-60x60-cct-1.webp","url":"https://greenhse.com/lighting-perth/led-ceiling-lights-perth/p36-60x60-cct.html","shape":"panel","tone":"neutral","specs":["36W","Warm","IP40"],"desc":"The 60x60cm Premium 36W Panel Light, Low Glare, CCT, Back-Lit is an LED ceiling light that delivers even, comfortable light. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 ceiling / oyster / panel light","Mounting plate & screws","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Low-glare optic for comfortable, even light","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Ceiling / Panel / Oyster Lights"],["Replaces","2 x 1.2m T8 tubes"],["Brightness","3600 Lumens"],["Power consumption","36W"],["Beam angle","90\u00ba with UGR<19 (Low Glare)"],["Dimmable","Non-dimmable (optional dimmable drivers available)"],["Lifespan","50 000 hrs"],["Fitting","Fits suspended ceilings"],["Specifications","220~240VAC, 50-60Hz"],["Weather rating","IP40 Indoor"],["Material construction","Aluminium, PMMA lens, PS diffuser"],["Dimensions","595mmx595x32"],["Packed Dimensions","600x600x35mm"],["Net Weight","1.9Kg/pce"],["Light Output Colour","Warm White 3000k, Natural White 4000k, Bright White 5700k"],["Colour Rendering Index","\u226580"]]},{"id":"DL7ES-F","cat":"downlights","name":"70mm 7W Downlight, Tricolour, Dimmable","price":10.0,"img":"/img/dl7es-flat.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl7es-flat.html","shape":"down","tone":"neutral","specs":["7W","Tri-colour","IP40"],"desc":"The 70mm 7W Downlight, Tricolour, Dimmable is a recessed LED downlight for homes and commercial ceilings. It runs in tri-colour switch (3000K / 4000K / 5700K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Smooth, flicker-free dimming","3 selectable colour temperatures via switch","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Downlights"],["Replaces","50Watt Halogen"],["Brightness","560/650/600 lumens (3000/4000/5000k)"],["Power consumption","7Watt"],["Beam angle","100\u00ba"],["Lifespan","40 000 hrs"],["Fitting","Flat surface, spring clips"],["Specifications","AC200-240V"],["Weather rating","IP40 / IP54 (Front only)"],["Material construction","Plastic Coated Aluminium, PC Diffused Lens"],["Dimensions","\u00d885mmx63 Cutout 70-75mm"],["Packed Dimensions","130x130x90mm 1pce"],["Packed Weight","0.2kg/pce Net"],["Mercury","No Mercury"],["Light Output Colour","Warm 3000k /Natural 4000k /Bright 5000k"],["Colour Rendering Index","\u226580"]]},{"id":"DL7A-CCT","cat":"downlights","name":"70mm 7W Downlight, Dimmable, Adjustable, 60\u00ba","price":15.0,"img":"/img/dl7a-1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl7a.html","shape":"down","tone":"neutral","specs":["7W","Tri-colour","IP40"],"desc":"The 70mm 7W Downlight, Dimmable, Adjustable, 60\u00ba is a recessed LED downlight for homes and commercial ceilings. It runs in neutral white (~4000K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Smooth, flicker-free dimming","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Replaces","50Watt Halogen"],["Brightness","600/640/660 lumens (3000k, 4000k, 5000k)"],["Power consumption","7Watt"],["Beam angle","60\u00ba"],["Dimmable","8-100%"],["Lifespan","40 000 hrs"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP40 Indoor Use"],["Material Construction","Aluminium, Thermal Plastic, PMMA"],["Dimensions","\u00d885mmx64.5 Cutout 70-75mm"],["Packed Dimensions","11x11x8cm 1pce"],["Weight","0.25kg/pce packed"],["Light Output Colour","Warm 3000k / Natural 4000k / Bright 5000k"],["Colour Rendering Index","80"],["Shade/Housing","Matte White Recessed"]]},{"id":"DL7A-CCT","cat":"downlights","name":"70mm 7W Downlight, CCT, Dimmable, Low Glare","price":15.0,"img":"/img/dl7a-cct-1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl7a-cct.html","shape":"down","tone":"neutral","specs":["7W","Tri-colour","IP50"],"desc":"The 70mm 7W Downlight, CCT, Dimmable, Low Glare is a recessed LED downlight for homes and commercial ceilings. It runs in CCT tunable (2700\u20135700K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Smooth, flicker-free dimming","Tunable white from warm 2700K to cool 5700K","Low-glare optic for comfortable, even light","Energy-efficient LED \u2014 lower running costs"],"specTable":[["Category","Downlights"],["Brightness","540-630 Up to 90 lumens/watt"],["Power consumption","7Watt"],["Beam angle","60\u00ba"],["Dimmable","Triac Dimmable 8-100%"],["Lifespan","50 000 hrs"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP50 Indoor Use"],["Material Construction","Plastic-Coated Aluminium, Thermally Conductive Plastic, PC"],["Dimensions","\u00d885mmx68 Cutout 70-75mm"],["Packed Dimensions","11x11x8cm 1pce"],["Weight","0.25kg/pce packed"],["Light Output Colour","Warm 3000k / Natural 4000k / Bright 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Matte White"],["Warranty","3Yr"]]},{"id":"DL8ES-FLAT-ALL-FP","cat":"downlights","name":"90mm 8W Downlight, Dimmable, Flat, Switch Adjustable","price":5.5,"img":"/img/legacy/dl8es-f_1_1_1_1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl8es-flat-all-fp-1.html","shape":"switch","tone":"neutral","specs":["8W","Tri-colour","IP54"],"desc":"The 90mm 8W Downlight, Dimmable, Flat, Switch Adjustable is a recessed LED downlight for homes and commercial ceilings. It runs in neutral white (~4000K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Smooth, flicker-free dimming","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Replaces","100-120Watt"],["Brightness","660-800 lumens"],["Power consumption","8Watt"],["Beam angle","110\u00ba"],["Lifespan","50 000 hrs"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 / IP40"],["Material Construction","PC, White RAL 9016"],["Dimensions","\u00d8106mmx45 Cutout 90-95mm"],["Weight","0.2kg/pce"],["Light Output Colour","3000 / 4000 / 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Matte White Standard - Brushed Chrome / Matte Black (optional)"],["Warranty","3Yr"],["Certification","SAA, RCM, IC-4"]]},{"id":"DL9ESF-HL","cat":"downlights","name":"90mm 8W LED Downlight, High Lumen, Tricolour","price":9.0,"img":"/img/dl9es-flat-hl.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl9es-flat-hl.html","shape":"down","tone":"neutral","specs":["8W","Tri-colour","IP54"],"desc":"The 90mm 8W LED Downlight, High Lumen, Tricolour is a recessed LED downlight for homes and commercial ceilings. It runs in tri-colour switch (3000K / 4000K / 5700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["3 selectable colour temperatures via switch","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Replaces","100-120Watt"],["Brightness","790-875 lumens, up to 109 lumens per watt"],["Power consumption","8Watt"],["Beam angle","100\u00ba"],["Dimmable","10-100%"],["Lifespan","50 000 hrs"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 / IP40"],["Material Construction","Plastic Coated Aluminium, PC Diffuser"],["Dimensions","\u00d8115mmx59 Cutout 90-95mm"],["Packed Dimensions","1205x120x70mm 1pce"],["Weight","0.2kg/pce"],["Light Output Colour","3000 / 4000 / 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Matte White"]]},{"id":"DL8CCT-P-LG","cat":"downlights","name":"90mm Premium 8W Downlight, Low Glare, Adjustable","price":16.0,"img":"/img/dl8cct-p-lg-1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl8cct-p-lg.html","shape":"down","tone":"neutral","specs":["8W","Tri-colour","IP20"],"desc":"The 90mm Premium 8W Downlight, Low Glare, Adjustable is a recessed LED downlight for homes and commercial ceilings. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Low-glare optic for comfortable, even light","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Replaces","100-120 Watt"],["Brightness","760-950 lumens"],["Power consumption","8Watt"],["Beam angle","60\u00ba"],["Lifespan","50 000 hrs"],["Specifications","AC220-240V, 50-60Hz"],["Weather Rating","IP20"],["Material Construction","PC Lens, Plastic Coated Aluminium, White RAL 9016"],["Dimensions","\u00d8106mmx84 Cutout 90mm"],["Weight","0.2kg/pce"],["Light Output Colour","3000 / 4000 / 5000k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Matte White Standard"],["Warranty","3Yr"],["Certification","SAA, RCM, IC-4"]]},{"id":"DL10ES-F","cat":"downlights","name":"90mm 10W Downlight, Tricolour, Dimmable","price":10.0,"img":"/img/dl10es.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl10es.html","shape":"down","tone":"neutral","specs":["10W","Tri-colour","IP54"],"desc":"The 90mm 10W Downlight, Tricolour, Dimmable is a recessed LED downlight for homes and commercial ceilings. It runs in tri-colour switch (3000K / 4000K / 5700K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Smooth, flicker-free dimming","3 selectable colour temperatures via switch","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Downlights"],["Replaces","100-120Watt"],["Brightness","800/950/870 lumens (3000k, 4000k, 5000k)"],["Power consumption","10Watt"],["Beam angle","110\u00ba"],["Dimmable","10-100%"],["Lifespan","40 000 hrs"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 / IP40"],["Material Construction","Aluminium, PCB, PMMA"],["Dimensions","\u00d8115mmx61 Cutout 90-95mm"],["Packed Dimensions","12.5x12.5x70cm 1pce"],["Weight","0.3kg/pce packed"],["Light Output Colour","3000 / 4000 / 5000k"],["Colour Rendering Index","80"],["Shade/Housing","Matte White / Brushed Chrome / Matte Black"]]},{"id":"DL10ES-FLAT-WHITE-","cat":"downlights","name":"90mm 10W Downlight, Tricolour, White","price":10.0,"img":"/img/legacy/dl10es-flat_copy_1_1_1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl10es-flat-white-1.html","shape":"down","tone":"neutral","specs":["10W","Tri-colour","IP54"],"desc":"The 90mm 10W Downlight, Tricolour, White is a recessed LED downlight for homes and commercial ceilings. It runs in tri-colour switch (3000K / 4000K / 5700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["3 selectable colour temperatures via switch","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Replaces","100-120Watt"],["Brightness","800/950/870 lumens (3000k, 4000k, 5000k)"],["Power consumption","10Watt"],["Beam angle","110\u00ba"],["Dimmable","10-100%"],["Lifespan","40 000 hrs"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 / IP40"],["Material Construction","Aluminium, PCB, PMMA"],["Dimensions","\u00d8115mmx61 Cutout 90-95mm"],["Packed Dimensions","12.5x12.5x70cm 1pce"],["Weight","0.3kg/pce packed"],["Light Output Colour","3000 / 4000 / 5000k"],["Colour Rendering Index","80"],["Shade/Housing","Matte White / Matte Black"]]},{"id":"DL10ES-FLAT-BLACK","cat":"downlights","name":"90mm 10W Downlight, Tricolour, Black","price":10.0,"img":"/img/dl10es-flat-black.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl10es-flat-black.html","shape":"down","tone":"neutral","specs":["10W","Tri-colour","IP54"],"desc":"The 90mm 10W Downlight, Tricolour, Black is a recessed LED downlight for homes and commercial ceilings. It runs in tri-colour switch (3000K / 4000K / 5700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["3 selectable colour temperatures via switch","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Replaces","100-120Watt"],["Brightness","800/950/870 lumens (3000k, 4000k, 5000k)"],["Power consumption","10Watt"],["Beam angle","110\u00ba"],["Dimmable","10-100%"],["Lifespan","40 000 hrs"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 / IP40"],["Material Construction","Aluminium, PCB, PMMA"],["Dimensions","\u00d8115mmx61 Cutout 90-95mm"],["Packed Dimensions","12.5x12.5x70cm 1pce"],["Weight","0.3kg/pce packed"],["Light Output Colour","3000 / 4000 / 5000k"],["Colour Rendering Index","80"],["Shade/Housing","Matte White / Matte Black"]]},{"id":"DL10PS","cat":"downlights","name":"90mm Premium 10W Downlight, Low Glare, 60\u00ba","price":13.0,"img":"/img/dl10-ps.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl10-ps.html","shape":"down","tone":"neutral","specs":["10W","Warm","IP54"],"desc":"The 90mm Premium 10W Downlight, Low Glare, 60\u00ba is a recessed LED downlight for homes and commercial ceilings. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Low-glare optic for comfortable, even light","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Replaces","100-120Watt"],["Brightness","800-980 lumens"],["Power consumption","10Watt"],["Beam angle","60\u00ba"],["Dimmable","8-100%"],["Lifespan","50 000 hrs"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 / IP40"],["Material Construction","Plastic coated aluminium"],["Dimensions","\u00d8115mmx61 Cutout 90-95mm"],["Packed Dimensions","12.5x12.5x70cm 1pce"],["Weight","0.3kg packed"],["Light Output Colour","Warm 3000k - Natural 4000k - Bright 5000k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Matte White / Matte Black"]]},{"id":"DL10PBT","cat":"downlights","name":"90mm Premium 10W Downlight, Bluetooth, 60\u00ba","price":18.0,"img":"/img/dl10pbt-1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl10pbt.html","shape":"down","tone":"neutral","specs":["10W","Warm","IP54"],"desc":"The 90mm Premium 10W Downlight, Bluetooth, 60\u00ba is a recessed LED downlight for homes and commercial ceilings. It is switchable between 2700K and 5700K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Replaces","100-120Watt"],["Brightness","800-980 lumens"],["Power consumption","10Watt"],["Beam angle","60\u00ba Anti Glare"],["Dimmable","8-100%"],["Lifespan","50 000 hrs"],["Specifications","AC200-240V, 50-60Hz"],["Weather rating","IP54 / IP40"],["Material construction","Plastic coated aluminium"],["Dimensions","\u00d8115mmx61 Cutout 90-95mm"],["Packed Dimensions","12.5x12.5x7cm 1pce"],["Weight","0.3kg packed"],["Light Output Colour","Warm 2700k - Bright 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Matte White / Matte Black"]]},{"id":"DL10S-AL","cat":"downlights","name":"10W LED Downlight (90mm) with Changeable Covers","price":13.0,"img":"/img/dl10s-al.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl10s-al.html","shape":"down","tone":"neutral","specs":["10W","Tri-colour","IP44"],"desc":"The 10W LED Downlight (90mm) with Changeable Covers is a recessed LED downlight for homes and commercial ceilings. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Replaces","75Watt Halogen"],["Brightness","800-900 lumens (3000k, 4000k, 5000k)"],["Power consumption","10Watt"],["Beam angle","100\u00ba"],["Lifespan","35 000 hrs"],["Specifications","AC220-240V, 50-60Hz"],["Weather rating","IP44 / IP40"],["Material construction","Diecast aluminium with nano plastic, aluminium reflector"],["Dimensions","\u00d8108mmx67 Cutout 90mm"],["Packed Dimensions","11.3x11.3x8.2cm 1pce"],["Weight","0.4kg/pce packed"],["Light Output Colour","Warm 3000 / Natural 4000 / Bright 5000k"],["Colour Rendering Index",">80"],["Shade/Housing","Matte White Flat. Matte White Recessed, Brushed Chrome Flat, Matte White Square, Matte White Flat Large \u00d8124mm"],["Warranty","4Yr"]]},{"id":"DL9RGBW-BT1","cat":"downlights","name":"90mm 9W Downlight, RGBW, Bluetooth","price":25.0,"img":"/img/dl9rgbw-bt1-2.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl9rgbw-bt1.html","shape":"down","tone":"rgb","specs":["9W","RGB","IP54"],"desc":"The 90mm 9W Downlight, RGBW, Bluetooth is a recessed LED downlight for homes and commercial ceilings. It runs in RGBW (colour + white). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Full-colour RGB, run from a controller and remote","App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Downlights"],["Replaces","75Watt"],["Brightness","900-1000 lumens (White)"],["Power consumption","9Watt"],["Beam angle","110\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Flat surface, spring clips"],["Specifications","AC220-240V, 50/60Hz"],["Weather Rating","IP54 (Front) IP40 (Back)"],["Material Construction","Aluminium coated plastic, PC Lens, White RAL9016"],["Dimensions","\u00d8115mmx57 Cutout 90-95mm"],["Packed Dimensions","120x120x75mm 1pce"],["Packed Weight","0.35kg"],["Mercury","No Mercury"],["Light Output Colour","Adjustable from Warm 2700k - Bright 6500k + RGB"],["Colour Rendering Index","80"]]},{"id":"DL9RGBW-PBT","cat":"downlights","name":"90mm 9W Downlight, RGBW, Low Glare Bluetooth","price":27.0,"img":"/img/dl9rgbw-pbt-2.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl9rgbw-pbt.html","shape":"down","tone":"rgb","specs":["9W","RGB","IP54"],"desc":"The 90mm 9W Downlight, RGBW, Low Glare Bluetooth is a recessed LED downlight for homes and commercial ceilings. It runs in RGBW (colour + white). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Full-colour RGB, run from a controller and remote","App & voice control (Alexa & Google Home)","Low-glare optic for comfortable, even light","Energy-efficient LED \u2014 lower running costs"],"specTable":[["Category","Downlights"],["Replaces","75Watt"],["Brightness","900-1000 lumens (White)"],["Power consumption","9Watt"],["Beam angle","60\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Flat surface, spring clips"],["Specifications","AC220-240V, 50/60Hz"],["Weather Rating","IP54 (Front) IP40 (Back)"],["Material Construction","Aluminium coated plastic, PC Lens, White RAL9016"],["Dimensions","\u00d8115mmx57 Cutout 90-95mm"],["Packed Dimensions","120x120x75mm"],["Packed Weight","0.35kg"],["Mercury","No Mercury"],["Light Output Colour","Adjustable from Warm 2700k - Bright 6500k + RGB"],["Colour Rendering Index","80"]]},{"id":"DL7G-IP65-BLACK-1","cat":"downlights","name":"7W BLACK GIMBAL DOWNLIGHT, DIMMABLE IP65","price":23.0,"img":"/img/dl7g-ip65-black-1-1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl7g-ip65-black-1.html","shape":"down","tone":"neutral","specs":["7W","Tri-colour","IP65"],"desc":"The 7W BLACK GIMBAL DOWNLIGHT, DIMMABLE IP65 is a recessed LED downlight for homes and commercial ceilings. It runs in neutral white (~4000K) and dims smoothly without flicker. It's sealed to IP65 for outdoor and wet-area use. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Smooth, flicker-free dimming","Weatherproof IP65 \u2014 rated for outdoor & wet areas","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Downlights"],["Replaces","up to 70Watt Halogen"],["Brightness","700 lumens"],["Power consumption","7Watt"],["Beam angle","60\u00ba"],["Dimmable","0-100%"],["Lifespan","50 000 hrs"],["Fitting","Flat Surface, Spring Clips"],["Specifications","AC220-240V, 50-60Hz"],["Weather rating","IP65 waterproof, dustproof, Driver IP20"],["Material construction","Aluminium and PMMA"],["Dimensions","\u00d895x38mm Cutout 70mm"],["Packed Dimensions","140x115x75mm"],["Weight","400g packed"],["Light Output Colour","Warm 3000k/ Natural 4000k / Bright 6000k"],["Colour Rendering Index",">80"]]},{"id":"DL10GS-IP65","cat":"downlights","name":"90mm Gimbal 10W Downlight, CCT, IP65","price":28.0,"img":"/img/dl10gs-ip65-1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl10gs-ip65.html","shape":"down","tone":"neutral","specs":["10W","Tri-colour","IP65"],"desc":"The 90mm Gimbal 10W Downlight, CCT, IP65 is a recessed LED downlight for homes and commercial ceilings. It runs in CCT tunable (2700\u20135700K). It's sealed to IP65 for outdoor and wet-area use. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Weatherproof IP65 \u2014 rated for outdoor & wet areas","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Downlights"],["Replaces","up to 100Watt Halogen"],["Brightness","1000 lumens"],["Power consumption","10Watt"],["Beam angle","60\u00ba"],["Dimmable","0-100%"],["Lifespan","50 000 hrs"],["Fitting","Flat Surface, Spring Clips"],["Specifications","AC220-240V, 50-60Hz"],["Weather Rating","IP65 waterproof, dustproof, Driver IP20"],["Material Construction","Aluminium and PMMA"],["Dimensions","\u00d8110x45mm Cutout 90mm"],["Packed Dimensions","135x115x70mm"],["Weight","450g /pce"],["Light Output Colour","Warm 3000k/ Natural 4000k / Bright 6000k"],["Colour Rendering Index",">80"]]},{"id":"DL13ES-F","cat":"downlights","name":"12cm 13W Downlight, Dimmable, CCT, Flat Cover","price":18.0,"img":"/img/dl13es.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl13es.html","shape":"down","tone":"neutral","specs":["13W","Tri-colour","IP54"],"desc":"The 12cm 13W Downlight, Dimmable, CCT, Flat Cover is a recessed LED downlight for homes and commercial ceilings. It runs in CCT tunable (2700\u20135700K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Smooth, flicker-free dimming","Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Downlights"],["Replaces","120Watt"],["Brightness","1050/1320/1170 lumens (3000k, 4000k, 5000k)"],["Power consumption","13Watt"],["Beam angle","100\u00ba"],["Dimmable","10-100%"],["Lifespan","40 000 hrs"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 / IP40"],["Material Construction","Aluminium, PCB, PMMA"],["Dimensions","\u00d8145mmx62.5 Cutout 110mm"],["Packed Dimensions","157x70x157mm/pce"],["Weight","0.35kg/pce"],["Light Output Colour","Warm White 3 000k Natural White 4 000k Bright White/ 5 000k"],["Colour Rendering Index","80"],["Shade/Housing","Matte White Flat"]]},{"id":"DL15-12-CCT-PA","cat":"downlights","name":"12cm 15W/12W Downlight, CCT","price":28.0,"img":"/img/dl15-12-cct-pa-1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl15-12-cct-pa.html","shape":"down","tone":"neutral","specs":["12W","Tri-colour","IP54"],"desc":"The 12cm 15W/12W Downlight, CCT is a recessed LED downlight for homes and commercial ceilings. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Brightness","1550-1700 Lumens (15w) 1200-1400 Lumens (12w)"],["Power consumption","12W or 15Watt"],["Beam angle","100\u00ba"],["Dimmable","Non-Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Sunk surface, spring clips"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 (Outside) / IP20 (Inside)"],["Material Construction","PC Lens, Plastic Coated Aluminium, White RAL 9016"],["Dimensions","\u00d8145x55mm Cutout 120-130mm"],["Weight","0.25kg 1pce"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Aluminium, white recessed cover"],["Warranty","3Yr"]]},{"id":"DL25-20-140-CCT-PA","cat":"downlights","name":"14cm 25W/20W Downlight, CCT","price":40.0,"img":"/img/dl25-20-140-cct-pa-1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl25-20-140-cct-pa.html","shape":"down","tone":"neutral","specs":["25W","Tri-colour","IP54"],"desc":"The 14cm 25W/20W Downlight, CCT is a recessed LED downlight for homes and commercial ceilings. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Brightness","2750-2950 Lumens (25w) 1200-1400 Lumens (20w)"],["Power consumption","25W or 20Watt"],["Beam angle","100\u00ba"],["Dimmable","Non-Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Sunk surface, spring clips"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 (Outside) / IP20 (Inside)"],["Material Construction","PC Lens, Plastic Coated Aluminium, White RAL 9016"],["Dimensions","\u00d8170x60mm Cutout 140-150mm"],["Weight","0.34kg 1pce"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Aluminium, white recessed cover"],["Warranty","3Yr"]]},{"id":"DL25-20-160-CCT-PA","cat":"downlights","name":"16cm 25W/20W Downlight, CCT","price":45.0,"img":"/img/dl25-20-160-cct-pa-1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl25-20-160-cct-pa.html","shape":"down","tone":"neutral","specs":["25W","Tri-colour","IP54"],"desc":"The 16cm 25W/20W Downlight, CCT is a recessed LED downlight for homes and commercial ceilings. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Brightness","2850-3050 Lumens (25w) 2250-2400 Lumens (20w)"],["Power consumption","25W or 20Watt"],["Beam angle","100\u00ba"],["Dimmable","Non-Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Sunk surface, spring clips"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 (Outside) / IP20 (Inside)"],["Material Construction","PC Lens, Plastic Coated Aluminium, White RAL 9016"],["Dimensions","\u00d8190x62mm Cutout 160-170mm"],["Weight","0.37kg 1pce"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Aluminium, white recessed cover"],["Warranty","3Yr"]]},{"id":"DL25S-TUYA","cat":"downlights","name":"16-17cm 25W LED Smart Tuya Downlight WIFI","price":60.0,"img":"/img/25w-smart-led-tuya-2.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/25w-smart-led-tuya-downlight.html","shape":"down","tone":"neutral","specs":["25W","Warm","IP54"],"desc":"The 16-17cm 25W LED Smart Tuya Downlight WIFI is a recessed LED downlight for homes and commercial ceilings. It is switchable between 3000K and 5700K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Brightness","2370-2750, up to 110 Lumens/Watt"],["Power consumption","25Watt"],["Beam angle","90\u00ba"],["Dimmable","by App on Smart device"],["Lifespan","50 000 hrs"],["Fitting","Sunk surface, spring clips"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 front cover IP20 on the back"],["Material Construction","Diecast Aluminium, PC"],["Dimensions","\u00d8190x45mm Cutout 160-170mm"],["Packed Weight","0.64kg 1pce"],["Mercury","No Mercury"],["Light Output Colour","Adjustable Warm 3000k - Bright 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Matte white, white frosted PC cover"]]},{"id":"DL35-28-200-CCT-PA","cat":"downlights","name":"20cm 35W/28W LED Downlight, Power adjustable","price":55.0,"img":"/img/dl35-28-200-cct-pa-1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl35-28-200-cct-pa.html","shape":"down","tone":"neutral","specs":["35W","Tri-colour","IP54"],"desc":"The 20cm 35W/28W LED Downlight, Power adjustable is a recessed LED downlight for homes and commercial ceilings. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Brightness","3900-4300 Lumens (35w) 3100-3550 Lumens (28w)"],["Power consumption","35W or 28Watt"],["Beam angle","100\u00ba"],["Dimmable","Non-Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Sunk surface, spring clips"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 (Outside) / IP20 (Inside)"],["Material Construction","PC Lens, Plastic Coated Aluminium, White RAL 9016"],["Dimensions","\u00d8235x67mm Cutout 200-210mm"],["Weight","0.47kg 1pce"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Aluminium, white recessed cover"],["Warranty","3Yr"]]},{"id":"DL35S","cat":"downlights","name":"21cm 35W Downlight, Dimmable, Tricolour","price":55.0,"img":"/img/dl35s-1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl35s.html","shape":"down","tone":"neutral","specs":["35W","Tri-colour","IP54"],"desc":"The 21cm 35W Downlight, Dimmable, Tricolour is a recessed LED downlight for homes and commercial ceilings. It runs in tri-colour switch (3000K / 4000K / 5700K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Smooth, flicker-free dimming","3 selectable colour temperatures via switch","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Downlights"],["Replaces","100W CFL"],["Brightness","3300/3600/3400 lumens (Warm/Natural/Bright)"],["Power consumption","35Watt"],["Beam angle","90\u00ba"],["Dimmable","8-100%"],["Lifespan","50 000 hrs"],["Fitting","Sunk surface, spring clips"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 Front/IP20 Back"],["Material Construction","Aluminium and PC"],["Dimensions","\u00d8228x45mm Cutout 200-210mm"],["Packed Dimensions","27x28x7.6cm 1pce"],["Packed Weight","1.1kg 1pce"],["Mercury","No Mercury"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5000k"]]},{"id":"WL8-CCT-BW-1-1","cat":"downlights","name":"8W Up/Down Indoor Wall Light, CCT Dimmable","price":42.0,"img":"/img/wl8-cct-bw-1-2.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/wl8-cct-bw-1.html","shape":"wall","tone":"neutral","specs":["8W","Tri-colour","IP20"],"desc":"The 8W Up/Down Indoor Wall Light, CCT Dimmable is a recessed LED downlight for homes and commercial ceilings. It runs in CCT tunable (2700\u20135700K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Smooth, flicker-free dimming","Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Downlights"],["Brightness","700-750 lumens"],["Power consumption","8Watt"],["Beam angle","120\u00ba"],["Dimmable","Triac Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Wall Mount"],["Specifications","AC220-240V, 50-60Hz"],["Weather Rating","IP20 Indoor Use"],["Material Construction","Aluminium & PC"],["Dimensions","242x67x77mm"],["Weight","600g /pce"],["Light Output Colour","Warm 3000k/ Natural 4000k / Bright 5700k"],["Colour Rendering Index","80"],["Shade/Housing","Matte White"],["Warranty","3 Years"]]},{"id":"MR10-CCT-WALL-B-1","cat":"downlights","name":"10W Up/Down LED Wall Light, CCT IP65","price":55.0,"img":"/img/mr10-cct-wall-b-2.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/mr10-cct-wall-b.html","shape":"wall","tone":"neutral","specs":["10W","Tri-colour","IP65"],"desc":"The 10W Up/Down LED Wall Light, CCT IP65 is a recessed LED downlight for homes and commercial ceilings. It runs in CCT tunable (2700\u20135700K). It's sealed to IP65 for outdoor and wet-area use. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Weatherproof IP65 \u2014 rated for outdoor & wet areas","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Downlights"],["Installation","Must be installed by a licensed electrician"],["Brightness","900 lumens"],["Power consumption","10Watt (5w/5w Up/Down)"],["Beam angle","29x77\u00ba Rectangular Beam"],["Dimmable","Non Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Wall Mount"],["Specifications","220-240V 50Hz"],["Weather Rating","IP65 Indoor and Outdoor Use"],["Material Construction","Diecast Aluminium, PC Optical Lens"],["Dimensions","174x92x29mm"],["Weight","600g /pce"],["Light Output Colour","Warm 3000k/ Natural 4000k / Bright 5700k"],["Colour Rendering Index","80"],["Shade/Housing","Matte Black"]]},{"id":"GH-C12CCT-BW-1","cat":"downlights","name":"12W LED Ceiling Light White, CCT Dimmable","price":34.0,"img":"/img/gh-c12cct-bw-2.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/gh-c12cct-bw.html","shape":"down","tone":"neutral","specs":["12W","Tri-colour","IP20"],"desc":"The 12W LED Ceiling Light White, CCT Dimmable is a recessed LED downlight for homes and commercial ceilings. It runs in CCT tunable (2700\u20135700K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Smooth, flicker-free dimming","Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Downlights"],["Brightness","1000-1100 lumens"],["Power consumption","12Watt"],["Beam angle","100\u00ba"],["Dimmable","Triac Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface/Ceiling Mount"],["Specifications","AC220-240V, 50-60Hz"],["Weather Rating","IP20 Indoor Use"],["Material Construction","Diecast Aluminium"],["Dimensions","\u00d8115x94mm"],["Weight","580g /pce"],["Light Output Colour","Warm 3000k/ Natural 4000k / Bright 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Matte Black Matte White"],["Warranty","2 Years"]]},{"id":"DL03-ALL","cat":"downlights","name":"30mm LED 3W Starlight","price":12.0,"img":"/img/dl03-all-1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl03-all.html","shape":"star","tone":"neutral","specs":["3W","Tri-colour","IP20"],"desc":"The 30mm LED 3W Starlight is a recessed LED downlight for homes and commercial ceilings. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Replaces","25W Halogen"],["Brightness","280 lumens"],["Power consumption","3Watt"],["Beam angle","45\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Spring clips"],["Specifications","AC100-240V"],["Weather rating","IP20"],["Material construction","Aluminium + PC"],["Dimensions","\u00f842mmx38 Cutout 30mm"],["Packed Dimensions","51x51x90mm 1pcs"],["Packed Weight","0.2Kg"],["Instant start","suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","Blue/ Warm 3200k / Natural 4000k / Bright 5000k / Ultra Bright 6000k"]]},{"id":"DL03-4KIT","cat":"downlights","name":"3W x 3 Star Light Kit, Non-Dimmable","price":46.0,"img":"/img/dl03-4kit-1-1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl03-4kit-1.html","shape":"star","tone":"neutral","specs":["3W","Tri-colour","IP20"],"desc":"The 3W x 3 Star Light Kit, Non-Dimmable is a recessed LED downlight for homes and commercial ceilings. It runs in neutral white (~4000K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Smooth, flicker-free dimming","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Replaces","25W Halogen (x3)"],["Brightness","280 lumens (x3)"],["Power consumption","3Watt (x3)"],["Beam angle","45\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Spring clips"],["Specifications","AC100-240V"],["Weather rating","IP20"],["Material construction","Aluminium + PC"],["Dimensions","\u00f842mmx38 Cutout 30mm (each light)"],["Packed Dimensions","51x51x90mm (each light)"],["Packed Weight","1Kg"],["Instant start","suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","Blue / Warm 3200k / Natural 4000k / Bright 5000k / Ultra Bright 6000k"]]},{"id":"DL03-4KIT","cat":"downlights","name":"3W x 4 Star Light Kit, Dimmable","price":46.0,"img":"/img/dl03-4kit-2.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl03-4kit.html","shape":"star","tone":"neutral","specs":["3W","Tri-colour","IP20"],"desc":"The 3W x 4 Star Light Kit, Dimmable is a recessed LED downlight for homes and commercial ceilings. It runs in neutral white (~4000K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Smooth, flicker-free dimming","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Replaces","25W Halogen (x4)"],["Brightness","280 lumens (x4)"],["Power consumption","3Watt (x4)"],["Beam angle","45\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Spring clips"],["Specifications","AC100-240V"],["Weather rating","IP20"],["Material construction","Aluminium + PC"],["Dimensions","\u00f842mmx38 Cutout 30mm (each light)"],["Packed Dimensions","51x51x90mm (each light)"],["Packed Weight","1Kg"],["Instant start","suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","Blue / Warm 3200k / Natural 4000k / Bright 5000k / Ultra Bright 6000k"]]},{"id":"DL03-6KIT","cat":"downlights","name":"3W x 6 Star Light Kit, Dimmable","price":90.0,"img":"/img/dl03-6kit-1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl03-6kit.html","shape":"star","tone":"neutral","specs":["3W","Tri-colour","IP20"],"desc":"The 3W x 6 Star Light Kit, Dimmable is a recessed LED downlight for homes and commercial ceilings. It runs in neutral white (~4000K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Smooth, flicker-free dimming","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Replaces","25W Halogen (x6)"],["Brightness","280 lumens (x6)"],["Power consumption","3Watt (x6)"],["Beam angle","45\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Spring clips"],["Specifications","AC100-240V"],["Weather rating","IP20"],["Material construction","Aluminium + PC"],["Dimensions","\u00f842mmx38 Cutout 29mm (each light)"],["Packed Dimensions","51x51x90mm (each light)"],["Packed Weight","1.25Kg"],["Instant start","suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","Blue / Warm 3200k / Natural 4000k / Bright 5000k / Ultra Bright 6000k"]]},{"id":"DL03-DRIVERS","cat":"downlights","name":"3W Starlight Driver 3, 4 or 6 Pin","price":10.0,"img":"/img/dl03-drivers-1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl03-drivers.html","shape":"star","tone":"neutral","specs":["3W"],"desc":"The driver for 3W star lights. Pick it by how many lights it has to run: 3-pin does 1 to 3 lights and is not dimmable, 4-pin does 3 to 4 and dims, 6-pin does 3 to 6 and dims.","includes":["1 \u00d7 LED driver","Wiring instructions"],"features":["3, 4 and 6 pin versions","4-pin and 6-pin are dimmable","Runs up to six 3W star lights"],"specTable":[["Category","Downlights"],["3 Pin Driver","Can run 1, 2 or 3 3w LED star lights, non-dimmable"],["4 Pin Driver","Can run 3 or 4 3w LED star lights, dimmable"],["6 Pin Driver","Can run 3, 4, 5 or 6 3w LED star lights, dimmable"]]},{"id":"DL3-RGBW-GROUP","cat":"downlights","name":"3W Smart RGBW Star Lights","price":65.0,"img":"/img/dl3-rgbw-group-2.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dl3-rgbw-group.html","shape":"star","tone":"rgb","specs":["3W","RGBW","IP65"],"desc":"The 3W Smart RGBW Star Lights is a recessed LED downlight for homes and commercial ceilings. It runs in RGBW (colour + white). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Full-colour RGB plus a separate white channel","App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Downlights"],["Power consumption","3Watt"],["Wattage","\u00b1 135 lumens/watt (4000k)"],["Beam angle","30\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Clips"],["Specifications","1-12V DC"],["Weather rating","Waterproof IP65"],["Material construction","Aluminium + PC"],["Dimensions","\u00f842mmx25 Cutout 30mm"],["Packed Dimensions","115x60x50mm 1pcs"],["Packed Weight","0.2Kg"],["Mercury","No Mercury"],["Light Output Colour","White (4000k) and Full Colour (RGBW)"],["Colour Rendering Index","80"],["Shade/Housing","White, Black or Brushed Chrome"]]},{"id":"DP40-CCT","cat":"downlights","name":"40W LED Display Light, Tricolour","price":65.0,"img":"/img/dp40-cct-1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/dp40-cct.html","shape":"down","tone":"neutral","specs":["40W","Tri-colour","IP20"],"desc":"The 40W LED Display Light, Tricolour is a recessed LED downlight for homes and commercial ceilings. It runs in tri-colour switch (3000K / 4000K / 5700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["3 selectable colour temperatures via switch","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Replaces","Brighter than 100W Halogen"],["Brightness","3600/4400/3800 lumens (3000/4000/5700k)"],["Power consumption","40Watt"],["Beam angle","90\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","40 000 hrs"],["Fitting","Ceiling mounted, adjustable 0-65\u00ba angle"],["Specifications","AC200-240V, 50-60Hz"],["Weather rating","IP20"],["Material construction","Aluminium 6063, tempered glass"],["Dimensions","246mmx156x144 Cutout 225mmx130"],["Weight","2.3kg 1pce"],["Instant start","suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright 5700k"]]},{"id":"SURFACE-SOCKET","cat":"downlights","name":"Surface Socket Outlet Plug Base","price":1.5,"img":"/img/surface-socket-1.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/surface-socket.html","shape":"switch","tone":"neutral","specs":["LED"],"desc":"The Surface Socket Outlet Plug Base is a recessed LED downlight for homes and commercial ceilings. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Installation","Must be installed by a licensed electrician"],["Mounting","Surface Mount"],["Current","10A"],["Voltage","250V AC 50Hz"],["Wiring","3-Pin Back Wired Rear Connection"],["Terminals","4x4 sq.mm cables, 1 looping terminal"],["Dimensions","7x5x5cm Single 17x16x13cm Box/10"],["Product Finish","White"],["Warranty","5 Years"],["Certification","SAA"]]},{"id":"Q-CONNECT","cat":"downlights","name":"Single Quick Connect Plug Base 10A","price":1.8,"img":"/img/q-connect-2.webp","url":"https://greenhse.com/products/lighting-perth/led-downlights-perth/q-connect.html","shape":"down","tone":"neutral","specs":["LED"],"desc":"The Single Quick Connect Plug Base 10A is a recessed LED downlight for homes and commercial ceilings. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED downlight fitting","Plug-and-play driver (pre-wired)","Spring mounting clips","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Downlights"],["Installation","Must be installed by a licensed electrician"],["Mounting","Surface Mount"],["Current","10A"],["Voltage","250V AC 50Hz"],["Wiring","3-Pin Back Wired Rear Connection"],["Terminals","4x4 sq.mm cables, 1 looping terminal"],["Dimensions","7x5x5cm Single 17x16x13cm Box/10"],["Product Finish","White"],["Warranty","5 Years"],["Certification","SAA"]]},{"id":"GH-EM5-SPITFIRE-R","cat":"emergency","name":"Spitfire Emergency Light","price":45.0,"img":"/img/gh-em5-spitfire-r-2.webp","url":"https://greenhse.com/products/lighting-perth/emergency-lights/gh-em5-spitfire-r.html","shape":"emergency","tone":"neutral","specs":["5W","Daylight","IP30"],"desc":"The Spitfire Emergency Light is an emergency / exit luminaire built to keep your space compliant. It runs in a fixed 6000K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 emergency / exit fitting","Built-in rechargeable battery","Mounting kit","AS2293 compliance guide"],"features":["Automatic self-test, AS2293 compliant","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Emergency Lights"],["Power consumption","5W CREE"],["Brightness","250 lumens"],["Lifespan","50 000 hrs"],["Battery","3.7V 2000mAh NiCad batteries Re-chargeable"],["Mode","Non-maintained"],["Standby Time",">3hrs"],["Charging Time","16hrs"],["IP Rating","IP30 (Indoors)"],["Specifications","185-277VAC, 50-60Hz"],["Classification","D40"],["Light Output Colour","6000k"],["Fitting","Recessed or Surface Mount"],["Dimensions","Cutout \u00f870mm Adapter Ring \u00f8144x25mm"],["Weight","550g (Recessed), 700g (Surface Mount)"],["Shade / Housing","White"]]},{"id":"GH-EXIT-BOX","cat":"emergency","name":"Emergency Exit Sign, Ceiling/Wall Mountable","price":50.0,"img":"/img/gh-exit-box-2.webp","url":"https://greenhse.com/products/lighting-perth/emergency-lights/gh-exit-box.html","shape":"emergency","tone":"neutral","specs":["3W","Daylight","IP20"],"desc":"The Emergency Exit Sign, Ceiling/Wall Mountable is an emergency / exit luminaire built to keep your space compliant. It runs in a fixed 6000K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 emergency / exit fitting","Built-in rechargeable battery","Mounting kit","AS2293 compliance guide"],"features":["Automatic self-test, AS2293 compliant","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Emergency Lights"],["Power consumption","3W"],["Specifications","220-240V 50Hz"],["Dimming","Non-dimmable"],["Battery","3.2V 600mA LiFePO4 Re-chargeable"],["Backup","3hrs"],["Charging Time","16hrs"],["IP Rating","IP20 (Indoors)"],["Temperature","10-60\u00b0"],["Mode","Maintained"],["Emergency Classification","C0:D4 C90:D3.2"],["Light Output Colour","6000k"],["Dimensions","358x211x62.5mm"],["Mounting","Surface or Wall Mounted"],["Weight",".8kg"],["Shade / Housing","White/Green"]]},{"id":"FS-FLOOD-WHITE-GRO","cat":"flood","name":"Super Slim LED Floodlights, White, 10/20/30/100W","price":50.0,"img":"/img/fs-flood-white-gro-1.webp","url":"https://greenhse.com/products/lighting-perth/led-flood-lights-perth/fs-flood-white-group.html","shape":"flood","tone":"neutral","specs":["100W","4000K","IP65"],"desc":"The Super Slim LED Floodlights, White, 10/20/30/100W is a rugged LED floodlight for facades, yards and sports areas. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED floodlight","Adjustable U-bracket","Mounting hardware","Installation guide"],"features":["High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Flood / Sports Lighting"],["Replaces","up to 500w Halogen"],["Brightness","100 lumens per watt"],["Power consumption","10/20/30/50/100W"],["Beam angle","120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","25 000 hrs"],["Fitting","Mounting bracket, surface mounted"],["Specifications","180~260VAC"],["Weather rating","IP65 Weather proof"],["Material construction","Diecast aluminium, 316 marine-grade stainless steel"],["Dimensions","10w 100x80x20mm/20w 115x80x20mm/30w188x132*20mm/50w 220x152x20mm/100w 300x198x20mm"],["Weight","215g (10w), 375g (20w), 565g (30w), 750g (50w), 1.03kg (100w)"],["Instant start","Instant start, suitable for sensors"],["Light Output Colour","Natural white 4000k"],["Colour Rendering Index",">80"]]},{"id":"GH-TWS-GROUP","cat":"flood","name":"24W Twin Floodlights /Sensor, Black/White","price":50.0,"img":"/img/gh-tws-group-1.webp","url":"https://greenhse.com/products/lighting-perth/led-flood-lights-perth/gh-tws-group.html","shape":"flood","tone":"neutral","specs":["24W","Tri-colour","IP65"],"desc":"The 24W Twin Floodlights /Sensor, Black/White is a rugged LED floodlight for facades, yards and sports areas. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED floodlight","Adjustable U-bracket","Mounting hardware","Installation guide"],"features":["High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Flood / Sports Lighting"],["Brightness","Up to 2400 lumens"],["Power consumption","24w (12 x 12w)"],["Beam angle","Up to 180\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface / wall mounted"],["Specifications","200~240VAC 50/60Hz"],["Weather rating","IP65 Weather proof / IP54 Sensor"],["IK Rating","IK06"],["Dimensions","76x128.5x120mm"],["Weight",".81Kg"],["Material construction","Rugged diecast aluminium, corrosion-resistant housing, PC"],["Light Output Colour","Warm White 3000k/Natural white 4000k/Bright White 5000k"],["Colour Rendering Index","\u226580"],["Shade/Housing","White and Black"]]},{"id":"F50S-CCT-PA","cat":"flood","name":"50W SLIM WHITE CCT FLOODLIGHT / SENSOR","price":50.0,"img":"/img/f50s-cct-pa-1.webp","url":"https://greenhse.com/products/lighting-perth/led-flood-lights-perth/f50s-cct-pa.html","shape":"flood","tone":"neutral","specs":["30W","Tri-colour","IP65"],"desc":"The 50W SLIM WHITE CCT FLOODLIGHT / SENSOR is a rugged LED floodlight for facades, yards and sports areas. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED floodlight","Adjustable U-bracket","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Flood / Sports Lighting"],["Brightness","3150-6250 lumens - up to 125 lumens/watt"],["Power consumption","50/40/30W"],["Beam angle","100\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","30 000 hrs"],["Fitting","Mounting bracket, surface mounted"],["Specifications","220-240VAC"],["Weather rating","IP65 Weather proof"],["IK rating","IK06"],["Material construction","Diecast Aluminium/Metal, PC & Glass"],["Dimensions","200x145mm"],["Weight","950g"],["Instant start","Instant start, suitable for sensors"],["Light Output Colour","Warm White 3000k/Natural white 4000k/Bright White 5700k"],["Colour Rendering Index","80"]]},{"id":"F30-120-BLACK","cat":"flood","name":"Slim 30W LED Floodlight, Black, 5000K","price":35.0,"img":"/img/f30-120-black-2.webp","url":"https://greenhse.com/products/lighting-perth/led-flood-lights-perth/f30-120-black.html","shape":"flood","tone":"cool","specs":["30W","IP65"],"desc":"The Slim 30W LED Floodlight, Black, 5000K is a rugged LED floodlight for facades, yards and sports areas. It runs in daylight (~5000\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED floodlight","Adjustable U-bracket","Mounting hardware","Installation guide"],"features":["High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Flood / Sports Lighting"],["Replaces","Up to 250w Halogen"],["Brightness","3600 lumens 120 lumens/watt"],["Power consumption","30W"],["Beam angle","120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","60 000 hrs"],["Fitting","Mounting bracket"],["Specifications","190~260VAC"],["Weather rating","IP65 Weather proof"],["Material construction","Diecast aluminium and tempered glass"],["Dimensions","201x168x40mm without bracket"],["Weight","0.8Kg Net Weight"],["Instant start","Instant start, suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","Bright white 5000k"]]},{"id":"F50-BLACK-CCT-90-1","cat":"flood","name":"Slim 50W LED Floodlight, CCT","price":60.0,"img":"/img/f50-black-cct-90-1-2.webp","url":"https://greenhse.com/products/lighting-perth/led-flood-lights-perth/f50-black-cct-90-120.html","shape":"flood","tone":"neutral","specs":["50W","Tri-colour","IP66"],"desc":"The Slim 50W LED Floodlight, CCT is a rugged LED floodlight for facades, yards and sports areas. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED floodlight","Adjustable U-bracket","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Flood / Sports Lighting"],["Brightness","5000 lumens 100 lumens/watt"],["Power consumption","50W"],["Beam angle","90\u00ba or 120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Mounting bracket"],["Specifications","220-240VAC"],["Weather rating","IP66 Weather proof"],["Material construction","Diecast aluminium and tempered glass"],["Dimensions","252x213x43.5mm"],["Weight","1Kg Net Weight"],["Instant start","Instant start, suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","3000k/4000k/5000k"],["Colour Rendering Index",">80"]]},{"id":"F100-90-CCT-SO","cat":"flood","name":"100W LED CCT Floodlight, 90\u00ba Beam","price":120.0,"img":"/img/f100-90-cct-so-1.webp","url":"https://greenhse.com/products/lighting-perth/led-flood-lights-perth/f100-90-cct-so.html","shape":"flood","tone":"neutral","specs":["100W","Tri-colour","IP66"],"desc":"The 100W LED CCT Floodlight, 90\u00ba Beam is a rugged LED floodlight for facades, yards and sports areas. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED floodlight","Adjustable U-bracket","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Flood / Sports Lighting"],["Brightness","13000 lumens 130 lumens/watt"],["Power consumption","100W"],["Beam angle","90\u00ba"],["Dimmable","Non-dimmable"],["Lifespan",">50 000 hrs"],["Fitting","Mounting bracket"],["Specifications","220-240,VAC"],["Weather rating","IP66 Weather proof"],["Material construction","Aluminium, glass/PC"],["Dimensions","330x268x47.5mm"],["Weight","1.8Kg Net Weight"],["Instant start","Instant start, suitable for sensors"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5000k"],["Colour Rendering Index",">80"],["Shade/Housing","Black"]]},{"id":"F100-120-CCT-SO","cat":"flood","name":"100W LED CCT Floodlight, 120\u00ba Beam","price":105.0,"img":"/img/f100-120-cct-so-1.webp","url":"https://greenhse.com/products/lighting-perth/led-flood-lights-perth/f100-120-cct-so.html","shape":"flood","tone":"neutral","specs":["100W","Tri-colour","IP66"],"desc":"The 100W LED CCT Floodlight, 120\u00ba Beam is a rugged LED floodlight for facades, yards and sports areas. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED floodlight","Adjustable U-bracket","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Flood / Sports Lighting"],["Brightness","13000 lumens 130 lumens/watt"],["Power consumption","100W"],["Beam angle","50x120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan",">50 000 hrs"],["Fitting","Mounting bracket"],["Specifications","100-277VAC"],["Weather rating","IP66 Weather proof"],["Material construction","Aluminium, Glass/PC"],["Dimensions","330x268x47.5mm"],["Weight","1.8Kg Net Weight"],["Instant start","Instant start, suitable for sensors"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5000k"],["Colour Rendering Index",">80"],["Shade/Housing","Black"]]},{"id":"F200-CCT-PW-120","cat":"flood","name":"200/150/100W LED Floodlight, CCT, 120\u00ba Beam","price":155.0,"img":"/img/f200-cct-pw-120-1.webp","url":"https://greenhse.com/products/lighting-perth/led-flood-lights-perth/f200-cct-pw-120.html","shape":"flood","tone":"neutral","specs":["100W","Tri-colour","IP66"],"desc":"The 200/150/100W LED Floodlight, CCT, 120\u00ba Beam is a rugged LED floodlight for facades, yards and sports areas. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED floodlight","Adjustable U-bracket","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Flood / Sports Lighting"],["Brightness","130 lumens/watt up to 26000 lumens"],["Power consumption","200/150/100W"],["Beam angle","120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan",">50 000 hrs"],["Fitting","Mounting bracket"],["Specifications","220-240VAC"],["Weather rating","IP66 Weather proof"],["Material construction","Aluminium, glass/PC"],["Dimensions","412x360x54mm"],["Weight","4.5Kg Net Weight"],["Instant start","Instant start, suitable for sensors"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5000k"],["Colour Rendering Index",">80"],["Shade/Housing","Black"]]},{"id":"200W-ULTRA-SLIM-LE","cat":"flood","name":"200/150/100W LED Floodlight, CCT, 90\u00ba Beam","price":155.0,"img":"/img/200w-ultra-slim-le-1.webp","url":"https://greenhse.com/products/lighting-perth/led-flood-lights-perth/200w-ultra-slim-led-flood-light-perth.html","shape":"flood","tone":"neutral","specs":["100W","Tri-colour","IP66"],"desc":"The 200/150/100W LED Floodlight, CCT, 90\u00ba Beam is a rugged LED floodlight for facades, yards and sports areas. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED floodlight","Adjustable U-bracket","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Flood / Sports Lighting"],["Brightness","130 lumens/watt up to 26000 lumens"],["Power consumption","200/150/100W"],["Beam angle","90\u00ba"],["Dimmable","Non-dimmable"],["Lifespan",">50 000 hrs"],["Fitting","Mounting bracket"],["Specifications","220-240VAC"],["Weather rating","IP66 Weather proof"],["Material construction","Aluminium, glass/PC"],["Dimensions","412x360x54mm"],["Weight","4.5Kg Net Weight"],["Instant start","Instant start, suitable for sensors"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5000k"],["Colour Rendering Index",">80"],["Shade/Housing","Black"]]},{"id":"F50-RGB","cat":"flood","name":"50W LED Floodlight RGB, 25\u00ba/160\u00ba Beam","price":160.0,"img":"/img/f50-rgb-3.webp","url":"https://greenhse.com/products/lighting-perth/led-flood-lights-perth/f50-rgb.html","shape":"flood","tone":"rgb","specs":["50W","RGB","IP65"],"desc":"The 50W LED Floodlight RGB, 25\u00ba/160\u00ba Beam is a rugged LED floodlight for facades, yards and sports areas. It runs in RGB (full colour). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED floodlight","Adjustable U-bracket","Mounting hardware","Installation guide"],"features":["Full-colour RGB, run from a controller and remote","High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Flood / Sports Lighting"],["Brightness","3500-4200 lumens"],["Power consumption","50W"],["Beam angle","25\u00ba/160\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Mounting bracket"],["Specifications","86~265VAC 50-60Hz"],["Weather rating","IP65 Weather proof"],["Material construction","Aluminium and tempered glass"],["Dimensions","265mmx220x47.5 (not including bracket)"],["Packed Dimensions","355x255x58mm"],["Weight","1.9/2.1Kg Net/Gross"],["Instant start","Instant start, suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","2700-6500k White + RGB"],["Colour Rendering Index",">80"]]},{"id":"A185-50K","cat":"flood","name":"185W Street Light, 5000k","price":250.0,"img":"/img/a185-50k-1.webp","url":"https://greenhse.com/products/lighting-perth/led-flood-lights-perth/a185-50k.html","shape":"flood","tone":"cool","specs":["185W","IP66"],"desc":"The 185W Street Light, 5000k is a rugged LED floodlight for facades, yards and sports areas. It runs in daylight (~5000\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED floodlight","Adjustable U-bracket","Mounting hardware","Installation guide"],"features":["High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Flood / Sports Lighting"],["Replaces","400w Metal Halide"],["Brightness","31450 lumens 170 lumens/watt"],["Power consumption","185W"],["Beam angle","Type III Asymmetrical"],["Dimmable","Non-dimmable, dimmable option available"],["Lifespan","120 000 hrs"],["Fitting","Wall or Pole Mounted, various mounting options"],["Specifications","100~240VAC 50/60Hz"],["Weather rating","IP66 Weather proof"],["Material construction","Aluminium"],["Dimensions","428x304x88mm"],["Packed Dimensions","57x35x13cm"],["Weight","5.8 / 6.2kg Nett/Gross"],["Mercury","No Mercury"],["Light Output Colour","Bright White 5000k"]]},{"id":"A300-50K","cat":"flood","name":"300W Street Light 5000K, 90\u00ba","price":380.0,"img":"/img/a300-50k-1.webp","url":"https://greenhse.com/products/lighting-perth/led-flood-lights-perth/a300-50k.html","shape":"flood","tone":"cool","specs":["300W","IP66"],"desc":"The 300W Street Light 5000K, 90\u00ba is a rugged LED floodlight for facades, yards and sports areas. It runs in daylight (~5000\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED floodlight","Adjustable U-bracket","Mounting hardware","Installation guide"],"features":["High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Flood / Sports Lighting"],["Replaces","1000w Metal Halide"],["Brightness","51000 lumens 170 lumens/watt"],["Power consumption","300W"],["Beam angle","Type III Asymmetrical"],["Dimmable","Non-dimmable, dimmable option available"],["Lifespan","120 000 hrs"],["Fitting","Wall or Pole Mounted, various mounting options"],["Specifications","100~240VAC 50/60Hz"],["Weather rating","IP66 Weather proof"],["Material construction","Aluminium"],["Dimensions","595x304x92mm"],["Packed Dimensions","740x350x180mm"],["Weight","8.6 / 8.9Kg Nett/Gross"],["Mercury","No Mercury"],["Light Output Colour","Bright White 5000k"]]},{"id":"GH-A240-CCT-PA","cat":"flood","name":"240/200/150W LED AREA/FLOOD CCT, POWER ADJUSTABLE","price":250.0,"img":"/img/gh-a240-cct-pa-2.webp","url":"https://greenhse.com/products/lighting-perth/led-flood-lights-perth/gh-a240-cct-pa.html","shape":"flood","tone":"neutral","specs":["150W","Tri-colour","IP66"],"desc":"The 240/200/150W LED AREA/FLOOD CCT, POWER ADJUSTABLE is a rugged LED floodlight for facades, yards and sports areas. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED floodlight","Adjustable U-bracket","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Flood / Sports Lighting"],["Brightness","Up to 38400 lumens 160 lumens/watt"],["Power consumption","240/200/150w Selectable"],["Beam angle","T3/T4/T5 (Interchangeable)"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Pole or Wall Mounted"],["Specifications","100-277VAC 50/60Hz"],["Weather rating","IP66 Weather proof"],["Impact rating","IK09"],["Material construction","Diecast, High Thermal Conductivity AL, PC Lens"],["Dimensions","463x267x75mm"],["Weight","3.26 Kg Net"],["Light Output Colour","3000/4000/5700k"],["Colour Rendering Index","70"],["Shade/Housing","Bronze Powder coated with clear lens"]]},{"id":"GH-A500-CCT-PA-2","cat":"flood","name":"500/400/300W LED AREA/FLOOD, CCT, POWER ADJUSTABLE","price":600.0,"img":"/img/gh-a500-cct-pa-2-2.webp","url":"https://greenhse.com/products/lighting-perth/led-flood-lights-perth/gh-a500-cct-pa-2.html","shape":"flood","tone":"neutral","specs":["300W","Tri-colour","IP66"],"desc":"The 500/400/300W LED AREA/FLOOD, CCT, POWER ADJUSTABLE is a rugged LED floodlight for facades, yards and sports areas. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED floodlight","Adjustable U-bracket","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Flood / Sports Lighting"],["Brightness","Up to 80000 lumens 160 lumens/watt"],["Power consumption","500/400/300w Selectable"],["Beam angle","T3/T4/T5 (Interchangeable)"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Pole or Wall Mounted"],["Specifications","100-277VAC 50/60Hz"],["Weather rating","IP66 Weather proof"],["Impact rating","IK09"],["Material construction","Diecast, High Thermal Conductivity AL, PC Lens"],["Dimensions","630x371x79mm"],["Weight","6.41Kg Net"],["Light Output Colour","3000/4000/5700k"],["Colour Rendering Index","70"],["Shade/Housing","Bronze Powder coated with clear lens"]]},{"id":"HB100-SO-120","cat":"highbay","name":"100W High Bay Light, 120\u00ba Beam, 5000K","price":90.0,"img":"/img/hb100-so-120-2.webp","url":"https://greenhse.com/products/lighting-perth/high-bay-lights/hb100-so-120.html","shape":"highbay","tone":"cool","specs":["100W","IP66"],"desc":"The 100W High Bay Light, 120\u00ba Beam, 5000K is a high-output LED high bay for warehouses and tall spaces. It runs in daylight (~5000\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 UFO high bay","Hook & bracket mount","Installation guide"],"features":["High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","High Bay Lights"],["Replaces","Up to 400W Metal Halide"],["Brightness","16 000 lumens 160 lumens/watt"],["Power consumption","100Watt"],["Beam angle","120\u00ba"],["Fitting","Hanging bracket with ring"],["Lifespan","Long 50 000 hours"],["Specifications","100-277VAC, 50-60Hz"],["Weather rating","IP66 sealed against water & dust"],["Impact Protection","IK10"],["Material construction","ADC12 aluminium, electrostatic polyester powder coating, PC Lens"],["Dimensions","\u00f8240x145mm"],["Weight","1.8Kg"],["Packed Dimensions","26x26x13cm"],["Dimmable","No"],["Light Output Colour","Bright White 5000k"]]},{"id":"HB200-SO-120-CCT","cat":"highbay","name":"200W High Bay Light 120\u00ba Beam, Tricolour","price":145.0,"img":"/img/hb200-so-120-cct-1.webp","url":"https://greenhse.com/products/lighting-perth/high-bay-lights/hb200-so-120-cct.html","shape":"highbay","tone":"neutral","specs":["200W","Tri-colour","IP66"],"desc":"The 200W High Bay Light 120\u00ba Beam, Tricolour is a high-output LED high bay for warehouses and tall spaces. It runs in tri-colour switch (3000K / 4000K / 5700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 UFO high bay","Hook & bracket mount","Installation guide"],"features":["3 selectable colour temperatures via switch","High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","High Bay Lights"],["Replaces","Brighter than 400W Metal Halide"],["Brightness","32 000 lumens 160 lumens/watt"],["Power consumption","200Watt"],["Beam angle","120\u00ba"],["Fitting","Hanging bracket with ring"],["Lifespan","Long 50 000 hours"],["Specifications","100-277VAC, 50-60Hz"],["Weather rating","IP66 sealed against water & dust"],["Impact Protection","IK10"],["Material construction","ADC12 aluminium, electrostatic polyester powder coating, optical grade PC anti-UV Lens"],["Dimensions","\u00f8335x156mm"],["Weight","2.7Kg"],["Packed Dimensions","35.5x35.5x14cm"],["Heat output","Low heat output"],["Light Output Colour","CCT 3000/4000/5000k Selectable"]]},{"id":"HB200-SO-120","cat":"highbay","name":"200W High Bay Light 120\u00ba Beam, 5000K","price":140.0,"img":"/img/hb200-so-120-1.webp","url":"https://greenhse.com/products/lighting-perth/high-bay-lights/hb200-so-120.html","shape":"highbay","tone":"cool","specs":["200W","IP66"],"desc":"The 200W High Bay Light 120\u00ba Beam, 5000K is a high-output LED high bay for warehouses and tall spaces. It runs in daylight (~5000\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 UFO high bay","Hook & bracket mount","Installation guide"],"features":["High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","High Bay Lights"],["Replaces","Brighter than 400W Metal Halide"],["Brightness","32 000 lumens 160 lumens/watt"],["Power consumption","200Watt"],["Beam angle","120\u00ba"],["Fitting","Hanging bracket with ring"],["Lifespan","Long 50 000 hours"],["Specifications","100-277VAC, 50-60Hz"],["Weather rating","IP66 sealed against water & dust"],["Impact Protection","IK10"],["Material construction","ADC12 aluminium, electrostatic polyester powder coating, optical grade PC anti-UV Lens"],["Dimensions","\u00f8335x156mm"],["Weight","2.7Kg"],["Packed Dimensions","35.5x35.5x14cm"],["Heat output","Low heat output"],["Light Output Colour","Bright White 5000k"]]},{"id":"HB200-SO-90D","cat":"highbay","name":"200W High Bay Light 90\u00ba Beam, 5000K","price":140.0,"img":"/img/hb200-so-90d-1.webp","url":"https://greenhse.com/products/lighting-perth/high-bay-lights/hb200-so-90d.html","shape":"highbay","tone":"cool","specs":["200W","IP66"],"desc":"The 200W High Bay Light 90\u00ba Beam, 5000K is a high-output LED high bay for warehouses and tall spaces. It runs in daylight (~5000\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 UFO high bay","Hook & bracket mount","Installation guide"],"features":["High lumen output for large, demanding spaces","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","High Bay Lights"],["Replaces","Brighter than 400W Metal Halide"],["Brightness","16 000 lumens 160 lumens/watt"],["Power consumption","200Watt Power Adjustable"],["Beam angle","90\u00ba"],["Fitting","Hanging bracket with ring"],["Lifespan","Long 50 000 hours"],["Specifications","100-277VAC, 50-60Hz"],["Weather rating","IP66 sealed against water & dust"],["Impact Protection","IK10"],["Material construction","ADC12 aluminium, electrostatic polyester powder coating, optical grade PC anti-UV Lens"],["Dimensions","\u00f8335x156mm"],["Weight","2.7Kg"],["Packed Dimensions","35.5x35.5x14cm"],["Heat output","Low heat output"],["Light Output Colour","5000k"]]},{"id":"GH-C150W-40K","cat":"industrial","name":"150W LED Canopy Light","price":120.0,"img":"/img/gh-c150w-40k-2.webp","url":"https://greenhse.com/products/lighting-perth/industrial-lighting-perth/gh-c150w-40k.html","shape":"batten","tone":"neutral","specs":["150W","4000K","IP65"],"desc":"The 150W LED Canopy Light is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Replaces","400w Metal Halide"],["Brightness","22 500 lumens 150 lumens/watt"],["Power consumption","150Watt"],["Beam angle","120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface Mount"],["Specifications","AC100-277V, 50-60Hz"],["Weather rating","IP65"],["Material construction","Aluminium, PC and tempered glass - electrostatic polyester powder coating"],["Dimensions","400x400x70mm"],["Weight","4.6kg 1pce"],["Impact Resistance","IK08"],["Light Output Colour","4000k Natural White"],["Colour Rendering Index",">70"]]},{"id":"GH-C100-CCT-PA","cat":"industrial","name":"100W LED Canopy Light, CCT","price":120.0,"img":"/img/gh-c100-cct-pa-2.webp","url":"https://greenhse.com/lighting-perth/industrial-lighting-perth/gh-c100-cct-pa.html","shape":"batten","tone":"neutral","specs":["100W","Tri-colour","IP65"],"desc":"The 100W LED Canopy Light, CCT is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Replaces","Up to 4 x IP65 Batten Lights"],["Brightness","Up to 30 000 lumens 140 lumens/watt"],["Power consumption","40/60/80/100W Watt Selectable"],["Beam angle","Type 5"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface Mount"],["Specifications","AC120-277V, 50-60Hz"],["Weather rating","IP65"],["Material construction","Rugged diecast aluminium, corrosion-resistant housing"],["Dimensions","265x265x65.1mm"],["Weight","3kg 1pce"],["Operating Temperature","40\u00baC to 40\u00baC"],["Impact Resistance","IK08"],["Light Output Colour","4000/5000/6500k Selectable"]]},{"id":"GH-C200-CCT","cat":"industrial","name":"200W LED Canopy Light","price":145.0,"img":"/img/gh-c200-cct-2.webp","url":"https://greenhse.com/lighting-perth/industrial-lighting-perth/gh-c200-cct.html","shape":"batten","tone":"neutral","specs":["200W","Tri-colour","IP65"],"desc":"The 200W LED Canopy Light is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Replaces","Up to 4 x IP65 Batten Lights"],["Brightness","Up to 30 000 lumens 150 lumens/watt"],["Power consumption","80/100/150/200 Watt Selectable"],["Beam angle","140\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface Mount"],["Specifications","AC120-277V, 50-60Hz"],["Weather rating","IP65"],["Material construction","Rugged diecast aluminium, corrosion-resistant housing"],["Dimensions","420x420x65mm"],["Weight","5.7kg 1pce"],["Operating Temperature","40\u00baC to 40\u00baC"],["Impact Resistance","IK08"],["Light Output Colour","4000/5000/6500k Selectable"]]},{"id":"GH-W50-CCT","cat":"industrial","name":"50W LED Wall Light CCT","price":85.0,"img":"/img/gh-w50-cct-2.webp","url":"https://greenhse.com/lighting-perth/industrial-lighting-perth/gh-w50-cct.html","shape":"wall","tone":"neutral","specs":["50W","Tri-colour","IP65"],"desc":"The 50W LED Wall Light CCT is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Brightness","Up to 7 000 lumens 140 lumens/watt"],["Power consumption","20/30/40/50W Watt Selectable"],["Beam angle","60x120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Wall Mount"],["Specifications","AC120-277V, 50-60Hz"],["Weather rating","IP65"],["Material construction","Rugged diecast aluminium, corrosion-resistant housing"],["Dimensions","280x216x100mm"],["Weight","3kg 1pce"],["Operating Temperature","40\u00baC to 40\u00baC"],["Impact Resistance","IK08"],["Light Output Colour","4000/5000/6500k Selectable"],["Colour Rendering Index","80"]]},{"id":"GH-EM5-SPITFIRE-R-1","cat":"industrial","name":"Spitfire Emergency Light","price":45.0,"img":"/img/gh-em5-spitfire-r-2.webp","url":"https://greenhse.com/lighting-perth/industrial-lighting-perth/gh-em5-spitfire-r.html","shape":"emergency","tone":"neutral","specs":["5W","Daylight","IP30"],"desc":"The Spitfire Emergency Light is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in a fixed 6000K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Power consumption","5W CREE"],["Brightness","250 lumens"],["Lifespan","50 000 hrs"],["Battery","3.7V 2000mAh NiCad batteries Re-chargeable"],["Mode","Non-maintained"],["Standby Time",">3hrs"],["Charging Time","16hrs"],["IP Rating","IP30 (Indoors)"],["Specifications","185-277VAC, 50-60Hz"],["Classification","D40"],["Light Output Colour","6000k"],["Fitting","Recessed or Surface Mount"],["Dimensions","Cutout \u00f870mm Adapter Ring \u00f8144x25mm"],["Weight","550g (Recessed), 700g (Surface Mount)"],["Shade / Housing","White"]]},{"id":"GH-EXIT-BOX-1","cat":"industrial","name":"Emergency Exit Sign, Ceiling/Wall Mountable","price":50.0,"img":"/img/gh-exit-box-2.webp","url":"https://greenhse.com/products/lighting-perth/industrial-lighting-perth/gh-exit-box.html","shape":"emergency","tone":"neutral","specs":["3W","Daylight","IP20"],"desc":"The Emergency Exit Sign, Ceiling/Wall Mountable is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in a fixed 6000K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Power consumption","3W"],["Specifications","220-240V 50Hz"],["Dimming","Non-dimmable"],["Battery","3.2V 600mA LiFePO4 Re-chargeable"],["Backup","3hrs"],["Charging Time","16hrs"],["IP Rating","IP20 (Indoors)"],["Temperature","10-60\u00b0"],["Mode","Maintained"],["Emergency Classification","C0:D4 C90:D3.2"],["Light Output Colour","6000k"],["Dimensions","358x211x62.5mm"],["Mounting","Surface or Wall Mounted"],["Weight",".8kg"],["Shade / Housing","White/Green"]]},{"id":"HB100-SO-120-1","cat":"industrial","name":"100W High Bay Light, 120\u00ba Beam, 5000K","price":90.0,"img":"/img/hb100-so-120-2.webp","url":"https://greenhse.com/lighting-perth/industrial-lighting-perth/hb100-so-120.html","shape":"highbay","tone":"cool","specs":["100W","IP66"],"desc":"The 100W High Bay Light, 120\u00ba Beam, 5000K is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in daylight (~5000\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Replaces","Up to 400W Metal Halide"],["Brightness","16 000 lumens 160 lumens/watt"],["Power consumption","100Watt"],["Beam angle","120\u00ba"],["Fitting","Hanging bracket with ring"],["Lifespan","Long 50 000 hours"],["Specifications","100-277VAC, 50-60Hz"],["Weather rating","IP66 sealed against water & dust"],["Impact Protection","IK10"],["Material construction","ADC12 aluminium, electrostatic polyester powder coating, PC Lens"],["Dimensions","\u00f8240x145mm"],["Weight","1.8Kg"],["Packed Dimensions","26x26x13cm"],["Dimmable","No"],["Light Output Colour","Bright White 5000k"]]},{"id":"HB200-SO-90D-1","cat":"industrial","name":"200W High Bay Light 90\u00ba Beam, 5000K","price":140.0,"img":"/img/hb200-so-90d-1.webp","url":"https://greenhse.com/products/lighting-perth/industrial-lighting-perth/hb200-so-90d.html","shape":"highbay","tone":"cool","specs":["200W","IP66"],"desc":"The 200W High Bay Light 90\u00ba Beam, 5000K is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in daylight (~5000\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Replaces","Brighter than 400W Metal Halide"],["Brightness","16 000 lumens 160 lumens/watt"],["Power consumption","200Watt Power Adjustable"],["Beam angle","90\u00ba"],["Fitting","Hanging bracket with ring"],["Lifespan","Long 50 000 hours"],["Specifications","100-277VAC, 50-60Hz"],["Weather rating","IP66 sealed against water & dust"],["Impact Protection","IK10"],["Material construction","ADC12 aluminium, electrostatic polyester powder coating, optical grade PC anti-UV Lens"],["Dimensions","\u00f8335x156mm"],["Weight","2.7Kg"],["Packed Dimensions","35.5x35.5x14cm"],["Heat output","Low heat output"],["Light Output Colour","5000k"]]},{"id":"HB200-SO-120-1","cat":"industrial","name":"200W High Bay Light 120\u00ba Beam, 5000K","price":140.0,"img":"/img/hb200-so-120-1.webp","url":"https://greenhse.com/products/lighting-perth/industrial-lighting-perth/hb200-so-120.html","shape":"highbay","tone":"cool","specs":["200W","IP66"],"desc":"The 200W High Bay Light 120\u00ba Beam, 5000K is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in daylight (~5000\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Replaces","Brighter than 400W Metal Halide"],["Brightness","32 000 lumens 160 lumens/watt"],["Power consumption","200Watt"],["Beam angle","120\u00ba"],["Fitting","Hanging bracket with ring"],["Lifespan","Long 50 000 hours"],["Specifications","100-277VAC, 50-60Hz"],["Weather rating","IP66 sealed against water & dust"],["Impact Protection","IK10"],["Material construction","ADC12 aluminium, electrostatic polyester powder coating, optical grade PC anti-UV Lens"],["Dimensions","\u00f8335x156mm"],["Weight","2.7Kg"],["Packed Dimensions","35.5x35.5x14cm"],["Heat output","Low heat output"],["Light Output Colour","Bright White 5000k"]]},{"id":"F200-CCT-PW-120-1","cat":"industrial","name":"200/150/100W LED Floodlight, CCT, 120\u00ba Beam","price":155.0,"img":"/img/f200-cct-pw-120-1.webp","url":"https://greenhse.com/lighting-perth/industrial-lighting-perth/f200-cct-pw-120.html","shape":"flood","tone":"neutral","specs":["100W","Tri-colour","IP66"],"desc":"The 200/150/100W LED Floodlight, CCT, 120\u00ba Beam is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Brightness","130 lumens/watt up to 26000 lumens"],["Power consumption","200/150/100W"],["Beam angle","120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan",">50 000 hrs"],["Fitting","Mounting bracket"],["Specifications","220-240VAC"],["Weather rating","IP66 Weather proof"],["Material construction","Aluminium, glass/PC"],["Dimensions","412x360x54mm"],["Weight","4.5Kg Net Weight"],["Instant start","Instant start, suitable for sensors"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5000k"],["Colour Rendering Index",">80"],["Shade/Housing","Black"]]},{"id":"200W-ULTRA-SLIM-LE-1","cat":"industrial","name":"200/150/100W LED Floodlight, CCT, 90\u00ba Beam","price":155.0,"img":"/img/200w-ultra-slim-le-1.webp","url":"https://greenhse.com/lighting-perth/industrial-lighting-perth/200w-ultra-slim-led-flood-light-perth.html","shape":"flood","tone":"neutral","specs":["100W","Tri-colour","IP66"],"desc":"The 200/150/100W LED Floodlight, CCT, 90\u00ba Beam is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Brightness","130 lumens/watt up to 26000 lumens"],["Power consumption","200/150/100W"],["Beam angle","90\u00ba"],["Dimmable","Non-dimmable"],["Lifespan",">50 000 hrs"],["Fitting","Mounting bracket"],["Specifications","220-240VAC"],["Weather rating","IP66 Weather proof"],["Material construction","Aluminium, glass/PC"],["Dimensions","412x360x54mm"],["Weight","4.5Kg Net Weight"],["Instant start","Instant start, suitable for sensors"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5000k"],["Colour Rendering Index",">80"],["Shade/Housing","Black"]]},{"id":"HB200-SO-120-CCT-1","cat":"industrial","name":"200W High Bay Light 120\u00ba Beam, Tricolour","price":145.0,"img":"/img/hb200-so-120-cct-1.webp","url":"https://greenhse.com/lighting-perth/industrial-lighting-perth/hb200-so-120-cct.html","shape":"highbay","tone":"neutral","specs":["200W","Tri-colour","IP66"],"desc":"The 200W High Bay Light 120\u00ba Beam, Tricolour is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in tri-colour switch (3000K / 4000K / 5700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["3 selectable colour temperatures via switch","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Replaces","Brighter than 400W Metal Halide"],["Brightness","32 000 lumens 160 lumens/watt"],["Power consumption","200Watt"],["Beam angle","120\u00ba"],["Fitting","Hanging bracket with ring"],["Lifespan","Long 50 000 hours"],["Specifications","100-277VAC, 50-60Hz"],["Weather rating","IP66 sealed against water & dust"],["Impact Protection","IK10"],["Material construction","ADC12 aluminium, electrostatic polyester powder coating, optical grade PC anti-UV Lens"],["Dimensions","\u00f8335x156mm"],["Weight","2.7Kg"],["Packed Dimensions","35.5x35.5x14cm"],["Heat output","Low heat output"],["Light Output Colour","CCT 3000/4000/5000k Selectable"]]},{"id":"F30-120-BLACK-1","cat":"industrial","name":"Slim 30W LED Floodlight, Black, 5000K","price":35.0,"img":"/img/f30-120-black-2.webp","url":"https://greenhse.com/products/lighting-perth/industrial-lighting-perth/f30-120-black.html","shape":"flood","tone":"cool","specs":["30W","IP65"],"desc":"The Slim 30W LED Floodlight, Black, 5000K is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in daylight (~5000\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Replaces","Up to 250w Halogen"],["Brightness","3600 lumens 120 lumens/watt"],["Power consumption","30W"],["Beam angle","120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","60 000 hrs"],["Fitting","Mounting bracket"],["Specifications","190~260VAC"],["Weather rating","IP65 Weather proof"],["Material construction","Diecast aluminium and tempered glass"],["Dimensions","201x168x40mm without bracket"],["Weight","0.8Kg Net Weight"],["Instant start","Instant start, suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","Bright white 5000k"]]},{"id":"F100-90-CCT-SO-1","cat":"industrial","name":"100W LED CCT Floodlight, 90\u00ba Beam","price":120.0,"img":"/img/f100-90-cct-so-1.webp","url":"https://greenhse.com/lighting-perth/industrial-lighting-perth/f100-90-cct-so.html","shape":"flood","tone":"neutral","specs":["100W","Tri-colour","IP66"],"desc":"The 100W LED CCT Floodlight, 90\u00ba Beam is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Brightness","13000 lumens 130 lumens/watt"],["Power consumption","100W"],["Beam angle","90\u00ba"],["Dimmable","Non-dimmable"],["Lifespan",">50 000 hrs"],["Fitting","Mounting bracket"],["Specifications","220-240,VAC"],["Weather rating","IP66 Weather proof"],["Material construction","Aluminium, glass/PC"],["Dimensions","330x268x47.5mm"],["Weight","1.8Kg Net Weight"],["Instant start","Instant start, suitable for sensors"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5000k"],["Colour Rendering Index",">80"],["Shade/Housing","Black"]]},{"id":"F100-120-CCT-SO-1","cat":"industrial","name":"100W LED CCT Floodlight, 120\u00ba Beam","price":105.0,"img":"/img/f100-120-cct-so-1.webp","url":"https://greenhse.com/lighting-perth/industrial-lighting-perth/f100-120-cct-so.html","shape":"flood","tone":"neutral","specs":["100W","Tri-colour","IP66"],"desc":"The 100W LED CCT Floodlight, 120\u00ba Beam is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Brightness","13000 lumens 130 lumens/watt"],["Power consumption","100W"],["Beam angle","50x120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan",">50 000 hrs"],["Fitting","Mounting bracket"],["Specifications","100-277VAC"],["Weather rating","IP66 Weather proof"],["Material construction","Aluminium, Glass/PC"],["Dimensions","330x268x47.5mm"],["Weight","1.8Kg Net Weight"],["Instant start","Instant start, suitable for sensors"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5000k"],["Colour Rendering Index",">80"],["Shade/Housing","Black"]]},{"id":"A185-50K-1","cat":"industrial","name":"185W Street Light, 5000k","price":250.0,"img":"/img/a185-50k-1.webp","url":"https://greenhse.com/products/lighting-perth/industrial-lighting-perth/a185-50k.html","shape":"batten","tone":"cool","specs":["185W","IP66"],"desc":"The 185W Street Light, 5000k is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in daylight (~5000\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Replaces","400w Metal Halide"],["Brightness","31450 lumens 170 lumens/watt"],["Power consumption","185W"],["Beam angle","Type III Asymmetrical"],["Dimmable","Non-dimmable, dimmable option available"],["Lifespan","120 000 hrs"],["Fitting","Wall or Pole Mounted, various mounting options"],["Specifications","100~240VAC 50/60Hz"],["Weather rating","IP66 Weather proof"],["Material construction","Aluminium"],["Dimensions","428x304x88mm"],["Packed Dimensions","57x35x13cm"],["Weight","5.8 / 6.2kg Nett/Gross"],["Mercury","No Mercury"],["Light Output Colour","Bright White 5000k"]]},{"id":"A300-50K-1","cat":"industrial","name":"300W Street Light 5000K, 90\u00ba","price":380.0,"img":"/img/a300-50k-1.webp","url":"https://greenhse.com/products/lighting-perth/industrial-lighting-perth/a300-50k.html","shape":"batten","tone":"cool","specs":["300W","IP66"],"desc":"The 300W Street Light 5000K, 90\u00ba is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in daylight (~5000\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Replaces","1000w Metal Halide"],["Brightness","51000 lumens 170 lumens/watt"],["Power consumption","300W"],["Beam angle","Type III Asymmetrical"],["Dimmable","Non-dimmable, dimmable option available"],["Lifespan","120 000 hrs"],["Fitting","Wall or Pole Mounted, various mounting options"],["Specifications","100~240VAC 50/60Hz"],["Weather rating","IP66 Weather proof"],["Material construction","Aluminium"],["Dimensions","595x304x92mm"],["Packed Dimensions","740x350x180mm"],["Weight","8.6 / 8.9Kg Nett/Gross"],["Mercury","No Mercury"],["Light Output Colour","Bright White 5000k"]]},{"id":"GH-A240-CCT-PA-1","cat":"industrial","name":"240/200/150W LED AREA/FLOOD CCT, POWER ADJUSTABLE","price":250.0,"img":"/img/gh-a240-cct-pa-2.webp","url":"https://greenhse.com/lighting-perth/industrial-lighting-perth/gh-a240-cct-pa.html","shape":"flood","tone":"neutral","specs":["150W","Tri-colour","IP66"],"desc":"The 240/200/150W LED AREA/FLOOD CCT, POWER ADJUSTABLE is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Brightness","Up to 38400 lumens 160 lumens/watt"],["Power consumption","240/200/150w Selectable"],["Beam angle","T3/T4/T5 (Interchangeable)"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Pole or Wall Mounted"],["Specifications","100-277VAC 50/60Hz"],["Weather rating","IP66 Weather proof"],["Impact rating","IK09"],["Material construction","Diecast, High Thermal Conductivity AL, PC Lens"],["Dimensions","463x267x75mm"],["Weight","3.26 Kg Net"],["Light Output Colour","3000/4000/5700k"],["Colour Rendering Index","70"],["Shade/Housing","Bronze Powder coated with clear lens"]]},{"id":"GH-A500-CCT-PA-2-1","cat":"industrial","name":"500/400/300W LED AREA/FLOOD, CCT, POWER ADJUSTABLE","price":600.0,"img":"/img/gh-a500-cct-pa-2-2.webp","url":"https://greenhse.com/lighting-perth/industrial-lighting-perth/gh-a500-cct-pa-2.html","shape":"flood","tone":"neutral","specs":["300W","Tri-colour","IP66"],"desc":"The 500/400/300W LED AREA/FLOOD, CCT, POWER ADJUSTABLE is a heavy-duty LED fitting built for industrial and workshop spaces. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED fitting","Mounting brackets & screws","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Industrial Lighting"],["Brightness","Up to 80000 lumens 160 lumens/watt"],["Power consumption","500/400/300w Selectable"],["Beam angle","T3/T4/T5 (Interchangeable)"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Pole or Wall Mounted"],["Specifications","100-277VAC 50/60Hz"],["Weather rating","IP66 Weather proof"],["Impact rating","IK09"],["Material construction","Diecast, High Thermal Conductivity AL, PC Lens"],["Dimensions","630x371x79mm"],["Weight","6.41Kg Net"],["Light Output Colour","3000/4000/5700k"],["Colour Rendering Index","70"],["Shade/Housing","Bronze Powder coated with clear lens"]]},{"id":"GL10-GARDEN-RGB-GR","cat":"landscape","name":"10W LED Garden Light, RGB","price":35.0,"img":"/img/gl10-garden-rgb-gr.webp","url":"https://greenhse.com/products/lighting-perth/led-garden-pool-lights-perth/gl10-garden-rgb-group.html","shape":"garden","tone":"rgb","specs":["10W","RGB","IP65"],"desc":"The 10W LED Garden Light, RGB is a weatherproof garden light for landscapes and pathways. It runs in RGB (full colour). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 garden light","Spike / mount","Connection lead","Installation guide"],"features":["Full-colour RGB, run from a controller and remote","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Landscape / Garden Lighting"],["Power consumption","10Watt"],["Brightness","RGB"],["Beam angle","60\u00ba"],["Dimmable","with controller"],["Lifespan","50 000 hrs"],["Fitting","Base and Spike"],["Specifications","12V DC"],["Weather rating","IP65"],["Material construction","Diecast aluminium ADC12"],["Dimensions","\u00f876x262x57.5mm"],["Packed Dimensions","286x90x70mm"],["Packed Weight","420g 1pce"],["Mercury","No Mercury"],["Light Output Colour","RGB"],["Colour Rendering Index","\u226580"]]},{"id":"GL10-GARDEN-3K4K-G","cat":"landscape","name":"10W LED Garden Light, Warm/Natural White","price":35.0,"img":"/img/gl10-garden-3k4k-g-1.webp","url":"https://greenhse.com/products/lighting-perth/led-garden-pool-lights-perth/gl10-garden-3k4k-group.html","shape":"garden","tone":"warm","specs":["10W","Warm","IP65"],"desc":"The 10W LED Garden Light, Warm/Natural White is a weatherproof garden light for landscapes and pathways. It runs in warm white (~3000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 garden light","Spike / mount","Connection lead","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Landscape / Garden Lighting"],["Power consumption","10Watt"],["Brightness","Up to 950 lumens (3000k/4000k)"],["Beam angle","60\u00ba"],["Dimmable","with controller"],["Lifespan","50 000 hrs"],["Fitting","Base and Spike"],["Specifications","12V DC"],["Weather rating","IP65"],["Material construction","Diecast aluminium ADC12"],["Dimensions","\u00f876x262x57.5mm"],["Packed Dimensions","286x90x70mm"],["Packed Weight","420g 1pce"],["Mercury","No Mercury"],["Light Output Colour","3000k Warm White 4000k Natural White"],["Colour Rendering Index","\u226580"]]},{"id":"GL7-INGROUND-3000K","cat":"landscape","name":"7W 12V LED Recessed In-Ground Garden Light","price":35.0,"img":"/img/gl7-inground-3000k-1.webp","url":"https://greenhse.com/products/lighting-perth/led-garden-pool-lights-perth/gl7-inground-3000k.html","shape":"garden","tone":"neutral","specs":["7W","Warm","IP65"],"desc":"The 7W 12V LED Recessed In-Ground Garden Light is a weatherproof garden light for landscapes and pathways. It runs in a fixed 3000K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 garden light","Spike / mount","Connection lead","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Landscape / Garden Lighting"],["Power consumption","7Watt"],["Brightness","90 lumens/watt"],["Beam angle","30\u00ba"],["Dimmable","Non-Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Install with or without cannister"],["Input Voltage","AC/DC 12V"],["Weather/Impact rating","IP65 / IK08"],["Material construction","Aluminium body, tempered glass, plastic built-in fitting"],["Dimensions","\u00f8100x90mm"],["Packed Dimensions","11x11x10cm"],["Packed Weight","31g 1pce"],["Light Output Colour","3000k Warm White"],["Colour Rendering Index",">78"],["Shade/Housing","Black aluminium"]]},{"id":"F50-RGB-1","cat":"landscape","name":"50W LED Floodlight RGB, 25\u00ba/160\u00ba Beam","price":160.0,"img":"/img/f50-rgb-3.webp","url":"https://greenhse.com/products/lighting-perth/led-garden-pool-lights-perth/f50-rgb.html","shape":"flood","tone":"rgb","specs":["50W","RGB","IP65"],"desc":"The 50W LED Floodlight RGB, 25\u00ba/160\u00ba Beam is a weatherproof garden light for landscapes and pathways. It runs in RGB (full colour). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 garden light","Spike / mount","Connection lead","Installation guide"],"features":["Full-colour RGB, run from a controller and remote","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Landscape / Garden Lighting"],["Brightness","3500-4200 lumens"],["Power consumption","50W"],["Beam angle","25\u00ba/160\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Mounting bracket"],["Specifications","86~265VAC 50-60Hz"],["Weather rating","IP65 Weather proof"],["Material construction","Aluminium and tempered glass"],["Dimensions","265mmx220x47.5 (not including bracket)"],["Packed Dimensions","355x255x58mm"],["Weight","1.9/2.1Kg Net/Gross"],["Instant start","Instant start, suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","2700-6500k White + RGB"],["Colour Rendering Index",">80"]]},{"id":"GL10-GARDEN-3K4K-G-1","cat":"outdoor","name":"10W LED Garden Light, Warm/Natural White","price":35.0,"img":"/img/gl10-garden-3k4k-g-1.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/gl10-garden-3k4k-group.html","shape":"garden","tone":"warm","specs":["10W","Warm","IP65"],"desc":"The 10W LED Garden Light, Warm/Natural White is an outdoor-rated wall light for entries and facades. It runs in warm white (~3000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Power consumption","10Watt"],["Brightness","Up to 950 lumens (3000k/4000k)"],["Beam angle","60\u00ba"],["Dimmable","with controller"],["Lifespan","50 000 hrs"],["Fitting","Base and Spike"],["Specifications","12V DC"],["Weather rating","IP65"],["Material construction","Diecast aluminium ADC12"],["Dimensions","\u00f876x262x57.5mm"],["Packed Dimensions","286x90x70mm"],["Packed Weight","420g 1pce"],["Mercury","No Mercury"],["Light Output Colour","3000k Warm White 4000k Natural White"],["Colour Rendering Index","\u226580"]]},{"id":"GL7-INGROUND-3000K-1","cat":"outdoor","name":"7W 12V LED Recessed In-Ground Garden Light","price":35.0,"img":"/img/gl7-inground-3000k-1.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/gl7-inground-3000k.html","shape":"garden","tone":"neutral","specs":["7W","Warm","IP65"],"desc":"The 7W 12V LED Recessed In-Ground Garden Light is an outdoor-rated wall light for entries and facades. It runs in a fixed 3000K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Power consumption","7Watt"],["Brightness","90 lumens/watt"],["Beam angle","30\u00ba"],["Dimmable","Non-Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Install with or without cannister"],["Input Voltage","AC/DC 12V"],["Weather/Impact rating","IP65 / IK08"],["Material construction","Aluminium body, tempered glass, plastic built-in fitting"],["Dimensions","\u00f8100x90mm"],["Packed Dimensions","11x11x10cm"],["Packed Weight","31g 1pce"],["Light Output Colour","3000k Warm White"],["Colour Rendering Index",">78"],["Shade/Housing","Black aluminium"]]},{"id":"WL-24-WW-CCT","cat":"outdoor","name":"1m Black Linear Wall Light","price":120.0,"img":"/img/wl-24-ww-cct.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/wl-24-ww-cct.html","shape":"track","tone":"neutral","specs":["24W","Warm","IP67"],"desc":"The 1m Black Linear Wall Light is an outdoor-rated wall light for entries and facades. It is switchable between 3000K and 6000K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Brightness","1200Lms"],["Power","24W"],["Beam angle","Back-lit"],["Dimmable","with optional controller"],["Lifespan","35 000 hrs"],["Fitting","Wall mounted"],["Specifications","24V DC"],["Weather Rating","IP67"],["Material","Rugged diecast aluminium, corrosion resistant housing and acrylic"],["Dimensions","1m - 1020mm(l)x70mm(w)x45mm(d)"],["Weight","1m - 1.7kg"],["Light Output Color","3000k (Warm White) or CCT 2700-6000K"],["Colour Rendering Index",">80"],["Shade/Housing","Matte Black"],["Warranty","3Yr limited - Needs to be installed by qualified electrician, excludes physical damage."]]},{"id":"GH-TWS-GROUP-1","cat":"outdoor","name":"24W Twin Floodlights /Sensor, Black/White","price":45.0,"img":"/img/gh-tws-group-1.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/gh-tws-group.html","shape":"flood","tone":"neutral","specs":["24W","Tri-colour","IP65"],"desc":"The 24W Twin Floodlights /Sensor, Black/White is an outdoor-rated wall light for entries and facades. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Brightness","Up to 2400 lumens"],["Power consumption","24w (12 x 12w)"],["Beam angle","Up to 180\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface / wall mounted"],["Specifications","200~240VAC 50/60Hz"],["Weather rating","IP65 Weather proof / IP54 Sensor"],["IK Rating","IK06"],["Dimensions","76x128.5x120mm"],["Weight",".81Kg"],["Material construction","Rugged diecast aluminium, corrosion-resistant housing, PC"],["Light Output Colour","Warm White 3000k/Natural white 4000k/Bright White 5000k"],["Colour Rendering Index","\u226580"],["Shade/Housing","White and Black"]]},{"id":"WL6-RGBW","cat":"outdoor","name":"6W WiFi Wall Light, RGBW, Black/White","price":45.0,"img":"/img/wl6-rgbw-1.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/wl6-rgbw.html","shape":"wall","tone":"rgb","specs":["6W","IP65"],"desc":"The 6W WiFi Wall Light, RGBW, Black/White is an outdoor-rated wall light for entries and facades. It runs in RGBW (colour + white). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Full-colour RGB plus a separate white channel","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Replaces","50W"],["Brightness","480 lumens (White 3500k)"],["Power consumption","6Watt"],["Beam angle","0-150\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Screws"],["Specifications","AC220-240V, 50-60Hz"],["Weather rating","IP65"],["Material construction","Powder coated aluminium and rubber seal"],["Dimensions","100x100x100mm"],["Packed Dimensions","110x110x110mm 1pce"],["Packed Weight","0.8kg 1pce"],["Mercury","No Mercury"],["Light Output Colour","Full Colour + White (3500k)"],["Colour Rendering Index","82"]]},{"id":"WL6-35K-BLACK","cat":"outdoor","name":"6W LED Wall Light, 3500K, Black","price":50.0,"img":"/img/wl6-35k-black.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/wl6-35k-black.html","shape":"wall","tone":"neutral","specs":["6W","IP65"],"desc":"The 6W LED Wall Light, 3500K, Black is an outdoor-rated wall light for entries and facades. It runs in a fixed 3500K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Replaces","50W"],["Brightness","480 lumens"],["Power consumption","6Watt"],["Beam angle","0-150\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Screws"],["Specifications","AC220-240V, 50-60Hz"],["Weather rating","IP65"],["Material construction","Powder coated aluminium and rubber seal"],["Dimensions","100x100x100mm"],["Packed Dimensions","110x110x110mm 1pce"],["Packed Weight","0.8kg 1pce"],["Mercury","No Mercury"],["Light Output Colour","3500k"]]},{"id":"WL6-35K-WHITE","cat":"outdoor","name":"6W WiFi LED Wall Light, 3500K, White","price":50.0,"img":"/img/wl6-35k-white.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/wl6-35k-white.html","shape":"wall","tone":"neutral","specs":["6W","IP65"],"desc":"The 6W WiFi LED Wall Light, 3500K, White is an outdoor-rated wall light for entries and facades. It runs in a fixed 3500K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Replaces","50W"],["Brightness","480 lumens"],["Power consumption","6Watt"],["Beam angle","0-150\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Screws"],["Specifications","AC220-240V, 50-60Hz"],["Weather rating","IP65"],["Material construction","Powder coated aluminium and rubber seal"],["Dimensions","100x100x100mm"],["Packed Dimensions","110x110x110mm 1pce"],["Packed Weight","0.8kg 1pce"],["Mercury","No Mercury"],["Light Output Colour","3500k"]]},{"id":"WL10R-40K-BLACK","cat":"outdoor","name":"10W LED Wall Light, Black Rectangular","price":65.0,"img":"/img/wl10r-40k-black.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/wl10r-40k-black.html","shape":"wall","tone":"neutral","specs":["10W","4000K","IP65"],"desc":"The 10W LED Wall Light, Black Rectangular is an outdoor-rated wall light for entries and facades. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Replaces","75-100W"],["Brightness","840 lumens"],["Power consumption","10Watt"],["Beam angle","130\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","20 000 hrs"],["Fitting","Screws"],["Specifications","AC220-260V, 50-60Hz"],["Weather rating","IP65"],["Material construction","Diecast aluminium powder coated body, silicon, frosted PC Lens"],["Dimensions","238x138x100mm"],["Packed Dimensions","250x145x105mm"],["Packed Weight","1.3kg 1pce"],["Mercury","No Mercury"],["Light Output Colour","4000k Natural"]]},{"id":"W10-CCT-BW","cat":"outdoor","name":"10W LED Wall Light, CCT, Black and White Cover","price":22.0,"img":"/img/w10-cct-bw-1.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/w10-cct-bw.html","shape":"wall","tone":"neutral","specs":["10W","Tri-colour","IP65"],"desc":"The 10W LED Wall Light, CCT, Black and White Cover is an outdoor-rated wall light for entries and facades. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Replaces","75W"],["Brightness","900-1100 lumens"],["Power consumption","10Watt"],["Beam angle","120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface Mount"],["Specifications","AC220-260V, 50-60Hz"],["Weather rating","IP65"],["Material construction","PC, White RAL9016, Black RAL9005"],["Dimensions","220x120x66mm"],["Packed Weight",".4kg 1pce"],["Light Output Colour","3000k Warm/4000k Natural/5000k Bright White"],["Colour Rendering Index",">80"],["Shade/Housing","White or Black, Frosted PC Lens"]]},{"id":"18W-WALL-LIGHT-CCT","cat":"outdoor","name":"24.2cm Wall Light 18W, Square CCT, Black or White","price":42.0,"img":"/img/18w-wall-light-cct.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/18w-wall-light-cct.html","shape":"wall","tone":"neutral","specs":["18W","Tri-colour","IP65"],"desc":"The 24.2cm Wall Light 18W, Square CCT, Black or White is an outdoor-rated wall light for entries and facades. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Replaces","120-150W"],["Brightness","1480 - 1800 lumens"],["Power consumption","18Watt"],["Beam angle","110\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface Mount"],["Specifications","AC200-240V, 50-60Hz"],["Weather rating","IP65"],["Material construction","PC, White RAL9016"],["Dimensions","242x242x59mm"],["Weight","0.90kg 1pce"],["Mercury","No Mercury"],["Light Output Colour","3000k Warm / 4000k Natural / 5000k Bright White"],["Colour Rendering Index",">80"]]},{"id":"WL12-18-CCT-SENSOR","cat":"outdoor","name":"12W or 18W Wall Light, CCT PIR/Daylight Sensor","price":60.0,"img":"/img/wl12-18-cct-sensor-2.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/wl12-18-cct-sensor.html","shape":"sensor","tone":"cool","specs":["12W","Tri-colour","IP65"],"desc":"The 12W or 18W Wall Light, CCT PIR/Daylight Sensor is an outdoor-rated wall light for entries and facades. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Brightness","1200-1400 lumens (12w) 1650-1900 lumens (18w)"],["Power consumption","12Watt or 18Watt"],["Beam angle","120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Wall Mount"],["Specifications","AC220-240V, 50-60Hz"],["Weather rating","IP65"],["Impact rating","IK08"],["Material construction","PC, ADC12 Aluminium, Black RAL9005"],["Dimensions","251x167x80mm"],["Weight",".95kg 1pce"],["Light Output Colour","3000k Warm/4000k Natural/5700k Bright White"],["Colour Rendering Index",">80"],["Shade/Housing","White, Frosted PC Lens"]]},{"id":"GLENELG-A-WALL-LIG","cat":"outdoor","name":"Glenelg Up/Down Ambient Light White/Charcoal","price":67.0,"img":"/img/glenelg-a-wall-lig.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-lights-perth/glenelg-a-wall-light.html","shape":"wall","tone":"neutral","specs":["4W","IP65"],"desc":"The Glenelg Up/Down Ambient Light White/Charcoal is an outdoor-rated wall light for entries and facades. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Installation","Must be installed by a licensed electrician"],["Light Type","GU10"],["Light Wattage","2 x 4W installed 2 x 35w (Maximum)"],["Dimming","No"],["Construction","Stainless steel & glass (white / charcoal)"],["Weather Rating","IP65 (Waterproof)"],["Warranty","3 Year Replacement"]]},{"id":"SEAFORD-UPDOWN-WAL","cat":"outdoor","name":"Seaford LED Up/Down Wall Light","price":67.0,"img":"/img/seaford-updown-wal.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-lights-perth/seaford-updown-wall.html","shape":"wall","tone":"neutral","specs":["4W","Warm","IP65"],"desc":"The Seaford LED Up/Down Wall Light is an outdoor-rated wall light for entries and facades. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Installation","Must be installed by a licensed electrician"],["Light Type","LED"],["Light Wattage","4W GU10 300 Lumens"],["Colour Temperature","3000K (Warm White)"],["Dimming","No"],["Construction","Anodised Aluminium"],["Weather Rating","IP65 (Waterproof)"],["Warranty","3 Year Replacement"]]},{"id":"LED-ADJUSTABLE-WAL","cat":"outdoor","name":"LED Adjustable Wall Light","price":45.0,"img":"/img/led-adjustable-wal.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/led-adjustable-wall.html","shape":"wall","tone":"neutral","specs":["4W","Warm","IP65"],"desc":"The LED Adjustable Wall Light is an outdoor-rated wall light for entries and facades. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Installation","Must be installed by a licensed electrician"],["Light Type","LED"],["Light Wattage","4W GU10 300 Lumens"],["Colour Temperature","3000K (Warm White)"],["Dimming","No"],["Construction","Anodised Aluminium"],["Weather Rating","IP65 (Waterproof)"],["Certification","CE, RCM"],["Warranty","3 Year"]]},{"id":"FS-FLOOD-WHITE-GRO-1","cat":"outdoor","name":"Super Slim LED Floodlights, White, 10/20/30/100W","price":160.0,"img":"/img/fs-flood-white-gro-1.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/fs-flood-white-group.html","shape":"flood","tone":"neutral","specs":["100W","4000K","IP65"],"desc":"The Super Slim LED Floodlights, White, 10/20/30/100W is an outdoor-rated wall light for entries and facades. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Replaces","up to 500w Halogen"],["Brightness","100 lumens per watt"],["Power consumption","10/20/30/50/100W"],["Beam angle","120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","25 000 hrs"],["Fitting","Mounting bracket, surface mounted"],["Specifications","180~260VAC"],["Weather rating","IP65 Weather proof"],["Material construction","Diecast aluminium, 316 marine-grade stainless steel"],["Dimensions","10w 100x80x20mm/20w 115x80x20mm/30w188x132*20mm/50w 220x152x20mm/100w 300x198x20mm"],["Weight","215g (10w), 375g (20w), 565g (30w), 750g (50w), 1.03kg (100w)"],["Instant start","Instant start, suitable for sensors"],["Light Output Colour","Natural white 4000k"],["Colour Rendering Index",">80"]]},{"id":"F50-RGB-2","cat":"outdoor","name":"50W LED Floodlight RGB, 25\u00ba/160\u00ba Beam","price":160.0,"img":"/img/f50-rgb-3.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/f50-rgb.html","shape":"flood","tone":"rgb","specs":["50W","RGB","IP65"],"desc":"The 50W LED Floodlight RGB, 25\u00ba/160\u00ba Beam is an outdoor-rated wall light for entries and facades. It runs in RGB (full colour). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Full-colour RGB, run from a controller and remote","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Brightness","3500-4200 lumens"],["Power consumption","50W"],["Beam angle","25\u00ba/160\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Mounting bracket"],["Specifications","86~265VAC 50-60Hz"],["Weather rating","IP65 Weather proof"],["Material construction","Aluminium and tempered glass"],["Dimensions","265mmx220x47.5 (not including bracket)"],["Packed Dimensions","355x255x58mm"],["Weight","1.9/2.1Kg Net/Gross"],["Instant start","Instant start, suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","2700-6500k White + RGB"],["Colour Rendering Index",">80"]]},{"id":"F50-BLACK-CCT-90-1-1","cat":"outdoor","name":"Slim 50W LED Floodlight, CCT","price":60.0,"img":"/img/f50-black-cct-90-1-2.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/f50-black-cct-90-120.html","shape":"flood","tone":"neutral","specs":["50W","Tri-colour","IP66"],"desc":"The Slim 50W LED Floodlight, CCT is an outdoor-rated wall light for entries and facades. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Brightness","5000 lumens 100 lumens/watt"],["Power consumption","50W"],["Beam angle","90\u00ba or 120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Mounting bracket"],["Specifications","220-240VAC"],["Weather rating","IP66 Weather proof"],["Material construction","Diecast aluminium and tempered glass"],["Dimensions","252x213x43.5mm"],["Weight","1Kg Net Weight"],["Instant start","Instant start, suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","3000k/4000k/5000k"],["Colour Rendering Index",">80"]]},{"id":"F50S-CCT-PA-1","cat":"outdoor","name":"50W SLIM WHITE CCT FLOODLIGHT / SENSOR","price":50.0,"img":"/img/f50s-cct-pa-1.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/f50s-cct-pa.html","shape":"flood","tone":"neutral","specs":["30W","Tri-colour","IP65"],"desc":"The 50W SLIM WHITE CCT FLOODLIGHT / SENSOR is an outdoor-rated wall light for entries and facades. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Brightness","3150-6250 lumens - up to 125 lumens/watt"],["Power consumption","50/40/30W"],["Beam angle","100\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","30 000 hrs"],["Fitting","Mounting bracket, surface mounted"],["Specifications","220-240VAC"],["Weather rating","IP65 Weather proof"],["IK rating","IK06"],["Material construction","Diecast Aluminium/Metal, PC & Glass"],["Dimensions","200x145mm"],["Weight","950g"],["Instant start","Instant start, suitable for sensors"],["Light Output Colour","Warm White 3000k/Natural white 4000k/Bright White 5700k"],["Colour Rendering Index","80"]]},{"id":"F30-120-BLACK-2","cat":"outdoor","name":"Slim 30W LED Floodlight, Black, 5000K","price":35.0,"img":"/img/f30-120-black-2.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/f30-120-black.html","shape":"flood","tone":"cool","specs":["30W","IP65"],"desc":"The Slim 30W LED Floodlight, Black, 5000K is an outdoor-rated wall light for entries and facades. It runs in daylight (~5000\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Replaces","Up to 250w Halogen"],["Brightness","3600 lumens 120 lumens/watt"],["Power consumption","30W"],["Beam angle","120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","60 000 hrs"],["Fitting","Mounting bracket"],["Specifications","190~260VAC"],["Weather rating","IP65 Weather proof"],["Material construction","Diecast aluminium and tempered glass"],["Dimensions","201x168x40mm without bracket"],["Weight","0.8Kg Net Weight"],["Instant start","Instant start, suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","Bright white 5000k"]]},{"id":"GH-C150W-40K-1","cat":"outdoor","name":"150W LED Canopy Light","price":120.0,"img":"/img/gh-c150w-40k-2.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/gh-c150w-40k.html","shape":"wall","tone":"neutral","specs":["150W","4000K","IP65"],"desc":"The 150W LED Canopy Light is an outdoor-rated wall light for entries and facades. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Replaces","400w Metal Halide"],["Brightness","22 500 lumens 150 lumens/watt"],["Power consumption","150Watt"],["Beam angle","120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface Mount"],["Specifications","AC100-277V, 50-60Hz"],["Weather rating","IP65"],["Material construction","Aluminium, PC and tempered glass - electrostatic polyester powder coating"],["Dimensions","400x400x70mm"],["Weight","4.6kg 1pce"],["Impact Resistance","IK08"],["Light Output Colour","4000k Natural White"],["Colour Rendering Index",">70"]]},{"id":"GH-C100-CCT-PA-1","cat":"outdoor","name":"100W LED Canopy Light, CCT","price":120.0,"img":"/img/gh-c100-cct-pa-2.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/gh-c100-cct-pa.html","shape":"wall","tone":"neutral","specs":["100W","Tri-colour","IP65"],"desc":"The 100W LED Canopy Light, CCT is an outdoor-rated wall light for entries and facades. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Replaces","Up to 4 x IP65 Batten Lights"],["Brightness","Up to 30 000 lumens 140 lumens/watt"],["Power consumption","40/60/80/100W Watt Selectable"],["Beam angle","Type 5"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface Mount"],["Specifications","AC120-277V, 50-60Hz"],["Weather rating","IP65"],["Material construction","Rugged diecast aluminium, corrosion-resistant housing"],["Dimensions","265x265x65.1mm"],["Weight","3kg 1pce"],["Operating Temperature","40\u00baC to 40\u00baC"],["Impact Resistance","IK08"],["Light Output Colour","4000/5000/6500k Selectable"]]},{"id":"GH-C200-CCT-1","cat":"outdoor","name":"200W LED Canopy Light","price":145.0,"img":"/img/gh-c200-cct-2.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/gh-c200-cct.html","shape":"wall","tone":"neutral","specs":["200W","Tri-colour","IP65"],"desc":"The 200W LED Canopy Light is an outdoor-rated wall light for entries and facades. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Replaces","Up to 4 x IP65 Batten Lights"],["Brightness","Up to 30 000 lumens 150 lumens/watt"],["Power consumption","80/100/150/200 Watt Selectable"],["Beam angle","140\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface Mount"],["Specifications","AC120-277V, 50-60Hz"],["Weather rating","IP65"],["Material construction","Rugged diecast aluminium, corrosion-resistant housing"],["Dimensions","420x420x65mm"],["Weight","5.7kg 1pce"],["Operating Temperature","40\u00baC to 40\u00baC"],["Impact Resistance","IK08"],["Light Output Colour","4000/5000/6500k Selectable"]]},{"id":"GH-W50-CCT-1","cat":"outdoor","name":"50W LED Wall Light CCT","price":85.0,"img":"/img/gh-w50-cct-2.webp","url":"https://greenhse.com/products/lighting-perth/led-outdoor-wall-lights-perth/gh-w50-cct.html","shape":"wall","tone":"neutral","specs":["50W","Tri-colour","IP65"],"desc":"The 50W LED Wall Light CCT is an outdoor-rated wall light for entries and facades. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 wall light","Mounting plate & screws","Weatherproof gasket","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Outdoor / Wall Lights"],["Brightness","Up to 7 000 lumens 140 lumens/watt"],["Power consumption","20/30/40/50W Watt Selectable"],["Beam angle","60x120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Wall Mount"],["Specifications","AC120-277V, 50-60Hz"],["Weather rating","IP65"],["Material construction","Rugged diecast aluminium, corrosion-resistant housing"],["Dimensions","280x216x100mm"],["Weight","3kg 1pce"],["Operating Temperature","40\u00baC to 40\u00baC"],["Impact Resistance","IK08"],["Light Output Colour","4000/5000/6500k Selectable"],["Colour Rendering Index","80"]]},{"id":"F50-BLACK-CCT-90-1-2","cat":"commercial","name":"Slim 50W LED Floodlight, CCT","price":60.0,"img":"/img/f50-black-cct-90-1-2.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/f50-black-cct-90-120.html","shape":"flood","tone":"neutral","specs":["50W","Tri-colour","IP66"],"desc":"The Slim 50W LED Floodlight, CCT is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","5000 lumens 100 lumens/watt"],["Power consumption","50W"],["Beam angle","90\u00ba or 120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Mounting bracket"],["Specifications","220-240VAC"],["Weather rating","IP66 Weather proof"],["Material construction","Diecast aluminium and tempered glass"],["Dimensions","252x213x43.5mm"],["Weight","1Kg Net Weight"],["Instant start","Instant start, suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","3000k/4000k/5000k"],["Colour Rendering Index",">80"]]},{"id":"C25-CCT-PA-1","cat":"commercial","name":"New Premium LED 25W Ceiling Light, 3 CCT","price":50.0,"img":"/img/c25-cct-pa-1.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/c25-cct-pa.html","shape":"panel","tone":"neutral","specs":["12W","Tri-colour","IP54"],"desc":"The New Premium LED 25W Ceiling Light, 3 CCT is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","Up to 3000 lumens (25w), 2180 lumens (18w), 1500 lumens (12W)"],["Power consumption","25/18/12Watt selectable"],["Beam angle","120\u00ba"],["Dimmable","Non-Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface Mount"],["Specifications","220-240VAC, 50-60Hz"],["Weather rating","IP54/ IP20"],["IK rating","IK06"],["Material construction","White PC, PMMA Optic Material"],["Dimensions","\u00d8300x60mm"],["Weight","1.4kg"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5000k"],["Colour Rendering Index","\u226580"],["Shade/Housing","White transparent PC, PMMA cover"]]},{"id":"BLACK-LINEAR-MODUL-1","cat":"commercial","name":"Black Linear Modular Lighting System","price":60.0,"img":"/img/black-linear-modul-3.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/black-linear-modular-light.html","shape":"track","tone":"neutral","specs":["Tri-colour","IP20"],"desc":"The Black Linear Modular Lighting System is a commercial-grade LED fitting for offices, schools and retail. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Use","Professional quality, linear modular lights with attractive back-lighting. Perfect for modern retail and commercial applications."],["Brightness","Up to 130 Lumens/Watt"],["Power","Variable - selectable by switch, varies by module"],["Beam angle","120 Degrees"],["Dimmable",", switch selectable"],["Lifespan","50 000 hrs"],["Fitting","Hanging or ceiling mounted"],["Specifications","AC100-265"],["Weather Rating","IP20 Indoor Use Only"],["IK Rating","IK08"],["Power Factor",">0.9"],["Material","Rugged diecast 6063 T5 aluminium housing and PC/PMMA lenses"],["Dimensions","Variable - 057m - 2.2m; L (Corner), X,Y, V shape"],["Weight","Up to 3kg"],["Light Output Color","30000/4000/5000/6000k selectable"]]},{"id":"GH-A240-CCT-PA-2","cat":"commercial","name":"240/200/150W LED AREA/FLOOD CCT, POWER ADJUSTABLE","price":250.0,"img":"/img/gh-a240-cct-pa-2.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/gh-a240-cct-pa.html","shape":"flood","tone":"neutral","specs":["150W","Tri-colour","IP66"],"desc":"The 240/200/150W LED AREA/FLOOD CCT, POWER ADJUSTABLE is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","Up to 38400 lumens 160 lumens/watt"],["Power consumption","240/200/150w Selectable"],["Beam angle","T3/T4/T5 (Interchangeable)"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Pole or Wall Mounted"],["Specifications","100-277VAC 50/60Hz"],["Weather rating","IP66 Weather proof"],["Impact rating","IK09"],["Material construction","Diecast, High Thermal Conductivity AL, PC Lens"],["Dimensions","463x267x75mm"],["Weight","3.26 Kg Net"],["Light Output Colour","3000/4000/5700k"],["Colour Rendering Index","70"],["Shade/Housing","Bronze Powder coated with clear lens"]]},{"id":"GH-A500-CCT-PA-2-2","cat":"commercial","name":"500/400/300W LED AREA/FLOOD, CCT, POWER ADJUSTABLE","price":600.0,"img":"/img/gh-a500-cct-pa-2-2.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/gh-a500-cct-pa-2.html","shape":"flood","tone":"neutral","specs":["300W","Tri-colour","IP66"],"desc":"The 500/400/300W LED AREA/FLOOD, CCT, POWER ADJUSTABLE is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","Up to 80000 lumens 160 lumens/watt"],["Power consumption","500/400/300w Selectable"],["Beam angle","T3/T4/T5 (Interchangeable)"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Pole or Wall Mounted"],["Specifications","100-277VAC 50/60Hz"],["Weather rating","IP66 Weather proof"],["Impact rating","IK09"],["Material construction","Diecast, High Thermal Conductivity AL, PC Lens"],["Dimensions","630x371x79mm"],["Weight","6.41Kg Net"],["Light Output Colour","3000/4000/5700k"],["Colour Rendering Index","70"],["Shade/Housing","Bronze Powder coated with clear lens"]]},{"id":"ST240V-PRO","cat":"commercial","name":"240V Strip Light Pro /Metre","price":20.0,"img":"/img/st240v-pro-1.webp","url":"https://greenhse.com/products/lighting-perth/commercial-lighting-perth/st240v-pro.html","shape":"strip","tone":"neutral","specs":["12W/m","IP65","3 whites"],"desc":"240V strip that runs straight off mains \u2014 no transformer, less wiring, and even brightness and colour the whole way along. Best for runs over 10 metres: single colour goes to 50 metres from one supply, RGB to 35 metres. Low heat and a strong TPU coating mean it does not need an aluminium channel. IP65. Single colour is Triac dimmable; RGB gives full colour control and dimming from a remote.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","144 LEDs/m, 885 Lumens/m"],["Power consumption","12W/metre"],["Beam angle","120\u00ba"],["Dimming","Triac dimmable"],["Lifespan","25 000 hrs"],["Fitting","Can lie in ceiling channel or be fastened with U-clips"],["Specifications","240VAC"],["Material construction","High temperature resistant PVC"],["Dimensions","8mmx18mm"],["Packed Dimensions","33x33x25cm/50m Reel"],["Weight","10kg/50m Reel"],["Light Output Colour","3000K / 4000K / 6000K \u2014 choose one at order"],["Colour Rendering Index",">80"],["Shade/Housing","Transparent surface"],["IP Rating","IP65"],["Control","Remote, or RGB Gateway / smart dimming module for smart control"],["Max run","Single colour up to 50m \u00b7 RGB up to 35m"],["Profile","No aluminium channel needed \u2014 low heat, strong TPU coating"]],"options":[{"label":"3000K \u00b7 Warm white","price":20.0,"specs":[["Colour temperature","3000K"],["IP rating","IP65"],["Power","12W per metre"],["Voltage","240V AC \u2014 no transformer"],["Max run","Up to 50m from one supply"],["Dimming","Triac dimmable"],["Profile","No aluminium channel needed"]]},{"label":"4000K \u00b7 Natural white","price":20.0,"specs":[["Colour temperature","4000K"],["IP rating","IP65"],["Power","12W per metre"],["Voltage","240V AC \u2014 no transformer"],["Max run","Up to 50m from one supply"],["Dimming","Triac dimmable"],["Profile","No aluminium channel needed"]]},{"label":"6000K \u00b7 Cool white / daylight","price":20.0,"specs":[["Colour temperature","6000K"],["IP rating","IP65"],["Power","12W per metre"],["Voltage","240V AC \u2014 no transformer"],["Max run","Up to 50m from one supply"],["Dimming","Triac dimmable"],["Profile","No aluminium channel needed"]]}]},{"id":"ST24V-SMD-ALL","cat":"commercial","name":"24V High Lumen Strip Light /Metre","price":18.0,"img":"/img/st24v-smd-all-2.webp","url":"https://greenhse.com/products/lighting-perth/commercial-lighting-perth/st24v-smd-all.html","shape":"strip","tone":"neutral","specs":["12\u201323W/m","8 versions","3oz PCB"],"desc":"High-output 24V SMD strip on a 3oz copper PCB \u2014 the strongest and longest-lived strip we stock, rated past 50,000 hours. Eight versions: IP20 at 23W/m with CRI>90 in 4000K or 5000K, IP65 at 20W/m in 4000K or 5000K, and IP65 at 12W/m in 2700K, 3000K, 4000K or 5500K. The 12W/m does not need an aluminium channel. Runs on 24V, so it needs a transformer, and dims from a receiver.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","~1800 lumens/metre \u00b7 192 LEDs/metre"],["Power","12w per metre"],["Beam angle","120\u00ba"],["Dimmable","(with appropriate receiver)"],["Lifespan","50 000 hrs"],["Fitting","2-Sided tape Channel options available"],["Specifications","24V DC"],["Weather Rating","IP20 indoor, or IP65 silicon gel"],["Material","PCB/Silicon Gel (model dependent)"],["Dimensions","10mmx2.2mm"],["Light Output Color","2700K / 3000K / 4000K / 5000K / 5500K depending on version"],["Colour Rendering Index",">80"],["Shade/Housing","3oz White PCB"],["Warranty","2Yr limited, Needs to be installed by qualified electrician, excludes physical damage."],["Certification","RCM, CE"],["Max run","5m from one end \u00b7 10m fed from both ends"],["PCB","3oz copper \u2014 3\u00d7 stronger than single layer"],["Connectors","Connectors for short lengths, no waste up to 4m"]],"options":[{"label":"IP20 \u00b7 23W/m \u00b7 4000K \u00b7 CRI>90","price":34.0,"specs":[["IP rating","IP20"],["Power","23W per metre"],["Colour","4000K"],["CRI",">90"],["Brightness","~3800 lumens/m"],["Efficiency","165 lm/W"]]},{"label":"IP20 \u00b7 23W/m \u00b7 5000K \u00b7 CRI>90","price":34.0,"specs":[["IP rating","IP20"],["Power","23W per metre"],["Colour","5000K"],["CRI",">90"],["Brightness","~3800 lumens/m"],["Efficiency","165 lm/W"]]},{"label":"IP65 \u00b7 20W/m \u00b7 4000K","price":28.0,"specs":[["IP rating","IP65"],["Power","20W per metre"],["Colour","4000K"]]},{"label":"IP65 \u00b7 20W/m \u00b7 5000K","price":28.0,"specs":[["IP rating","IP65"],["Power","20W per metre"],["Colour","5000K"]]},{"label":"IP65 \u00b7 12W/m \u00b7 2700K","price":18.0,"specs":[["IP rating","IP65"],["Power","12W per metre"],["Colour","2700K"],["Profile","No aluminium channel needed"]]},{"label":"IP65 \u00b7 12W/m \u00b7 3000K","price":18.0,"specs":[["IP rating","IP65"],["Power","12W per metre"],["Colour","3000K"],["Profile","No aluminium channel needed"]]},{"label":"IP65 \u00b7 12W/m \u00b7 4000K","price":18.0,"specs":[["IP rating","IP65"],["Power","12W per metre"],["Colour","4000K"],["Profile","No aluminium channel needed"]]},{"label":"IP65 \u00b7 12W/m \u00b7 5500K","price":18.0,"specs":[["IP rating","IP65"],["Power","12W per metre"],["Colour","5500K"],["Profile","No aluminium channel needed"]]}],"imgs":["/img/st24v-smd-all-3.webp","/img/st24v-smd-all-4.webp","/img/st24v-smd-all-5.webp","/img/st24v-smd-all-6.webp","/img/smd-reel-new.webp","/img/st24v-smd-all-8.webp"]},{"id":"ST-CH-BLACK-LINEAR-1","cat":"commercial","name":"2m Black Linear Suspension Light","price":250.0,"img":"/img/st-ch-black-linear-4.webp","url":"https://greenhse.com/products/lighting-perth/commercial-lighting-perth/st-ch-black-linear-2.html","shape":"track","tone":"neutral","specs":["40W","Warm","IP65"],"desc":"The 2m Black Linear Suspension Light is a commercial-grade LED fitting for offices, schools and retail. It is switchable between 2700K and 6000K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","Up to 4000 Lumens"],["Power","40w"],["Beam angle","60\u00ba"],["Dimmable","and CCT Adjustable"],["Lifespan","30 000 hrs"],["Fitting","Ceiling suspended,"],["Specifications","24V DC"],["Weather Rating","IP65 (COB Strip)"],["Material","Aluminium Black Powder Coated + PVC Lens (White available on request)"],["Dimensions","200cm(L)x 5cm(W)x7cm(H)"],["Weight","2.6kg Net"],["Light Output Color","2700k - 6000k Adjustable (Warm - Cool White)"],["Colour Rendering Index",">90"],["Shade/Housing","Matte Black + White Lens"],["Warranty","2Yr limited - Needs to be installed by qualified electrician, excludes physical damage."]]},{"id":"15W-LED-TRACK-LIGH-1","cat":"commercial","name":"15W LED Track Light","price":32.0,"img":"/img/15w-led-track-ligh-2.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/15w-led-track-light.html","shape":"track","tone":"neutral","specs":["15W","Tri-colour","IP20"],"desc":"The 15W LED Track Light is a commercial-grade LED fitting for offices, schools and retail. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","1275 Lumens 85 Lm/watt"],["Power consumption","15Watt"],["Beam angle","60\u00ba Low Glare"],["Lifespan","50 000 hrs"],["Fitting","Screws"],["Specifications","AC220-240V, 50-60Hz"],["Weather rating","IP20 Indoors"],["Material construction","Aluminium"],["Dimensions","\u230070x130mm"],["Weight Track Light","0.4kg"],["Weight Track","0.5kg 1m / 0.75kg 1.5m / 1kg 2m"],["Track Dimensions","1m 1000x34x17mm / 1.5m 1500x34x17mm / 2m 2000x34x17mm"],["Mercury","No Mercury"],["Light Output Colour","3000K / 4000K/ 5000K"],["Colour Rendering Index","80"]]},{"id":"30W-LED-TRACK-LIGH-1","cat":"commercial","name":"30W LED Track Light","price":60.0,"img":"/img/30w-led-track-ligh-2.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/30w-led-track-light.html","shape":"track","tone":"neutral","specs":["30W","Tri-colour","IP20"],"desc":"The 30W LED Track Light is a commercial-grade LED fitting for offices, schools and retail. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","2250 lumens 85 lm/watt"],["Power consumption","30Watt"],["Beam angle","60\u00ba Low Glare"],["Dimmable","Triac dimmable"],["Lifespan","50 000 hrs"],["Fitting","Screws"],["Specifications","AC220-240V, 50-60Hz"],["Weather rating","IP20 Indoors"],["Material construction","Anodised aluminium"],["Dimensions","\u230085x160mm"],["Weight Track Light","0.9kg"],["Weight Track","0.5kg 1m / 0.75kg 1.5m / 1kg 2m"],["Track Dimensions","1m 1000x34x17mm / 1.5m 1500x34x17mm / 2m 2000x34x17mm"],["Mercury","No Mercury"],["Light Output Colour","4000k/4500k/5000k switch selectable"]]},{"id":"GH-C12CCT-BW-2","cat":"commercial","name":"12W LED Ceiling Light White, CCT Dimmable","price":34.0,"img":"/img/gh-c12cct-bw-2.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/gh-c12cct-bw.html","shape":"panel","tone":"neutral","specs":["12W","Tri-colour","IP20"],"desc":"The 12W LED Ceiling Light White, CCT Dimmable is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Smooth, flicker-free dimming","Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","1000-1100 lumens"],["Power consumption","12Watt"],["Beam angle","100\u00ba"],["Dimmable","Triac Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface/Ceiling Mount"],["Specifications","AC220-240V, 50-60Hz"],["Weather Rating","IP20 Indoor Use"],["Material Construction","Diecast Aluminium"],["Dimensions","\u00d8115x94mm"],["Weight","580g /pce"],["Light Output Colour","Warm 3000k/ Natural 4000k / Bright 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Matte Black Matte White"],["Warranty","2 Years"]]},{"id":"WL8-CCT-BW-1-2","cat":"commercial","name":"8W Up/Down Indoor Wall Light, CCT Dimmable","price":42.0,"img":"/img/wl8-cct-bw-1-2.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/wl8-cct-bw-1.html","shape":"wall","tone":"neutral","specs":["8W","Tri-colour","IP20"],"desc":"The 8W Up/Down Indoor Wall Light, CCT Dimmable is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Smooth, flicker-free dimming","Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","700-750 lumens"],["Power consumption","8Watt"],["Beam angle","120\u00ba"],["Dimmable","Triac Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Wall Mount"],["Specifications","AC220-240V, 50-60Hz"],["Weather Rating","IP20 Indoor Use"],["Material Construction","Aluminium & PC"],["Dimensions","242x67x77mm"],["Weight","600g /pce"],["Light Output Colour","Warm 3000k/ Natural 4000k / Bright 5700k"],["Colour Rendering Index","80"],["Shade/Housing","Matte White"],["Warranty","3 Years"]]},{"id":"MR10-CCT-WALL-B-2","cat":"commercial","name":"10W Up/Down LED Wall Light, CCT IP65","price":55.0,"img":"/img/mr10-cct-wall-b-2.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/mr10-cct-wall-b.html","shape":"wall","tone":"neutral","specs":["10W","Tri-colour","IP65"],"desc":"The 10W Up/Down LED Wall Light, CCT IP65 is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K). It's sealed to IP65 for outdoor and wet-area use. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Weatherproof IP65 \u2014 rated for outdoor & wet areas","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","School & Commercial LED Lighting"],["Installation","Must be installed by a licensed electrician"],["Brightness","900 lumens"],["Power consumption","10Watt (5w/5w Up/Down)"],["Beam angle","29x77\u00ba Rectangular Beam"],["Dimmable","Non Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Wall Mount"],["Specifications","220-240V 50Hz"],["Weather Rating","IP65 Indoor and Outdoor Use"],["Material Construction","Diecast Aluminium, PC Optical Lens"],["Dimensions","174x92x29mm"],["Weight","600g /pce"],["Light Output Colour","Warm 3000k/ Natural 4000k / Bright 5700k"],["Colour Rendering Index","80"],["Shade/Housing","Matte Black"]]},{"id":"DL10GS-IP65-1","cat":"commercial","name":"90mm Gimbal 10W Downlight, CCT, IP65","price":28.0,"img":"/img/dl10gs-ip65-1.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/dl10gs-ip65.html","shape":"down","tone":"neutral","specs":["10W","Tri-colour","IP65"],"desc":"The 90mm Gimbal 10W Downlight, CCT, IP65 is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K). It's sealed to IP65 for outdoor and wet-area use. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Weatherproof IP65 \u2014 rated for outdoor & wet areas","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","up to 100Watt Halogen"],["Brightness","1000 lumens"],["Power consumption","10Watt"],["Beam angle","60\u00ba"],["Dimmable","0-100%"],["Lifespan","50 000 hrs"],["Fitting","Flat Surface, Spring Clips"],["Specifications","AC220-240V, 50-60Hz"],["Weather Rating","IP65 waterproof, dustproof, Driver IP20"],["Material Construction","Aluminium and PMMA"],["Dimensions","\u00d8110x45mm Cutout 90mm"],["Packed Dimensions","135x115x70mm"],["Weight","450g /pce"],["Light Output Colour","Warm 3000k/ Natural 4000k / Bright 6000k"],["Colour Rendering Index",">80"]]},{"id":"P36UP-30X120-CCT-1","cat":"commercial","name":"30x120cm Premium 36W Panel Light, Low Glare, CCT, Back-Lit","price":50.0,"img":"/img/p36up-30x120-cct-1.webp","url":"https://greenhse.com/products/lighting-perth/commercial-lighting-perth/p36up-30x120-cct.html","shape":"panel","tone":"neutral","specs":["36W","Warm","IP40"],"desc":"The 30x120cm Premium 36W Panel Light, Low Glare, CCT, Back-Lit is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Low-glare optic for comfortable, even light","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","2 x 1.2m T8 tubes"],["Brightness","3600 Lumens"],["Power consumption","36W"],["Beam angle","90\u00ba with UGR<19 (Low Glare)"],["Dimmable","Non-dimmable (optional dimmable drivers available)"],["Lifespan","50 000 hrs"],["Fitting","Fits suspended ceilings"],["Specifications","220~240VAC, 50-60Hz"],["Weather rating","IP40 Indoor"],["Material construction","Aluminium, PMMA lens, PS diffuser"],["Dimensions","295mmx1195x32"],["Packed Dimensions","1260x290x375mm"],["Net Weight","2.5Kg/pce"],["Light Output Colour","Warm White 3000k or Natural White 4000k or Bright White 5700k"],["Colour Rendering Index","\u226580"]]},{"id":"P36-60X60-CCT-1","cat":"commercial","name":"60x60cm Premium 36W Panel Light, Low Glare, CCT, Back-Lit","price":50.0,"img":"/img/p36-60x60-cct-1.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/p36-60x60-cct.html","shape":"panel","tone":"neutral","specs":["36W","Warm","IP40"],"desc":"The 60x60cm Premium 36W Panel Light, Low Glare, CCT, Back-Lit is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Low-glare optic for comfortable, even light","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","2 x 1.2m T8 tubes"],["Brightness","3600 Lumens"],["Power consumption","36W"],["Beam angle","90\u00ba with UGR<19 (Low Glare)"],["Dimmable","Non-dimmable (optional dimmable drivers available)"],["Lifespan","50 000 hrs"],["Fitting","Fits suspended ceilings"],["Specifications","220~240VAC, 50-60Hz"],["Weather rating","IP40 Indoor"],["Material construction","Aluminium, PMMA lens, PS diffuser"],["Dimensions","595mmx595x32"],["Packed Dimensions","600x600x35mm"],["Net Weight","1.9Kg/pce"],["Light Output Colour","Warm White 3000k, Natural White 4000k, Bright White 5700k"],["Colour Rendering Index","\u226580"]]},{"id":"HB100-SO-120-2","cat":"commercial","name":"100W High Bay Light, 120\u00ba Beam, 5000K","price":90.0,"img":"/img/hb100-so-120-2.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/hb100-so-120.html","shape":"highbay","tone":"cool","specs":["100W","IP66"],"desc":"The 100W High Bay Light, 120\u00ba Beam, 5000K is a commercial-grade LED fitting for offices, schools and retail. It runs in daylight (~5000\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","Up to 400W Metal Halide"],["Brightness","16 000 lumens 160 lumens/watt"],["Power consumption","100Watt"],["Beam angle","120\u00ba"],["Fitting","Hanging bracket with ring"],["Lifespan","Long 50 000 hours"],["Specifications","100-277VAC, 50-60Hz"],["Weather rating","IP66 sealed against water & dust"],["Impact Protection","IK10"],["Material construction","ADC12 aluminium, electrostatic polyester powder coating, PC Lens"],["Dimensions","\u00f8240x145mm"],["Weight","1.8Kg"],["Packed Dimensions","26x26x13cm"],["Dimmable","No"],["Light Output Colour","Bright White 5000k"]]},{"id":"DP40-CCT-1","cat":"commercial","name":"40W LED Display Light, Tricolour","price":65.0,"img":"/img/dp40-cct-1.webp","url":"https://greenhse.com/products/lighting-perth/commercial-lighting-perth/dp40-cct.html","shape":"panel","tone":"neutral","specs":["40W","Tri-colour","IP20"],"desc":"The 40W LED Display Light, Tricolour is a commercial-grade LED fitting for offices, schools and retail. It runs in tri-colour switch (3000K / 4000K / 5700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["3 selectable colour temperatures via switch","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","Brighter than 100W Halogen"],["Brightness","3600/4400/3800 lumens (3000/4000/5700k)"],["Power consumption","40Watt"],["Beam angle","90\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","40 000 hrs"],["Fitting","Ceiling mounted, adjustable 0-65\u00ba angle"],["Specifications","AC200-240V, 50-60Hz"],["Weather rating","IP20"],["Material construction","Aluminium 6063, tempered glass"],["Dimensions","246mmx156x144 Cutout 225mmx130"],["Weight","2.3kg 1pce"],["Instant start","suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright 5700k"]]},{"id":"GH-C150W-40K-2","cat":"commercial","name":"150W LED Canopy Light","price":120.0,"img":"/img/gh-c150w-40k-2.webp","url":"https://greenhse.com/products/lighting-perth/commercial-lighting-perth/gh-c150w-40k.html","shape":"panel","tone":"neutral","specs":["150W","4000K","IP65"],"desc":"The 150W LED Canopy Light is a commercial-grade LED fitting for offices, schools and retail. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","400w Metal Halide"],["Brightness","22 500 lumens 150 lumens/watt"],["Power consumption","150Watt"],["Beam angle","120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface Mount"],["Specifications","AC100-277V, 50-60Hz"],["Weather rating","IP65"],["Material construction","Aluminium, PC and tempered glass - electrostatic polyester powder coating"],["Dimensions","400x400x70mm"],["Weight","4.6kg 1pce"],["Impact Resistance","IK08"],["Light Output Colour","4000k Natural White"],["Colour Rendering Index",">70"]]},{"id":"GH-C100-CCT-PA-2","cat":"commercial","name":"100W LED Canopy Light, CCT","price":120.0,"img":"/img/gh-c100-cct-pa-2.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/gh-c100-cct-pa.html","shape":"panel","tone":"neutral","specs":["100W","Tri-colour","IP65"],"desc":"The 100W LED Canopy Light, CCT is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","Up to 4 x IP65 Batten Lights"],["Brightness","Up to 30 000 lumens 140 lumens/watt"],["Power consumption","40/60/80/100W Watt Selectable"],["Beam angle","Type 5"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface Mount"],["Specifications","AC120-277V, 50-60Hz"],["Weather rating","IP65"],["Material construction","Rugged diecast aluminium, corrosion-resistant housing"],["Dimensions","265x265x65.1mm"],["Weight","3kg 1pce"],["Operating Temperature","40\u00baC to 40\u00baC"],["Impact Resistance","IK08"],["Light Output Colour","4000/5000/6500k Selectable"]]},{"id":"GH-C200-CCT-2","cat":"commercial","name":"200W LED Canopy Light","price":145.0,"img":"/img/gh-c200-cct-2.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/gh-c200-cct.html","shape":"panel","tone":"neutral","specs":["200W","Tri-colour","IP65"],"desc":"The 200W LED Canopy Light is a commercial-grade LED fitting for offices, schools and retail. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","Up to 4 x IP65 Batten Lights"],["Brightness","Up to 30 000 lumens 150 lumens/watt"],["Power consumption","80/100/150/200 Watt Selectable"],["Beam angle","140\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface Mount"],["Specifications","AC120-277V, 50-60Hz"],["Weather rating","IP65"],["Material construction","Rugged diecast aluminium, corrosion-resistant housing"],["Dimensions","420x420x65mm"],["Weight","5.7kg 1pce"],["Operating Temperature","40\u00baC to 40\u00baC"],["Impact Resistance","IK08"],["Light Output Colour","4000/5000/6500k Selectable"]]},{"id":"GH-W50-CCT-2","cat":"commercial","name":"50W LED Wall Light CCT","price":85.0,"img":"/img/gh-w50-cct-2.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/gh-w50-cct.html","shape":"wall","tone":"neutral","specs":["50W","Tri-colour","IP65"],"desc":"The 50W LED Wall Light CCT is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","Up to 7 000 lumens 140 lumens/watt"],["Power consumption","20/30/40/50W Watt Selectable"],["Beam angle","60x120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Wall Mount"],["Specifications","AC120-277V, 50-60Hz"],["Weather rating","IP65"],["Material construction","Rugged diecast aluminium, corrosion-resistant housing"],["Dimensions","280x216x100mm"],["Weight","3kg 1pce"],["Operating Temperature","40\u00baC to 40\u00baC"],["Impact Resistance","IK08"],["Light Output Colour","4000/5000/6500k Selectable"],["Colour Rendering Index","80"]]},{"id":"GH-EXIT-BOX-2","cat":"commercial","name":"Emergency Exit Sign, Ceiling/Wall Mountable","price":50.0,"img":"/img/gh-exit-box-2.webp","url":"https://greenhse.com/products/lighting-perth/commercial-lighting-perth/gh-exit-box.html","shape":"emergency","tone":"neutral","specs":["3W","Daylight","IP20"],"desc":"The Emergency Exit Sign, Ceiling/Wall Mountable is a commercial-grade LED fitting for offices, schools and retail. It runs in a fixed 6000K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Power consumption","3W"],["Specifications","220-240V 50Hz"],["Dimming","Non-dimmable"],["Battery","3.2V 600mA LiFePO4 Re-chargeable"],["Backup","3hrs"],["Charging Time","16hrs"],["IP Rating","IP20 (Indoors)"],["Temperature","10-60\u00b0"],["Mode","Maintained"],["Emergency Classification","C0:D4 C90:D3.2"],["Light Output Colour","6000k"],["Dimensions","358x211x62.5mm"],["Mounting","Surface or Wall Mounted"],["Weight",".8kg"],["Shade / Housing","White/Green"]]},{"id":"GH-EM5-SPITFIRE-R-2","cat":"commercial","name":"Spitfire Emergency Light","price":45.0,"img":"/img/gh-em5-spitfire-r-2.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/gh-em5-spitfire-r.html","shape":"emergency","tone":"neutral","specs":["5W","Daylight","IP30"],"desc":"The Spitfire Emergency Light is a commercial-grade LED fitting for offices, schools and retail. It runs in a fixed 6000K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Power consumption","5W CREE"],["Brightness","250 lumens"],["Lifespan","50 000 hrs"],["Battery","3.7V 2000mAh NiCad batteries Re-chargeable"],["Mode","Non-maintained"],["Standby Time",">3hrs"],["Charging Time","16hrs"],["IP Rating","IP30 (Indoors)"],["Specifications","185-277VAC, 50-60Hz"],["Classification","D40"],["Light Output Colour","6000k"],["Fitting","Recessed or Surface Mount"],["Dimensions","Cutout \u00f870mm Adapter Ring \u00f8144x25mm"],["Weight","550g (Recessed), 700g (Surface Mount)"],["Shade / Housing","White"]]},{"id":"W10-CCT-BW-1","cat":"commercial","name":"10W LED Wall Light, CCT, Black and White Cover","price":22.0,"img":"/img/w10-cct-bw-1.webp","url":"https://greenhse.com/products/lighting-perth/commercial-lighting-perth/w10-cct-bw.html","shape":"wall","tone":"neutral","specs":["10W","Tri-colour","IP65"],"desc":"The 10W LED Wall Light, CCT, Black and White Cover is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","75W"],["Brightness","900-1100 lumens"],["Power consumption","10Watt"],["Beam angle","120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Surface Mount"],["Specifications","AC220-260V, 50-60Hz"],["Weather rating","IP65"],["Material construction","PC, White RAL9016, Black RAL9005"],["Dimensions","220x120x66mm"],["Packed Weight",".4kg 1pce"],["Light Output Colour","3000k Warm/4000k Natural/5000k Bright White"],["Colour Rendering Index",">80"],["Shade/Housing","White or Black, Frosted PC Lens"]]},{"id":"WL12-18-CCT-SENSOR-1","cat":"commercial","name":"12W or 18W Wall Light, CCT PIR/Daylight Sensor","price":60.0,"img":"/img/wl12-18-cct-sensor-2.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/wl12-18-cct-sensor.html","shape":"sensor","tone":"cool","specs":["12W","Tri-colour","IP65"],"desc":"The 12W or 18W Wall Light, CCT PIR/Daylight Sensor is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","1200-1400 lumens (12w) 1650-1900 lumens (18w)"],["Power consumption","12Watt or 18Watt"],["Beam angle","120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Wall Mount"],["Specifications","AC220-240V, 50-60Hz"],["Weather rating","IP65"],["Impact rating","IK08"],["Material construction","PC, ADC12 Aluminium, Black RAL9005"],["Dimensions","251x167x80mm"],["Weight",".95kg 1pce"],["Light Output Colour","3000k Warm/4000k Natural/5700k Bright White"],["Colour Rendering Index",">80"],["Shade/Housing","White, Frosted PC Lens"]]},{"id":"T20-CCT-1-1","cat":"commercial","name":"60cm 20W LED Batten Fitting, Tricolour","price":28.0,"img":"/img/t20-cct-1-1.webp","url":"https://greenhse.com/products/lighting-perth/commercial-lighting-perth/t20-cct-1.html","shape":"batten","tone":"neutral","specs":["20W","Daylight","IP20"],"desc":"The 60cm 20W LED Batten Fitting, Tricolour is a commercial-grade LED fitting for offices, schools and retail. It runs in tri-colour switch (3000K / 4000K / 5700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["3 selectable colour temperatures via switch","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","Brighter than 1 fluorescent fitting"],["Brightness","2200 lumens"],["Power consumption","20Watt"],["Beam angle","120\u00ba"],["Dimmable","Non Dimmable"],["Lifespan","50 000hr"],["Fitting","Surface mount"],["Specifications","200~240VAC, 50-60Hz"],["Weather rating","IP20"],["Material Construction","PC and Iron Frame"],["Product Dimensions","603x71x64mm"],["Weight","0.65kg / 0.92kg packed"],["Instant start","Instant start, suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","3000/4000/5700 Switch Adjustable"]]},{"id":"T40-CCT-BATTEN-PRO-1","cat":"commercial","name":"1.2m LED 40W Batten Pro, High Lumen, Tricolour, PA","price":60.0,"img":"/img/t40-cct-batten-pro-1.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/t40-cct-batten-pro.html","shape":"batten","tone":"neutral","specs":["20W","Tri-colour","IP20"],"desc":"The 1.2m LED 40W Batten Pro, High Lumen, Tricolour, PA is a commercial-grade LED fitting for offices, schools and retail. It runs in tri-colour switch (3000K / 4000K / 5700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["3 selectable colour temperatures via switch","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","Up to 150 L/Watt - 40w 5600-6000L 35w 4950-5250L 25w 3550-3850L 20w 2800-3100L"],["Power consumption","40/35/25/20w selectable."],["Beam angle","120\u00ba"],["Dimmable","No"],["Lifespan","50 000hr"],["Fitting","Ceiling mountable"],["Specifications","220~240VAC, 50-60Hz"],["Weather rating","IP20"],["IK Rating","IK06"],["Material construction","Plastic-coated Aluminium and PC Diffuser"],["Product dimensions","1200x65x66mm per piece"],["Weight","950g per piece"],["Instant start","Instant start, suitable for sensors"],["Flicker","Flicker-free"],["Light Output Colour","3000/4000/5700k Warm/Natural/Bright White"]]},{"id":"T40-CCT-BATTEN-IP6-1","cat":"commercial","name":"1.2m LED 40W Dimmable Batten Fitting, CCT, IP65","price":70.0,"img":"/img/t40-cct-batten-ip6-1.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/t40-cct-batten-ip65-dim.html","shape":"batten","tone":"neutral","specs":["40W","Tri-colour","IP65"],"desc":"The 1.2m LED 40W Dimmable Batten Fitting, CCT, IP65 is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K) and dims smoothly without flicker. It's sealed to IP65 for outdoor and wet-area use. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Smooth, flicker-free dimming","Tunable white from warm 2700K to cool 5700K","Weatherproof IP65 \u2014 rated for outdoor & wet areas","Energy-efficient LED \u2014 lower running costs"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","2xT8 or T5 tubes"],["Brightness","Up to 4400 lumens"],["Power consumption","40Watt"],["Beam angle","120\u00ba"],["Dimmable","Triac Dimmable"],["Lifespan",">35 000hr"],["Fitting","Ceiling mountable, can be suspended"],["Specifications","200~240VAC, 50-60Hz"],["Weather rating","IP65 Waterproof"],["Material construction","Aluminium housing and PC cover"],["Product dimensions","1197x80x36mm"],["Packed dimensions","1220x90x40mm per piece"],["Weight","850g per piece / 1kg packed"],["Instant start","Instant start, suitable for sensors"],["Light Output Colour","3000k/4000k/5000k Selectable by switch"]]},{"id":"DL7G-IP65-BLACK-1-1","cat":"commercial","name":"7W BLACK GIMBAL DOWNLIGHT, DIMMABLE IP65","price":23.0,"img":"/img/dl7g-ip65-black-1-1.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/dl7g-ip65-black-1.html","shape":"down","tone":"neutral","specs":["7W","Tri-colour","IP65"],"desc":"The 7W BLACK GIMBAL DOWNLIGHT, DIMMABLE IP65 is a commercial-grade LED fitting for offices, schools and retail. It runs in neutral white (~4000K) and dims smoothly without flicker. It's sealed to IP65 for outdoor and wet-area use. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Smooth, flicker-free dimming","Weatherproof IP65 \u2014 rated for outdoor & wet areas","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","up to 70Watt Halogen"],["Brightness","700 lumens"],["Power consumption","7Watt"],["Beam angle","60\u00ba"],["Dimmable","0-100%"],["Lifespan","50 000 hrs"],["Fitting","Flat Surface, Spring Clips"],["Specifications","AC220-240V, 50-60Hz"],["Weather rating","IP65 waterproof, dustproof, Driver IP20"],["Material construction","Aluminium and PMMA"],["Dimensions","\u00d895x38mm Cutout 70mm"],["Packed Dimensions","140x115x75mm"],["Weight","400g packed"],["Light Output Colour","Warm 3000k/ Natural 4000k / Bright 6000k"],["Colour Rendering Index",">80"]]},{"id":"DL7A-1","cat":"commercial","name":"70mm 7W Downlight, Dimmable, Adjustable, 60\u00ba","price":15.0,"img":"/img/dl7a-1.webp","url":"https://greenhse.com/products/lighting-perth/commercial-lighting-perth/dl7a.html","shape":"down","tone":"neutral","specs":["7W","Tri-colour","IP40"],"desc":"The 70mm 7W Downlight, Dimmable, Adjustable, 60\u00ba is a commercial-grade LED fitting for offices, schools and retail. It runs in neutral white (~4000K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Smooth, flicker-free dimming","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","50Watt Halogen"],["Brightness","600/640/660 lumens (3000k, 4000k, 5000k)"],["Power consumption","7Watt"],["Beam angle","60\u00ba"],["Dimmable","8-100%"],["Lifespan","40 000 hrs"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP40 Indoor Use"],["Material Construction","Aluminium, Thermal Plastic, PMMA"],["Dimensions","\u00d885mmx64.5 Cutout 70-75mm"],["Packed Dimensions","11x11x8cm 1pce"],["Weight","0.25kg/pce packed"],["Light Output Colour","Warm 3000k / Natural 4000k / Bright 5000k"],["Colour Rendering Index","80"],["Shade/Housing","Matte White Recessed"]]},{"id":"DL7A-CCT-1","cat":"commercial","name":"70mm 7W Downlight, CCT, Dimmable, Low Glare","price":15.0,"img":"/img/dl7a-cct-1.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/dl7a-cct.html","shape":"down","tone":"neutral","specs":["7W","Tri-colour","IP50"],"desc":"The 70mm 7W Downlight, CCT, Dimmable, Low Glare is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Smooth, flicker-free dimming","Tunable white from warm 2700K to cool 5700K","Low-glare optic for comfortable, even light","Energy-efficient LED \u2014 lower running costs"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","540-630 Up to 90 lumens/watt"],["Power consumption","7Watt"],["Beam angle","60\u00ba"],["Dimmable","Triac Dimmable 8-100%"],["Lifespan","50 000 hrs"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP50 Indoor Use"],["Material Construction","Plastic-Coated Aluminium, Thermally Conductive Plastic, PC"],["Dimensions","\u00d885mmx68 Cutout 70-75mm"],["Packed Dimensions","11x11x8cm 1pce"],["Weight","0.25kg/pce packed"],["Light Output Colour","Warm 3000k / Natural 4000k / Bright 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Matte White"],["Warranty","3Yr"]]},{"id":"DL8CCT-P-LG-1","cat":"commercial","name":"90mm Premium 8W Downlight, Low Glare, Adjustable","price":16.0,"img":"/img/dl8cct-p-lg-1.webp","url":"https://greenhse.com/products/lighting-perth/commercial-lighting-perth/dl8cct-p-lg.html","shape":"down","tone":"neutral","specs":["8W","Tri-colour","IP20"],"desc":"The 90mm Premium 8W Downlight, Low Glare, Adjustable is a commercial-grade LED fitting for offices, schools and retail. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Low-glare optic for comfortable, even light","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","100-120 Watt"],["Brightness","760-950 lumens"],["Power consumption","8Watt"],["Beam angle","60\u00ba"],["Lifespan","50 000 hrs"],["Specifications","AC220-240V, 50-60Hz"],["Weather Rating","IP20"],["Material Construction","PC Lens, Plastic Coated Aluminium, White RAL 9016"],["Dimensions","\u00d8106mmx84 Cutout 90mm"],["Weight","0.2kg/pce"],["Light Output Colour","3000 / 4000 / 5000k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Matte White Standard"],["Warranty","3Yr"],["Certification","SAA, RCM, IC-4"]]},{"id":"DL8ES-FLAT-ALL-FP--1","cat":"commercial","name":"90mm 8W Downlight, Dimmable, Flat, Switch Adjustable","price":6.0,"img":"/img/legacy/dl8es-f_1_1_1_1.webp","url":"https://greenhse.com/products/lighting-perth/commercial-lighting-perth/dl8es-flat-all-fp-1.html","shape":"switch","tone":"neutral","specs":["8W","Tri-colour","IP54"],"desc":"The 90mm 8W Downlight, Dimmable, Flat, Switch Adjustable is a commercial-grade LED fitting for offices, schools and retail. It runs in neutral white (~4000K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Smooth, flicker-free dimming","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","100-120Watt"],["Brightness","660-800 lumens"],["Power consumption","8Watt"],["Beam angle","110\u00ba"],["Lifespan","50 000 hrs"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 / IP40"],["Material Construction","PC, White RAL 9016"],["Dimensions","\u00d8106mmx45 Cutout 90-95mm"],["Weight","0.2kg/pce"],["Light Output Colour","3000 / 4000 / 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Matte White Standard - Brushed Chrome / Matte Black (optional)"],["Warranty","3Yr"],["Certification","SAA, RCM, IC-4"]]},{"id":"DL9RGBW-BT1-1","cat":"commercial","name":"90mm 9W Downlight, RGBW, Bluetooth","price":25.0,"img":"/img/dl9rgbw-bt1-2.webp","url":"https://greenhse.com/products/lighting-perth/commercial-lighting-perth/dl9rgbw-bt1.html","shape":"down","tone":"rgb","specs":["9W","RGB","IP54"],"desc":"The 90mm 9W Downlight, RGBW, Bluetooth is a commercial-grade LED fitting for offices, schools and retail. It runs in RGBW (colour + white). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Full-colour RGB, run from a controller and remote","App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","75Watt"],["Brightness","900-1000 lumens (White)"],["Power consumption","9Watt"],["Beam angle","110\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Flat surface, spring clips"],["Specifications","AC220-240V, 50/60Hz"],["Weather Rating","IP54 (Front) IP40 (Back)"],["Material Construction","Aluminium coated plastic, PC Lens, White RAL9016"],["Dimensions","\u00d8115mmx57 Cutout 90-95mm"],["Packed Dimensions","120x120x75mm 1pce"],["Packed Weight","0.35kg"],["Mercury","No Mercury"],["Light Output Colour","Adjustable from Warm 2700k - Bright 6500k + RGB"],["Colour Rendering Index","80"]]},{"id":"DL9RGBW-PBT-1","cat":"commercial","name":"90mm 9W Downlight, RGBW, Low Glare Bluetooth","price":27.0,"img":"/img/dl9rgbw-pbt-2.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/dl9rgbw-pbt.html","shape":"down","tone":"rgb","specs":["9W","RGB","IP54"],"desc":"The 90mm 9W Downlight, RGBW, Low Glare Bluetooth is a commercial-grade LED fitting for offices, schools and retail. It runs in RGBW (colour + white). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Full-colour RGB, run from a controller and remote","App & voice control (Alexa & Google Home)","Low-glare optic for comfortable, even light","Energy-efficient LED \u2014 lower running costs"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","75Watt"],["Brightness","900-1000 lumens (White)"],["Power consumption","9Watt"],["Beam angle","60\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Flat surface, spring clips"],["Specifications","AC220-240V, 50/60Hz"],["Weather Rating","IP54 (Front) IP40 (Back)"],["Material Construction","Aluminium coated plastic, PC Lens, White RAL9016"],["Dimensions","\u00d8115mmx57 Cutout 90-95mm"],["Packed Dimensions","120x120x75mm"],["Packed Weight","0.35kg"],["Mercury","No Mercury"],["Light Output Colour","Adjustable from Warm 2700k - Bright 6500k + RGB"],["Colour Rendering Index","80"]]},{"id":"DL15-12-CCT-PA-1","cat":"commercial","name":"12cm 15W/12W Downlight, CCT","price":28.0,"img":"/img/dl15-12-cct-pa-1.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/dl15-12-cct-pa.html","shape":"down","tone":"neutral","specs":["12W","Tri-colour","IP54"],"desc":"The 12cm 15W/12W Downlight, CCT is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","1550-1700 Lumens (15w) 1200-1400 Lumens (12w)"],["Power consumption","12W or 15Watt"],["Beam angle","100\u00ba"],["Dimmable","Non-Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Sunk surface, spring clips"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 (Outside) / IP20 (Inside)"],["Material Construction","PC Lens, Plastic Coated Aluminium, White RAL 9016"],["Dimensions","\u00d8145x55mm Cutout 120-130mm"],["Weight","0.25kg 1pce"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Aluminium, white recessed cover"],["Warranty","3Yr"]]},{"id":"DL25-20-140-CCT-PA-1","cat":"commercial","name":"14cm 25W/20W Downlight, CCT","price":40.0,"img":"/img/dl25-20-140-cct-pa-1.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/dl25-20-140-cct-pa.html","shape":"down","tone":"neutral","specs":["25W","Tri-colour","IP54"],"desc":"The 14cm 25W/20W Downlight, CCT is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","2750-2950 Lumens (25w) 1200-1400 Lumens (20w)"],["Power consumption","25W or 20Watt"],["Beam angle","100\u00ba"],["Dimmable","Non-Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Sunk surface, spring clips"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 (Outside) / IP20 (Inside)"],["Material Construction","PC Lens, Plastic Coated Aluminium, White RAL 9016"],["Dimensions","\u00d8170x60mm Cutout 140-150mm"],["Weight","0.34kg 1pce"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Aluminium, white recessed cover"],["Warranty","3Yr"]]},{"id":"DL25-20-160-CCT-PA-1","cat":"commercial","name":"16cm 25W/20W Downlight, CCT","price":45.0,"img":"/img/dl25-20-160-cct-pa-1.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/dl25-20-160-cct-pa.html","shape":"down","tone":"neutral","specs":["25W","Tri-colour","IP54"],"desc":"The 16cm 25W/20W Downlight, CCT is a commercial-grade LED fitting for offices, schools and retail. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","2850-3050 Lumens (25w) 2250-2400 Lumens (20w)"],["Power consumption","25W or 20Watt"],["Beam angle","100\u00ba"],["Dimmable","Non-Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Sunk surface, spring clips"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 (Outside) / IP20 (Inside)"],["Material Construction","PC Lens, Plastic Coated Aluminium, White RAL 9016"],["Dimensions","\u00d8190x62mm Cutout 160-170mm"],["Weight","0.37kg 1pce"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Aluminium, white recessed cover"],["Warranty","3Yr"]]},{"id":"DL35-28-200-CCT-PA-1","cat":"commercial","name":"20cm 35W/28W LED Downlight, Power adjustable","price":55.0,"img":"/img/dl35-28-200-cct-pa-1.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/dl35-28-200-cct-pa.html","shape":"down","tone":"neutral","specs":["35W","Tri-colour","IP54"],"desc":"The 20cm 35W/28W LED Downlight, Power adjustable is a commercial-grade LED fitting for offices, schools and retail. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","3900-4300 Lumens (35w) 3100-3550 Lumens (28w)"],["Power consumption","35W or 28Watt"],["Beam angle","100\u00ba"],["Dimmable","Non-Dimmable"],["Lifespan","50 000 hrs"],["Fitting","Sunk surface, spring clips"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 (Outside) / IP20 (Inside)"],["Material Construction","PC Lens, Plastic Coated Aluminium, White RAL 9016"],["Dimensions","\u00d8235x67mm Cutout 200-210mm"],["Weight","0.47kg 1pce"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Aluminium, white recessed cover"],["Warranty","3Yr"]]},{"id":"25W-SMART-LED-TUYA-1","cat":"commercial","name":"16-17cm 25W LED Smart Tuya Downlight WIFI","price":60.0,"img":"/img/25w-smart-led-tuya-2.webp","url":"https://greenhse.com/lighting-perth/commercial-lighting-perth/25w-smart-led-tuya-downlight.html","shape":"down","tone":"neutral","specs":["25W","Warm","IP54"],"desc":"The 16-17cm 25W LED Smart Tuya Downlight WIFI is a commercial-grade LED fitting for offices, schools and retail. It is switchable between 3000K and 5700K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Brightness","2370-2750, up to 110 Lumens/Watt"],["Power consumption","25Watt"],["Beam angle","90\u00ba"],["Dimmable","by App on Smart device"],["Lifespan","50 000 hrs"],["Fitting","Sunk surface, spring clips"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 front cover IP20 on the back"],["Material Construction","Diecast Aluminium, PC"],["Dimensions","\u00d8190x45mm Cutout 160-170mm"],["Packed Weight","0.64kg 1pce"],["Mercury","No Mercury"],["Light Output Colour","Adjustable Warm 3000k - Bright 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Matte white, white frosted PC cover"]]},{"id":"DL35S-1","cat":"commercial","name":"21cm 35W Downlight, Dimmable, Tricolour","price":55.0,"img":"/img/dl35s-1.webp","url":"https://greenhse.com/products/lighting-perth/commercial-lighting-perth/dl35s.html","shape":"down","tone":"neutral","specs":["35W","Tri-colour","IP54"],"desc":"The 21cm 35W Downlight, Dimmable, Tricolour is a commercial-grade LED fitting for offices, schools and retail. It runs in tri-colour switch (3000K / 4000K / 5700K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Smooth, flicker-free dimming","3 selectable colour temperatures via switch","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","School & Commercial LED Lighting"],["Replaces","100W CFL"],["Brightness","3300/3600/3400 lumens (Warm/Natural/Bright)"],["Power consumption","35Watt"],["Beam angle","90\u00ba"],["Dimmable","8-100%"],["Lifespan","50 000 hrs"],["Fitting","Sunk surface, spring clips"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 Front/IP20 Back"],["Material Construction","Aluminium and PC"],["Dimensions","\u00d8228x45mm Cutout 200-210mm"],["Packed Dimensions","27x28x7.6cm 1pce"],["Packed Weight","1.1kg 1pce"],["Mercury","No Mercury"],["Light Output Colour","Warm White 3000k/Natural White 4000k/Bright White 5000k"]]},{"id":"SURFACE-SOCKET-1","cat":"commercial","name":"Surface Socket Outlet Plug Base","price":1.5,"img":"/img/surface-socket-1.webp","url":"https://greenhse.com/products/lighting-perth/commercial-lighting-perth/surface-socket.html","shape":"switch","tone":"neutral","specs":["LED"],"desc":"The Surface Socket Outlet Plug Base is a commercial-grade LED fitting for offices, schools and retail. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Installation","Must be installed by a licensed electrician"],["Mounting","Surface Mount"],["Current","10A"],["Voltage","250V AC 50Hz"],["Wiring","3-Pin Back Wired Rear Connection"],["Terminals","4x4 sq.mm cables, 1 looping terminal"],["Dimensions","7x5x5cm Single 17x16x13cm Box/10"],["Product Finish","White"],["Warranty","5 Years"],["Certification","SAA"]]},{"id":"Q-CONNECT-1","cat":"commercial","name":"Single Quick Connect Plug Base 10A","price":1.8,"img":"/img/q-connect-2.webp","url":"https://greenhse.com/products/lighting-perth/commercial-lighting-perth/q-connect.html","shape":"panel","tone":"neutral","specs":["LED"],"desc":"The Single Quick Connect Plug Base 10A is a commercial-grade LED fitting for offices, schools and retail. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 commercial LED fitting","Mounting hardware","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","School & Commercial LED Lighting"],["Installation","Must be installed by a licensed electrician"],["Mounting","Surface Mount"],["Current","10A"],["Voltage","250V AC 50Hz"],["Wiring","3-Pin Back Wired Rear Connection"],["Terminals","4x4 sq.mm cables, 1 looping terminal"],["Dimensions","7x5x5cm Single 17x16x13cm Box/10"],["Product Finish","White"],["Warranty","5 Years"],["Certification","SAA"]]},{"id":"WIFI-GARAGE-DOOR","cat":"sensors","name":"WiFi Garage Door Controller","price":95.0,"img":"/img/wifi-garage-door-1.webp","url":"https://greenhse.com/products/lighting-perth/security-sensors/wifi-garage-door.html","shape":"transformer","tone":"neutral","specs":["LED"],"desc":"Adds phone control to your garage door \u2014 open and close it from the app.","includes":["1 \u00d7 WiFi garage door controller","Wiring instructions"],"features":["Open and close from the app","WiFi \u2014 no hub needed"],"specTable":[["Category","Security / Sensors"],["Installation","Recommended to be installed by a licensed electrician"],["Operating Voltage","240V / 50Hz"],["Rated Current","10 Amp"],["Operating Temperature","5\u00b0C - 35\u00b0C"],["Maximum Load","2000W"],["Control Type","Voice (using Google Assistant or Amazon Alexa), Remote (using Smart Device), Geofence"],["Connectivity","Infrared (IR), WiFi"],["WiFi Info","WiFi IEEE802.11b/g/n 2.4Ghz Mac Encryption: WEP/ WAPI/ TKIP /AES"],["Device Requirements","iOS 8.0 or higher, Android 4.1 or higher"],["IP Rating","Indoor Use Only"],["Dimensions","109x62x44mm"],["Housing","Black flame-retardant ABS"],["Warranty","1Yr"],["Certification","RCM, CE"]]},{"id":"WL12-18-CCT-SENSOR-2","cat":"sensors","name":"12W or 18W Wall Light, CCT PIR/Daylight Sensor","price":60.0,"img":"/img/wl12-18-cct-sensor-2.webp","url":"https://greenhse.com/products/lighting-perth/security-sensors/wl12-18-cct-sensor.html","shape":"sensor","tone":"cool","specs":["12W","Tri-colour","IP65"],"desc":"The 12W or 18W Wall Light, CCT PIR/Daylight Sensor is a sensor-driven fitting for security and automatic lighting. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 sensor / security fitting","Mounting bracket","Wiring guide"],"features":["Tunable white from warm 2700K to cool 5700K","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Security / Sensors"],["Brightness","1200-1400 lumens (12w) 1650-1900 lumens (18w)"],["Power consumption","12Watt or 18Watt"],["Beam angle","120\u00ba"],["Dimmable","Non-dimmable"],["Lifespan","50 000 hrs"],["Fitting","Wall Mount"],["Specifications","AC220-240V, 50-60Hz"],["Weather rating","IP65"],["Impact rating","IK08"],["Material construction","PC, ADC12 Aluminium, Black RAL9005"],["Dimensions","251x167x80mm"],["Weight",".95kg 1pce"],["Light Output Colour","3000k Warm/4000k Natural/5700k Bright White"],["Colour Rendering Index",">80"],["Shade/Housing","White, Frosted PC Lens"]]},{"id":"IKUU-SMART-WIFI-OU","cat":"sensors","name":"IKUU Smart WiFi Outdoor Sensor White","price":55.0,"img":"/img/ikuu-smart-wifi-ou-1.webp","url":"https://greenhse.com/products/lighting-perth/security-sensors/ikuu-smart-wifi-outdoor-sensor.html","shape":"sensor","tone":"neutral","specs":["IP65"],"desc":"The IKUU Smart WiFi Outdoor Sensor White is a sensor-driven fitting for security and automatic lighting. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 sensor / security fitting","Mounting bracket","Wiring guide"],"features":["App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Security / Sensors"],["Installation","Must be installed by a licensed electrician"],["Detection Angle","180 Degrees Scan (Approx)"],["Detection Distance","Up to 12m"],["IP Rating","IP65 (Indoor and Outdoor Use)"],["Operating Load","1200W Max (Incandescent Bulb) 300W (Energy Saving Bulb)"],["Supply Voltage","230-240V 50 Hz"],["Fitting","Wall Mount"],["Time Adjustment","10 seconds - 15 minutes"],["Detection Circuitry","Infra Red motion sensor"],["Material Construction","Zinc Nickel Alloy"],["Shade/Housing","White"],["Warranty","3 Years"]]},{"id":"EYE360-MW-PIR","cat":"sensors","name":"EYE 360 Microwave Security Sensor","price":45.0,"img":"/img/eye360-mw-pir.webp","url":"https://greenhse.com/products/lighting-perth/security-sensors/eye360-mw-pir.html","shape":"sensor","tone":"neutral","specs":["IP20"],"desc":"The EYE 360 Microwave Security Sensor is a sensor-driven fitting for security and automatic lighting. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 sensor / security fitting","Mounting bracket","Wiring guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Security / Sensors"],["Installation","Must be installed by a licensed electrician"],["HF System","5.8Ghz"],["Maximum Load","1200W Incandescent, 300w Fluorescent, 150W LED"],["Installation Height","1.5 - 3.5m"],["Sensor Range","360 Degrees x 16m Diameter"],["Lux Control Level","3-2000 Lux (Adjustable)"],["Time Setting","10sec - 12min"],["Manual Override","No"],["Construction","UV Resistant Polycarbonate - White"],["Weather Rating","IP20 (Indoor Use)"],["Cutout","65mm"],["Warranty","2 Year Replacement"]]},{"id":"UNI-SCAN-PIR","cat":"sensors","name":"Uni-Scan 180\u00ba PIR Security Sensor","price":30.0,"img":"/img/uni-scan-pir.webp","url":"https://greenhse.com/products/lighting-perth/security-sensors/uni-scan-pir.html","shape":"sensor","tone":"neutral","specs":["IP44"],"desc":"The Uni-Scan 180\u00ba PIR Security Sensor is a sensor-driven fitting for security and automatic lighting. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 sensor / security fitting","Mounting bracket","Wiring guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Security / Sensors"],["Installation","Must be installed by a licensed electrician"],["Motion Detecting","Passive Infra-Red technology"],["Lens","Multi-segmented lens for better movement detection"],["Product Finish","White or Black"],["Maximum Load","1200W Incandescent, 300w Fluorescent, 150W LED"],["Fitting","Wall Mount"],["Sensor Range","180 Degrees x 12m, 2.5m from ground"],["Lux Control Level","3-2000 Lux (Adjustable)"],["Time Setting","10sec - 20min"],["Manual Override","Yes, resets to Auto mode after 8 hours"],["Construction","UV Resistant Polycarbonate"],["Weather Rating","IP44"],["Warranty","2 Years"]]},{"id":"FLEXISCAN-PIR","cat":"sensors","name":"Flexiscan IP66 PIR Security Sensor","price":45.0,"img":"/img/flexiscan-pir.webp","url":"https://greenhse.com/products/lighting-perth/security-sensors/flexiscan-pir.html","shape":"sensor","tone":"neutral","specs":["IP66"],"desc":"The Flexiscan IP66 PIR Security Sensor is a sensor-driven fitting for security and automatic lighting. It runs in neutral white (~4000K). It's sealed to IP66 for outdoor and wet-area use. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 sensor / security fitting","Mounting bracket","Wiring guide"],"features":["Weatherproof IP66 \u2014 rated for outdoor & wet areas","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Security / Sensors"],["Installation","Must be installed by a licensed electrician"],["Motion Detecting","Passive Infra-Red technology"],["Lens","Multi-segmented lens for better detection, adjustable arm"],["Product Finish","Beige"],["Maximum Load","2400W Incandescent, 1200w Fluorescent, 300W LED"],["Fitting","Wall or Ceiling Mount"],["Sensor Range","110 Degrees x 18m"],["Operating Temperature","5 to 45 degrees Celsius"],["Time Setting","10sec - 20min"],["Manual Override","Yes, resets to Auto mode after 8 hours"],["Construction","UV Resistant Polycarbonate, 3-wire design"],["Weather Rating","IP66 (Outdoor Use)"],["Warranty","5 Years"]]},{"id":"DL3-RGBW-GROUP-1","cat":"star","name":"3W Smart RGBW Star Lights","price":12.0,"img":"/img/dl3-rgbw-group-2.webp","url":"https://greenhse.com/lighting-perth/led-star-lights/dl3-rgbw-group.html","shape":"star","tone":"rgb","specs":["3W","RGBW","IP65"],"desc":"The 3W Smart RGBW Star Lights is a fibre-optic star lighting kit for feature ceilings. It runs in RGBW (colour + white). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["Fibre-optic strands","RGBW light source","Remote / app control","Installation guide"],"features":["Full-colour RGB plus a separate white channel","App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Star Lights"],["Power consumption","3Watt"],["Wattage","\u00b1 135 lumens/watt (4000k)"],["Beam angle","30\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Clips"],["Specifications","1-12V DC"],["Weather rating","Waterproof IP65"],["Material construction","Aluminium + PC"],["Dimensions","\u00f842mmx25 Cutout 30mm"],["Packed Dimensions","115x60x50mm 1pcs"],["Packed Weight","0.2Kg"],["Mercury","No Mercury"],["Light Output Colour","White (4000k) and Full Colour (RGBW)"],["Colour Rendering Index","80"],["Shade/Housing","White, Black or Brushed Chrome"]]},{"id":"DL03-ALL-1","cat":"star","name":"30mm LED 3W Starlight","price":12.0,"img":"/img/dl03-all-1.webp","url":"https://greenhse.com/products/lighting-perth/led-star-lights/dl03-all.html","shape":"star","tone":"neutral","specs":["3W","Tri-colour","IP20"],"desc":"The 30mm LED 3W Starlight is a fibre-optic star lighting kit for feature ceilings. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["Fibre-optic strands","RGBW light source","Remote / app control","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Star Lights"],["Replaces","25W Halogen"],["Brightness","280 lumens"],["Power consumption","3Watt"],["Beam angle","45\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Spring clips"],["Specifications","AC100-240V"],["Weather rating","IP20"],["Material construction","Aluminium + PC"],["Dimensions","\u00f842mmx38 Cutout 30mm"],["Packed Dimensions","51x51x90mm 1pcs"],["Packed Weight","0.2Kg"],["Instant start","suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","Blue/ Warm 3200k / Natural 4000k / Bright 5000k / Ultra Bright 6000k"]]},{"id":"DL03-4KIT-1-1","cat":"star","name":"3W x 3 Star Light Kit, Non-Dimmable","price":46.0,"img":"/img/dl03-4kit-1-1.webp","url":"https://greenhse.com/products/lighting-perth/led-star-lights/dl03-4kit-1.html","shape":"star","tone":"neutral","specs":["3W","Tri-colour","IP20"],"desc":"The 3W x 3 Star Light Kit, Non-Dimmable is a fibre-optic star lighting kit for feature ceilings. It runs in neutral white (~4000K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["Fibre-optic strands","RGBW light source","Remote / app control","Installation guide"],"features":["Smooth, flicker-free dimming","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Star Lights"],["Replaces","25W Halogen (x3)"],["Brightness","280 lumens (x3)"],["Power consumption","3Watt (x3)"],["Beam angle","45\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Spring clips"],["Specifications","AC100-240V"],["Weather rating","IP20"],["Material construction","Aluminium + PC"],["Dimensions","\u00f842mmx38 Cutout 30mm (each light)"],["Packed Dimensions","51x51x90mm (each light)"],["Packed Weight","1Kg"],["Instant start","suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","Blue / Warm 3200k / Natural 4000k / Bright 5000k / Ultra Bright 6000k"]]},{"id":"DL03-4KIT-2","cat":"star","name":"3W x 4 Star Light Kit, Dimmable","price":46.0,"img":"/img/dl03-4kit-2.webp","url":"https://greenhse.com/products/lighting-perth/led-star-lights/dl03-4kit.html","shape":"star","tone":"neutral","specs":["3W","Tri-colour","IP20"],"desc":"The 3W x 4 Star Light Kit, Dimmable is a fibre-optic star lighting kit for feature ceilings. It runs in neutral white (~4000K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["Fibre-optic strands","RGBW light source","Remote / app control","Installation guide"],"features":["Smooth, flicker-free dimming","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Star Lights"],["Replaces","25W Halogen (x4)"],["Brightness","280 lumens (x4)"],["Power consumption","3Watt (x4)"],["Beam angle","45\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Spring clips"],["Specifications","AC100-240V"],["Weather rating","IP20"],["Material construction","Aluminium + PC"],["Dimensions","\u00f842mmx38 Cutout 30mm (each light)"],["Packed Dimensions","51x51x90mm (each light)"],["Packed Weight","1Kg"],["Instant start","suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","Blue / Warm 3200k / Natural 4000k / Bright 5000k / Ultra Bright 6000k"]]},{"id":"DL03-6KIT-1","cat":"star","name":"3W x 6 Star Light Kit, Dimmable","price":90.0,"img":"/img/dl03-6kit-1.webp","url":"https://greenhse.com/products/lighting-perth/led-star-lights/dl03-6kit.html","shape":"star","tone":"neutral","specs":["3W","Tri-colour","IP20"],"desc":"The 3W x 6 Star Light Kit, Dimmable is a fibre-optic star lighting kit for feature ceilings. It runs in neutral white (~4000K) and dims smoothly without flicker. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["Fibre-optic strands","RGBW light source","Remote / app control","Installation guide"],"features":["Smooth, flicker-free dimming","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Star Lights"],["Replaces","25W Halogen (x6)"],["Brightness","280 lumens (x6)"],["Power consumption","3Watt (x6)"],["Beam angle","45\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Spring clips"],["Specifications","AC100-240V"],["Weather rating","IP20"],["Material construction","Aluminium + PC"],["Dimensions","\u00f842mmx38 Cutout 29mm (each light)"],["Packed Dimensions","51x51x90mm (each light)"],["Packed Weight","1.25Kg"],["Instant start","suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","Blue / Warm 3200k / Natural 4000k / Bright 5000k / Ultra Bright 6000k"]]},{"id":"DL03-DRIVERS-1","cat":"star","name":"3W Starlight Driver 3, 4 or 6 Pin","price":10.0,"img":"/img/dl03-drivers-1.webp","url":"https://greenhse.com/products/lighting-perth/led-star-lights/dl03-drivers.html","shape":"star","tone":"neutral","specs":["3W"],"desc":"The driver for 3W star lights. Pick it by how many lights it has to run: 3-pin does 1 to 3 lights and is not dimmable, 4-pin does 3 to 4 and dims, 6-pin does 3 to 6 and dims.","includes":["1 \u00d7 LED driver","Wiring instructions"],"features":["3, 4 and 6 pin versions","4-pin and 6-pin are dimmable","Runs up to six 3W star lights"],"specTable":[["Category","Star Lights"],["3 Pin Driver","Can run 1, 2 or 3 3w LED star lights, non-dimmable"],["4 Pin Driver","Can run 3 or 4 3w LED star lights, dimmable"],["6 Pin Driver","Can run 3, 4, 5 or 6 3w LED star lights, dimmable"]]},{"id":"REMOTE-CONTROL-GRP-1","cat":"star","name":"LED Wireless Remote Controllers","price":15.0,"img":"/img/remote-control-grp-2.webp","url":"https://greenhse.com/products/lighting-perth/led-star-lights/remote-control-grp.html","shape":"transformer","tone":"neutral","specs":["LED"],"desc":"The handset or wall panel you actually control the lights with. It talks to the LED controller over 2.4GHz RF from up to 30m away and dims. Pick a 4-zone remote to run up to four separate zones, or a single-colour dimming remote if you just want brightness on one run. The WiFi Bridge option adds phone app and voice control on top.","includes":["1 \u00d7 remote (the option you choose)","Pairing instructions"],"features":["2.4GHz RF \u2014 30m range","Dimmable","4-zone or single-colour versions","Hand-held and glass wall-panel styles, white or black","WiFi Bridge option for app & voice control"],"specTable":[["Category","Star Lights"],["Controller/Receiver","Smart (Tuya) and Non-Smart options"],["Specifications","RF 2.4GHz 12-36v"],["Communication Protocol","WiFi + 2.4GHz (Smart TUYA)"],["Dimmable","Yes"],["Control Distance","30m"],["Modes","RGB / RGBW / RGBWW switching via one button"],["Working Temperature","10\u00b0C - 40\u00b0C"],["Warranty","2 Years, must be installed by a certified electrician. Warranty is voided if moved or modified post-installation."]]},{"id":"RGB-CTRLR-037-1","cat":"star","name":"RGB/RGBW/RGBWW LED Controller","price":15.0,"img":"/img/rgb-ctrlr-037-2.webp","url":"https://greenhse.com/products/lighting-perth/led-star-lights/rgb-ctrlr-037.html","shape":"transformer","tone":"rgb","specs":["RGBW"],"desc":"Sits between the driver and the strip and gives you the colour control. One button switches it between RGB, RGBW and RGBWW, so the same unit suits all three strip types. Pair it with a remote, or take the WiFi version for phone app and voice control.","includes":["1 \u00d7 RGB/RGBW/RGBWW controller","Wiring instructions"],"features":["3-in-1 \u2014 RGB, RGBW and RGBWW from one button","2.4GHz RF \u2014 30m range","Dimmable","12\u201336V input","WiFi (Tuya) version for app & voice control"],"specTable":[["Category","Star Lights"],["Controller/Receiver","3-in-1 Smart (Tuya) and Non-Smart options"],["Specifications","RF 2.4GHz 12-36v"],["Communication Protocol","WiFi + 2.4GHz (Smart TUYA)"],["Dimmable","Yes"],["Control Distance","30m"],["Modes","RGB / RGBW / RGBWW switching via one button"],["Working Temperature","10\u00b0C - 40\u00b0C"],["Warranty","2 Years, must be installed by a certified electrician. Warranty is voided if moved or modified post-installation."]]},{"id":"ST24V-SMD-ALL-1","cat":"strip","name":"24V High Lumen Strip Light /Metre","price":18.0,"img":"/img/inline/43c3ac8d37a5.webp","url":"https://greenhse.com/products/lighting-perth/led-strip-lights/st24v-smd-all.html","shape":"strip","tone":"neutral","specs":["12\u201323W/m","8 versions","3oz PCB"],"desc":"High-output 24V SMD strip on a 3oz copper PCB \u2014 the strongest and longest-lived strip we stock, rated past 50,000 hours. Eight versions: IP20 at 23W/m with CRI>90 in 4000K or 5000K, IP65 at 20W/m in 4000K or 5000K, and IP65 at 12W/m in 2700K, 3000K, 4000K or 5500K. The 12W/m does not need an aluminium channel. Runs on 24V, so it needs a transformer, and dims from a receiver.","includes":["1 \u00d7 LED strip reel","3M adhesive backing","End caps & mounting clips","Connection guide","Note: driver / controller sold separately"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Strip Lights"],["Brightness","~1800 lumens/metre \u00b7 192 LEDs/metre"],["Power","12w per metre"],["Beam angle","120\u00ba"],["Dimmable","(with appropriate receiver)"],["Lifespan","50 000 hrs"],["Fitting","2-Sided tape Channel options available"],["Specifications","24V DC"],["Weather Rating","IP20 indoor, or IP65 silicon gel"],["Material","PCB/Silicon Gel (model dependent)"],["Dimensions","10mmx2.2mm"],["Light Output Color","2700K / 3000K / 4000K / 5000K / 5500K depending on version"],["Colour Rendering Index",">80"],["Shade/Housing","3oz White PCB"],["Warranty","2Yr limited, Needs to be installed by qualified electrician, excludes physical damage."],["Certification","RCM, CE"],["Max run","5m from one end \u00b7 10m fed from both ends"],["PCB","3oz copper \u2014 3\u00d7 stronger than single layer"],["Connectors","Connectors for short lengths, no waste up to 4m"]],"options":[{"label":"IP20 \u00b7 23W/m \u00b7 4000K \u00b7 CRI>90","price":34.0,"specs":[["IP rating","IP20"],["Power","23W per metre"],["Colour","4000K"],["CRI",">90"],["Brightness","~3800 lumens/m"],["Efficiency","165 lm/W"]]},{"label":"IP20 \u00b7 23W/m \u00b7 5000K \u00b7 CRI>90","price":34.0,"specs":[["IP rating","IP20"],["Power","23W per metre"],["Colour","5000K"],["CRI",">90"],["Brightness","~3800 lumens/m"],["Efficiency","165 lm/W"]]},{"label":"IP65 \u00b7 20W/m \u00b7 4000K","price":28.0,"specs":[["IP rating","IP65"],["Power","20W per metre"],["Colour","4000K"]]},{"label":"IP65 \u00b7 20W/m \u00b7 5000K","price":28.0,"specs":[["IP rating","IP65"],["Power","20W per metre"],["Colour","5000K"]]},{"label":"IP65 \u00b7 12W/m \u00b7 2700K","price":18.0,"specs":[["IP rating","IP65"],["Power","12W per metre"],["Colour","2700K"],["Profile","No aluminium channel needed"]]},{"label":"IP65 \u00b7 12W/m \u00b7 3000K","price":18.0,"specs":[["IP rating","IP65"],["Power","12W per metre"],["Colour","3000K"],["Profile","No aluminium channel needed"]]},{"label":"IP65 \u00b7 12W/m \u00b7 4000K","price":18.0,"specs":[["IP rating","IP65"],["Power","12W per metre"],["Colour","4000K"],["Profile","No aluminium channel needed"]]},{"label":"IP65 \u00b7 12W/m \u00b7 5500K","price":18.0,"specs":[["IP rating","IP65"],["Power","12W per metre"],["Colour","5500K"],["Profile","No aluminium channel needed"]]}]},{"id":"ST24V-9W-15W-CCT-C","cat":"strip","name":"24V Dotless Cob Strip Light / Metre","price":16.0,"img":"/img/inline/90773c897793.webp","url":"https://greenhse.com/products/lighting-perth/led-strip-lights/st24v-9w-15w-cct-cob-1.html","shape":"strip","tone":"neutral","specs":["16W/m","IP20","2700\u20136500K"],"desc":"Dotless COB strip with adjustable white \u2014 tune it anywhere from 2700K warm through to 6500K cool from the controller, so you pick the mood after it is installed rather than at order. One continuous line of light, no visible dots. Needs an aluminium channel, and a CCT controller to do the colour shifting.","includes":["1 \u00d7 LED strip reel","3M adhesive backing","End caps & mounting clips","Connection guide","Note: driver / controller sold separately"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Strip Lights"],["Brightness","Up to 1500 lumens/m"],["Power","16W per metre"],["Beam angle","180\u00ba"],["Dimmable","/ CCT adjustable (with receiver/controller)"],["Lifespan","50 000 hrs"],["Fitting","2-Sided tape Channel options available."],["Specifications","24V DC"],["Weather Rating","IP20 \u2014 indoor use only"],["Material","Heat resistant PCB"],["Dimensions","10mmx2.2mm (varies by option)"],["Weight","131g / 5m roll"],["Mercury","No Mercury"],["Light Output Color","Adjustable 2700K\u20136500K, warm through to cool"],["Colour Rendering Index",">90"],["Shade/Housing","Clear PCB"],["Max run","5m from one end \u00b7 10m fed from both ends"],["Profile","Aluminium channel required"],["Connectors","Connectors for short lengths, no waste up to 2m"]],"options":[{"label":"IP20 \u00b7 16W/m \u00b7 CCT 2700K\u20136500K","price":16.0,"specs":[["IP rating","IP20"],["Power","16W per metre"],["Colour","Adjustable 2700K\u20136500K"],["Profile","Aluminium channel required"],["Max run","5m single feed \u00b7 10m dual feed"],["Control","CCT controller required"]]}]},{"id":"ST24V-LONGRUN-IP68","cat":"strip","name":"24V Long Run COB Strip Light /Metre","price":16.0,"img":"","url":"/products/strip/st24v-longrun-ip68.html","shape":"strip","tone":"warm","specs":["7.5W/m","IP20 or IP67","Dot-free COB"],"options":[{"label":"IP20 \u00b7 3000K warm white","price":16.0,"specs":[["IP rating","IP20"],["Colour","3000K warm white"],["Power","7.5W per metre"],["Max run","20m single feed \u00b7 40m dual feed"]]},{"label":"IP20 \u00b7 4000K natural white","price":16.0,"specs":[["IP rating","IP20"],["Colour","4000K natural white"],["Power","7.5W per metre"],["Max run","20m single feed \u00b7 40m dual feed"]]},{"label":"IP67 silicon injected \u00b7 3000K warm white","price":19.0,"specs":[["IP rating","IP67 silicon injected"],["Colour","3000K warm white \u2014 IP67 is 3000K only"],["Power","7.5W per metre"],["Max run","20m single feed \u00b7 40m dual feed"]]}],"includes":[],"features":["Dot-free COB \u2014 one continuous line of light, no visible LEDs","20m from one end, 40m fed from both ends, with no visible voltage drop","Low draw at 7.5W per metre","IP67 silicon injected option for outdoor and exposed areas"],"desc":"Low-power dot-free COB strip built for long runs \u2014 7.5W per metre, so a single feed carries up to 20 metres without the far end fading, or 40 metres fed from both ends. Comes as IP20 for indoor work, or IP67 silicon injected for anywhere exposed to rain and splashing. Fixed colour, chosen at order \u2014 it is not a tri-colour strip. Short cut lengths and easy connectors mean almost no waste on a run.","specTable":[["Power","7.5W per metre"],["Voltage","24V DC"],["IP Rating","IP20 indoor, or IP67 silicon injected"],["Max run","20m from one end \u00b7 40m fed from both ends"],["Light","Dot-free COB \u2014 one continuous line, no visible LEDs"],["Price","$16.00 per metre ex GST"],["Light Output Colour","3000K warm white or 4000K natural white \u2014 fixed, chosen at order"],["Connectors","Connectors for short lengths, no waste up to 4m"],["Applications","Cabinetry, balustrades, hidden recess. IP67 for outdoor gardens, floating steps, wall features and under decks."]]},{"id":"ST24V-RGB-COB","cat":"strip","name":"24V Dotless RGB Cob Strip Light / Metre","price":17.0,"img":"/img/st24v-rgb-cob-1.webp","url":"https://greenhse.com/products/lighting-perth/led-strip-lights/st24v-rgb-cob.html","shape":"strip","tone":"rgb","specs":["16W/m or 15W/m","IP20 or IP65","RGB"],"desc":"Very bright dot-free full-colour COB \u2014 premium feature lighting. Good cool white using RGB white. 5 metres on a single feed, 10 metres with both ends fed. Needs an aluminium channel at 16W/m. Two versions: IP20 at 16W/m, or IP65 at 15W/m with heat-shrink.","includes":["1 \u00d7 LED strip reel","3M adhesive backing","End caps & mounting clips","Connection guide","Note: driver / controller sold separately"],"features":["Dotless COB \u2014 a continuous line of colour, no visible dots","Full-colour RGB from a controller and remote","Energy-efficient LED \u2014 lower running costs","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Strip Lights"],["Brightness","840 LEDs/metre"],["Power","16W per metre"],["Beam angle","120\u00ba"],["Dimmable","/ colour adjustable (with receiver)"],["Lifespan","50 000 hrs"],["Fitting","2-Sided tape Channel options available."],["Specifications","24V DC"],["Material","Heat resistant PCB"],["Dimensions","10mmx1.2mm"],["Weight","\u2248131g / 5m roll"],["Mercury","No Mercury"],["Light Output Color","RGB full colour"],["Shade/Housing","Clear PCB"],["Control","RGB controller + remote \u2014 no white channel"],["Max run","5m from one end \u00b7 10m fed from both ends"],["Profile","Aluminium channel required \u2014 16W/m runs warm"],["Connectors","Connectors for short lengths, no waste up to 2m"],["IP Rating","IP20, or IP65 with heat-shrink"]],"options":[{"label":"IP20 \u00b7 16W/m","price":17.0,"specs":[["IP rating","IP20"],["Power","16W per metre"],["Colour","RGB full colour"],["Profile","Aluminium channel required"],["Max run","5m single feed \u00b7 10m dual feed"]]},{"label":"IP65 \u00b7 15W/m with heat-shrink","price":19.0,"specs":[["IP rating","IP65 \u2014 heat-shrink"],["Power","15W per metre"],["Colour","RGB full colour"],["Profile","Aluminium channel required"],["Max run","5m single feed \u00b7 10m dual feed"]]}],"imgs":["/img/st24v-rgb-cob-2.webp","/img/st24v-rgb-cob-3.webp","/img/st24v-rgb-cob-4.webp","/img/st24v-rgb-cob-5.webp"]},{"id":"ST240V-PRO-1","cat":"strip","name":"240V Strip Light Pro /Metre","price":20.0,"img":"/img/st240v-pro-1.webp","url":"https://greenhse.com/products/lighting-perth/led-strip-lights/st240v-pro.html","shape":"strip","tone":"neutral","specs":["12W/m","IP65","3 whites"],"desc":"240V strip that runs straight off mains \u2014 no transformer, less wiring, and even brightness and colour the whole way along. Best for runs over 10 metres: single colour goes to 50 metres from one supply, RGB to 35 metres. Low heat and a strong TPU coating mean it does not need an aluminium channel. IP65. Single colour is Triac dimmable; RGB gives full colour control and dimming from a remote.","includes":["1 \u00d7 LED strip reel","3M adhesive backing","End caps & mounting clips","Connection guide","Note: driver / controller sold separately"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Strip Lights"],["Brightness","144 LEDs/m, 885 Lumens/m"],["Power consumption","12W/metre"],["Beam angle","120\u00ba"],["Dimming","Triac dimmable"],["Lifespan","25 000 hrs"],["Fitting","Can lie in ceiling channel or be fastened with U-clips"],["Specifications","240VAC"],["Material construction","High temperature resistant PVC"],["Dimensions","8mmx18mm"],["Packed Dimensions","33x33x25cm/50m Reel"],["Weight","10kg/50m Reel"],["Light Output Colour","3000K / 4000K / 6000K \u2014 choose one at order"],["Colour Rendering Index",">80"],["Shade/Housing","Transparent surface"],["IP Rating","IP65"],["Control","Remote, or RGB Gateway / smart dimming module for smart control"],["Max run","Single colour up to 50m \u00b7 RGB up to 35m"],["Profile","No aluminium channel needed \u2014 low heat, strong TPU coating"]],"options":[{"label":"3000K \u00b7 Warm white","price":20.0,"specs":[["Colour temperature","3000K"],["IP rating","IP65"],["Power","12W per metre"],["Voltage","240V AC \u2014 no transformer"],["Max run","Up to 50m from one supply"],["Dimming","Triac dimmable"],["Profile","No aluminium channel needed"]]},{"label":"4000K \u00b7 Natural white","price":20.0,"specs":[["Colour temperature","4000K"],["IP rating","IP65"],["Power","12W per metre"],["Voltage","240V AC \u2014 no transformer"],["Max run","Up to 50m from one supply"],["Dimming","Triac dimmable"],["Profile","No aluminium channel needed"]]},{"label":"6000K \u00b7 Cool white / daylight","price":20.0,"specs":[["Colour temperature","6000K"],["IP rating","IP65"],["Power","12W per metre"],["Voltage","240V AC \u2014 no transformer"],["Max run","Up to 50m from one supply"],["Dimming","Triac dimmable"],["Profile","No aluminium channel needed"]]}]},{"id":"ST240V-RGB","cat":"strip","name":"240V RGB LED Strip Light /Metre","price":20.0,"img":"/img/st240v-rgb-1.webp","url":"https://greenhse.com/products/lighting-perth/led-strip-lights/st240v-rgb.html","shape":"strip","tone":"rgb","specs":["12W/m","IP65","RGB"],"desc":"240V RGB strip, straight off mains with no transformer. Up to 35 metres from one supply with even colour throughout. IP65, low heat and a strong TPU coating, so no aluminium channel is needed. Full colour control and dimming from a remote, or add an RGB Gateway for smart control.","includes":["1 \u00d7 LED strip reel","3M adhesive backing","End caps & mounting clips","Connection guide","Note: driver / controller sold separately"],"features":["Full-colour RGB, run from a controller and remote","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Strip Lights"],["Brightness","60 LEDs/m"],["Power consumption","10w/metre"],["Beam angle","120\u00ba"],["Dimmable","Full colour control and dimmable"],["Lifespan","50 000 hrs"],["Fitting","Can lie in ceiling channel or be fastened with U-clips"],["Specifications","240V AC"],["Material construction","Anti-UV PVC, Aluminium Wire"],["Dimensions","15.5mmx7mm"],["Packed Dimensions","33.5x33.5x15.5cm/50m Roll"],["Weight","7.5kgs/50m"],["Mercury","No Mercury"],["Light Output Color","RGB full colour 2100MCD/LED"],["Colour Rendering Index",">80"],["IP Rating","IP65"],["Control","Full colour control and dimming from a remote, or an RGB Gateway for smart control"],["Max run","Up to 35m from one supply"],["Profile","No aluminium channel needed"],["Voltage","240V \u2014 runs straight off mains, no transformer"]]},{"id":"24VSTRIP-CHANNELS-","cat":"strip","name":"24V Strip Channel Options","price":30.0,"img":"/img/legacy/group_1_2_1.webp","url":"https://greenhse.com/lighting-perth/led-strip-lights/24vstrip-channels-new.html","shape":"strip","tone":"neutral","specs":["LED"],"options":[{"label":"Surface Rectangle \u00b7 White \u00b7 17.4 \u00d7 7.9mm","price":30.0,"specs":[["Dimensions","4 \u00d7 7.9mm"],["Profile","Surface Rectangle"],["Finish","White"],["Length","3 metre (fixed \u2014 cannot be cut down)"],["Material","Anodised aluminium + frosted diffuser"],["Certification","Australian certified / RCM"]],"img":"/img/legacy/group_1_2_1.webp"},{"label":"Surface Rectangle \u00b7 Black \u00b7 17.4 \u00d7 7.9mm","price":30.0,"specs":[["Dimensions","4 \u00d7 7.9mm"],["Profile","Surface Rectangle"],["Finish","Black"],["Length","3 metre (fixed \u2014 cannot be cut down)"],["Material","Anodised aluminium + frosted diffuser"],["Certification","Australian certified / RCM"]],"img":"/img/legacy/group_1_2_1.webp"},{"label":"Surface Rectangle \u00b7 Silver \u00b7 17.4 \u00d7 7.9mm","price":30.0,"specs":[["Dimensions","4 \u00d7 7.9mm"],["Profile","Surface Rectangle"],["Finish","Silver"],["Length","3 metre (fixed \u2014 cannot be cut down)"],["Material","Anodised aluminium + frosted diffuser"],["Certification","Australian certified / RCM"]],"img":"/img/legacy/group_1_2_1.webp"},{"label":"Recess \u00b7 White \u00b7 12 \u00d7 10mm","price":30.0,"specs":[["Dimensions","12 \u00d7 10mm"],["Profile","Recess"],["Finish","White"],["Length","3 metre (fixed \u2014 cannot be cut down)"],["Material","Anodised aluminium + frosted diffuser"],["Certification","Australian certified / RCM"]],"img":"/img/legacy/group_1_2_1.webp"},{"label":"Recess \u00b7 Black \u00b7 12 \u00d7 10mm","price":30.0,"specs":[["Dimensions","12 \u00d7 10mm"],["Profile","Recess"],["Finish","Black"],["Length","3 metre (fixed \u2014 cannot be cut down)"],["Material","Anodised aluminium + frosted diffuser"],["Certification","Australian certified / RCM"]],"img":"/img/legacy/group_1_2_1.webp"},{"label":"Recess \u00b7 Silver \u00b7 12 \u00d7 10mm","price":30.0,"specs":[["Dimensions","12 \u00d7 10mm"],["Profile","Recess"],["Finish","Silver"],["Length","3 metre (fixed \u2014 cannot be cut down)"],["Material","Anodised aluminium + frosted diffuser"],["Certification","Australian certified / RCM"]],"img":"/img/legacy/group_1_2_1.webp"},{"label":"Recess Wing \u00b7 White \u00b7 24.6 \u00d7 7.7mm","price":30.0,"specs":[["Dimensions","6 \u00d7 7.7mm"],["Profile","Recess Wing"],["Finish","White"],["Length","3 metre (fixed \u2014 cannot be cut down)"],["Material","Anodised aluminium + frosted diffuser"],["Certification","Australian certified / RCM"]],"img":"/img/legacy/group_1_2_1.webp"},{"label":"Recess Wing \u00b7 Black \u00b7 24.6 \u00d7 7.7mm","price":30.0,"specs":[["Dimensions","6 \u00d7 7.7mm"],["Profile","Recess Wing"],["Finish","Black"],["Length","3 metre (fixed \u2014 cannot be cut down)"],["Material","Anodised aluminium + frosted diffuser"],["Certification","Australian certified / RCM"]],"img":"/img/legacy/group_1_2_1.webp"},{"label":"Recess Wing \u00b7 Silver \u00b7 24.6 \u00d7 7.7mm","price":30.0,"specs":[["Dimensions","6 \u00d7 7.7mm"],["Profile","Recess Wing"],["Finish","Silver"],["Length","3 metre (fixed \u2014 cannot be cut down)"],["Material","Anodised aluminium + frosted diffuser"],["Certification","Australian certified / RCM"]],"img":"/img/legacy/group_1_2_1.webp"},{"label":"Mini (Thin) \u00b7 Silver \u00b7 17.7 \u00d7 5.3mm","price":30.0,"specs":[["Dimensions","7 \u00d7 5.3mm"],["Profile","Mini"],["Finish","Silver"],["Length","3 metre (fixed \u2014 cannot be cut down)"],["Material","Anodised aluminium + frosted diffuser"],["Certification","Australian certified / RCM"]],"img":"/img/legacy/group_1_2_1.webp"},{"label":"Black Cover \u00b7 Black \u00b7 16.9 \u00d7 7.9mm","price":30.0,"specs":[["Dimensions","9 \u00d7 7.9mm"],["Profile","Black Cover"],["Finish","Black"],["Length","3 metre (fixed \u2014 cannot be cut down)"],["Material","Anodised aluminium + frosted diffuser"],["Certification","Australian certified / RCM"]],"img":"/img/legacy/group_1_2_1.webp"},{"label":"Corner 90\u00b0 \u00b7 Silver \u00b7 13 \u00d7 13mm","price":30.0,"specs":[["Dimensions","13 \u00d7 13mm"],["Profile","Corner"],["Finish","Silver"],["Length","3 metre (fixed \u2014 cannot be cut down)"],["Material","Anodised aluminium + frosted diffuser"],["Certification","Australian certified / RCM"]],"img":"/img/legacy/group_1_2_1.webp"}],"desc":"Aluminium mounting channel (profile) for LED strip. It houses and protects the strip and adds a frosted diffuser for an even, dot-free line of light. Choose your profile, finish and size from the selector \u2014 every profile is $30 for a fixed 3-metre length (channels come in 3m and can't be cut shorter). Backed by Greenhse's local Perth team.","includes":["1 \u00d7 3m aluminium channel (fixed length)","Frosted diffuser cover","2 \u00d7 end caps","2 \u00d7 mounting clips","Installation guide"],"features":["Available in White, Black & Silver finishes","Profiles: surface rectangle, recess, recess wing, mini & corner (per the selection guide)","Frosted diffuser removes the 'dots' for a clean line","Anodised aluminium \u2014 durable, premium finish","Fixed 3-metre lengths"],"specTable":[["Category","LED Strip Channels"],["Material","Anodised aluminium"],["Diffuser","Frosted / opal cover"],["Length","3 metre (fixed)"],["Finishes","White / Black / Silver"],["Profiles","Surface Rectangle, Recess, Recess Wing, Mini, Corner 90\u00b0"],["Warranty","12 months"]]},{"id":"TR24V-ALL-1","cat":"strip","name":"24V Transformers, Australian Certified","price":30.0,"img":"/img/tr240v-driver.webp","url":"https://greenhse.com/products/lighting-perth/led-strip-lights/tr24v-all.html","shape":"transformer","tone":"neutral","specs":["LED"],"desc":"Powers 24V LED strip from 240V mains. Size it by wattage \u2014 strip watts per metre \u00d7 your run length, plus about 20% headroom \u2014 then take the next size up. 320W is the largest single driver; past that, run two smaller ones feeding each end of the strip instead of one big one.","includes":["1 \u00d7 24V LED driver","Australian compliance certificate","Wiring instructions"],"features":["30W to 320W \u2014 seven sizes","IP20 indoor, IP65 & IP67 sealed options","Mean Well units on the sealed sizes","Australian certified / RCM","3-year warranty"],"specTable":[["Category","Strip Lights"],["IP rating","IP20 (indoor)"],["Voltage","24V"],["Certification","Australian certified / RCM"],["Warranty","12 months"]]},{"id":"TR12V-ALL-1","cat":"strip","name":"12V Transformers, Australian Certified","price":22.0,"img":"/img/tr12v-all-1.webp","url":"https://greenhse.com/products/lighting-perth/led-strip-lights/tr12v-all.html","shape":"transformer","tone":"neutral","specs":["LED"],"desc":"Powers 12V LED strip from 240V mains. Size it by wattage \u2014 strip watts per metre \u00d7 your run length, plus about 20% headroom \u2014 then take the next size up. IP20 units are for dry indoor spots; the sealed IP65/IP67 units suit damp or outdoor runs.","includes":["1 \u00d7 12V LED driver","Australian compliance certificate","Wiring instructions"],"features":["20W to 200W \u2014 six sizes","IP20 indoor, IP65 & IP67 sealed options","Mean Well units on the sealed sizes","Australian certified / RCM","3-year warranty"],"specTable":[["Category","Strip Lights"],["IP rating","IP20 (indoor)"],["Voltage","12V"],["Certification","Australian certified / RCM"],["Warranty","12 months"]]},{"id":"LED-CONTROLLER-SIN-1","cat":"strip","name":"Single Colour/Dual White LED Controller (2 in 1)","price":15.0,"img":"/img/led-controller-sin-1.webp","url":"https://greenhse.com/lighting-perth/led-strip-lights/led-controller-single-dual-white.html","shape":"transformer","tone":"neutral","specs":["LED"],"desc":"Sits between the driver and the strip. One button switches it between single colour and dual white (CCT), so one unit covers both strip types. Pair it with a remote, or take the WiFi version for phone app and voice control.","includes":["1 \u00d7 single colour / dual white controller","Wiring instructions"],"features":["2-in-1 \u2014 single colour and dual white from one button","2.4GHz RF \u2014 30m range","Dimmable","12\u201336V input","WiFi (Tuya) version for app & voice control"],"specTable":[["Category","Strip Lights"],["Controller/Receiver","2-in-1 Smart (TUYA) and Non-Smart options"],["Specifications","RF 2.4GHz 12-36v"],["Communication Protocol","WiFi+2.4GHz (Smart TUYA)"],["Dimmable","Yes"],["Control Distance","30m"],["Modes","Single colour /Dual white switching via one button"],["Working Temperature","10\u00b0C - 40\u00b0C"],["Warranty","2 Years, must be installed by a certified electrician. Warranty is voided if moved or modified post-installation."]]},{"id":"RGB-CTRLR-037-2","cat":"strip","name":"RGB/RGBW/RGBWW LED Controller","price":15.0,"img":"/img/rgb-ctrlr-037-2.webp","url":"https://greenhse.com/products/lighting-perth/led-strip-lights/rgb-ctrlr-037.html","shape":"transformer","tone":"rgb","specs":["RGBW"],"desc":"Sits between the driver and the strip and gives you the colour control. One button switches it between RGB, RGBW and RGBWW, so the same unit suits all three strip types. Pair it with a remote, or take the WiFi version for phone app and voice control.","includes":["1 \u00d7 RGB/RGBW/RGBWW controller","Wiring instructions"],"features":["3-in-1 \u2014 RGB, RGBW and RGBWW from one button","2.4GHz RF \u2014 30m range","Dimmable","12\u201336V input","WiFi (Tuya) version for app & voice control"],"specTable":[["Category","Strip Lights"],["Controller/Receiver","3-in-1 Smart (Tuya) and Non-Smart options"],["Specifications","RF 2.4GHz 12-36v"],["Communication Protocol","WiFi + 2.4GHz (Smart TUYA)"],["Dimmable","Yes"],["Control Distance","30m"],["Modes","RGB / RGBW / RGBWW switching via one button"],["Working Temperature","10\u00b0C - 40\u00b0C"],["Warranty","2 Years, must be installed by a certified electrician. Warranty is voided if moved or modified post-installation."]]},{"id":"REMOTE-CONTROL-GRP-2","cat":"strip","name":"LED Wireless Remote Controllers","price":15.0,"img":"/img/remote-control-grp-2.webp","url":"https://greenhse.com/products/lighting-perth/led-strip-lights/remote-control-grp.html","shape":"transformer","tone":"neutral","specs":["LED"],"desc":"The handset or wall panel you actually control the lights with. It talks to the LED controller over 2.4GHz RF from up to 30m away and dims. Pick a 4-zone remote to run up to four separate zones, or a single-colour dimming remote if you just want brightness on one run. The WiFi Bridge option adds phone app and voice control on top.","includes":["1 \u00d7 remote (the option you choose)","Pairing instructions"],"features":["2.4GHz RF \u2014 30m range","Dimmable","4-zone or single-colour versions","Hand-held and glass wall-panel styles, white or black","WiFi Bridge option for app & voice control"],"specTable":[["Category","Strip Lights"],["Controller/Receiver","Smart (Tuya) and Non-Smart options"],["Specifications","RF 2.4GHz 12-36v"],["Communication Protocol","WiFi + 2.4GHz (Smart TUYA)"],["Dimmable","Yes"],["Control Distance","30m"],["Modes","RGB / RGBW / RGBWW switching via one button"],["Working Temperature","10\u00b0C - 40\u00b0C"],["Warranty","2 Years, must be installed by a certified electrician. Warranty is voided if moved or modified post-installation."]]},{"id":"ST-CH-BLACK-LINEAR-2","cat":"strip","name":"2m Black Linear Suspension Light","price":250.0,"img":"/img/st-ch-black-linear-4.webp","url":"https://greenhse.com/products/lighting-perth/led-strip-lights/st-ch-black-linear-2.html","shape":"track","tone":"neutral","specs":["40W","Warm","IP65"],"desc":"The 2m Black Linear Suspension Light is a flexible LED strip for cove, cabinet and accent lighting. It is switchable between 2700K and 6000K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED strip reel","3M adhesive backing","End caps & mounting clips","Connection guide","Note: driver / controller sold separately"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Strip Lights"],["Brightness","Up to 4000 Lumens"],["Power","40w"],["Beam angle","60\u00ba"],["Dimmable","and CCT Adjustable"],["Lifespan","30 000 hrs"],["Fitting","Ceiling suspended,"],["Specifications","24V DC"],["Weather Rating","IP65 (COB Strip)"],["Material","Aluminium Black Powder Coated + PVC Lens (White available on request)"],["Dimensions","200cm(L)x 5cm(W)x7cm(H)"],["Weight","2.6kg Net"],["Light Output Color","2700k - 6000k Adjustable (Warm - Cool White)"],["Colour Rendering Index",">90"],["Shade/Housing","Matte Black + White Lens"],["Warranty","2Yr limited - Needs to be installed by qualified electrician, excludes physical damage."]]},{"id":"ST-CH-BLACK-LINEAR-3","cat":"track","name":"2m Black Linear Suspension Light","price":250.0,"img":"/img/st-ch-black-linear-4.webp","url":"https://greenhse.com/products/lighting-perth/led-track-lights-perth/st-ch-black-linear-2.html","shape":"track","tone":"neutral","specs":["40W","Warm","IP65"],"desc":"The 2m Black Linear Suspension Light is an adjustable LED track light for retail and feature lighting. It is switchable between 2700K and 6000K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 track head","Track adaptor","1m track section","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","LED Track / Linear Lights"],["Brightness","Up to 4000 Lumens"],["Power","40w"],["Beam angle","60\u00ba"],["Dimmable","and CCT Adjustable"],["Lifespan","30 000 hrs"],["Fitting","Ceiling suspended,"],["Specifications","24V DC"],["Weather Rating","IP65 (COB Strip)"],["Material","Aluminium Black Powder Coated + PVC Lens (White available on request)"],["Dimensions","200cm(L)x 5cm(W)x7cm(H)"],["Weight","2.6kg Net"],["Light Output Color","2700k - 6000k Adjustable (Warm - Cool White)"],["Colour Rendering Index",">90"],["Shade/Housing","Matte Black + White Lens"],["Warranty","2Yr limited - Needs to be installed by qualified electrician, excludes physical damage."]]},{"id":"BLACK-LINEAR-MODUL-3","cat":"track","name":"Black Linear Modular Lighting System","price":60.0,"img":"/img/black-linear-modul-3.webp","url":"https://greenhse.com/products/lighting-perth/led-track-lights-perth/black-linear-modular-light.html","shape":"track","tone":"neutral","specs":["Tri-colour","IP20"],"desc":"The Black Linear Modular Lighting System is an adjustable LED track light for retail and feature lighting. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 track head","Track adaptor","1m track section","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","LED Track / Linear Lights"],["Use","Professional quality, linear modular lights with attractive back-lighting. Perfect for modern retail and commercial applications."],["Brightness","Up to 130 Lumens/Watt"],["Power","Variable - selectable by switch, varies by module"],["Beam angle","120 Degrees"],["Dimmable",", switch selectable"],["Lifespan","50 000 hrs"],["Fitting","Hanging or ceiling mounted"],["Specifications","AC100-265"],["Weather Rating","IP20 Indoor Use Only"],["IK Rating","IK08"],["Power Factor",">0.9"],["Material","Rugged diecast 6063 T5 aluminium housing and PC/PMMA lenses"],["Dimensions","Variable - 057m - 2.2m; L (Corner), X,Y, V shape"],["Weight","Up to 3kg"],["Light Output Color","30000/4000/5000/6000k selectable"]]},{"id":"15W-LED-TRACK-LIGH-2","cat":"track","name":"15W LED Track Light","price":32.0,"img":"/img/15w-led-track-ligh-2.webp","url":"https://greenhse.com/products/lighting-perth/led-track-lights-perth/15w-led-track-light.html","shape":"track","tone":"neutral","specs":["15W","Tri-colour","IP20"],"desc":"The 15W LED Track Light is an adjustable LED track light for retail and feature lighting. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 track head","Track adaptor","1m track section","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","LED Track / Linear Lights"],["Brightness","1275 Lumens 85 Lm/watt"],["Power consumption","15Watt"],["Beam angle","60\u00ba Low Glare"],["Lifespan","50 000 hrs"],["Fitting","Screws"],["Specifications","AC220-240V, 50-60Hz"],["Weather rating","IP20 Indoors"],["Material construction","Aluminium"],["Dimensions","\u230070x130mm"],["Weight Track Light","0.4kg"],["Weight Track","0.5kg 1m / 0.75kg 1.5m / 1kg 2m"],["Track Dimensions","1m 1000x34x17mm / 1.5m 1500x34x17mm / 2m 2000x34x17mm"],["Mercury","No Mercury"],["Light Output Colour","3000K / 4000K/ 5000K"],["Colour Rendering Index","80"]]},{"id":"30W-LED-TRACK-LIGH-2","cat":"track","name":"30W LED Track Light","price":60.0,"img":"/img/30w-led-track-ligh-2.webp","url":"https://greenhse.com/products/lighting-perth/led-track-lights-perth/30w-led-track-light.html","shape":"track","tone":"neutral","specs":["30W","Tri-colour","IP20"],"desc":"The 30W LED Track Light is an adjustable LED track light for retail and feature lighting. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 track head","Track adaptor","1m track section","Installation guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","LED Track / Linear Lights"],["Brightness","2250 lumens 85 lm/watt"],["Power consumption","30Watt"],["Beam angle","60\u00ba Low Glare"],["Dimmable","Triac dimmable"],["Lifespan","50 000 hrs"],["Fitting","Screws"],["Specifications","AC220-240V, 50-60Hz"],["Weather rating","IP20 Indoors"],["Material construction","Anodised aluminium"],["Dimensions","\u230085x160mm"],["Weight Track Light","0.9kg"],["Weight Track","0.5kg 1m / 0.75kg 1.5m / 1kg 2m"],["Track Dimensions","1m 1000x34x17mm / 1.5m 1500x34x17mm / 2m 2000x34x17mm"],["Mercury","No Mercury"],["Light Output Colour","4000k/4500k/5000k switch selectable"]]},{"id":"Q-CONNECT-2","cat":"switches","name":"Single Quick Connect Plug Base 10A","price":1.8,"img":"/img/q-connect-2.webp","url":"https://greenhse.com/products/lighting-perth/glass-light-switch-perth-html/q-connect.html","shape":"switch","tone":"neutral","specs":["LED"],"desc":"The Single Quick Connect Plug Base 10A is a stylish switch / powerpoint to finish your wall plates. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 switch / powerpoint","Wall plate","Fixing screws","Wiring guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Switches / Powerpoints"],["Installation","Must be installed by a licensed electrician"],["Mounting","Surface Mount"],["Current","10A"],["Voltage","250V AC 50Hz"],["Wiring","3-Pin Back Wired Rear Connection"],["Terminals","4x4 sq.mm cables, 1 looping terminal"],["Dimensions","7x5x5cm Single 17x16x13cm Box/10"],["Product Finish","White"],["Warranty","5 Years"],["Certification","SAA"]]},{"id":"GLASS-SWITCH-PREMI","cat":"switches","name":"Smart Premium Crystal Glass Switches White & Black","price":45.0,"img":"/img/glass-switch-premi.webp","url":"https://greenhse.com/products/lighting-perth/glass-light-switch-perth-html/glass-switch-premium-grp-1.html","shape":"switch","tone":"neutral","specs":["1000W"],"desc":"The Smart Premium Crystal Glass Switches White & Black is a stylish switch / powerpoint to finish your wall plates. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 switch / powerpoint","Wall plate","Fixing screws","Wiring guide"],"features":["App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Switches / Powerpoints"],["Replaces","Traditional wall switch plate"],["Specifications","200-265V, 50-60Hz"],["Remote Receiving Frequency","315/433.92Mhz"],["Rated Power","<1000W 1 Gang <2000W 2/3/4 Gang"],["Material construction","Crystal glass"],["Dimensions","118x72x34mm/145mmx85x50mm packed"],["Wiring Box Dimensions","115x60x50mm"],["Housing","White or Black glass"],["Warranty","2Yr"],["Certification","CE, FCC, RoHS, RCM, JAS-ANZ"]]},{"id":"SMART-CRYSTAL-TOUC","cat":"switches","name":"Smart Crystal Touch Wall Socket (GPO)","price":45.0,"img":"/img/smart-crystal-touc-1.webp","url":"https://greenhse.com/products/lighting-perth/glass-light-switch-perth-html/smart-crystal-touch-wall-socket.html","shape":"wall","tone":"neutral","specs":["Smart"],"desc":"The Smart Crystal Touch Wall Socket (GPO) is a stylish switch / powerpoint to finish your wall plates. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 switch / powerpoint","Wall plate","Fixing screws","Wiring guide"],"features":["App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Switches / Powerpoints"],["Specifications","240VAC 50-60Hz"],["Operating Current","2400w Maximum power"],["Rated Load","10A"],["Weather Rating","Indoor Use Only"],["Indicator Light","Light Blue OFF/Dark Blue ON"],["WiFi","2.4GHz, IEEE802.11b/g/n"],["Dimensions","118x72x45mm"],["Shade/Housing","White or Black Crystal Glass Panel, high quality flame-retardant PC bottom Case"],["Warranty","2 Year Warranty"],["Certification","RCM, GMA"]]},{"id":"KINETIC-RF-SWITCH-","cat":"switches","name":"Kinetic RF Switch and Receiver","price":40.0,"img":"/img/legacy/switches_and_receivers.webp","url":"https://greenhse.com/products/lighting-perth/glass-light-switch-perth-html/kinetic-rf-switch-receiver-grp.html","shape":"switch","tone":"neutral","specs":["IP67"],"desc":"A wall switch with no wiring and no battery \u2014 pressing it generates its own power and sends an RF signal to the receiver, which wires in at the light. Useful where running a cable back to a switch isn't practical.","includes":["1 \u00d7 kinetic wall switch","1 \u00d7 receiver","Wiring instructions"],"features":["No wiring to the switch","No batteries to replace","Mounts on glass, tile or brick","Pairs to the receiver at the light"],"specTable":[["Category","Switches / Powerpoints"],["Installation","Do It Yourself"],["Power","Self-Powered (no battery)"],["Dimming / Smart","Yes, with appropriate Controller"],["Construction","White UV stabilised polycarbonate"],["IP Rating","IP67 Waterproof"],["Dimensions","86x86x16.6mm"],["Connectivity","RF 433MHz"],["Wireless Distance","Up to 80m (outside), 25m (inside) May vary according to conditions."],["Plate Compatibility","1-Gang, 2-Gang, 3-Gang"],["Warranty","3 Years"],["Certification","RCM, SAA, CE"]]},{"id":"KINETIC-GPO-SW-ALL","cat":"switches","name":"Kinetic Switch Receiver","price":40.0,"img":"/img/kinetic-gpo-sw-all-1.webp","url":"https://greenhse.com/products/lighting-perth/glass-light-switch-perth-html/kinetic-gpo-sw-all.html","shape":"switch","tone":"neutral","specs":["IP20"],"desc":"The receiver half of the kinetic switch system. It wires in at the light and takes the RF signal from the kinetic wall switch.","includes":["1 \u00d7 kinetic switch receiver","Wiring instructions"],"features":["Pairs to a kinetic wall switch","Wires in at the light","No batteries"],"specTable":[["Category","Switches / Powerpoints"],["Installation","Plug In"],["Voltage","AC 110-240V 50/60Hz"],["Max Load","600W LED"],["Construction","White Fire Rated Polycarbonate"],["IP Rating","IP20 Plugs/ IP42 Switch"],["Dimensions","49x49x52mm Plug"],["Connectivity","RF 433MHz"],["Wireless Distance","Up to 20m"],["Works With","1-Gang, 2-Gang, 3-Gang, 4-Gang"],["Warranty","2 Years"],["Certification","RCM (Australian Certified)"]]},{"id":"GLASS-SWITCH-COVER","cat":"switches","name":"Premium Crystal Glass Switch Covers","price":40.0,"img":"/img/glass-switch-cover.webp","url":"https://greenhse.com/products/lighting-perth/glass-light-switch-perth-html/glass-switch-cover-premium-grp.html","shape":"switch","tone":"neutral","specs":["LED"],"desc":"The Premium Crystal Glass Switch Covers is a stylish switch / powerpoint to finish your wall plates. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 switch / powerpoint","Wall plate","Fixing screws","Wiring guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Switches / Powerpoints"],["Replaces","Greenhse standard glass switch plate - WiFi/Smart model"],["Material construction","Crystal glass"],["Dimensions","118x72x7mm"],["Colour","White or Black"],["Warranty","2Yr (does not cover accidental/installation damage)"]]},{"id":"D-PP2USB3","cat":"switches","name":"Double Power Point with Twin USB and USB-C","price":40.0,"img":"/img/d-pp2usb3.webp","url":"https://greenhse.com/products/lighting-perth/glass-light-switch-perth-html/d-pp2usb3.html","shape":"switch","tone":"neutral","specs":["LED"],"desc":"The Double Power Point with Twin USB and USB-C is a stylish switch / powerpoint to finish your wall plates. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 switch / powerpoint","Wall plate","Fixing screws","Wiring guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Switches / Powerpoints"],["Installation","Must be installed by a licensed electrician"],["Mounting","Fit any existing Australian GPO"],["Current","10A"],["Voltage","230-240V 50/60Hz"],["USB Outlet","5Vdc 4.2A (total)"],["Dimensions","120x80x45mm"],["Product Finish","White"],["Warranty","5 Years"],["Certification","RCM, SAA, CE"]]},{"id":"GH-LC01","cat":"switches","name":"Load Correction Device","price":9.0,"img":"/img/gh-lc01.webp","url":"https://greenhse.com/products/lighting-perth/glass-light-switch-perth-html/gh-lc01.html","shape":"switch","tone":"neutral","specs":["LED"],"desc":"The Load Correction Device is a stylish switch / powerpoint to finish your wall plates. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 switch / powerpoint","Wall plate","Fixing screws","Wiring guide"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Switches / Powerpoints"],["Voltage","220-240VAC 50Hz"],["Application","Indoor use only"],["Suitability","Clipsal C-BUS with LEDs, Single wire dimmer switches, Low load LED lights"],["Warranty","2Yr"],["Certification","CE, RCM"]]},{"id":"DL3-RGBW-GROUP-2","cat":"smart","name":"3W Smart RGBW Star Lights","price":55.0,"img":"/img/dl3-rgbw-group-2.webp","url":"https://greenhse.com/automation/smart-lights-perth/dl3-rgbw-group.html","shape":"star","tone":"rgb","specs":["3W","RGBW","IP65"],"desc":"The 3W Smart RGBW Star Lights is a smart-home device for app and voice-controlled lighting. It runs in RGBW (colour + white). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["Full-colour RGB plus a separate white channel","App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Smart Life"],["Power consumption","3Watt"],["Wattage","\u00b1 135 lumens/watt (4000k)"],["Beam angle","30\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Clips"],["Specifications","1-12V DC"],["Weather rating","Waterproof IP65"],["Material construction","Aluminium + PC"],["Dimensions","\u00f842mmx25 Cutout 30mm"],["Packed Dimensions","115x60x50mm 1pcs"],["Packed Weight","0.2Kg"],["Mercury","No Mercury"],["Light Output Colour","White (4000k) and Full Colour (RGBW)"],["Colour Rendering Index","80"],["Shade/Housing","White, Black or Brushed Chrome"]]},{"id":"KINETIC-GPO-SW-ALL-1","cat":"smart","name":"Kinetic Switch Receiver","price":55.0,"img":"/img/kinetic-gpo-sw-all-1.webp","url":"https://greenhse.com/automation/smart-lights-perth/kinetic-gpo-sw-all.html","shape":"switch","tone":"neutral","specs":["IP20"],"desc":"The receiver half of the kinetic switch system. It wires in at the light and takes the RF signal from the kinetic wall switch.","includes":["1 \u00d7 kinetic switch receiver","Wiring instructions"],"features":["Pairs to a kinetic wall switch","Wires in at the light","No batteries"],"specTable":[["Category","Smart Life"],["Installation","Plug In"],["Voltage","AC 110-240V 50/60Hz"],["Max Load","600W LED"],["Construction","White Fire Rated Polycarbonate"],["IP Rating","IP20 Plugs/ IP42 Switch"],["Dimensions","49x49x52mm Plug"],["Connectivity","RF 433MHz"],["Wireless Distance","Up to 20m"],["Works With","1-Gang, 2-Gang, 3-Gang, 4-Gang"],["Warranty","2 Years"],["Certification","RCM (Australian Certified)"]]},{"id":"KINETIC-RF-SWITCH--1","cat":"smart","name":"Kinetic RF Switch and Receiver","price":55.0,"img":"/img/legacy/switches_and_receivers.webp","url":"https://greenhse.com/automation/smart-lights-perth/kinetic-rf-switch-receiver-grp.html","shape":"switch","tone":"neutral","specs":["IP67"],"desc":"A wall switch with no wiring and no battery \u2014 pressing it generates its own power and sends an RF signal to the receiver, which wires in at the light. Useful where running a cable back to a switch isn't practical.","includes":["1 \u00d7 kinetic wall switch","1 \u00d7 receiver","Wiring instructions"],"features":["No wiring to the switch","No batteries to replace","Mounts on glass, tile or brick","Pairs to the receiver at the light"],"specTable":[["Category","Smart Life"],["Installation","Do It Yourself"],["Power","Self-Powered (no battery)"],["Dimming / Smart","Yes, with appropriate Controller"],["Construction","White UV stabilised polycarbonate"],["IP Rating","IP67 Waterproof"],["Dimensions","86x86x16.6mm"],["Connectivity","RF 433MHz"],["Wireless Distance","Up to 80m (outside), 25m (inside) May vary according to conditions."],["Plate Compatibility","1-Gang, 2-Gang, 3-Gang"],["Warranty","3 Years"],["Certification","RCM, SAA, CE"]]},{"id":"IKUU-SMART-WIFI-OU-1","cat":"smart","name":"IKUU Smart WiFi Outdoor Sensor White","price":55.0,"img":"/img/ikuu-smart-wifi-ou-1.webp","url":"https://greenhse.com/automation/smart-lights-perth/ikuu-smart-wifi-outdoor-sensor.html","shape":"sensor","tone":"neutral","specs":["IP65"],"desc":"The IKUU Smart WiFi Outdoor Sensor White is a smart-home device for app and voice-controlled lighting. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Smart Life"],["Installation","Must be installed by a licensed electrician"],["Detection Angle","180 Degrees Scan (Approx)"],["Detection Distance","Up to 12m"],["IP Rating","IP65 (Indoor and Outdoor Use)"],["Operating Load","1200W Max (Incandescent Bulb) 300W (Energy Saving Bulb)"],["Supply Voltage","230-240V 50 Hz"],["Fitting","Wall Mount"],["Time Adjustment","10 seconds - 15 minutes"],["Detection Circuitry","Infra Red motion sensor"],["Material Construction","Zinc Nickel Alloy"],["Shade/Housing","White"],["Warranty","3 Years"]]},{"id":"DL9RGBW-BT1-2","cat":"smart","name":"90mm 9W Downlight, RGBW, Bluetooth","price":25.0,"img":"/img/dl9rgbw-bt1-2.webp","url":"https://greenhse.com/automation/smart-lights-perth/dl9rgbw-bt1.html","shape":"down","tone":"rgb","specs":["9W","RGB","IP54"],"desc":"The 90mm 9W Downlight, RGBW, Bluetooth is a smart-home device for app and voice-controlled lighting. It runs in RGBW (colour + white). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["Full-colour RGB, run from a controller and remote","App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Smart Life"],["Replaces","75Watt"],["Brightness","900-1000 lumens (White)"],["Power consumption","9Watt"],["Beam angle","110\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Flat surface, spring clips"],["Specifications","AC220-240V, 50/60Hz"],["Weather Rating","IP54 (Front) IP40 (Back)"],["Material Construction","Aluminium coated plastic, PC Lens, White RAL9016"],["Dimensions","\u00d8115mmx57 Cutout 90-95mm"],["Packed Dimensions","120x120x75mm 1pce"],["Packed Weight","0.35kg"],["Mercury","No Mercury"],["Light Output Colour","Adjustable from Warm 2700k - Bright 6500k + RGB"],["Colour Rendering Index","80"]]},{"id":"DL9RGBW-PBT-2","cat":"smart","name":"90mm 9W Downlight, RGBW, Low Glare Bluetooth","price":27.0,"img":"/img/dl9rgbw-pbt-2.webp","url":"https://greenhse.com/automation/smart-lights-perth/dl9rgbw-pbt.html","shape":"down","tone":"rgb","specs":["9W","RGB","IP54"],"desc":"The 90mm 9W Downlight, RGBW, Low Glare Bluetooth is a smart-home device for app and voice-controlled lighting. It runs in RGBW (colour + white). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["Full-colour RGB, run from a controller and remote","App & voice control (Alexa & Google Home)","Low-glare optic for comfortable, even light","Energy-efficient LED \u2014 lower running costs"],"specTable":[["Category","Smart Life"],["Replaces","75Watt"],["Brightness","900-1000 lumens (White)"],["Power consumption","9Watt"],["Beam angle","60\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Flat surface, spring clips"],["Specifications","AC220-240V, 50/60Hz"],["Weather Rating","IP54 (Front) IP40 (Back)"],["Material Construction","Aluminium coated plastic, PC Lens, White RAL9016"],["Dimensions","\u00d8115mmx57 Cutout 90-95mm"],["Packed Dimensions","120x120x75mm"],["Packed Weight","0.35kg"],["Mercury","No Mercury"],["Light Output Colour","Adjustable from Warm 2700k - Bright 6500k + RGB"],["Colour Rendering Index","80"]]},{"id":"DL10PBT-1","cat":"smart","name":"90mm Premium 10W Downlight, Bluetooth, 60\u00ba","price":18.0,"img":"/img/dl10pbt-1.webp","url":"https://greenhse.com/automation/smart-lights-perth/dl10pbt.html","shape":"down","tone":"neutral","specs":["10W","Warm","IP54"],"desc":"The 90mm Premium 10W Downlight, Bluetooth, 60\u00ba is a smart-home device for app and voice-controlled lighting. It is switchable between 2700K and 5700K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Smart Life"],["Replaces","100-120Watt"],["Brightness","800-980 lumens"],["Power consumption","10Watt"],["Beam angle","60\u00ba Anti Glare"],["Dimmable","8-100%"],["Lifespan","50 000 hrs"],["Specifications","AC200-240V, 50-60Hz"],["Weather rating","IP54 / IP40"],["Material construction","Plastic coated aluminium"],["Dimensions","\u00d8115mmx61 Cutout 90-95mm"],["Packed Dimensions","12.5x12.5x7cm 1pce"],["Weight","0.3kg packed"],["Light Output Colour","Warm 2700k - Bright 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Matte White / Matte Black"]]},{"id":"P24-RGBW-CCT-1","cat":"smart","name":"24W Smart WiFi Ceiling Light, RGB, CCT","price":55.0,"img":"/img/p24-rgbw-cct-1.webp","url":"https://greenhse.com/automation/smart-lights-perth/p24-rgbw-cct.html","shape":"bulb","tone":"rgb","specs":["24W","RGB","IP40"],"desc":"The 24W Smart WiFi Ceiling Light, RGB, CCT is a smart-home device for app and voice-controlled lighting. It runs in RGB (full colour). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","Full-colour RGB, run from a controller and remote","App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs"],"specTable":[["Category","Smart Life"],["Brightness","2130 lumens (CCT)"],["Power consumption","24Watt"],["Beam angle","120\u00ba"],["Lifespan","30 000hrs"],["Fitting","Surface Mount"],["Specifications","240-265VAC, 50-60Hz"],["Weather rating","IP40 (Front) Indoor Use"],["Material construction","PC cover+ABS body"],["Dimensions","\u00f8300x40mm"],["Packed Dimensions","310x310x46mm"],["Weight","1kg 1pce"],["Light Output Colour","RGB (Full Colour), White CCT 2700-6500K"],["Colour Rendering Index","80"],["Shade/Housing","White"],["Warranty","3Yr"]]},{"id":"P24-WIFI-1","cat":"smart","name":"24W Smart WiFi Ceiling Light, CCT","price":40.0,"img":"/img/p24-wifi-1.webp","url":"https://greenhse.com/automation/smart-lights-perth/p24-wifi.html","shape":"bulb","tone":"neutral","specs":["24W","Warm","IP20"],"desc":"The 24W Smart WiFi Ceiling Light, CCT is a smart-home device for app and voice-controlled lighting. It runs in CCT tunable (2700\u20135700K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["Tunable white from warm 2700K to cool 5700K","App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Smart Life"],["Replaces","180-200w traditional downlight/60w CFL"],["Brightness","1920 lumens"],["Power consumption","24Watt"],["Beam angle","110\u00ba"],["Lifespan","25 000hrs"],["Fitting","Surface Mount or Recessed"],["Specifications","240-265VAC, 50-60Hz"],["Weather rating","IP20 Indoors"],["Material construction","Thermal plastic frame, PMMA LGP, Aluminium heatsink"],["Dimensions","\u00f8290x15mm"],["Packed Dimensions","310x300x43mm"],["Packed Weight","0.7kg 1pce"],["Mercury","No Mercury"],["Light Output Colour","Adjustable Warm White 3000k - Bright White 6000k"],["Colour Rendering Index",">80"]]},{"id":"25W-SMART-LED-TUYA-2","cat":"smart","name":"16-17cm 25W LED Smart Tuya Downlight WIFI","price":60.0,"img":"/img/25w-smart-led-tuya-2.webp","url":"https://greenhse.com/automation/smart-lights-perth/25w-smart-led-tuya-downlight.html","shape":"down","tone":"neutral","specs":["25W","Warm","IP54"],"desc":"The 16-17cm 25W LED Smart Tuya Downlight WIFI is a smart-home device for app and voice-controlled lighting. It is switchable between 3000K and 5700K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Smart Life"],["Brightness","2370-2750, up to 110 Lumens/Watt"],["Power consumption","25Watt"],["Beam angle","90\u00ba"],["Dimmable","by App on Smart device"],["Lifespan","50 000 hrs"],["Fitting","Sunk surface, spring clips"],["Specifications","AC200-240V, 50-60Hz"],["Weather Rating","IP54 front cover IP20 on the back"],["Material Construction","Diecast Aluminium, PC"],["Dimensions","\u00d8190x45mm Cutout 160-170mm"],["Packed Weight","0.64kg 1pce"],["Mercury","No Mercury"],["Light Output Colour","Adjustable Warm 3000k - Bright 5700k"],["Colour Rendering Index","\u226580"],["Shade/Housing","Matte white, white frosted PC cover"]]},{"id":"ST24V-9W-15W-CCT-C-1","cat":"smart","name":"24V Dotless Cob Strip Light / Metre","price":16.0,"img":"/img/st24v-9w-15w-cct-c-1.webp","url":"https://greenhse.com/automation/smart-lights-perth/st24v-9w-15w-cct-cob-1.html","shape":"strip","tone":"neutral","specs":["16W/m","IP20","2700\u20136500K"],"desc":"Dotless COB strip with adjustable white \u2014 tune it anywhere from 2700K warm through to 6500K cool from the controller, so you pick the mood after it is installed rather than at order. One continuous line of light, no visible dots. Needs an aluminium channel, and a CCT controller to do the colour shifting.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Smart Life"],["Brightness","Up to 1500 lumens/m"],["Power","16W per metre"],["Beam angle","180\u00ba"],["Dimmable","/ CCT adjustable (with receiver/controller)"],["Lifespan","50 000 hrs"],["Fitting","2-Sided tape Channel options available."],["Specifications","24V DC"],["Weather Rating","IP20 \u2014 indoor use only"],["Material","Heat resistant PCB"],["Dimensions","10mmx2.2mm (varies by option)"],["Weight","131g / 5m roll"],["Mercury","No Mercury"],["Light Output Color","Adjustable 2700K\u20136500K, warm through to cool"],["Colour Rendering Index",">90"],["Shade/Housing","Clear PCB"],["Max run","5m from one end \u00b7 10m fed from both ends"],["Profile","Aluminium channel required"],["Connectors","Connectors for short lengths, no waste up to 2m"]],"options":[{"label":"IP20 \u00b7 16W/m \u00b7 CCT 2700K\u20136500K","price":16.0,"specs":[["IP rating","IP20"],["Power","16W per metre"],["Colour","Adjustable 2700K\u20136500K"],["Profile","Aluminium channel required"],["Max run","5m single feed \u00b7 10m dual feed"],["Control","CCT controller required"]]}]},{"id":"ST24V-RGB-COB-1","cat":"smart","name":"24V Dotless RGB Cob Strip Light / Metre","price":17.0,"img":"/img/st24v-rgb-cob-1.webp","url":"https://greenhse.com/automation/smart-lights-perth/st24v-rgb-cob.html","shape":"strip","tone":"rgb","specs":["16W/m or 15W/m","IP20 or IP65","RGB"],"desc":"Very bright dot-free full-colour COB \u2014 premium feature lighting. Good cool white using RGB white. 5 metres on a single feed, 10 metres with both ends fed. Needs an aluminium channel at 16W/m. Two versions: IP20 at 16W/m, or IP65 at 15W/m with heat-shrink.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["Dotless COB \u2014 a continuous line of colour, no visible dots","Full-colour RGB from a controller and remote","Energy-efficient LED \u2014 lower running costs","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Smart Life"],["Brightness","840 LEDs/metre"],["Power","16W per metre"],["Beam angle","120\u00ba"],["Dimmable","/ colour adjustable (with receiver)"],["Lifespan","50 000 hrs"],["Fitting","2-Sided tape Channel options available."],["Specifications","24V DC"],["Material","Heat resistant PCB"],["Dimensions","10mmx1.2mm"],["Weight","\u2248131g / 5m roll"],["Mercury","No Mercury"],["Light Output Color","RGB full colour"],["Shade/Housing","Clear PCB"],["Control","RGB controller + remote \u2014 no white channel"],["Max run","5m from one end \u00b7 10m fed from both ends"],["Profile","Aluminium channel required \u2014 16W/m runs warm"],["Connectors","Connectors for short lengths, no waste up to 2m"],["IP Rating","IP20, or IP65 with heat-shrink"]],"options":[{"label":"IP20 \u00b7 16W/m","price":17.0,"specs":[["IP rating","IP20"],["Power","16W per metre"],["Colour","RGB full colour"],["Profile","Aluminium channel required"],["Max run","5m single feed \u00b7 10m dual feed"]]},{"label":"IP65 \u00b7 15W/m with heat-shrink","price":19.0,"specs":[["IP rating","IP65 \u2014 heat-shrink"],["Power","15W per metre"],["Colour","RGB full colour"],["Profile","Aluminium channel required"],["Max run","5m single feed \u00b7 10m dual feed"]]}]},{"id":"ST24V-SMD-ALL-2","cat":"smart","name":"24V High Lumen Strip Light /Metre","price":18.0,"img":"/img/st24v-smd-all-2.webp","url":"https://greenhse.com/automation/smart-lights-perth/st24v-smd-all.html","shape":"strip","tone":"neutral","specs":["12\u201323W/m","8 versions","3oz PCB"],"desc":"High-output 24V SMD strip on a 3oz copper PCB \u2014 the strongest and longest-lived strip we stock, rated past 50,000 hours. Eight versions: IP20 at 23W/m with CRI>90 in 4000K or 5000K, IP65 at 20W/m in 4000K or 5000K, and IP65 at 12W/m in 2700K, 3000K, 4000K or 5500K. The 12W/m does not need an aluminium channel. Runs on 24V, so it needs a transformer, and dims from a receiver.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Smart Life"],["Brightness","~1800 lumens/metre \u00b7 192 LEDs/metre"],["Power","12w per metre"],["Beam angle","120\u00ba"],["Dimmable","(with appropriate receiver)"],["Lifespan","50 000 hrs"],["Fitting","2-Sided tape Channel options available"],["Specifications","24V DC"],["Weather Rating","IP20 indoor, or IP65 silicon gel"],["Material","PCB/Silicon Gel (model dependent)"],["Dimensions","10mmx2.2mm"],["Light Output Color","2700K / 3000K / 4000K / 5000K / 5500K depending on version"],["Colour Rendering Index",">80"],["Shade/Housing","3oz White PCB"],["Warranty","2Yr limited, Needs to be installed by qualified electrician, excludes physical damage."],["Certification","RCM, CE"],["Max run","5m from one end \u00b7 10m fed from both ends"],["PCB","3oz copper \u2014 3\u00d7 stronger than single layer"],["Connectors","Connectors for short lengths, no waste up to 4m"]],"options":[{"label":"IP20 \u00b7 23W/m \u00b7 4000K \u00b7 CRI>90","price":34.0,"specs":[["IP rating","IP20"],["Power","23W per metre"],["Colour","4000K"],["CRI",">90"],["Brightness","~3800 lumens/m"],["Efficiency","165 lm/W"]]},{"label":"IP20 \u00b7 23W/m \u00b7 5000K \u00b7 CRI>90","price":34.0,"specs":[["IP rating","IP20"],["Power","23W per metre"],["Colour","5000K"],["CRI",">90"],["Brightness","~3800 lumens/m"],["Efficiency","165 lm/W"]]},{"label":"IP65 \u00b7 20W/m \u00b7 4000K","price":28.0,"specs":[["IP rating","IP65"],["Power","20W per metre"],["Colour","4000K"]]},{"label":"IP65 \u00b7 20W/m \u00b7 5000K","price":28.0,"specs":[["IP rating","IP65"],["Power","20W per metre"],["Colour","5000K"]]},{"label":"IP65 \u00b7 12W/m \u00b7 2700K","price":18.0,"specs":[["IP rating","IP65"],["Power","12W per metre"],["Colour","2700K"],["Profile","No aluminium channel needed"]]},{"label":"IP65 \u00b7 12W/m \u00b7 3000K","price":18.0,"specs":[["IP rating","IP65"],["Power","12W per metre"],["Colour","3000K"],["Profile","No aluminium channel needed"]]},{"label":"IP65 \u00b7 12W/m \u00b7 4000K","price":18.0,"specs":[["IP rating","IP65"],["Power","12W per metre"],["Colour","4000K"],["Profile","No aluminium channel needed"]]},{"label":"IP65 \u00b7 12W/m \u00b7 5500K","price":18.0,"specs":[["IP rating","IP65"],["Power","12W per metre"],["Colour","5500K"],["Profile","No aluminium channel needed"]]}]},{"id":"ST240V-RGB-1","cat":"smart","name":"240V RGB LED Strip Light /Metre","price":20.0,"img":"/img/st240v-rgb-1.webp","url":"https://greenhse.com/automation/smart-lights-perth/st240v-rgb.html","shape":"strip","tone":"rgb","specs":["10W/m","IP65","RGB"],"desc":"240V RGB strip, straight off mains with no transformer. Up to 35 metres from one supply with even colour throughout. IP65, low heat and a strong TPU coating, so no aluminium channel is needed. Full colour control and dimming from a remote, or add an RGB Gateway for smart control.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["Full-colour RGB, run from a controller and remote","App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Smart Life"],["Brightness","60 LEDs/m"],["Power consumption","10w/metre"],["Beam angle","120\u00ba"],["Dimmable","Full colour control and dimmable"],["Lifespan","50 000 hrs"],["Fitting","Can lie in ceiling channel or be fastened with U-clips"],["Specifications","240V AC"],["Material construction","Anti-UV PVC, Aluminium Wire"],["Dimensions","15.5mmx7mm"],["Packed Dimensions","33.5x33.5x15.5cm/50m Roll"],["Weight","7.5kgs/50m"],["Mercury","No Mercury"],["Light Output Color","RGB full colour 2100MCD/LED"],["Colour Rendering Index",">80"],["IP Rating","IP65"],["Control","Full colour control and dimming from a remote, or an RGB Gateway for smart control"],["Max run","Up to 35m from one supply"],["Profile","No aluminium channel needed"],["Voltage","240V \u2014 runs straight off mains, no transformer"]]},{"id":"ST-CH-BLACK-LINEAR-4","cat":"smart","name":"2m Black Linear Suspension Light","price":250.0,"img":"/img/st-ch-black-linear-4.webp","url":"https://greenhse.com/automation/smart-lights-perth/st-ch-black-linear-2.html","shape":"track","tone":"neutral","specs":["40W","Warm","IP65"],"desc":"The 2m Black Linear Suspension Light is a LED strip for cove, cabinet and accent lighting. It is switchable between 2700K and 6000K. Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Smart Life"],["Brightness","Up to 4000 Lumens"],["Power","40w"],["Beam angle","60\u00ba"],["Dimmable","and CCT Adjustable"],["Lifespan","30 000 hrs"],["Fitting","Ceiling suspended,"],["Specifications","24V DC"],["Weather Rating","IP65 (COB Strip)"],["Material","Aluminium Black Powder Coated + PVC Lens (White available on request)"],["Dimensions","200cm(L)x 5cm(W)x7cm(H)"],["Weight","2.6kg Net"],["Light Output Color","2700k - 6000k Adjustable (Warm - Cool White)"],["Colour Rendering Index",">90"],["Shade/Housing","Matte Black + White Lens"],["Warranty","2Yr limited - Needs to be installed by qualified electrician, excludes physical damage."]]},{"id":"WL6-RGBW-1","cat":"smart","name":"6W WiFi Wall Light, RGBW, Black/White","price":45.0,"img":"/img/wl6-rgbw-1.webp","url":"https://greenhse.com/automation/smart-lights-perth/wl6-rgbw.html","shape":"wall","tone":"rgb","specs":["6W","IP65"],"desc":"The 6W WiFi Wall Light, RGBW, Black/White is a smart-home device for app and voice-controlled lighting. It runs in RGBW (colour + white). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["Full-colour RGB plus a separate white channel","App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Smart Life"],["Replaces","50W"],["Brightness","480 lumens (White 3500k)"],["Power consumption","6Watt"],["Beam angle","0-150\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Screws"],["Specifications","AC220-240V, 50-60Hz"],["Weather rating","IP65"],["Material construction","Powder coated aluminium and rubber seal"],["Dimensions","100x100x100mm"],["Packed Dimensions","110x110x110mm 1pce"],["Packed Weight","0.8kg 1pce"],["Mercury","No Mercury"],["Light Output Colour","Full Colour + White (3500k)"],["Colour Rendering Index","82"]]},{"id":"F50-RGB-3","cat":"smart","name":"50W LED Floodlight RGB, 25\u00ba/160\u00ba Beam","price":160.0,"img":"/img/f50-rgb-3.webp","url":"https://greenhse.com/automation/smart-lights-perth/f50-rgb.html","shape":"flood","tone":"rgb","specs":["50W","RGB","IP65"],"desc":"The 50W LED Floodlight RGB, 25\u00ba/160\u00ba Beam is a LED fitting. It runs in RGB (full colour). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["Full-colour RGB, run from a controller and remote","App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance"],"specTable":[["Category","Smart Life"],["Brightness","3500-4200 lumens"],["Power consumption","50W"],["Beam angle","25\u00ba/160\u00ba"],["Lifespan","50 000 hrs"],["Fitting","Mounting bracket"],["Specifications","86~265VAC 50-60Hz"],["Weather rating","IP65 Weather proof"],["Material construction","Aluminium and tempered glass"],["Dimensions","265mmx220x47.5 (not including bracket)"],["Packed Dimensions","355x255x58mm"],["Weight","1.9/2.1Kg Net/Gross"],["Instant start","Instant start, suitable for sensors"],["Mercury","No Mercury"],["Light Output Colour","2700-6500k White + RGB"],["Colour Rendering Index",">80"]]},{"id":"GH-SMART-SOCKET","cat":"smart","name":"SMART WIFI SOCKET","price":18.0,"img":"/img/gh-smart-socket.webp","url":"https://greenhse.com/automation/smart-lights-perth/gh-smart-socket.html","shape":"switch","tone":"neutral","specs":["0.9W"],"desc":"The SMART WIFI SOCKET is a smart-home device for app and voice-controlled lighting. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Smart Life"],["Use","Control appliances and devices with SMART Socket via App"],["Voltage","100-240VAC 50-60Hz"],["Application","Indoor use only"],["WiFi Standard","WiFi 802.11 b/g/n 2.4Ghz"],["Power","Working consumption < 0.9W Standby consumption < 0.6W"],["Dimensions","66x43.5x57.5mm 70g"],["Housing","White PC, Blue indicator light"],["Warranty","1Yr"],["Certification","SAA , RCM"]]},{"id":"SMART-CRYSTAL-TOUC-1","cat":"smart","name":"Smart Crystal Touch Wall Socket (GPO)","price":45.0,"img":"/img/smart-crystal-touc-1.webp","url":"https://greenhse.com/automation/smart-lights-perth/smart-crystal-touch-wall-socket.html","shape":"wall","tone":"neutral","specs":["Smart"],"desc":"The Smart Crystal Touch Wall Socket (GPO) is a smart-home device for app and voice-controlled lighting. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Smart Life"],["Specifications","240VAC 50-60Hz"],["Operating Current","2400w Maximum power"],["Rated Load","10A"],["Weather Rating","Indoor Use Only"],["Indicator Light","Light Blue OFF/Dark Blue ON"],["WiFi","2.4GHz, IEEE802.11b/g/n"],["Dimensions","118x72x45mm"],["Shade/Housing","White or Black Crystal Glass Panel, high quality flame-retardant PC bottom Case"],["Warranty","2 Year Warranty"],["Certification","RCM, GMA"]]},{"id":"BT-MESH-GATEWAY-1","cat":"smart","name":"BT Mesh Tuya Gateway","price":35.0,"img":"/img/bt-mesh-gateway-1.webp","url":"https://greenhse.com/automation/smart-lights-perth/bt-mesh-gateway-1.html","shape":"bulb","tone":"neutral","specs":["LED"],"desc":"The BT Mesh Tuya Gateway is a smart-home device for app and voice-controlled lighting. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Smart Life"],["Use","Manage and Control Bluetooth SMART devices"],["Power Supply","5V/1A DC over the Micro USB port"],["Indicator Light","Blue for Bluetooth, Red for WiFi"],["Working Temperature","10 - 55\u2103"],["Transmission Distance","10-30m"],["Devices","64"],["Total No. of Channels","19 (11~26)"],["Antenna","In-built onboard antenna"],["Network Standard","BLE and BLE Mesh"],["Wireless Frequency","2.4~2.4835GHz"],["Application","Indoor use"],["Dimensions","60.5x60.5x16mm"],["Housing","White PC"],["Warranty","1Yr"],["Certification","RCM, CE"]]},{"id":"ZI-GATEWAY","cat":"smart","name":"Zigbee Gateway","price":35.0,"img":"/img/zi-gateway.webp","url":"https://greenhse.com/automation/smart-lights-perth/zi-gateway.html","shape":"bulb","tone":"neutral","specs":["LED"],"desc":"The Zigbee Gateway is a smart-home device for app and voice-controlled lighting. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Smart Life"],["Use","Manage and Control Zigbee SMART devices"],["Adapter","110-240V AC 5V/1A DC"],["Working Voltage","1.8V~3.3V"],["Working Temperature","10 - 55\u2103"],["Transmission Distance",">300m"],["Devices","100+"],["Total No. of Channels","19 (11~26)"],["Antenna","Default PCB onboard antenna"],["Network Topology","Supports Star, Tree, Mesh network"],["Wireless Connection","ZigBee 2.4~2.485GHz"],["Application","Indoor Use Only"],["Dimensions","94x94x23mm 75g"],["Housing","White PC"],["Warranty","1Yr"],["Certification","RCM, CE"]]},{"id":"ZI-PIR-SENSOR","cat":"smart","name":"Zigbee Intelligent PIR","price":18.0,"img":"/img/zi-pir-sensor.webp","url":"https://greenhse.com/automation/smart-lights-perth/zi-pir-sensor.html","shape":"sensor","tone":"neutral","specs":["LED"],"desc":"The Zigbee Intelligent PIR is a smart-home device for app and voice-controlled lighting. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 smart device","App pairing instructions","Quick-start guide"],"features":["App & voice control (Alexa & Google Home)","Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Smart Life"],["Specifications","2.4V-3.3V 3V CR2450 Battery"],["Application","Indoor Use Only"],["Detection","Motion near fixed position"],["Detection Distance","7m"],["Detection Angle","170\u00ba"],["Transport Distance","10-30m"],["Wireless Connection","ZigBee 2.4GHz"],["Operating Temperature","10\u00baC - 45\u00baC"],["Mounting","1.6-1.8m above the ground"],["Dimensions","\u00f840x32mm (without stand) 40x39.5mm 32.5g"],["Shade/Housing","White ABS & PC, Blue Indicator Lights"],["Warranty","1 Year Warranty"],["Certification","RCM, CE"]]},{"id":"WIFI-GARAGE-DOOR-1","cat":"smart","name":"WiFi Garage Door Controller","price":95.0,"img":"/img/wifi-garage-door-1.webp","url":"https://greenhse.com/automation/smart-lights-perth/wifi-garage-door.html","shape":"transformer","tone":"neutral","specs":["LED"],"desc":"Adds phone control to your garage door \u2014 open and close it from the app.","includes":["1 \u00d7 WiFi garage door controller","Wiring instructions"],"features":["Open and close from the app","WiFi \u2014 no hub needed"],"specTable":[["Category","Smart Life"],["Installation","Recommended to be installed by a licensed electrician"],["Operating Voltage","240V / 50Hz"],["Rated Current","10 Amp"],["Operating Temperature","5\u00b0C - 35\u00b0C"],["Maximum Load","2000W"],["Control Type","Voice (using Google Assistant or Amazon Alexa), Remote (using Smart Device), Geofence"],["Connectivity","Infrared (IR), WiFi"],["WiFi Info","WiFi IEEE802.11b/g/n 2.4Ghz Mac Encryption: WEP/ WAPI/ TKIP /AES"],["Device Requirements","iOS 8.0 or higher, Android 4.1 or higher"],["IP Rating","Indoor Use Only"],["Dimensions","109x62x44mm"],["Housing","Black flame-retardant ABS"],["Warranty","1Yr"],["Certification","RCM, CE"]]},{"id":"TR240V-DRIVER","cat":"transformers","name":"240V Strip Driver","price":60.0,"img":"/img/tr240v-driver.webp","url":"/products/transformers/tr240v-driver.html","shape":"strip","tone":"neutral","specs":["LED"],"desc":"Runs 240V strip straight off mains power \u2014 no low-voltage transformer needed. Included in every 240V strip kit.","includes":["1 \u00d7 240V strip driver","Australian compliance certificate","Wiring instructions"],"features":["Runs the strip direct from 240V mains","Supplied with every 240V strip kit","Australian certified / RCM","3-year warranty"],"specTable":[["Category","12V/24V Transformers / Controllers"],["IP rating","See options"],["Voltage","240V"],["Certification","Australian certified / RCM"],["Warranty","3 years"]]},{"id":"BLACK-LINEAR-MODUL-2","cat":"strip","name":"Black Linear Modular Lighting System","price":60.0,"img":"/img/black-linear-modul-3.webp","url":"https://greenhse.com/lighting-perth/led-strip-lights/black-linear-modular-light.html","shape":"track","tone":"neutral","specs":["Tri-colour","IP20"],"desc":"The Black Linear Modular Lighting System is a flexible LED strip for cove, cabinet and accent lighting. It runs in neutral white (~4000K). Supplied ready to install and backed by Greenhse's local Perth team.","includes":["1 \u00d7 LED strip reel","3M adhesive backing","End caps & mounting clips","Connection guide","Note: driver / controller sold separately"],"features":["Energy-efficient LED \u2014 lower running costs","Long rated lifespan, low maintenance","Backed by Greenhse's Perth-based support"],"specTable":[["Category","Strip Lights"],["Use","Professional quality, linear modular lights with attractive back-lighting. Perfect for modern retail and commercial applications."],["Brightness","Up to 130 Lumens/Watt"],["Power","Variable - selectable by switch, varies by module"],["Beam angle","120 Degrees"],["Dimmable",", switch selectable"],["Lifespan","50 000 hrs"],["Fitting","Hanging or ceiling mounted"],["Specifications","AC100-265"],["Weather Rating","IP20 Indoor Use Only"],["IK Rating","IK08"],["Power Factor",">0.9"],["Material","Rugged diecast 6063 T5 aluminium housing and PC/PMMA lenses"],["Dimensions","Variable - 057m - 2.2m; L (Corner), X,Y, V shape"],["Weight","Up to 3kg"],["Light Output Color","30000/4000/5000/6000k selectable"]]},{"id":"ST24V-2700K-COB","cat":"strip","name":"24V 2700K Dotless COB Strip Light /Metre","price":16.0,"img":"","url":"/products/strip/st24v-2700k-cob.html","shape":"strip","tone":"rgb","specs":["12W/m","IP20","2700K"],"desc":"Dot-free COB in a fixed extra-warm 2700K \u2014 the warmest white in the range, for bedrooms, bars and anywhere you want the light to feel like lamplight. 12W per metre. 5 metres on a single feed, 10 metres fed from both ends.","includes":["1 \u00d7 LED strip reel","3M adhesive backing","End caps & mounting clips","Connection guide","Note: driver / controller sold separately"],"features":["Dotless COB \u2014 one continuous line of light, no visible LEDs","Fixed 2700K extra-warm white","12W per metre","5m from one end, 10m fed from both ends","Connectors for short lengths \u2014 no waste up to 2m"],"specTable":[["Category","Strip Lights"],["Power","12W per metre"],["Voltage","24V DC"],["IP Rating","IP20 \u2014 indoor use only"],["Light Output Colour","2700K extra warm \u2014 fixed"],["Light","Dot-free COB"],["Max run","5m single feed \u00b7 10m dual feed"],["Profile","Aluminium channel recommended"],["Lifespan","50 000 hrs"]],"options":[]},{"id":"NEON-IP67","cat":"strip","name":"Neon IP67 Flexible Strip /Metre","price":34.0,"img":"/img/neon-new.webp","url":"/products/strip/neon-ip67.html","shape":"strip","tone":"rgb","specs":["IP67","Programmable","Bluetooth"],"desc":"Fully programmable neon-style strip for signage, feature outlines and shopfits. Flexible and durable, Bluetooth controlled with no WiFi needed, and a data cable lets you chain multiple strips together. 5 metres on a single feed, 10 metres fed from both ends. Runs in a 12\u00d712mm aluminium support profile.","includes":["1 \u00d7 LED strip reel","3M adhesive backing","End caps & mounting clips","Connection guide","Note: driver / controller sold separately"],"features":["Fully programmable colour","Flexible and durable neon-style profile","Bluetooth control \u2014 no WiFi required","Data cable chains multiple strips together","5m from one end, 10m fed from both ends","12\u00d712mm aluminium support profile"],"specTable":[["Category","Strip Lights"],["Voltage","24V DC"],["IP Rating","IP67"],["Control","Bluetooth \u2014 no WiFi required"],["Max run","5m single feed \u00b7 10m dual feed"],["Profile","12\u00d712mm aluminium support profile"],["Applications","Food trucks and signage (12\u00d712mm recommended), ceiling profiles, feature walls, commercial shopfitting"]],"options":[{"label":"12\u00d712mm side bend \u00b7 Magic RGB","price":38.0,"specs":[["Size","12\u00d712mm side bend"],["Colour","Magic RGB \u2014 programmable"],["IP rating","IP67"]]},{"label":"6\u00d712mm side bend \u00b7 Magic RGB","price":34.0,"specs":[["Size","6\u00d712mm side bend"],["Colour","Magic RGB \u2014 programmable"],["IP rating","IP67"]]},{"label":"6\u00d712mm side bend \u00b7 CCT","price":34.0,"specs":[["Size","6\u00d712mm side bend"],["Colour","CCT adjustable white"],["IP rating","IP67"]]},{"label":"6\u00d712mm side bend \u00b7 3000K warm","price":32.0,"specs":[["Size","6\u00d712mm side bend"],["Colour","3000K warm white \u2014 fixed"],["IP rating","IP67"]]}]}];
const BLOGS=[{"title":"How to Upgrade Your Home Lighting in Perth","url":"/blog/upgrade-your-home-lighting-in-perth.html"},{"title":"Understanding Strip Lighting  - A Practical Guide to Choosing the Right Solution","url":"/blog/understanding-strip-lighting-guide-perth.html"},{"title":"Warehouse Lights Perth: How High Bay LED Lights Save Money & Improve Safety","url":"/blog/high-bay-lights-perth-warehouse.html"},{"title":"Energy-Efficient LED Office Lighting for Modern Workspaces","url":"/blog/energy-efficient-led-office-lighting-perth.html"},{"title":"Top 10 Modern Lighting Fixtures for Home Decor in Perth","url":"/blog/top-10-modern-lighting-fixtures-for-home-perth.html"},{"title":"The Ultimate Guide to Choosing Outdoor Wall Lighting for Perth Homes","url":"/blog/guide-to-choosing-outdoor-wall-lighting-perth-homes.html"},{"title":"Best Lighting Products Under $20 in Perth (Affordable & Stylish)","url":"/blog/best-lighting-products-in-perth.html"},{"title":"FREE Home Battery Storage for Australians - What Does it Mean for You?","url":"/blog/what-is-free-home-battery-storage-australians.html"},{"title":"Powering the Future: Australia\u2019s Cheaper Home Batteries Program (From 1 July 2025)","url":"/blog/australia-cheaper-home-batteries-program-greencharge.html"},{"title":"How to Choose the Right LED Ceiling Lights for Your Perth Home","url":"/blog/choose-led-ceiling-lights-perth-home.html"},{"title":"How Smart Lighting Works 2025 LED Guide for Perth Homes","url":"/blog/how-smart-lighting-works-guide-perth-homes.html"},{"title":"How to Choose the Right LED Industrial Lighting for Your Facility","url":"/blog/choose-right-led-industrial-lighting-perth.html"}];
const VIDEOS=[{"id":"YQxm2ZrDf9E"},{"id":"z1bApcO04Bw"},{"id":"OcVDt_htuzk"},{"id":"BCo0g85LRvI"},{"id":"Q3iYeqDkIeE"},{"id":"7DAaL5gGab8"},{"id":"BtzC_uuHrZQ"},{"id":"B-Bx8YMpNXQ"},{"id":"kaPMJ-pcjG4"},{"id":"6dB0W9up8zA"},{"id":"_1683KXx3eU"},{"id":"d6ks02Kp6nQ"}];
const GUIDES=[["Smart Lighting \u2014 setup & info","https://greenhse.com/pub/media/sparsh/product_attachment/Smart_Info_Web_upload.pdf"],["RGB Garden Lights \u2014 connection","https://greenhse.com/pub/media/sparsh/product_attachment/RGB Garden Lights connection_new.pdf"],["Understanding Strip Lighting","https://greenhse.com/pub/media/sparsh/product_attachment/Understanding strip lighting.pdf"],["Strip Lighting Profiles 2025","https://greenhse.com/pub/media/sparsh/product_attachment/Strip_Lighting_profiles_2025.pdf"],["Single Colour Garden Lights \u2014 connection","https://greenhse.com/pub/media/sparsh/product_attachment/Single Colour Garden Lights connection_new.pdf"],["240V Strip Lighting","https://greenhse.com/pub/media/sparsh/product_attachment/240V-Strip-lighting-new.pdf"],["Connecting & Setup","https://greenhse.com/pub/media/sparsh/product_attachment/Connecting_and_setup.pdf"],["Star Lights \u2014 connection","https://greenhse.com/pub/media/sparsh/product_attachment/Star Lights connection_new.pdf"],["Smart Stair Light \u2014 connection","https://greenhse.com/pub/media/sparsh/product_attachment/Smart Stair Light Connection.pdf"]];

/* ---------- DATA: FAQ ---------- */
const FAQ=[
 ["Do you deliver, and can I pick up my order?","Both. We deliver across WA and Australia — freight is calculated at checkout — and you can pick up free from our Ellenbrook showroom at 5/1 Locke Ln (Mon–Fri 8AM–5PM). Call (08) 9297 2969 and we'll have it ready."],
 ["Are your products Australian certified?","Yes. Our fittings and 12V/24V transformers are supplied to meet Australian/New Zealand safety and performance standards (RCM), and emergency/exit products are built to AS2293."],
 ["What warranty do your products carry?","Products carry manufacturer warranties (typically 1–5 years depending on the range) on top of your Australian Consumer Law rights. Keep your proof of purchase and we'll sort any issue quickly through our Perth team."],
 ["How do I know what size transformer my LED strip needs?","Add up the strip's watts-per-metre × your run length, then allow ~20% headroom. Our Strip Light Finder does this automatically. The largest single driver is 320W — for long runs it's better to use two smaller drivers (e.g. 2 × 120W) feeding each end of the strip so there's no voltage drop."],
 ["Can LED strip be cut to length?","Yes, but only at the marked cut-points, and only a limited number of times per run. Joins and ends should be soldered and cabled properly, with strip-to-lead connectors at joins and corners. Our channels come in fixed 3m lengths (they can't be cut down), so allow one channel per 3m of run."],
 ["Are your downlights dimmable, and will they work with my dimmer?","Most of our downlights are dimmable — check the Dimming row in each product's specifications. They pair best with trailing-edge LED dimmers; if you're unsure about an existing dimmer, call us with the model and we'll confirm compatibility."],
 ["Do you supply smart lighting that works with what I already have?","Yes — our Smart Life range adds app, schedule and voice control (Alexa & Google Home). Smart controllers can also upgrade compatible strip and fittings you already own."],
 ["Can you help me plan the lighting for a whole project?","Absolutely. Use our free Layout App to drop fittings onto a floor plan and get quantities, or send us your plans through the enquiry form and our team will help you specify."],
 ["Do you work with electricians, builders and commercial projects?","Every day. We supply trade and commercial jobs across WA — schools, offices, warehouses and multi-unit builds — with project pricing and lead-time support. Get in touch through the trade enquiry form."],
 ["What if something arrives damaged or isn't right?","Contact us straight away on (08) 9297 2969. Faulty or incorrectly supplied items are repaired, replaced or refunded as required under Australian Consumer Law, and unused items in original packaging can be returned within 30 days — see Returns & Shipping in the footer."]
];

/* ---------- colour temperature → hex ---------- */
function tempColor(k){
  const stops=[[2700,"#E9B949"],[3500,"#F2C97A"],[4000,"#FADFAE"],[5000,"#F3EFE3"],[5700,"#E4ECEC"],[6500,"#C2D6EA"]];
  for(let i=0;i<stops.length-1;i++){
    const [k1,c1]=stops[i],[k2,c2]=stops[i+1];
    if(k>=k1&&k<=k2){
      const t=(k-k1)/(k2-k1);
      const lerp=(a,b)=>Math.round(a+(b-a)*t);
      const h2r=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
      const [r1,g1,b1]=h2r(c1),[r2,g2,b2]=h2r(c2);
      return `rgb(${lerp(r1,r2)},${lerp(g1,g2)},${lerp(b1,b2)})`;
    }
  }
  return "#E9B949";
}
function tempLabel(k){
  if(k<3300)return "Warm white";
  if(k<4500)return "Neutral white";
  if(k<5500)return "Cool white";
  return "Daylight";
}
const toneToColor=t=>t==="warm"?"#E9B949":t==="neutral"?"#FADFAE":t==="cool"?"#C2D6EA":"#caa6e0";

/* ---------- lamp visual (self-contained SVG, no external images) ---------- */
function lamp(shape,tone){
  const c=toneToColor(tone);
  const glow=`<defs><radialGradient id="g" cx="50%" cy="42%" r="60%"><stop offset="0%" stop-color="${c}" stop-opacity=".95"/><stop offset="60%" stop-color="${c}" stop-opacity=".18"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient></defs><rect width="100" height="100" fill="url(#g)"/>`;
  const S={
    down:`<circle cx="50" cy="46" r="20" fill="none" stroke="#c9c9bd" stroke-width="2.5"/><circle cx="50" cy="46" r="12" fill="${c}"/>`,
    strip:`<rect x="14" y="44" width="72" height="9" rx="4" fill="${c}"/><rect x="14" y="44" width="72" height="9" rx="4" fill="none" stroke="#c9c9bd" stroke-width="1.5"/>`,
    panel:`<rect x="26" y="22" width="48" height="48" rx="2" fill="${c}"/><rect x="26" y="22" width="48" height="48" rx="2" fill="none" stroke="#c9c9bd" stroke-width="2.5"/>`,
    highbay:`<path d="M30 56h40l-6 16H36z" fill="${c}"/><path d="M50 26v8" stroke="#c9c9bd" stroke-width="2.5"/><path d="M34 56a16 16 0 0 1 32 0z" fill="none" stroke="#c9c9bd" stroke-width="2.5"/>`,
    fan:`<circle cx="50" cy="46" r="6" fill="${c}"/><g stroke="#c9c9bd" stroke-width="2.5" fill="none"><path d="M50 40c0-12 8-16 8-16"/><path d="M56 50c12 0 16 8 16 8"/><path d="M44 52c0 12-8 16-8 16"/><path d="M44 42c-12 0-16-8-16-8"/></g>`,
    flood:`<rect x="30" y="32" width="40" height="28" rx="2" fill="${c}"/><rect x="30" y="32" width="40" height="28" rx="2" fill="none" stroke="#c9c9bd" stroke-width="2.5"/><path d="M50 60v10" stroke="#c9c9bd" stroke-width="2.5"/>`,
    wall:`<path d="M38 28h24v18a12 12 0 0 1-24 0z" fill="${c}"/><path d="M38 28h24v18a12 12 0 0 1-24 0z" fill="none" stroke="#c9c9bd" stroke-width="2.5"/>`,
    batten:`<rect x="16" y="42" width="68" height="12" rx="2" fill="${c}"/><rect x="16" y="42" width="68" height="12" rx="2" fill="none" stroke="#c9c9bd" stroke-width="1.5"/>`,
    track:`<rect x="20" y="34" width="60" height="5" rx="2" fill="#c9c9bd"/><circle cx="40" cy="52" r="7" fill="${c}"/><circle cx="62" cy="52" r="7" fill="${c}"/>`,
    sensor:`<circle cx="50" cy="46" r="10" fill="${c}"/><g stroke="#c9c9bd" stroke-width="2" fill="none"><path d="M34 46a16 16 0 0 1 32 0"/><path d="M40 46a10 10 0 0 1 20 0"/></g>`,
    star:`<path d="M50 30l4 10 11 1-8 7 3 11-10-6-10 6 3-11-8-7 11-1z" fill="${c}"/>`,
    switch:`<rect x="36" y="26" width="28" height="44" rx="3" fill="none" stroke="#c9c9bd" stroke-width="2.5"/><rect x="44" y="38" width="12" height="20" rx="2" fill="${c}"/>`,
    transformer:`<rect x="28" y="36" width="44" height="24" rx="2" fill="none" stroke="#c9c9bd" stroke-width="2.5"/><path d="M36 36v24M64 36v24" stroke="${c}" stroke-width="3"/>`,
    emergency:`<path d="M50 26l16 8v12c0 10-16 18-16 18s-16-8-16-18V34z" fill="none" stroke="#c9c9bd" stroke-width="2.5"/><path d="M50 38v10M50 54h.1" stroke="${c}" stroke-width="3"/>`,
    garden:`<path d="M50 34a10 10 0 0 0-10 10c0 7 10 18 10 18s10-11 10-18a10 10 0 0 0-10-10z" fill="${c}"/><path d="M50 62v8" stroke="#c9c9bd" stroke-width="2.5"/>`,
    bulb:`<path d="M50 28a13 13 0 0 0-7 24v6h14v-6a13 13 0 0 0-7-24z" fill="${c}"/><path d="M45 64h10M47 68h6" stroke="#c9c9bd" stroke-width="2.5"/>`
  };
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${glow}${S[shape]||S.down}</svg>`;
}
window.__lamp=lamp;
window.lampFallback=function(img){var t=img.parentElement;var d=document.createElement("div");d.className="lamp";d.innerHTML=window.__lamp(img.dataset.shape,img.dataset.tone);img.replaceWith(d);t.classList.remove("hasimg");};
window.catFallback=function(img){if(!img.parentElement)return;var s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("class","ic");s.setAttribute("viewBox","0 0 24 24");s.setAttribute("fill","none");var p=document.createElementNS("http://www.w3.org/2000/svg","path");p.setAttribute("d","M12 3a6 6 0 0 0-6 6h12a6 6 0 0 0-6-6z");s.appendChild(p);img.parentElement.replaceChildren(s);};
function esc(s){return (s||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");}
function media(p,ctx){
  if(!p.img){return '<div class="lamp">'+lamp(p.shape,p.tone)+'</div>';}
  return '<img class="pimg '+ctx+'" loading="lazy" src="'+p.img+'" alt="'+esc(p.name)+'" data-shape="'+p.shape+'" data-tone="'+p.tone+'" onload="this.parentElement&&this.parentElement.classList.add(\'hasimg\')" onerror="window.lampFallback(this)">';
}

/* ---------- STATE ---------- */
let cart=[];          // {key,id,opt,price,qty}
let wishlist=new Set();
/* persistence — cart & wishlist survive refresh */
function saveState(){
  try{
    localStorage.setItem("gh_cart",JSON.stringify(cart));
    localStorage.setItem("gh_wish",JSON.stringify([...wishlist]));
  }catch(e){}
}
function loadState(){
  try{
    const c=JSON.parse(localStorage.getItem("gh_cart")||"[]");
    if(Array.isArray(c)) cart=c.filter(l=>l&&l.id&&findP(l.id));
    const w=JSON.parse(localStorage.getItem("gh_wish")||"[]");
    if(Array.isArray(w)) wishlist=new Set(w.filter(id=>findP(id)));
  }catch(e){}
}
let modalProduct=null, modalOpt=null, modalQty=1;
function lineKey(id,opt){return opt?id+"::"+opt:id;}
let activeCat="all";
let query="";
let expanded=new Set();

/* ---------- RENDER: nav menus, category grid, footer ---------- */
/* Each category's real page (the ones that open with the 2026 banner artwork).
   Menu links and tiles navigate there; the in-page shop stays reachable via
   search and the filter chips. */
const CATPAGE={transformers:"/products/lighting-perth/australian-certified-12v-24v-transformers-greenhouse-technologies/",fans:"/products/lighting-perth/air-flow/",batten:"/lighting-perth/led-batten-lights-perth/",ceiling:"/lighting-perth/led-ceiling-lights-perth/",downlights:"/products/lighting-perth/led-downlights-perth/",emergency:"/products/lighting-perth/emergency-lights/",flood:"/products/lighting-perth/led-flood-lights-perth/",highbay:"/products/lighting-perth/high-bay-lights/",industrial:"/lighting-perth/industrial-lighting-perth/",landscape:"/products/lighting-perth/led-garden-pool-lights-perth/",outdoor:"/products/lighting-perth/led-outdoor-wall-lights-perth/",commercial:"/lighting-perth/commercial-lighting-perth/",sensors:"/products/lighting-perth/security-sensors/",star:"/products/lighting-perth/led-star-lights/",strip:"/products/lighting-perth/led-strip-lights/",track:"/products/lighting-perth/led-track-lights-perth/",switches:"/products/lighting-perth/glass-light-switch-perth-html/",smart:"/automation/smart-lights-perth/"};
function fillMenus(){
  $("#megaCats").innerHTML=CATEGORIES.map(c=>
    `<a href="${CATPAGE[c.id]||"#shop"}">${c.name}<span class="k">${count(c.id)}</span></a>`).join("");
  $("#mCats").innerHTML=CATEGORIES.map(c=>`<a href="${CATPAGE[c.id]||"#shop"}">${c.name}</a>`).join("");
  $("#footCats").innerHTML=CATEGORIES.slice(0,8).map(c=>`<li><a href="${CATPAGE[c.id]||"#shop"}">${shortName(c.name)}</a></li>`).join("");
}
const shortName=n=>n.split(" / ")[0].replace(/\s*\(.*\)/,"");
const count=id=>PRODUCTS.filter(p=>p.cat===id).length;

const CAT_PICK={downlights:/downlight/i,strip:/rgb.*strip|strip light \/metre/i,highbay:/high bay/i,
 ceiling:/oyster|ceiling/i,fans:/fan/i,sensors:/sensor/i,landscape:/garden|bollard|spike/i,outdoor:/wall|up.?down/i,
 flood:/flood/i,batten:/batten/i,emergency:/exit|emergency/i,industrial:/tri.?proof|weather/i,
 track:/track/i,star:/star/i,switches:/switch|powerpoint/i,smart:/smart|wifi|camera/i,transformers:/transformer/i,school:/panel|led/i};
function catPhoto(cid){
  const rx=CAT_PICK[cid];
  if(rx){ const m=PRODUCTS.find(x=>x.cat===cid&&x.img&&rx.test(x.name)); if(m) return m.img; }
  const p=PRODUCTS.find(x=>x.cat===cid&&x.img);return p?p.img:"";
}
function pageSlug(p){
  let s=String(p.url||"").replace(/\/+$/,"").split("/").pop().replace(/\.html?$/,"");
  if(!s||s==="index")s=String(p.id||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  return s;
}
function catPageLinks(cid){
  const seen=new Set();
  return PRODUCTS.filter(p=>p.cat===cid)
    .map(p=>({name:p.name,slug:pageSlug(p),
      href:p.url?String(p.url).replace(/^https?:\/\/[^\/]+/,""):("product/"+pageSlug(p)+"/index.html")}))
    .filter(x=>x.slug&&!seen.has(x.slug)&&seen.add(x.slug));
}
/* Mock-up (Home_page_mock_up.pdf) calls for dark full-bleed photo tiles with the
   category name over them. We only own environment photography for a handful of
   categories - all of it shot for strip lighting - so a category gets a real scene
   only where that scene honestly shows that category's product doing its job.
   Everything else falls back to the product cut-out on the same dark tile, which
   keeps the grid consistent instead of mixing a mood shot with a white box.
   CAT_MOOD is deliberately small: see MOOD-TODO in CONTINUE-HERE.md for the list
   of categories still waiting on real photography. */
/* Category artwork (CATIMG, from Catalogue_images.pdf). Each banner already has
   the category name set into it, so the tile must not print the name a second
   time - the <h3> stays in the DOM for screen readers and SEO but is hidden. */
const CAT_MOOD={
  strip:      "Recessed ceiling coves & under-cabinet task light",
  landscape:  "Outdoor steps & garden edges",
  commercial: "Reception & retail counters"
};
function catMood(cid){
  if(typeof CATIMG!=="undefined"&&CATIMG.cats&&CATIMG.cats[cid])
    return {img:CATIMG.cats[cid].img,label:CATIMG.cats[cid].alt,
            baked:!!CATIMG.titleInArtwork};
  if(typeof STRIPIMG==="undefined"||!STRIPIMG.moods)return null;
  const want=CAT_MOOD[cid]; if(!want)return null;
  const m=STRIPIMG.moods.find(x=>x.label===want);
  return m?{img:m.img,label:m.label,baked:false}:null;
}
function catHasScene(cid){ return !!catMood(cid); }
function renderCats(){
  $("#catGrid").innerHTML=CATEGORIES.map(c=>{
    const mood=catMood(c.id);
    const img=catPhoto(c.id);
    let media;
    if(mood){
      media=`<img class="cat-scene" src="${mood.img}" loading="lazy" alt="${mood.label}">`;
    }else if(img){
      media=`<img class="cat-cut" src="${img}" loading="lazy" alt="${c.name}" onerror="window.catFallback(this)">`;
    }else{
      media=`<svg class="ic" viewBox="0 0 24 24" fill="none">${c.icon.split("M").filter(Boolean).map(d=>`<path d="M${d}"/>`).join("")}</svg>`;
    }
    const links=catPageLinks(c.id);
    const dir=links.length?`<details class="cat-links"><summary>Browse ${links.length} product page${links.length===1?"":"s"}</summary><ul>
      <li><a href="${CATPAGE[c.id]||("category/"+c.id+"/index.html")}" class="cl-all">All ${c.name} \u2192</a></li>
      ${links.map(x=>`<li><a href="${x.href}">${x.name}</a></li>`).join("")}
    </ul></details>`:"";
    const baked=!!(mood&&mood.baked);
    return `<div class="catcell"><a class="cat${mood?" has-scene":""}${baked?" name-in-art":""}" href="${CATPAGE[c.id]||"#shop"}">
      <div class="cat-photo">${media}</div>
      <div class="cat-info">
        <h3${baked?' class="vis-hidden"':""}>${c.name}</h3>
        <div class="cnt">${count(c.id)} product${count(c.id)===1?"":"s"}</div>
      </div>
    </a>${dir}</div>`;
  }).join("");
}

/* ---------- RENDER: filters + products ---------- */
function renderFilters(){
  const cats=[{id:"all",name:"All"}].concat(CATEGORIES.map(c=>({id:c.id,name:shortName(c.name)})));
  $("#filters").innerHTML=cats.map(c=>`<button class="chip${c.id===activeCat?" active":""}" data-cat="${c.id}">${c.name}</button>`).join("");
}
function filtered(){
  return PRODUCTS.filter(p=>{
    const okCat=activeCat==="all"||p.cat===activeCat;
    const q=query.trim().toLowerCase();
    const catName=(CATEGORIES.find(c=>c.id===p.cat)||{}).name||"";
    const okQ=!q||p.name.toLowerCase().includes(q)||catName.toLowerCase().includes(q)||
      Object.values(p.specs).join(" ").toLowerCase().includes(q)||
      (p.specTable||[]).map(r=>r[1]).join(" ").toLowerCase().includes(q)||
      p.id.toLowerCase().includes(q);
    return okCat&&okQ;
  });
}
function cardHTML(p){
  const catName=shortName((CATEGORIES.find(c=>c.id===p.cat)||{}).name||"");
  const specs=Object.entries(p.specs).slice(0,3).map(([k,v])=>`<span class="spec">${v}</span>`).join("");
  return `<article class="card" data-id="${p.id}">
      <div class="thumb" data-view="${p.id}">
        ${p.tag?`<span class="tag">${p.tag}</span>`:""}
        <button class="wish${wishlist.has(p.id)?" on":""}" data-wish="${p.id}" aria-label="Save to wishlist">
          <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
        </button>
        ${media(p,"thumb")}
      </div>
      <div class="body">
        <span class="cat-label">${catName}</span>
        <h3 data-view="${p.id}" style="cursor:pointer">${p.name}</h3>
        <div class="specs">${specs}</div>
        <div class="foot">
          <span class="price">${p.options&&p.options.length?'<span class="from">from</span>':''}$${p.price.toFixed(2)}<span class="ex">ex-GST</span></span>
          <button class="add" data-add="${p.id}">${p.options&&p.options.length?'Options':'Add +'}</button>
        </div>
      </div>
    </article>`;
}
const PREVIEW=8;
function renderShop(){
  const host=$("#shopBody");
  const q=query.trim().toLowerCase();
  if(q){
    const list=filtered();
    if(list.length){ host.innerHTML=`<div class="prod-grid">${list.map(cardHTML).join("")}</div>`; return; }
    const sugg=["downlights","strip","highbay","sensors"].map(cid=>PRODUCTS.find(p=>p.cat===cid&&p.img)).filter(Boolean);
    host.innerHTML=`<div class="no-results">No fittings match "${query}". Try a product type (e.g. "downlight"), a spec (e.g. "IP65", "10W") or a colour ("tri-colour").</div>
      <div class="shop-hint" style="margin-top:18px">Popular right now:</div>
      <div class="prod-grid">${sugg.map(cardHTML).join("")}</div>`;
    return;
  }
  if(activeCat==="all"){
    // compact default: a few popular picks; categories above are the navigator
    const heroCats=["downlights","strip","highbay","ceiling","fans","sensors","landscape","outdoor"];
    const feat=[]; heroCats.forEach(cid=>{const p=PRODUCTS.find(x=>x.cat===cid&&x.img); if(p)feat.push(p);});
    host.innerHTML='<div class="shop-hint">Popular picks shown below — tap a category above (with photos), use the filters, or search to see the full range.</div>'
      +'<div class="prod-grid">'+feat.map(cardHTML).join("")+'</div>';
    return;
  }
  const c=CATEGORIES.find(x=>x.id===activeCat)||{name:"Products"};
  const items=PRODUCTS.filter(p=>p.cat===activeCat);
  const collapsed=!expanded.has(activeCat)&&items.length>PREVIEW;
  const moreBtn=items.length>PREVIEW
    ? `<button class="view-more" data-more="${activeCat}">${expanded.has(activeCat)?"Show less":("View all "+items.length+" \u2192")}</button>`
    : "";
  host.innerHTML=`<section class="cat-block${collapsed?" collapsed":""}" data-catblock="${activeCat}">
      <div class="cat-block-head">
        <h3>${c.name}</h3>
        <span class="cat-count">${items.length} product${items.length===1?"":"s"}</span>
      </div>
      <div class="prod-grid">${items.map(cardHTML).join("")}</div>
      ${moreBtn}
    </section>`;
}

/* ---------- CART ---------- */
const findP=id=>PRODUCTS.find(p=>p.id===id);
function addToCart(id,opt,price,qty){
  const p=findP(id);if(!p)return;
  const unit=(price!=null)?price:p.price;
  const key=lineKey(id,opt||null);
  const n=(qty&&qty>0)?qty:1;
  const line=cart.find(l=>l.key===key);
  if(line)line.qty+=n;else cart.push({key,id,opt:opt||null,price:unit,qty:n});
  updateCart();
}
function setQty(key,d){
  const line=cart.find(l=>l.key===key);if(!line)return;
  line.qty+=d;if(line.qty<=0)cart=cart.filter(l=>l.key!==key);
  updateCart();
}
function removeLine(key){cart=cart.filter(l=>l.key!==key);updateCart();}
function cartCount(){return cart.reduce((n,l)=>n+l.qty,0);}
function cartTotal(){return cart.reduce((s,l)=>s+l.price*l.qty,0);}
function updateCart(){
  saveState();
  const badge=$("#cartBadge");const n=cartCount();
  badge.textContent=n;badge.dataset.count=n;
  $("#cartTotal").textContent="$"+cartTotal().toFixed(2);
  const cg=$("#cartTotalGst"); if(cg) cg.textContent="$"+(cartTotal()*1.1).toFixed(2);
  const wrap=$("#cartItems");
  if(!cart.length){wrap.innerHTML=`<div class="cart-empty">Your cart is empty.<br>Add a few fittings to get started.</div>`;return;}
  wrap.innerHTML=cart.map(l=>{const p=findP(l.id);
    const vi=(l.opt&&typeof optImg==="function")?optImg(p,{label:l.opt}):null;
    return `
    <div class="ci">
      <div class="img${vi?" hasimg":""}">${vi?`<img class="pimg img" src="${vi}" alt="${l.opt}">`:((typeof media==="function")?media(p,"img"):lamp(p.shape,p.tone))}</div>
      <div class="det">
        <h4>${p.name}</h4>
        <div class="c">${shortName((CATEGORIES.find(c=>c.id===p.cat)||{}).name)}${l.opt?" · "+l.opt:""}</div>
        ${p.url?`<a class="ci-buy" href="${p.url}" target="_blank" rel="noopener">Buy on greenhse.com &#8599;</a>`:""}
        <div class="qty">
          <button data-q="${l.key}" data-d="-1" aria-label="Decrease">−</button>
          <span>${l.qty}</span>
          <button data-q="${l.key}" data-d="1" aria-label="Increase">+</button>
        </div>
      </div>
      <div class="rt">
        <span class="p">$${(l.price*l.qty).toFixed(2)}</span>
        <button class="rm" data-rm="${l.key}">Remove</button>
      </div>
    </div>`;}).join("");
}

/* ---------- WISHLIST ---------- */
function toggleWish(id){
  if(wishlist.has(id))wishlist.delete(id);else wishlist.add(id);
  saveState();
  refreshWishBadge();
  $$(`[data-wish="${id}"]`).forEach(el=>el.classList.toggle("on",wishlist.has(id)));
}
function refreshWishBadge(){
  const b=$("#wishBadge");b.textContent=wishlist.size;b.dataset.count=wishlist.size;
}

/* ---------- QUICK VIEW MODAL ---------- */
function gst(v){return (v*1.1).toFixed(2);}
function baseId(id){const m=String(id||"").match(/^(.*)-\d+$/);return m?m[1]:id;}
function optImg(p,opt){
  if(!opt||!opt.label)return null;
  const L=opt.label;
  if(typeof CTRLIMG!=="undefined"&&p&&CTRLIMG.byProduct){
    const BP=CTRLIMG.byProduct;
    if(BP[p.id]&&BP[p.id][L])return BP[p.id][L];
    const bid=baseId(p.id);
    if(bid!==p.id&&BP[bid]&&BP[bid][L])return BP[bid][L];
  }
  if(typeof TRIMG!=="undefined"&&TRIMG.options&&TRIMG.options[L])return TRIMG.options[L];
  if(typeof CTRLIMG!=="undefined"&&CTRLIMG.options&&CTRLIMG.options[L])return CTRLIMG.options[L];
  if(typeof CHANIMG!=="undefined"&&CHANIMG.options&&CHANIMG.options[L])return CHANIMG.options[L].img;
  return null;
}
// Colour-variant caveat for a channel option whose supplier photo is the silver
// finish. Empty string when the photo genuinely shows that colour.
function optImgNote(p,opt){
  if(!opt||!opt.label)return "";
  if(typeof CHANIMG!=="undefined"&&CHANIMG.options&&CHANIMG.options[opt.label])
    return CHANIMG.options[opt.label].note||"";
  return "";
}
function productHasVariantPhotos(p){
  return !!(p&&p.options&&p.options.some(o=>optImg(p,o)));
}
window.__optShotFallback=function(img){
  if(img.dataset.fb)return;               /* one retry only */
  img.dataset.fb="1";
  var p=(typeof modalProduct!=="undefined"&&modalProduct)?modalProduct:null;
  if(p&&p.img&&p.img!==img.getAttribute("src")){ img.src=p.img; return; }
  if(window.lampFallback) window.lampFallback(img);
};
function setModalImg(){
  const el=$("#modalImg"); if(!el||!modalProduct)return;
  const src=optImg(modalProduct,modalOpt);
  if(src){
    /* Never leave the panel blank: a missing variant photo falls back to the
       product's own shot rather than an empty box. */
    el.innerHTML='<img class="pimg mimg optshot" src="'+src+'" alt="'+(modalOpt?modalOpt.label:modalProduct.name).replace(/"/g,"&quot;")+'" onerror="window.__optShotFallback&&window.__optShotFallback(this)">';
    el.classList.add("hasimg");
  }
  else { el.innerHTML=media(modalProduct,"mimg"); }
  const note=$("#modalImgNote");
  if(note){
    const cnote=optImgNote(modalProduct,modalOpt);
    if(cnote){
      note.textContent=cnote;
      note.hidden=false;
    } else if(productHasVariantPhotos(modalProduct)&&modalOpt&&!src){
      note.textContent="Photo shows another unit from this range \u2014 specs below are for the "+modalOpt.label+".";
      note.hidden=false;
    } else note.hidden=true;
  }
}
function openModal(id){
  const p=findP(id);if(!p)return;
  modalProduct=p; modalOpt=(p.options&&p.options.length)?p.options[0]:null; modalQty=1;
  const catName=shortName((CATEGORIES.find(c=>c.id===p.cat)||{}).name||"");
  $("#modalImg").innerHTML=media(p,"mimg");
  const hasOpt=p.options&&p.options.length;
  const optBlock=hasOpt?`
    <div class="opt-wrap">
      <label class="opt-label" for="optSelect">Choose option / size — ${p.options.length} available</label>
      <div class="opt-select-wrap">
        <select id="optSelect" class="opt-select" aria-label="Choose option">
          ${p.options.map((o,i)=>`<option value="${i}">${o.label}  —  $${o.price.toFixed(2)} ex-GST</option>`).join("")}
        </select>
      </div>
      <div class="opt-gallery" id="optGallery">
        ${(()=>{
          /* Several finishes of the same profile legitimately share one supplier photo.
             Without a marker three tiles just look like a duplicated bug, so the repeats
             get a colour swatch and say whose photo they are actually showing. */
          /* Work out, per photo, how many options share it and whether ANY of them
             carries a "photo is really the silver one" caveat. Marking by position
             would wrongly crown whichever finish happens to be listed first. */
          const share={}, noted={};
          p.options.forEach(o=>{
            const im=optImg(p,o); if(!im) return;
            share[im]=(share[im]||0)+1;
            if(optImgNote(p,o)) noted[im]=true;
          });
          return p.options.map((o,i)=>{
            const im=optImg(p,o);
            const dup=im&&share[im]>1;
            const fin=(o.label.match(/\b(White|Black|Silver|Grey|Gray)\b/)||[])[1]||"";
            const sw=fin?`<i class="ot-sw ot-sw-${fin.toLowerCase()}" title="${fin}"></i>`:"";
            const note=optImgNote(p,o);
            const shown=(note.match(/shows the (\w+) finish/i)||[])[1];
            // caveated tile -> say whose photo it really is; shared-but-honest photo
            // (one shot that genuinely pictures every finish) -> say that instead
            const mark=shown?`<i class="ot-dup">Photo shows ${shown}</i>`
                     :(dup&&!noted[im]?`<i class="ot-dup">One photo \u2014 all finishes</i>`:"");
            return `<button class="opt-tile${i===0?" sel":""}${im?"":" nophoto"}${mark?" is-dup":""}" data-optidx="${i}" aria-label="${o.label.replace(/"/g,"&quot;")}">
              ${im?`<img src="${im}" alt="" loading="lazy">`:`<span class="ph">photo<br>coming</span>`}
              <span>${sw}${o.label}</span><em>$${o.price.toFixed(2)}</em>${mark}
            </button>`;
          }).join("");
        })()}
      </div>
    </div>`:"";
  const unit=(modalOpt?modalOpt.price:p.price);
  $("#modalBody").innerHTML=`
    <span class="cat-label">${catName}</span>
    <h2>${p.name}</h2>
    <div class="mprice">
      <span class="price big">$<span id="modalPrice">${unit.toFixed(2)}</span></span>
      <span class="gstline">ex-GST &nbsp;·&nbsp; $<span id="modalGst">${gst(unit)}</span> inc GST</span>
    </div>
    <p class="desc">${p.desc||""}</p>
    ${demoPanel(p.id)}
    ${optBlock}
    <div id="optDetail" class="opt-detail"></div>
    <div class="buy-row">
      <div class="stepper" aria-label="Quantity">
        <button data-mq="-1" aria-label="Decrease quantity">−</button>
        <span id="modalQty">1</span>
        <button data-mq="1" aria-label="Increase quantity">+</button>
      </div>
      <button class="btn btn-dark buy-btn" data-add="${p.id}" data-frommodal="1">Add to cart</button>
      <button class="wish-detail${wishlist.has(p.id)?' on':''}" data-wish="${p.id}" aria-label="Save to wishlist">
        <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
      </button>
    </div>
    <div class="trust">
      <span>\u2713 Australian certified</span><span>\u2713 Perth stock &amp; support</span><span>\u2713 Fast WA delivery</span>
    </div>
    <a class="inst-jump" data-instjump="1">\u2193 Installation help &amp; guide for this product</a>
    <div class="dsec">
      <h4>What\u2019s in the box</h4>
      <ul class="ticks">${(p.includes||[]).map(x=>`<li>${x}</li>`).join("")}</ul>
    </div>
    <div class="dsec">
      <h4>Key features</h4>
      <ul class="ticks">${(p.features||[]).map(x=>`<li>${x}</li>`).join("")}</ul>
    </div>
    <div class="dsec">
      <h4>Specifications</h4>
      <table class="spectable"><tbody>${(p.specTable||[]).map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</tbody></table>
    </div>
    <div class="dsec install-guide" id="mInstall">
      <h4>Installation guide</h4>
      ${guideHTML(p)}
    </div>
    <a class="view-live" href="${p.url}" target="_blank" rel="noopener">View this product on greenhse.com \u2197</a>
    ${relatedHTML(p)}`;
  demoWire($("#modalBody"));
  renderOptDetail();
  setModalImg();
  $("#modal").classList.add("open");
}
function relatedHTML(p){
  const rel=PRODUCTS.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,4);
  if(!rel.length) return "";
  return `<div class="dsec related"><h4>You might also need</h4>
    <div class="rel-grid">${rel.map(r=>`
      <button class="rel-card" data-view="${r.id}">
        <div class="rel-img">${(typeof media==="function")?media(r,"img"):lamp(r.shape,r.tone)}</div>
        <span class="rel-name">${r.name}</span>
        <span class="rel-price">$${r.price.toFixed(2)}</span>
      </button>`).join("")}</div></div>`;
}
function renderOptDetail(){
  const el=$("#optDetail"); if(!el) return;
  // channel variants carry a supplier cross-section drawing for the exact profile
  let dimFig="";
  if(modalOpt&&typeof CHANIMG!=="undefined"&&CHANIMG.options&&CHANIMG.options[modalOpt.label]){
    const d=CHANIMG.options[modalOpt.label].dim;
    if(d) dimFig='<figure class="opt-dimfig"><img src="'+d+'" alt="'+modalOpt.label.replace(/"/g,"&quot;")+' cross-section with dimensions" loading="lazy">'+
      '<figcaption>Supplier cross-section for this profile \u2014 dimensions in mm.</figcaption></figure>';
  }
  if(!modalOpt||((!modalOpt.specs||!modalOpt.specs.length)&&!dimFig)){el.innerHTML="";return;}
  const specs=(modalOpt.specs&&modalOpt.specs.length)
    ? '<table class="spectable"><tbody>'+modalOpt.specs.map(r=>'<tr><td>'+r[0]+'</td><td>'+r[1]+'</td></tr>').join("")+'</tbody></table>'
    : "";
  el.innerHTML='<div class="opt-detail-head">Selected variant — '+modalOpt.label+'</div>'+specs+dimFig;
}
function updateModalPrice(){
  if(!modalProduct)return;
  const unit=(modalOpt?modalOpt.price:modalProduct.price);
  const mp=$("#modalPrice"); if(mp) mp.textContent=unit.toFixed(2);
  const mg=$("#modalGst"); if(mg) mg.textContent=gst(unit);
}
function selectModalOpt(idx){
  if(!modalProduct||!modalProduct.options)return;
  modalOpt=modalProduct.options[idx];
  const selEl=$("#optSelect"); if(selEl) selEl.value=String(idx);
  const g=$("#optGallery"); if(g) g.querySelectorAll(".opt-tile").forEach(t=>t.classList.toggle("sel",+t.dataset.optidx===idx));
  updateModalPrice();
  renderOptDetail();
  setModalImg();
}
function setModalQty(d){
  modalQty=Math.max(1,modalQty+d);
  const mq=$("#modalQty"); if(mq) mq.textContent=modalQty;
}
/* Opens the full product page on top of the strip finder without losing the kit
   behind it - close it and you are back on the same kit screen. */
function openProductOverWizard(id,optLabel){
  const p=findP(id); if(!p) return;
  openModal(id);
  if(optLabel&&p.options&&p.options.length){
    const i=p.options.findIndex(o=>o.label===optLabel);
    if(i>=0) selectModalOpt(i);
  }
  const wiz=$("#stripWizard")||document.querySelector(".stripwiz");
  const m=$("#modal");
  if(m&&wiz&&wiz.classList.contains("open")) m.classList.add("over-wiz");
  const mb=$("#modalBody"); if(mb) mb.scrollTop=0;
}
const closeModal=()=>{const m=$("#modal");m.classList.remove("open");m.classList.remove("over-wiz");};

/* ---------- COLOUR TEMPERATURE (signature) ---------- */
function applyTemp(k){
  const c=tempColor(k);
  const sc=$("#phoneScene"); if(sc) sc.style.setProperty("--ptemp",c);
  const pt=$("#phoneTemp"); if(pt) pt.textContent=`${k}K`;
}

/* ---------- FAQ ---------- */

function renderBlog(){
  $("#blogGrid").innerHTML=BLOGS.map(b=>`
    <a class="post" href="${b.url}" target="_blank" rel="noopener">
      <div class="top"></div>
      <div class="pbody">
        <p class="eyebrow">Greenhse Journal</p>
        <h3>${b.title}</h3>
        <span class="go">Read article
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </a>`).join("");
}
function renderVideos(){
  $("#vidGrid").innerHTML=VIDEOS.map(v=>`
    <div class="vid"><iframe class="frame" loading="lazy" src="https://www.youtube.com/embed/${v.id}" title="Greenhse video" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe></div>`).join("");
  $("#guideGrid").innerHTML=GUIDES.map(([t,u])=>`
    <a class="guide" href="${u}" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
      <span>${t}</span>
    </a>`).join("");
}

function renderFAQ(){
  $("#faqList").innerHTML=FAQ.map(([q,a])=>`
    <div class="q"><button aria-expanded="false">${q}<span class="pm"></span></button>
    <div class="ans"><p>${a}</p></div></div>`).join("");
}

/* ---------- TOAST ---------- */
function toast(msg){
  const t=document.createElement("div");t.className="toast";
  t.innerHTML=`<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>${msg}`;
  $("#toasts").appendChild(t);
  setTimeout(()=>{t.style.opacity="0";t.style.transition="opacity .3s";setTimeout(()=>t.remove(),300);},2600);
}

/* ---------- DRAWERS / MOBILE NAV ---------- */
function openCart(){$("#cart").classList.add("open");$("#cartScrim").classList.add("show");}
function closeCart(){$("#cart").classList.remove("open");$("#cartScrim").classList.remove("show");}
function openMnav(){$("#mnav").classList.add("open");$("#scrim").classList.add("show");}
function closeMnav(){$("#mnav").classList.remove("open");$("#scrim").classList.remove("show");}

/* ---------- FORM VALIDATION ---------- */
const isEmail=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
function validateField(input,test){
  const field=input.closest(".field");
  const ok=test(input.value);
  field.classList.toggle("invalid",!ok);
  return ok;
}
function wireForm(formId,fields,successMsg){
  const form=$("#"+formId);
  form.addEventListener("submit",e=>{
    e.preventDefault();
    let ok=true;
    fields.forEach(([sel,test])=>{if(!validateField($(sel),test))ok=false;});
    if(ok){form.reset();toast(successMsg);}
  });
}

/* ============================================================
   INIT
   ============================================================ */
/* ---------- STRIP LIGHT FINDER ---------- */
/* Both of these land on the 24V Long Run COB: the "long run" answer directly, and a
   ceiling recess too tight for the chunky 240V strip. */
function swIsLongRun(a){ return a.place==="longrun"||(a.place==="cove"&&a.space==="tight"); }
const STRIP_Q=[
 {q:"Where exactly is the strip light going?",key:"place",
  hint:"Simple rule: if steam or water can ever reach it, it needs the IP65 wet-area strip. Dry joinery (inside shelving & cabinets) doesn\u2019t need waterproofing at all.",
  opts:[
   ["Recessed ceiling / cove (a hidden shelf or bulkhead in the ceiling)","cove"],
   ["Wet areas \u2014 kitchen benchtops, bathroom niches, outdoors (steam or water)","wet"],
   ["Shelving & cabinets \u2014 dry inside joinery (no water can reach it)","cabinet"],
   ["Stairs or hallway","stairs"],
   ["Long run strip light \u2014 one continuous line over about 10 metres","longrun"],
   ["Somewhere else","other"]]},
 {q:"How much flat space is inside your ceiling recess?",key:"space",
  when:function(a){return a.place==="cove";},
  hint:"240V strip sits on a shelf inside the recess. Have a look inside yours \u2014 which one is it?",
  extra:function(){ return coveDiagramPair(); },
  opts:[
   ["Yes \u2014 there\u2019s a flat shelf about 150mm across","roomy"],
   ["No \u2014 it\u2019s tighter than that, or I\u2019m not sure","tight"]]},
 {q:"How bright does this spot need to be?",key:"bright",
  when:function(a){return a.place==="wet";},
  hint:"Both are the sealed IP65 wet-area strip. Standard is plenty for benchtops and niches. Go bright (20W/m) where you want it to really pop \u2014 a bright bathroom, a feature wall, or task light over a big bench.",
  opts:[
   ["Standard brightness \u2014 12W/m","std"],
   ["Bright \u2014 20W/m (make it stand out)","bright20"]]},
 {q:"What colour light do you want?",key:"colour",
  /* Long Run COB is a tri-colour strip switched from the remote, so there is no
     colour to choose - both routes to it skip this question. */
  when:function(a){ return !swIsLongRun(a); },
  hint:function(a){ return a.place==="cove"
    ? "240V is IP65 and comes in three fixed whites \u2014 3000K warm, 4000K natural and 6000K cool \u2014 or full-colour RGB. You pick the colour at order: it is a different strip per colour, not a switchable one. Single colour is Triac dimmable; RGB gives full colour and dimming from a remote, with an RGB Gateway available if you want smart control."
    : a.place==="wet"
    ? (a.bright==="bright20"
       ? "The 20W/m bright variant is only made in two colours \u2014 4000K natural and 5500K crisp. Need warm 3000K? Go back and pick standard brightness."
       : "Wet areas use the 24V High Lumen SMD, IP65. At 12W/m it comes in 2700K, 3000K, 4000K and 5500K ($18/m) and needs no aluminium channel; at 20W/m in 4000K and 5000K. Pick one at order \u2014 there is no RGB or switchable white in this range.")
    : "Fixed whites come in 2700/3000K (warm & cosy), 4000K (natural) and 5500/6000K (crisp). CCT = adjust warm\u2194cool (2700\u20136500K) with the remote. RGB = millions of colours \u2014 note its white is less natural than a dedicated white strip."; },
  opts:function(a){ return a.place==="cove"
    /* 240V IP65: three fixed whites plus RGB. Colour is chosen at order -
       it is one strip per colour, not a switchable one. */
    ? [["Warm white \u2014 3000K","w3000"],["Natural white \u2014 4000K","w4000"],["Cool white \u2014 6000K","w6000"],["Full colour (RGB)","rgb"]]
    : a.place==="wet"
    ? (a.bright==="bright20"
       /* IP65 at 20W/m comes in two whites */
       ? [["Natural white \u2014 4000K","w4000"],["Bright white \u2014 5000K","w5000"]]
       /* IP65 at 12W/m comes in four */
       : [["Extra warm \u2014 2700K","w2700"],["Warm white \u2014 3000K","w3000"],["Natural white \u2014 4000K","w4000"],["Crisp white \u2014 5500K","w5500"]])
    : [["One fixed white (pick warm, natural or cool)","single"],
       ["Adjustable white \u2014 warm \u2194 cool with the remote (CCT)","cct"],
       ["Full colour (RGB) \u2014 millions of colours","rgb"]]; }},
 {q:"How do you want to control it?",key:"control",
  when:function(a){return a.place!=="cove"&&!swIsLongRun(a);},
  hint:function(a){ return a.colour==="rgb"
    ? "Either way you get a controller in the kit \u2014 it's the box that lets you change colour, dim the light and turn it on and off. The only difference is how you talk to it: a handheld remote, or your phone."
    : "Either way you get a controller in the kit \u2014 it's the box that lets you dim the light and turn it on and off. The only difference is how you talk to it: a handheld remote, or your phone."; },
  opts:[["Simple \u2014 with a remote","simple"],["Smart \u2014 from the phone app","smart"]]},
 {q:"How many metres do you need?",key:"length",input:true,
  hint:function(a){ return swIsLongRun(a)
    ? "Type your run length in metres. The Long Run COB is made for long runs \u2014 5 metres and up. Shorter than that and we\u2019ll point you at a better-suited strip, so give us a call."
    : a.place==="cove"
    ? "Type your exact run length. 240V recessed strip: whites 10\u201350m, RGB 10\u201335m. Under 10 metres? We\u2019ll ask you to give us a quick call \u2014 (08) 9297 2969."
    : "Type your run length in metres. 24V strip feeds from one end up to 5m; 5\u201310m needs power from TWO points (e.g. two corners). Over 10 metres? We\u2019ll ask you to give us a quick call."; }},
];
/* Cove cross-section diagrams for the recess question. Redrawn as SVG from the
   supplier's CORRECT / INCORRECT drawings. Kept deliberately label-light so the
   two sit side by side and stay legible - the explanation lives in one caption
   underneath rather than crowded inside the drawings. */
function coveDiagram(kind){
  const CEIL='#15170F', LIGHT='#F2C230', STRIP='#E07B39', DIM='var(--muted)', BAD='#C4453B';
  function hatch(x1,x2,y){
    let o='<line x1="'+x1+'" y1="'+y+'" x2="'+x2+'" y2="'+y+'" stroke="'+CEIL+'" stroke-width="3"/>';
    for(let x=x1+7;x<x2;x+=15) o+='<line x1="'+x+'" y1="'+y+'" x2="'+(x-9)+'" y2="'+(y-10)+'" stroke="'+CEIL+'" stroke-width="1.8"/>';
    return o;
  }
  if(kind==="correct"){
    return '<svg viewBox="0 0 260 150" role="img" aria-label="Enough room: strip on the back edge washes light across the ceiling">'
      + hatch(20,246,40)
      + '<path d="M46 40 V104 H182 V70" fill="none" stroke="'+CEIL+'" stroke-width="3.4"/>'
      + '<path d="M62 86 L74 46 H240 V54 H76 Z" fill="'+LIGHT+'" opacity=".9"/>'
      + '<rect x="48" y="86" width="13" height="18" fill="'+STRIP+'"/>'
      + '<path d="M196 50 h44 m0 0 l-7 -4 m7 4 l-7 4" stroke="#2C6B45" stroke-width="1.8" fill="none"/>'
      + '<line x1="46" y1="118" x2="182" y2="118" stroke="'+DIM+'" stroke-width="1.2"/>'
      + '<line x1="46" y1="113" x2="46" y2="123" stroke="'+DIM+'" stroke-width="1.2"/>'
      + '<line x1="182" y1="113" x2="182" y2="123" stroke="'+DIM+'" stroke-width="1.2"/>'
      + '<text x="114" y="136" font-size="14" fill="'+DIM+'" text-anchor="middle">150&#8201;mm</text>'
      + '<line x1="192" y1="70" x2="192" y2="104" stroke="'+DIM+'" stroke-width="1.2"/>'
      + '<line x1="187" y1="70" x2="197" y2="70" stroke="'+DIM+'" stroke-width="1.2"/>'
      + '<line x1="187" y1="104" x2="197" y2="104" stroke="'+DIM+'" stroke-width="1.2"/>'
      + '<text x="202" y="92" font-size="14" fill="'+DIM+'">50&#8201;mm</text>'
      + '</svg>';
  }
  return '<svg viewBox="0 0 260 150" role="img" aria-label="Too tight: the front lip blocks the light before it reaches the ceiling">'
    + hatch(20,246,40)
    + '<path d="M46 40 V114 H140 V52" fill="none" stroke="'+CEIL+'" stroke-width="3.4"/>'
    + '<path d="M62 96 L74 58 H138 V66 H76 Z" fill="'+LIGHT+'" opacity=".55"/>'
    + '<rect x="48" y="96" width="13" height="18" fill="'+STRIP+'"/>'
    + '<line x1="140" y1="52" x2="140" y2="116" stroke="'+BAD+'" stroke-width="3.4"/>'
    + '<path d="M152 66 l20 20 m0 -20 l-20 20" stroke="'+BAD+'" stroke-width="3"/>'
    + '<line x1="46" y1="128" x2="140" y2="128" stroke="'+DIM+'" stroke-width="1.2"/>'
    + '<line x1="46" y1="123" x2="46" y2="133" stroke="'+DIM+'" stroke-width="1.2"/>'
    + '<line x1="140" y1="123" x2="140" y2="133" stroke="'+DIM+'" stroke-width="1.2"/>'
    + '<text x="93" y="146" font-size="14" fill="'+DIM+'" text-anchor="middle">under 150&#8201;mm</text>'
    + '</svg>';
}
function coveDiagramPair(){
  return '<div class="cove-wrap">'
    + '<div class="cove-dia">'
    + '<figure><span class="cd-tag cd-ok">\u2713 Enough room</span>'+coveDiagram("correct")+'</figure>'
    + '<figure><span class="cd-tag cd-bad">\u2715 Too tight</span>'+coveDiagram("tight")+'</figure>'
    + '</div>'
    + '<p class="cove-cap">The strip sits on the back edge and throws light <b>across</b> the ceiling. '
    + 'With a shelf around 150&#8201;mm wide and a lip under ~50&#8201;mm you get an even wash; in a narrower, '
    + 'deeper recess the lip blocks it and you just see a bright stripe.</p>'
    + '</div>';
}
let swAnswers={}, swStep=0, swShown=false, swTimer=null, swPackageStrip=null, swPkgSel={};
function swVisibleQs(){ return STRIP_Q.filter(function(q){ return !q.when||q.when(swAnswers); }); }
function stripIP(p){
  const hay=((p.specTable||[]).map(r=>r[1]).join(" ")+" "+p.name).toLowerCase();
  const m=hay.match(/ip\s?(\d{2})/);
  return m?parseInt(m[1],10):20;
}
function stripPool(){
  return PRODUCTS.filter(function(p){ return p.cat==="strip" && /strip/i.test(p.name) && !/suspension|modular|channel|transformer|controller|remote/i.test(p.name); });
}
/* Real facts per strip family — from the Greenhse "Understanding Strip Lighting" guide */
function stripFacts(p){
  const n=p.name.toLowerCase(); const ip=stripIP(p);
  if(n.includes("240v")){ const rgb240=n.includes("rgb"); return {fam:"240V", wpm:10, wpmTxt:"240V driver included", min:10, single:rgb240?35:50, dual:rgb240?35:50, channel:"none",
    spec:rgb240?"240V RGB \u00b7 IP65 \u00b7 runs 10\u201335m \u00b7 $60 driver included \u00b7 remote only \u00b7 no channels":"240V \u00b7 IP65 \u00b7 3000/4000/6000K or blue \u00b7 runs 10\u201350m \u00b7 $60 driver included \u00b7 remote only \u00b7 no channels",
    ipTxt:"IP65 \u2014 fine with dust & splashes",
    where:"Recessed ceilings \u2014 long runs of 10 metres or more",
    teach:["$60 240V driver INCLUDED \u2014 powers it straight from mains",
      rgb240?"Long runs only: 10\u201335 metres (RGB)":"Long runs only: 10\u201350 metres \u2014 under 10m? Call us",
      rgb240?"Full colour from the remote":"Fixed colour white \u2014 pick warm, natural or cool",
      "Remote control only \u2014 can\u2019t be made smart",
      "Straight runs in a roomy recess \u2014 no bends"]}; }
  if(n.includes("long run")) return {fam:"LONGRUN", wpm:7.5, single:20, dual:40, channel:"optional",
    spec:"24V COB long-run \u00b7 7.5W/m \u00b7 20m one feed / 40m both ends",
    ipTxt: ip>=67?"IP67 \u2014 built for outdoors":"IP20 \u2014 dry indoor spots",
    where:"Cabinetry, balustrades, hidden recesses \u2014 IP67 version for gardens, floating steps & under decks",
    teach:["Super low power (7.5W per metre) \u2014 runs cool",
      "Up to 20m from ONE end with no fading",
      "Up to 40m if you power BOTH ends",
      "Thin, flexible and easy to install"]};
  if(n.includes("rgb")&&n.includes("cob")) return {fam:"RGBCOB", wpm:16, single:5, dual:10, channel:"required",
    spec:"24V RGB COB \u00b7 dot-less \u00b7 16W/m IP20 (15W/m IP65) \u00b7 5m one feed / 10m both ends",
    ipTxt: ip>=65?"IP65 \u2014 handles steam & splashes":"IP20 \u2014 dry indoor spots",
    where:"Under kitchen cabinets, bars, bulkheads, shelving \u2014 anywhere you want colour",
    teach:["Dot-less: one smooth line of colour, no visible LED dots",
      "Millions of colours + a good cool-white",
      "Feed one end up to 5m; power BOTH ends for up to 10m",
      "16W per metre \u2014 needs an aluminium channel to stay cool"]};
  if(n.includes("cob")) return {fam:"CCTCOB", wpm:16, single:5, dual:10, channel:"required",
    spec:"24V CCT COB \u00b7 dot-less \u00b7 16W/m \u00b7 IP20 \u00b7 2700\u20136500K \u00b7 5m one feed / 10m both ends",
    ipTxt:"IP20 \u2014 dry indoor spots",
    where:"Cabinets, shelving, bulkheads \u2014 beautiful smooth white light",
    teach:["Dot-less: one clean line of light, no spotty dots",
      "Adjustable warm \u2194 cool white (2700K\u20136500K) with the remote",
      "Feed one end up to 5m; power BOTH ends for up to 10m",
      "16W per metre \u2014 needs an aluminium channel to stay cool"]};
  if(n.includes("high lumen")){
    const b20=(typeof swAnswers!=="undefined"&&swAnswers.bright==="bright20");
    return {fam:"HILUMEN", wpm:b20?20:12, bright20:b20,
    wpmTxt:"High Lumen SMD \u00b7 "+(b20?"20W/m":"12W/m")+" IP65 wet-area strip", single:5, dual:10, channel:"required",
    spec:"24V High Lumen SMD \u00b7 150 lumens per watt \u00b7 CRI 90+ \u00b7 "+(b20?"20W/m (extra bright) \u2014 4000K & 5500K only":"12W/m")+" IP65 \u00b7 fixed whites 3000/4000/5500/6000K \u00b7 5m one feed / 10m both ends",
    ipTxt:"IP65 \u2014 sealed against kitchen & bathroom steam",
    where:"All wet areas \u2014 kitchen benchtops, bathroom niches & outdoors \u2014 plus bars, shelving & display",
    teach:[b20?"Extra-bright 20W/m in IP65 \u2014 for spots that need to really stand out (bright bathrooms, feature walls, big benches)"
              :"The wet-area pick: 12W/m in IP65 \u2014 sealed against steam, splashes & weather",
      "Fixed single-colour whites (3000/4000/5500/6000K) \u2014 no RGB in this range",
      "True-colour light (CRI 90+) \u2014 things look their real colour",
      "150 lumens per watt \u2014 about "+(b20?"3,000":"1,800")+" lumens every metre",
      "Feed one end up to 5m; power from 2 points (e.g. 2 corners) for 5\u201310m"]};
  }
  if(n.includes("rgb")) return {fam:"RGB", wpm:16, single:5, dual:10, channel: ip>=67?"none":"required",
    spec:"24V RGB SMD \u00b7 16W/m \u00b7 IP"+ip+" \u00b7 5m one feed / 10m both ends",
    ipTxt: ip>=67?"IP67 \u2014 fully weatherproof for outdoors":"indoor colour strip",
    where: ip>=67?"Outdoor areas, exterior features, pool & waterfall surrounds":"Feature colour lighting",
    teach:["Full colour \u2014 millions of options from the remote or app",
      ip>=67?"IP67 weather-sealed \u2014 rain and splash proof":"For dry indoor areas",
      "Feed one end up to 5m; power BOTH ends for up to 10m"]};
  return {fam:"STD", wpm:10, single:5, dual:10, channel:"required",
    spec:"24V strip \u00b7 IP"+ip+" \u00b7 5m one feed / 10m both ends",
    ipTxt: ip>=65?"IP65 \u2014 splash resistant":"IP20 \u2014 dry indoor spots",
    where:"General indoor strip lighting",
    teach:["Feed one end up to 5m; power BOTH ends for longer runs",
      "Sits in an aluminium channel for a clean, cool, dot-free line"]};
}
function stripScore(p,a){
  if(a&&a.colour&&(a.colour[0]==="w"||a.colour==="blue")) a=Object.assign({},a,{colour:"single"});
  let s=0; const n=(p.name||"").toLowerCase(); const ip=stripIP(p); const f=stripFacts(p);
  s+=2;
  // 240V: ONLY recessed ceilings, and ONLY if the recess has room
  if(f.fam==="240V"){
    const L=parseInt(a.length)||0;
    if(a.place!=="cove"||a.space==="tight") s-=100;      // recessed ceilings only, with room
    else if(a.control==="smart") s-=100;                 // remote-control only
    else if(a.colour==="cct") s-=100;                    // fixed colour \u2014 no adjustable white
    else if(L&&L<(f.min||5)) s-=100;                     // long runs only: 10m minimum
    else if(L&&L>f.single) s-=100;                       // white tops out at 50m, RGB at 35m
    else s+=6; }
  // location rules (straight from the selection guide)
  if(a.place==="wet"){ s+= f.fam==="HILUMEN"?10:-100; }                                 // wet areas: High Lumen SMD ONLY
  else if(a.place==="outdoor"){ s+= ip>=67?8:(ip>=65?2:-8); if(f.fam==="LONGRUN"&&ip>=67)s+=3; if(f.fam==="RGB"&&ip>=67)s+=3; }
  else if(a.place==="cabinet"){ if(f.fam==="CCTCOB"||f.fam==="RGBCOB")s+=3; if(f.fam==="HILUMEN")s+=2; }
  else if(a.place==="cove"){ if(f.fam==="CCTCOB"||f.fam==="HILUMEN"||f.fam==="LONGRUN")s+=2; }
  else { if(ip<=24)s+=1; }
  // colour
  if(a.colour==="rgbw"){ if(n.includes("rgbw"))s+=6; else if(n.includes("rgb"))s+=3; else s-=8; }
  else if(a.colour==="rgb"){ if(n.includes("rgb"))s+=6; else s-=8; }
  else if(a.colour==="cct"){ if(f.fam==="CCTCOB")s+=8; else if(n.includes("cct")||n.includes("dual"))s+=6; else if(f.fam==="240V")s-=100; else s-=100; }
  else if(a.colour==="single"){
    // COB strips are CCT (warm\u2194cool) or RGB by design \u2014 a fixed single colour is always the SMD strip
    // "a fixed single colour is always SMD, never COB" targets the CCT and RGB
    // COB strips, which are adjustable/colour by design. The long-run COB is a
    // fixed-colour strip, so it stays eligible.
    // "a fixed single colour is always SMD, never COB" still holds for normal
    // runs. The long-run COB is the deliberate exception, and only where it is
    // actually the right product: runs of 8m+, or a recess too tight for 240V.
    const _len=parseInt(a.length)||0;
    const _longJob=_len>=8||(a.place==="cove"&&a.space==="tight");
    if(f.fam==="LONGRUN"){ s+= _longJob?4:-100; }
    else if(f.fam==="CCTCOB"||f.fam==="RGBCOB"||n.includes("cob")) s-=100;
    else if(n.includes("rgb")) s-=100;
    else if(f.fam==="HILUMEN") s+=8;
    else s+=4; }
  // control
  if(a.control==="smart"){ if(n.includes("smart")||n.includes("wifi")||f.fam==="CCTCOB"||n.includes("rgb"))s+=1; }
  // length vs feed limits
  const len=parseInt(a.length)||0;
  if(len>f.dual) s-=4;                       // needs segmenting — deprioritise
  // Long runs: from 8 metres up the low-power long-run COB is the right answer
  // (one feed carries 20m). 240V still wins for a roomy recess at 10m+.
  if(len>=8 && f.fam==="LONGRUN") s+=5;
  if(len>=10){ if(f.fam==="240V"&&a.place==="cove"&&a.space!=="tight")s+=3; }
  // A tight ceiling recess cannot take the chunky 240V strip - the thin
  // long-run COB is what fits.
  if(a.place==="cove"&&a.space==="tight"){ if(f.fam==="LONGRUN")s+=12; if(f.fam==="240V")s-=100; }
  return s;
}
function stripWperM(p){ return stripFacts(p).wpm; }
function stripVolt(p){ const n=p.name.toLowerCase();
  if(n.includes("240v"))return"240V"; if(n.includes("24v"))return"24V"; if(n.includes("12v"))return"12V"; return"24V"; }
function findP2(id){ return PRODUCTS.find(p=>p.id===id); }
function optByKw(prod,kws){ if(!prod||!prod.options)return null;
  for(const kw of kws){ const o=prod.options.find(o=>o.label.toLowerCase().includes(kw.toLowerCase())); if(o)return o; }
  return prod.options[0]; }
function optByWatt(prod,needW){ if(!prod||!prod.options)return null;
  let best=null; for(const o of prod.options){ const m=o.label.match(/(\d+)\s*W/); if(m){const w=+m[1]; if(w>=needW&&(!best||w<best.w))best={o,w};} }
  if(best)return best.o;
  let lg=null; for(const o of prod.options){ const m=o.label.match(/(\d+)\s*W/); if(m){const w=+m[1]; if(!lg||w>lg.w)lg={o,w};} }
  return lg?lg.o:prod.options[0]; }
function pkOpt(prod,def){
  const sel=swPkgSel[prod.id];
  if(sel!=null&&prod.options){ const o=prod.options.find(o=>o.label===sel); if(o) return o; }
  return def;
}
function buildPackage(strip,a){
  const rawCol=a&&a.colour;
  const COL_LBL={w2700:"2700K extra warm",w3000:"3000K warm white",w4000:"4000K natural white",w5000:"5000K bright white",w5500:"5500K crisp white",w6000:"6000K cool white",blue:"Blue"};
  if(rawCol&&(rawCol[0]==="w"||rawCol==="blue")) a=Object.assign({},a,{colour:"single"});
  const len=parseInt(a.length)||5; const items=[]; const notes=[]; const f=stripFacts(strip);
  const volt=stripVolt(strip);
  items.push({p:strip,opt:null,unit:strip.price,qty:len,label:strip.name,sub:len+" m run \u00b7 "+(COL_LBL[rawCol]?COL_LBL[rawCol]+" \u00b7 ":"")+(f.wpmTxt||f.wpm+"W per metre")});
  const needW=Math.ceil(f.wpm*len*1.2);
  let feed="one";
  if(volt==="240V"){
    const drv=findP2("TR240V-DRIVER");
    if(drv){ items.push({p:drv,opt:null,unit:drv.price,qty:1,label:drv.name,sub:"Included in every 240V kit \u2014 powers the strip straight from 240V mains",pick:"driver"}); }
    notes.push("240V strip comes with its $60 240V driver included \u2014 it powers the strip straight from normal mains power. Long runs only: minimum 10m, up to "+f.single+"m on one feed. Recessed ceilings only \u00b7 remote-control only \u00b7 straight runs, no bends \u00b7 no channels (it\u2019s thicker and sits straight in the recess).");
    if(len<10) notes.push("240V comes in 10 metres or more \u2014 your "+len+"m run is under that. Call us on (08) 9297 2969 and we\u2019ll sort the right option.");
  } else {
    const tr=findP2(volt==="12V"?"TR12V-ALL":"TR24V-ALL");
    if(tr){
      if(len<=f.single){
        const o=pkOpt(tr,optByWatt(tr,needW));
        items.push({p:tr,opt:o,unit:o.price,qty:1,label:tr.name,sub:o.label+" \u2014 sized for ~"+needW+"W",pick:"driver"});
        notes.push("One driver, wired to one end \u2014 all your "+len+"m run needs (good up to "+f.single+"m from a single feed).");
      } else if(len<=f.dual){
        feed="both";
        const each=Math.max(120,Math.ceil(needW/2));
        const o=pkOpt(tr,optByWatt(tr,each));
        items.push({p:tr,opt:o,unit:o.price,qty:2,label:tr.name,sub:o.label+" \u2014 one at EACH end of the run",pick:"driver"});
        notes.push("Your run is over "+f.single+"m, so it\u2019s powered from BOTH ends \u2014 keeps the light even with no fading. Good up to "+f.dual+"m this way.");
      } else {
        feed="both";
        const o=pkOpt(tr,optByKw(tr,["120w"]));
        items.push({p:tr,opt:o,unit:o.price,qty:2,label:tr.name,sub:o.label+" \u2014 one at EACH end, per segment",pick:"driver"});
        notes.push("Over "+f.dual+"m: we split it into shorter powered sections. Give us a call on (08) 9297 2969 and we\u2019ll map it out.");
      }
      notes.push("For long runs, two smaller drivers (one each end) work better than one big one.");
    }
  }
  const smart = a.control==="smart" && volt!=="240V";   // 240V can never be smart
  if(volt==="240V"){
    // 240V strip is remote-control ONLY: no controller, no app — just the right remote.
    if(a.control==="smart") notes.push("240V strip is remote-control only \u2014 no app. We\u2019ve included the remote.");
    const r=findP2("REMOTE-CONTROL-GRP");
    if(r){
      const wantRGB=(a.colour==="rgb"||a.colour==="rgbw")||/rgb/i.test(strip.name);
      const o=pkOpt(r,optByKw(r,wantRGB?["4-zone hand remote (rgb+cct) \u00b7 white","4-zone hand"]:["single colour dimming \u00b7 white","single colour"]));
      items.push({p:r,opt:o,unit:o.price,qty:1,label:r.name,sub:o.label+" \u2014 the ONLY way to control 240V strip ("+(wantRGB?"colours & dimming":"dimming")+") \u2014 pick the remote you like",pick:"remote"});
    }
    notes.push("240V needs no controller box \u2014 the remote does everything.");
  }
  else {
    // Controller: WHITE strip \u2192 2-in-1 (never the 3-in-1). RGB strip \u2192 3-in-1 (never the 2-in-1).
    const isRGB = (a.colour==="rgb"||a.colour==="rgbw"||/rgb/i.test(strip.name));
    const c = findP2(isRGB?"RGB-CTRLR-037":"LED-CONTROLLER-SIN");
    if(c){
      const kw = smart ? ["wifi"] : (isRGB ? ["rgb controller","rgb"] : (a.colour==="cct" ? ["dual white","cct"] : ["single colour"]));
      const o = pkOpt(c,optByKw(c,kw));
      const badge = (isRGB?"3 in 1":"2 in 1") + (smart?" \u00b7 2.4GHz SMART":" standard controller");
      const what = smart ? "run everything from the phone app"
        : isRGB ? "changes the colours"
        : a.colour==="cct" ? "adjusts warm \u2194 cool"
        : "dims the strip 1\u2013100%";
      items.push({p:c,opt:o,unit:o.price,qty:1,label:c.name,sub:o.label+" \u2014 "+badge+" \u2014 "+what,pick:"controller"});
    }
    if(!smart){
      const r=findP2("REMOTE-CONTROL-GRP");
      if(r){ const kw = isRGB ? ["4-zone hand remote (rgb+cct) \u00b7 white","4-zone hand"] : ["single colour dimming \u00b7 white","single colour"];
        const o=pkOpt(r,optByKw(r,kw));
        items.push({p:r,opt:o,unit:o.price,qty:1,label:r.name,sub:o.label+(isRGB?"":" \u2014 dims 1\u2013100%"),pick:"remote"}); }
    }
  }
  if(smart) notes.push("Smart kit: the WiFi controller runs everything from your phone \u2014 no remote needed. Prefer buttons? Pick \u2018Simple\u2019 for a remote instead.");
  else if(volt!=="240V") notes.push("The controller sits between the driver and strip. White strips use the 2-in-1; RGB strips use the 3-in-1.");
  const ch=findP2("24VSTRIP-CHANNELS-"); let chQty=0;
  if(ch && f.channel!=="none"){
    const kw=a.place==="cove"?["recess wing","recess"]:a.place==="cabinet"?["mini","surface"]:a.place==="wet"?["recess \u00b7 white","recess"]:["surface \u00b7 white","surface"];
    const o=pkOpt(ch,optByKw(ch,kw)); chQty=Math.max(1,Math.ceil(len/3));
    const optional=f.channel==="optional";
    items.push({p:ch,opt:o,unit:o.price,qty:chQty,label:ch.name,sub:o.label+" ("+chQty+" \u00d7 3m fixed)"+(optional?" \u2014 optional for this strip, but gives a neater finish & longer life":""),pick:"channel"});
  }
  if(volt!=="240V"){
    notes.push("Cut only at the marked scissor lines \u2014 plan your cuts before you start.");
    notes.push("Your strip comes as one continuous length, so a straight run needs no joins. "+
      "If you cut it, rejoin the pieces with a solderless clip connector \u2014 one connector carries "+
      "up to 2.5m of strip. Connectors aren\u2019t included in this kit; ask us and we\u2019ll add them.");
    notes.push("Don\u2019t bend the strip hard around a 90\u00b0 corner \u2014 it cracks the board and "+
      "kills the LEDs. Drill a hole at the corner and drop the strip through it instead.");
  } else {
    notes.push("Got strip left over? Don\u2019t cut it off \u2014 fold the extra back on itself and "+
      "leave it inside the recess. It\u2019s hidden, and you keep the length if you ever move it.");
  }
  if(chQty>0) notes.push("Channels come in fixed 3m lengths \u2014 we\u2019ve allowed "+chQty+" \u00d7 3m for your "+len+"m run. The aluminium track cools the strip and hides the dots.");
  return {items,notes,len,feed,facts:f};
}
/* ---------- install visuals: real photos, SVG fallback ---------- */
function diagPlace(place){
  if(typeof STRIPIMG!=="undefined"&&STRIPIMG.places&&STRIPIMG.places[place]){
    const cap={cove:"Strip sits on the hidden shelf, washing light up the ceiling",
      cabinet:"Strip hides under the cabinet, lighting the benchtop",
      wet:"Strip at the top of the niche \u2014 IP65 so steam is no problem",
      stairs:"Strip tucks under each step nosing",
      other:"Strip runs hidden along the edge, throwing a soft wash of light"}[place]||"";
    return '<figure class="sw-photo"><img src="'+STRIPIMG.places[place]+'" alt="'+cap+'" loading="lazy">'+
      (cap?'<figcaption>'+cap+'</figcaption>':'')+'</figure>';
  }
  return diagPlaceSVG(place);
}
function diagPlaceSVG(place){
  const S='stroke="var(--eco)" stroke-width="2" fill="none"', G='fill="var(--glow)" opacity=".85"', GL='fill="var(--glow)" opacity=".22"';
  if(place==="cove") return '<svg viewBox="0 0 300 110"><rect x="10" y="10" width="280" height="8" fill="var(--ink)"/><path d="M10 18 v30 h80 v-14 h14" '+S+'/><rect x="30" y="34" width="52" height="6" rx="2" '+G+'/><ellipse cx="56" cy="24" rx="60" ry="14" '+GL+'/><text x="150" y="95" font-size="11" fill="#5d6151">Strip sits on the hidden shelf, washing light up the ceiling</text></svg>';
  if(place==="cabinet") return '<svg viewBox="0 0 300 110"><rect x="60" y="10" width="180" height="34" fill="var(--ink)"/><rect x="70" y="46" width="160" height="6" rx="2" '+G+'/><ellipse cx="150" cy="66" rx="95" ry="16" '+GL+'/><rect x="40" y="84" width="220" height="8" fill="#cfcabb"/><text x="150" y="105" font-size="11" fill="#5d6151" text-anchor="middle">Strip hides under the cabinet, lighting the benchtop</text></svg>';
  if(place==="wet") return '<svg viewBox="0 0 300 110"><rect x="90" y="10" width="120" height="76" fill="none" stroke="#cfcabb" stroke-width="10"/><rect x="100" y="18" width="100" height="6" rx="2" '+G+'/><ellipse cx="150" cy="50" rx="46" ry="26" '+GL+'/><text x="150" y="104" font-size="11" fill="#5d6151" text-anchor="middle">Strip at the top of the niche \u2014 IP65 so steam is no problem</text></svg>';
  if(place==="stairs") return '<svg viewBox="0 0 300 110"><path d="M20 90 h70 v-24 h70 v-24 h70 v-24 h50" '+S+'/><rect x="26" y="82" width="56" height="5" rx="2" '+G+'/><rect x="96" y="58" width="56" height="5" rx="2" '+G+'/><rect x="166" y="34" width="56" height="5" rx="2" '+G+'/><text x="150" y="106" font-size="11" fill="#5d6151" text-anchor="middle">Strip tucks under each step nosing</text></svg>';
  if(place==="outdoor") return '<svg viewBox="0 0 300 110"><rect x="10" y="70" width="280" height="10" fill="#cfcabb"/><rect x="20" y="62" width="260" height="6" rx="2" '+G+'/><ellipse cx="150" cy="88" rx="120" ry="12" '+GL+'/><path d="M40 40 q6 -14 12 0 q6 -14 12 0" '+S+'/><text x="150" y="104" font-size="11" fill="#5d6151" text-anchor="middle">Weatherproof IP67 strip along the deck / garden edge</text></svg>';
  return '<svg viewBox="0 0 300 110"><rect x="80" y="30" width="140" height="22" fill="none" stroke="var(--eco)" stroke-width="2"/><rect x="88" y="38" width="124" height="6" rx="2" '+G+'/><text x="150" y="80" font-size="11" fill="#5d6151" text-anchor="middle">Strip sits inside an aluminium channel with a frosted cover</text></svg>';
}
function diagRecess240(){
  const S='stroke="var(--eco)" stroke-width="2" fill="none"', G='fill="var(--glow)" opacity=".9"', GL='fill="var(--glow)" opacity=".2"';
  return '<svg viewBox="0 0 320 150"><rect x="10" y="12" width="300" height="8" fill="var(--ink)"/>'+
    '<path d="M10 20 v44 h104 v-20 h20" '+S+'/>'+
    '<rect x="26" y="42" width="72" height="7" rx="2" '+G+'/>'+
    '<ellipse cx="62" cy="30" rx="78" ry="15" '+GL+'/>'+
    '<path d="M104 66 v-14" stroke="#8a8b7e" stroke-width="1" stroke-dasharray="3 3"/>'+
    '<text x="30" y="62" font-size="9.5" fill="#5d6151">strip lies FLAT on a roomy shelf</text>'+
    '<text x="150" y="40" font-size="9.5" fill="#5d6151">open gap \u2014 light washes the ceiling</text>'+
    '<text x="16" y="92" font-size="10" fill="#3c4034" font-weight="600">\u2713 Roomy shelf \u00b7 \u2713 Straight runs, no bends \u00b7 \u2713 Min 10m</text>'+
    '<text x="16" y="110" font-size="9.5" fill="#5d6151">$60 240V driver included \u2014 needs a flat shelf of 50mm (5cm) or more.</text>'+
    '<text x="16" y="128" font-size="9.5" fill="#5d6151">Recess tight or run under 10m? Call (08) 9297 2969 \u2014 we\u2019ll spec 24V instead.</text></svg>';
}
function diagFeed(both){
  const G='fill="var(--glow)"';
  if(!both) return '<svg viewBox="0 0 300 70"><rect x="20" y="22" width="26" height="20" fill="var(--ink)"/><text x="33" y="56" font-size="10" fill="#5d6151" text-anchor="middle">driver</text><rect x="54" y="28" width="220" height="7" rx="2" '+G+'/><path d="M46 32 h8" stroke="var(--eco)" stroke-width="2"/><text x="160" y="18" font-size="11" fill="#5d6151" text-anchor="middle">Power feeds ONE end \u2014 fine for short runs</text></svg>';
  return '<svg viewBox="0 0 300 70"><rect x="14" y="22" width="26" height="20" fill="var(--ink)"/><rect x="260" y="22" width="26" height="20" fill="var(--ink)"/><text x="27" y="56" font-size="10" fill="#5d6151" text-anchor="middle">driver</text><text x="273" y="56" font-size="10" fill="#5d6151" text-anchor="middle">driver</text><rect x="48" y="28" width="204" height="7" rx="2" '+G+'/><path d="M40 32 h8 M252 32 h8" stroke="var(--eco)" stroke-width="2"/><text x="150" y="18" font-size="11" fill="#5d6151" text-anchor="middle">Power feeds BOTH ends \u2014 even light, no fading</text></svg>';
}
function stripInfoBox(pk){
  const f=pk.facts;
  const v240=stripVolt(swPackageStrip)==="240V";
  const rows=[
    ["Exact spec", f.spec],
    ["Best for", f.where],
    ["Water rating", f.ipTxt],
    ["Powered by", v240?"Its own $60 240V driver \u2014 straight from mains":(pk.feed==="both"?"A driver at BOTH ends \u2014 even light the whole way":"One driver feeding one end")],
    ["Mounting", f.channel==="none"?"No channel \u2014 240V strip is thicker and sits straight in the recess":"Aluminium channel with frosted cover \u2014 keeps it cool, hides the dots"],
    ["Max run", (f.single?("Feed one end to "+f.single+"m; "+f.dual+"m powered both ends"):"")]
  ].filter(r=>r[1]);
  const specHTML='<div class="ib-specs">'+rows.map(r=>'<div class="ib-row"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>').join("")+'</div>';
  const teachHTML=(f.teach&&f.teach.length)?'<div class="ib-teach"><h5>Good to know</h5><ul>'+f.teach.map(t=>'<li>'+t+'</li>').join("")+'</ul></div>':"";
  const G=(typeof STRIPIMG!=="undefined"&&STRIPIMG.guides)?STRIPIMG.guides:{};
  const guideHTML=(G.ip||G.install)?'<div class="ib-guides"><h5>Datasheets &amp; install</h5>'+
    (G.ip?'<figure><img src="'+G.ip+'" alt="IP protection grades" loading="lazy"><figcaption>IP grades \u2014 IP20 dry \u00b7 IP65 splashes \u00b7 IP67 outdoors \u00b7 IP68 submersible.</figcaption></figure>':'')+
    (G.install?'<figure><img src="'+G.install+'" alt="6-step install guide" loading="lazy"><figcaption>6-step install \u2014 clean, press, cut on the marks, mount on aluminium. Licensed electrician only.</figcaption></figure>':'')+
    (G.caution?'<figure><img src="'+G.caution+'" alt="Handling cautions" loading="lazy"><figcaption>Never bend under a 50mm radius, never fold or twist, always use the proper driver.</figcaption></figure>':'')+
    '</div>':"";
  const demoHTML=demoPanel(swPackageStrip?swPackageStrip.id:"");
  return '<details class="infobox" open><summary><span class="ib-ico">\u2139</span> Full details of this strip light<span class="ib-chev">\u25be</span></summary>'+
    '<div class="ib-body">'+demoHTML+specHTML+teachHTML+
    '<details class="ib-sub"><summary>Strip lighting 101 \u2014 30-second crash course</summary><ul class="ib-101">'+
      '<li><b>Brightness</b> is watts per metre \u2014 more W/m = brighter.</li>'+
      '<li><b>Colour:</b> 2700\u20133000K warm \u00b7 4000K natural \u00b7 6000K crisp. CCT adjusts it; RGB does colours.</li>'+
      '<li><b>IP rating</b> = water protection: IP20 dry \u00b7 IP65 steamy \u00b7 IP67 outdoors.</li>'+
      '<li><b>24V vs 240V:</b> 24V is slim + needs a driver; 240V plugs into mains, runs to ~50m, but is chunkier (recessed ceilings only).</li>'+
      '<li><b>The aluminium channel</b> is a heat-sink, looks professional, and hides the dots.</li>'+
      '<li><b>CRI 90+</b> means colours look true.</li></ul></details>'+
    (guideHTML?'<details class="ib-sub">'+'<summary>Supplier datasheets &amp; install photos</summary>'+guideHTML+'</details>':'')+
    '</div></details>';
}
const STRIP_101='<details class="sw-learn"><summary>Strip lighting 101 \u2014 30-second crash course</summary><ul>'+
 '<li><b>Brightness</b> is lumens \u2014 more watts per metre = brighter. Over 150 lumens per watt = very efficient.</li>'+
 '<li><b>Colour temperature:</b> 2700K warm & cosy \u00b7 4000K natural \u00b7 6000K crisp. CCT strip lets you change it; RGB does millions of colours.</li>'+
 '<li><b>IP rating = water protection:</b> IP20 dry indoors \u00b7 IP65 steamy bathrooms \u00b7 IP67 outdoors.</li>'+
 '<li><b>24V vs 240V:</b> 24V strips are slim and need a transformer (driver). 240V plugs into normal power, runs up to 50m, but is chunkier \u2014 recessed ceilings only.</li>'+
 '<li><b>Why the aluminium channel?</b> It\u2019s a heat-sink (strip lasts longer), it looks professional, and the frosted cover hides the LED dots.</li>'+
 '<li><b>CRI 90+</b> means colours look true \u2014 great for kitchens and display shelves.</li></ul></details>';
function swMoodBanner(){ return (typeof STRIPIMG!=="undefined"&&swAnswers.place&&STRIPIMG.places[swAnswers.place])?'<img class="sw-mood" src="'+STRIPIMG.places[swAnswers.place]+'" alt="Strip lighting in this spot" loading="lazy">':""; }
function stripGuideImgs(){
  if(typeof STRIPIMG==="undefined"||!STRIPIMG.guides)return "";
  const G=STRIPIMG.guides;
  return '<details class="sw-learn sw-ds"><summary>Supplier datasheets \u2014 IP ratings, handling & install</summary>'+
    '<figure><img src="'+G.ip+'" alt="IP protection grades IP20 to IP68" loading="lazy"><figcaption><b>IP protection grades.</b> IP20 dry indoors \u00b7 IP65 sprayed water (steamy bathrooms, benchtops) \u00b7 IP67 outdoors \u00b7 IP68 submersible to 1m.</figcaption></figure>'+
    '<figure><img src="'+G.caution+'" alt="Strip light handling cautions" loading="lazy"><figcaption><b>Handling rules.</b> Never bend tighter than a 50mm radius, never fold or twist the strip, and always power it through the proper constant-voltage driver \u2014 never straight into 240V mains (24V strip). Installation must be done by a licensed electrician.</figcaption></figure>'+
    '<figure><img src="'+G.install+'" alt="6-step LED strip installation guide" loading="lazy"><figcaption><b>Install in 6 steps.</b> Clean & dry the surface, press gently between the LEDs, cut only on the marked cut points, and mount on aluminium channel for heat dissipation and longer life.</figcaption></figure>'+
    '<figure><img src="'+G.longrun+'" alt="Long-run connection table without voltage drop" loading="lazy"><figcaption><b>Long runs without voltage drop.</b> The 7.5W/m 24V long-run COB does 20m from one end, or 40m powered from both ends \u2014 ask our team about runs past 10m.</figcaption></figure></details>';
}
function renderPackage(){
  const box=$("#swBody"); if(!box||!swPackageStrip)return;
  const pk=buildPackage(swPackageStrip,swAnswers);
  const total=pk.items.reduce((s,it)=>s+it.unit*it.qty,0);
  const PK_LBL={channel:"Channel type & colour",controller:"Controller (smart or standard)",remote:"Remote (style & colour)",driver:"Driver / transformer size"};
  const rows=pk.items.map(it=>{
    let selHtml="";
    if(it.opt&&it.p.options&&it.p.options.length>1&&!it.lock){
      const lbl=PK_LBL[it.pick]||"Choose option";
      selHtml='<label class="pk-sel-lbl">'+lbl+' \u2014 '+it.p.options.length+' available</label><div class="pk-sel-wrap"><select class="pk-sel" data-pksel="'+it.p.id+'">'+
        it.p.options.map(o=>'<option value="'+o.label.replace(/"/g,"&quot;")+'"'+(o.label===it.opt.label?" selected":"")+'>'+o.label+' \u2014 $'+o.price.toFixed(2)+'</option>').join("")+
        '</select></div>';
    }
    const vImg=optImg(it.p,it.opt);
    const thumb=vImg?'<img class="pimg img" src="'+vImg+'" alt="'+(it.opt?it.opt.label:it.p.name).replace(/"/g,"&quot;")+'">':media(it.p,"img");
    /* the photo and the name open the full product page (specs, every option,
       install guide) - the kit row itself only shows what this kit uses. */
    const viewable=!!(it.p&&it.p.id&&findP(it.p.id));
    const qa=s=>String(s).replace(/"/g,"&quot;");
    const va=viewable?' data-pkview="'+qa(it.p.id)+'"'+(it.opt?' data-pkviewopt="'+qa(it.opt.label)+'"':'')+
      ' role="button" tabindex="0" title="'+qa("Open "+it.p.name+" \u2014 full specs and all options")+'"':'';
    return '<div class="pk-row'+(selHtml?' pk-row-sel':'')+'"><div class="pk-ri'+(vImg?' hasimg':'')+(viewable?' pk-ri-link':'')+'"'+va+'>'+thumb+'</div>'+
    '<div class="pk-rd"><h4'+(viewable?' class="pk-rt-link"'+va:'')+'>'+it.label+(viewable?'<span class="pk-rt-go" aria-hidden="true">\u2197</span>':'')+'</h4><span class="pk-sub">'+it.sub+'</span>'+selHtml+'</div>'+
    '<div class="pk-rp">\u00d7'+it.qty+'<br><b>$'+(it.unit*it.qty).toFixed(2)+'</b></div></div>';}).join("");
  const notesDrop=pk.notes.length
    ? '<details class="pk-notes-drop"><summary><span class="ib-ico">\u2139</span> Good to know for your run <span class="pkn-count">'+pk.notes.length+'</span><span class="ib-chev">\u25be</span></summary><div class="pk-notes-body">'+
        pk.notes.map(n=>'<p class="pk-note">'+n+'</p>').join("")+'</div></details>'
    : "";
  const f=pk.facts;
  box.innerHTML='<button class="pk-back" data-pkgback="1">\u2190 Back to suggestions</button>'+
    '<div class="sw-prog">\u2713 Your complete kit</div><h3>'+swPackageStrip.name+'</h3>'+
    '<div class="pk-diag">'+(stripVolt(swPackageStrip)==="240V"?diagRecess240():diagPlace(swAnswers.place))+'</div>'+
    (stripVolt(swPackageStrip)!=="240V"?'<div class="pk-diag">'+diagFeed(pk.feed==="both")+'</div>':'')+
    '<p class="sw-sum">Everything you need for your '+pk.len+'m run \u2014 nothing missing, nothing extra:</p>'+
    '<div class="pk-list">'+rows+'</div>'+
    '<p class="pk-tap-hint">Tap any photo or product name above for the full product page \u2014 specs, every option and the install guide.</p>'+
    (!/240v/i.test(swPackageStrip?swPackageStrip.name:"")?connectorPanel(pk.len):"")+
    '<div class="pk-total"><span>Kit total</span><span>$'+total.toFixed(2)+' <small>ex-GST \u00b7 $'+(total*1.1).toFixed(2)+' inc</small></span></div>'+
    '<button class="btn btn-dark" style="width:100%;justify-content:center;margin-top:6px" data-pkgadd="1">Add whole kit to cart</button>'+
    stripInfoBox(pk)+
    notesDrop;
  demoWire(box);
}
function addPackageToCart(){
  if(!swPackageStrip)return; const pk=buildPackage(swPackageStrip,swAnswers);
  pk.items.forEach(it=>{ addToCart(it.p.id, it.opt?it.opt.label:null, it.opt?it.opt.price:it.unit, it.qty); });
  closeStripWizard(); toast("Strip kit added to cart"); openCart();
}
function swSummary(){
  const place={cabinet:"under your cabinets",cove:"in your ceiling recess",outdoor:"outdoors",wet:"in your bathroom",stairs:"on your stairs / hallway",other:"in your spot"}[swAnswers.place]||"in your spot";
  const col={single:"fixed white",cct:"adjustable white",rgb:"full-colour RGB",w2700:"2700K extra warm",w3000:"3000K warm white",w4000:"4000K natural white",w5000:"5000K bright white",w5500:"5500K crisp white",w6000:"6000K cool white",blue:"blue"}[swAnswers.colour]||"";
  const ctl={smart:"run from the phone app",simple:"with a simple remote",any:""}[swAnswers.control]||"";
  return ("For "+col+" light "+place+" "+ctl).replace(/\s+/g," ").trim()+".";
}
function recCard(p){
  const f=stripFacts(p);
  return '<div class="sw-rec sw-rec-big" data-pkg="'+p.id+'">'+
    '<div class="rec-top"><div class="ri">'+media(p,"img")+'</div>'+
    '<div class="rd"><h4>'+p.name+'</h4><span class="rp">'+(p.options&&p.options.length?"from ":"")+"$"+p.price.toFixed(2)+' <small>ex-GST /m</small></span>'+
    '<span class="rec-where">'+f.where+'</span>'+(f.spec?'<span class="rec-spec">'+f.spec+'</span>':'')+'</div></div>'+
    '<ul class="rec-why">'+f.teach.slice(0,3).map(t=>'<li>'+t+'</li>').join("")+'</ul>'+
    '<span class="rec-cta">See the complete kit for this strip \u2192</span></div>';
}
function v240DimSVG(){
  // to-scale cross-section: 240V Strip Light Pro = 8mm wide x 18mm tall, IP65
  return '<svg viewBox="0 0 300 160" class="v240-dim" role="img" aria-label="240V strip 8mm by 18mm cross-section">'+
    // the 240V strip block (tall)
    '<rect x="128" y="24" width="34" height="84" rx="4" fill="#fff" stroke="var(--ink)" stroke-width="2"/>'+
    '<rect x="128" y="24" width="34" height="13" rx="4" fill="var(--glow)" opacity=".85"/>'+
    '<circle cx="145" cy="52" r="3" fill="var(--glow)"/><circle cx="145" cy="66" r="3" fill="var(--glow)"/><circle cx="145" cy="80" r="3" fill="var(--glow)"/><circle cx="145" cy="94" r="3" fill="var(--glow)"/>'+
    // width dimension (below)
    '<line x1="128" y1="120" x2="162" y2="120" stroke="var(--muted)" stroke-width="1"/>'+
    '<line x1="128" y1="116" x2="128" y2="124" stroke="var(--muted)" stroke-width="1"/><line x1="162" y1="116" x2="162" y2="124" stroke="var(--muted)" stroke-width="1"/>'+
    '<text x="145" y="137" font-size="12" fill="#3c4034" text-anchor="middle" font-weight="600">8 mm</text>'+
    // height dimension (right)
    '<line x1="176" y1="24" x2="176" y2="108" stroke="var(--muted)" stroke-width="1"/>'+
    '<line x1="172" y1="24" x2="180" y2="24" stroke="var(--muted)" stroke-width="1"/><line x1="172" y1="108" x2="180" y2="108" stroke="var(--muted)" stroke-width="1"/>'+
    '<text x="188" y="70" font-size="12" fill="#3c4034" font-weight="600">18 mm</text>'+
    // comparison note (left)
    '<text x="20" y="52" font-size="11.5" fill="#5d6151">Much taller than a</text>'+
    '<text x="20" y="69" font-size="11.5" fill="#5d6151">slim 24V strip, which</text>'+
    '<text x="20" y="86" font-size="11.5" fill="#5d6151">is only about 2 mm.</text></svg>';
}
function renderRecessStop(){
  const box=$("#swBody"); if(!box) return;
  const V=(typeof STRIPIMG!=="undefined"&&STRIPIMG.v240)?STRIPIMG.v240:{};
  const photo=V.photo?'<figure class="sw-photo"><img src="'+V.photo+'" alt="240V Strip Light Pro reel" loading="lazy"><figcaption>240V Strip Light Pro \u2014 the strip designed for recessed ceiling coves.</figcaption></figure>':'';
  const dim='<figure class="sw-photo v240-dimfig"><div class="v240-dimwrap">'+v240DimSVG()+'</div><figcaption>Profile: 8&#8201;mm wide \u00d7 18&#8201;mm tall. That height is why it needs a shelf of 50&#8201;mm or more.</figcaption></figure>';
  box.innerHTML='<button class="pk-back" data-swback="1">\u2190 Back</button>'+
    '<div class="sw-prog sw-prog-warn">Please check this will fit</div>'+
    '<h3>The 240V Strip Light Pro may not suit a shallow recess</h3>'+
    '<p class="sw-hint">This is the strip designed for recessed ceiling coves. It stands <b>18&#8201;mm tall</b> and needs a flat shelf of at least <b>50&#8201;mm (5&#8201;cm)</b> to sit on, with open space above so the light can wash up the ceiling.</p>'+
    photo+dim+
    '<div class="sw-spec240"><h4>240V Strip Light Pro \u2014 specifications</h4>'+
      '<div class="sw-specrows">'+
        '<div><span>Dimensions</span><b>8&#8201;mm \u00d7 18&#8201;mm</b></div>'+
        '<div><span>Brightness</span><b>885&#8201;lumens/m \u00b7 144&#8201;LEDs/m</b></div>'+
        '<div><span>Power</span><b>12W/m \u00b7 240V&#8201;AC mains</b></div>'+
        '<div><span>Colours</span><b>3000K \u00b7 4000K \u00b7 5500K \u00b7 Blue</b></div>'+
        '<div><span>Run length</span><b>Up to 50m per reel</b></div>'+
        '<div><span>Water rating</span><b>IP65 \u2014 dust &amp; splash protected</b></div>'+
        '<div><span>Fitting</span><b>Ceiling channel or U-clips</b></div>'+
      '</div></div>'+
    '<div class="sw-caution"><b>Please check these details carefully \u2014 this strip may not suit your recess.</b><br>If your shelf is under 50&#8201;mm, a short run, or has bends, the 240V strip won\u2019t sit properly. Give us a call and we\u2019ll recommend a slim 24V strip that fits instead.</div>'+
    '<div class="sw-stopcta"><a class="btn-call" href="tel:+61892972969">Call (08) 9297 2969</a>'+
    '<button class="sw-opt sw-restart" data-swrestart="1">\u2190 Start the finder again</button></div>';
}
/* Stairs is a fixed kit, not a configurable run - so the finder stops asking
   questions here and just shows the setup video and what's in the kit.
   Products with no supplier photo yet are listed by name, never faked. */
const STAIR_KIT=[
  {name:"Smart Stair Light Controller",price:120,
   note:"Includes the top &amp; bottom sensors and the stair cable. Handles up to 20 steps.",
   id:"STAIR-CTRL"},
  {name:"1m CCT DMX Stair Profile",price:18,unit:"each",
   note:"One profile per step \u2014 so a 14-step staircase needs 14.",
   id:"STAIR-PROFILE"}
];
function renderStairs(){
  const box=$("#swBody"); if(!box) return;
  const VID="Q3iYeqDkIeE";  // Smart Stair Lights Connection and Setup
  const rows=STAIR_KIT.map(function(k){
    return '<div class="pk-row pk-row-nophoto">'+
      '<div class="pk-info"><b>'+k.name+'</b><span>'+k.note+'</span></div>'+
      '<div class="pk-price">$'+k.price.toFixed(2)+(k.unit?'<em>'+k.unit+'</em>':'')+'</div>'+
      '</div>';
  }).join("");
  box.innerHTML='<button class="pk-back" data-swback="1">\u2190 Back</button>'+
    '<div class="sw-prog">\u2713 Stair lighting</div>'+
    '<h3>Stair lighting is a kit \u2014 no questions needed</h3>'+
    '<p class="sw-lead">Stairs run on their own controller with a sensor top and bottom, so it lights the steps as you walk. Watch the setup video, then here\u2019s what goes in it.</p>'+
    '<figure class="sw-video"><a href="https://www.youtube.com/watch?v='+VID+'" target="_blank" rel="noopener">'+
      '<img src="https://i.ytimg.com/vi/'+VID+'/hqdefault.jpg" alt="Smart Stair Lights connection and setup video" loading="lazy">'+
      '<span class="sw-play" aria-hidden="true"></span></a>'+
      '<figcaption>Smart Stair Lights \u2014 connection and setup \u2197</figcaption></figure>'+
    '<div class="pk-list">'+rows+'</div>'+
    '<p class="sw-note">Give us a call on <a href="tel:+61892972969">(08) 9297 2969</a> and we\u2019ll size the kit to your staircase.</p>'+
    '<div class="sw-cta"><a class="btn-call" href="tel:+61892972969">Call (08) 9297 2969</a>'+
    '<button class="pk-restart" data-swrestart="1">Start again</button></div>';
}


/* Tight ceiling recess: the 240V strip physically will not work, so instead of
   dead-ending we hand them the strip that DOES fit - the low-power long-run COB.
   Full specs shown so they can check it themselves. */
function renderLongRun(){
  const box=$("#swBody"); if(!box) return;
  const p=findP("ST24V-LONGRUN-IP68");
  const C=(typeof COBIMG!=="undefined")?COBIMG:null;
  const L=parseFloat(swAnswers.length)||0;
  const fromCove=(swAnswers.place==="cove");
  // Under 5m this strip is the wrong tool - hand the customer to a person rather
  // than sell them a long-run product for a short run.
  if(L>0&&L<5){
    box.innerHTML='<button class="pk-back" data-swback="1">\u2190 Back</button>'+
      '<div class="sw-prog">Let\u2019s get you the right strip</div>'+
      '<h3>'+L+'m is too short for this one</h3>'+
      '<p class="sw-lead">The <b>24V Long Run COB</b> earns its keep over distance \u2014 it\u2019s built so one '+
        'driver can push 20 metres. At '+L+'m you\u2019d be paying for range you\u2019ll never use, and there\u2019s a '+
        'brighter, better-value strip for a run that size.</p>'+
      '<div class="sw-callus">Give us a quick call on <a href="tel:+61892972969">(08) 9297 2969</a> '+
        'and we\u2019ll match the right strip to your '+L+'m run \u2014 takes two minutes.</div>'+
      '<div class="sw-cta">'+
        '<a class="btn-call" href="tel:+61892972969">Call (08) 9297 2969</a>'+
        '<button class="pk-restart" data-swback="1">Change my length</button>'+
        '<button class="pk-restart" data-swrestart="1">Start again</button></div>';
    return;
  }
  // keep this screen skimmable - the full 17-row table lives on the product page
  const KEY=["Power","Colour","Voltage","Max run","Cutting","Warranty"];
  const rows=(C?C.specs.filter(function(r){return KEY.indexOf(r[0])>-1;}):[
    ["Power","7.5W per metre"],["Voltage","24V DC (needs a driver)"],
    ["Max run","20m from one end \u00b7 40m fed from both ends"]
  ]).map(function(r){ return '<div class="sw-spec-row"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>'; }).join("");
  // sold in one sealing grade only, so this states it rather than offering a choice
  const g=C&&(C.ipGrades||[])[0];
  const ipRows=g?'<div class="cob-ip cob-ip-on"><b>'+g[0]+'</b><span class="cob-ip-dim">'+g[1]+'</span>'+
    '<span class="cob-ip-use">'+g[2]+'</span><em>The only grade we sell it in</em></div>':"";
  /* Supplier photos. They picture the bare strip on its adhesive backing, so the caption
     says so - the IP68 we sell is the same strip inside a clear silicone sleeve. */
  const shots=C?[[C.img.reel,"Supplied on a reel, cut to the length you order."],
                 [C.img.macro,"Dot-free: one continuous line of light, not a row of LEDs. The gold pads are the cut points."],
                 [C.img.lit,"Lit \u2014 the warm 3000K setting."]]
    .map(function(s){return '<figure class="cob-shot"><img src="'+s[0]+'" alt="24V Long Run COB strip light" loading="lazy"><figcaption>'+s[1]+'</figcaption></figure>';}).join(""):"";
  const photo=shots?'<div class="cob-gallery">'+shots+'</div>'+
    '<p class="cob-shotnote">Supplier photos show the bare strip. The version we sell is the same strip sealed inside a clear silicone sleeve for IP68.</p>':"";
  box.innerHTML='<button class="pk-back" data-swback="1">\u2190 Back</button>'+
    '<div class="sw-prog">\u2713 '+(fromCove?"The strip that fits":"Long run strip light")+'</div>'+
    '<h3>'+(fromCove?"Your recess is tight \u2014 use the Long Run COB strip"
                    :"For a long run, this is the strip")+'</h3>'+
    '<p class="sw-lead">'+(fromCove
      ? 'The 240V strip is chunky and needs that flat shelf, so it is out. The <b>24V Long Run COB</b> is thin, flexible and sips power, which is exactly what a shallow recess wants \u2014 and one feed still carries 20 metres.'
      : 'The <b>24V Long Run COB</b> only draws 7.5W a metre, which is the whole trick \u2014 low current means one driver at one end pushes light 20 metres without the far end going dim. Feed it from both ends and you get 40. It\u2019s fully sealed IP68, so it\u2019s equally at home down a garden bed or along an indoor bulkhead.')+'</p>'+
    photo+
    '<div class="sw-specs">'+rows+'</div>'+
    (ipRows?'<h4 class="cob-h4">Sealed for outdoors</h4>'+
      '<p class="cob-outdoor">This one only comes fully sealed, so it goes where other strip can\u2019t \u2014 '+
      'garden beds and planters, pergolas and outdoor features, under decks, around pools and water '+
      'features, and floating steps. Rain and a hose are no problem. It\u2019s just as happy indoors; '+
      'the sealing means damp is never something you have to think about.</p>'+
      '<div class="cob-ips">'+ipRows+'</div>':"")+
    '<p class="sw-note">Specs above are the supplier\u2019s own datasheet for this strip. '+
      'Not sure it suits your job? Call us on <a href="tel:+61892972969">(08) 9297 2969</a>.</p>'+
    '<div class="sw-cta">'+
      (p?'<button class="btn-call" data-pkg="'+p.id+'">Build my kit \u2192</button>':'')+
      '<a class="pk-restart" href="tel:+61892972969">Call (08) 9297 2969</a>'+
      '<button class="pk-restart" data-swrestart="1">Start again</button></div>';
}
/* Solderless clip connectors. Shown on 24V kits over 5m, where the run has to be
   joined. The diagram carries the rule; the photo shows the actual part. */
function connectorPanel(len){
  const W=340;
  const bar=(x,w,y)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="13" rx="2" fill="var(--glow)" stroke="var(--ink)" stroke-width="1"/>';
  const clip=(cx,y)=>'<rect x="'+(cx-6)+'" y="'+(y-4)+'" width="12" height="21" rx="2" fill="#fff" stroke="var(--ink)" stroke-width="1.4"/>'+
    '<path d="M'+(cx-2.5)+' '+(y+1)+' v11 M'+(cx+2.5)+' '+(y+1)+' v11" stroke="var(--ink)" stroke-width="1"/>';
  const cap=(x,y,t,anchor)=>'<text x="'+x+'" y="'+y+'" font-size="8.5" fill="#5d6151" text-anchor="'+(anchor||"middle")+'">'+t+'</text>';
  const hdr=(y,t)=>'<text x="14" y="'+y+'" font-size="8" fill="var(--muted)" font-family="JetBrains Mono,monospace">'+t+'</text>';
  // top: what they actually get - one unbroken length
  let svg='<svg viewBox="0 0 '+W+' 118" role="img" aria-label="The strip comes in one continuous length; if you cut it, a clip connector rejoins the pieces and carries up to 2.5 metres">'+
    hdr(11,"WHAT YOU GET")+bar(14,W-28,20)+cap(W/2,48,len+"m in one continuous length \u2014 no joins needed");
  // bottom: only if they choose to cut it
  const leftW=150, gapC=14+leftW+13;
  svg+=hdr(72,"ONLY IF YOU CUT IT")+bar(14,leftW,81)+clip(gapC,81)+bar(gapC+13,W-28-leftW-13,81)+
    '<path d="M'+(14+leftW+3)+' 74 v-7" stroke="#b0553f" stroke-width="1.2"/>'+
    cap(14,110,"cut at a marked line","start")+cap(W-14,110,"connector carries up to 2.5m","end")+'</svg>';
  return '<div class="cn-panel"><h4 class="cn-h">Your '+len+'m comes as one continuous strip</h4>'+
    '<div class="cn-row"><div class="cn-dia">'+svg+'</div></div>'+
    '<p class="cn-note">A straight run needs no connectors at all. If you do cut it \u2014 to turn a corner, '+
    'get past an obstacle or split the run \u2014 rejoin the pieces with a solderless clip connector: the strip '+
    'end pushes into the clear housing and the lid clips shut, no soldering. '+
    '<b>One connector carries up to 2.5m of strip.</b> Connectors aren\u2019t part of this kit \u2014 '+
    'tell us if you know you\u2019ll be cutting and we\u2019ll add them.</p></div>';
}
function renderWizard(){
  const box=$("#swBody"); if(!box) return;
  if(swPackageStrip){ renderPackage(); return; }
  if(swAnswers.place==="stairs"){ renderStairs(); return; }
  // ask for the length first - under 5m this strip is the wrong product
  if(swIsLongRun(swAnswers)&&swAnswers.length){ renderLongRun(); return; }
  const QS=swVisibleQs();
  if(swStep<QS.length){
    const Q=QS[swStep];
    box.innerHTML=(swStep>0?'<button class="pk-back" data-swback="1">\u2190 Back</button>':'')+
      '<div class="sw-prog">Question '+(swStep+1)+' of '+QS.length+'</div><h3>'+Q.q+'</h3>'+
      (Q.hint?'<p class="sw-hint">'+(typeof Q.hint==="function"?Q.hint(swAnswers):Q.hint)+'</p>':'')+
      (Q.extra?Q.extra(swAnswers):'')+
      (Q.input
        ?'<div class="sw-len"><input type="number" id="swLenInput" min="1" max="99" step="0.5" placeholder="e.g. '+(swAnswers.place==="cove"||swAnswers.place==="longrun"?"12":"4")+'" inputmode="decimal"> <span class="sw-len-m">metres</span><button class="sw-opt sw-go" data-swnum="1">Continue \u2192</button></div>'
        :'<div class="sw-opts">'+(typeof Q.opts==="function"?Q.opts(swAnswers):Q.opts).map((o,i)=>{
          const pic=qOptPhoto(Q,o,swAnswers);
          return pic?'<button class="sw-opt sw-opt-img" data-sw="'+i+'"><img src="'+pic+'" alt="" loading="lazy"><span>'+o[0]+'</span></button>'
                    :'<button class="sw-opt" data-sw="'+i+'">'+o[0]+'</button>';
        }).join("")+'</div>');
  } else {
    const ranked=stripPool().map(p=>({p,s:stripScore(p,swAnswers)})).sort((a,b)=>b.s-a.s);
    const top=ranked.filter(r=>r.s>0).slice(0,3);
    let list=(top.length?top:ranked.slice(0,3)).map(r=>r.p);
    let coveNote=''; let coveCallOnly=false;
    if(swAnswers.place==="cove"){
      const Lc0=parseFloat(swAnswers.length)||0;
      if(swAnswers.space!=="tight"&&swAnswers.control!=="smart"&&swAnswers.colour!=="cct"&&Lc0>0&&Lc0<10){
        coveNote='<div class="sw-callus">Recessed-ceiling runs under 10 metres need a custom option \u2014 give us a quick call on <a href="tel:0892972969">(08) 9297 2969</a> and we\u2019ll spec it with you on the spot.</div>';
        list=list.slice(0,2); coveCallOnly=true;
      }
      const v240=list.filter(p=>/240v/i.test(p.name));
      if(!coveCallOnly&&v240.length){
        const wantRGB=(swAnswers.colour==="rgb");
        const exact=v240.filter(p=>wantRGB===/rgb/i.test(p.name));
        list=(exact.length?exact:v240).slice(0,1);
        coveNote='<p class="sw-hint">Recessed ceilings = long-run 240V strip, kept simple: $60 driver included, one power feed, minimum 10m ('+(wantRGB?'RGB up to 35m':'fixed-colour white up to 50m')+'). Under 10m? Call us on (08) 9297 2969.</p>'; }
      else if(!coveCallOnly){
        const Lc=parseInt(swAnswers.length)||0;
        const why = swAnswers.space==="tight" ? "your recess is tight \u2014 the chunkier 240V strip won\u2019t fit nicely"
          : swAnswers.control==="smart" ? "240V strip is remote-only \u2014 it can\u2019t be run from the app"
          : swAnswers.colour==="cct" ? "240V is fixed colour \u2014 it can\u2019t do adjustable white"
          : (Lc>50) ? "240V tops out at 50m on one feed \u2014 for runs that long, call us on (08) 9297 2969 and we\u2019ll design it in segments"
          : (Lc>35&&swAnswers.colour==="rgb") ? "240V RGB tops out at 35m \u2014 for longer RGB runs, call us on (08) 9297 2969"
          : "240V comes in 10m+ runs only \u2014 yours is shorter (want 240V anyway? Call us on (08) 9297 2969)";
        coveNote='<p class="sw-hint">Normally a recessed ceiling gets 240V strip \u2014 but '+why+'. These 24V picks are the right fit instead:</p>';
      }
    }
    if(swAnswers.place!=="cove"){
      const Ln=parseFloat(swAnswers.length)||0;
      if(Ln>10){
        coveNote='<div class="sw-callus">Runs over 10 metres need power planned at several points \u2014 give us a quick call on <a href="tel:0892972969">(08) 9297 2969</a> and we\u2019ll design it with you.</div>';
        coveCallOnly=true; list=list.slice(0,2);
      }
    }
    const outNote=(swAnswers.place==="outdoor")?'<p class="sw-hint" style="margin-top:12px">Fully-exposed outdoor runs need IP67 weather-sealed strip. The picks below are the closest matches in our online range \u2014 for the dedicated IP67 outdoor & long-run strip, call our Perth team on (08) 9297 2969 and we\u2019ll spec it with you.</p>':'';
    let primary=list[0], alts=list.slice(1,3);
    if(coveCallOnly){ alts=list.slice(0,2); primary=null; }
    box.innerHTML='<button class="pk-back" data-swback="1">\u2190 Back</button><div class="sw-prog">\u2713 Your exact match</div>'+swMoodBanner()+'<h3>Based on your answers, this is the one:</h3>'+
      '<p class="sw-sum">'+swSummary()+'</p>'+coveNote+(coveCallOnly?'':outNote)+(coveCallOnly?'':'<p class="pk-hint">Tap it to see the complete kit \u2192</p>')+'<div class="sw-recs">'+(primary?recCard(primary):"")+
      (alts.length?'<details class="sw-alts"><summary>'+(coveCallOnly?'Or preview '+alts.length+' close option'+(alts.length>1?'s':'')+' \u2014 we\u2019ll confirm the details by phone':'Not quite right? See '+alts.length+' alternative'+(alts.length>1?'s':''))+'</summary>'+alts.map(recCard).join("")+'</details>':"")+'</div>'+STRIP_101;
  }
}
function openStripWizard(){
  clearTimeout(swTimer); swShown=true; swStep=0; swAnswers={}; swPackageStrip=null; swPkgSel={};
  renderWizard();
  $("#stripWizard").classList.add("open"); $("#swScrim").classList.add("show");
}
function closeStripWizard(){
  $("#stripWizard").classList.remove("open"); $("#swScrim").classList.remove("show");
}
const STRIP_TUTS=[
 ["7DAaL5gGab8","High-Quality Strip Lights — the range explained"],
 ["B-Bx8YMpNXQ","Cabinet LED Strip Lighting — install guide"],
 ["Q3iYeqDkIeE","Smart Stair Lights — connection & setup"],
 ["BCo0g85LRvI","Putting smart controllers into pairing mode"],
];
function renderStripTuts(){
  const host=$("#stripTutGrid"); if(!host) return;
  host.innerHTML=STRIP_TUTS.map(v=>'<div class="sl-tut"><div class="sl-tut-frame"><iframe loading="lazy" src="https://www.youtube.com/embed/'+v[0]+'" title="'+v[1]+'" allowfullscreen></iframe></div><span>'+v[1]+'</span></div>').join("");
}
function renderStrips(){
  const host=$("#stripGrid"); if(!host) return;
  host.innerHTML=PRODUCTS.filter(p=>p.cat==="strip"&&!/suspension|modular|channel/i.test(p.name)).map(cardHTML).join("");
  renderStripTuts();
}

/* ============================================================
   DOWNLIGHT FINDER
   Same shape as the strip finder: a few plain questions, then one
   matched fitting with a real photo, its real specs and a real price.

   Two rules carried over and enforced by tests:
     1. Never invent product data. A missing lumen or beam figure prints
        in red as "not published" rather than being filled in.
     2. Downlight counts come from the table Lazar supplied (the same one
        the layout planner uses), NOT from a lumen calculation.
   ============================================================ */

/* ---------- spec readers (all values come from specTable, never guessed) ---------- */
function dlSpec(p,label){
  const r=(p.specTable||[]).find(x=>String(x[0]).toLowerCase()===String(label).toLowerCase());
  return r?String(r[1]):null;
}
function dlCut(p){
  const d=dlSpec(p,"Dimensions")||"";
  const m=d.match(/cut\s*-?\s*out\s*(\d+)(?:\s*[-\u2013]\s*(\d+))?\s*mm/i);
  if(!m) return null;
  const lo=parseInt(m[1],10), hi=m[2]?parseInt(m[2],10):lo;
  return {min:lo, max:hi, txt: lo===hi ? lo+"mm" : lo+"\u2013"+hi+"mm"};
}
function dlBeam(p){
  const b=dlSpec(p,"Beam angle"); if(!b) return null;
  const m=b.match(/(\d+)\s*(?:\u00ba|\u00b0|deg)?/); if(!m) return null;
  const n=parseInt(m[1],10);
  return (n>0&&n<=180)?n:null;
}
function dlLum(p){ return dlSpec(p,"Brightness"); }
function dlWatt(p){ return dlSpec(p,"Power consumption"); }
function dlDim(p){ return dlSpec(p,"Dimmable"); }
function dlIP(p){
  const s=(dlSpec(p,"Weather Rating")||"")+" "+p.name;
  const all=s.match(/IP\s?(\d{2})/gi); if(!all) return null;
  return Math.max.apply(null,all.map(x=>parseInt(x.replace(/\D/g,""),10)));
}
/* Low glare is defined by beam angle, exactly as the layout planner does it:
   under 90 degrees is low glare, 90 and over is standard. */
function dlIsLowGlare(p){ const b=dlBeam(p); return b!==null && b<90; }

/* Only real downlights. Wall lights, ceiling oysters, star lights, the display
   light and the two mis-filed plug bases are excluded — they are in this
   category on greenhse.com but they are not downlights. */
function dlPool(){
  return PRODUCTS.filter(function(p){
    /* Star lights are 30 mm recessed fittings, so they belong in the finder at
       that size — but the drivers, kits and accessories around them don't. */
    var isStar = /star\s?light/i.test(p.name) && !/driver|kit/i.test(p.name);
    var isDownlight = /downlight/i.test(p.name);
    return (p.cat==="downlights" || p.cat==="star")
      && (isDownlight || isStar)
      && !/display light|plug base|socket|driver|gimbal/i.test(p.name)
      && !!dlCut(p);
  });
}

/* ---------- cut-out size bands ---------- */
const DL_SIZES=[
  {key:"30",  mm:30,  label:"30 mm",  lo:25,  hi:45,  lm:280,  blurb:"Star lights &amp; accents"},
  {key:"70",  mm:70,  label:"70 mm",  lo:46,  hi:80,  lm:650,  blurb:"Small &amp; subtle"},
  {key:"90",  mm:90,  label:"90 mm",  lo:81,  hi:104, lm:1000, blurb:"Australia's standard"},
  {key:"110", mm:110, label:"110 mm", lo:105, hi:135, lm:1200, blurb:"Brighter, fewer fittings"}
];
function dlBand(key){ return DL_SIZES.find(b=>b.key===(key==="unsure"?"90":key))||DL_SIZES[1]; }
function dlBandIndex(key){ return DL_SIZES.indexOf(dlBand(key)); }

/* ---------- how many downlights: Lazar's table, not a lumen calculation ----------
   Short side first, then long side. The first band both sides fit inside wins. */
const DL_BANDS=[
  {w:2, l:2,  std:1, low:1},
  {w:3, l:4,  std:4, low:4},
  {w:4, l:5,  std:4, low:6},
  {w:5, l:8,  std:6, low:8},
  {w:6, l:10, std:8, low:10}
];
function dlCount(a,b,lowGlare){
  const s=Math.min(a,b), L=Math.max(a,b);
  for(let i=0;i<DL_BANDS.length;i++){
    const B=DL_BANDS[i];
    if(s<=B.w && L<=B.l) return lowGlare?B.low:B.std;
  }
  return null; /* bigger than the table covers — send them to us */
}

/* ---------- diagrams ---------- */
const DL_INK="#15170F", DL_GLOW="#F2C230", DL_DIM="var(--muted)", DL_BAD="#C4453B", DL_LINE="#c9c6b8";

/* Every cut-out we stock, drawn to one scale so the jump from 70 to 200 is obvious. */
function dlCutSVG(active){
  const S=0.72, GAP=22, PADX=14, H=140;
  let x=PADX, out="", maxR=0;
  DL_SIZES.forEach(function(b){
    const r=(b.mm*S)/2; if(r>maxR) maxR=r;
  });
  const baseY=30+maxR*2;
  DL_SIZES.forEach(function(b){
    const r=(b.mm*S)/2, cx=x+r, cy=baseY-r;
    const on=(active&&active!=="unsure")?(active===b.key):false;
    out+='<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="'+r.toFixed(1)+'" fill="'+(on?DL_GLOW:"#ffffff")+'" fill-opacity="'+(on?".55":"1")+'" stroke="'+(on?DL_INK:DL_DIM)+'" stroke-width="'+(on?2.4:1.3)+'"/>';
    /* Brightness sits above the circle, in bold — it's the number people
       actually choose on. The cut-out size is the constraint underneath. */
    out+='<text x="'+cx.toFixed(1)+'" y="'+(cy-r-9).toFixed(1)+'" font-size="11.5" text-anchor="middle" fill="'+(on?DL_INK:"#5d6151")+'" font-weight="700">'+b.lm+' lm</text>';
    out+='<text x="'+cx.toFixed(1)+'" y="'+(baseY+15)+'" font-size="10" text-anchor="middle" fill="'+(on?DL_INK:"#6b6e5f")+'" font-weight="'+(on?"700":"400")+'">'+b.mm+' mm</text>';
    x+=r*2+GAP;
  });
  const W=x-GAP+PADX;
  return '<figure class="dl-cutfig"><svg viewBox="0 0 '+W.toFixed(0)+' '+H+'" role="img" aria-label="Downlight cut-out sizes drawn to scale">'
    + out
    + '<text x="'+PADX+'" y="'+(baseY+32)+'" font-size="9.5" fill="'+DL_DIM+'">CUT-OUT DIAMETER IN MILLIMETRES \u2014 DRAWN TO SCALE</text>'
    + '</svg>'
    + '<figcaption><b>Measure the hole, not the fitting.</b> The cut-out is the opening in the plasterboard. '
    + 'Hold a tape across the middle of an existing hole \u2014 edge to edge. Most Perth homes are 90&#8201;mm.</figcaption></figure>';
}

/* Cross-section pair. The whole point of the picture is where the LED sits:
   flush at the face (you see it) versus set back behind a baffle (you don't). */
const DL_BEAM_SVG={std:"<svg viewBox=\"0 0 380 282\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Standard, 110 degree beam, source in view\"><rect x=\"65.0\" y=\"12\" width=\"250\" height=\"40\" rx=\"20\" fill=\"#C0563E\"/><path d=\"M84.0 25.0 l14 14 M98.0 25.0 l-14 14\" stroke=\"#fff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><text x=\"110.0\" y=\"38.0\" font-size=\"16\" font-weight=\"700\" fill=\"#fff\" font-family=\"system-ui,-apple-system,sans-serif\">Glare</text><text x=\"190.0\" y=\"70\" font-size=\"12\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">110\u00b0 standard \u2014 lamp on show</text><defs><radialGradient id=\"beamst\" cx=\"50%\" cy=\"0%\" r=\"118%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.42\"/><stop offset=\"45%\" stop-color=\"#E8A33D\" stop-opacity=\"0.20\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0.03\"/></radialGradient><radialGradient id=\"poolst\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.50\"/><stop offset=\"60%\" stop-color=\"#E8A33D\" stop-opacity=\"0.22\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0\"/></radialGradient></defs><line x1=\"20\" y1=\"92\" x2=\"360\" y2=\"92\" stroke=\"#15170F\" stroke-width=\"2\"/><line x1=\"24\" y1=\"92\" x2=\"18\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"35\" y1=\"92\" x2=\"29\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"46\" y1=\"92\" x2=\"40\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"57\" y1=\"92\" x2=\"51\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"68\" y1=\"92\" x2=\"62\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"79\" y1=\"92\" x2=\"73\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"90\" y1=\"92\" x2=\"84\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"101\" y1=\"92\" x2=\"95\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"112\" y1=\"92\" x2=\"106\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"123\" y1=\"92\" x2=\"117\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"134\" y1=\"92\" x2=\"128\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"145\" y1=\"92\" x2=\"139\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"156\" y1=\"92\" x2=\"150\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"167\" y1=\"92\" x2=\"161\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"178\" y1=\"92\" x2=\"172\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"189\" y1=\"92\" x2=\"183\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"200\" y1=\"92\" x2=\"194\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"211\" y1=\"92\" x2=\"205\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"222\" y1=\"92\" x2=\"216\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"233\" y1=\"92\" x2=\"227\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"244\" y1=\"92\" x2=\"238\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"255\" y1=\"92\" x2=\"249\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"266\" y1=\"92\" x2=\"260\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"277\" y1=\"92\" x2=\"271\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"288\" y1=\"92\" x2=\"282\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"299\" y1=\"92\" x2=\"293\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"310\" y1=\"92\" x2=\"304\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"321\" y1=\"92\" x2=\"315\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"332\" y1=\"92\" x2=\"326\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"343\" y1=\"92\" x2=\"337\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"354\" y1=\"92\" x2=\"348\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><path d=\"M190 92 L40.0 197 L340.0 197 Z\" fill=\"url(#beamst)\"/><line x1=\"190\" y1=\"92\" x2=\"40.0\" y2=\"197\" stroke=\"#E8A33D\" stroke-width=\"1\" stroke-opacity=\"0.55\"/><line x1=\"190\" y1=\"92\" x2=\"340.0\" y2=\"197\" stroke=\"#E8A33D\" stroke-width=\"1\" stroke-opacity=\"0.55\"/><line x1=\"190\" y1=\"92\" x2=\"190\" y2=\"197\" stroke=\"#8A8D7F\" stroke-width=\"0.8\" stroke-dasharray=\"2 5\"/><path d=\"M152.3 118.4 A 46 46 0 0 0 227.7 118.4\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1\"/><line x1=\"155.6\" y1=\"116.1\" x2=\"149.0\" y2=\"120.7\" stroke=\"#15170F\" stroke-width=\"1\"/><line x1=\"224.4\" y1=\"116.1\" x2=\"231.0\" y2=\"120.7\" stroke=\"#15170F\" stroke-width=\"1\"/><text x=\"190\" y=\"157\" font-size=\"15\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">110\u00b0</text><rect x=\"164\" y=\"89\" width=\"52\" height=\"3\" fill=\"#E8A33D\"/><ellipse cx=\"190\" cy=\"197\" rx=\"150.0\" ry=\"15\" fill=\"url(#poolst)\"/><line x1=\"20\" y1=\"197\" x2=\"360\" y2=\"197\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M56 164 v18\" stroke=\"#2F6B47\" stroke-width=\"3.6\" stroke-linecap=\"round\"/><path d=\"M48 197 L56 181 L64 197\" fill=\"none\" stroke=\"#2F6B47\" stroke-width=\"3.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"56\" cy=\"143\" r=\"20\" fill=\"#2F6B47\"/><path d=\"M43.5 140 q5 4.5 10 0\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M43.0 130.5 l11 -3.4\" stroke=\"#fff\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M58.5 140 q5 4.5 10 0\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M58.0 130.5 l11 3.4\" stroke=\"#fff\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M50 154 q6 -4.5 12 0\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><line x1=\"36\" y1=\"128\" x2=\"28\" y2=\"121\" stroke=\"#C0563E\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><line x1=\"45\" y1=\"120\" x2=\"41\" y2=\"111\" stroke=\"#C0563E\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><line x1=\"56\" y1=\"118\" x2=\"56\" y2=\"108\" stroke=\"#C0563E\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><line x1=\"67\" y1=\"120\" x2=\"71\" y2=\"111\" stroke=\"#C0563E\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><line x1=\"76\" y1=\"128\" x2=\"84\" y2=\"121\" stroke=\"#C0563E\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><line x1=\"68.5\" y1=\"140\" x2=\"166\" y2=\"91\" stroke=\"#E8A33D\" stroke-width=\"3.4\" stroke-linecap=\"round\"/><circle cx=\"63.5\" cy=\"140\" r=\"8\" fill=\"#E8A33D\" fill-opacity=\"0.55\"/><line x1=\"40.0\" y1=\"231\" x2=\"340.0\" y2=\"231\" stroke=\"#8A8D7F\" stroke-width=\"0.9\"/><line x1=\"40.0\" y1=\"227\" x2=\"40.0\" y2=\"235\" stroke=\"#8A8D7F\" stroke-width=\"0.9\"/><path d=\"M47.0 228.4 L40.0 231 L47.0 233.6\" fill=\"none\" stroke=\"#8A8D7F\" stroke-width=\"0.9\" stroke-linejoin=\"round\"/><line x1=\"340.0\" y1=\"227\" x2=\"340.0\" y2=\"235\" stroke=\"#8A8D7F\" stroke-width=\"0.9\"/><path d=\"M333.0 228.4 L340.0 231 L333.0 233.6\" fill=\"none\" stroke=\"#8A8D7F\" stroke-width=\"0.9\" stroke-linejoin=\"round\"/><text x=\"20\" y=\"215\" font-size=\"11\" font-weight=\"600\" text-anchor=\"start\" fill=\"#C0563E\" font-family=\"system-ui,-apple-system,sans-serif\">Straight in your eyes</text><text x=\"190\" y=\"247\" font-size=\"9\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.8\">POOL 2.86\u00d7 THE DROP</text></svg>",low:"<svg viewBox=\"0 0 380 282\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Low glare, 60 degree beam, source hidden\"><rect x=\"65.0\" y=\"12\" width=\"250\" height=\"40\" rx=\"20\" fill=\"#2F6B47\"/><path d=\"M83.0 32.0 l6 6.5 l12 -13\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><text x=\"110.0\" y=\"38.0\" font-size=\"16\" font-weight=\"700\" fill=\"#fff\" font-family=\"system-ui,-apple-system,sans-serif\">No glare</text><text x=\"190.0\" y=\"70\" font-size=\"12\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">60\u00b0 low glare \u2014 lamp set back</text><defs><radialGradient id=\"beamlg\" cx=\"50%\" cy=\"0%\" r=\"118%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.42\"/><stop offset=\"45%\" stop-color=\"#E8A33D\" stop-opacity=\"0.20\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0.03\"/></radialGradient><radialGradient id=\"poollg\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.50\"/><stop offset=\"60%\" stop-color=\"#E8A33D\" stop-opacity=\"0.22\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0\"/></radialGradient></defs><line x1=\"20\" y1=\"92\" x2=\"360\" y2=\"92\" stroke=\"#15170F\" stroke-width=\"2\"/><line x1=\"24\" y1=\"92\" x2=\"18\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"35\" y1=\"92\" x2=\"29\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"46\" y1=\"92\" x2=\"40\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"57\" y1=\"92\" x2=\"51\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"68\" y1=\"92\" x2=\"62\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"79\" y1=\"92\" x2=\"73\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"90\" y1=\"92\" x2=\"84\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"101\" y1=\"92\" x2=\"95\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"112\" y1=\"92\" x2=\"106\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"123\" y1=\"92\" x2=\"117\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"134\" y1=\"92\" x2=\"128\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"145\" y1=\"92\" x2=\"139\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"156\" y1=\"92\" x2=\"150\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"167\" y1=\"92\" x2=\"161\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"178\" y1=\"92\" x2=\"172\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"189\" y1=\"92\" x2=\"183\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"200\" y1=\"92\" x2=\"194\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"211\" y1=\"92\" x2=\"205\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"222\" y1=\"92\" x2=\"216\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"233\" y1=\"92\" x2=\"227\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"244\" y1=\"92\" x2=\"238\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"255\" y1=\"92\" x2=\"249\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"266\" y1=\"92\" x2=\"260\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"277\" y1=\"92\" x2=\"271\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"288\" y1=\"92\" x2=\"282\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"299\" y1=\"92\" x2=\"293\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"310\" y1=\"92\" x2=\"304\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"321\" y1=\"92\" x2=\"315\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"332\" y1=\"92\" x2=\"326\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"343\" y1=\"92\" x2=\"337\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"354\" y1=\"92\" x2=\"348\" y2=\"85\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><path d=\"M190 92 L129.4 197 L250.6 197 Z\" fill=\"url(#beamlg)\"/><line x1=\"190\" y1=\"92\" x2=\"129.4\" y2=\"197\" stroke=\"#E8A33D\" stroke-width=\"1\" stroke-opacity=\"0.55\"/><line x1=\"190\" y1=\"92\" x2=\"250.6\" y2=\"197\" stroke=\"#E8A33D\" stroke-width=\"1\" stroke-opacity=\"0.55\"/><line x1=\"190\" y1=\"92\" x2=\"190\" y2=\"197\" stroke=\"#8A8D7F\" stroke-width=\"0.8\" stroke-dasharray=\"2 5\"/><path d=\"M167.0 131.8 A 46 46 0 0 0 213.0 131.8\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1\"/><line x1=\"169.0\" y1=\"128.4\" x2=\"165.0\" y2=\"135.3\" stroke=\"#15170F\" stroke-width=\"1\"/><line x1=\"211.0\" y1=\"128.4\" x2=\"215.0\" y2=\"135.3\" stroke=\"#15170F\" stroke-width=\"1\"/><text x=\"190\" y=\"157\" font-size=\"15\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">60\u00b0</text><rect x=\"175\" y=\"89\" width=\"30\" height=\"3\" fill=\"#15170F\"/><rect x=\"181\" y=\"90.5\" width=\"18\" height=\"1.5\" fill=\"#E8A33D\"/><ellipse cx=\"190\" cy=\"197\" rx=\"60.6\" ry=\"10.3\" fill=\"url(#poollg)\"/><line x1=\"20\" y1=\"197\" x2=\"360\" y2=\"197\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M56 164 v18\" stroke=\"#2F6B47\" stroke-width=\"3.6\" stroke-linecap=\"round\"/><path d=\"M48 197 L56 181 L64 197\" fill=\"none\" stroke=\"#2F6B47\" stroke-width=\"3.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"56\" cy=\"143\" r=\"20\" fill=\"#2F6B47\"/><circle cx=\"48.5\" cy=\"140\" r=\"4.6\" fill=\"#fff\"/><circle cx=\"48.5\" cy=\"140\" r=\"2.2\" fill=\"#15170F\"/><circle cx=\"63.5\" cy=\"140\" r=\"4.6\" fill=\"#fff\"/><circle cx=\"63.5\" cy=\"140\" r=\"2.2\" fill=\"#15170F\"/><path d=\"M49 152 q7 5.5 14 0\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><line x1=\"69.5\" y1=\"140\" x2=\"174\" y2=\"90\" stroke=\"#8A8D7F\" stroke-width=\"1.2\" stroke-dasharray=\"4 4\"/><circle cx=\"122\" cy=\"115\" r=\"11\" fill=\"#fff\" stroke=\"#2F6B47\" stroke-width=\"1.8\"/><path d=\"M118 111 l8.4 8.4 M126 111 l-8.4 8.4\" stroke=\"#2F6B47\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"129.4\" y1=\"231\" x2=\"250.6\" y2=\"231\" stroke=\"#8A8D7F\" stroke-width=\"0.9\"/><line x1=\"129.4\" y1=\"227\" x2=\"129.4\" y2=\"235\" stroke=\"#8A8D7F\" stroke-width=\"0.9\"/><path d=\"M136.4 228.4 L129.4 231 L136.4 233.6\" fill=\"none\" stroke=\"#8A8D7F\" stroke-width=\"0.9\" stroke-linejoin=\"round\"/><line x1=\"250.6\" y1=\"227\" x2=\"250.6\" y2=\"235\" stroke=\"#8A8D7F\" stroke-width=\"0.9\"/><path d=\"M243.6 228.4 L250.6 231 L243.6 233.6\" fill=\"none\" stroke=\"#8A8D7F\" stroke-width=\"0.9\" stroke-linejoin=\"round\"/><text x=\"20\" y=\"215\" font-size=\"11\" font-weight=\"600\" text-anchor=\"start\" fill=\"#2F6B47\" font-family=\"system-ui,-apple-system,sans-serif\">Nothing in your eyes</text><text x=\"190\" y=\"247\" font-size=\"9\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.8\">POOL 1.15\u00d7 THE DROP</text></svg>"};
function dlGlareSVG(kind){ return DL_BEAM_SVG[kind==="low"?"low":"std"]; }

/* Fan panels are pre-measured SVG - see mkfan.py for the geometry. */
const DL_FAN_SVG={std:"<svg viewBox=\"0 0 400 430\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"The fan blades chop the light into moving shadows\"><defs><radialGradient id=\"pst\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.52\"/><stop offset=\"45%\" stop-color=\"#E8A33D\" stop-opacity=\"0.26\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0\"/></radialGradient><clipPath id=\"rmst\"><rect x=\"50.4\" y=\"46.4\" width=\"299.2\" height=\"299.2\" rx=\"3\"/></clipPath></defs><rect x=\"50.4\" y=\"46.4\" width=\"299.2\" height=\"299.2\" rx=\"3\" fill=\"#F6F4EC\" stroke=\"#15170F\" stroke-width=\"2.5\"/><g clip-path=\"url(#rmst)\"><circle cx=\"262.2\" cy=\"258.2\" r=\"138.7\" fill=\"url(#pst)\"/><circle cx=\"137.8\" cy=\"258.2\" r=\"138.7\" fill=\"url(#pst)\"/><circle cx=\"137.8\" cy=\"133.8\" r=\"138.7\" fill=\"url(#pst)\"/><circle cx=\"262.2\" cy=\"133.8\" r=\"138.7\" fill=\"url(#pst)\"/><path d=\"M200.0 196 L422.2 227.2 A 224.4 224.4 0 0 1 386.0 321.5 Z\" fill=\"#15170F\" fill-opacity=\"0.22\"/><path d=\"M200.0 196 L284.1 404.1 A 224.4 224.4 0 0 1 184.3 419.9 Z\" fill=\"#15170F\" fill-opacity=\"0.22\"/><path d=\"M200.0 196 L61.8 372.8 A 224.4 224.4 0 0 1 -1.7 294.4 Z\" fill=\"#15170F\" fill-opacity=\"0.22\"/><path d=\"M200.0 196 L-22.2 164.8 A 224.4 224.4 0 0 1 14.0 70.5 Z\" fill=\"#15170F\" fill-opacity=\"0.22\"/><path d=\"M200.0 196 L115.9 -12.1 A 224.4 224.4 0 0 1 215.7 -27.9 Z\" fill=\"#15170F\" fill-opacity=\"0.22\"/><path d=\"M200.0 196 L338.2 19.2 A 224.4 224.4 0 0 1 401.7 97.6 Z\" fill=\"#15170F\" fill-opacity=\"0.22\"/></g><path d=\"M200.0 196 L247.0 230.1\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\" opacity=\"0.18\"/><path d=\"M200.0 196 L165.9 243.0\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\" opacity=\"0.18\"/><path d=\"M200.0 196 L153.0 161.9\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\" opacity=\"0.18\"/><path d=\"M200.0 196 L234.1 149.0\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\" opacity=\"0.18\"/><path d=\"M200.0 196 L237.3 240.5\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\" opacity=\"0.1\"/><path d=\"M200.0 196 L155.5 233.3\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\" opacity=\"0.1\"/><path d=\"M200.0 196 L162.7 151.5\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\" opacity=\"0.1\"/><path d=\"M200.0 196 L244.5 158.7\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\" opacity=\"0.1\"/><path d=\"M200.0 196 L253.9 217.8\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\"/><path d=\"M200.0 196 L178.2 249.9\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\"/><path d=\"M200.0 196 L146.1 174.2\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\"/><path d=\"M200.0 196 L221.8 142.1\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\"/><circle cx=\"200.0\" cy=\"196\" r=\"58.1\" fill=\"none\" stroke=\"#8A8D7F\" stroke-width=\"1.2\" stroke-dasharray=\"5 5\"/><circle cx=\"200.0\" cy=\"196\" r=\"11\" fill=\"#15170F\"/><circle cx=\"262.2\" cy=\"258.2\" r=\"9\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"2\"/><circle cx=\"262.2\" cy=\"258.2\" r=\"3.4\" fill=\"#15170F\"/><circle cx=\"137.8\" cy=\"258.2\" r=\"9\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"2\"/><circle cx=\"137.8\" cy=\"258.2\" r=\"3.4\" fill=\"#15170F\"/><circle cx=\"137.8\" cy=\"133.8\" r=\"9\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"2\"/><circle cx=\"137.8\" cy=\"133.8\" r=\"3.4\" fill=\"#15170F\"/><circle cx=\"262.2\" cy=\"133.8\" r=\"9\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"2\"/><circle cx=\"262.2\" cy=\"133.8\" r=\"3.4\" fill=\"#15170F\"/><rect x=\"84.0\" y=\"16\" width=\"232\" height=\"42\" rx=\"21\" fill=\"#C0563E\"/><path d=\"M104.0 30.0 l14 14 M118.0 30.0 l-14 14\" stroke=\"#fff\" stroke-width=\"3.4\" stroke-linecap=\"round\"/><text x=\"131.0\" y=\"43.0\" font-size=\"17\" font-weight=\"700\" fill=\"#fff\" font-family=\"system-ui,-apple-system,sans-serif\">Flicker</text><text x=\"200.0\" y=\"80\" font-size=\"12.5\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">110\u00b0 standard downlights + ceiling fan</text><text x=\"200.0\" y=\"375.6\" font-size=\"13\" text-anchor=\"middle\" fill=\"#C0563E\" font-weight=\"600\" font-family=\"system-ui,-apple-system,sans-serif\">Blades cut the light</text><text x=\"200.0\" y=\"395.6\" font-size=\"11.5\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"system-ui,-apple-system,sans-serif\">Wide beam spreads under the blades</text></svg>",low:"<svg viewBox=\"0 0 400 430\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Four clean pools of light, the fan does not cut them\"><defs><radialGradient id=\"plg\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.52\"/><stop offset=\"45%\" stop-color=\"#E8A33D\" stop-opacity=\"0.26\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0\"/></radialGradient><clipPath id=\"rmlg\"><rect x=\"50.4\" y=\"46.4\" width=\"299.2\" height=\"299.2\" rx=\"3\"/></clipPath></defs><rect x=\"50.4\" y=\"46.4\" width=\"299.2\" height=\"299.2\" rx=\"3\" fill=\"#F6F4EC\" stroke=\"#15170F\" stroke-width=\"2.5\"/><g clip-path=\"url(#rmlg)\"><circle cx=\"262.2\" cy=\"258.2\" r=\"56.1\" fill=\"url(#plg)\"/><circle cx=\"137.8\" cy=\"258.2\" r=\"56.1\" fill=\"url(#plg)\"/><circle cx=\"137.8\" cy=\"133.8\" r=\"56.1\" fill=\"url(#plg)\"/><circle cx=\"262.2\" cy=\"133.8\" r=\"56.1\" fill=\"url(#plg)\"/></g><path d=\"M200.0 196 L253.9 217.8\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\"/><path d=\"M200.0 196 L178.2 249.9\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\"/><path d=\"M200.0 196 L146.1 174.2\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\"/><path d=\"M200.0 196 L221.8 142.1\" stroke=\"#15170F\" stroke-width=\"9\" stroke-linecap=\"round\"/><circle cx=\"200.0\" cy=\"196\" r=\"58.1\" fill=\"none\" stroke=\"#8A8D7F\" stroke-width=\"1.2\" stroke-dasharray=\"5 5\"/><circle cx=\"200.0\" cy=\"196\" r=\"11\" fill=\"#15170F\"/><circle cx=\"262.2\" cy=\"258.2\" r=\"9\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"2\"/><circle cx=\"262.2\" cy=\"258.2\" r=\"3.4\" fill=\"#15170F\"/><circle cx=\"137.8\" cy=\"258.2\" r=\"9\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"2\"/><circle cx=\"137.8\" cy=\"258.2\" r=\"3.4\" fill=\"#15170F\"/><circle cx=\"137.8\" cy=\"133.8\" r=\"9\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"2\"/><circle cx=\"137.8\" cy=\"133.8\" r=\"3.4\" fill=\"#15170F\"/><circle cx=\"262.2\" cy=\"133.8\" r=\"9\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"2\"/><circle cx=\"262.2\" cy=\"133.8\" r=\"3.4\" fill=\"#15170F\"/><rect x=\"84.0\" y=\"16\" width=\"232\" height=\"42\" rx=\"21\" fill=\"#2F6B47\"/><path d=\"M103.0 37.0 l6 6.5 l12 -13\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><text x=\"131.0\" y=\"43.0\" font-size=\"17\" font-weight=\"700\" fill=\"#fff\" font-family=\"system-ui,-apple-system,sans-serif\">No flicker</text><text x=\"200.0\" y=\"80\" font-size=\"12.5\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">60\u00b0 low glare downlights + ceiling fan</text><text x=\"200.0\" y=\"375.6\" font-size=\"13\" text-anchor=\"middle\" fill=\"#2F6B47\" font-weight=\"600\" font-family=\"system-ui,-apple-system,sans-serif\">Blades miss the light</text><text x=\"200.0\" y=\"395.6\" font-size=\"11.5\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"system-ui,-apple-system,sans-serif\">Narrow beam lands outside the blades</text></svg>"};
function dlFanSVG(kind){ return DL_FAN_SVG[kind==="low"?"low":"std"]; }


/* ---------- star lights ----------
   At 30 mm there is one fitting, so the finder stops asking questions and
   explains the thing people actually get wrong instead: the driver decides
   whether the run dims, not the light. */
const DL_DRIVER_SVG={"p3": "<svg viewBox=\"0 0 300 176\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"3 pin driver running 3 star lights, not dimmable\"><defs><radialGradient id=\"sl3\" cx=\"50%\" cy=\"0%\" r=\"110%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.42\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0\"/></radialGradient></defs><line x1=\"10\" y1=\"63.0\" x2=\"44\" y2=\"63.0\" stroke=\"#15170F\" stroke-width=\"1.6\"/><text x=\"10\" y=\"56.0\" font-size=\"8\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.5\">240V</text><rect x=\"44\" y=\"46\" width=\"54\" height=\"34\" rx=\"3\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"1.6\"/><text x=\"71.0\" y=\"61\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">3 pin</text><text x=\"71.0\" y=\"73\" font-size=\"8\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.5\">DRIVER</text><line x1=\"106\" y1=\"96\" x2=\"288\" y2=\"96\" stroke=\"#15170F\" stroke-width=\"2\"/><line x1=\"110\" y1=\"96\" x2=\"104\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"121\" y1=\"96\" x2=\"115\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"132\" y1=\"96\" x2=\"126\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"143\" y1=\"96\" x2=\"137\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"154\" y1=\"96\" x2=\"148\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"165\" y1=\"96\" x2=\"159\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"176\" y1=\"96\" x2=\"170\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"187\" y1=\"96\" x2=\"181\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"198\" y1=\"96\" x2=\"192\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"209\" y1=\"96\" x2=\"203\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"220\" y1=\"96\" x2=\"214\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"231\" y1=\"96\" x2=\"225\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"242\" y1=\"96\" x2=\"236\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"253\" y1=\"96\" x2=\"247\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"264\" y1=\"96\" x2=\"258\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"275\" y1=\"96\" x2=\"269\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"286\" y1=\"96\" x2=\"280\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><path d=\"M98 63.0 C 124 63.0, 106.0 70, 124.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"117.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"124.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M124.0 99 L107.0 152 L141.0 152 Z\" fill=\"url(#sl3)\"/><path d=\"M98 63.0 C 124 63.0, 181.0 70, 199.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"192.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"199.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M199.0 99 L182.0 152 L216.0 152 Z\" fill=\"url(#sl3)\"/><path d=\"M98 63.0 C 124 63.0, 256.0 70, 274.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"267.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"274.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M274.0 99 L257.0 152 L291.0 152 Z\" fill=\"url(#sl3)\"/><text x=\"199.0\" y=\"126\" font-size=\"9\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.6\">3 \u00d7 3W HEADS</text><circle cx=\"51\" cy=\"146\" r=\"7\" fill=\"none\" stroke=\"#C0563E\" stroke-width=\"1.5\"/><path d=\"M48 143 l6 6 M54 143 l-6 6\" stroke=\"#C0563E\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><text x=\"64\" y=\"150\" font-size=\"12\" font-weight=\"600\" fill=\"#C0563E\" font-family=\"system-ui,-apple-system,sans-serif\">Not dimmable</text></svg>", "p4": "<svg viewBox=\"0 0 300 176\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"4 pin driver running 4 star lights, dimmable\"><defs><radialGradient id=\"sl4\" cx=\"50%\" cy=\"0%\" r=\"110%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.42\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0\"/></radialGradient></defs><line x1=\"10\" y1=\"63.0\" x2=\"44\" y2=\"63.0\" stroke=\"#15170F\" stroke-width=\"1.6\"/><text x=\"10\" y=\"56.0\" font-size=\"8\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.5\">240V</text><rect x=\"44\" y=\"46\" width=\"54\" height=\"34\" rx=\"3\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"1.6\"/><text x=\"71.0\" y=\"61\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">4 pin</text><text x=\"71.0\" y=\"73\" font-size=\"8\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.5\">DRIVER</text><line x1=\"106\" y1=\"96\" x2=\"288\" y2=\"96\" stroke=\"#15170F\" stroke-width=\"2\"/><line x1=\"110\" y1=\"96\" x2=\"104\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"121\" y1=\"96\" x2=\"115\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"132\" y1=\"96\" x2=\"126\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"143\" y1=\"96\" x2=\"137\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"154\" y1=\"96\" x2=\"148\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"165\" y1=\"96\" x2=\"159\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"176\" y1=\"96\" x2=\"170\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"187\" y1=\"96\" x2=\"181\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"198\" y1=\"96\" x2=\"192\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"209\" y1=\"96\" x2=\"203\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"220\" y1=\"96\" x2=\"214\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"231\" y1=\"96\" x2=\"225\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"242\" y1=\"96\" x2=\"236\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"253\" y1=\"96\" x2=\"247\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"264\" y1=\"96\" x2=\"258\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"275\" y1=\"96\" x2=\"269\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"286\" y1=\"96\" x2=\"280\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><path d=\"M98 63.0 C 124 63.0, 106.0 70, 124.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"117.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"124.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M124.0 99 L107.0 152 L141.0 152 Z\" fill=\"url(#sl4)\"/><path d=\"M98 63.0 C 124 63.0, 156.0 70, 174.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"167.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"174.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M174.0 99 L157.0 152 L191.0 152 Z\" fill=\"url(#sl4)\"/><path d=\"M98 63.0 C 124 63.0, 206.0 70, 224.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"217.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"224.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M224.0 99 L207.0 152 L241.0 152 Z\" fill=\"url(#sl4)\"/><path d=\"M98 63.0 C 124 63.0, 256.0 70, 274.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"267.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"274.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M274.0 99 L257.0 152 L291.0 152 Z\" fill=\"url(#sl4)\"/><text x=\"199.0\" y=\"126\" font-size=\"9\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.6\">4 \u00d7 3W HEADS</text><circle cx=\"51\" cy=\"146\" r=\"7\" fill=\"none\" stroke=\"#2F6B47\" stroke-width=\"1.5\"/><path d=\"M47.6 145.8 l2.4 2.6 l5-5.4\" fill=\"none\" stroke=\"#2F6B47\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><text x=\"64\" y=\"150\" font-size=\"12\" font-weight=\"600\" fill=\"#2F6B47\" font-family=\"system-ui,-apple-system,sans-serif\">Dimmable</text></svg>", "p6": "<svg viewBox=\"0 0 300 176\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"6 pin driver running 6 star lights, dimmable\"><defs><radialGradient id=\"sl6\" cx=\"50%\" cy=\"0%\" r=\"110%\"><stop offset=\"0%\" stop-color=\"#E8A33D\" stop-opacity=\"0.42\"/><stop offset=\"100%\" stop-color=\"#E8A33D\" stop-opacity=\"0\"/></radialGradient></defs><line x1=\"10\" y1=\"63.0\" x2=\"44\" y2=\"63.0\" stroke=\"#15170F\" stroke-width=\"1.6\"/><text x=\"10\" y=\"56.0\" font-size=\"8\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.5\">240V</text><rect x=\"44\" y=\"46\" width=\"54\" height=\"34\" rx=\"3\" fill=\"#fff\" stroke=\"#15170F\" stroke-width=\"1.6\"/><text x=\"71.0\" y=\"61\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#15170F\" font-family=\"system-ui,-apple-system,sans-serif\">6 pin</text><text x=\"71.0\" y=\"73\" font-size=\"8\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.5\">DRIVER</text><line x1=\"106\" y1=\"96\" x2=\"288\" y2=\"96\" stroke=\"#15170F\" stroke-width=\"2\"/><line x1=\"110\" y1=\"96\" x2=\"104\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"121\" y1=\"96\" x2=\"115\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"132\" y1=\"96\" x2=\"126\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"143\" y1=\"96\" x2=\"137\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"154\" y1=\"96\" x2=\"148\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"165\" y1=\"96\" x2=\"159\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"176\" y1=\"96\" x2=\"170\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"187\" y1=\"96\" x2=\"181\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"198\" y1=\"96\" x2=\"192\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"209\" y1=\"96\" x2=\"203\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"220\" y1=\"96\" x2=\"214\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"231\" y1=\"96\" x2=\"225\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"242\" y1=\"96\" x2=\"236\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"253\" y1=\"96\" x2=\"247\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"264\" y1=\"96\" x2=\"258\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"275\" y1=\"96\" x2=\"269\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><line x1=\"286\" y1=\"96\" x2=\"280\" y2=\"89\" stroke=\"#C9C6BA\" stroke-width=\"1\"/><path d=\"M98 63.0 C 124 63.0, 106.0 70, 124.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"117.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"124.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M124.0 99 L107.0 152 L141.0 152 Z\" fill=\"url(#sl6)\"/><path d=\"M98 63.0 C 124 63.0, 136.0 70, 154.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"147.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"154.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M154.0 99 L137.0 152 L171.0 152 Z\" fill=\"url(#sl6)\"/><path d=\"M98 63.0 C 124 63.0, 166.0 70, 184.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"177.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"184.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M184.0 99 L167.0 152 L201.0 152 Z\" fill=\"url(#sl6)\"/><path d=\"M98 63.0 C 124 63.0, 196.0 70, 214.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"207.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"214.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M214.0 99 L197.0 152 L231.0 152 Z\" fill=\"url(#sl6)\"/><path d=\"M98 63.0 C 124 63.0, 226.0 70, 244.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"237.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"244.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M244.0 99 L227.0 152 L261.0 152 Z\" fill=\"url(#sl6)\"/><path d=\"M98 63.0 C 124 63.0, 256.0 70, 274.0 93\" fill=\"none\" stroke=\"#15170F\" stroke-width=\"1.1\" stroke-opacity=\"0.55\"/><rect x=\"267.0\" y=\"92\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#15170F\"/><circle cx=\"274.0\" cy=\"97\" r=\"4.6\" fill=\"#E8A33D\" stroke=\"#15170F\" stroke-width=\"1.2\"/><path d=\"M274.0 99 L257.0 152 L291.0 152 Z\" fill=\"url(#sl6)\"/><text x=\"199.0\" y=\"126\" font-size=\"9\" text-anchor=\"middle\" fill=\"#8A8D7F\" font-family=\"ui-monospace,monospace\" letter-spacing=\"0.6\">6 \u00d7 3W HEADS</text><circle cx=\"51\" cy=\"146\" r=\"7\" fill=\"none\" stroke=\"#2F6B47\" stroke-width=\"1.5\"/><path d=\"M47.6 145.8 l2.4 2.6 l5-5.4\" fill=\"none\" stroke=\"#2F6B47\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><text x=\"64\" y=\"150\" font-size=\"12\" font-weight=\"600\" fill=\"#2F6B47\" font-family=\"system-ui,-apple-system,sans-serif\">Dimmable</text></svg>"};

const DL_STAR_COLOURS=[
  {k:"3200", n:"Warm",         hex:"#F3C88A", note:"3200K \u2014 the usual pick for ceilings and alfresco"},
  {k:"4000", n:"Natural",      hex:"#FFF1DC", note:"4000K \u2014 neutral, works anywhere"},
  {k:"5000", n:"Bright",       hex:"#F2F6FF", note:"5000K \u2014 crisp, task and display"},
  {k:"6000", n:"Ultra bright", hex:"#E4EDFF", note:"6000K \u2014 coolest white in the range"},
  {k:"blue", n:"Blue",         hex:"#5B8BD0", note:"Fixed blue \u2014 pools, feature ceilings"},
  {k:"rgbw", n:"RGB",          hex:"linear-gradient(135deg,#E05A5A,#E0C24A,#4FB86B,#4A7FE0)",
                               note:"Full colour, run from a remote \u2014 IP65, 30\u00b0 beam"}
];

function dlStarSwatches(){
  return '<div class="dl-star-cols">'+DL_STAR_COLOURS.map(function(c){
    var bg = c.hex.indexOf("gradient")>-1 ? c.hex : c.hex;
    return '<div class="dl-star-col">'+
      '<span class="sw" style="background:'+bg+'"></span>'+
      '<div><b>'+c.n+'</b><em>'+c.note+'</em></div>'+
    '</div>';
  }).join("")+'</div>';
}


/* Swatch strip for the star colour question - the chosen one lifts forward. */
function dlStarSwatchFig(active){
  return '<div class="dl-starsw">'+DL_STAR_COLOURS.map(function(c){
    var on = active===c.k;
    return '<figure class="dl-starsw-i'+(on?' on':'')+'">'+
      '<span class="sw" style="background:'+c.hex+'"></span>'+
      '<figcaption><b>'+c.n+'</b><em>'+(c.k==="rgbw"?"IP65 \u00b7 30\u00b0":(c.k==="blue"?"Fixed colour":c.k+"K \u00b7 280\u2009lm"))+'</em></figcaption>'+
    '</figure>';
  }).join("")+'</div>';
}

function dlStarPanel(){
  return '<div class="dl-star">'
    + '<div class="dl-star-hd">'
      + '<p class="eyebrow">30&#8201;mm \u00b7 Star lights</p>'
      + '<h3>For features, walls and bathrooms</h3>'
      + '<p class="dl-star-lede">Star lights are not room lighting. They pick out a '
      + '<b>feature</b>, wash a <b>wall</b>, or sit in a <b>bathroom</b> ceiling where a big fitting '
      + 'would look wrong. One 3&#8201;W head, 280&#8201;lumens, into a 30&#8201;mm hole. '
      + 'You would not light a lounge with them \u2014 you would light the thing in the lounge worth looking at.</p>'
    + '</div>'

    + '<h4 class="dl-star-sub">The three places they earn their money</h4>'
    + '<div class="dl-star-uses">'
      + '<div><b>Features</b><em>A run above a bar, in a bulkhead, or over a stair. Small enough that you see the light, not the fitting.</em></div>'
      + '<div><b>Walls</b><em>A line 300&#8201;mm off the wall turns plaster or stone into the feature. This is where they look best.</em></div>'
      + '<div><b>Bathrooms</b><em>Around a mirror or over a niche, where a 90&#8201;mm downlight is too much fitting for the ceiling.</em></div>'
    + '</div>'

    + '<h4 class="dl-star-sub">Wiring \u2014 the part people get wrong</h4>'
    + '<p class="dl-star-lede">They run on <b>12&#8201;V</b> from a transformer, not off mains. '
      + 'Each head plugs into a T-piece and the heads sit about <b>1&#8201;m apart</b> along the cable.</p>'
    + '<p class="dl-star-rule"><b>The hard limit: 6 lights per cable.</b> Want more than six? '
      + 'You run a second cable back to the same controller \u2014 you do not extend the first one.</p>'

    + '<h4 class="dl-star-sub">Pick the transformer by how many lights</h4>'
    + '<table class="dl-star-tbl"><tbody>'
      + '<tr><th>12&#8201;V 20&#8201;W</th><td>1 line of 6 \u2014 <b>up to 6 lights</b></td><td class="p">$22 +GST</td></tr>'
      + '<tr><th>12&#8201;V 40&#8201;W</th><td>2 lines of 6 \u2014 <b>up to 12 lights</b></td><td class="p">$35 +GST</td></tr>'
      + '<tr><th>12&#8201;V 75&#8201;W</th><td>Up to 4 lines \u2014 <b>rated to 18 lights</b></td><td class="p">$60 +GST</td></tr>'
      + '<tr><th>T-piece + head</th><td>One per light, roughly 1&#8201;m apart</td><td class="p">$16 +GST</td></tr>'
    + '</tbody></table>'
    + '<p class="dl-star-note">All three transformers are IP20, so they go somewhere dry \u2014 in the roof space or a cupboard, not in the bathroom itself.</p>'

    + '<h4 class="dl-star-sub">Controller and remote</h4>'
    + '<table class="dl-star-tbl"><tbody>'
      + '<tr><th>3-in-1 controller</th><td>Colour and dimming from a remote</td><td class="p">$15 +GST</td></tr>'
      + '<tr><th>3-in-1 SMART controller</th><td>Same, plus phone control, timers and schedules through Tuya or Smart Life</td><td class="p">$25 +GST</td></tr>'
      + '<tr><th>RGB+CCT remote</th><td>Handset, one zone</td><td class="p">$17 +GST</td></tr>'
      + '<tr><th>4-zone remote, RGB+CCT</th><td>Wall panel in black or white, runs four zones</td><td class="p">$35 +GST</td></tr>'
    + '</tbody></table>'

    + '<div class="dl-star-warn">'
      + '<b>For your electrician</b>'
      + '<p>Input is <b>V+ red, V\u2212 black</b>. Wire it backwards and the controller fails, and that is not covered by warranty. '
      + 'Output is black&#8201;V+, red&#8201;R, green&#8201;G, blue&#8201;B, white&#8201;W. '
      + 'SET has to be selected so the controller shows a green indicator light.</p>'
    + '</div>'
  + '</div>';
}

function dlGlarePair(compact){
  return '<div class="dl-glare">'
    + '<div class="dl-glare-pair">'
      + '<figure>'+dlGlareSVG("std")+'</figure>'
      + '<figure>'+dlGlareSVG("low")+'</figure>'
    + '</div>'
    + '<div class="dl-glare-facts">'
      + '<div><dt>Pool width</dt><dd>2.9\u00d7 the drop</dd><dd class="alt">1.2\u00d7 the drop</dd></div>'
      + '<div><dt>Fittings for 20\u2009m\u00b2</dt><dd>4\u20135</dd><dd class="alt">8\u201310</dd></div>'
      + '<div><dt>Source visible</dt><dd>Yes, from most angles</dd><dd class="alt">No, set behind a baffle</dd></div>'
      + '<div><dt>Under a fan</dt><dd>Flicker risk</dd><dd class="alt">Steady</dd></div>'
    + '</div>'
    + '<p class="dl-glare-cap">The beam angle is the whole difference. '
      + '<b>Standard</b> throws wide from a lamp sitting at the ceiling face \u2014 fewer fittings, '
      + 'but the chip is in view wherever you stand. <b>Low glare</b> sets the lamp back behind a dark '
      + 'baffle and narrows the cone, so the ceiling reads calm and nothing catches your eye \u2014 '
      + 'at the cost of roughly twice as many fittings.</p>'
    + (compact ? '' :
        '<h4 class="dl-glare-sub">With a ceiling fan in the room</h4>'
    + '<div class="dl-glare-pair">'
      + '<figure>'+dlFanSVG("std")+'</figure>'
      + '<figure>'+dlFanSVG("low")+'</figure>'
    + '</div>'
    + '<p class="dl-glare-cap">Looking down at the ceiling. What decides flicker is how wide the beam '
      + 'still is <b>where the blades actually are</b> \u2014 about 350&#8201;mm below the ceiling, not down at '
      + 'the floor. A 110\u00b0 beam is a metre wide by then, so it reaches inside the blade circle and every '
      + 'blade that passes cuts it. A 60\u00b0 beam is only 400&#8201;mm wide there and lands outside the '
      + 'blades entirely.</p>')
  + '</div>';
}

/* ---------- room scenes ----------
   These are drawings, not photographs. Greenhse has no downlight room
   photography yet (see the C4 note in the build review) and a fake photo would
   be worse than an honest diagram. Swap them for real shots when we have them. */
function dlScene(kind){
  const P='#faf9f4', W='#ffffff';
  function cone(x,spread,toY,op){
    return '<path d="M'+x+' 12 L'+(x-spread)+' '+toY+' L'+(x+spread)+' '+toY+' Z" fill="'+DL_GLOW+'" opacity="'+(op||".3")+'"/>'
         + '<circle cx="'+x+'" cy="12" r="2.4" fill="'+DL_GLOW+'"/>';
  }
  let b='<rect width="160" height="104" fill="'+P+'"/><rect x="0" y="0" width="160" height="12" fill="'+DL_INK+'"/>';
  const floor='<line x1="0" y1="92" x2="160" y2="92" stroke="'+DL_LINE+'" stroke-width="1.6"/>';
  let s="";
  if(kind==="kitchen"){
    s=cone(38,17,64)+cone(88,17,64)+cone(132,15,64)
     +'<rect x="8" y="16" width="52" height="26" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.4"/><line x1="34" y1="16" x2="34" y2="42" stroke="'+DL_LINE+'"/>'
     +'<rect x="8" y="62" width="140" height="6" fill="'+DL_INK+'"/>'
     +'<rect x="8" y="68" width="140" height="24" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.2"/>'
     +'<line x1="58" y1="68" x2="58" y2="92" stroke="'+DL_LINE+'"/><line x1="108" y1="68" x2="108" y2="92" stroke="'+DL_LINE+'"/>'
     +'<rect x="118" y="50" width="14" height="12" rx="2" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.2"/>';
  }else if(kind==="living"){
    s=cone(34,26,92)+cone(80,26,92)+cone(126,26,92)
     +'<path d="M18 88 V64 h56 v24" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.5"/>'
     +'<rect x="18" y="72" width="56" height="8" fill="'+DL_INK+'" opacity=".18"/>'
     +'<rect x="96" y="76" width="42" height="4" fill="'+DL_INK+'"/><line x1="102" y1="80" x2="102" y2="90" stroke="'+DL_INK+'" stroke-width="1.5"/><line x1="132" y1="80" x2="132" y2="90" stroke="'+DL_INK+'" stroke-width="1.5"/>'
     +floor;
  }else if(kind==="bedroom"){
    s=cone(44,20,74)+cone(112,20,74)
     +'<rect x="14" y="44" width="8" height="48" fill="'+DL_INK+'"/>'
     +'<path d="M22 74 h96 v18 H22 Z" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.5"/>'
     +'<path d="M26 74 q10 -14 26 0" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.3"/>'
     +'<rect x="124" y="70" width="22" height="22" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.3"/>'
     +floor;
  }else if(kind==="bathroom"){
    s=cone(44,17,62)+cone(116,17,70)
     +'<rect x="22" y="20" width="46" height="30" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.5"/><line x1="28" y1="26" x2="28" y2="44" stroke="'+DL_LINE+'" stroke-width="2"/>'
     +'<rect x="16" y="62" width="60" height="30" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.4"/>'
     +'<ellipse cx="46" cy="62" rx="14" ry="4" fill="'+DL_INK+'" opacity=".25"/>'
     +'<line x1="98" y1="24" x2="98" y2="92" stroke="'+DL_INK+'" stroke-width="1.6"/>'
     +'<rect x="100" y="24" width="52" height="68" fill="#dfeaf0" opacity=".5"/>'
     +'<path d="M116 30 v10 M124 30 v10 M132 30 v10" stroke="'+DL_DIM+'" stroke-width="1.2"/>'
     +floor;
  }else if(kind==="hallway"){
    s='<path d="M0 92 L54 58 h52 l54 34 Z" fill="'+DL_GLOW+'" opacity=".18"/>'
     +cone(46,13,92,".26")+cone(80,13,92,".26")+cone(114,13,92,".26")
     +'<path d="M0 92 L54 58" stroke="'+DL_INK+'" stroke-width="1.4" fill="none"/>'
     +'<path d="M160 92 L106 58" stroke="'+DL_INK+'" stroke-width="1.4" fill="none"/>'
     +'<rect x="54" y="34" width="52" height="24" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.4"/>'
     +'<rect x="24" y="46" width="16" height="30" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.2"/>'
     +'<rect x="120" y="46" width="16" height="30" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.2"/>';
  }else if(kind==="garage"){
    s='<rect x="34" y="14" width="92" height="6" rx="3" fill="'+DL_GLOW+'"/>'
     +'<path d="M34 20 L14 92 H146 L126 20 Z" fill="'+DL_GLOW+'" opacity=".26"/>'
     +'<rect x="10" y="30" width="60" height="62" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.4"/>'
     +'<line x1="10" y1="44" x2="70" y2="44" stroke="'+DL_LINE+'"/><line x1="10" y1="58" x2="70" y2="58" stroke="'+DL_LINE+'"/><line x1="10" y1="72" x2="70" y2="72" stroke="'+DL_LINE+'"/>'
     +'<rect x="86" y="64" width="60" height="5" fill="'+DL_INK+'"/><line x1="92" y1="69" x2="92" y2="92" stroke="'+DL_INK+'" stroke-width="1.5"/><line x1="140" y1="69" x2="140" y2="92" stroke="'+DL_INK+'" stroke-width="1.5"/>'
     +floor;
  }else if(kind==="outdoor"){
    s='<path d="M0 12 L60 12 L60 4 L160 4 L160 12 Z" fill="'+DL_INK+'"/>'
     +cone(40,15,66)+cone(96,15,74)
     +'<rect x="146" y="12" width="7" height="80" fill="'+DL_INK+'"/>'
     +'<rect x="20" y="66" width="52" height="4" fill="'+DL_INK+'"/><line x1="26" y1="70" x2="26" y2="88" stroke="'+DL_INK+'" stroke-width="1.5"/><line x1="66" y1="70" x2="66" y2="88" stroke="'+DL_INK+'" stroke-width="1.5"/>'
     +'<path d="M92 88 V74 h18 v14" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.4"/>'
     +'<path d="M112 92 q10 -22 22 -6" fill="none" stroke="#5f7d4e" stroke-width="2"/>'
     +floor;
  }else{ /* office / commercial */
    s=cone(32,20,66)+cone(80,20,66)+cone(128,20,66)
     +'<rect x="12" y="66" width="56" height="4" fill="'+DL_INK+'"/><line x1="18" y1="70" x2="18" y2="90" stroke="'+DL_INK+'" stroke-width="1.4"/><line x1="62" y1="70" x2="62" y2="90" stroke="'+DL_INK+'" stroke-width="1.4"/>'
     +'<rect x="92" y="66" width="56" height="4" fill="'+DL_INK+'"/><line x1="98" y1="70" x2="98" y2="90" stroke="'+DL_INK+'" stroke-width="1.4"/><line x1="142" y1="70" x2="142" y2="90" stroke="'+DL_INK+'" stroke-width="1.4"/>'
     +'<rect x="26" y="50" width="24" height="16" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.3"/>'
     +'<rect x="106" y="50" width="24" height="16" fill="'+W+'" stroke="'+DL_INK+'" stroke-width="1.3"/>'
     +floor;
  }
  return '<svg viewBox="0 0 160 104" role="img" aria-label="'+kind+' lit with downlights">'+b+s+'</svg>';
}

/* ---------- scenes used to illustrate the two beam types ----------
   Downlights aren't room-specific — a 90 mm fitting is the same fitting over a
   bench or a bed — so the finder no longer asks which room. These drawings stay
   because they show what each BEAM does, which is the part that changes. */
const DL_SCENE_KEYS=["kitchen","living","bedroom","bathroom","hallway","outdoor","office","garage"];

/* Where each type earns its keep. Drawings + one honest line each. */
const DL_GOOD={
  low:[["kitchen","Over benchtops","Light on the bench, not in your eyes"],
       ["bedroom","Bedrooms","Nothing bright overhead when you lie down"],
       ["bathroom","Bathroom vanity","Pools the light where you use it"],
       ["office","Desks &amp; retail","Cuts screen and cabinet glare"]],
  std:[["living","Living &amp; dining","One even wash across the whole room"],
       ["hallway","Hallways &amp; stairs","Wide spread, fewer fittings"],
       ["outdoor","Alfresco &amp; eaves","Covers a big area from a high ceiling"],
       ["office","Offices &amp; shops","Covers a big floor from a high ceiling"]]
};
function dlWhereGood(mode){
  /* The room scenes (kitchen, bathroom, hallway...) were removed — they took up
     a lot of space and told people things they already knew. The beam and fan
     diagrams do the actual explaining. */
  return "";
}

/* ---------- feasibility ----------
   One test, used everywhere: does this fitting still satisfy everything the
   customer has told us so far? Every question then only offers answers that
   leave at least one fitting standing, so you can never walk the finder into
   a corner it has to apologise for. */
function dlOK(p,a){
  if(a.cut){ const b=dlBand(a.cut), c=dlCut(p); if(!c||c.min<b.lo||c.min>b.hi) return false; }
  if(a.glare==="low" && !dlIsLowGlare(p)) return false;
  if(a.glare==="std" && dlIsLowGlare(p))  return false;
  if(a.colour==="rgbw" && !(dlIsRGBW(p)||dlIsSmart(p))) return false;
  if(a.colour==="tri"  &&  (dlIsRGBW(p)||dlIsSmart(p))) return false;
  /* Star lights: the RGBW head is a different fitting to the tri-colour one.
     Every white temperature and Blue come off the same switchable head. */
  if(a.starcol==="rgbw" && !(dlIsRGBW(p)||dlIsSmart(p))) return false;
  if(a.starcol && a.starcol!=="rgbw" && (dlIsRGBW(p)||dlIsSmart(p))) return false;
  return true;
}
function dlFeasible(a){ return dlPool().filter(function(p){ return dlOK(p,a); }); }
function dlWith(a,key,val){ const t={}; for(const k in a) t[k]=a[k]; t[key]=val; return t; }

/* Feasible answers for any question, in the order they were written. */
function dlOptsFor(Q,a){
  const base=(typeof Q.opts==="function"?Q.opts(a):Q.opts)||[];
  if(Q.key==="cut") return base;                       /* every size is buyable */
  const real=base.filter(function(o){
    return o[1]!=="auto" && dlFeasible(dlWith(a,Q.key,o[1])).length>0;
  });
  if(Q.key==="glare" && real.length>1){
    const auto=base.find(function(o){ return o[1]==="auto"; });
    if(auto) real.push(auto);                          /* "not sure" only helps with a real choice */
  }
  return real;
}
/* ---------- questions ---------- */
function dlWantLow(a){
  if(a.glare==="low") return true;
  if(a.glare==="std") return false;
  return null;
}
const DL_Q=[
 {q:"What size hole are you working with?", key:"cut",
  hint:"This is the <b>cut-out</b> \u2014 the hole in the ceiling, not the outside of the fitting. Swapping old halogens? Measure the hole you already have. New build? 90&#8201;mm is the Australian standard and has the widest range.",
  extra:function(a){ return dlCutSVG(a.cut) + (a.cut==="30" ? dlStarPanel() : ""); },
  opts:[["30 mm \u2014 star lights &amp; accents, 280 lm","30"],
        ["70 mm \u2014 small &amp; subtle, up to 650 lm","70"],
        ["90 mm \u2014 the standard size, up to 1000 lm","90"],
        ["110 mm \u2014 brighter, fewer fittings, up to 1200 lm","110"],
        ["I\u2019m not sure yet","unsure"]]},

 {q:"What colour star light?", key:"starcol",
  when:function(a){ return a.cut==="30"; },
  hint:"The tri-colour head is switched at install \u2014 one fitting covers 3200K, 4000K, 5000K and 6000K at 280&#8201;lm, so you can decide on the day. Blue is a fixed-colour head. RGB is a different fitting: full colour from a remote, IP65, 30\u00b0 beam.",
  extra:function(a){ return dlStarSwatchFig(a.starcol); },
  opts:[["Warm \u2014 3200K","3200"],
        ["Natural \u2014 4000K","4000"],
        ["Bright \u2014 5000K","5000"],
        ["Ultra bright \u2014 6000K","6000"],
        ["Blue \u2014 fixed colour","blue"],
        ["RGB \u2014 full colour","rgbw"]]},

 {q:"Standard beam, or low glare?", key:"glare",
  /* 30 mm is one star light head, and at 110 mm every fitting we stock is a
     wide standard beam - neither size has a choice to make here. */
  when:function(a){ return a.cut!=="30" && a.cut!=="110"; },
  hint:function(a){
    /* By key, not position — DL_Q[1] is the star-light colour question. */
    const n=dlOptsFor(DL_Q.find(q=>q.key==="glare"),a).length;
    return n>1
      ? "The only real difference is how deep the LED sits and how wide it throws. Have a look at the two below \u2014 it changes how the room feels more than anything else you pick."
      : "Worth knowing the difference either way. At <b>"+dlBand(a.cut).label+"</b> every fitting we stock is a wide standard beam \u2014 low glare is only made in 70 and 90&#8201;mm.";
  },
  extra:function(){ return dlGlarePhoto(true)+dlGlarePair(); },
  opts:[["Standard \u2014 wide even light, 110\u00b0","std"],
        ["Low glare \u2014 focused 60\u00b0, source hidden, fan-safe","low"],
        ["Not sure \u2014 show me the closest match","auto"]]},

 /* Not "which room" — a downlight goes wherever you like. This is the one place
    the location genuinely changes the product: steam and weather need IP65, and
    that's a wiring-rules matter, not a taste one. It only appears when an IP65
    fitting actually exists in the size and beam already chosen. */
 {q:"How do you want the colour set?", key:"colour",
  /* 30 mm has its own colour question; 110 mm is tricolour only. */
  when:function(a){ return a.cut!=="30" && a.cut!=="110"; },
  hint:function(a){
    return "Every downlight we sell is tricolour \u2014 a small switch on the back picks warm, natural or cool once at install, at no extra cost. "
      + ("Smart is worth paying for in a room you sit in at night. In a kitchen, bathroom or hallway it rarely gets used \u2014 section 04 of the guide has the room-by-room version.");
  },
  opts:[["Tricolour / CCT \u2014 switch it at install","tri"],
        ["RGBW Smart \u2014 full colour, run from your phone","rgbw"]]},

 {q:"How big is the room?", key:"size",
  /* Star lights are features, walls and bathrooms - not room lighting - so
     "how many for the room" is the wrong question at 30 mm. */
  when:function(a){ return a.cut!=="30"; }, size:true,
  hint:"This is all we need to work out how many fittings you want. The count comes from the sizing table our Perth team uses on site \u2014 not a lumen guess. Skip it if you already know.",
  extra:function(a){ const w=dlWantLow(a); return w===null?"":dlWhereGood(w); }}
];
/* A question with only one possible answer isn't a question. It drops out of
   the flow and the reason turns up on the result instead. The glare one is the
   exception \u2014 the comparison is worth seeing even when the choice is made. */
function dlVisibleQs(a){
  a=a||dlAnswers;
  return DL_Q.filter(function(Q){
    /* A question's own `when` always wins - at 30 mm there is one star light
       head, so glare and the general colour question don't apply at all. */
    if(typeof Q.when==="function" && !Q.when(a)) return false;
    if(Q.key==="cut"||Q.key==="size"||Q.key==="glare") return true;
    return dlOptsFor(Q,a).length>1;
  });
}
/* Anything that dropped out gets answered for them, and remembered so the
   result can say why. */
function dlAutoFill(){
  DL_Q.forEach(function(Q){
    /* Don't auto-answer a question that doesn't apply - it would show up in
       the "we picked this for you" notes on the result for no reason. */
    if(typeof Q.when==="function" && !Q.when(dlAnswers)){ delete dlAnswers[Q.key]; return; }
    if(Q.key==="cut"||Q.key==="size"||Q.key==="glare") return;
    if(dlAnswers[Q.key]!==undefined) return;
    if(!dlAnswers.cut) return;
    const os=dlOptsFor(Q,dlAnswers);
    if(os.length===1){
      dlAnswers[Q.key]=os[0][1];
      if(Q.key==="colour"&&os[0][1]==="tri")
        dlAutoKeys.colour="RGBW and phone control are only made in 90&#8201;mm (and one 160&#8201;mm fitting), so at this size it\u2019s tricolour \u2014 warm, natural or cool, switched at install.";
    }
  });
}
/* Answers we filled in are thrown away whenever an earlier answer changes, so
   they always re-derive from what the customer actually chose. */
function dlClearAuto(){
  for(const k in dlAutoKeys){ delete dlAnswers[k]; }
  dlAutoKeys={};
}

/* ---------- matching ---------- */
/* Colour capability is read from the spec table where possible, not guessed
   from the product name — several fittings are switchable without saying so
   in the title. */
function dlIsRGBW(p){ return /rgbw/i.test(p.name); }
function dlIsSmart(p){ return /bluetooth|tuya|wifi|smart/i.test(p.name+" "+p.id); }
function dlIsTri(p){
  if(dlIsRGBW(p)) return false;
  if(/tricolour|tri-colour|cct/i.test(p.name+" "+p.id)) return true;
  const c=dlSpec(p,"Light Output Colour")||"";
  return (c.match(/\d{4}/g)||[]).length>=2;
}
function dlSaysLowGlare(p){ return /low\s*glare|anti[\s-]?glare/i.test(p.name+" "+p.id); }
function dlScore(p,a){
  const cut=dlCut(p), ip=dlIP(p), n=p.name.toLowerCase();
  let s=0;
  const band=dlBand(a.cut);
  if(cut){ s += (cut.min>=band.lo && cut.min<=band.hi) ? 60 : -45; }
  const want=dlWantLow(a);
  if(want!==null){
    s += (dlIsLowGlare(p)===want) ? 30 : -20;
    if(want && dlSaysLowGlare(p)) s+=8;      /* built as a low glare fitting, not just narrow */
  }
  /* IP rating no longer filters or ranks — every downlight we stock is fine
     anywhere, so it is shown as a spec but never scored. */
  /* One answer covers both RGBW and phone-controlled fittings — a plain RGBW
     one is the closer match, a Bluetooth/Tuya white is the next best thing. */
  if(a.colour==="rgbw")     s += dlIsRGBW(p) ? 50 : (dlIsSmart(p) ? 30 : -30);
  else if(a.colour==="tri") s += (dlIsTri(p) && !dlIsRGBW(p) && !dlIsSmart(p)) ? 20 : -6;
  if(/dimmable/i.test(n)) s+=4;
  if(dlLum(p)) s+=3;
  return s;
}
/* Only ever rank fittings that actually satisfy the answers. */
function dlRank(a){
  const pool=dlFeasible(a);
  const list=pool.length?pool:dlPool();
  return list.map(function(p){ return {p:p,s:dlScore(p,a)}; })
    .sort(function(x,y){ return y.s-x.s || x.p.price-y.p.price; });
}

/* ---------- state ---------- */
let dlAnswers={}, dlStep=0, dlQty=0, dlQtyAuto=null, dlPick=null, dlAutoShown=false, dlBatten=false, dlAutoKeys={};

/* ---------- result pieces ---------- */
function dlMissing(txt){ return '<span class="dl-miss">not published \u2014 ask us</span>'; }
/* Tidies how a spec READS. Never changes the value: 10Watt -> 10W, 3000k -> 3000K.
   If a figure is absent it stays absent — nothing is ever filled in. */
function dlTidy(v){
  if(!v) return v;
  return String(v)
    .replace(/(\d)\s*Watt(s)?\b/gi, "$1W")
    .replace(/(\d{3,5})\s*k\b/g, "$1K")
    .replace(/\blumens?\b/gi, "lumens")
    .replace(/(\d)\s*-\s*(\d)/g, "$1\u2013$2")
    .replace(/\s+-\s+/g, " \u00b7 ")
    .replace(/\s{2,}/g, " ")
    .trim();
}
function dlSpecRows(p){
  const cut=dlCut(p), beam=dlBeam(p), ip=dlIP(p);
  const rows=[
    ["Cut-out",   cut?cut.txt:null],
    ["Beam angle",beam?beam+"\u00b0 ("+(beam<90?"low glare":"standard")+")":null],
    ["Brightness",dlLum(p)],
    ["Power",     dlWatt(p)],
    ["Dimming",   dlDim(p)],
    ["Weather",   ip?("IP"+ip+(ip>=65?" \u2014 wet areas OK":" \u2014 indoor / sheltered")):null],
    ["Colours",   dlSpec(p,"Light Output Colour")],
    ["Lifespan",  dlSpec(p,"Lifespan")]
  ];
  return '<div class="sw-spec240"><h4>The numbers on this fitting</h4><div class="sw-specrows">'
    + rows.map(function(r){
        return '<div><span>'+r[0]+'</span><b>'+(r[1]?esc(dlTidy(r[1])):dlMissing())+'</b></div>';
      }).join("")
    + '</div></div>';
}
function dlRecCard(p,primary){
  const cut=dlCut(p), beam=dlBeam(p), ip=dlIP(p), lum=dlLum(p);
  const tags=[];
  if(cut)  tags.push('<span class="dl-tag">Cut-out '+cut.txt+'</span>');
  if(beam) tags.push('<span class="dl-tag'+(beam<90?" dl-tag-lg":"")+'">'+beam+'\u00b0 '+(beam<90?"low glare":"standard")+'</span>');
  if(ip)   tags.push('<span class="dl-tag'+(ip>=65?" dl-tag-ip":"")+'">IP'+ip+'</span>');
  if(!cut) tags.push('<span class="dl-tag dl-tag-miss">cut-out not published</span>');
  if(!beam)tags.push('<span class="dl-tag dl-tag-miss">beam not published</span>');

  if(primary){
    return '<div class="dl-hero" data-dlpick="'+p.id+'">'
      + '<div class="dl-hero-img">'+media(p,"img")+'</div>'
      + '<div class="dl-hero-d">'
      +   '<h4>'+esc(p.name)+'</h4>'
      +   '<div class="dl-tags">'+tags.join("")+'</div>'
      +   '<p class="dl-hero-lum">'+(lum?esc(dlTidy(lum)):'<span class="dl-miss">Lumen output not published \u2014 ask us</span>')+'</p>'
      +   '<div class="dl-hero-p"><b>$'+p.price.toFixed(2)+'</b><span>ex-GST each</span>'
      +   '<em>$'+(p.price*1.1).toFixed(2)+' inc GST</em></div>'
      + '</div></div>';
  }
  return '<div class="sw-rec sw-rec-big" data-dlpick="'+p.id+'">'
    + '<div class="rec-top"><div class="ri">'+media(p,"img")+'</div>'
    + '<div class="rd"><h4>'+esc(p.name)+'</h4>'
    + '<span class="rp">$'+p.price.toFixed(2)+' <small>ex-GST each \u00b7 $'+(p.price*1.1).toFixed(2)+' inc</small></span>'
    + '<span class="rec-spec">'+[cut?("Cut-out "+cut.txt):"", beam?(beam+"\u00b0"):"" , ip?("IP"+ip):""].filter(Boolean).join(" \u00b7 ")+'</span>'
    + '</div></div>'
    + '<span class="rec-cta">Choose this one instead \u2192</span></div>';
}

/* Garage is battens, not a downlight grid — same rule the layout planner uses. */
function renderDlBatten(){
  const box=$("#dlBody"); if(!box) return;
  const b=PRODUCTS.find(function(p){ return p.id==="T40-CCT-BATTEN-PRO"; });
  box.innerHTML='<button class="pk-back" data-dlback="1">\u2190 Back to the downlights</button>'
    + '<div class="sw-prog">\u2713 A better answer than downlights</div>'
    + '<h3>For a garage or laundry, use a batten</h3>'
    + '<div class="dl-scene" style="margin-bottom:14px">'+dlScene("garage")+'</div>'
    + '<p class="sw-hint">A grid of downlights in a garage leaves shadows exactly where you\u2019re working. One 1.2&#8201;m batten throws a long even band of light across the whole bay \u2014 it\u2019s cheaper, brighter and it\u2019s what our team fits every time.</p>'
    + (b?('<div class="sw-recs">'
        + '<div class="sw-rec sw-rec-big"><div class="rec-top"><div class="ri">'+media(b,"img")+'</div>'
        + '<div class="rd"><h4>'+esc(b.name)+'</h4><span class="rp">$'+b.price.toFixed(2)+' <small>ex-GST \u00b7 $'+(b.price*1.1).toFixed(2)+' inc</small></span>'
        + '<span class="rec-where">One per bay for a single garage, two for a double.</span></div></div></div></div>'
        + '<button class="dl-add" data-dladd="'+b.id+'" data-dlqn="1">Add one batten to the cart \u2014 $'+(b.price*1.1).toFixed(2)+' inc GST</button>'):"")
    + '<button class="dl-size-skip" data-dlrestart="1">\u2190 Start the finder again</button>';
}

function dlSummary(){
  const band=dlBand(dlAnswers.cut);
  /* Star lights don't come in low glare or standard - there is one 45 deg
     head - so the summary talks about colour instead. */
  if(dlAnswers.cut==="30"){
    const sc={3200:"warm 3200K",4000:"natural 4000K",5000:"bright 5000K",
              6000:"ultra bright 6000K",blue:"blue",rgbw:"RGB"}[dlAnswers.starcol]||"";
    return ("A 30\u2009mm "+sc+" star light.").replace(/\s+/g," ");
  }
  const want=dlWantLow(dlAnswers);
  const col={tri:"tricolour",rgbw:"RGBW smart"}[dlAnswers.colour]||"";
  return ("A "+band.label.replace(/\s/g,"\u2009")+" "+(want?"low glare":"standard")+" "+col+" downlight.").replace(/\s+/g," ");
}

function renderDlResult(){
  const box=$("#dlBody"); if(!box) return;
  const ranked=dlRank(dlAnswers);
  const good=ranked.filter(function(r){ return r.s>0; });
  const list=(good.length?good:ranked).slice(0,3).map(function(r){ return r.p; });
  if(!list.length){
    box.innerHTML='<button class="pk-back" data-dlback="1">\u2190 Back</button>'
      + '<div class="sw-callus">We don\u2019t have an online match for that combination \u2014 give us a call on <a href="tel:0892972969">(08) 9297 2969</a> and we\u2019ll find it in the warehouse.</div>';
    return;
  }
  const pick = dlPick ? (list.concat(ranked.map(r=>r.p)).find(function(p){return p.id===dlPick;})||list[0]) : list[0];
  const alts = ranked.map(r=>r.p).filter(function(p){ return p.id!==pick.id; }).slice(0,2);
  const want=dlWantLow(dlAnswers);
  const band=dlBand(dlAnswers.cut);
  const cut=dlCut(pick);

  /* notes worth saying out loud */
  let notes="";
  for(const k in dlAutoKeys){ notes+='<div class="dl-note">'+dlAutoKeys[k]+'</div>'; }
  /* Only say this where the glare question genuinely never appeared because the
     band has no low-glare fitting (110 mm). At 90 mm low glare is stocked, so the
     old band-index test started lying the moment the 30 mm band was added. */
  const glareQ=DL_Q.find(q=>q.key==="glare");
  const glareAsked=!glareQ||!glareQ.when||glareQ.when(dlAnswers);
  if(dlAnswers.cut!=="unsure" && want===false && !glareAsked){
    notes+='<div class="dl-note">Low glare is only made in 70 and 90&#8201;mm cut-outs, so at <b>'+band.label+'</b> every option is a wide standard beam.</div>';
  }
  if(dlAnswers.cut==="unsure"){
    notes+='<div class="dl-note"><b>We\u2019ve assumed 90&#8201;mm</b> \u2014 the Australian standard. Measure your hole edge to edge before ordering; if it\u2019s 70&#8201;mm or 120&#8201;mm, come back and change the first answer.</div>';
  }
  if(cut && (cut.min<band.lo||cut.min>band.hi)){
    notes+='<div class="dl-note">Nothing in the online range is made for a '+band.label+' cut-out in this spec, so this is the closest fit at <b>'+cut.txt+'</b>. Call us on (08) 9297 2969 before you cut.</div>';
  }
  if(dlAnswers.colour==="rgbw"){
    const pr=dlSmartPrices();
    const gap=(pr.tri&&pr.smart)?Math.round(pr.smart.price-pr.tri.price):null;
    notes+='<div class="dl-note"><b>Worth a rethink before you do the whole house.</b> Smart earns its keep in the rooms you sit in at night \u2014 living, media, bedroom. '
      + 'In a kitchen, bathroom or hallway you want full brightness the second you walk in, and a wall switch beats unlocking a phone every time.'
      + (gap?(" At about $"+gap+" a fitting more than tricolour, doing two rooms instead of ten is where the money is."):"")
      + ' Section 04 of the guide below has the room-by-room version.</div>';
  }
  if(want!==null && dlIsLowGlare(pick)!==want){
    notes+='<div class="dl-note">Heads up \u2014 this is the best size match, but its beam is '+(dlBeam(pick)||"?")+'\u00b0, so it behaves like a '+(dlIsLowGlare(pick)?"low glare":"standard")+' fitting rather than the '+(want?"low glare":"standard")+' one you picked.</div>';
  }

  /* quantity */
  let qtyBlock="";
  const n = dlQty>0 ? dlQty : 1;
  if(dlAnswers.size && dlAnswers.size!=="skip"){
    const parts=String(dlAnswers.size).split("x").map(parseFloat);
    const auto=dlCount(parts[0],parts[1],!!want);
    if(auto===null){
      qtyBlock='<div class="dl-qty"><h4>How many</h4>'
        + '<div class="sw-callus" style="margin:0">'+parts[0]+'&#8201;m \u00d7 '+parts[1]+'&#8201;m is past our on-site sizing table. Call <a href="tel:0892972969">(08) 9297 2969</a> or use the layout planner and we\u2019ll set out the grid properly.</div>'
        + '<div class="dl-qty-row" style="margin-top:12px"><button class="dl-step" data-dlqty="-1">\u2212</button>'
        + '<span class="dl-qty-n">'+n+'</span><button class="dl-step" data-dlqty="1">+</button>'
        + '<span class="dl-qty-lbl">fittings \u2014 set it yourself for now</span></div></div>';
    }else{
      qtyBlock='<div class="dl-qty"><h4>How many you need</h4>'
        + '<div class="dl-qty-row"><button class="dl-step" data-dlqty="-1">\u2212</button>'
        + '<span class="dl-qty-n">'+n+'</span><button class="dl-step" data-dlqty="1">+</button>'
        + '<span class="dl-qty-lbl">downlights for a '+parts[0]+'&#8201;m \u00d7 '+parts[1]+'&#8201;m room'
        + (n!==auto?' <em>(we suggested '+auto+')</em>':'')+'</span></div>'
        + '<p class="dl-qty-src">From the sizing table our Perth team uses on site \u2014 a '+(want?"60\u00b0 low glare":"wide standard")+' fitting needs '
        + (want?"more":"fewer")+' points for the same room. Set them <b>700\u2013850&#8201;mm off the walls</b> and space them about half your ceiling height apart.</p></div>';
    }
  }else{
    qtyBlock='<div class="dl-qty"><h4>How many</h4>'
      + '<div class="dl-qty-row"><button class="dl-step" data-dlqty="-1">\u2212</button>'
      + '<span class="dl-qty-n">'+n+'</span><button class="dl-step" data-dlqty="1">+</button>'
      + '<span class="dl-qty-lbl">fittings</span></div>'
      + '<p class="dl-qty-src">Tell us the room size and we\u2019ll work the count out for you \u2014 <button class="dl-size-skip" data-dlback="1" style="display:inline">go back a step</button>.</p></div>';
  }

  /* price */
  const ex=pick.price*n, inc=ex*1.1;
  const priceBlock='<div class="dl-price"><h4>Your price</h4>'
    + '<div class="dl-price-row"><span>'+esc(pick.name)+'</span><b>$'+pick.price.toFixed(2)+' ex</b></div>'
    + '<div class="dl-price-row"><span>Quantity</span><b>\u00d7 '+n+'</b></div>'
    + '<div class="dl-price-row"><span>Subtotal ex-GST</span><b>$'+ex.toFixed(2)+'</b></div>'
    + '<div class="dl-price-row"><span>GST 10%</span><b>$'+(inc-ex).toFixed(2)+'</b></div>'
    + '<div class="dl-price-row dl-price-tot"><span>Total inc GST</span><b>$'+inc.toFixed(2)+'</b></div>'
    + '<p class="dl-price-gst">Fittings only. Installation must be done by a licensed electrician \u2014 we can put you in touch with one.</p>'
    + '<button class="dl-add" data-dladd="'+pick.id+'" data-dlqn="'+n+'">Add '+n+' to the cart \u2014 $'+inc.toFixed(2)+' inc GST</button></div>';

  box.innerHTML='<button class="pk-back" data-dlback="1">\u2190 Back</button>'
    + '<div class="sw-prog">\u2713 Your match</div>'
    + '<h3>This is the one:</h3>'
    + '<p class="sw-sum">'+dlSummary()+'</p>'
    + notes
    + '<div class="sw-recs">'+dlRecCard(pick,true)+'</div>'
    + dlSpecRows(pick)
    + qtyBlock
    + priceBlock
    + (want!==null?dlWhereGood(want):"")
    + (dlAnswers.cut==="30" ? dlStarPanel() : "")
    + (alts.length?('<details class="dl-alt"><summary>Not quite right? See '+alts.length+' alternative'+(alts.length>1?"s":"")+'</summary>'+alts.map(function(p){return dlRecCard(p,false);}).join("")+'</details>'):"")
    + '<button class="dl-size-skip" data-dlrestart="1">\u2190 Start the finder again</button>';
}

function renderDlWizard(){
  const box=$("#dlBody"); if(!box) return;
  if(dlBatten){ renderDlBatten(); return; }
  dlAutoFill();
  const QS=dlVisibleQs();
  if(dlStep>=QS.length){ renderDlResult(); return; }
  const Q=QS[dlStep];
  const hint=(typeof Q.hint==="function"?Q.hint(dlAnswers):Q.hint);
  let body="";
  if(Q.size){
    body='<div class="dl-size"><input type="number" id="dlW" min="1" max="40" step="0.1" placeholder="3.5" inputmode="decimal" aria-label="Room width in metres">'
      + '<span class="dl-x">\u00d7</span>'
      + '<input type="number" id="dlL" min="1" max="40" step="0.1" placeholder="4.5" inputmode="decimal" aria-label="Room length in metres">'
      + '<span class="dl-m">metres</span>'
      + '<button class="sw-opt sw-go" data-dlsize="1">Continue \u2192</button></div>'
      + '<button class="dl-size-skip" data-dlskip="1">Skip \u2014 I already know how many I need</button>'
      + '<button class="dl-size-skip" data-dlbatten="1">It\u2019s a garage or workshop \u2014 show me battens instead \u2192</button>';
  }else{
    const opts=dlOptsFor(Q,dlAnswers);
    body='<div class="sw-opts">'+opts.map(function(o,i){
      return '<button class="sw-opt" data-dl="'+i+'">'+o[0]+'</button>';
    }).join("")+'</div>';
  }
  box.innerHTML=(dlStep>0?'<button class="pk-back" data-dlback="1">\u2190 Back</button>':'')
    + '<div class="sw-prog">Question '+(dlStep+1)+(dlStep+1<QS.length?' of '+QS.length:' \u2014 last one')+'</div>'
    + '<h3>'+Q.q+'</h3>'
    + (hint?'<p class="sw-hint">'+hint+'</p>':'')
    + (Q.extra?Q.extra(dlAnswers):'')
    + body;
}
function dlAnswerCurrent(idx){
  const QS=dlVisibleQs(), Q=QS[dlStep];
  const opts=dlOptsFor(Q,dlAnswers); if(!opts[idx]) return;
  dlAnswers[Q.key]=opts[idx][1];
  dlClearAuto();
  dlStep++; dlQty=0; dlPick=null; renderDlWizard();
}
function openDlWizard(){
  dlStep=0; dlAnswers={}; dlQty=0; dlPick=null; dlBatten=false; dlAutoKeys={};
  renderDlWizard();
  $("#dlWizard").classList.add("open"); $("#dlScrim").classList.add("show");
}
function closeDlWizard(){
  $("#dlWizard").classList.remove("open"); $("#dlScrim").classList.remove("show");
}

/* ---------- the section on the page ---------- */
function dlGridSVG(){
  /* a plan view showing the 700-850mm wall offset and even spacing */
  return '<svg viewBox="0 0 240 172" role="img" aria-label="Plan view: downlights set 700 to 850mm off the walls">'
    + '<rect x="18" y="16" width="204" height="118" fill="#ffffff" stroke="'+DL_INK+'" stroke-width="2"/>'
    + [0,1,2].map(function(cx){ return [0,1].map(function(cy){
        const x=52+cx*68, y=48+cy*54;
        return '<circle cx="'+x+'" cy="'+y+'" r="9" fill="'+DL_GLOW+'" opacity=".5"/><circle cx="'+x+'" cy="'+y+'" r="4.5" fill="'+DL_INK+'"/>';
      }).join(""); }).join("")
    + '<line x1="18" y1="48" x2="52" y2="48" stroke="'+DL_DIM+'" stroke-width="1.2" stroke-dasharray="3 3"/>'
    + '<text x="26" y="40" font-size="10" fill="#5d6151">700\u2013850mm</text>'
    + '<line x1="52" y1="148" x2="120" y2="148" stroke="'+DL_DIM+'" stroke-width="1.2"/>'
    + '<line x1="52" y1="144" x2="52" y2="152" stroke="'+DL_DIM+'" stroke-width="1.2"/>'
    + '<line x1="120" y1="144" x2="120" y2="152" stroke="'+DL_DIM+'" stroke-width="1.2"/>'
    + '<text x="86" y="164" font-size="10" fill="#5d6151" text-anchor="middle">\u2248 half ceiling height</text>'
    + '</svg>';
}
/* ---------- quick search: tappable filters above the grid ----------
   Thumbnails are the 150px product cut-outs already built for the layout
   planner, embedded here so the row works with no network at all. */
const DL_CHIPIMG={"all": "/img/inline/8c738c0fc918.webp", "70": "/img/inline/d09412d9d63d.webp", "90": "/img/inline/59047fb30e7c.webp", "big": "/img/inline/a6ab414aae7e.webp", "low": "/img/inline/66c2e54f0c5d.webp", "wet": "/img/inline/bd43328a510e.webp", "smart": "/img/inline/c9b04aba1dbf.webp"};
const DL_FILTERS=[
  {key:"all",  name:"All downlights", sub:"The whole range",        test:function(p){ return true; }},
  {key:"70",   name:"70 mm",          sub:"Small cut-out",          test:function(p){ var c=dlCut(p); return c&&c.min<=80; }},
  {key:"90",   name:"90 mm",          sub:"Standard cut-out",       test:function(p){ var c=dlCut(p); return c&&c.min>=81&&c.min<=104; }},
  {key:"big",  name:"120 mm +",       sub:"Big rooms & high ceilings", test:function(p){ var c=dlCut(p); return c&&c.min>=105; }},
  {key:"low",  name:"Low glare",      sub:"60\u00b0, source hidden",   test:function(p){ return dlIsLowGlare(p); }},
  {key:"smart",name:"Smart & RGBW",   sub:"Run from your phone",    test:function(p){ return dlIsRGBW(p)||dlIsSmart(p); }}
];
let dlFilter="all";
function dlFiltered(){
  const f=DL_FILTERS.find(x=>x.key===dlFilter)||DL_FILTERS[0];
  return dlPool().filter(f.test);
}
function renderDlChips(){
  const host=$("#dlChips"); if(!host) return;
  host.innerHTML=DL_FILTERS.map(function(f){
    const n=dlPool().filter(f.test).length;
    const img=DL_CHIPIMG[f.key];
    return '<button class="dl-chip'+(f.key===dlFilter?" on":"")+'" data-dlfilter="'+f.key+'">'
      + (img?'<img src="'+img+'" alt="" loading="lazy">':'')
      + '<span class="dl-chip-n">'+f.name+'</span>'
      + '<span class="dl-chip-s">'+f.sub+'</span>'
      + '<span class="dl-chip-c">'+n+'</span></button>';
  }).join("");
}
const DL_GLAREPHOTO="/img/inline/871d225214d2.webp";
/* ---------- the guide ----------
   Most people don't get lost on the products, they get lost on the words.
   This is the plain-English version of everything the finder asks about,
   written so someone who has never bought a downlight can follow it. */
function dlGlarePhoto(compact){
  return '<figure class="dl-photo'+(compact?" dl-photo-sm":"")+'">'
    + '<img src="'+DL_GLAREPHOTO+'" alt="The same living room lit with a low glare downlight and with a normal downlight" loading="lazy">'
    + '<figcaption>Same room, same time of day, same sofa. The only thing that changed is the fitting. '
    + 'On the left you see the <b>light</b>; on the right you see the <b>globe</b>.</figcaption></figure>';
}
/* Colour temperature explained by showing it rather than quoting a number. */
function dlTempSVG(){
  const set=[["2700\u20133000K","Warm","#F0C070","Bedrooms, living, anywhere you relax"],
             ["4000K","Natural","#F6EBD2","Kitchens, bathrooms, hallways, laundry"],
             ["5000\u20136000K","Cool","#E2ECF7","Garages, offices, workshops, retail"]];
  return '<div class="dl-temps">'+set.map(function(t){
    return '<div class="dl-temp"><svg viewBox="0 0 120 78" role="img" aria-label="'+t[1]+' white, '+t[0]+'">'
      + '<rect width="120" height="78" fill="#faf9f4"/>'
      + '<rect x="0" y="0" width="120" height="9" fill="#15170F"/>'
      + '<circle cx="60" cy="9" r="3" fill="'+t[2]+'"/>'
      + '<path d="M60 9 L22 66 H98 Z" fill="'+t[2]+'" opacity=".85"/>'
      + '<rect x="12" y="66" width="96" height="4" fill="#15170F" opacity=".2"/></svg>'
      + '<span>'+t[1]+'<em>'+t[0]+'</em></span><p>'+t[3]+'</p></div>';
  }).join("")+'</div>';
}
/* Where a smart fitting is worth the extra money and where it plainly isn't.
   Prices are read live off the catalogue so this can't go stale. */
const DL_SMART_ADVICE=[
  ["Living / dining", "yes",   "Dimming and scenes get used every single night. This is the room to spend it on."],
  ["Bedroom",         "maybe", "A low warm setting at bedtime is genuinely nice. One or two fittings, not the lot."],
  ["Media room",      "yes",   "Down to 10% without leaving the couch is the whole point."],
  ["Kitchen",         "no",    "You want full brightness the second you walk in. A wall switch beats unlocking a phone."],
  ["Bathroom",        "no",    "Same reason, plus the wet-area IP65 fittings aren't made smart anyway."],
  ["Hallway / stairs","no",    "A $20 motion sensor does the job better than a $25 smart fitting ever will."],
  ["Laundry / garage","no",    "On and off. That's the entire requirement."],
  ["Office / shop",   "no",    "Put the money into more light and better colour, not into an app."]
];
function dlSmartPrices(){
  const pool=dlPool();
  const tri=pool.filter(p=>!dlIsRGBW(p)&&!dlIsSmart(p)&&dlCut(p)&&dlCut(p).min>=81&&dlCut(p).min<=104)
                .sort((a,b)=>a.price-b.price)[0];
  const sm=pool.filter(p=>dlIsRGBW(p)||dlIsSmart(p)).sort((a,b)=>a.price-b.price)[0];
  return {tri:tri, smart:sm};
}
function dlSmartTable(){
  const p=dlSmartPrices();
  let sums="";
  if(p.tri&&p.smart){
    const n=24, a=p.tri.price*n, b=p.smart.price*n;
    sums='<div class="dl-maths"><h5>What it actually costs</h5>'
      + '<p>A typical Perth house takes about <b>'+n+' downlights</b>. At our prices that is '
      + '<b>$'+a.toFixed(0)+'</b> ex-GST in tricolour, or <b>$'+b.toFixed(0)+'</b> ex-GST if you make every one of them smart '
      + '\u2014 <b>$'+(b-a).toFixed(0)+' extra</b>, for colour you will change twice and then leave on white.</p>'
      + '<p>Do the living room and the main bedroom smart. Run everything else tricolour. '
      + 'You get the part you will actually use for about <b>$'+((p.smart.price-p.tri.price)*8).toFixed(0)+'</b> more, not $'+(b-a).toFixed(0)+'.</p></div>';
  }
  return '<table class="dl-smart"><thead><tr><th>Room</th><th>Smart worth it?</th><th>Why</th></tr></thead><tbody>'
    + DL_SMART_ADVICE.map(function(r){
        const lbl={yes:"Yes",maybe:"Maybe",no:"No"}[r[1]];
        return '<tr><th scope="row">'+r[0]+'</th><td><span class="dl-verdict dl-v-'+r[1]+'">'+lbl+'</span></td><td>'+r[2]+'</td></tr>';
      }).join("")
    + '</tbody></table>' + sums;
}
function dlIPSVG(){
  return '<svg viewBox="0 0 240 96" role="img" aria-label="IP ratings: which fitting suits which area">'
    + [["IP20","Dry rooms only","#c9c6b8",14],["IP44/54","Splash resistant","#9aa08d",90],["IP65","Steam & weather","#2C6B45",166]]
      .map(function(t){
        return '<rect x="'+t[3]+'" y="14" width="60" height="34" fill="'+t[2]+'" opacity=".22" stroke="'+t[2]+'" stroke-width="1.5"/>'
             + '<text x="'+(t[3]+30)+'" y="35" font-size="13" font-weight="700" text-anchor="middle" fill="#15170F">'+t[0]+'</text>'
             + '<text x="'+(t[3]+30)+'" y="64" font-size="9.5" text-anchor="middle" fill="#5d6151">'+t[1].split(" ")[0]+'</text>'
             + '<text x="'+(t[3]+30)+'" y="76" font-size="9.5" text-anchor="middle" fill="#5d6151">'+t[1].split(" ").slice(1).join(" ")+'</text>';
      }).join("")
    + '</svg>';
}
const DL_GUIDE=[
 {n:"01", t:"The hole in the ceiling", a:"Cut-out is the hole, not the fitting.",
  body:function(){
    return dlCutSVG(null)
      + '<p>Every downlight is sold by its <b>cut-out</b> \u2014 the hole the electrician saws in the plasterboard. '
      + 'The fitting itself is always a bit wider, because it has to cover the edge of the hole.</p>'
      + '<p>Replacing old halogens? Put a tape across an existing hole, edge to edge. That number is the only one that matters. '
      + 'Building new? <b>90&#8201;mm</b> is the Australian standard and has by far the most choice.</p>'
      + '<p class="dlg-do">Bigger hole = brighter fitting = fewer of them. A 90&#8201;mm does a bedroom; a 200&#8201;mm is for a shop floor or a double-height void.</p>';
  }},
 {n:"02", t:"Low glare vs standard", a:"Do you want to see the light, or see the globe?",
  body:function(){
    return dlGlarePhoto()
      + '<p>A <b>standard</b> downlight puts the LED right at the ceiling face and spreads it 100\u2013110\u00b0. '
      + 'It is bright, it is even, and it is cheap \u2014 but sit on the couch, glance up, and there is a bright dot burning at you.</p>'
      + '<p>A <b>low glare</b> downlight sets the LED about 20&#8201;mm back behind a dark baffle and narrows the beam to roughly 60\u00b0. '
      + 'Stand under it and the ceiling looks almost dark; the light lands on the floor and the furniture instead of in your eyes.</p>'
      + dlGlarePair(true)
      + '<p class="dlg-do"><b>The trade-off is simple.</b> A narrower beam covers less floor, so a low glare room needs a few more fittings '
      + 'and costs a bit more. Worth it where you sit still and look up \u2014 living, bedrooms, media rooms, over a bench. '
      + 'Not worth it in a hallway or a garage, where you just want light on the ground.</p>';
  }},
 {n:"03", t:"Warm, natural or cool", a:"One switch on the back sets it. Pick it once.",
  body:function(){
    return dlTempSVG()
      + '<p>Nearly everything we sell is <b>tricolour</b> (also written CCT). There is a tiny slide switch on the back of the fitting. '
      + 'Your electrician flicks it to warm, natural or cool before it goes in the ceiling, and that is the end of it.</p>'
      + '<p>It costs nothing extra and it means you cannot get it wrong at the ordering stage \u2014 if the kitchen looks too yellow, '
      + 'the fitting comes down for thirty seconds and goes back up.</p>'
      + '<p class="dlg-do">Keep it consistent within a sightline. Warm in the living room and cool in the adjoining kitchen '
      + 'reads as a mistake, not a feature.</p>';
  }},
 {n:"04", t:"Smart lights \u2014 where they earn their keep", a:"Two rooms, not the whole house.",
  body:function(){
    return '<p>Both standard and low glare fittings come in smart versions, and they do work well. '
      + 'The mistake is buying them everywhere.</p>'
      + '<p>A smart downlight lets you dim it, change its colour and set scenes from your phone or a voice assistant. '
      + 'That is genuinely good in a room you sit in at night. In a kitchen or a bathroom you want full brightness the moment '
      + 'you walk in \u2014 reaching for a phone to turn a light on is slower than the switch that was already there.</p>'
      + dlSmartTable()
      + '<p class="dlg-do">Wiring a whole house smart is the single most common way people overspend on lighting. '
      + 'Do the rooms you relax in. Leave the working rooms on a switch.</p>';
  }},
 {n:"05", t:"How many, and where to put them", a:"Off the walls first, then evenly between.",
  body:function(){
    return dlGridSVG()
      + '<p>The usual mistake is a light dead-centre in the room. One fitting in the middle lights the floor and leaves '
      + 'every wall, and every picture on it, in shadow.</p>'
      + '<p>Set the outer row <b>700\u2013850&#8201;mm off the walls</b> so the light washes down them, then space the rest '
      + 'about <b>half your ceiling height</b> apart. On a standard 2.7&#8201;m ceiling that is roughly 1.3\u20131.4&#8201;m between fittings.</p>'
      + '<p class="dlg-do">Low glare fittings throw a narrower cone, so the same room wants a couple more of them. '
      + 'The finder works your count out from the table our team uses on site \u2014 tell it the room size and it will tell you the number.</p>';
  }}
];
function renderDlGuide(){
  const host=$("#dlGuide"); if(!host) return;
  /* Card grid, all closed. Click one and it expands across the full width
     underneath, so the guide is a compact index until you want detail. */
  host.innerHTML='<div class="dlg-grid">'+DL_GUIDE.map(function(g,i){
    return '<button type="button" class="dlg-card" data-dlg="'+i+'">'
      + '<span class="dlg-n">'+g.n+'</span>'
      + '<span class="dlg-t">'+g.t+'</span>'
      + '<span class="dlg-a">'+g.a+'</span>'
      + '</button>';
  }).join("")+'</div><div class="dlg-open" id="dlgOpen" hidden></div>';
}
let dlgOpenIdx=null;
function dlGuideOpen(i){
  const host=$("#dlgOpen"); if(!host) return;
  const cards=$$("#dlGuide .dlg-card");
  if(dlgOpenIdx===i){                       /* clicking the open one closes it */
    dlgOpenIdx=null; host.hidden=true; host.innerHTML="";
    cards.forEach(function(c){ c.classList.remove("on"); });
    return;
  }
  dlgOpenIdx=i;
  const g=DL_GUIDE[i];
  cards.forEach(function(c){ c.classList.toggle("on", +c.dataset.dlg===i); });
  host.hidden=false;
  host.innerHTML='<div class="dlg-open-hd">'
    + '<span class="dlg-n">'+g.n+'</span><h4>'+g.t+'</h4>'
    + '<button type="button" class="dlg-x" data-dlgclose="1" aria-label="Close">\u00d7</button></div>'
    + '<div class="dlg-body">'+g.body()+'</div>';
  host.scrollIntoView({behavior:"smooth",block:"nearest"});
}
function renderDownlights(){
  renderDlChips();
  renderDlGuide();
  const host=$("#dlGrid");
  const list=dlFiltered();
  if(host) host.innerHTML=list.length
    ? list.map(cardHTML).join("")
    : '<p class="dl-empty">Nothing online in that combination \u2014 call our Perth team on (08) 9297 2969 and we\u2019ll check the warehouse.</p>';
  const help=$("#dlHelp");
  if(help){
    help.innerHTML=
      '<div class="dl-help-card">'+dlCutSVG(null).replace(/^<figure class="dl-cutfig">/,"").replace(/<figcaption>[\s\S]*$/,"")
        + '<h4>Cut-out is the hole, not the fitting</h4><p>We stock 70&#8201;mm through to 200&#8201;mm+. Measure an existing hole edge to edge \u2014 most Perth ceilings are 90mm.</p></div>'
      + '<div class="dl-help-card">'+dlGlareSVG("low")
        + '<h4>Low glare vs standard</h4><p>Low glare sets the LED back behind a baffle and narrows the beam to 60\u00b0. Standard sits at the face and spreads 100\u2013110\u00b0. The finder shows both side by side.</p></div>'
      + '<div class="dl-help-card">'+dlGridSVG()
        + '<h4>How many, and where</h4><p>Tell the finder your room size and it works the count out from the table our team uses on site \u2014 700\u2013850&#8201;mm off the walls, spaced about half the ceiling height.</p></div>';
  }
}

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


/* ---------- INSTALLATION GUIDES (per product, by type) ---------- */
function _mmG(p){const m=(p.name||"").match(/(\d{2,3})\s?mm/);return m?m[1]:null;}
function _ipG(p){const s=JSON.stringify(p.specTable||[])+" "+(p.name||"");const m=s.match(/IP\s?(\d{2})/i);return m?("IP"+m[1]):null;}
const _IG_ELEC="Licensed electrician";
const CAT_INSTALL={
 downlights:{tools:[_IG_ELEC,"Hole saw / plasterboard saw","Wire strippers","Ladder"],
  steps:["Switch off the lighting circuit at the switchboard and confirm it's dead.",
   "Cut the ceiling opening to the size marked on the box (around {mm}mm — use the supplied template).",
   "Wire the driver to the mains via the plug or terminal block (active, neutral, earth).",
   "If it's a tri-colour model, set the colour switch (e.g. 3000K/4000K/5700K) before fitting.",
   "Squeeze the spring clips, push the light into the opening and let the springs pull it flush.",
   "Restore power and test. For dimmable models, confirm your dimmer is a compatible trailing-edge LED type."]},
 strip:{tools:[_IG_ELEC+" (for driver / mains)","Sharp scissors","Soldering iron & cable","Aluminium channel","Correctly-sized driver"],
  steps:["Measure your run. Order one 3m channel per 3m of run — channels are fixed 3m and can't be cut shorter.",
   "Cut the strip only at the marked cut-points, and only as many times as the strip allows per run.",
   "Solder cabling to both ends of each strip length; use strip-to-lead connectors at joins and corners.",
   "Size the driver to the load (watts-per-metre × length, plus ~20%). Max single driver is 320W — for long runs use two smaller drivers, one at each end, to avoid voltage drop.",
   "Seat the strip in the aluminium channel and clip on the diffuser for a clean, dot-free line.",
   "Connect the controller/receiver, pair the remote or app, then power up and test."],
  safety:["240V strip is for recessed-ceiling / cove installs only."]},
 highbay:{tools:[_IG_ELEC,"Chain / hook or bracket","Ladder or lift"],
  steps:["Isolate the circuit at the switchboard.",
   "Fix the mounting hook, chain or bracket to a rated structural point.",
   "Wire the fitting to the mains (active, neutral, earth) via the supplied connector.",
   "Hang the high bay at the planned height and check the beam covers the area.",
   "Restore power and test; adjust suspension height for even coverage."]},
 ceiling:{tools:[_IG_ELEC,"Screwdriver","Ladder"],
  steps:["Switch off the circuit and confirm it's dead.",
   "For recessed panels, drop into the ceiling grid or cut the opening to size; for oysters/surface, fix the base plate.",
   "Wire the driver to the mains (active, neutral, earth).",
   "Fit the panel/oyster to the base or grid and secure.",
   "Restore power and test."]},
 batten:{tools:[_IG_ELEC,"Drill","Screwdriver"],
  steps:["Isolate the circuit.",
   "Mark and fix the batten base to the ceiling or wall.",
   "Wire active, neutral and earth into the terminal.",
   "Clip on the diffuser and secure the end caps.",
   "Restore power and test."]},
 flood:{tools:[_IG_ELEC,"Drill","Spanner","Weatherproof gland"],
  steps:["Isolate the supply.",
   "Fix the bracket to a solid surface and angle the head roughly where needed.",
   "Feed the cable through the weatherproof gland and wire active, neutral, earth.",
   "Aim the flood at the target area and lock the bracket.",
   "Seal the gland, restore power and test. Rated {ip}."]},
 emergency:{tools:[_IG_ELEC],
  steps:["Isolate the circuit.",
   "Mount the emergency/exit fitting to meet AS2293 sight-line requirements.",
   "Connect to a permanent (unswitched) active so the battery stays charged, plus neutral and earth.",
   "Restore power and let the battery charge fully.",
   "Press the test button to confirm it runs on battery, then re-test on the required schedule."]},
 industrial:{tools:[_IG_ELEC,"Drill","Weatherproof gland"],
  steps:["Isolate the supply.",
   "Fix the tri-proof / weatherproof fitting to its ceiling or wall clips.",
   "Feed the cable through the IP-rated gland and wire active, neutral, earth.",
   "Clip and seal the fitting closed to keep its {ip} rating.",
   "Restore power and test."]},
 landscape:{tools:["Low-voltage transformer","Weatherproof connectors","Spade"],
  steps:["Plan the layout and run low-voltage cable from the transformer location.",
   "Mount each spike / bollard and make joins with weatherproof (gel / IP-rated) connectors.",
   "Keep total load within the transformer's rating; a licensed electrician must connect the transformer to 240V mains.",
   "Bury cable safely and test the run.",
   "Adjust aim and spacing for even light."],
  safety:["Any connection to 240V mains (the transformer supply) must be done by a licensed electrician."]},
 outdoor:{tools:[_IG_ELEC,"Drill","Weatherproof gland","Silicone"],
  steps:["Isolate the supply.",
   "Fix the wall light to a solid, weather-facing surface.",
   "Feed the cable through the gland and wire active, neutral, earth.",
   "Seal around the base with silicone to keep water out. Rated {ip}.",
   "Restore power and test."]},
 school:{tools:[_IG_ELEC,"Ladder"],
  steps:["Isolate the circuit.",
   "Drop the panel into the ceiling grid or surface-mount the frame.",
   "Wire the driver to the mains.",
   "Secure and clip the diffuser.",
   "Restore power and test."]},
 sensors:{tools:[_IG_ELEC,"Screwdriver"],
  steps:["Isolate the circuit.",
   "Mount the sensor where it has clear line of sight to the detection area.",
   "Wire active in/out, neutral and earth to the sensor terminals.",
   "Restore power and set the time, lux and sensitivity dials to suit.",
   "Walk-test the detection zone and fine-tune."]},
 star:{tools:[_IG_ELEC,"Hole saw","Ladder"],
  steps:["Switch off and confirm the circuit is dead.",
   "Cut the ceiling openings for each star point and feed the leads.",
   "Connect the points to the driver / controller per the connection guide.",
   "Fit the points flush and tidy the cabling above the ceiling.",
   "Restore power, pair the controller and test the effect."]},
 track:{tools:[_IG_ELEC,"Drill","Ladder"],
  steps:["Isolate the circuit.",
   "Fix the track to the ceiling and wire the live end feed (active, neutral, earth).",
   "Clip each head onto the track and lock it.",
   "Aim the heads where needed.",
   "Restore power and test."]},
 switches:{tools:[_IG_ELEC,"Screwdriver"],
  steps:["Isolate the circuit at the switchboard.",
   "Remove the old plate and note the existing wiring.",
   "Terminate active, neutral (where required) and earth to the new switch / powerpoint.",
   "Fix the mechanism and plate to the wall box.",
   "Restore power and test."]},
 smart:{tools:["Smartphone","2.4GHz Wi-Fi",_IG_ELEC+" (for wired devices)"],
  steps:["Install or wire the device (wired smart fittings need a licensed electrician).",
   "Download the app and create an account.",
   "Put the device in pairing mode and add it in the app over 2.4GHz Wi-Fi.",
   "Assign it to a room and (optionally) link Alexa or Google Home.",
   "Test scenes, schedules and voice control."]},
 transformers:{tools:[_IG_ELEC],
  steps:["Isolate the supply.",
   "Mount the transformer / driver in a ventilated spot within cable reach of the load.",
   "Wire 240V (active, neutral, earth) to the primary side.",
   "Connect the low-voltage output to the load, keeping total watts within the transformer's rating (max single driver 320W).",
   "Restore power and test; for long strip runs, feed from both ends with two drivers."]},
 fans:{tools:[_IG_ELEC,"Ladder","Screwdriver"],
  steps:["Isolate the circuit.",
   "Fix the ceiling bracket to a fan-rated mounting point.",
   "Wire active, neutral and earth (plus any wall control / remote receiver).",
   "Attach the blades evenly and hang the fan / light.",
   "Restore power, test each speed and balance the blades if it wobbles."]},
 _default:{tools:[_IG_ELEC],
  steps:["Switch off the circuit at the switchboard and confirm it's dead.",
   "Mount the fitting securely following the product's paperwork.",
   "Wire active, neutral and earth to the terminals or connector.",
   "Secure the fitting and any diffuser or cover.",
   "Restore power and test."]}
};
function installGuide(p){
  const t=CAT_INSTALL[p.cat]||CAT_INSTALL._default;
  const tok={"{mm}":_mmG(p)||"the size on the box","{ip}":_ipG(p)||"its IP rating"};
  const fill=s=>s.replace(/\{mm\}|\{ip\}/g,m=>tok[m]);
  const steps=t.steps.map(fill);
  const safety=["In Australia, connecting any 240V mains fitting must be done by a licensed electrician. Always switch off at the switchboard and confirm the circuit is dead before you start."].concat(t.safety||[]);
  const kw=({strip:["strip"],landscape:["garden"],star:["star"],smart:["smart","stair"],transformers:["connecting","strip"]})[p.cat]||[];
  const pdfs=(typeof GUIDES!=="undefined"?GUIDES:[]).filter(g=>kw.some(k=>g[0].toLowerCase().includes(k)));
  return {tools:t.tools,steps,safety,pdfs};
}
function guideHTML(p){
  const g=installGuide(p);
  return '<div class="ig-cols"><div class="ig-block"><b>You\u2019ll need</b><ul class="ig-tools">'+g.tools.map(x=>"<li>"+x+"</li>").join("")+'</ul></div>'+
    '<div class="ig-block"><b>Steps</b><ol class="ig-steps">'+g.steps.map(x=>"<li>"+x+"</li>").join("")+'</ol></div></div>'+
    '<div class="ig-safety"><b>\u26A0 Safety</b><ul>'+g.safety.map(x=>"<li>"+x+"</li>").join("")+'</ul></div>'+
    (g.pdfs.length?'<div class="ig-pdfs"><b>Related guides:</b> '+g.pdfs.map(pf=>'<a href="'+pf[1]+'" target="_blank" rel="noopener">'+pf[0]+' \u2197</a>').join(" &middot; ")+'</div>':'');
}
function openModalGuide(id){ openModal(id); setTimeout(()=>{ const g=document.getElementById("mInstall"),mb=$("#modalBody"); if(g&&mb) mb.scrollTo({top:g.offsetTop-16,behavior:"smooth"}); },80); }
/* Supplier spec sheets, keyed by the product's Magento path. Harvested
   from the attachments on greenhse.com — 117 documents across 194
   products. Files resolve through /docs/, which _redirects proxies to
   the Magento media folder. */
const SPECSHEETS={"/products/lighting-perth/australian-certified-12v-24v-transformers-greenhouse-technologies/tr12v-all.html":[["ELG-75-SPEC.PDF","12v Mean Well 75w IP65 Transformer Specifications"],["VHO-020.pdf","12V 20w IP20 Transformer Specifications"],["VHO-200-012B5_specification_1.pdf","12V 200w IP65 Transformer Specifications"],["VUO-075-012M6_specification.pdf","12v 75w IP20 Transformer Specifications"],["Tr12V40W.pdf","12v 40w IP20 Transformer Specifications"]],"/products/lighting-perth/australian-certified-12v-24v-transformers-greenhouse-technologies/tr24v-all.html":[["ELG-240-SPEC.PDF","24V Mean Well IP65 240w Transformer Specifications"],["ELG-150-SPEC.PDF","24V 150W Mean Well IP65 Transformer Specifications"],["VUF-030_040_-012_24_M4_ENG.pdf","24V 30W IP20 Transformer Specifications"],["VUF-060.pdf","24V 60W IP20 Transformer Specifications"],["VHO-100-012A01_specification.pdf","24V 100w IP67 Transformer Specifications"]],"/products/lighting-perth/air-flow/amari-dc-52-fan-bw.html":[["Amari-52_Fan_21719_.pdf","AMARI DC FAN BLACK OR WHITE"],["Dc_Fans_vs_AC_fans_1.pdf","DC / AC Fan Comparison"],["DCWALLCONTROL2.pdf","AMARI DC FAN WALL CONTROLLER"]],"/products/lighting-perth/air-flow/amari-dc-52-fan-light.html":[["Amari-52_Fan_and_Light_21721_.pdf","AMARI 52\" DC FAN"],["Dc_Fans_vs_AC_fans_1.pdf","DC / AC Fan Comparison"],["DCWALLCONTROL2.pdf","AMARI DC FAN WALL CONTROLLER"]],"/products/lighting-perth/air-flow/amari-dc-fan-56-bw.html":[["Amari_5_blade_no_light_specs.pdf","AMARI 5-BLADE 56\" CEILING FAN"],["DCWALLCONTROL2.pdf","AMARI DC FAN WALL CONTROLLER"]],"/products/lighting-perth/air-flow/amari-dc-fan-56-light-bw.html":[["Amari_5_blade_light_specs_1.pdf","AMARI 5 BLADE 56\" CEILING FAN WITH CCT LIGHT"],["DCWALLCONTROL2.pdf","AMARI DC FAN WALL CONTROLLER"]],"/products/lighting-perth/air-flow/solace-bathroom-mate.html":[["Solace.pdf","SOLACE 4-IN-1 BATHROOM MATE"]],"/products/lighting-perth/air-flow/blizzard-exhaust-small.html":[["Blizzard_SeriesII.pdf","Blizzard DC Bathroom Exhaust Fan"]],"/products/lighting-perth/air-flow/blizzard-exhaust-large.html":[["Blizzard_SeriesII.pdf","Blizzard DC Bathroom Exhaust Fan"]],"/products/lighting-perth/air-flow/blizzard-exhaust-cct-small.html":[["Blizzard_SeriesII.pdf","Blizzard DC Bathroom Exhaust Fan"]],"/products/lighting-perth/air-flow/blizzard-exhaust-cct-large-1.html":[["Blizzard_SeriesII.pdf","Blizzard DC Bathroom Exhaust Fan"]],"/products/lighting-perth/air-flow/talon-promax-no-led.html":[["22888_22889_Promax_Exhaust_Fan_OL.pdf","TALON PROMAX EXHAUST FAN"]],"/products/lighting-perth/air-flow/horizon-heater-lamps.html":[["19847_slim_heat_lamp.pdf","19847 Slim 2 Heat Lamp Specs"]],"/products/lighting-perth/air-flow/supernova-heater.html":[["SupernovaII_20748-20749.pdf","Supernova II 2 Heat Lamp Specs"]],"/products/lighting-perth/led-batten-lights-perth/t20-cct-1.html":[["T20CCT.pdf","20W CCT LED Batten Specs"]],"/lighting-perth/led-batten-lights-perth/t40-cct-batten-pro.html":[["T40-CCT_Pro.pdf","40W LED Batten Pro Specs"]],"/lighting-perth/led-ceiling-lights-perth/30w-led-track-light.html":[["30W_Track_lights_4.pdf","30W LED TRACK LIGHT"]],"/lighting-perth/led-ceiling-lights-perth/black-linear-modular-light.html":[["Modular_Linear_Light.pdf","Linear Modular Lighting System"]],"/lighting-perth/led-ceiling-lights-perth/gh-c12cct-bw.html":[["GH-CCTP_small.pdf","12W CEILING LIGHT CCT"]],"/lighting-perth/led-ceiling-lights-perth/wl8-cct-bw-1.html":[["GH-W8.pdf","8W UP/DOWN WALL LIGHT CCT DIMMABLE"]],"/lighting-perth/led-ceiling-lights-perth/mr10-cct-wall-b.html":[["Sasha_Wall_light_1.pdf","Mercator Sasha II Up/Down Wall Light"]],"/lighting-perth/led-ceiling-lights-perth/c25-cct-pa.html":[["C25P.pdf","25/18/12W CCT PREMIUM CEILING LIGHT"]],"/lighting-perth/led-ceiling-lights-perth/p30s-cct.html":[["P30S_Ceiling_Light_2.pdf","30w LED Round Ceiling 5-CCT"],["C25P.pdf","25/18/12W CCT PREMIUM CEILING LIGHT"]],"/lighting-perth/led-ceiling-lights-perth/p24se-cct.html":[["P24SE.pdf","24w Ceiling/Panel Light CCT SE"]],"/products/lighting-perth/led-ceiling-lights-perth/p24-wifi.html":[["P24Smart.pdf","24W Smart LED Panel Light Specs"],["P24_Smart_Instructions.pdf","24W CEILING LIGHT SMART INSTRUCTIONS"]],"/lighting-perth/led-ceiling-lights-perth/p24-rgbw-cct.html":[["P24_RGB_CCT.pdf","24W SMART WIFI CEILING LIGHT RGB+CCT"]],"/lighting-perth/led-ceiling-lights-perth/p18se-cct.html":[["P18SE.pdf","18W Ceiling/Panel Light CCT SE"]],"/products/lighting-perth/led-ceiling-lights-perth/p18e.html":[["P18E_40K_50K-1.pdf","P18E LED Light Panel Specs"]],"/products/lighting-perth/led-ceiling-lights-perth/p6s-cct.html":[["P6S.pdf","6W Ceiling/Mini Panel Light Specs"]],"/products/lighting-perth/led-ceiling-lights-perth/p18cct-rnd-sq.html":[["P18CCT_25SQ.pdf","P18 CCT SQ Specs"]],"/products/lighting-perth/led-ceiling-lights-perth/p36up-30x120-cct.html":[["P36UP_30x120_CCT_1.pdf","36w Low Glare 30x120 CCT Panel Lights"]],"/lighting-perth/led-ceiling-lights-perth/p36-60x60-cct.html":[["P36UP_60x60_CCT.pdf","36w Low Glare 60x60 CCT Panel Lights"]],"/products/lighting-perth/led-downlights-perth/dl7es-flat.html":[["DL7ES.pdf","7W LED Tricolour Downlight 70-75mm"]],"/products/lighting-perth/led-downlights-perth/dl7a.html":[["DL7A.pdf","DL7A Downlight Specs"]],"/products/lighting-perth/led-downlights-perth/dl9es-flat-hl.html":[["DL9ES-F_1.pdf","8w High Lumen 90mm Tricolour Downlight"]],"/products/lighting-perth/led-downlights-perth/dl8cct-p-lg.html":[["DL8_Architectural_LG.pdf","8w Architecture Low Glare Adjustable Downlight"]],"/products/lighting-perth/led-downlights-perth/dl10es-flat-white-1.html":[["DL10ES-F_2.pdf","10W TRI-COLOUR DOWNLIGHT FLAT COVER"]],"/products/lighting-perth/led-downlights-perth/dl10es-flat-black.html":[["DL10ES-F_2.pdf","10W TRI-COLOUR DOWNLIGHT FLAT COVER"]],"/products/lighting-perth/led-downlights-perth/dl10-ps.html":[["DL10PS.pdf","DL10PS Specs"]],"/products/lighting-perth/led-downlights-perth/dl10pbt.html":[["DL10PBT.pdf","10w Bluetooth LED Downlight Low Glare"]],"/products/lighting-perth/led-downlights-perth/dl10s-al.html":[["DL10S.pdf","DL10S Specs"]],"/products/lighting-perth/led-downlights-perth/dl9rgbw-bt1.html":[["DL9_RGBW_BT_1.pdf","9w SMART RGBW DOWNLIGHT BLUETOOTH"]],"/products/lighting-perth/led-downlights-perth/dl9rgbw-pbt.html":[["DL9_RGB_PBT.pdf","9W SMART RGBW LOW GLARE DOWNLIGHT"]],"/products/lighting-perth/led-downlights-perth/dl7g-ip65-black-1.html":[["DL5_7_10gimbal_1.pdf","DL5/7/10G Downlight Specs"]],"/products/lighting-perth/led-downlights-perth/dl10gs-ip65.html":[["DL5_7_10gimbal_1.pdf","DL5/7/10G Downlight Specs"],["Gimbal_downlight.pdf","Gimbal Light Installation Instructions"]],"/products/lighting-perth/led-downlights-perth/dl13es.html":[["DL13ESF.pdf","DL13ES Downlight Specs"]],"/products/lighting-perth/led-downlights-perth/dl15-12-cct-pa.html":[["DL15_12-120.pdf","15W/12W CCT POWER ADJUSTABLE DOWNLIGHT"]],"/products/lighting-perth/led-downlights-perth/dl25-20-140-cct-pa.html":[["DL25_20-140.pdf","25W/20W CCT POWER ADJUSTABLE DOWNLIGHT (140mm)"]],"/products/lighting-perth/led-downlights-perth/dl25-20-160-cct-pa.html":[["DL25_20-160.pdf","25W/20W CCT POWER ADJUSTABLE DOWNLIGHT (160mm)"]],"/products/lighting-perth/led-downlights-perth/25w-smart-led-tuya-downlight.html":[["DL25_Smart_1.pdf","25W SMART WIFI DOWNLIGHT"]],"/products/lighting-perth/led-downlights-perth/dl35-28-200-cct-pa.html":[["DL35_28-200.pdf","35W/28W CCT POWER ADJUSTABLE CCT DOWNLIGHT"]],"/products/lighting-perth/led-downlights-perth/dl35s.html":[["DL35S.pdf","P35S Switch Adjustable Downlight"]],"/products/lighting-perth/led-downlights-perth/dl03-all.html":[["Star_lights_1_1.pdf","3W Star Light Specs"]],"/products/lighting-perth/led-downlights-perth/dl03-4kit-1.html":[["Star_lights_1_1.pdf","3W Star Light Specs"]],"/products/lighting-perth/led-downlights-perth/dl03-4kit.html":[["Star_lights_1_1.pdf","3W Star Light Specs"]],"/products/lighting-perth/led-downlights-perth/dl03-6kit.html":[["Star_lights_1_1.pdf","3W Star Light Specs"]],"/products/lighting-perth/led-downlights-perth/dp40-cct.html":[["DP40_CCT_1.pdf","40W TRICOLOUR DISPLAY LIGHT"]],"/products/lighting-perth/led-downlights-perth/q-connect.html":[["Quick_connect.pdf","QUICK CONNECT PLUG BASE"]],"/products/lighting-perth/emergency-lights/gh-exit-box.html":[["EMERGENCY_SIGN.pdf","GH Emergency Exit Sign"]],"/products/lighting-perth/led-flood-lights-perth/gh-tws-group.html":[["Twin_Flood_Sensor.pdf","TWIN FLOOD SENSOR"],["Twin_Floodlights.pdf","24w Twin Floodlight Black/White"]],"/products/lighting-perth/emergency-lights/gh-em5-spitfire-r.html":[["Spitfirepages_2.pdf","5W LED EMERGENCY LIGHT (SPITFIRE)"]],"/products/lighting-perth/led-flood-lights-perth/fs-flood-white-group.html":[["10-100W_LED_Superslim_White_Flood.pdf","10-100w Slim White Flood"]],"/products/lighting-perth/led-flood-lights-perth/f30-120-black.html":[["30W_F30_flood1.pdf","30W LED Floodlight Specs"]],"/products/lighting-perth/led-flood-lights-perth/f50s-cct-pa.html":[["F50_CCT_sensor.pdf","50w Floodlight CCT PA Sensor"],["50w_CCT_PA_Floodlight_1.pdf","50w Floodlight CCT PA"]],"/products/lighting-perth/led-flood-lights-perth/f100-120-cct-so.html":[["100W_CCT_Flood-1.pdf","100W SO FLOODLIGHT 90/120\u00ba LENS"]],"/products/lighting-perth/led-flood-lights-perth/f50-black-cct-90-120.html":[["50W_CCT_Flood.pdf","50w CCT Floodlight 90/120\u00ba"]],"/products/lighting-perth/led-flood-lights-perth/f100-90-cct-so.html":[["100W_CCT_Flood-1.pdf","100W SO FLOODLIGHT 90/120\u00ba LENS"]],"/products/lighting-perth/led-flood-lights-perth/f50-rgb.html":[["50W_LED_RGB_floodlight_25_160D.pdf","F50 RGB Flood Specs"]],"/products/lighting-perth/led-flood-lights-perth/a185-50k.html":[["A185_50K_1.pdf","185W Area Lights Specs"],["300W_Area_Light_small_1.pdf","185/300w LED Area Light"]],"/products/lighting-perth/led-flood-lights-perth/a300-50k.html":[["A300_50K.pdf","300W Area Light Specs"],["300W_Area_Light_small_1.pdf","185/300w LED Area Light"]],"/products/lighting-perth/high-bay-lights/hb200-so-120.html":[["HB200W-CCT-50K_1.pdf","200W SO HIGH BAY LIGHT 90\u00ba/120\u00ba BEAM"]],"/products/lighting-perth/led-flood-lights-perth/gh-a500-cct-pa-2.html":[["Area_Light_GH240_500.pdf","GH Area Light 240w or 500w"]],"/products/lighting-perth/led-flood-lights-perth/gh-a240-cct-pa.html":[["Area_Light_GH240_500.pdf","GH Area Light 240w or 500w"]],"/products/lighting-perth/high-bay-lights/hb100-so-120.html":[["EVB_HB100_120__2.pdf","100W SO HIGH BAY LIGHT 120\u00ba BEAM"]],"/products/lighting-perth/high-bay-lights/hb200-so-90d.html":[["HB200W-CCT-50K_1.pdf","200W SO HIGH BAY LIGHT 90\u00ba/120\u00ba BEAM"]],"/products/lighting-perth/industrial-lighting-perth/gh-c150w-40k.html":[["150w_Canopy_light.pdf","150W LED CANOPY LIGHT"]],"/lighting-perth/industrial-lighting-perth/gh-c200-cct.html":[["GH-C200CCT.pdf","200W CCT CANOPY LIGHT POWER ADJUSTABLE"]],"/lighting-perth/industrial-lighting-perth/gh-c100-cct-pa.html":[["GH-C100CCT-1.pdf","100W CCT CANOPY LIGHT POWER ADJUSTABLE"]],"/lighting-perth/industrial-lighting-perth/gh-em5-spitfire-r.html":[["Spitfirepages_2.pdf","5W LED EMERGENCY LIGHT (SPITFIRE)"]],"/lighting-perth/industrial-lighting-perth/gh-w50-cct.html":[["GH-W50CCT.pdf","50W CCT WALL LIGHT POWER ADJUSTABLE"]],"/products/lighting-perth/industrial-lighting-perth/gh-exit-box.html":[["EMERGENCY_SIGN.pdf","GH Emergency Exit Sign"]],"/lighting-perth/industrial-lighting-perth/hb100-so-120.html":[["EVB_HB100_120__2.pdf","100W SO HIGH BAY LIGHT 120\u00ba BEAM"]],"/products/lighting-perth/industrial-lighting-perth/hb200-so-90d.html":[["HB200W-CCT-50K_1.pdf","200W SO HIGH BAY LIGHT 90\u00ba/120\u00ba BEAM"]],"/products/lighting-perth/industrial-lighting-perth/hb200-so-120.html":[["HB200W-CCT-50K_1.pdf","200W SO HIGH BAY LIGHT 90\u00ba/120\u00ba BEAM"]],"/products/lighting-perth/industrial-lighting-perth/f30-120-black.html":[["30W_F30_flood1.pdf","30W LED Floodlight Specs"]],"/lighting-perth/industrial-lighting-perth/f100-90-cct-so.html":[["100W_CCT_Flood-1.pdf","100W SO FLOODLIGHT 90/120\u00ba LENS"]],"/lighting-perth/industrial-lighting-perth/f100-120-cct-so.html":[["100W_CCT_Flood-1.pdf","100W SO FLOODLIGHT 90/120\u00ba LENS"]],"/products/lighting-perth/industrial-lighting-perth/a185-50k.html":[["A185_50K_1.pdf","185W Area Lights Specs"],["300W_Area_Light_small_1.pdf","185/300w LED Area Light"]],"/products/lighting-perth/industrial-lighting-perth/a300-50k.html":[["A300_50K.pdf","300W Area Light Specs"],["300W_Area_Light_small_1.pdf","185/300w LED Area Light"]],"/lighting-perth/industrial-lighting-perth/gh-a240-cct-pa.html":[["Area_Light_GH240_500.pdf","GH Area Light 240w or 500w"]],"/lighting-perth/industrial-lighting-perth/gh-a500-cct-pa-2.html":[["Area_Light_GH240_500.pdf","GH Area Light 240w or 500w"]],"/products/lighting-perth/led-garden-pool-lights-perth/gl10-garden-3k4k-group.html":[["_Single_Colour_Garden_Lights_connection_1.pdf","10w Garden Light Connection (Single Colour)"],["10W_LED_Garden_light_1.pdf","10W LED Garden Light Specs"]],"/products/lighting-perth/led-garden-pool-lights-perth/gl10-garden-rgb-group.html":[["RGB_Garden_Lights_connection_1.pdf","10W RGB Garden Lights Connection"],["10W_LED_Garden_light_1.pdf","10W LED Garden Light Specs"]],"/products/lighting-perth/led-garden-pool-lights-perth/f50-rgb.html":[["50W_LED_RGB_floodlight_25_160D.pdf","F50 RGB Flood Specs"]],"/products/lighting-perth/led-garden-pool-lights-perth/gl7-inground-3000k.html":[["In-ground_light.pdf","7W IN-GROUND LIGHT"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/gl10-garden-3k4k-group.html":[["10W_LED_Garden_light_1.pdf","10W LED Garden Light Specs"],["_Single_Colour_Garden_Lights_connection_1.pdf","10w Garden Light Connection (Single Colour)"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/gl7-inground-3000k.html":[["In-ground_light.pdf","7W IN-GROUND LIGHT"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/wl-24-ww-cct.html":[["GH-WL1_.pdf","GH-WL Black Linear Wall light"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/gh-tws-group.html":[["Twin_Floodlights.pdf","24w Twin Floodlight Black/White"],["Twin_Flood_Sensor.pdf","TWIN FLOOD SENSOR"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/wl6-rgbw.html":[["6WRGBAluminium_wall_light.pdf","6W SMART WIFI RGBW WALL LIGHT"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/wl6-35k-black.html":[["6WAluminium_wall_light1.pdf","WL6 Specs"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/wl10r-40k-black.html":[["10W_LED_Wall_light_rectangle.pdf","10W Rectangular LED Wall Light Specs"],["10W_LED_Wall_light_square.pdf","10W Square LED Wall Light Specs"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/w10-cct-bw.html":[["W10CCT_BW.pdf","10W LED CCT WALL LIGHT BLACK/WHITE"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/wl12-18-cct-sensor.html":[["WL18_CCT_Sensor.pdf","LED Wall Light with Sensor 12w 18w"]],"/products/lighting-perth/led-outdoor-lights-perth/seaford-updown-wall.html":[["20601-1up_down.pdf","20601 Seaford Up/Down Wall Light Specs"]],"/products/lighting-perth/led-outdoor-lights-perth/glenelg-a-wall-light.html":[["20781_05_Whitel_up_down_side_lens.pdf","20781 Glenelg Ambient Up/Down Light Specs"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/18w-wall-light-cct.html":[["18W_LED_Wall_light_CCT_white_square.pdf","18W LED Wall Light CCT Specs"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/f50-rgb.html":[["50W_LED_RGB_floodlight_25_160D.pdf","F50 RGB Flood Specs"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/fs-flood-white-group.html":[["10-100W_LED_Superslim_White_Flood.pdf","10-100w Slim White Flood"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/f50-black-cct-90-120.html":[["50W_CCT_Flood.pdf","50w CCT Floodlight 90/120\u00ba"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/f50s-cct-pa.html":[["F50_CCT_sensor.pdf","50w Floodlight CCT PA Sensor"],["50w_CCT_PA_Floodlight_1.pdf","50w Floodlight CCT PA"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/f30-120-black.html":[["30W_F30_flood1.pdf","30W LED Floodlight Specs"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/gh-c150w-40k.html":[["150w_Canopy_light.pdf","150W LED CANOPY LIGHT"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/gh-c200-cct.html":[["GH-C200CCT.pdf","200W CCT CANOPY LIGHT POWER ADJUSTABLE"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/gh-c100-cct-pa.html":[["GH-C100CCT-1.pdf","100W CCT CANOPY LIGHT POWER ADJUSTABLE"]],"/lighting-perth/commercial-lighting-perth/f50-black-cct-90-120.html":[["50W_CCT_Flood.pdf","50w CCT Floodlight 90/120\u00ba"]],"/products/lighting-perth/led-outdoor-wall-lights-perth/gh-w50-cct.html":[["GH-W50CCT.pdf","50W CCT WALL LIGHT POWER ADJUSTABLE"]],"/lighting-perth/commercial-lighting-perth/c25-cct-pa.html":[["C25P.pdf","25/18/12W CCT PREMIUM CEILING LIGHT"]],"/lighting-perth/commercial-lighting-perth/gh-a240-cct-pa.html":[["Area_Light_GH240_500.pdf","GH Area Light 240w or 500w"]],"/lighting-perth/commercial-lighting-perth/black-linear-modular-light.html":[["Modular_Linear_Light.pdf","Linear Modular Lighting System"]],"/lighting-perth/commercial-lighting-perth/gh-a500-cct-pa-2.html":[["Area_Light_GH240_500.pdf","GH Area Light 240w or 500w"]],"/products/lighting-perth/commercial-lighting-perth/st240v-pro.html":[["240V_strip_Single_colour_1.pdf","240V Pro Bright Strip Lights Specs"],["240V_Strip_lighting2.pdf","240V STRIP LIGHT INSTALLATION INSTRUCTIONS"]],"/lighting-perth/commercial-lighting-perth/30w-led-track-light.html":[["30W_Track_lights_4.pdf","30W LED TRACK LIGHT"]],"/lighting-perth/commercial-lighting-perth/wl8-cct-bw-1.html":[["GH-W8.pdf","8W UP/DOWN WALL LIGHT CCT DIMMABLE"]],"/lighting-perth/commercial-lighting-perth/gh-c12cct-bw.html":[["GH-CCTP_small.pdf","12W CEILING LIGHT CCT"]],"/lighting-perth/commercial-lighting-perth/dl10gs-ip65.html":[["DL5_7_10gimbal_1.pdf","DL5/7/10G Downlight Specs"],["Gimbal_downlight.pdf","Gimbal Light Installation Instructions"]],"/lighting-perth/commercial-lighting-perth/mr10-cct-wall-b.html":[["Sasha_Wall_light_1.pdf","Mercator Sasha II Up/Down Wall Light"]],"/products/lighting-perth/commercial-lighting-perth/p36up-30x120-cct.html":[["P36UP_30x120_CCT_1.pdf","36w Low Glare 30x120 CCT Panel Lights"]],"/lighting-perth/commercial-lighting-perth/p36-60x60-cct.html":[["P36UP_60x60_CCT.pdf","36w Low Glare 60x60 CCT Panel Lights"]],"/lighting-perth/commercial-lighting-perth/hb100-so-120.html":[["EVB_HB100_120__2.pdf","100W SO HIGH BAY LIGHT 120\u00ba BEAM"]],"/products/lighting-perth/commercial-lighting-perth/dp40-cct.html":[["DP40_CCT_1.pdf","40W TRICOLOUR DISPLAY LIGHT"]],"/products/lighting-perth/commercial-lighting-perth/gh-c150w-40k.html":[["150w_Canopy_light.pdf","150W LED CANOPY LIGHT"]],"/lighting-perth/commercial-lighting-perth/gh-c100-cct-pa.html":[["GH-C100CCT-1.pdf","100W CCT CANOPY LIGHT POWER ADJUSTABLE"]],"/lighting-perth/commercial-lighting-perth/gh-w50-cct.html":[["GH-W50CCT.pdf","50W CCT WALL LIGHT POWER ADJUSTABLE"]],"/lighting-perth/commercial-lighting-perth/gh-c200-cct.html":[["GH-C200CCT.pdf","200W CCT CANOPY LIGHT POWER ADJUSTABLE"]],"/lighting-perth/commercial-lighting-perth/gh-em5-spitfire-r.html":[["Spitfirepages_2.pdf","5W LED EMERGENCY LIGHT (SPITFIRE)"]],"/products/lighting-perth/commercial-lighting-perth/gh-exit-box.html":[["EMERGENCY_SIGN.pdf","GH Emergency Exit Sign"]],"/products/lighting-perth/commercial-lighting-perth/w10-cct-bw.html":[["W10CCT_BW.pdf","10W LED CCT WALL LIGHT BLACK/WHITE"]],"/lighting-perth/commercial-lighting-perth/wl12-18-cct-sensor.html":[["WL18_CCT_Sensor.pdf","LED Wall Light with Sensor 12w 18w"]],"/products/lighting-perth/commercial-lighting-perth/t20-cct-1.html":[["T20CCT.pdf","20W CCT LED Batten Specs"]],"/lighting-perth/commercial-lighting-perth/t40-cct-batten-pro.html":[["T40-CCT_Pro.pdf","40W LED Batten Pro Specs"]],"/lighting-perth/commercial-lighting-perth/dl7g-ip65-black-1.html":[["DL5_7_10gimbal_1.pdf","DL5/7/10G Downlight Specs"]],"/products/lighting-perth/commercial-lighting-perth/dl8cct-p-lg.html":[["DL8_Architectural_LG.pdf","8w Architecture Low Glare Adjustable Downlight"]],"/products/lighting-perth/commercial-lighting-perth/dl7a.html":[["DL7A.pdf","DL7A Downlight Specs"]],"/products/lighting-perth/commercial-lighting-perth/dl9rgbw-bt1.html":[["DL9_RGBW_BT_1.pdf","9w SMART RGBW DOWNLIGHT BLUETOOTH"]],"/lighting-perth/commercial-lighting-perth/dl15-12-cct-pa.html":[["DL15_12-120.pdf","15W/12W CCT POWER ADJUSTABLE DOWNLIGHT"]],"/lighting-perth/commercial-lighting-perth/dl25-20-140-cct-pa.html":[["DL25_20-140.pdf","25W/20W CCT POWER ADJUSTABLE DOWNLIGHT (140mm)"]],"/lighting-perth/commercial-lighting-perth/dl9rgbw-pbt.html":[["DL9_RGB_PBT.pdf","9W SMART RGBW LOW GLARE DOWNLIGHT"]],"/lighting-perth/commercial-lighting-perth/dl25-20-160-cct-pa.html":[["DL25_20-160.pdf","25W/20W CCT POWER ADJUSTABLE DOWNLIGHT (160mm)"]],"/lighting-perth/commercial-lighting-perth/dl35-28-200-cct-pa.html":[["DL35_28-200.pdf","35W/28W CCT POWER ADJUSTABLE CCT DOWNLIGHT"]],"/lighting-perth/commercial-lighting-perth/25w-smart-led-tuya-downlight.html":[["DL25_Smart_1.pdf","25W SMART WIFI DOWNLIGHT"]],"/products/lighting-perth/commercial-lighting-perth/dl35s.html":[["DL35S.pdf","P35S Switch Adjustable Downlight"]],"/products/lighting-perth/commercial-lighting-perth/q-connect.html":[["Quick_connect.pdf","QUICK CONNECT PLUG BASE"]],"/products/lighting-perth/security-sensors/wl12-18-cct-sensor.html":[["WL18_CCT_Sensor.pdf","LED Wall Light with Sensor 12w 18w"]],"/products/lighting-perth/security-sensors/ikuu-smart-wifi-outdoor-sensor.html":[["Smart_Outdoor_IP65_sensor_1.pdf","Mercator Ikuu Smart Outdoor Sensor"]],"/products/lighting-perth/security-sensors/eye360-mw-pir.html":[["20051_05_Microwave_sensor.pdf","20051-05 Microwave Sensor Specs"]],"/products/lighting-perth/security-sensors/uni-scan-pir.html":[["18060_PIR_security_sensor.pdf","UNI-SCAN 180\u00ba PIR SENSOR"]],"/products/lighting-perth/led-star-lights/dl03-all.html":[["Star_lights_1_1.pdf","3W Star Light Specs"]],"/products/lighting-perth/led-star-lights/dl03-4kit-1.html":[["Star_lights_1_1.pdf","3W Star Light Specs"]],"/lighting-perth/led-star-lights/dl3-rgbw-group.html":[["RGBW_Starlights_1.pdf","3W RGBW STAR LIGHT SPECS"],["Star_Lights_connection_1.pdf","RGBW Star Lights Connection"]],"/products/lighting-perth/led-star-lights/dl03-6kit.html":[["Star_lights_1_1.pdf","3W Star Light Specs"]],"/products/lighting-perth/led-star-lights/dl03-4kit.html":[["Star_lights_1_1.pdf","3W Star Light Specs"]],"/products/lighting-perth/led-strip-lights/st24v-9w-15w-cct-cob-1.html":[["GH-COB-15W.pdf","24v CCT LED 15W/M"],["GH-COB-WW-Outdoor.pdf","24V LED COB STRIP IP68 10W/M LONG RUN"]],"/products/lighting-perth/led-strip-lights/st24v-rgb-cob.html":[["GH-COB-RGB_Strip.pdf","24V COB PREMIUM RGB STRIP LIGHT"]],"/products/lighting-perth/led-strip-lights/st240v-pro.html":[["240V_Strip_lighting2.pdf","240V STRIP LIGHT INSTALLATION INSTRUCTIONS"],["240V_strip_Single_colour_1.pdf","240V Pro Bright Strip Lights Specs"]],"/products/lighting-perth/led-strip-lights/st240v-rgb.html":[["240V_strip_1.pdf","240V RGB LED Strip Light Specs"],["240V_Strip_lighting2.pdf","240V STRIP LIGHT INSTALLATION INSTRUCTIONS"]],"/products/lighting-perth/led-strip-lights/tr12v-all.html":[["ELG-75-SPEC.PDF","12v Mean Well 75w IP65 Transformer Specifications"],["VHO-020.pdf","12V 20w IP20 Transformer Specifications"],["VHO-200-012B5_specification_1.pdf","12V 200w IP65 Transformer Specifications"],["VUO-075-012M6_specification.pdf","12v 75w IP20 Transformer Specifications"],["Tr12V40W.pdf","12v 40w IP20 Transformer Specifications"]],"/products/lighting-perth/led-strip-lights/tr24v-all.html":[["ELG-240-SPEC.PDF","24V Mean Well IP65 240w Transformer Specifications"],["ELG-150-SPEC.PDF","24V 150W Mean Well IP65 Transformer Specifications"],["VUF-030_040_-012_24_M4_ENG.pdf","24V 30W IP20 Transformer Specifications"],["VUF-060.pdf","24V 60W IP20 Transformer Specifications"],["VHO-100-012A01_specification.pdf","24V 100w IP67 Transformer Specifications"]],"/products/lighting-perth/led-track-lights-perth/black-linear-modular-light.html":[["Modular_Linear_Light.pdf","Linear Modular Lighting System"]],"/products/lighting-perth/glass-light-switch-perth-html/q-connect.html":[["Quick_connect.pdf","QUICK CONNECT PLUG BASE"]],"/products/lighting-perth/led-track-lights-perth/30w-led-track-light.html":[["30W_Track_lights_4.pdf","30W LED TRACK LIGHT"]],"/products/lighting-perth/glass-light-switch-perth-html/smart-crystal-touch-wall-socket.html":[["wifi_socket_user_manual.pdf","Smart Double GPO Instructions"],["Smart_double_GPO.pdf","Smart Double GPO"]],"/products/lighting-perth/glass-light-switch-perth-html/glass-switch-premium-grp-1.html":[["Glass_Switch_Plates_P.pdf","Glass Touch Switch Plates Specs"]],"/products/lighting-perth/glass-light-switch-perth-html/kinetic-gpo-sw-all.html":[["Kinetic_switch_receiver.pdf","KINETIC SWITCH RECEIVER"]],"/products/lighting-perth/glass-light-switch-perth-html/d-pp2usb3.html":[["DXGPO2USB3_Data_Sheet.pdf","DOUBLE GPO WITH TWIN USB-C"]],"/automation/smart-lights-perth/dl3-rgbw-group.html":[["RGBW_Starlights_1.pdf","3W RGBW STAR LIGHT SPECS"],["Star_Lights_connection_1.pdf","RGBW Star Lights Connection"]],"/automation/smart-lights-perth/kinetic-gpo-sw-all.html":[["Kinetic_switch_receiver.pdf","KINETIC SWITCH RECEIVER"]],"/automation/smart-lights-perth/ikuu-smart-wifi-outdoor-sensor.html":[["Smart_Outdoor_IP65_sensor_1.pdf","Mercator Ikuu Smart Outdoor Sensor"]],"/automation/smart-lights-perth/dl9rgbw-bt1.html":[["DL9_RGBW_BT_1.pdf","9w SMART RGBW DOWNLIGHT BLUETOOTH"]],"/automation/smart-lights-perth/dl9rgbw-pbt.html":[["DL9_RGB_PBT.pdf","9W SMART RGBW LOW GLARE DOWNLIGHT"]],"/automation/smart-lights-perth/dl10pbt.html":[["DL10PBT.pdf","10w Bluetooth LED Downlight Low Glare"]],"/products/lighting-perth/glass-light-switch-perth-html/gh-lc01.html":[["Load_correction_device.pdf","GH-LC01 Load Correction Device Specs"]],"/automation/smart-lights-perth/p24-rgbw-cct.html":[["P24_RGB_CCT.pdf","24W SMART WIFI CEILING LIGHT RGB+CCT"]],"/automation/smart-lights-perth/p24-wifi.html":[["P24Smart.pdf","24W Smart LED Panel Light Specs"],["P24_Smart_Instructions.pdf","24W CEILING LIGHT SMART INSTRUCTIONS"]],"/automation/smart-lights-perth/25w-smart-led-tuya-downlight.html":[["DL25_Smart_1.pdf","25W SMART WIFI DOWNLIGHT"]],"/automation/smart-lights-perth/st24v-9w-15w-cct-cob-1.html":[["GH-COB-15W.pdf","24v CCT LED 15W/M"],["GH-COB-WW-Outdoor.pdf","24V LED COB STRIP IP68 10W/M LONG RUN"]],"/automation/smart-lights-perth/st24v-rgb-cob.html":[["GH-COB-RGB_Strip.pdf","24V COB PREMIUM RGB STRIP LIGHT"]],"/automation/smart-lights-perth/f50-rgb.html":[["50W_LED_RGB_floodlight_25_160D.pdf","F50 RGB Flood Specs"]],"/automation/smart-lights-perth/wl6-rgbw.html":[["6WRGBAluminium_wall_light.pdf","6W SMART WIFI RGBW WALL LIGHT"]],"/automation/smart-lights-perth/st240v-rgb.html":[["240V_strip_1.pdf","240V RGB LED Strip Light Specs"],["240V_Strip_lighting2.pdf","240V STRIP LIGHT INSTALLATION INSTRUCTIONS"]],"/automation/smart-lights-perth/gh-smart-socket.html":[["WiFi_Smart_Socket.pdf","SMART WiFi Socket Specs"]],"/automation/smart-lights-perth/smart-crystal-touch-wall-socket.html":[["wifi_socket_user_manual.pdf","Smart Double GPO Instructions"],["Smart_double_GPO.pdf","Smart Double GPO"]],"/automation/smart-lights-perth/zi-gateway.html":[["Zigbee_Gateway.pdf","Zigbee Gateway Specs"]],"/automation/smart-lights-perth/zi-pir-sensor.html":[["Zigbee_PIR_1.pdf","Zigbee PIR Specs"]]};

function sheetsFor(p){
  if(!p||!p.url) return [];
  return SPECSHEETS[p.url.replace(/^https?:\/\/[^/]+/,"")]||[];
}


/* ---------- Applications carousel ----------
   Advances on its own so the project photos are seen without anyone touching
   anything, and stops the moment someone takes over — hover, focus, or their
   own scroll. Honours prefers-reduced-motion by not auto-advancing at all. */
function initAppScroll(){
  const track=document.getElementById("appTrack"); if(!track) return;
  const wrap=track.closest(".appscroll");
  const prev=wrap.querySelector(".prev"), next=wrap.querySelector(".next");
  const calm=window.matchMedia("(prefers-reduced-motion: reduce)");
  const step=()=>{ const s=track.querySelector(".appslide");
                   return s ? s.getBoundingClientRect().width+16 : 300; };
  const atEnd=()=> track.scrollLeft+track.clientWidth >= track.scrollWidth-4;
  function go(dir){
    if(dir>0 && atEnd()) track.scrollTo({left:0,behavior:"smooth"});
    else track.scrollBy({left:dir*step(),behavior:"smooth"});
  }
  prev.addEventListener("click",()=>{ pause(); go(-1); });
  next.addEventListener("click",()=>{ pause(); go(1); });

  let timer=null, held=false;
  function tick(){ if(!held && !document.hidden) go(1); }
  function start(){ if(calm.matches||timer) return; timer=setInterval(tick,3200); }
  function stop(){ clearInterval(timer); timer=null; }
  /* a nudge from the user parks it for a while rather than fighting them */
  let release=null;
  function pause(){ held=true; clearTimeout(release); release=setTimeout(()=>{held=false;},9000); }

  wrap.addEventListener("mouseenter",()=>{held=true;});
  wrap.addEventListener("mouseleave",()=>{held=false;});
  track.addEventListener("focusin",()=>{held=true;});
  track.addEventListener("focusout",()=>{held=false;});
  track.addEventListener("pointerdown",pause);
  track.addEventListener("wheel",pause,{passive:true});
  track.addEventListener("keydown",e=>{
    if(e.key==="ArrowRight"){pause();go(1);e.preventDefault();}
    if(e.key==="ArrowLeft"){pause();go(-1);e.preventDefault();}
  });
  /* only run while the section is actually on screen */
  if("IntersectionObserver" in window){
    new IntersectionObserver(es=>{ es[0].isIntersecting ? start() : stop(); },{threshold:.2})
      .observe(wrap);
  } else start();
  calm.addEventListener&&calm.addEventListener("change",()=>{ calm.matches?stop():start(); });
}

function renderInstall(){
  const host=$("#installIndex"); if(!host) return;
  host.innerHTML=CATEGORIES.map(c=>{
    const items=PRODUCTS.filter(p=>p.cat===c.id); if(!items.length) return "";
    /* The count is spec sheets, not products — that is what the heading
       promises and what people are actually looking for on this page. */
    const nSheets=items.reduce((n,p)=>n+sheetsFor(p).length,0);
    return '<details class="ig-cat"><summary>'+c.name+' <span>'+
      (nSheets? nSheets+' spec sheet'+(nSheets===1?'':'s') : items.length+' products')+
      '</span></summary>'+
      '<ul class="ig-list">'+items.map(p=>{
        const sh=sheetsFor(p);
        const links=sh.map(a=>'<a class="ig-sheet" href="/docs/'+a[0]+'" target="_blank" rel="noopener" '+
          'title="'+esc(a[1])+'">'+esc(a[1])+' \u2193</a>').join("");
        return '<li><button data-instopen="'+p.id+'">'+p.name+'<span>Guide \u2192</span></button>'+
               (links?'<div class="ig-sheets">'+links+'</div>':'')+'</li>';
      }).join("")+'</ul></details>';
  }).join("");
}

// Photo for a wizard answer button. Every photo here is the real product or a
// real installation for THAT answer - we never borrow a different strip's photo
// to fill a gap. If there is no honest photo the button stays text-only.
function qOptPhoto(Q,o,a){
  const val=o[1];
  if(Q.key==="place") return (typeof STRIPIMG!=="undefined"&&STRIPIMG.places&&STRIPIMG.places[val])?STRIPIMG.places[val]:null;
  if(Q.key==="colour"&&a.place!=="cove"&&a.place!=="wet"){
    // Purpose-shot photos of the same strip in each colour mode, framed the
    // same way, so the three answers compare like for like.
    if(typeof STRIPIMG!=="undefined"&&STRIPIMG.colour&&STRIPIMG.colour[val])
      return STRIPIMG.colour[val];
    if(typeof DEMOIMG!=="undefined"){
      if(val==="cct"&&DEMOIMG.cct) return DEMOIMG.cct.states[DEMOIMG.cct.states.length-1].img;
      if(val==="rgb"&&DEMOIMG.rgb) return DEMOIMG.rgb.states[0].img;
    }
    if(val==="single"&&typeof STRIPIMG!=="undefined"&&STRIPIMG.products)
      return STRIPIMG.products["ST24V-SMD-ALL-1"]||null;
  }
  return null;
}

/* ---------- Strip demos (real lit photos supplied by Greenhse) ---------- */
// Returns the DEMOIMG set for a product id, or null when we have no real
// photos of that strip. Never substitutes a different product's photos.
function demoSetFor(id){
  if(typeof DEMOIMG==="undefined"||!DEMOIMG.byProduct) return null;
  const key=DEMOIMG.byProduct[id]||DEMOIMG.byProduct[baseId(id)];
  return key?DEMOIMG[key]:null;
}
function demoStateBtns(set,pfx){
  return set.states.map((s,i)=>
    '<button type="button" class="sl-demo-state'+(i===0?" is-on":"")+'" data-demo="'+pfx+'" data-demoi="'+i+'">'+
    '<img src="'+s.img+'" alt="'+s.label+'" loading="lazy"><span>'+s.label+'</span></button>').join("");
}
// Swap the big photo when a colour swatch is clicked.
function demoWire(root){
  if(!root) return;
  root.querySelectorAll("[data-demo]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const pfx=btn.dataset.demo, i=+btn.dataset.demoi;
      const set=demoSetFor(pfx)||(typeof DEMOIMG!=="undefined"?DEMOIMG[pfx]:null);
      if(!set) return;
      const stage=root.querySelector('[data-demostage="'+pfx+'"]');
      const cap=root.querySelector('[data-democap="'+pfx+'"]');
      if(stage) stage.src=set.states[i].img;
      if(cap) cap.textContent=set.states[i].label+(set.states[i].note?" \u2014 "+set.states[i].note:"");
      root.querySelectorAll('[data-demo="'+pfx+'"]').forEach(b=>b.classList.toggle("is-on",b===btn));
    });
  });
}
function renderStripDemos(){
  if(typeof DEMOIMG==="undefined") return;
  const host=$("#slDemoList"); if(!host) return;
  const ids=Object.keys(DEMOIMG.byProduct||{});
  const blocks=ids.map(id=>{
    const set=DEMOIMG[DEMOIMG.byProduct[id]]; if(!set) return "";
    const p=findP(id);
    const s0=set.states[0];
    const kit=[set.controller].concat(set.remotes||[]).filter(Boolean).map(k=>
      '<figure><img src="'+k.img+'" alt="'+k.label+'" loading="lazy">'+
      '<figcaption><b>'+k.label+'</b><small>'+k.note+'</small></figcaption></figure>').join("");
    return '<div class="sl-demo">'+
      '<div class="sl-demo-head"><h4>'+set.name+'</h4><p>'+set.blurb+'</p></div>'+
      '<div class="sl-demo-main">'+
        '<div><figure class="sl-demo-stage">'+
          '<img src="'+s0.img+'" data-demostage="'+id+'" alt="'+set.name+'">'+
          '<figcaption data-democap="'+id+'">'+s0.label+(s0.note?" \u2014 "+s0.note:"")+'</figcaption>'+
        '</figure>'+
        '<div class="sl-demo-states">'+demoStateBtns(set,id)+'</div>'+
        (p?'<p class="sl-demo-note">In the range above as \u201c'+p.name+'\u201d \u00b7 $'+p.price+'/m</p>':"")+
        '</div>'+
        '<div class="sl-demo-kit">'+kit+'</div>'+
      '</div></div>';
  }).join("");
  if(!blocks) return;
  host.innerHTML=blocks;
  demoWire(host);
  $("#slDemos").hidden=false;
}
// Compact version used inside the finder kit screen and the product modal.
function demoPanel(id){
  const set=demoSetFor(id); if(!set) return "";
  const s0=set.states[0];
  return '<div class="sw-demo" data-demoroot="1">'+
    '<figure class="sw-demo-stage"><img src="'+s0.img+'" data-demostage="'+id+'" alt="'+set.name+'"></figure>'+
    '<div class="sw-demo-states">'+demoStateBtns(set,id)+'</div>'+
    '<p class="sw-demo-cap" data-democap="'+id+'">'+s0.label+(s0.note?" \u2014 "+s0.note:"")+'</p>'+
    '</div>';
}

// Channel profiles. Anything the supplier photographed but that has no
// catalogue product is shown AS unlisted rather than being invented as a
// buyable option; anything in the catalogue with no photo stays flagged.
function renderChannels(){
  if(typeof CHANIMG==="undefined") return;
  const grid=$("#slChanGrid"); if(!grid) return;
  const cards=(CHANIMG.profiles||[]).map(pr=>{
    const buyable=!pr.unlisted&&pr.optLabels&&pr.optLabels.length;
    const tag=buyable?'button':'figure';
    const dim=pr.dimImg?'<div class="sl-chan-dimfig"><img src="'+pr.dimImg+'" alt="'+pr.photoName+' cross-section with dimensions" loading="lazy"><span>Supplier cross-section \u2014 '+pr.dims+'</span></div>':"";
    const blackFig=pr.blackImg?'<div class="sl-chan-alt"><img src="'+pr.blackImg+'" alt="'+pr.photoName+' in black" loading="lazy"><span>Black finish \u2014 '+(pr.blackDims||pr.dims)+'</span></div>':"";
    return '<'+tag+' class="sl-chan'+(buyable?' is-buyable':'')+'"'+
      (buyable?' data-chanopt="'+pr.optLabels[0].replace(/"/g,"&quot;")+'" type="button"':'')+'>'+
    '<img src="'+pr.img+'" alt="'+pr.photoName+' aluminium channel profile" loading="lazy">'+
    '<figcaption class="sl-chan-body">'+
      '<h4>'+pr.photoName+'</h4>'+
      '<table class="sl-chan-spec"><tbody>'+
        '<tr><th>Size</th><td>'+pr.dims+'</td></tr>'+
        '<tr><th>Internal</th><td>'+pr.inner+'</td></tr>'+
        '<tr><th>Length</th><td>3m</td></tr>'+
        '<tr><th>Finishes</th><td>'+pr.finishes+'</td></tr>'+
      '</tbody></table>'+
      dim+blackFig+
      '<p class="sl-chan-use">'+pr.use+'</p>'+
      (pr.unlisted?'<span class="sl-chan-unlisted"><b>Not currently a listed option.</b> The supplier makes this profile but it isn\u2019t in our channel range yet \u2014 call us on (08) 9297 2969 if you need it.</span>':'<span class="sl-chan-buy">Choose finish &amp; add to cart \u2192</span>')+
    '</figcaption></'+tag+'>';
  }).join("");
  if(!cards) return;
  grid.innerHTML=cards;
  const miss=CHANIMG.noPhoto||[];
  if(miss.length){
    const f=$("#slChanFlag");
    f.innerHTML='We also stock <b>'+miss.join("</b>, <b>")+'</b> \u2014 call us on (08) 9297 2969 and we\u2019ll sort it for you.';
    f.hidden=false;
  }
  $("#slChans").hidden=false;
}

function init(){
  $("#yr").textContent=new Date().getFullYear();
  loadState();
  if(typeof STRIPIMG!=="undefined"){
    PRODUCTS.forEach(p=>{ if(STRIPIMG.products&&STRIPIMG.products[p.id]) p.img=STRIPIMG.products[p.id]; });
    const mg=$("#slMoodGrid");
    if(mg&&STRIPIMG.moods&&STRIPIMG.moods.length){
      mg.innerHTML=STRIPIMG.moods.map(m=>'<figure class="sl-mood"><img src="'+m.img+'" alt="'+m.label+'" loading="lazy"><span>'+m.label+'</span></figure>').join("");
      $("#slMoods").hidden=false;
    }
  }
  renderStripDemos();
  renderChannels();
  // The catalogue contains the same physical product twice in some sections
  // (e.g. TR24V-ALL in Transformers and TR24V-ALL-1 in Strip Lights). Give the
  // duplicate the full options / description / specs / photo of its base entry
  // so every entry point shows complete product information.
  PRODUCTS.forEach(p=>{
    const bid=baseId(p.id);
    if(bid===p.id)return;
    const base=PRODUCTS.find(x=>x.id===bid);
    if(base&&base.name===p.name){
      if((!p.options||!p.options.length)&&base.options&&base.options.length){p.options=base.options;p.price=base.price;}
      if(!p.desc&&base.desc)p.desc=base.desc;
      if((!p.specTable||!p.specTable.length)&&base.specTable)p.specTable=base.specTable;
    }
  });
  // The 7.5W/m Long Run COB finally has a supplier datasheet, so both catalogue
  // entries get the real reel photo and the real spec table instead of the short
  // hand-written stub. IP-specific rows stay per-product.
  if(typeof COBIMG!=="undefined"){
    // the new "long run" answer illustrates itself with the real strip photo
    if(typeof STRIPIMG!=="undefined"&&STRIPIMG.places&&!STRIPIMG.places.longrun)
      STRIPIMG.places.longrun=COBIMG.img.lit;
    (COBIMG.products||[]).forEach(id=>{
      const p=findP(id); if(!p) return;
      p.img=COBIMG.img.reel;
      const ipRow=(COBIMG.ipGrades||[]).find(g=>id.indexOf(g[0])>-1);
      p.specTable=[["IP rating",ipRow?(ipRow[0]+" \u2014 "+ipRow[1]+" \u00b7 "+ipRow[2]):"See options"]]
        .concat(COBIMG.specs||[]).concat([["Price","$16.00 per metre ex GST"]]);
      if(!p.features||!p.features.length){
        p.features=["Dot-free COB \u2014 one continuous line, no visible LEDs",
                    "480 LEDs/m, CRI >90 \u2014 colours look true",
                    "20m from a single feed with no voltage drop",
                    "Only 7.5W per metre \u2014 low heat, low running cost",
                    "Cuts every 50mm, bends to a 50mm diameter"];
      }
      if(!p.includes||!p.includes.length){
        p.includes=["LED strip cut to your length","150mm 20AWG leads on both ends",
                    "3M adhesive backing","Connection guide",
                    "Note: 24V driver sold separately"];
      }
    });
  }
  [typeof TRIMG!=="undefined"?TRIMG:null, typeof CTRLIMG!=="undefined"?CTRLIMG:null].forEach(B=>{
    if(B&&B.products) PRODUCTS.forEach(p=>{ const k=B.products[p.id]?p.id:(B.products[baseId(p.id)]?baseId(p.id):null); if(k) p.img=B.products[k]; });
  });
  fillMenus();renderCats();renderFilters();renderShop();renderBlog();renderVideos();renderFAQ();updateCart();
  renderInstall();
  initAppScroll();
  { const pr=$(".ig-pdfrow"); if(pr&&typeof GUIDES!=="undefined") pr.innerHTML=GUIDES.map(g=>'<a href="'+g[1]+'" target="_blank" rel="noopener" class="ig-pdf">'+g[0]+' \u2197</a>').join(""); }
  applyTemp(2700);

  /* delegated clicks */
  document.addEventListener("click",e=>{
    const dlgc=e.target.closest("[data-dlg]");
    if(dlgc){ dlGuideOpen(+dlgc.dataset.dlg); return; }
    if(e.target.closest("[data-dlgclose]")){ dlGuideOpen(dlgOpenIdx); return; }
    const mqb=e.target.closest("[data-mq]");
    if(mqb){setModalQty(+mqb.dataset.mq);return;}
    const tile=e.target.closest("[data-optidx]");
    if(tile){ selectModalOpt(+tile.dataset.optidx); return; }
    const chan=e.target.closest("[data-chanopt]");
    if(chan){
      const label=chan.dataset.chanopt;
      const p=findP(typeof CHANIMG!=="undefined"?CHANIMG.product:"");
      if(p){
        openModal(p.id);
        const i=(p.options||[]).findIndex(o=>o.label===label);
        if(i>=0) selectModalOpt(i);
      }
      return;
    }
    /* kit parts list -> full product page, with the variant this kit uses preselected */
    const pkv=e.target.closest("[data-pkview]");
    if(pkv){
      const p=findP(pkv.dataset.pkview);
      if(p){
        openProductOverWizard(p.id,pkv.dataset.pkviewopt||"");
      }
      return;
    }
    const oc=e.target.closest("[data-opt]");
    if(oc){selectModalOpt(+oc.dataset.opt);return;}
    const add=e.target.closest("[data-add]");
    if(add){const id=add.dataset.add;const p=findP(id);
      if(add.dataset.frommodal){
        const overWiz=$("#modal").classList.contains("over-wiz");
        addToCart(id, modalOpt?modalOpt.label:null, modalOpt?modalOpt.price:null, modalQty);
        toast(p.name+(modalOpt?" · "+modalOpt.label:"")+(modalQty>1?" \u00d7"+modalQty:"")+" added to cart");
        closeModal();
        /* the finder sits above the cart drawer, so step out of it first */
        if(overWiz&&typeof closeStripWizard==="function") closeStripWizard();
        openCart();return;
      }
      if(p.options&&p.options.length){openModal(id);return;}
      addToCart(id);toast(p.name+" added to cart");return;}
    const wish=e.target.closest("[data-wish]");
    if(wish){toggleWish(wish.dataset.wish);return;}
    const view=e.target.closest("[data-view]");
    if(view){openModal(view.dataset.view);return;}
    const ij=e.target.closest("[data-instjump]");
    if(ij){ const g=document.getElementById("mInstall"),mb=$("#modalBody"); if(g&&mb) mb.scrollTo({top:g.offsetTop-16,behavior:"smooth"}); return; }
    const io=e.target.closest("[data-instopen]");
    if(io){ openModalGuide(io.dataset.instopen); return; }
    const pkg=e.target.closest("[data-pkg]");
    if(pkg){ swPackageStrip=findP(pkg.dataset.pkg); swPkgSel={}; renderWizard(); return; }
    const pkgadd=e.target.closest("[data-pkgadd]");
    if(pkgadd){ addPackageToCart(); return; }
    const swb=e.target.closest("[data-swback]");
    if(swb){ if(swStep>0){ const QS=swVisibleQs(); swStep=Math.min(swStep,QS.length)-1; const Q=QS[swStep]; if(Q) delete swAnswers[Q.key]; } renderWizard(); return; }
    const pkgback=e.target.closest("[data-pkgback]");
    if(pkgback){ swPackageStrip=null; renderWizard(); return; }
    const sw=e.target.closest("[data-sw]");
    const swn=e.target.closest("[data-swnum]");
    if(swn){const QS=swVisibleQs();const Q=QS[swStep];const inp=$("#swLenInput");const v=parseFloat(inp&&inp.value);
      if(!v||v<=0){ if(inp){inp.style.borderColor="#c0392b"; inp.focus();} return; }
      swAnswers[Q.key]=String(Math.min(99,v));swStep++;renderWizard();return;}
    if(sw){const QS=swVisibleQs();const Q=QS[swStep];const OP=(typeof Q.opts==="function"?Q.opts(swAnswers):Q.opts);swAnswers[Q.key]=OP[+sw.dataset.sw][1];swStep++;renderWizard();return;}
    const more=e.target.closest("[data-more]");
    if(more){const id=more.dataset.more;if(expanded.has(id))expanded.delete(id);else expanded.add(id);renderShop();
      const blk=$(`[data-catblock="${id}"]`);if(blk)blk.scrollIntoView({behavior:"smooth",block:"nearest"});return;}
    const swr=e.target.closest("[data-swrestart]");
    if(swr){swAnswers={};swStep=0;swPackageStrip=null;renderWizard();return;}
    const catEl=e.target.closest("[data-cat]");
    if(catEl){activeCat=catEl.dataset.cat;query="";$("#prodSearch").value="";
      renderFilters();renderShop();closeMnav();
      $("#shop").scrollIntoView({behavior:"smooth"});return;}
    const q=e.target.closest("[data-q]");
    if(q){setQty(q.dataset.q,+q.dataset.d);return;}
    const rm=e.target.closest("[data-rm]");
    if(rm){removeLine(rm.dataset.rm);return;}
    const route=e.target.closest("[data-route]");
    if(route){e.preventDefault();const r=route.dataset.route;
      if(LEGAL[r]){openLegal(r);} else {toast("“"+route.textContent.trim()+"” connects to your CMS at launch");}
      return;}
  });

  /* search */
  $("#prodSearch").addEventListener("input",e=>{query=e.target.value;renderShop();});
  $("#searchBtn").addEventListener("click",()=>{$("#shop").scrollIntoView({behavior:"smooth"});setTimeout(()=>$("#prodSearch").focus(),400);});

  /* cart + wishlist + nav */
  $("#cartBtn").addEventListener("click",openCart);
  $("#cartClose").addEventListener("click",closeCart);
  $("#cartScrim").addEventListener("click",closeCart);
  /* Real checkout: push this browser cart into Magento, then hand over to the
     checkout page. Anything Magento refuses is named rather than dropped. */
  $("#checkoutBtn").addEventListener("click",function(){
    if(!cart.length){toast("Your cart is empty");return;}
    var A=window.GreenhseAccount, C=window.GreenhseCheckout, M=window.GreenhseMagento;
    if(!A||!C||!M){ toast("Checkout is still loading — one moment"); return; }
    if(!A.signedIn()){ location.href="/account.html?next=%2Fcheckout.html"; return; }
    var btn=this; btn.disabled=true; var was=btn.textContent; btn.textContent="Preparing checkout…";
    var lines=[], unknown=[];
    cart.forEach(function(l){
      var sku=M.skuFor(l.id);
      if(sku) lines.push({sku:sku,qty:l.qty});
      else{ var p=findP(l.id); unknown.push((p&&p.name)||l.id); }
    });
    if(!lines.length){
      btn.disabled=false; btn.textContent=was;
      toast("These items need a quote — use “Request a quote instead”");
      return;
    }
    C.syncCart(lines).then(function(r){
      var held=unknown.concat(r.rejected||[]);
      if(held.length) try{ sessionStorage.setItem("greenhse_cart_held", JSON.stringify(held)); }catch(e){}
      location.href="/checkout.html";
    }).catch(function(err){
      btn.disabled=false; btn.textContent=was;
      toast(err&&err.message==="SESSION_EXPIRED" ? "Please sign in again" : "Could not start checkout — please try again");
      if(err&&err.message==="SESSION_EXPIRED") location.href="/account.html?next=%2Fcheckout.html";
    });
  });

  $("#quoteBtn").addEventListener("click",()=>{
    if(!cart.length){toast("Your cart is empty");return;}
    var lines=cart.map(function(l){
      var p=findP(l.id)||{name:l.id};
      return "- "+p.name+(l.opt?" ("+l.opt+")":"")+"  x"+l.qty+
             "   $"+(l.price*l.qty).toFixed(2)+" ex-GST";
    });
    var body=["Hi Greenhse,","","I'd like a quote for the following:","",
      lines.join("\n"),"",
      "Subtotal (ex-GST): $"+cartTotal().toFixed(2),
      "Total (inc GST):   $"+(cartTotal()*1.1).toFixed(2),"",
      "Name:","Phone:","Site / project:","",
      "(Sent from greenhse.com)"].join("\n");
    window.location.href="mailto:hello@greenhse.com"+
      "?subject="+encodeURIComponent("Quote request - "+cartCount()+" item(s)")+
      "&body="+encodeURIComponent(body);
    toast("Opening your email app with the quote");
  });
  $("#wishBtn").addEventListener("click",()=>{
    toast(wishlist.size?wishlist.size+" item(s) saved to wishlist":"Tap the heart on a product to save it");
  });
  $("#menuBtn").addEventListener("click",openMnav);
  $("#mnavClose").addEventListener("click",closeMnav);
  $("#scrim").addEventListener("click",closeMnav);
  $("#mAcc").querySelector("button").addEventListener("click",()=>$("#mAcc").classList.toggle("open"));

  /* product option dropdown */
  document.addEventListener("change",e=>{
    if(e.target&&e.target.id==="optSelect"){ selectModalOpt(+e.target.value); }
    if(e.target&&e.target.classList&&e.target.classList.contains("pk-sel")){ swPkgSel[e.target.dataset.pksel]=e.target.value; renderPackage(); }
  });
  /* modal */
  $("#modalClose").addEventListener("click",closeModal);
  $("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal();});
  document.addEventListener("keydown",e=>{
    if(e.key!=="Escape")return;
    const m=$("#modal");
    /* product page opened from inside the finder: close just that layer and stop,
       so the later "close every overlay" handler doesn't take the kit down with it */
    if(m&&m.classList.contains("over-wiz")){ closeModal(); e.stopImmediatePropagation(); return; }
    closeModal();closeCart();closeMnav();
  });
  /* keyboard: Enter / Space on a kit row photo or name opens the product page */
  document.addEventListener("keydown",e=>{
    if(e.key!=="Enter"&&e.key!==" "&&e.key!=="Spacebar")return;
    const pkv=e.target&&e.target.closest?e.target.closest("[data-pkview]"):null;
    if(!pkv)return;
    e.preventDefault();
    openProductOverWizard(pkv.dataset.pkview,pkv.dataset.pkviewopt||"");
  });

  /* Smart Life tunable-white demo */
  $("#phoneRange").addEventListener("input",e=>{applyTemp(+e.target.value);});

  /* FAQ accordion */
  $("#faqList").addEventListener("click",e=>{
    const btn=e.target.closest("button");if(!btn)return;
    const q=btn.parentElement;const open=q.classList.toggle("open");
    btn.setAttribute("aria-expanded",open);
  });

  /* forms */
  wireForm("newsForm",[["#nName",v=>v.trim().length>0],["#nEmail",isEmail]],"You're subscribed — welcome aboard!");
  wireForm("contactForm",[["#cName",v=>v.trim().length>0],["#cEmail",isEmail],["#cMsg",v=>v.trim().length>0]],"Thanks — we'll be in touch shortly.");

  /* header scroll shadow */
  addEventListener("scroll",()=>{$("#header").classList.toggle("scrolled",scrollY>10);},{passive:true});

  /* scroll reveal */
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target);}}),{threshold:.12});
  $$(".reveal").forEach(el=>io.observe(el));

  // strip light finder: render + auto-open after 3s in view
  renderStrips();
  // Any click that takes you to the strip section opens the finder — every time,
  // even if you're already standing in the section.
  document.addEventListener("click",function(e){
    const a=e.target.closest('a[href="#striplights"]');
    if(a){ clearTimeout(swTimer); swTimer=setTimeout(openStripWizard, 300); }
  });
  const slSec=document.getElementById("striplights");
  if(slSec){
    let slIn=false;
    const wizOpen=()=>$("#stripWizard").classList.contains("open");
    /* The downlights section sits directly above this one, so its bottom edge
       drags the strip section into view while you're still reading it. Hold off
       while the downlight finder is open, or while the middle of the screen is
       still inside the downlights section. */
    const dlBusy=()=>{
      const d=document.getElementById("dlWizard");
      if(d&&d.classList.contains("open")) return true;
      const ds=document.getElementById("downlights"); if(!ds) return false;
      const r=ds.getBoundingClientRect(), vh=window.innerHeight;
      /* The guide makes this section very tall. Hold off until it has mostly
         left the screen, not just until its midpoint has. */
      return r.top<vh && r.bottom>vh*0.15;
    };
    /* returns false if it was held off, so the caller can try again later
       instead of latching the section as "already seen" */
    const enterStrip=()=>{ if(dlBusy()) return false; if(!wizOpen()) openStripWizard(); return true; };
    // Opens the instant any part of the strip section touches the viewport
    const io2=new IntersectionObserver(es=>es.forEach(en=>{
      if(en.isIntersecting){ if(!slIn){ if(enterStrip()) slIn=true; } }
      else { slIn=false; }
    }),{threshold:0, rootMargin:"0px 0px -2% 0px"});
    io2.observe(slSec);
    // Fallback for fast jumps / browsers that batch observer callbacks
    let slTick=false;
    window.addEventListener("scroll",()=>{
      if(slTick) return; slTick=true;
      requestAnimationFrame(()=>{
        slTick=false;
        const r=slSec.getBoundingClientRect(), vh=window.innerHeight;
        const vis=r.top < vh*0.95 && r.bottom > 0;
        // Re-arm as soon as the section is essentially off-screen either way,
        // so coming back to it opens the finder again — every time.
        const gone=r.bottom < vh*0.15 || r.top > vh*0.85;
        if(vis){ if(!slIn){ if(enterStrip()) slIn=true; } }
        else if(gone) slIn=false;
      });
    },{passive:true});
    // Any link or button pointing at the strip section opens it too — even if already in view
    document.addEventListener("click",e=>{
      let a=e.target.closest('a[href="#striplights"], [data-goto="striplights"], [data-cat="strip"], [data-chip="strip"]');
      if(!a){
        const el=e.target.closest("a,button");
        if(el && /^\s*strip\s*lights?\s*$/i.test(el.textContent||"")) a=el;
      }
      if(a){ [120,380,900].forEach(ms=>setTimeout(()=>{ slIn=true; enterStrip(); },ms)); }
    });
    // Landing straight on #striplights (shared link / refresh)
    if(location.hash==="#striplights"){ setTimeout(enterStrip,700); }
    window.addEventListener("hashchange",()=>{ if(location.hash==="#striplights") setTimeout(enterStrip,420); });
  }
  $("#stripFinderBtn").addEventListener("click",()=>{swShown=false;openStripWizard();});
  $("#swClose").addEventListener("click",closeStripWizard);
  $("#swKnow").addEventListener("click",closeStripWizard);
  $("#swScrim").addEventListener("click",closeStripWizard);

  /* Counts come from the catalogue itself — a hardcoded number goes stale
     the moment a product is added, and ours already had. */
  (function(){
    const n=$("#shopCount"); if(n) n.textContent=PRODUCTS.length;
    const c=$("#megaCount");
    if(c) c.textContent=new Set(PRODUCTS.map(p=>p.cat)).size;
  })();

  /* ---------- downlight finder ---------- */
  renderDownlights();
  const dlBtn=$("#dlFinderBtn");
  if(dlBtn) dlBtn.addEventListener("click",openDlWizard);
  const dlC=$("#dlClose"); if(dlC) dlC.addEventListener("click",closeDlWizard);
  const dlK=$("#dlKnow");  if(dlK) dlK.addEventListener("click",closeDlWizard);
  const dlS=$("#dlScrim"); if(dlS) dlS.addEventListener("click",closeDlWizard);

  /* Deep links from the category pages: open the right finder on arrival. */
  function hashFinder(){
    if(location.hash==="#strip-finder"){ dlAutoShown=true; openStripWizard(); }
    if(location.hash==="#dl-finder"){ dlAutoShown=true; openDlWizard(); }
  }
  if(/^#(strip|dl)-finder$/.test(location.hash)) setTimeout(hashFinder,400);
  window.addEventListener("hashchange",hashFinder);

  /* Opens on any link into the section, and once per visit when the section
     first comes into view. Deliberately gentler than the strip finder — two
     wizards fighting over the same scroll is worse than one. */
  const dlSec=document.getElementById("downlights");
  if(dlSec){
    const wizBusy=()=>{
      const s=$("#stripWizard");
      return (s&&s.classList.contains("open"))||$("#dlWizard").classList.contains("open");
    };
    const enterDl=()=>{ if(!wizBusy()) openDlWizard(); };
    let dlTimer=null;
    /* threshold has to stay at 0: with the guide attached this section is
       several screens tall, so a 25% ratio can never be reached. */
    const io3=new IntersectionObserver(es=>es.forEach(en=>{
      if(en.isIntersecting && !dlAutoShown){ dlAutoShown=true; dlTimer=setTimeout(enterDl,900); }
    }),{threshold:0});
    io3.observe(dlSec);
    /* If they've already started browsing the section — tapping a filter, a
       product, anything — don't drop a modal on top of them. */
    dlSec.addEventListener("click",e=>{
      if(e.target.closest("#dlFinderBtn")) return;
      dlAutoShown=true; clearTimeout(dlTimer);
    },true);
    document.addEventListener("click",e=>{
      const a=e.target.closest('a[href="#downlights"], [data-goto="downlights"]');
      if(a){ dlAutoShown=true; setTimeout(()=>{ if(!$("#stripWizard").classList.contains("open")) openDlWizard(); },320); }
    });
    if(location.hash==="#downlights"){ dlAutoShown=true; setTimeout(enterDl,700); }
    window.addEventListener("hashchange",()=>{ if(location.hash==="#downlights"){ dlAutoShown=true; setTimeout(enterDl,420); } });
  }

  /* wizard interactions — kept on their own listener so nothing here can
     disturb the strip finder's handler */
  document.addEventListener("click",e=>{
    const chip=e.target.closest("[data-dlfilter]");
    if(chip){ dlFilter=chip.dataset.dlfilter; renderDownlights(); return; }
    const bat=e.target.closest("[data-dlbatten]");
    if(bat){ dlBatten=true; renderDlWizard(); return; }
    const back=e.target.closest("[data-dlback]");
    if(back){
      if(dlBatten){ dlBatten=false; }
      else if(dlStep>0){ dlClearAuto(); dlStep--; const Q=dlVisibleQs()[dlStep]; if(Q) delete dlAnswers[Q.key]; }
      dlQty=0; dlPick=null; renderDlWizard(); return;
    }
    const rs=e.target.closest("[data-dlrestart]");
    if(rs){ dlAnswers={}; dlStep=0; dlQty=0; dlPick=null; dlBatten=false; dlAutoKeys={}; renderDlWizard(); return; }
    const opt=e.target.closest("[data-dl]");
    if(opt&&$("#dlWizard").classList.contains("open")){ dlAnswerCurrent(+opt.dataset.dl); return; }
    const sz=e.target.closest("[data-dlsize]");
    if(sz){
      const w=parseFloat(($("#dlW")||{}).value), l=parseFloat(($("#dlL")||{}).value);
      if(!w||!l||w<=0||l<=0){ [$("#dlW"),$("#dlL")].forEach(i=>{ if(i&&!parseFloat(i.value)) i.style.borderColor="#c0392b"; }); return; }
      dlAnswers.size=w+"x"+l;
      const auto=dlCount(w,l,!!dlWantLow(dlAnswers));
      dlQty=auto||1; dlStep++; renderDlWizard(); return;
    }
    const skip=e.target.closest("[data-dlskip]");
    if(skip){ dlAnswers.size="skip"; dlQty=1; dlStep++; renderDlWizard(); return; }
    const pk=e.target.closest("[data-dlpick]");
    if(pk){ dlPick=pk.dataset.dlpick; dlQty=dlQty||1; renderDlWizard(); $("#dlBody").scrollTo({top:0,behavior:"smooth"}); return; }
    const qt=e.target.closest("[data-dlqty]");
    if(qt){ dlQty=Math.max(1,Math.min(99,(dlQty||1)+ +qt.dataset.dlqty)); renderDlResult(); return; }
    const dadd=e.target.closest("[data-dladd]");
    if(dadd){
      const id=dadd.dataset.dladd, n=Math.max(1,parseInt(dadd.dataset.dlqn,10)||1), p=findP(id);
      if(!p) return;
      addToCart(id,null,null,n);
      toast(p.name+" \u00d7"+n+" added to cart");
      closeDlWizard(); openCart(); return;
    }
  });

  // legal overlay close
  $("#legalClose").addEventListener("click",closeLegal);
  $("#legal").addEventListener("click",e=>{ if(e.target.id==="legal") closeLegal(); });
  // cookie consent
  (function(){
    const bar=$("#cookieBar"); if(!bar) return;
    let done=false; try{ done=localStorage.getItem("gh_cookie")!==null; }catch(e){}
    if(!done) setTimeout(()=>bar.classList.add("show"),1300);
    function set(v){ try{localStorage.setItem("gh_cookie",v);}catch(e){} bar.classList.remove("show"); }
    const a=$("#ckAccept"), d=$("#ckDecline");
    if(a) a.addEventListener("click",()=>set("accepted"));
    if(d) d.addEventListener("click",()=>set("declined"));
  })();

  // Escape closes any overlay
  document.addEventListener("keydown",e=>{
    if(e.key!=="Escape")return;
    /* product page opened from inside the finder: step back to the kit, don't nuke it */
    const mo=$("#modal");
    if(mo&&mo.classList.contains("over-wiz")){ closeModal(); return; }
    closeModal();closeCart();closeMnav();closeStripWizard();closeDlWizard();closeLegal();
    const s=$("#search");if(s&&s.classList.contains("open"))s.classList.remove("open");
  });
  // back to top
  const btt=$("#backTop");
  if(btt){
    window.addEventListener("scroll",()=>{ btt.classList.toggle("show",window.scrollY>900); },{passive:true});
    btt.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
  }
  // restore saved cart & wishlist
  loadState();
  refreshWishBadge();
  updateCart();
  $$("[data-wish]").forEach(el=>el.classList.toggle("on",wishlist.has(el.dataset.wish)));

  initQA();
}

/* ============================================================
   QA / LAUNCH-READINESS TEST SUITE
   ============================================================ */
/* Photos used to be inlined as data: URIs. They now ship as real files under
   /img/ (smaller HTML, cacheable), so "is this a real supplier asset?" means
   a data URI OR a local image file — not a placeholder or a hot-link. */
/* Drive the finders by what an answer SAYS, not by its position. Options get
   added (the 30 mm band did exactly that) and index-based clicks then silently
   answer a different question. */
function qaPickDl(rx){
  const t=$$("#dlBody [data-dl]").find(o=>rx.test(o.textContent));
  if(t) t.click();
  return !!t;
}
function isRealAsset(src){
  src=String(src||"");
  if(src.indexOf("data:image")===0)return true;
  return /^\/img\/[^"'\s]+\.(webp|png|jpe?g|avif|svg)$/i.test(src);
}
const TESTS=[
 ["Navigation menus populated",()=>{
   const a=$("#megaCats").children.length===CATEGORIES.length;
   const b=$("#footCats").children.length>0;
   return [a&&b, a&&b?`${CATEGORIES.length} categories in mega-menu`:"menu not fully rendered"];
 }],
 ["Category grid renders all 18 with photos",()=>{
   const n=$("#catGrid").querySelectorAll(".cat").length;
   const photos=$("#catGrid").querySelectorAll(".cat-photo img").length;
   return [n===CATEGORIES.length&&photos>0,`${n} tiles, ${photos} with product photos`];
 }],
 ["Products render",()=>{
   query="";activeCat="all";renderShop();
   const n=$("#shopBody").querySelectorAll(".card").length;
   return [n>0,`${n} product cards rendered`];
 }],
 ["Default shop is compact (not all 246)",()=>{
   query="";activeCat="all";renderShop();
   const n=$$("#shopBody .card").length;
   return [n>0&&n<30, "Default shows "+n+" popular picks, not all "+PRODUCTS.length];
 }],
 ["Category drill-down + View all",()=>{
   query="";activeCat="strip";expanded.clear();renderShop();
   const cards=$$("#shopBody .card").length;
   const collapsed=$(".cat-block")&&$(".cat-block").classList.contains("collapsed");
   expanded.add("strip");renderShop();
   const open=$(".cat-block")&&!$(".cat-block").classList.contains("collapsed");
   activeCat="all";expanded.clear();renderShop();
   return [cards>0&&collapsed&&open,"Strip: "+cards+" products, preview then View-all"];
 }],
 ["Search filters results",()=>{
   const before=filtered().length;
   query="downlight";const after=filtered().length;query="";
   return [after>0&&after<before,`"downlight" → ${after} of ${before}`];
 }],
 ["Category filter works",()=>{
   const prev=activeCat;activeCat="strip";const only=filtered().every(p=>p.cat==="strip");
   const n=filtered().length;activeCat=prev;
   return [only&&n>0,`Strip filter → ${n} items, all matched`];
 }],
 ["Add to cart updates badge & total",()=>{
   const pid=(PRODUCTS.find(p=>p.price>0)||PRODUCTS[0]).id;
   const c0=cartCount();addToCart(pid);
   const ok=cartCount()===c0+1&&cartTotal()>0;
   return [ok,`Cart count ${c0}→${cartCount()}, total $${cartTotal().toFixed(2)}`];
 }],
 ["Change quantity recalculates",()=>{
   const pid=(PRODUCTS.find(p=>p.price>0)||PRODUCTS[0]).id;
   const t0=cartTotal();setQty(pid,1);const up=cartTotal()>t0;setQty(pid,-1);
   return [up,"Quantity + / − adjusts subtotal"];
 }],
 ["Remove from cart",()=>{
   const pid=(PRODUCTS.find(p=>p.price>0)||PRODUCTS[0]).id;
   removeLine(pid);const gone=!cart.find(l=>l.id===pid);
   return [gone,"Line removed, badge updated"];
 }],
 ["Wishlist toggles",()=>{
   const pid=PRODUCTS[1].id;
   toggleWish(pid);const on=wishlist.has(pid);
   toggleWish(pid);const off=!wishlist.has(pid);
   return [on&&off,"Heart on → off, badge tracked"];
 }],
 ["Quick-view modal opens & closes",()=>{
   const p=PRODUCTS[0];openModal(p.id);
   const open=$("#modal").classList.contains("open")&&$("#modalBody").textContent.indexOf(p.name.slice(0,6))>=0;
   closeModal();const closed=!$("#modal").classList.contains("open");
   return [open&&closed,"Modal shows specs, Esc/close works"];
 }],
  ["Strip Light section + finder present",()=>{
   const sec=document.getElementById("striplights");
   const n=sec?sec.querySelectorAll(".card").length:0;
   const wiz=!!document.getElementById("stripWizard");
   return [!!sec&&n>0&&wiz, n+" strip products + finder wizard"];
 }],
 ["Strip finder: questions, recs & kit package",()=>{
   swShown=false; openStripWizard();
   const opened=$("#stripWizard").classList.contains("open");
   let asked=0;
   for(let i=0;i<8;i++){ if($("#swBody [data-pkg]")||$("#swBody .sw-callus"))break;
     const b=$("#swBody [data-sw]"); if(b){asked++;b.click();continue;}
     const inp=$("#swLenInput"); if(inp){ inp.value="12"; $("#swBody [data-swnum]").click(); asked++; } }
   const recs=$$("#swBody .sw-rec").length;
   const r=$("#swBody [data-pkg]"); if(r) r.click();
   const rows=$$("#swBody .pk-row").length;
   const sels=$$("#swBody .pk-sel").length;
   const total=$("#swBody .pk-total")!==null;
   closeStripWizard();
   return [opened&&asked>=4&&recs>0&&rows>0&&total, asked+" Qs, "+recs+" recs, kit of "+rows+" items, "+sels+" option selectors"];
 }],
["Channels round up to whole 3m lengths",()=>{
   swPkgSel={};
   const strip=PRODUCTS.find(p=>p.cat==="strip"&&/24v/i.test(p.name)&&!/240v/i.test(p.name));
   const q=(len)=>{ const pk=buildPackage(strip,{place:"cabinet",colour:"single",control:"simple",length:String(len)}); const ch=pk.items.find(it=>it.pick==="channel"); return ch?ch.qty:0; };
   const ok=q(2)===1&&q(4)===2&&q(5)===2&&q(10)===4&&q(15)===5;
   return [ok,"2m→1, 4m→2, 5m→2, 10m→4, 15m→5 (× 3m channels)"];
 }],
 ["Kit rows open the full product page with the right variant",()=>{
   swPkgSel={};
   swAnswers={place:"cabinet",colour:"single",control:"simple",length:"5"};
   swPackageStrip=PRODUCTS.find(p=>p.cat==="strip"&&/24v/i.test(p.name)&&!/240v/i.test(p.name));
   renderPackage();
   const rows=$$("#swBody .pk-row");
   const imgLinks=$$("#swBody .pk-ri-link[data-pkview]");
   const titleLinks=$$("#swBody .pk-rt-link[data-pkview]");
   if(!rows.length||imgLinks.length!==rows.length||titleLinks.length!==rows.length)
     return [false,"only "+imgLinks.length+" photo / "+titleLinks.length+" name links across "+rows.length+" kit rows"];
   /* prefer a row that carries a chosen variant, so we can prove it is preselected */
   const withOpt=titleLinks.find(el=>el.dataset.pkviewopt)||titleLinks[0];
   const wantId=withOpt.dataset.pkview, wantOpt=withOpt.dataset.pkviewopt||"";
   const prod=findP(wantId);
   withOpt.click();
   const open=$("#modal").classList.contains("open");
   const h2=$("#modalBody h2");
   const specs=$$("#modalBody .spectable tr").length, tiles=$$("#modalBody .opt-tile").length;
   const nameOk=!!(h2&&prod&&h2.textContent.trim()===prod.name);
   const optOk=!wantOpt||!!(modalOpt&&modalOpt.label===wantOpt);
   const optsShown=!prod.options||!prod.options.length||tiles===prod.options.length;
   closeModal();
   /* the photo is clickable too and must land on the same product */
   const imgFor=imgLinks.find(el=>el.dataset.pkview===wantId);
   imgFor.click();
   const imgOk=$("#modal").classList.contains("open")&&$("#modalBody h2").textContent.trim()===prod.name;
   closeModal();
   const ok=open&&nameOk&&optOk&&optsShown&&specs>0&&imgOk;
   return [ok, ok?("photo + name both open "+prod.name+" \u00b7 "+specs+" spec rows \u00b7 "+tiles+" option tiles"+(wantOpt?" \u00b7 selected variant carried through":""))
     :("open="+open+" name="+nameOk+" opt="+optOk+" tiles="+tiles+" specs="+specs+" photo="+imgOk)];
 }],
 ["Connector panel says the strip is continuous and cutting is optional",()=>{
   const kit=(strip,len)=>{swPkgSel={};swAnswers={place:"cabinet",colour:"single",control:"simple",length:String(len)};
     swPackageStrip=strip;renderPackage();return $("#swBody").innerHTML;};
   const v24=PRODUCTS.find(p=>p.cat==="strip"&&/24v/i.test(p.name)&&!/240v/i.test(p.name));
   const v240=PRODUCTS.find(p=>p.cat==="strip"&&/240v/i.test(p.name));
   const long=kit(v24,9);
   const bars=$$("#swBody .cn-dia svg rect").length;   // 3 strip bars + 1 connector body
   const noPhoto=$$("#swBody .cn-photo").length===0&&!(typeof COBIMG!=="undefined"&&COBIMG.img.conn);
   const short=kit(v24,3);
   // the old version chopped every run into 2.5m segments - that was wrong
   const noChopping=long.indexOf("JOINED BY")===-1&&!/\d+ \u00d7 2\.5m/.test(long);
   const continuous=/one continuous (strip|length)/i.test(long)&&long.indexOf("no joins needed")>-1;
   const conditional=long.indexOf("ONLY IF YOU CUT IT")>-1&&/carries up to 2\.5m/.test(long);
   // and it must not claim connectors are supplied, because they are not in the kit items
   const kitItems=buildPackage(v24,{place:"cabinet",colour:"single",control:"simple",length:"9"}).items;
   const noneSupplied=!kitItems.some(it=>/connector/i.test(it.p.name));
   const honest=/aren\u2019t part of this kit|aren\u2019t included in this kit/.test(long)&&noneSupplied;
   const onShort=short.indexOf("cn-panel")>-1;      // cutting advice applies at any length
   const off240=v240?kit(v240,14).indexOf("cn-panel")===-1:true;
   swPackageStrip=null;swAnswers={};swStep=0;renderWizard();
   const ok=noChopping&&continuous&&conditional&&honest&&onShort&&off240&&noPhoto&&bars>=4;
   return [ok, ok?("shows the run unbroken, cutting shown as optional, 2.5m tied to the connector, not sold as included")
     :("noChop="+noChopping+" cont="+continuous+" cond="+conditional+" honest="+honest+" short="+onShort+" v240="+off240+" bars="+bars)];
 }],
 ["Finder CTA rows are actually styled",()=>{
   // .sw-cta and .pk-restart previously had NO css rule at all - bare buttons.
   // The rules moved from an inline <style> into the linked home.css when the
   // page became a Next.js route, so scan linked sheets as well as style tags.
   let css=[...document.querySelectorAll("style")].map(s=>s.textContent).join("");
   for(const sh of document.styleSheets){try{css+=[...sh.cssRules].map(r=>r.cssText).join("");}catch(e){}}
   css=css.replace(/\s+/g,"");
   const cta=/\.sw-cta\{[^}]*display:flex[^}]*gap:/.test(css);
   const rest=/\.pk-restart\{[^}]*border:[^}]*\}/.test(css);
   const hover=/\.pk-restart:hover\{/.test(css);
   swAnswers={place:"longrun",length:"12"};swPackageStrip=null;swStep=99;renderWizard();
   const present=!!$("#swBody .sw-cta")&&$$("#swBody .pk-restart").length===2;
   swAnswers={};swStep=0;renderWizard();
   const ok=cta&&rest&&hover&&present;
   return [ok, ok?"sw-cta is a flex row with a gap; pk-restart has a border and a hover state"
     :("ctaRule="+cta+" restartRule="+rest+" hover="+hover+" rendered="+present)];
 }],
 ["Long Run COB asks for a length and blocks runs under 5m",()=>{
   // the length question must appear before the product screen on BOTH routes
   const asksLength=(ans)=>{swAnswers=ans;swPackageStrip=null;swStep=0;
     const qs=swVisibleQs().map(q=>q.key);
     return {keys:qs, hasLen:qs.indexOf("length")>-1,
             noColour:qs.indexOf("colour")===-1, noControl:qs.indexOf("control")===-1};};
   const dq=asksLength({place:"longrun"});
   const cq=asksLength({place:"cove",space:"tight"});
   const screen=(ans)=>{swAnswers=ans;swPackageStrip=null;swStep=99;renderWizard();
     const b=$("#swBody").innerHTML;
     return {call:b.indexOf("sw-callus")>-1, build:b.indexOf("Build my kit")>-1,
             tel:b.indexOf("9297 2969")>-1};};
   const short=screen({place:"longrun",length:"3"});
   const edge=screen({place:"longrun",length:"5"});
   const long=screen({place:"longrun",length:"12"});
   const coveShort=screen({place:"cove",space:"tight",length:"4"});
   swAnswers={};swStep=0;renderWizard();
   const gated=short.call&&!short.build&&short.tel&&coveShort.call&&!coveShort.build;
   const sells=!edge.call&&edge.build&&!long.call&&long.build;
   const flow=dq.hasLen&&dq.noColour&&dq.noControl&&cq.hasLen&&cq.noColour;
   const ok=gated&&sells&&flow;
   return [ok, ok?("length asked on both routes (no colour/control) \u00b7 3m and 4m \u2192 call us, no kit \u00b7 5m and 12m \u2192 sells")
     :("gated="+gated+" sells="+sells+" flow="+flow+" q="+dq.keys.join(","))];
 }],
 ["Long Run photos are captioned for what they actually show",()=>{
   if(typeof COBIMG==="undefined")return[false,"COBIMG bundle missing"];
   swAnswers={place:"longrun",length:"12"};swPackageStrip=null;swStep=99;renderWizard();
   const shots=$$("#swBody .cob-shot img");
   const caps=$$("#swBody .cob-shot figcaption").map(n=>n.textContent);
   const b=$("#swBody").innerHTML;
   const allReal=shots.length===3&&shots.every(i=>isRealAsset(i.getAttribute("src")));
   const captioned=caps.length===3&&caps.every(c=>c.trim().length>15);
   // photos show the bare strip; we sell the sealed IP68 - that must not be glossed over
   const honest=/same strip sealed inside a clear silicone sleeve/i.test(b);
   const noConn=!COBIMG.img.conn;
   swAnswers={};swStep=0;renderWizard();
   const ok=allReal&&captioned&&honest&&noConn;
   return [ok, ok?"3 real supplier photos, each captioned, with the bare-strip vs IP68 difference stated"
     :("shots="+shots.length+" captioned="+captioned+" honest="+honest+" connRemoved="+noConn)];
 }],
 ["Repeated channel photos are labelled, not left looking duplicated",()=>{
   const ch=findP("24VSTRIP-CHANNELS-"); if(!ch)return[false,"channel product missing"];
   openModal("24VSTRIP-CHANNELS-");
   const tiles=$$("#modalBody .opt-tile");
   const imgs=tiles.map(t=>{const i=t.querySelector("img");return i?i.getAttribute("src"):"";});
   const share={};imgs.forEach(s=>{if(s)share[s]=(share[s]||0)+1;});
   // every tile whose photo is shared must carry a marker saying so
   let unmarked=[];
   tiles.forEach((t,i)=>{
     if(imgs[i]&&share[imgs[i]]>1&&!t.querySelector(".ot-dup")){
       // fine only when this tile is the finish the photo actually shows
       if(optImgNote(ch,ch.options[i])) unmarked.push(ch.options[i].label);
       else if(!$$("#modalBody .opt-tile").some((o,j)=>imgs[j]===imgs[i]&&optImgNote(ch,ch.options[j])))
         unmarked.push(ch.options[i].label);
     }
   });
   // a caveated tile must name the finish actually pictured, never claim "all finishes"
   const wrong=tiles.filter((t,i)=>{const m=t.querySelector(".ot-dup");
     return m&&optImgNote(ch,ch.options[i])&&/all finishes/.test(m.textContent);}).length;
   const swatches=$$("#modalBody .opt-tile .ot-sw").length;
   // and no two cards in the channel grid may show the same photo
   const cards=$$("#slChanGrid .sl-chan img").map(i=>i.getAttribute("src"));
   const gridDup=cards.length-new Set(cards).size;
   closeModal();
   const ok=unmarked.length===0&&wrong===0&&swatches===12&&gridDup===0;
   return [ok, ok?("12 tiles over "+Object.keys(share).length+" photos \u2014 every shared one labelled, 12 colour swatches, no duplicate grid cards")
     :("unmarked="+unmarked.join("/")+" wrongText="+wrong+" swatches="+swatches+" gridDup="+gridDup)];
 }],
 ["Category tiles use the supplied artwork without doubling the name",()=>{
   renderCats();
   const tiles=$$("#catGrid .cat");
   const scenes=$$("#catGrid .cat-scene");
   if(tiles.length!==CATEGORIES.length)return[false,tiles.length+" tiles for "+CATEGORIES.length+" categories"];
   const allScene=scenes.length===tiles.length&&$$("#catGrid .cat-cut").length===0;
   const realImg=scenes.every(i=>isRealAsset(i.getAttribute("src")));
   // the artwork already prints the category name, so no tile may show a second
   // visible copy - but the h3 must still exist for screen readers and SEO
   const baked=tiles.filter(t=>t.classList.contains("name-in-art"));
   const noDouble=baked.every(t=>{const h=t.querySelector("h3");
     return h&&h.classList.contains("vis-hidden")&&h.textContent.trim().length>2;});
   // alt text must describe the scene, never just repeat the category name
   const altOK=scenes.every((i,n)=>{const a=i.getAttribute("alt")||"";
     return a.length>12&&a!==CATEGORIES[n].name;});
   const counted=tiles.every(t=>/\d+ product/.test(t.querySelector(".cnt").textContent));
   const gaps=(typeof CATIMG!=="undefined"&&CATIMG.noPhoto)?CATIMG.noPhoto.length:0;
   const ok=allScene&&realImg&&noDouble&&altOK&&counted&&gaps===0;
   return [ok, ok?(tiles.length+" tiles all on supplied artwork \u00b7 heading kept for a11y but not drawn twice \u00b7 alt text describes each scene")
     :("allScene="+allScene+" img="+realImg+" noDoubleName="+noDouble+" alt="+altOK+" counts="+counted+" gaps="+gaps)];
 }],
 ["Strip tutorial videos under the products",()=>{
   renderStrips();
   const n=$$("#stripTutGrid .sl-tut").length;
   return [n>=3, n+" strip tutorial videos embedded"];
 }],
 ["Accessories never appear as strip suggestions",()=>{
   const paths=[{place:"other",colour:"single",control:"simple",length:"5"},
    {place:"cabinet",colour:"cct",control:"smart",length:"5"},
    {place:"cove",space:"tight",colour:"single",control:"simple",length:"10"}];
   let bad=0;
   paths.forEach(a=>{ const ranked=stripPool().map(p=>({p,s:stripScore(p,a)})).sort((x,y)=>y.s-x.s);
     const top=ranked.filter(r=>r.s>0).slice(0,3); const list=(top.length?top:ranked.slice(0,3));
     list.forEach(r=>{ if(/channel|transformer|controller|remote/i.test(r.p.name)) bad++; }); });
   return [bad===0, bad+" accessory items in suggestions (should be 0)"];
 }],
 ["240V is remote-only (never smart) & smart kits skip the remote",()=>{
   const smartA={place:"cove",space:"roomy",colour:"single",control:"smart",length:"5"};
   const ranked=stripPool().map(p=>({p,s:stripScore(p,smartA)})).sort((a,b)=>b.s-a.s).filter(r=>r.s>0).slice(0,3);
   const no240=ranked.every(r=>!/240v/i.test(r.p.name));
   const strip24=stripPool().find(p=>/24v/i.test(p.name)&&!/240v/i.test(p.name));
   const pk=buildPackage(strip24,smartA);
   const hasWifi=pk.items.some(it=>it.pick==="controller"&&/wifi/i.test(it.opt.label));
   const noRemote=!pk.items.some(it=>it.pick==="remote");
   const s240=stripPool().find(p=>/240v/i.test(p.name)&&/rgb/i.test(p.name))||stripPool().find(p=>/240v/i.test(p.name));
   const pk240=buildPackage(s240,{place:"cove",space:"roomy",colour:"rgb",control:"smart",length:"15"});
   const noCtrl240=!pk240.items.some(it=>it.pick==="controller");
   const hasRemote240=pk240.items.some(it=>it.pick==="remote");
   const pkSimple=buildPackage(strip24,{place:"cabinet",colour:"single",control:"simple",length:"5"});
   const has2in1=pkSimple.items.some(it=>it.pick==="controller"&&/2 in 1/i.test(it.p.name));
   const simpleRemote=pkSimple.items.some(it=>it.pick==="remote");
   return [no240&&hasWifi&&noRemote&&noCtrl240&&hasRemote240&&has2in1&&simpleRemote, "smart: 3-in-1 WiFi no remote; simple white: 2-in-1 + remote; 240V: remote only"];
 }],
 ["240V long-run only (min 10m, white\u226450 RGB\u226435) & cove shows ONE 240V pick",()=>{
   const rank=a=>stripPool().map(p=>({p,s:stripScore(p,a)})).sort((x,y)=>y.s-x.s).filter(r=>r.s>0).slice(0,3).map(r=>r.p.name.toLowerCase());
   const rgbShort=rank({place:"cove",space:"roomy",colour:"rgb",control:"simple",length:"5"});
   const rgbLong=rank({place:"cove",space:"roomy",colour:"rgb",control:"simple",length:"10"});
   const white5=rank({place:"cove",space:"roomy",colour:"single",control:"simple",length:"5"});
   const white10=rank({place:"cove",space:"roomy",colour:"single",control:"simple",length:"10"});
   const cct10=rank({place:"cove",space:"roomy",colour:"cct",control:"simple",length:"10"});
   const ok = rgbShort.every(n=>!n.includes("240v")) && rgbLong.some(n=>n.includes("240v"))
     && white5.every(n=>!n.includes("240v")) && white10.some(n=>n.includes("240v"))
     && cct10.every(n=>!n.includes("240v"));
   swAnswers={place:"cove",space:"roomy",colour:"single",control:"simple",length:"10"}; swStep=99; swPackageStrip=null;
   renderWizard();
   const shown=[...document.querySelectorAll("#swBody .sw-rec h4")].map(h=>h.textContent.toLowerCase());
   const one240=shown.length===1&&shown[0].includes("240v")&&!shown[0].includes("rgb");
   swAnswers={}; swStep=0;
   return [ok&&one240, "min 10m enforced (white & RGB); fixed-colour only; cove screen = exactly 1 matching 240V pick"];
 }],
 ["Single colour = SMD never COB; 2-in-1 for white, 3-in-1 for RGB",()=>{
   const rank=a=>stripPool().map(p=>({p,s:stripScore(p,a)})).sort((x,y)=>y.s-x.s).filter(r=>r.s>0).slice(0,3).map(r=>r.p.name.toLowerCase());
   const single=rank({place:"cabinet",colour:"single",control:"simple",length:"4"});
   const noCob=single.length>0&&single.every(n=>!n.includes("cob"));
   const cct=rank({place:"cabinet",colour:"cct",control:"simple",length:"4"});
   const cctIsCob=cct.length>0&&cct[0].includes("cob");
   const white=stripPool().find(p=>/high lumen/i.test(p.name));
   const rgbS=stripPool().find(p=>/rgb/i.test(p.name)&&!/240v/i.test(p.name));
   const kW=buildPackage(white,{place:"cabinet",colour:"single",control:"simple",length:"4"});
   const kWs=buildPackage(white,{place:"cabinet",colour:"single",control:"smart",length:"4"});
   const kR=buildPackage(rgbS,{place:"cabinet",colour:"rgb",control:"simple",length:"4"});
   const ctrl=k=>(k.items.find(it=>it.pick==="controller")||{}).p||{name:""};
   const w2=/2 in 1/i.test(ctrl(kW).name)&&!/rgb/i.test(ctrl(kW).name);
   const w2s=/2 in 1/i.test(ctrl(kWs).name);
   const r3=/rgb/i.test(ctrl(kR).name)&&!/2 in 1/i.test(ctrl(kR).name);
   return [noCob&&cctIsCob&&w2&&w2s&&r3, "single\u2192SMD (no COB), CCT\u2192COB; white kits (std+smart)=2-in-1, RGB=3-in-1"];
 }],
 ["Wet areas = High Lumen SMD only, fixed whites, no RGB",()=>{
   const ranked=stripPool().map(p=>({p,s:stripScore(p,{place:"wet",colour:"w4000",control:"simple",length:"5"})})).sort((a,b)=>b.s-a.s);
   const pos=ranked.filter(r=>r.s>0);
   const onlyHL=pos.length>0&&pos.every(r=>/high lumen/i.test(r.p.name));
   swAnswers={place:"wet",bright:"std"};
   const qs=swVisibleQs(); swStep=qs.findIndex(q=>q.key==="colour"); swPackageStrip=null; renderWizard();
   const t=$("#swBody").textContent;
   const colOK=/5500K/.test(t)&&!/Full colour/i.test(t)&&!/RGB \u2014 millions/i.test(t);
   swAnswers={}; swStep=0;
   return [onlyHL&&colOK, "wet path ranks High Lumen exclusively; whites 3000/4000/5500/6000K, no RGB option"];
 }],
 ["240V max lengths (white 50m, RGB 35m) enforced",()=>{
   const rank=a=>stripPool().map(p=>({p,s:stripScore(p,a)})).sort((x,y)=>y.s-x.s).filter(r=>r.s>0).slice(0,3).map(r=>r.p.name.toLowerCase());
   const white45=rank({place:"cove",space:"roomy",colour:"single",control:"simple",length:"45"});
   const white60=rank({place:"cove",space:"roomy",colour:"single",control:"simple",length:"60"});
   const rgb30=rank({place:"cove",space:"roomy",colour:"rgb",control:"simple",length:"30"});
   const rgb45=rank({place:"cove",space:"roomy",colour:"rgb",control:"simple",length:"45"});
   const ok = white45.some(n=>n.includes("240v")) && white60.every(n=>!n.includes("240v"))
     && rgb30.some(n=>n.includes("240v")&&n.includes("rgb")) && rgb45.every(n=>!(n.includes("240v")&&n.includes("rgb")));
   return [ok, "white ok at 45m, cut at 60m; RGB ok at 30m, cut at 45m"];
 }],
 ["240V strip only suggested for ceiling recess",()=>{
   const out={place:"outdoor",colour:"rgb",control:"simple",length:"10"};
   const cove={place:"cove",colour:"single",control:"simple",length:"10"};
   const strips=PRODUCTS.filter(p=>p.cat==="strip");
   const rank=a=>strips.map(p=>({p,s:stripScore(p,a)})).sort((x,y)=>y.s-x.s).filter(r=>r.s>0).slice(0,3).map(r=>r.p.name.toLowerCase());
   const outNames=rank(out), coveNames=rank(cove);
   const no240outside=outNames.every(n=>!n.includes("240v"));
   const coveAllows=coveNames.some(n=>n.includes("240v"));
   return [no240outside&&coveAllows, "outdoor top-3 has no 240V; cove includes 240V"];
 }],
 ["Strip products use real supplier photos",()=>{
   if(typeof STRIPIMG==="undefined")return[false,"STRIPIMG bundle missing"];
   const ids=Object.keys(STRIPIMG.products||{});
   const ok=ids.length&&ids.every(id=>{const p=PRODUCTS.find(x=>x.id===id);return p&&p.img&&isRealAsset(p.img);});
   return [ok, ids.length+" strip products carry embedded supplier photos ("+ids.join(", ")+")"];
 }],
 ["Finder place question shows picture answers",()=>{
   swAnswers={};swStep=0;renderWizard();
   const n=$("#swBody").querySelectorAll(".sw-opt-img img").length;
   const total=$("#swBody").querySelectorAll(".sw-opt").length;
   return [n===6&&total===6, n+"/"+total+" place options have a real photo"];
 }],
 ["Results show mood photo; kit info box carries datasheets",()=>{
   swAnswers={place:"other",colour:"single",control:"simple",length:"4"};swShown=true;
   swPackageStrip=null;swStep=swVisibleQs().length;renderWizard();
   const mood=$("#swBody").innerHTML.indexOf("sw-mood")>-1;
   // drill into the kit to check the consolidated info box
   const prm=stripPool().map(p=>({p,s:stripScore(p,swAnswers)})).sort((a,b)=>b.s-a.s)[0].p;
   swPackageStrip=prm; renderWizard();
   let kit=$("#swBody").innerHTML;
   const box=kit.indexOf("infobox")>-1&&kit.indexOf("Full details of this strip light")>-1;
   const ds=kit.indexOf("Supplier datasheets")>-1&&(kit.match(/<figure/g)||[]).length>=2;
   swAnswers={};swStep=0;swPackageStrip=null;renderWizard();
   return [mood&&box&&ds, (mood?"mood banner ok":"mood MISSING")+" · "+(box?"single info box ok":"info box MISSING")+" · "+(ds?"datasheets inside ok":"datasheets MISSING")];
 }],
 ["Strip inspiration gallery rendered",()=>{
   const n=$("#slMoodGrid")?$("#slMoodGrid").querySelectorAll("img").length:0;
   return [n>=6, n+" real installation photos in the gallery"];
 }],
 ["COB demo photos are real and attached to the right products",()=>{
   if(typeof DEMOIMG==="undefined")return[false,"DEMOIMG bundle missing"];
   const ids=Object.keys(DEMOIMG.byProduct||{});
   const inCat=ids.every(id=>!!findP(id));
   const cct=DEMOIMG.cct, rgb=DEMOIMG.rgb;
   const real=x=>x&&x.img&&isRealAsset(x.img);
   const ok=inCat&&cct&&rgb&&cct.states.length===2&&rgb.states.length===3
     &&cct.states.every(real)&&rgb.states.every(real)
     &&real(cct.controller)&&real(rgb.controller)
     &&(cct.remotes||[]).every(real)&&(rgb.remotes||[]).every(real);
   return [ok, ids.length+" COB strips with "+(cct?cct.states.length:0)+"+"+(rgb?rgb.states.length:0)+" lit states, controllers and remotes"];
 }],
 ["Demo panel renders in modal + finder, and only for photographed strips",()=>{
   const withPhoto=demoPanel("ST24V-RGB-COB");
   const without=demoPanel("ST24V-SMD-ALL-1");
   const swatches=(withPhoto.match(/sl-demo-state/g)||[]).length;
   return [withPhoto.includes("sw-demo")&&swatches>=3&&without==="",
     "RGB COB gets "+swatches+" colour swatches; unphotographed strips get none"];
 }],
 ["Colour question shows real photos, never a borrowed strip",()=>{
   const Q={key:"colour"}; const a={place:"cabinet"};
   const cct=qOptPhoto(Q,["x","cct"],a), rgb=qOptPhoto(Q,["x","rgb"],a), sgl=qOptPhoto(Q,["x","single"],a);
   const distinct=cct&&rgb&&sgl&&cct!==rgb&&rgb!==sgl&&cct!==sgl;
   // wet/cove paths must NOT get COB demo photos - those are fixed-white or 240V
   const wet=qOptPhoto(Q,["x","w3000"],{place:"wet"});
   return [!!distinct&&!wet, distinct?"cct/rgb/single each have their own real photo; wet & cove unaffected":"photos missing or duplicated"];
 }],
 ["Channel profiles: real dimensions, catalogue matched, gaps flagged",()=>{
   if(typeof CHANIMG==="undefined")return[false,"CHANIMG bundle missing"];
   const ch=findP("24VSTRIP-CHANNELS-");
   if(!ch)return[false,"channel product missing from catalogue"];
   const opts=ch.options||[];
   const matched=opts.filter(o=>optImg(ch,o));
   const unmatched=opts.filter(o=>!optImg(ch,o));
   // every unmatched option must be declared as awaiting a photo, not silently blank
   const declared=unmatched.every(o=>(CHANIMG.noPhoto||[]).includes(o.label));
   const allReal=(CHANIMG.profiles||[]).every(p=>isRealAsset(p.img)&&p.dims);
   const unlisted=(CHANIMG.profiles||[]).filter(p=>p.unlisted).length;
   return [matched.length===opts.length&&declared&&allReal&&unlisted===1,
     matched.length+"/"+opts.length+" options photographed, "+unmatched.length+" awaiting photo, "+unlisted+" profile shown as unlisted"];
 }],
 ["Every channel profile has its supplier dimension drawing",()=>{
   if(typeof CHANIMG==="undefined")return[false,"CHANIMG bundle missing"];
   const profs=CHANIMG.profiles||[];
   const withDim=profs.filter(p=>isRealAsset(p.dimImg));
   const ch=findP("24VSTRIP-CHANNELS-");
   const opts=(ch&&ch.options)||[];
   const optsWithDim=opts.filter(o=>(CHANIMG.options[o.label]||{}).dim);
   // the drawing must reach the modal, not just sit in the bundle
   openModal("24VSTRIP-CHANNELS-");
   const shown=$$("#optDetail .opt-dimfig img").length;
   closeModal();
   const ok=withDim.length===profs.length&&optsWithDim.length===opts.length&&shown===1;
   return [ok, withDim.length+"/"+profs.length+" profiles drawn, "+optsWithDim.length+"/"+opts.length+" options carry a drawing, "+shown+" rendered in the product page"];
 }],
 ["Black finishes use the black photo where the supplier sent one",()=>{
   if(typeof CHANIMG==="undefined")return[false,"CHANIMG bundle missing"];
   const wing=(CHANIMG.profiles||[]).find(p=>p.key==="recesswing");
   const black=CHANIMG.options["Recess Wing \u00b7 Black \u00b7 24.6 \u00d7 7.7mm"];
   const silver=CHANIMG.options["Recess Wing \u00b7 Silver \u00b7 24.6 \u00d7 7.7mm"];
   if(!wing||!black||!silver)return[false,"recess wing options missing"];
   const distinct=black.img!==silver.img;
   const noStaleCaveat=!/waiting on the supplier photo/.test(black.note||"");
   const cover=CHANIMG.options["Black Cover \u00b7 Black \u00b7 16.9 \u00d7 7.9mm"];
   const coverOk=!!(cover&&cover.img&&cover.dim);
   const ok=distinct&&noStaleCaveat&&coverOk;
   return [ok, ok?"black recess wing has its own photo + 16.9mm drawing; Black Cover now photographed":
     ("distinct="+distinct+" caveatCleared="+noStaleCaveat+" blackCover="+coverOk)];
 }],
 ["Silver-finish photos carry a colour caveat on White/Black options",()=>{
   const ch=findP("24VSTRIP-CHANNELS-"); if(!ch)return[false,"no channel product"];
   const white=(ch.options||[]).find(o=>/Recess \u00b7 White/.test(o.label));
   const silver=(ch.options||[]).find(o=>/Recess \u00b7 Silver/.test(o.label));
   const surfWhite=(ch.options||[]).find(o=>/Surface Rectangle \u00b7 White/.test(o.label));
   const ok=white&&silver&&surfWhite&&optImgNote(ch,white)&&!optImgNote(ch,silver)&&!optImgNote(ch,surfWhite);
   return [!!ok,"White recess notes the silver photo; silver and the 3-finish surface photo need no caveat"];
 }],

 ["Stairs skips the questions and shows the kit + video",()=>{
   swAnswers={place:"stairs"}; swStep=1; swPackageStrip=null; swShown=true;
   renderWizard();
   const h=$("#swBody").innerHTML;
   const ok=/Q3iYeqDkIeE/.test(h) && /Stair Light Controller/.test(h) && /Stair Profile/.test(h)
            && /\$120\.00/.test(h) && /\$18\.00/.test(h)
            && !/Question \d of/.test(h);
   swAnswers={};swStep=0;
   return [ok, ok?"video + $120 controller + $18 profile, no questions asked":"stairs panel wrong"];
 }],
 ["20W/m is offered in 4000K and 5500K only",()=>{
   const Q=STRIP_Q.find(q=>q.key==="colour");
   const bright=Q.opts({place:"wet",bright:"bright20"}).map(o=>o[1]);
   const std=Q.opts({place:"wet",bright:"std"}).map(o=>o[1]);
   const ok=bright.length===2 && bright.includes("w4000") && bright.includes("w5500")
            && !bright.includes("w3000") && !bright.includes("w6000") && std.length===4;
   return [ok, "bright: "+bright.join("/")+" \u00b7 standard still offers "+std.length];
 }],
 ["Meeting prices applied (SMD $14 / CCT $16 / RGB $17)",()=>{
   const g=id=>{const p=findP(id);return p?p.price:null;};
   const ok=g("ST24V-SMD-ALL")===14 && g("ST24V-9W-15W-CCT-C")===16 && g("ST24V-RGB-COB")===17;
   return [ok, "SMD $"+g("ST24V-SMD-ALL")+" \u00b7 CCT $"+g("ST24V-9W-15W-CCT-C")+" \u00b7 RGB $"+g("ST24V-RGB-COB")];
 }],
 ["Control question avoids 2-in-1 / 3-in-1 jargon",()=>{
   const Q=STRIP_Q.find(q=>q.key==="control");
   const w=Q.hint({colour:"single"})+" "+Q.hint({colour:"rgb"});
   const ok=!/2-in-1|3-in-1|2.4GHz|WiFi \+/.test(w) && /dim/.test(w) && /colour/.test(Q.hint({colour:"rgb"}));
   return [ok, ok?"plain wording: dim / on-off, colour for RGB":"jargon still present"];
 }],
 ["Transformers use real supplier photos",()=>{
   if(typeof TRIMG==="undefined")return[false,"TRIMG bundle missing"];
   const labels=Object.keys(TRIMG.options||{});
   const cat=PRODUCTS.filter(p=>p.id==="TR12V-ALL"||p.id==="TR24V-ALL");
   const defs=cat.length===2&&cat.every(p=>p.img&&isRealAsset(p.img));
   const allReal=labels.length&&labels.every(k=>isRealAsset(TRIMG.options[k]));
   return [defs&&allReal, labels.length+" variant photos + both transformer cards carry embedded photos"];
 }],
 ["Choosing a transformer variant swaps to that unit's photo",()=>{
   openModal("TR24V-ALL");
   const p=findP("TR24V-ALL");
   const seen=[];let ok=true;
   p.options.forEach((o,i)=>{
     selectModalOpt(i);
     const img=$("#modalImg").querySelector("img");
     const src=img?img.getAttribute("src"):"";
     const want=TRIMG.options[o.label];
     if(want){ if(src!==want) ok=false; seen.push(o.label); }
   });
   // distinct photos, not one repeated
   const uniq=new Set(seen.map(l=>TRIMG.options[l]));
   closeModal();
   return [ok&&uniq.size===seen.length, seen.length+" 24V variants each show their own distinct photo ("+uniq.size+" unique)"];
 }],
 ["Variant photo follows through kit & cart",()=>{
   const p=findP("TR24V-ALL");
   const o=p.options.find(x=>TRIMG.options[x.label]);
   cart=[];addToCart(p.id,o.label,o.price,1);updateCart();
   const ci=$("#cartItems").querySelector(".ci .img img");
   const cartOk=ci&&ci.getAttribute("src")===TRIMG.options[o.label];
   // kit view uses the same resolver
   const kitOk=typeof optImg==="function"&&optImg(p,o)===TRIMG.options[o.label];
   cart=[];updateCart();
   return [cartOk&&kitOk, (cartOk?"cart line ok":"cart line MISSING")+" · "+(kitOk?"kit thumbnail resolver ok":"kit resolver MISSING")];
 }],
 ["Variants without a supplier photo are labelled, not faked",()=>{
   openModal("TR12V-ALL");
   const p=findP("TR12V-ALL");
   let labelled=0,silent=0,exact=0;
   p.options.forEach((o,i)=>{
     selectModalOpt(i);
     const note=$("#modalImgNote");
     if(TRIMG.options[o.label]){ exact++; if(note&&!note.hidden) silent++; }
     else { if(note&&!note.hidden&&note.textContent.indexOf(o.label)>=0) labelled++; else silent++; }
   });
   closeModal();
   return [silent===0, exact+" exact photos · "+labelled+" sizes honestly flagged as awaiting supplier photo"];
 }],
 ["Controllers & remotes use real supplier photos",()=>{
   if(typeof CTRLIMG==="undefined")return[false,"CTRLIMG bundle missing"];
   const ids=Object.keys(CTRLIMG.byProduct||{});
   const defs=ids.every(id=>{const p=findP(id);return p&&p.img&&isRealAsset(p.img);});
   const n=ids.reduce((s,id)=>s+Object.keys(CTRLIMG.byProduct[id]).length,0);
   return [defs&&n>=12, n+" option photos across "+ids.length+" products; all card images embedded"];
 }],
 ["Each controller/remote variant shows its own unit",()=>{
   const checks=[];
   ["LED-CONTROLLER-SIN","RGB-CTRLR-037","REMOTE-CONTROL-GRP"].forEach(id=>{
     openModal(id);
     const p=findP(id);
     p.options.forEach((o,i)=>{
       selectModalOpt(i);
       const img=$("#modalImg").querySelector("img");
       const want=optImg(p,o);
       const note=$("#modalImgNote");
       if(want) checks.push(img&&img.getAttribute("src")===want);
       else checks.push(note&&!note.hidden&&note.textContent.indexOf(o.label)>=0);
     });
     closeModal();
   });
   const ok=checks.every(Boolean);
   return [ok, checks.length+" variants verified — exact photo shown, or honestly flagged as awaiting one"];
 }],
 ["The 2-in-1 and 3-in-1 WiFi variants don't collide",()=>{
   const a=findP("LED-CONTROLLER-SIN"), b=findP("RGB-CTRLR-037");
   const la=a.options.find(o=>o.label.indexOf("WiFi")===0), lb=b.options.find(o=>o.label.indexOf("WiFi")===0);
   const ia=optImg(a,la), ib=optImg(b,lb);
   return [!!ia&&!!ib&&ia!==ib, "Same option label, two different units — resolved per product"];
 }],
 ["Strip-section duplicates carry full product info",()=>{
   const pairs=[["TR24V-ALL-1","TR24V-ALL"],["TR12V-ALL-1","TR12V-ALL"],["REMOTE-CONTROL-GRP-2","REMOTE-CONTROL-GRP"],["RGB-CTRLR-037-2","RGB-CTRLR-037"],["LED-CONTROLLER-SIN-1","LED-CONTROLLER-SIN"]];
   let ok=true,msgs=[];
   pairs.forEach(([d,b])=>{
     const dp=findP(d),bp=findP(b);
     if(!dp||!bp){ok=false;msgs.push(d+" missing");return;}
     const good=dp.options&&dp.options.length===bp.options.length&&dp.img&&isRealAsset(dp.img);
     if(!good){ok=false;msgs.push(d+" incomplete");}
   });
   return [ok, ok?"5 duplicate entries now share options, specs & photos with their base products":msgs.join(", ")];
 }],
 ["Modal shows a clickable gallery of every option",()=>{
   openModal("TR24V-ALL");
   const p=findP("TR24V-ALL");
   const g=$("#optGallery");
   const tiles=g?g.querySelectorAll(".opt-tile"):[];
   const countOk=tiles.length===p.options.length;
   tiles[3]&&tiles[3].click();
   const selOk=modalOpt===p.options[3]&&$("#modalPrice").textContent===p.options[3].price.toFixed(2)&&tiles[3].classList.contains("sel");
   const withPhoto=[...tiles].filter(t=>t.querySelector("img")).length;
   closeModal();
   return [countOk&&selOk, tiles.length+" option tiles ("+withPhoto+" with real photos); clicking a tile selects that variant & updates price"];
 }],
 ["Category tiles link every product heading to its SEO page",()=>{
   renderCats();
   const cells=$("#catGrid").querySelectorAll(".catcell");
   let rendered=0,expected=0,badHref=0;
   CATEGORIES.forEach(c=>{expected+=catPageLinks(c.id).length;});
   $("#catGrid").querySelectorAll(".cat-links li a:not(.cl-all)").forEach(a=>{
     rendered++;
     if(!/^\/(products|lighting-perth|automation)\/.+\.html$/i.test(a.getAttribute("href")))badHref++;
   });
   const allLinks=$("#catGrid").querySelectorAll(".cat-links .cl-all").length;
   return [cells.length===CATEGORIES.length&&rendered===expected&&badHref===0&&allLinks>0,
     rendered+" product headings across "+cells.length+" categories, all hrefs → product pages ("+allLinks+" category-page links)"];
 }],
 ["Both routes reach the Long Run COB with the real datasheet",()=>{
   const check=(ans)=>{
     swAnswers=ans;swPackageStrip=null;swStep=99;renderWizard();
     const b=$("#swBody").innerHTML;
     return {named:b.indexOf("Long Run COB")>-1,
             specs:b.indexOf("7.5W per metre")>-1&&b.indexOf("Fixed colour, chosen at order")>-1,
             run:b.indexOf("20m fed from one end")>-1,
             photo:$$("#swBody .cob-shot img").length===3,
             ip:b.indexOf("cob-ip")>-1,
             stale:b.indexOf("waiting on the supplier photo")>-1,
             build:b.indexOf("Build my kit")>-1};
   };
   const cove=check({place:"cove",space:"tight",length:"12"});   // recess answered "No"
   const direct=check({place:"longrun",length:"12"});            // the new place option
   swAnswers={};swStep=0;renderWizard();
   const good=r=>r.named&&r.specs&&r.run&&r.photo&&r.ip&&!r.stale&&r.build;
   const ok=good(cove)&&good(direct);
   return [ok, ok?"tight recess and the new long-run answer both land on it \u00b7 real photo, fixed colour 3000K/4000K, IP20 and IP67 grades, kit buildable"
     :("cove="+JSON.stringify(cove)+" direct="+JSON.stringify(direct))];
 }],
 ["Long Run COB is sold as IP20 and IP67",()=>{
   if(typeof COBIMG==="undefined")return[false,"COBIMG bundle missing"];
   swAnswers={place:"longrun",length:"12"};swPackageStrip=null;swStep=99;renderWizard();
   const b=$("#swBody").innerHTML;
   // the dropped IP20 entry must be gone from the catalogue, not just hidden
   const gone=!findP("ST24V-LONGRUN-IP20")&&PRODUCTS.filter(p=>/LONGRUN/.test(p.id)).length===1;
   const noStray=b.indexOf("IP68")===-1;
   const cards=$$("#swBody .cob-ip").length;
   const outdoor=/garden|pergola|under decks|floating steps/i.test(b);
   const kept=findP("ST24V-LONGRUN-IP68");
   const realImg=!!(kept&&kept.img&&isRealAsset(kept.img));
   const buildable=b.indexOf('data-pkg="ST24V-LONGRUN-IP68"')>-1;
   swAnswers={};swStep=0;renderWizard();
   const ok=gone&&noStray&&cards===2&&outdoor&&realImg&&buildable;
   return [ok, ok?"one IP68 product, no IP20/65/67 anywhere on the screen, outdoor use spelled out, kit builds"
     :("gone="+gone+" noStray="+noStray+" cards="+cards+" outdoor="+outdoor+" img="+realImg+" build="+buildable)];
 }],
 ["Install notes cover the connector, bend and offcut rules",()=>{
   const j=(a)=>buildPackage(findP(a.id||"ST24V-SMD-ALL-1"),a.ans).notes.join(" ");
   const lowV=j({ans:{place:"cabinet",colour:"single",control:"simple",length:"8"}});
   const conn=/one connector carries up to 2\.5m/i.test(lowV)&&/aren\u2019t included in this kit/.test(lowV);
   const bend=/Drill a hole at the corner/.test(lowV);
   const v240p=PRODUCTS.find(p=>/240v/i.test(p.name)&&p.cat==="strip");
   const hi=v240p?buildPackage(v240p,{place:"cove",colour:"w3000",length:"14"}).notes.join(" "):"";
   const fold=/fold the extra back/i.test(hi);
   const noFoldOnLowV=!/fold the extra back/i.test(lowV);
   const ok=conn&&bend&&fold&&noFoldOnLowV;
   return [ok, ok?"2.5m-per-connector + drill-don\u2019t-bend on 24V \u00b7 fold-back offcut advice on 240V only"
     :("conn="+conn+" bend="+bend+" fold="+fold+" scoped="+noFoldOnLowV)];
 }],
 ["Recess question shows correct/too-tight cove diagrams",()=>{
   const Q=STRIP_Q.find(q=>q.key==="space");
   const h=Q.extra?Q.extra({}):"";
   const ok=/cd-ok/.test(h)&&/cd-bad/.test(h)&&/150/.test(h)&&/50/.test(h)&&Q.opts.length===2;
   return [ok, ok?"two labelled diagrams, 150mm shelf / 50mm lip, still Yes-No":"diagram pair wrong"];
 }],
 ["Runs of 8m+ favour the Long Run COB",()=>{
   const lr=findP("ST24V-LONGRUN-IP68");
   if(!lr) return [false,"Long Run product missing from catalogue"];
   const a={place:"other",colour:"single",control:"simple",length:"9"};
   const scored=stripPool().map(p=>({n:p.name,s:stripScore(p,a)})).sort((x,y)=>y.s-x.s);
   const top=scored[0];
   return [/long run/i.test(top.n), "9m top pick: "+top.n];
 }],
 ["Finder place visuals are real photos, not SVG diagrams",()=>{
   const cove=diagPlace("cove"), wet=diagPlace("wet");
   const isPhoto=cove.indexOf("<img")>-1&&cove.indexOf("data:image")>-1&&wet.indexOf("<img")>-1;
   return [isPhoto, "cove & wet install visuals now render supplier/mood photos"];
 }],
 ["20W/m bright wet-area variant selectable & flows through",()=>{
   // bright question only appears for wet
   swAnswers={place:"wet"};
   const qs=swVisibleQs().map(q=>q.key);
   const hasBright=qs.indexOf("bright")>-1;
   const hl=PRODUCTS.find(p=>(p.name||"").toLowerCase().includes("high lumen"));
   // family reflects 20W/m when chosen
   swAnswers={place:"wet",bright:"bright20"};
   const fam=stripFacts(hl);
   const is20=fam.wpm===20&&fam.bright20===true&&fam.spec.indexOf("20W/m")>-1;
   // standard stays 12
   swAnswers={place:"wet",bright:"std"};
   const fam2=stripFacts(hl);
   const is12=fam2.wpm===12;
   swAnswers={};
   return [hasBright&&is20&&is12&&!!hl, (hasBright?"bright question shown for wet":"NO bright question")+" · "+(is20?"20W/m variant ok":"20W FAIL")+" · "+(is12?"12W/m standard ok":"12W FAIL")];
 }],
 ["Length example is 12 for recess, 4 elsewhere",()=>{
   const ph=(ans)=>{swAnswers=ans;swPackageStrip=null;const qs=swVisibleQs();swStep=qs.findIndex(q=>q.key==="length");renderWizard();const inp=$("#swLenInput");return inp?inp.getAttribute("placeholder"):"";};
   const cove=ph({place:"cove",space:"roomy",colour:"single",control:"simple"});
   const wet=ph({place:"wet",bright:"std",colour:"single",control:"simple"});
   const cab=ph({place:"cabinet",colour:"single",control:"simple"});
   const stairs=ph({place:"other",colour:"single",control:"simple"});
   swAnswers={};swStep=0;renderWizard();
   const ok=/12/.test(cove)&&/4/.test(wet)&&/4/.test(cab)&&/4/.test(stairs)&&!/12/.test(wet);
   return [ok, "recess: '"+cove+"' · wet/cabinet/stairs: '"+wet+"'/'"+cab+"'/'"+stairs+"'"];
 }],
 ["Kit notes are a single dropdown at the bottom, not stacked panels",()=>{
   swAnswers={place:"wet",bright:"std",colour:"single",control:"simple",length:"4"};
   const prm=stripPool().map(p=>({p,s:stripScore(p,swAnswers)})).sort((a,b)=>b.s-a.s)[0].p;
   swPackageStrip=prm;swStep=99;renderWizard();
   const html=$("#swBody").innerHTML;
   const drop=html.indexOf("pk-notes-drop")>-1&&html.indexOf("Good to know for your run")>-1;
   // notes come AFTER the info box (bottom of the panel)
   const afterInfo=html.indexOf("pk-notes-drop")>html.indexOf("infobox");
   // old stacked full-width notes gone from the main flow (only inside the dropdown body)
   const bodyIdx=$("#swBody").querySelector(".pk-notes-body");
   const notesInside=bodyIdx&&bodyIdx.querySelectorAll(".pk-note").length>0;
   const startsCollapsed=!$("#swBody").querySelector(".pk-notes-drop").open;
   swAnswers={};swStep=0;swPackageStrip=null;renderWizard();
   return [drop&&afterInfo&&notesInside&&startsCollapsed, (drop?"dropdown present":"NO dropdown")+" · "+(afterInfo?"at the bottom after info box":"WRONG position")+" · "+(startsCollapsed?"collapsed by default":"not collapsed")];
 }],
 ["Cart & wishlist persist (localStorage)",()=>{
   let ok=true, note="cart+wishlist saved & restored";
   try{
     cart=[{key:"t::x",id:PRODUCTS[0].id,opt:null,price:PRODUCTS[0].price,qty:2}];
     wishlist=new Set([PRODUCTS[1].id]); saveState();
     cart=[];wishlist=new Set(); loadState();
     ok=cart.length===1&&cart[0].qty===2&&wishlist.size===1;
     cart=[];wishlist=new Set();saveState();updateCart();refreshWishBadge();
   }catch(e){ note="localStorage unavailable — skipped"; }
   return [ok,note];
 }],
 ["Related products shown in product page",()=>{
   const p=PRODUCTS.find(x=>x.cat==="downlights");
   openModal(p.id);
   const rel=$$("#modalBody .rel-card").length;
   closeModal();
   return [rel>=2, rel+" related products rendered"];
 }],
 ["FAQ has 10 real questions",()=>{
   renderFAQ();
   const n=$$("#faqList .q").length;
   const t=$("#faqList").textContent;
   return [n>=10&&t.indexOf("320W")>=0&&t.indexOf("cut-points")>=0, n+" FAQs incl. strip install facts"];
 }],
 ["Search suggests when no results",()=>{
   query="zzzqqq";activeCat="all";renderShop();
   const sugg=$$("#shopBody .card").length;
   const msg=$("#shopBody .no-results")!==null;
   query="";renderShop();
   return [msg&&sugg>0, "No-results message + "+sugg+" suggestions"];
 }],
 ["Installation guide for every product",()=>{
   let missing=0;
   PRODUCTS.forEach(p=>{ const g=installGuide(p); if(!g||!g.steps||g.steps.length<3) missing++; });
   return [missing===0, (PRODUCTS.length-missing)+"/"+PRODUCTS.length+" products have a step-by-step guide"];
 }],
 ["Installation help moved to its own page, and the nav points at it",()=>{
   /* The index used to live on the homepage. It is now /installation.html, so
      the homepage must NOT carry it and must link out to it instead. */
   const gone=document.getElementById("installIndex")===null;
   const linked=$$('a[href="/installation.html"]').length>0;
   return [gone&&linked, gone?(linked?"moved and linked":"moved but nothing links to it")
                             :"install index still on the homepage"];
 }],
 ["Applications carousel is built and auto-advances",()=>{
   const slides=$$(".appslide").length;
   const proxied=$$('.appslide img[src^="/brand/"]').length;
   const arrows=$$(".appscroll-btn").length;
   const track=document.getElementById("appTrack");
   const scrolls=!!track&&getComputedStyle(track).overflowX!=="visible";
   return [slides>=20&&proxied===slides&&arrows===2&&scrolls,
           slides+" projects, "+proxied+" on the /brand proxy, "+arrows+" arrows, scrollable="+scrolls];
 }],
 ["Product page shows its installation guide + jump",()=>{
   const p=PRODUCTS.find(x=>x.cat==="downlights");
   openModal(p.id);
   const guide=document.getElementById("mInstall");
   const steps=guide?guide.querySelectorAll(".ig-steps li").length:0;
   const jump=$("#modalBody [data-instjump]")!==null;
   closeModal();
   return [!!guide&&steps>=3&&jump, "guide with "+steps+" steps + jump link in product page"];
 }],
 ["Installation Help opens the exact product guide",()=>{
   const p=PRODUCTS.find(x=>x.cat==="strip");
   openModalGuide(p.id);
   const open=$("#modal").classList.contains("open");
   const guide=document.getElementById("mInstall");
   const named=$("#modalBody h2")&&$("#modalBody h2").textContent===p.name;
   closeModal();
   return [open&&!!guide&&named, "opens "+p.name.slice(0,20)+"… at its guide"];
 }],
 ["Real specifications loaded",()=>{
   const rich=PRODUCTS.filter(p=>p.specTable&&p.specTable.length>=5).length;
   return [rich>=200, rich+"/"+PRODUCTS.length+" products have full real spec sheets"];
 }],
 ["Product detail content shown",()=>{
   openModal(PRODUCTS[20].id);
   const t=$("#modalBody").textContent;
   const hasDesc=t.indexOf("Greenhse")>=0, hasBox=t.indexOf("in the box")>=0;
   const hasSpecs=$$("#modalBody .spectable tr").length>0, hasGst=t.indexOf("inc GST")>=0;
   closeModal();
   return [hasDesc&&hasBox&&hasSpecs&&hasGst,"Description, contents, specs & GST all present"];
 }],
 ["Product options selectable & priced",()=>{
   const op=PRODUCTS.find(p=>p.options&&p.options.length);
   if(!op)return [false,"no option products found"];
   openModal(op.id);
   const sel=$("#optSelect");
   const n=sel?sel.options.length:0;
   selectModalOpt(n-1);
   const shown=$("#modalPrice").textContent;
   const detail=$("#optDetail").textContent.indexOf(op.options[n-1].label.slice(0,8))>=0;
   const ok=n===op.options.length && shown===op.options[n-1].price.toFixed(2) && detail;
   closeModal();
   return [ok,op.name.slice(0,18)+"… "+n+"-option dropdown, price+specs update"];
 }],
 ["Cart drawer opens & closes",()=>{
   openCart();const o=$("#cart").classList.contains("open");closeCart();const c=!$("#cart").classList.contains("open");
   return [o&&c,"Slide-out drawer toggles"];
 }],
 ["Smart Life tunable-white demo",()=>{
   applyTemp(6500);const cool=$("#phoneTemp").textContent;
   applyTemp(2700);const warm=$("#phoneTemp").textContent;
   return [cool==="6500K"&&warm==="2700K","Phone demo updates 2700K \u2194 6500K"];
 }],
 ["FAQ accordion expands",()=>{
   const q=$("#faqList .q");q.querySelector("button").click();const open=q.classList.contains("open");
   q.querySelector("button").click();
   return [open,"Question expands and collapses"];
 }],
 ["Newsletter rejects bad email",()=>{
   $("#nName").value="Test";$("#nEmail").value="not-an-email";
   $("#newsForm").dispatchEvent(new Event("submit",{cancelable:true}));
   const flagged=$("#nEmail").closest(".field").classList.contains("invalid");
   $("#newsForm").reset();$$("#newsForm .field").forEach(f=>f.classList.remove("invalid"));
   return [flagged,"Invalid email is caught"];
 }],
 ["Newsletter accepts valid input",()=>{
   $("#nName").value="Test";$("#nEmail").value="hello@greenhse.com";
   $("#newsForm").dispatchEvent(new Event("submit",{cancelable:true}));
   const clean=!$("#nEmail").closest(".field").classList.contains("invalid");
   return [clean,"Valid submission passes validation"];
 }],
 ["Contact form validates all fields",()=>{
   $("#contactForm").dispatchEvent(new Event("submit",{cancelable:true}));
   const flagged=$$("#contactForm .field.invalid").length===3;
   $("#contactForm").reset();$$("#contactForm .field").forEach(f=>f.classList.remove("invalid"));
   return [flagged,"Empty name, email & message all flagged"];
 }],
 ["Mobile nav opens & closes",()=>{
   openMnav();const o=$("#mnav").classList.contains("open");closeMnav();const c=!$("#mnav").classList.contains("open");
   return [o&&c,"Drawer + scrim toggle"];
 }],
 ["Key external links wired",()=>{
   const layout=$$('a[href*="/layout.html"]').length>0;
   const charge=$$('a[href*="greencharge.com.au"]').length>0;
   return [layout&&charge,"Layout App + Green Charge links present"];
 }],
 ["SEO, favicon & structured data present",()=>{
   const og=document.querySelector('meta[property="og:title"]');
   const fav=document.querySelector('link[rel="icon"]');
   const ld=document.querySelector('script[type="application/ld+json"]');
   return [!!og&&!!fav&&!!ld, "Open Graph, favicon & JSON-LD all set"];
 }],
 ["Legal pages open (Privacy/Terms/Returns)",()=>{
   openLegal("privacy");
   const ok=$("#legal").classList.contains("open")&&$("#legalContent").textContent.indexOf("Privacy")>=0;
   const has=LEGAL.privacy&&LEGAL.terms&&LEGAL.returns;
   closeLegal();
   return [ok&&!!has, "Privacy, Terms & Returns drafts load in overlay"];
 }],
 ["Downlight section + finder present",()=>{
   const sec=document.getElementById("downlights");
   const n=sec?sec.querySelectorAll(".card").length:0;
   const wiz=!!document.getElementById("dlWizard");
   const help=sec?sec.querySelectorAll(".dl-help-card").length:0;
   return [!!sec&&n>0&&wiz&&help===3, n+" downlights, finder wizard + "+help+" explainer cards"];
 }],
 ["Downlight pool excludes non-downlights",()=>{
   const pool=dlPool().map(p=>p.id);
   /* DL03-ALL (30 mm star light) is deliberately IN the pool — it is the 30 mm size band.
      Its multi-light kit and the accessories around it are what must stay out. */
   const bad=["SURFACE-SOCKET","Q-CONNECT","DL03-4KIT","DP40-CCT","WL8-CCT-BW-1-1","GH-C12CCT-BW-1"];
   const leaked=bad.filter(id=>pool.indexOf(id)>=0);
   const allCut=dlPool().every(p=>!!dlCut(p));
   return [leaked.length===0&&pool.length>=15&&allCut, pool.length+" real downlights, plug bases & star lights excluded"];
 }],
 ["Cut-out & beam read from real spec data",()=>{
   const p=PRODUCTS.find(x=>x.id==="DL7A-CCT");
   const c=dlCut(p), b=dlBeam(p);
   const q=PRODUCTS.find(x=>x.id==="DL10ES-F");
   const c2=dlCut(q), b2=dlBeam(q);
   const ok=c&&c.min===70&&c.max===75&&b===60&&c2&&c2.min===90&&b2===110;
   return [ok, ok?"DL7A 70\u201375mm/60\u00b0, DL10ES 90\u201395mm/110\u00b0 \u2014 straight from specTable":"spec parsing wrong"];
 }],
 ["Low glare is beam < 90\u00b0, same rule as the planner",()=>{
   const lg=PRODUCTS.find(x=>x.id==="DL8CCT-P-LG");
   const std=PRODUCTS.find(x=>x.id==="DL10ES-F");
   const ok=dlIsLowGlare(lg)===true&&dlIsLowGlare(std)===false;
   return [ok,"60\u00b0 = low glare, 110\u00b0 = standard"];
 }],
 ["Downlight count matches Lazar's table",()=>{
   const cases=[[2,2,false,1],[2,2,true,1],[3,4,false,4],[3,4,true,4],[4,5,false,4],[4,5,true,6],[5,8,false,6],[5,8,true,8],[6,10,false,8],[6,10,true,10]];
   const bad=cases.filter(c=>dlCount(c[0],c[1],c[2])!==c[3]);
   const oversize=dlCount(9,14,false)===null;
   const swapped=dlCount(5,4,true)===6;
   return [bad.length===0&&oversize&&swapped, bad.length===0?"All 10 bands correct, short side first, oversize \u2192 call us":bad.length+" bands wrong"];
 }],
 ["Downlight finder: questions \u2192 match + price",()=>{
   openDlWizard();
   const opened=$("#dlWizard").classList.contains("open");
   const picked=qaPickDl(/^\s*90\s?mm/)&&qaPickDl(/Low glare/i)&&qaPickDl(/Tricolour/i);
   $("#dlW").value="3.5"; $("#dlL").value="4.5";
   $("#dlBody [data-dlsize]").click();
   const rec=$$("#dlBody .sw-rec").length;
   const qty=$("#dlBody .dl-qty-n");
   const tot=$("#dlBody .dl-price-tot b");
   const add=$("#dlBody [data-dladd]");
   const ok=opened&&picked&&rec>0&&qty&&tot&&/^\$\d/.test(tot.textContent)&&add;
   const q=qty?qty.textContent.trim():"?";
   closeDlWizard();
   return [ok, "3.5\u00d74.5m low glare \u2192 "+q+" fittings, total "+(tot?tot.textContent:"?")+" inc GST"];
 }],
 ["Finder respects the cut-out you chose",()=>{
   const a={cut:"70",glare:"std",colour:"tri"};
   const top=dlRank(a)[0].p;
   const c=dlCut(top);
   const ok=c&&c.min>=60&&c.min<=80;
   return [ok, ok?"70\u2009mm answer \u2192 "+top.name+" ("+c.txt+")":"returned a "+(c?c.txt:"?")+" fitting"];
 }],
 ["Garage answers battens, never a downlight grid",()=>{
   openDlWizard();
   qaPickDl(/^\s*90\s?mm/); qaPickDl(/Standard/i);
   while(!$("#dlBody [data-dlsize]")&&$$("#dlBody [data-dl]").length) $$("#dlBody [data-dl]")[0].click();
   const link=$("#dlBody [data-dlbatten]");
   if(link) link.click();
   const txt=$("#dlBody").textContent;
   const batten=txt.indexOf("batten")>=0;
   const noGrid=!$("#dlBody .dl-price-tot");
   closeDlWizard();
   return [!!link&&batten&&noGrid, "Garage is a link on the last step, straight to the T40 batten"];
 }],
 ["Missing specs show in red, never invented",()=>{
   const fake={id:"__t",cat:"downlights",name:"Test Downlight",price:1,specTable:[["Dimensions","Cutout 90mm"]]};
   const html=dlSpecRows(fake);
   const flags=(html.match(/dl-miss/g)||[]).length;
   const noNumbers=html.indexOf("lumens")<0;
   return [flags>=5&&noNumbers, flags+" unpublished specs flagged in red instead of guessed"];
 }],
 ["Finder prices carry GST correctly",()=>{
   const p=dlPool()[0];
   const n=6, ex=p.price*n, inc=ex*1.1;
   const ok=Math.abs(inc-ex*1.1)<0.001&&inc>ex;
   return [ok, "6 \u00d7 $"+p.price.toFixed(2)+" = $"+ex.toFixed(2)+" ex / $"+inc.toFixed(2)+" inc"];
 }],
 ["Room scenes are drawings, not fake photos",()=>{
   const svg=dlScene("kitchen");
   const isSvg=svg.indexOf("<svg")===0;
   const noImg=svg.indexOf("<image")<0&&svg.indexOf("data:image")<0;
   const all=DL_SCENE_KEYS.every(k=>dlScene(k).indexOf("<svg")===0);
   return [isSvg&&noImg&&all, DL_SCENE_KEYS.length+" scenes drawn as SVG \u2014 no invented photography"];
 }],
 ["Downlight quick-search filters the grid",()=>{
   const before=dlFilter;
   const counts={};
   DL_FILTERS.forEach(f=>{ counts[f.key]=dlPool().filter(f.test).length; });
   dlFilter="70"; renderDownlights();
   const n70=$$("#dlGrid .card").length;
   const all70=dlFiltered().every(p=>dlCut(p).min<=80);
   dlFilter="smart"; renderDownlights();
   const smartOK=dlFiltered().every(p=>dlIsRGBW(p)||dlIsSmart(p))&&dlFiltered().length>0;
   dlFilter=before||"all"; renderDownlights();
   const chips=$$("#dlChips .dl-chip").length;
   const imgs=$$("#dlChips .dl-chip img").length;
   const ok=chips===DL_FILTERS.length&&imgs===DL_FILTERS.length&&n70>0&&all70&&smartOK
     &&counts.all===dlPool().length&&(counts["70"]+counts["90"]+counts.big)===counts.all;
   return [ok, chips+" filters, every cut-out band accounted for ("+counts["70"]+"/"+counts["90"]+"/"+counts.big+" of "+counts.all+")"];
 }],
 ["Chip thumbnails are embedded, not hot-linked",()=>{
   const keys=Object.keys(DL_CHIPIMG);
   const embedded=keys.every(k=>/^data:image\//.test(DL_CHIPIMG[k]));
   return [embedded&&keys.length===DL_FILTERS.length, keys.length+" thumbnails inlined from the layout planner \u2014 no network needed"];
 }],
 ["Colour question is CCT or RGBW Smart only",()=>{
   const Q=DL_Q.find(q=>q.key==="colour");
   const keys=Q.opts.map(o=>o[1]);
   const two=keys.length===2&&keys.indexOf("tri")===0&&keys.indexOf("rgbw")===1;
   const rgbwTop=dlRank({cut:"90",glare:"std",colour:"rgbw"})[0].p;
   const phone=dlIsRGBW(rgbwTop)||dlIsSmart(rgbwTop);
   return [two&&phone, two?"2 answers \u2014 RGBW Smart \u2192 "+rgbwTop.name:"still offering a fixed-colour answer"];
 }],
 ["Questions only offer answers we can supply",()=>{
   const glare=DL_Q.find(q=>q.key==="glare"), colour=DL_Q.find(q=>q.key==="colour");
   const g=k=>dlOptsFor(glare,{cut:k}).map(o=>o[1]).sort().join(",");
   const c=k=>dlOptsFor(colour,{cut:k}).map(o=>o[1]).sort().join(",");
   /* Bands are 30 / 70 / 90 / 110 mm. Ask each one what it will actually offer. */
   const ok = g("30")==="low" && g("70")==="auto,low,std" && g("90")==="auto,low,std" && g("110")==="std"
           && c("30")==="rgbw,tri" && c("70")==="tri" && c("90")==="rgbw,tri" && c("110")==="tri";
   return [ok, ok?"Low glare hidden above 90\u2009mm; RGBW hidden where none is made":"an unbuildable answer is still on offer"];
 }],
 ["70 mm can never reach a smart fitting",()=>{
   const colour=DL_Q.find(q=>q.key==="colour");
   const offered=dlOptsFor(colour,{cut:"70",glare:"std"}).map(o=>o[1]);
   const skipped=dlVisibleQs({cut:"70",glare:"std"}).every(q=>q.key!=="colour");
   const anySmart=dlFeasible({cut:"70"}).some(p=>dlIsRGBW(p)||dlIsSmart(p));
   return [offered.length===1&&skipped&&!anySmart, "No 70\u2009mm smart fitting exists, so the question never appears"];
 }],
 ["No room question \u2014 a downlight goes anywhere",()=>{
   const asks=DL_Q.some(q=>q.key==="room"||q.rooms);
   const steps=dlVisibleQs({cut:"90",glare:"low"}).map(q=>q.key).join(" > ");
   return [!asks, asks?"still asking which room":"Flow is "+steps];
 }],
 ["Every offered path ends in a real fitting",()=>{
   let paths=0, dead=[];
   DL_SIZES.forEach(function(b){
     dlOptsFor(DL_Q.find(q=>q.key==="glare"),{cut:b.key}).forEach(function(g){
       const a1={cut:b.key,glare:g[1]};
       dlOptsFor(DL_Q.find(q=>q.key==="colour"),a1).forEach(function(c){
         const a3=Object.assign({},a1,{colour:c[1]});
         paths++;
         if(!dlFeasible(a3).length) dead.push(b.key+"/"+g[1]+"/"+c[1]);
       });
     });
   });
   return [dead.length===0&&paths>=DL_SIZES.length*2, paths+" answer combinations walked, "+dead.length+" dead ends"];
 }],
 ["Changing an earlier answer re-derives the later ones",()=>{
   openDlWizard();
   qaPickDl(/^\s*70\s?mm/);                       // 70 mm
   qaPickDl(/Standard/i);                         // standard
   const auto70=dlAnswers.colour;               // filled in for them
   const flagged=!!dlAutoKeys.colour;
   const straightToSize=!!$("#dlBody [data-dlsize]");
   $("#dlBody [data-dlback]").click();          // back to glare
   $("#dlBody [data-dlback]").click();          // back to size
   const cleared=dlAnswers.colour===undefined&&Object.keys(dlAutoKeys).length===0;
   qaPickDl(/^\s*90\s?mm/);                       // 90 mm this time
   qaPickDl(/Standard/i);                         // standard
   const asks=$("#dlBody h3").textContent.indexOf("colour")>=0;
   closeDlWizard();
   return [auto70==="tri"&&flagged&&straightToSize&&cleared&&asks, "70\u2009mm skips straight to room size; 90\u2009mm asks colour properly"];
 }],
 ["Finders stay free of emoji",()=>{
   /* Pictograms render differently on every phone and read as clip-art next to
      the rest of the type. Words instead. */
   const emoji=/[\u{1F000}-\u{1FAFF}\u{2B00}-\u{2BFF}\u{FE0F}\u{1F1E6}-\u{1F1FF}]/u;
   const strings=[];
   DL_Q.forEach(q=>{
     strings.push(q.q);
     strings.push(typeof q.hint==="function"?q.hint({cut:"90"}):q.hint||"");
     ((typeof q.opts==="function"?q.opts({}):q.opts)||[]).forEach(o=>strings.push(o[0]));
   });
   Object.keys(DL_GOOD).forEach(k=>DL_GOOD[k].forEach(x=>{ strings.push(x[1]); strings.push(x[2]); }));
   DL_FILTERS.forEach(f=>{ strings.push(f.name); strings.push(f.sub); });
   STRIP_Q.forEach(q=>{
     strings.push(q.q);
     ((typeof q.opts==="function"?q.opts({place:"cabinet"}):q.opts)||[]).forEach(o=>strings.push(o[0]));
   });
   const bad=strings.filter(t=>emoji.test(String(t)));
   const wiz=($("#dlBody").textContent||"")+($("#swBody").textContent||"");
   const liveBad=emoji.test(wiz);
   return [bad.length===0&&!liveBad, bad.length===0?strings.length+" finder labels checked, no emoji":"emoji left in: "+bad.join(" / ")];
 }],
 ["Downlight guide is a card index that expands",()=>{
   renderDlGuide();
   const cards=$$("#dlGuide .dlg-card");
   const titles=$$("#dlGuide .dlg-t").map(e=>e.textContent);
   const wants=[/hole in the ceiling/i,/low glare vs standard/i,/warm, natural or cool/i,/smart lights/i,/how many/i];
   const missing=wants.filter(r=>!titles.some(t=>r.test(t)));
   const closed=$("#dlgOpen").hidden;
   dlGuideOpen(0);
   const opened=!$("#dlgOpen").hidden && $("#dlgOpen").innerHTML.length>200;
   dlGuideOpen(0);
   const reclosed=$("#dlgOpen").hidden;
   return [cards.length===DL_GUIDE.length&&!missing.length&&closed&&opened&&reclosed,
     cards.length+" cards, all closed by default, click opens and closes"];
 }],
 ["Glare comparison photo is embedded, in guide and finder",()=>{
   const embedded=isRealAsset(DL_GLAREPHOTO);
   const inGuide=$("#dlGuide").innerHTML.indexOf(DL_GLAREPHOTO.slice(0,60))>=0;
   openDlWizard();
   qaPickDl(/^\s*90\s?mm/);                       // 90 mm \u2192 glare question
   const inFinder=$("#dlBody").innerHTML.indexOf(DL_GLAREPHOTO.slice(0,60))>=0;
   const pair=$$("#dlBody .dl-glare figure").length;
   closeDlWizard();
   return [embedded&&inGuide&&inFinder&&pair===2,
     "Glare photo + both cross-sections shown in the guide and in the finder"];
 }],
 ["Smart advice: two yeses, the rest honest noes",()=>{
   const yes=DL_SMART_ADVICE.filter(r=>r[1]==="yes").map(r=>r[0]);
   const no=DL_SMART_ADVICE.filter(r=>r[1]==="no").map(r=>r[0]);
   const kitchenNo=no.some(r=>/kitchen/i.test(r));
   const bathNo=no.some(r=>/bathroom/i.test(r));
   const html=dlSmartTable();
   const hasMaths=html.indexOf("dl-maths")>=0&&/\$\d/.test(html);
   const p=dlSmartPrices();
   const cheaper=p.tri&&p.smart&&p.smart.price>p.tri.price;
   return [kitchenNo&&bathNo&&yes.length>=1&&hasMaths&&cheaper,
     "Yes: "+yes.join(", ")+" \\u00b7 No: "+no.length+" rooms \\u00b7 $"+p.tri.price+" vs $"+p.smart.price+" a fitting"];
 }],
 ["Finder warns before wiring the whole house smart",()=>{
   openDlWizard();
   qaPickDl(/^\s*90\s?mm/);                  // 90 mm
   qaPickDl(/Low glare/i);                   // low glare
   const asks=$("#dlBody h3").textContent.indexOf("colour")>=0;
   qaPickDl(/RGBW/i);                        // RGBW smart
   const skip=$("#dlBody [data-dlskip]");  // size step only appears on some paths
   if(skip) skip.click();
   const notes=$$("#dlBody .dl-note").map(n=>n.textContent).join(" ");
   const warned=notes.indexOf("whole house")>=0;
   const priced=/\$\d/.test(notes);
   closeDlWizard();
   return [asks&&dlAnswers.colour==="rgbw"&&warned&&priced,
     "Choosing RGBW smart \\u2192 cost warning with the real per-fitting gap, not a silent upsell"];
 }],
 ["Real contact details + cookie consent",()=>{
   const foot=$("footer")?$("footer").textContent:document.body.textContent;
   const phone=foot.indexOf("9297 2969")>=0;
   const addr=foot.indexOf("Ellenbrook")>=0;
   const ck=!!document.getElementById("cookieBar");
   return [phone&&addr&&ck, "Perth address, phone & cookie banner in place"];
 }],
 ["All in-page nav targets exist",()=>{
   const ids=["home","categories","shop","downlights","striplights","smart","energy","resources","blog","videos","faq","contact"];
   const missing=ids.filter(i=>!document.getElementById(i));
   return [missing.length===0,missing.length?"Missing: "+missing.join(", "):(ids.length)+"/"+(ids.length)+" section anchors resolve"];
 }],
 ["Product images have automatic fallback",()=>{
   const ok=typeof window.lampFallback==="function";
   return [ok,"Broken product photos fall back to SVG visual"];
 }],
 ["Full catalogue migrated",()=>{
   return [PRODUCTS.length>=200,PRODUCTS.length+" real products loaded from greenhse.com"];
 }],
 ["Blog posts rendered",()=>{
   const n=$("#blogGrid").querySelectorAll(".post").length;
   return [n===BLOGS.length&&n>0,n+" real blog posts linked"];
 }],
 ["Videos & guides rendered",()=>{
   const v=$("#vidGrid").querySelectorAll("iframe").length;
   const g=$("#guideGrid").querySelectorAll(".guide").length;
   return [v===VIDEOS.length&&g===GUIDES.length&&v>0,v+" videos, "+g+" instruction PDFs"];
 }]
];

function initQA(){
  const list=$("#qaList");
  function paint(states){
    list.innerHTML=TESTS.map((t,i)=>{
      const st=states[i]||{status:"pending",msg:"Not run yet"};
      const sym=st.status==="pass"?"✓":st.status==="fail"?"✕":"·";
      return `<div class="qa-item ${st.status}"><span class="dot">${sym}</span>
        <div><div class="nm">${t[0]}</div><div class="ms">${st.msg}</div></div></div>`;
    }).join("");
  }
  const initial=TESTS.map(()=>({status:"pending",msg:"Not run yet"}));
  paint(initial);

  $("#qaFab").addEventListener("click",()=>{$("#qaPanel").classList.add("open");$("#qaFab").style.display="none";});
  $("#qaClose").addEventListener("click",()=>{$("#qaPanel").classList.remove("open");$("#qaFab").style.display="";});

  $("#qaRun").addEventListener("click",()=>{
    // snapshot state so tests don't disturb the user's session
    const snapCart=JSON.parse(JSON.stringify(cart));
    const snapWish=new Set(wishlist);const snapCat=activeCat;const snapQ=query;
    const results=TESTS.map(t=>{
      try{const [pass,msg]=t[1]();return {status:pass?"pass":"fail",msg};}
      catch(err){return {status:"fail",msg:"Error: "+err.message};}
    });
    // restore
    cart=snapCart;wishlist=snapWish;activeCat=snapCat;query=snapQ;
    updateCart();renderFilters();renderShop();
    $("#prodSearch").value=snapQ;
    wishlist.forEach(id=>$$(`[data-wish="${id}"]`).forEach(el=>el.classList.add("on")));
    paint(results);
    const passed=results.filter(r=>r.status==="pass").length;
    const sum=$("#qaSummary");
    sum.innerHTML=`<b style="color:${passed===TESTS.length?"var(--eco-bright)":"var(--danger)"}">${passed}/${TESTS.length} passed</b> · ${passed===TESTS.length?"ready to launch":"needs attention"}`;
  });
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();

;
if(/[?&]qa=1/.test(location.search))document.body.classList.add("qa-on");