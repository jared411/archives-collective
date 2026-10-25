ARCHIVES COLLECTIVE — SHOP UPGRADE

Files included: index.html (public shop), admin.html (dashboard), style.css, shop.js, admin.js, config.js.

1) Open config.js and replace the two placeholders with your Supabase Project URL and anon/public/publishable key from Supabase > Project Settings > API. NEVER use the service_role/secret key in public code.
2) Upload all six files to the ROOT of your existing archives-collective GitHub repository, replacing the existing index.html and adding the other files. Keep filenames unchanged.
3) Wait for GitHub Pages to redeploy.
Public shop: https://jared411.github.io/archives-collective/
Admin: https://jared411.github.io/archives-collective/admin.html

Features: public product catalogue and WhatsApp enquiries; admin login; product add/edit/delete; image upload; size and stock quantities; product visibility; record WhatsApp orders; update order statuses; completed-sales totals. No cost/profit tracking.

Before launch, check Supabase RLS policies and Storage policies. Keep sign-ups disabled if only the two shop administrators should have accounts. The public anon key is designed for browser use only with correct RLS; never use a service_role key.

Important: this is a first release. When a pending/confirmed order is later marked completed, stock is not automatically deducted; update stock manually. An order created as completed deducts stock. Test with a temporary product first. For robust high-volume use, replace frontend stock deductions with a database transaction/RPC.
