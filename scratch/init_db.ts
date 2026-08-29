import { executeQuery } from '../server/src/config/database.js';

async function updateDb() {
  try {
    // Alter columns to LONGTEXT to support large data / base64 safely
    await executeQuery('ALTER TABLE college_events MODIFY image_path LONGTEXT NOT NULL');
    await executeQuery('ALTER TABLE gallery_images MODIFY image_path LONGTEXT NOT NULL');
    await executeQuery('ALTER TABLE documents MODIFY path LONGTEXT NOT NULL');
    await executeQuery('ALTER TABLE notifications MODIFY pdf_path LONGTEXT NULL');
    console.log('✅ Column types upgraded to LONGTEXT.');

    // Seed college_events if empty
    const countResult = await executeQuery<any[]>('SELECT count(*) as count FROM college_events');
    const count = countResult[0]?.count || 0;
    if (count === 0) {
      console.log('Seeding initial college_events...');
      const seedEvents = [
        ['evt-1', 'National Level Technical Symposium - CYBERTRON 2026', 'Department of CSE & IT', 'Conference', 'Mar 24 – Mar 25', '/images/college events and news galeery/h12.jpg', 'Two-day technical research symposium bringing together leading academic researchers, industry keynote speakers, and student innovators across India.', 'Dr. R. Velraj, Former Vice Chancellor, Anna University'],
        ['evt-2', 'Grand Annual College Day & Cultural Extravaganza', 'VINS Annual Fest', 'Ceremony', 'May 19', '/images/college events and news galeery/h3.jpg', 'Celebration of artistic talent, musical performances, classical dance competitions, and meritorious academic award distribution with distinguished guests.', 'Prof. M.P. Poonia, AICTE Vice Chairman'],
        ['evt-3', 'Mega Campus Placement & Corporate Recruitment Drive', 'Placement & Career Cell', 'Placement', 'Jun 12', '/images/college events and news galeery/h13.jpg', 'Over 40+ premier IT companies and core engineering recruiters conducting interviews, technical assessments, and issuing on-the-spot offer letters.', 'Director of HR, Cognizant Technology Solutions'],
        ['evt-4', 'Inter-College Hackathon & Robotics Championship', 'Robotics & AI Lab', 'Workshop', 'Aug 28', '/images/college events and news galeery/h11.jpg', '24-hour non-stop coding hackathon challenging engineering students to solve real-world industrial and societal challenges with prize pool of ₹1,00,000.', 'ISRO Senior Scientist']
      ];

      for (const evt of seedEvents) {
        await executeQuery(
          'INSERT INTO college_events (id, title, subtitle, category, date_str, image_path, description, chief_guest) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          evt
        );
      }
      console.log('✅ Seeded 4 initial events.');
    } else {
      console.log('Events table already contains', count, 'records.');
    }
  } catch (error) {
    console.error('Error during DB init:', error);
    process.exit(1);
  }
}

updateDb().then(() => {
  console.log('Database upgrade completed successfully.');
  process.exit(0);
});
