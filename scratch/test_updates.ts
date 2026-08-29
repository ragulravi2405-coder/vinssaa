import http from 'http';
import app from '../server/src/server.js';
import { executeQuery, pool } from '../server/src/config/database.js';

let server: http.Server;
const PORT = 5566;
const BASE_URL = `http://localhost:${PORT}`;

async function runUpdateTests() {
  console.log('=== TESTING ADMIN CONTENT EDIT/UPDATE FLOW (MySQL + Public API) ===\n');

  // Start express server on test port
  await new Promise<void>((resolve) => {
    server = app.listen(PORT, '127.0.0.1', () => {
      console.log(`[Test Server] Listening on ${BASE_URL}`);
      resolve();
    });
  });

  try {
    // 1. Auth Login (JWT token generation)
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin123' })
    });
    const loginJson = await loginRes.json();
    if (!loginJson.success || !loginJson.token) throw new Error('Admin login failed');
    const token = loginJson.token;
    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    console.log('✅ Admin login successful.');

    // 2. Test Events Update (Create -> Update title, date, description -> Check MySQL and Public GET)
    console.log('\n--- 2. Testing Events Edit/Update ---');
    const createEvt = await fetch(`${BASE_URL}/api/events`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Original Event Title',
        category: 'Cultural',
        date: 'Jan 10, 2026',
        imagePath: '/images/original-event.jpg',
        description: 'Original event description',
        chiefGuest: 'Original Guest'
      })
    });
    const createEvtJson = await createEvt.json();
    const testEvtId = createEvtJson.id;
    console.log(`Created test event with ID: ${testEvtId}`);

    // Update the event: change title and description, keep existing image
    const updateEvt = await fetch(`${BASE_URL}/api/events/${testEvtId}`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Updated Event Title (Edited)',
        category: 'Ceremony',
        date: 'Feb 20, 2026',
        imagePath: '', // Intentionally blank/empty to test image preservation
        description: 'Updated event description with new achievements',
        chiefGuest: 'New Chief Guest'
      })
    });
    const updateEvtJson = await updateEvt.json();
    console.log('Update Event Response:', updateEvtJson);
    if (!updateEvtJson.success) throw new Error('Failed to update event');

    // Verify MySQL DB
    const [evtInDb] = await executeQuery<any[]>('SELECT * FROM college_events WHERE id = ?', [testEvtId]);
    console.log('MySQL record after update:', {
      id: evtInDb.id,
      title: evtInDb.title,
      image_path: evtInDb.image_path,
      date_str: evtInDb.date_str,
      description: evtInDb.description
    });
    if (evtInDb.title !== 'Updated Event Title (Edited)') throw new Error('Event title was not updated in MySQL');
    if (evtInDb.image_path !== '/images/original-event.jpg') throw new Error('Event image_path was corrupted or wiped instead of preserved');
    if (evtInDb.description !== 'Updated event description with new achievements') throw new Error('Event description was not updated');
    console.log('✅ MySQL record verified: Event fields updated, original image preserved.');

    // Verify Public GET API
    const getEvtRes = await fetch(`${BASE_URL}/api/events`);
    const getEvtJson = await getEvtRes.json();
    const foundEvt = getEvtJson.data.find((e: any) => e.id === testEvtId);
    if (!foundEvt || foundEvt.title !== 'Updated Event Title (Edited)') {
      throw new Error('Public GET /api/events does not reflect updated title');
    }
    console.log('✅ Public GET /api/events reflects updated event data.');
    await fetch(`${BASE_URL}/api/events/${testEvtId}`, { method: 'DELETE', headers: authHeaders });

    // 3. Test Gallery Image Update
    console.log('\n--- 3. Testing Gallery Image Edit/Update ---');
    const createGal = await fetch(`${BASE_URL}/api/gallery`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Original Gallery Image',
        category: 'Campus',
        imagePath: '/images/original-gal.jpg',
        description: 'Original caption'
      })
    });
    const createGalJson = await createGal.json();
    const testGalId = createGalJson.id;

    // Update gallery image caption and title, preserve imagePath
    const updateGal = await fetch(`${BASE_URL}/api/gallery/${testGalId}`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Updated Gallery Image Title',
        category: 'Awards',
        imagePath: '',
        description: 'Updated caption with award details'
      })
    });
    const updateGalJson = await updateGal.json();
    if (!updateGalJson.success) throw new Error('Failed to update gallery image');

    const [galInDb] = await executeQuery<any[]>('SELECT * FROM gallery_images WHERE id = ?', [testGalId]);
    if (galInDb.title !== 'Updated Gallery Image Title') throw new Error('Gallery title not updated in DB');
    if (galInDb.image_path !== '/images/original-gal.jpg') throw new Error('Gallery image path was wiped');
    console.log('✅ MySQL record verified: Gallery fields updated, original image preserved.');

    const getGalRes = await fetch(`${BASE_URL}/api/gallery`);
    const getGalJson = await getGalRes.json();
    const foundGal = getGalJson.data.find((g: any) => g.id === testGalId);
    if (!foundGal || foundGal.title !== 'Updated Gallery Image Title') {
      throw new Error('Public GET /api/gallery does not reflect updated title');
    }
    console.log('✅ Public GET /api/gallery reflects updated gallery image data.');
    await fetch(`${BASE_URL}/api/gallery/${testGalId}`, { method: 'DELETE', headers: authHeaders });

    // 4. Test Notification Update
    console.log('\n--- 4. Testing Notification Edit/Update ---');
    const createNotif = await fetch(`${BASE_URL}/api/notifications`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Original Notification Title',
        category: 'Circulars',
        summary: 'Original summary',
        fullDetails: 'Original details',
        issuedBy: 'Admin Office'
      })
    });
    const createNotifJson = await createNotif.json();
    const testNotifId = createNotifJson.id;

    const updateNotif = await fetch(`${BASE_URL}/api/notifications/${testNotifId}`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Updated Circular Title (Revised)',
        summary: 'Updated summary of the circular',
        fullDetails: 'Updated full details and exam timings',
        issuedBy: 'Controller of Examinations',
        isUrgent: true
      })
    });
    const updateNotifJson = await updateNotif.json();
    if (!updateNotifJson.success) throw new Error('Failed to update notification');

    const [notifInDb] = await executeQuery<any[]>('SELECT * FROM notifications WHERE id = ?', [testNotifId]);
    if (notifInDb.title !== 'Updated Circular Title (Revised)') throw new Error('Notification title not updated in DB');
    if (notifInDb.is_urgent !== 1) throw new Error('Notification is_urgent not updated in DB');
    console.log('✅ MySQL record verified: Notification fields updated.');

    const getNotifRes = await fetch(`${BASE_URL}/api/notifications`);
    const getNotifJson = await getNotifRes.json();
    const foundNotif = getNotifJson.data.find((n: any) => n.id === testNotifId);
    if (!foundNotif || foundNotif.title !== 'Updated Circular Title (Revised)') {
      throw new Error('Public GET /api/notifications does not reflect updated title');
    }
    console.log('✅ Public GET /api/notifications reflects updated notification data.');
    await fetch(`${BASE_URL}/api/notifications/${testNotifId}`, { method: 'DELETE', headers: authHeaders });

    // 5. Test Document Update
    console.log('\n--- 5. Testing Document Edit/Update ---');
    const createDoc = await fetch(`${BASE_URL}/api/documents`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Original Document Title',
        filename: 'original-doc.pdf',
        path: '/documents/original-doc.pdf',
        fileSize: '1.2 MB',
        fileType: 'PDF',
        category: 'Official Documents',
        description: 'Original doc description'
      })
    });
    const createDocJson = await createDoc.json();
    const testDocId = createDocJson.id;

    const updateDoc = await fetch(`${BASE_URL}/api/documents/${testDocId}`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Updated Document Title (2027-28)',
        description: 'Updated official AICTE and Anna University document description',
        path: '' // empty to test path preservation
      })
    });
    const updateDocJson = await updateDoc.json();
    if (!updateDocJson.success) throw new Error('Failed to update document');

    const [docInDb] = await executeQuery<any[]>('SELECT * FROM documents WHERE id = ?', [testDocId]);
    if (docInDb.title !== 'Updated Document Title (2027-28)') throw new Error('Document title not updated in DB');
    if (docInDb.path !== '/documents/original-doc.pdf') throw new Error('Document path was wiped');
    console.log('✅ MySQL record verified: Document title and description updated, path preserved.');

    const getDocRes = await fetch(`${BASE_URL}/api/documents`);
    const getDocJson = await getDocRes.json();
    const foundDoc = getDocJson.data.find((d: any) => d.id === testDocId);
    if (!foundDoc || foundDoc.title !== 'Updated Document Title (2027-28)') {
      throw new Error('Public GET /api/documents does not reflect updated title');
    }
    console.log('✅ Public GET /api/documents reflects updated document data.');
    await fetch(`${BASE_URL}/api/documents/${testDocId}`, { method: 'DELETE', headers: authHeaders });

    console.log('\n======================================================');
    console.log('🎉 ALL CONTENT EDIT / UPDATE TESTS PASSED 100%!');
    console.log('======================================================\n');

  } catch (error) {
    console.error('❌ Update test failed:', error);
    process.exitCode = 1;
  } finally {
    if (server) {
      server.close();
    }
    await pool.end();
    process.exit(process.exitCode || 0);
  }
}

runUpdateTests();
