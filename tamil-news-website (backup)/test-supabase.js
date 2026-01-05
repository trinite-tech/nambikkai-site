// Test Supabase connection
// Run this in browser console to test connectivity

async function testSupabaseConnection() {
  try {
    const response = await fetch('https://yrqsvlgxxhnkwzdbimms.supabase.co/rest/v1/', {
      method: 'GET',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycXN2bGd4eGhua3d6ZGJpbW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDY1OTAsImV4cCI6MjA3OTgyMjU5MH0.eQgt6V5g7bipFVr3wKoFZWaWUxWh6QZ9gwmdXP6oynQ',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycXN2bGd4eGhua3d6ZGJpbW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDY1OTAsImV4cCI6MjA3OTgyMjU5MH0.eQgt6V5g7bipFVr3wKoFZWaWUxWh6QZ9gwmdXP6oynQ'
      }
    });
    
    if (response.ok) {
      console.log('✅ Supabase connection successful');
      return true;
    } else {
      console.log('❌ Supabase connection failed:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.log('❌ Network error:', error);
    return false;
  }
}

// Test auth endpoint specifically
async function testSupabaseAuth() {
  try {
    const response = await fetch('https://yrqsvlgxxhnkwzdbimms.supabase.co/auth/v1/settings', {
      method: 'GET',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycXN2bGd4eGhua3d6ZGJpbW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDY1OTAsImV4cCI6MjA3OTgyMjU5MH0.eQgt6V5g7bipFVr3wKoFZWaWUxWh6QZ9gwmdXP6oynQ'
      }
    });
    
    if (response.ok) {
      console.log('✅ Supabase Auth connection successful');
      return true;
    } else {
      console.log('❌ Supabase Auth connection failed:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.log('❌ Auth network error:', error);
    return false;
  }
}

console.log('Testing Supabase connectivity...');
testSupabaseConnection();
testSupabaseAuth();