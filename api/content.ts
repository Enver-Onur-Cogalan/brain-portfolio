/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient } from 'mongodb';
import { attachDatabasePool } from '@vercel/functions';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-key',
};


const client = new MongoClient(process.env.MONGODB_URI || '');
attachDatabasePool(client);

async function getDb() {
    const dbName = process.env.MONGODB_DB || 'brain-portfolio';
    return client.db(dbName);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key');

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: cors });
    }

    try {
        const db = await getDb();
        const col = db.collection('content');

        if (req.method === 'GET') {
            const doc = await col.findOne({ _id: 'singleton' });
            return res.status(200).json(doc ? { about: doc.about, skills: doc.skills, projects: doc.projects } : null)
        }

        if (req.method === 'PUT') {
            const adminKey = req.headers['x-admin-key'] || '';
            if (!adminKey || adminKey !== process.env.ADMIN_SECRET) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const body = await req.body;
            if (!body || !body.skills || !body.projects) {
                console.error("Invalid payload.");
                return res.status(400).json({ error: 'Invalid Payload' });
            }

            await col.updateOne({ _id: 'singleton' }, { $set: body }, { upsert: true });
            return res.status(200).json({ ok: true });
        }

        res.setHeader('Allow', 'GET, PUT, OPTIONS');
        return res.status(405).send('Method Not Allowed');

    } catch (e: any) {
        console.error("API Error", e);
        return res.status(500).json({ error: e?.message || 'Server error' });
    }
}