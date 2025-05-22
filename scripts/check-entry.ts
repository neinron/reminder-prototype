import supabase from '../src/lib/supabase';

async function checkEntry() {
  try {
    const { data, error } = await supabase
      .from('signups')
      .select('*')
      .eq('unique_id', '6dcf6d1d-6d7b-4972-b03a-0a499d0b98e8');

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log('Database entry found:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

checkEntry();
