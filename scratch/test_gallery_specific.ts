import { executeQuery, pool } from '../server/src/config/database.js';

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}`;

async function testSpecificGalleryFlow() {
  console.log('=== RUNNING TARGETED TEST: Annual College Day & Cultural Fest Gallery Edit Flow ===\n');

  try {
    // 1. Admin login to get JWT token
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin123' })
    });
    const loginJson = await loginRes.json();
    const token = loginJson.token;
    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    console.log('1. ✅ Admin Authentication succeeded.');

    // 2. Fetch existing gallery item from database
    const [originalItem] = await executeQuery<any[]>('SELECT * FROM gallery_images WHERE id = ?', ['gal-1']);
    console.log('2. Existing Gallery Item in MySQL before edit:', {
      id: originalItem.id,
      title: originalItem.title,
      description: originalItem.description,
      image_path: originalItem.image_path
    });
    if (!originalItem) throw new Error('gal-1 not found in MySQL');

    // 3. Edit gal-1: Change description to "MySQL Gallery Update Test" and change image URL
    const newDescription = 'MySQL Gallery Update Test';
    const newImageUrl = '/images/college events and news galeery/h12-updated.jpg';

    console.log(`\n3. Sending PUT /api/gallery/gal-1 with description="${newDescription}" and image="${newImageUrl}"`);
    const updateRes = await fetch(`${BASE_URL}/api/gallery/gal-1`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({
        title: originalItem.title,
        category: originalItem.category,
        imagePath: newImageUrl,
        description: newDescription
      })
    });
    const updateJson = await updateRes.json();
    console.log('Update API Response:', updateJson);
    if (!updateJson.success) throw new Error('Failed to update gallery image via API');

    // 4. Verify in MySQL Database
    console.log('\nA. VERIFYING IN MYSQL (USE vins_college; SELECT * FROM gallery_images WHERE id="gal-1")');
    const [updatedDbRow] = await executeQuery<any[]>('SELECT * FROM gallery_images WHERE id = ?', ['gal-1']);
    console.log('MySQL Database Row after UPDATE:', {
      id: updatedDbRow.id,
      title: updatedDbRow.title,
      description: updatedDbRow.description,
      image_path: updatedDbRow.image_path
    });
    if (updatedDbRow.description !== newDescription) {
      throw new Error(`MySQL description mismatch: Expected "${newDescription}", got "${updatedDbRow.description}"`);
    }
    if (updatedDbRow.image_path !== newImageUrl) {
      throw new Error(`MySQL image_path mismatch: Expected "${newImageUrl}", got "${updatedDbRow.image_path}"`);
    }
    console.log('✅ A. MySQL verification PASSED: Row contains updated description and image path.');

    // 5. Verify Public GET API
    console.log('\nB. VERIFYING PUBLIC GET /api/gallery');
    const publicGetRes = await fetch(`${BASE_URL}/api/gallery`);
    const publicGetJson = await publicGetRes.json();
    const returnedItem = publicGetJson.data.find((item: any) => item.id === 'gal-1');
    console.log('Public API returned item:', returnedItem);
    if (!returnedItem || returnedItem.description !== newDescription || returnedItem.imagePath !== newImageUrl) {
      throw new Error('Public GET API does not return the updated gallery record');
    }
    console.log('✅ B. Public GET Gallery API verification PASSED.');

    // 6. Reset gal-1 back to original values so we preserve clean seed state
    console.log('\n6. Restoring original item data to keep database clean...');
    await fetch(`${BASE_URL}/api/gallery/gal-1`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({
        title: originalItem.title,
        category: originalItem.category,
        imagePath: originalItem.image_path,
        description: originalItem.description
      })
    });
    const [restoredDbRow] = await executeQuery<any[]>('SELECT * FROM gallery_images WHERE id = ?', ['gal-1']);
    console.log('Restored DB Row:', { id: restoredDbRow.id, title: restoredDbRow.title, description: restoredDbRow.description });

    console.log('\n========================================================================');
    console.log('🎉 “Annual College Day & Cultural Fest Gallery” EDIT / UPDATE VERIFIED 100%');
    console.log('========================================================================\n');

  } catch (error) {
    console.error('❌ Targeted test failed:', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
    process.exit(process.exitCode || 0);
  }
}

testSpecificGalleryFlow();
