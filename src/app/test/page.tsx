"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";

export default function TestPage() {
  const [entry, setEntry] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkEntry() {
      try {
        const { data, error } = await supabase
          .from('signups')
          .select('*')
          .eq('unique_id', '6dcf6d1d-6d7b-4972-b03a-0a499d0b98e8')
          .single();

        if (error) {
          setError(error.message);
          return;
        }

        setEntry(data);
      } catch (err) {
        setError('An error occurred while fetching the entry');
      }
    }

    checkEntry();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Database Entry Check</h1>
      {error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : entry ? (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Entry Details:</h2>
          <pre className="text-sm whitespace-pre-wrap p-2 bg-gray-100 rounded">{JSON.stringify(entry, null, 2)}</pre>
        </div>
      ) : (
        <div className="animate-pulse">Loading...</div>
      )}
    </div>
  );
}
