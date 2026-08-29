import http from 'http';
import app from '../server/src/server.js';
import { executeQuery, pool } from '../server/src/config/database.js';

let server: http.Server;
const PORT = 5555;
const BASE_URL = `http://localhost:${PORT}`;

async function runTests() {
  console.log('=== STARTING END-TO-END INTEGRATION TESTS ===\n');

  // Start express server on test port
  await new Promise<void>((resolve) => {
    server = app.listen(PORT, '127.0.0.1', () => {
      console.log(`[Test Server] Listening on ${BASE_URL}`);
      resolve();
    });
  });

  try {
    // 1. Health Check
    console.log('\n--- 1. Testing Health Endpoint ---');
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    const healthJson = await healthRes.json();
    console.log('Health Response:', healthJson);
    if (!healthJson.success || !healthJson.database.connected) throw new Error('Health check failed');
    console.log('✅ Health check passed: MySQL connected.');

    // 2. Auth Login (JWT token generation)
    console.log('\n--- 2. Testing Admin Authentication ---');
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin123' })
    });
    const loginJson = await loginRes.json();
    console.log('Login Response:', { success: loginJson.success, hasToken: !!loginJson.token });
    if (!loginJson.success || !loginJson.token) throw new Error('Admin login failed');
    const token = loginJson.token;
    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    console.log('✅ Admin login passed: JWT Token acquired.');

    // 3. Events Integration (POST -> MySQL SELECT -> GET -> PUT -> DELETE)
    console.log('\n--- 3. Testing Events Integration (Admin -> MySQL -> Public GET) ---');
    const testEventId = `test-evt-${Date.now()}`;
    const createEventRes = await fetch(`${BASE_URL}/api/events`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Integration Test Event',
        subtitle: 'Automated Testing',
        category: 'Workshop',
        date: 'October 15, 2026',
        imagePath: '/images/test-event.jpg',
        description: 'This is a MySQL integration test.',
        chiefGuest: 'Prof. Testing Expert'
      })
    });
    const createEventJson = await createEventRes.json();
    console.log('Create Event Response:', createEventJson);
    if (!createEventJson.success) throw new Error('Failed to create event');
    const createdEventId = createEventJson.id;

    // Verify record in MySQL database
    const [eventInDb] = await executeQuery<any[]>('SELECT * FROM college_events WHERE id = ?', [createdEventId]);
    console.log('MySQL Database Record for Event:', eventInDb);
    if (!eventInDb || eventInDb.title !== 'Integration Test Event') {
      throw new Error('Event not found in MySQL college_events table');
    }
    console.log('✅ Event successfully verified in MySQL college_events table.');

    // Verify Public GET API returns this event
    const publicEventsRes = await fetch(`${BASE_URL}/api/events`);
    const publicEventsJson = await publicEventsRes.json();
    console.log(`Public GET /api/events returned ${publicEventsJson.count} events.`);
    const foundEvent = publicEventsJson.data?.find((e: any) => e.id === createdEventId);
    if (!foundEvent || foundEvent.title !== 'Integration Test Event') {
      throw new Error('Created event not returned in public GET /api/events response');
    }
    console.log('✅ Public GET /api/events verified with matching event data.');

    // Clean up test event
    await fetch(`${BASE_URL}/api/events/${createdEventId}`, { method: 'DELETE', headers: authHeaders });
    console.log('✅ Test event cleaned up.');

    // 4. Notifications Integration (POST -> MySQL -> GET)
    console.log('\n--- 4. Testing Notifications Integration ---');
    const createNotifRes = await fetch(`${BASE_URL}/api/notifications`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Test Circular Notification',
        category: 'Circulars',
        summary: 'This is an integration test circular.',
        fullDetails: 'Full details of the test circular for verification.',
        issuedBy: 'Principal Office'
      })
    });
    const createNotifJson = await createNotifRes.json();
    console.log('Create Notif Response:', createNotifJson);
    if (!createNotifJson.success) throw new Error('Failed to create notification');
    const createdNotifId = createNotifJson.id;

    const notifInDb = await executeQuery<any[]>('SELECT * FROM notifications WHERE id = ?', [createdNotifId]);
    if (!notifInDb || notifInDb.length === 0) throw new Error('Notification not found in MySQL notifications table');
    console.log('✅ Notification successfully verified in MySQL table.');

    const publicNotifsRes = await fetch(`${BASE_URL}/api/notifications`);
    const publicNotifsJson = await publicNotifsRes.json();
    const foundNotif = publicNotifsJson.data?.find((n: any) => n.id === createdNotifId);
    if (!foundNotif) throw new Error('Created notification not returned in public GET /api/notifications');
    console.log('✅ Public GET /api/notifications returned new notification.');

    // Clean up test notif
    await fetch(`${BASE_URL}/api/notifications/${createdNotifId}`, { method: 'DELETE', headers: authHeaders });
    console.log('✅ Test notification cleaned up.');

    // 5. Documents Integration (POST -> MySQL -> GET)
    console.log('\n--- 5. Testing Documents Integration ---');
    const createDocRes = await fetch(`${BASE_URL}/api/documents`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Test Mandatory Document',
        filename: 'test-doc.pdf',
        path: '/documents/test-doc.pdf',
        fileSize: '2.0 MB',
        fileType: 'PDF',
        category: 'Statutory Disclosure',
        description: 'Test document description.'
      })
    });
    const createDocJson = await createDocRes.json();
    console.log('Create Doc Response:', createDocJson);
    if (!createDocJson.success) throw new Error('Failed to create document');
    const createdDocId = createDocJson.id;

    const docInDb = await executeQuery<any[]>('SELECT * FROM documents WHERE id = ?', [createdDocId]);
    if (!docInDb || docInDb.length === 0) throw new Error('Document not found in MySQL documents table');
    console.log('✅ Document successfully verified in MySQL table.');

    const publicDocsRes = await fetch(`${BASE_URL}/api/documents`);
    const publicDocsJson = await publicDocsRes.json();
    const foundDoc = publicDocsJson.data?.find((d: any) => d.id === createdDocId);
    if (!foundDoc) throw new Error('Created document not returned in public GET /api/documents');
    console.log('✅ Public GET /api/documents returned new document.');

    // Clean up test document
    await fetch(`${BASE_URL}/api/documents/${createdDocId}`, { method: 'DELETE', headers: authHeaders });
    console.log('✅ Test document cleaned up.');

    // 6. Gallery Integration (POST -> MySQL -> GET)
    console.log('\n--- 6. Testing Gallery Integration ---');
    const createGalRes = await fetch(`${BASE_URL}/api/gallery`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Test Campus Photo',
        category: 'Campus',
        imagePath: '/images/test-gallery.jpg',
        description: 'Test gallery photo description.'
      })
    });
    const createGalJson = await createGalRes.json();
    console.log('Create Gallery Response:', createGalJson);
    if (!createGalJson.success) throw new Error('Failed to create gallery image');
    const createdGalId = createGalJson.id;

    const galInDb = await executeQuery<any[]>('SELECT * FROM gallery_images WHERE id = ?', [createdGalId]);
    if (!galInDb || galInDb.length === 0) throw new Error('Gallery image not found in MySQL table');
    console.log('✅ Gallery image successfully verified in MySQL table.');

    const publicGalRes = await fetch(`${BASE_URL}/api/gallery`);
    const publicGalJson = await publicGalRes.json();
    const foundGal = publicGalJson.data?.find((g: any) => g.id === createdGalId);
    if (!foundGal) throw new Error('Created gallery image not returned in public GET /api/gallery');
    console.log('✅ Public GET /api/gallery returned new gallery image.');

    // Clean up test gallery
    await fetch(`${BASE_URL}/api/gallery/${createdGalId}`, { method: 'DELETE', headers: authHeaders });
    console.log('✅ Test gallery image cleaned up.');

    // 7. Site Settings Integration (PUT -> MySQL -> GET)
    console.log('\n--- 7. Testing Site Settings Integration ---');
    const updateSettingRes = await fetch(`${BASE_URL}/api/settings/ticker_title`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({ value: 'TEST LIVE ANNOUNCEMENTS TICKER' })
    });
    const updateSettingJson = await updateSettingRes.json();
    console.log('Update Setting Response:', updateSettingJson);
    if (!updateSettingJson.success) throw new Error('Failed to update setting');

    const getSettingRes = await fetch(`${BASE_URL}/api/settings/ticker_title`);
    const getSettingJson = await getSettingRes.json();
    console.log('Get Setting ticker_title Response:', getSettingJson);
    if (getSettingJson.data !== 'TEST LIVE ANNOUNCEMENTS TICKER') {
      throw new Error('Setting ticker_title does not match');
    }
    console.log('✅ Site settings PUT and GET verified with MySQL.');

    // Restore original ticker title
    await fetch(`${BASE_URL}/api/settings/ticker_title`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({ value: 'LIVE ANNOUNCEMENTS & CIRCULARS' })
    });

    // 8. Contact Inquiries & Admissions
    console.log('\n--- 8. Testing Contact Inquiry & Admission Form Submissions ---');
    const contactRes = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Inquirer',
        email: 'test@example.com',
        phone: '9876543210',
        subject: 'Course Information',
        message: 'This is a test contact inquiry.',
        source: 'contact_page'
      })
    });
    const contactJson = await contactRes.json();
    console.log('Contact Submit Response:', contactJson);
    if (!contactJson.success || !contactJson.inquiryId) throw new Error('Failed to submit contact inquiry');
    console.log('✅ Contact inquiry successfully inserted into MySQL (contact_inquiries).');

    const admRes = await fetch(`${BASE_URL}/api/admissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test Applicant',
        phone: '9876543210',
        email: 'applicant@example.com',
        academicYear: '2027 - 2028',
        preferredCourse: 'be-cse',
        category: 'UG'
      })
    });
    const admJson = await admRes.json();
    console.log('Admission Submit Response:', admJson);
    if (!admJson.success || !admJson.applicationId) throw new Error('Failed to submit admission application');
    console.log('✅ Admission application successfully inserted into MySQL (admission_applications).');

    // Clean up test contact & admission rows
    await executeQuery('DELETE FROM contact_inquiries WHERE id = ?', [contactJson.inquiryId]);
    await executeQuery('DELETE FROM admission_applications WHERE id = ?', [admJson.applicationId]);
    console.log('✅ Test submissions cleaned up.');

    console.log('\n=============================================');
    console.log('🎉 ALL INTEGRATION TESTS PASSED SUCCESSFULLY!');
    console.log('=============================================\n');

  } catch (error) {
    console.error('❌ Integration test failed:', error);
    process.exitCode = 1;
  } finally {
    if (server) {
      server.close();
    }
    await pool.end();
    process.exit(process.exitCode || 0);
  }
}

runTests();
