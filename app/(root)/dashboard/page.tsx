import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://<your-project>.supabase.co', '<your-anon-key>')

// Always check if user is already logged in
async function checkUser() {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    console.log('User is logged in:', user)
    // Redirect to dashboard, or stay on page
  } else {
    console.log('No user logged in')
    // Redirect to login
  }
}

checkUser()
