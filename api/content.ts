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
// Check if MONGODB_URI is provided
if (!process.env.MONGODB_URI) {
    console.error("FATAL: MONGODB_URI environment variable is not set.");
} else {
    console.log("MONGODB_URI is set, initializing client.");
}

const client = new MongoClient(process.env.MONGODB_URI || '');

console.log("Attaching database pool...");
attachDatabasePool(client);
console.log("Database pool attached.");

async function getDb() {
    console.log("getDb function called.");
    const dbName = process.env.MONGODB_DB || 'brain-portfolio';
    console.log(`Attempting to get database: ${dbName}`);
    const db = client.db(dbName);
    console.log("Database object created, returning.");
    return db;
}

export default async function handler(req: Request): Promise<Response> {
    console.log(`[${req.method}] /api/content handler started.`);

    if (req.method === 'OPTIONS') {
        console.log("Handling OPTIONS request.");
        return new Response(null, { status: 204, headers: cors });
    }

    try {
        console.log("Inside try block. Calling getDb()...");
        const db = await getDb();
        console.log("getDb() returned. Getting 'content' collection...");
        const col = db.collection<ContentDoc>('content');
        console.log("'content' collection retrieved.");

        if (req.method === 'GET') {
            console.log("Handling GET request. Calling findOne()...");
            const doc = await col.findOne<{ about: unknown; skills: unknown; projects: unknown }>({ _id: 'singleton' });
            console.log("findOne() completed.");
            return new Response(JSON.stringify(doc ? { about: doc.about, skills: doc.skills, projects: doc.projects } : null), {
                status: 200, headers: { 'Content-Type': 'application/json', ...cors },
            });
        }

        if (req.method === 'PUT') {
            console.log("Handling PUT request. Checking admin key...");
            const adminKey = req.headers.get('x-admin-key') || '';
            if (!adminKey || adminKey !== process.env.ADMIN_SECRET) {
                console.error("Unauthorized attempt: Admin key mismatch or missing.");
                return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json', ...cors } });
            }
            console.log("Admin key authorized. Parsing request body...");
            const body = await req.json();
            console.log("Request body parsed.");
            if (!body || !body.skills || !body.projects) {
                console.error("Invalid payload.");
                return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400, headers: { 'Content-Type': 'application/json', ...cors } });
            }
            console.log("Payload is valid. Calling updateOne()...");
            await col.updateOne({ _id: 'singleton' }, { $set: body }, { upsert: true });
            console.log("updateOne() completed successfully.");

            return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json', ...cors } })
        }

        console.log(`Method ${req.method} not allowed.`);
        return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, PUT, OPTIONS', ...cors } })
    } catch (e: any) {
        console.error("!!! UNCAUGHT EXCEPTION IN HANDLER !!!");
        console.error(e);
        return new Response(JSON.stringify({ error: e?.message || 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json', ...cors } })
    }
}