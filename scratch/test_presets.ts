async function testPresets() {
  const cloudName = 'dz1hq0ckc';
  const presetsToTry = ['ml_default', 'unsigned', 'vins_college', 'default', 'vins_preset'];
  const testBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  for (const p of presetsToTry) {
    const formData = new FormData();
    formData.append('file', testBase64);
    formData.append('upload_preset', p);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log(`Preset "${p}":`, data);
      if (data.secure_url) {
        console.log(`🎉 Found working preset: "${p}" -> ${data.secure_url}`);
        break;
      }
    } catch (err) {
      console.error(err);
    }
  }
}

testPresets();
