/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient } from 'mongodb';
import { attachDatabasePool } from '@vercel/functions';

const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-key',
};

type ContentDoc = {
    _id: string;
    about: unknown;
    skills: unknown;
    projects: unknown;
}

const client = new MongoClient(process.env.MONGODB_URI || '');

attachDatabasePool(client);

async function getDb() {
    const dbName = process.env.MONGODB_DB || 'brain-portfolio';
    return client.db(dbName);
}

export default async function handler(req: Request): Promise<Response> {
    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: cors });
    }

    try {
        const db = await getDb();
        const col = db.collection<ContentDoc>('content');
        if (req.method === 'GET') {
            const doc = await col.findOne<{ about: unknown; skills: unknown; projects: unknown }>({ _id: 'singleton' });
            return new Response(JSON.stringify(doc ? { about: doc.about, skills: doc.skills, projects: doc.projects } : null), {
                status: 200, headers: { 'Content-Type': 'application/json', ...cors },
            });
        }

        if (req.method === 'PUT') {
            const adminKey = req.headers.get('x-admin-key') || '';
            if (!adminKey || adminKey !== process.env.ADMIN_SECRET) {
                return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json', ...cors } });
            }
            const body = await req.json();
            if (!body || !body.skills || !body.projects) {
                return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400, headers: { 'Content-Type': 'application/json', ...cors } });
            }
            await col.updateOne({ _id: 'singleton' }, { $set: body }, { upsert: true });
            return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json', ...cors } })
        }

        return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, PUT, OPTIONS', ...cors } })
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e?.message || 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json', ...cors } })
    }
}