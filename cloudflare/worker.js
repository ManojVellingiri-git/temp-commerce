/**
 * Cloudflare Worker for Gurkhahills R2 Image Storage
 * Handles secure direct image uploads from Gurkhahills Admin into Cloudflare R2 with CORS.
 */

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // POST /upload - Uploads product image to R2
    if (url.pathname === '/upload' && request.method === 'POST') {
      try {
        const formData = await request.formData();
        const file = formData.get('file');
        if (!file) {
          return new Response(JSON.stringify({ error: 'No file uploaded' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const safeName = (file.name || 'product.webp').toLowerCase().replace(/[^a-z0-9._-]/g, '-');
        const key = `products/${Date.now()}-${safeName}`;

        // Stream into Cloudflare R2 bucket binding
        await env.MY_BUCKET.put(key, file.stream(), {
          httpMetadata: { contentType: file.type || 'image/webp' },
        });

        const publicDomain = (env.PUBLIC_DOMAIN || 'https://pub-r2.gurkhahills.com').replace(/\/+$/, '');
        const publicUrl = `${publicDomain}/${key}`;

        return new Response(JSON.stringify({ success: true, key, url: publicUrl }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response('Gurkhahills Cloudflare R2 Upload Service Active', {
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
    });
  },
};

