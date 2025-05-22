import supabase from '../src/lib/supabase';

async function testSupabase() {
  try {
    // Test insert
    console.log('Testing insert...');
    const { data: insertData, error: insertError } = await supabase
      .from('signups')
      .insert([{
        unique_id: 'test-uuid-123',
        plate: 'TEST123',
        status: 'test'
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
      .eq('unique_id', 'test-uuid-123');

    if (selectError) {
      console.error('Select error:', selectError);
    } else {
      console.log('Select result:', selectData);
    }

    // Test update
    console.log('\nTesting update...');
    const { error: updateError } = await supabase
      .from('signups')
      .update({
        plate: 'UPDATED123'
      })
      .eq('unique_id', 'test-uuid-123');

    if (updateError) {
      console.error('Update error:', updateError);
    } else {
      console.log('Update successful');
    }

    // Test select again
    console.log('\nTesting select after update...');
    const { data: finalData, error: finalError } = await supabase
      .from('signups')
      .select('*')
      .eq('unique_id', 'test-uuid-123');

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
      .eq('unique_id', 'test-uuid-123');

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
