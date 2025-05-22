
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error('Error: Environment variables NEXT_PUBLIC_SUPABASE_URL and SUPABASE_KEY must be set');
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_KEY
);

console.log('Using service key for backend operations');

// Generate a valid UUID
const testUuid = uuidv4();
console.log('Generated UUID:', testUuid);

async function testSupabase() {
  try {
    // Test insert with proper schema types
    console.log('Testing insert...');
    const { data: insertData, error: insertError } = await supabase
      .from('signups')
      .insert([{
        unique_id: testUuid,
        plate: 'TEST123',
        status: 'visited',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);

    if (insertError) {
      console.error('Insert error:', insertError);
    } else {
      console.log('Insert successful:', insertData);
    }

    // Test select
    console.log('\nTesting select...');
    const { data: selectData, error: selectError } = await supabase
      .from('signups')
      .select('*')
      .eq('unique_id', testUuid);

    if (selectError) {
      console.error('Select error:', selectError);
    } else {
      console.log('Select result:', selectData);
    }

    // Test update
    console.log('\nTesting update...');
    const { error: updateError, data: updateData } = await supabase
      .from('signups')
      .update({
        plate: 'UPDATED123',
        status: 'subscribed'
      })
      .eq('unique_id', testUuid)
      .select();  // Add select to get the updated data

    if (updateError) {
      console.error('Update error:', updateError);
    } else {
      console.log('Update successful:', updateData);
      console.log('Update status:', status);
      console.log('Update status text:', statusText);
    }

    // Test select after update
    console.log('\nTesting select after update...');
    const { data: finalData, error: finalError } = await supabase
      .from('signups')
      .select('*')
      .eq('unique_id', testUuid);

    if (finalError) {
      console.error('Final select error:', finalError);
    } else {
      console.log('Final data:', finalData);
    }

    // Clean up test data
    console.log('\nCleaning up test data...');
    const { error: deleteError } = await supabase
      .from('signups')
      .delete()
      .eq('unique_id', testUuid);

    if (deleteError) {
      console.error('Delete error:', deleteError);
    } else {
      console.log('Test data cleaned up');
    }

  } catch (error) {
    console.error('General error:', error);
  }
}

testSupabase();
