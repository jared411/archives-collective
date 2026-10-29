(()=>{
const c=window.ARCHIVES_CONFIG||{};
const numbers=(c.WHATSAPP_NUMBERS||[c.WHATSAPP_NUMBER||"254115015610"]).map(n=>String(n).replace(/\D/g,""));
const ig=c.INSTAGRAM_URL||"https://www.instagram.com/archives._collective/";
const $=id=>document.getElementById(id);
$("ig").href=ig;
const message="Hi Archives Collective! I'd like to enquire about your tops.";
$("wa").innerHTML=numbers.map((n,i)=>`<a class="button red" style="display:inline-block;margin:6px 8px 6px 0" target="_blank" rel="noopener" href="https://wa.me/${n}?text=${encodeURIComponent(message)}">WhatsApp ${i+1}: ${n.replace(/^254/,"0")} ↗</a>`).join("");
const ready=c.SUPABASE_URL&&!c.SUPABASE_URL.includes("PASTE_")&&c.SUPABASE_ANON_KEY&&!c.SUPABASE_ANON_KEY.includes("PASTE_");
function esc(s){return String(s??"").replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]))}
function fallback(){$("products").innerHTML='<div class="msg">The collection is being updated. Visit Instagram or message us on WhatsApp for available tops.</div>'}
if(!ready||!window.supabase){fallback();return}
const db=window.supabase.createClient(c.SUPABASE_URL,c.SUPABASE_ANON_KEY);
db.from("products").select("id,name,description,price,image_url,product_variants(size,stock_quantity)").eq("is_active",true).order("created_at",{ascending:false}).then(({data,error})=>{
 if(error){console.error(error);fallback();return}
 const ps=(data||[]).filter(p=>(p.product_variants||[]).some(v=>+v.stock_quantity>0));
 if(!ps.length){$("products").innerHTML='<div class="msg">The next drop is on its way. Follow us on Instagram for new finds.</div>';return}
 $("products").innerHTML=ps.map(p=>{
  const vs=p.product_variants||[],qty=vs.reduce((s,v)=>s+(+v.stock_quantity||0),0),sizes=vs.filter(v=>+v.stock_quantity>0).map(v=>v.size).join(", "),msg=`Hi Archives Collective! I'm interested in ${p.name}. Please confirm price and available sizes (${sizes}).`;
  const links=numbers.map((n,i)=>`<a target="_blank" rel="noopener" href="https://wa.me/${n}?text=${encodeURIComponent(msg)}">WhatsApp ${i+1} ↗</a>`).join(" ");
  return `<article class="card"><div class="photo">${p.image_url?`<img loading="lazy" src="${esc(p.image_url)}" alt="${esc(p.name)}">`:""}<span class="tag">${qty<=2?"LAST PIECES":"CURATED FIND"}</span></div><div class="info"><div><h3>${esc(p.name)}</h3><p>${esc(p.description||"A pre-loved find, ready for a new story.")}</p><p style="margin-top:7px">Sizes: ${esc(sizes)}</p></div><span class="price">${+p.price?"KSh "+(+p.price).toLocaleString("en-KE"):"Ask for price"}</span></div><div class="cardfoot"><span>${qty} in stock</span><div>${links}</div></div></article>`
 }).join("")
})
})();
