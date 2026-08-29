async function testCloudinary() {
  const cloudName = 'dz1hq0ckc';
  const uploadPreset = '9nH_d05u985avAPrnMmUzMhlBJ4';

  console.log(`Testing Cloudinary with cloudName="${cloudName}", preset="${uploadPreset}"...`);

  // Create a 1x1 transparent PNG base64
  const testBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  const formData = new FormData();
  formData.append('file', testBase64);
  formData.append('upload_preset', uploadPreset);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    console.log('Cloudinary Response:', data);
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

testCloudinary();
