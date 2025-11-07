// api/content.ts
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req: Request): Promise<Response> {

    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
        return new Response(JSON.stringify({ error: 'Missing Upstash env' }), {
            status: 500, headers: { 'Content-Type': 'application/json' },
        });
    }

    if (req.method === 'GET') {
        const data = await redis.get('content');
        return new Response(JSON.stringify(data ?? null), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (req.method === 'PUT') {
        const adminKey = req.headers.get('x-admin-key') || '';
        if (!adminKey || adminKey !== process.env.ADMIN_SECRET) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const body = await req.json();
        if (!body || !body.about || !body.skills || !body.projects) {
            return new Response(JSON.stringify({ error: 'Invalid payload' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        await redis.set('content', body);
        return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET, PUT' },
    });
}