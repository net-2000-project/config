export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const uuid = url.searchParams.get('uuid');

    if (!uuid) {
      return new Response('Usage: ?uuid=YOUR_UUID', { status: 400 });
    }

    const githubUrl = 'https://raw.githubusercontent.com/net-2000-project/config/main/net-2000.yaml';
    
    try {
      const response = await fetch(githubUrl);
      if (!response.ok) throw new Error('GitHub fetch failed');
      
      let config = await response.text();
      config = config.replaceAll('{{UUID}}', uuid);

      return new Response(config, {
        headers: { 
          'content-type': 'text/yaml; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        },
      });
    } catch (e) {
      return new Response('Error: Failed to fetch config from GitHub', { status: 500 });
    }
  },
};
