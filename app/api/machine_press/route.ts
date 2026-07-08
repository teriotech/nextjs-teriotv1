import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/app/lib/supabase";

// GET: Fetch all machine_press records
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    
    const { data, error } = await supabase
      .from("machine_press")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create a new machine_press record
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const body = await request.json();
    
    // KEMBALIKAN: Hapus created_at dari sini
    const { machine_no, count_no, product_name, user } = body;

    if (!machine_no || count_no === undefined || !product_name || !user) {
      return NextResponse.json(
        { error: "Missing required fields (machine_no, count_no, product_name, user)" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("machine_press")
      // KEMBALIKAN: Biarkan Supabase yang mengisi created_at otomatis
      .insert([{ machine_no, count_no, product_name, user }])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Update an existing machine_press record
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const body = await request.json();
    
    const { id, machine_no, count_no, product_name, user } = body;

    if (!id) {
      return NextResponse.json({ error: "Record ID is required for updating" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("machine_press")
      .update({ machine_no, count_no, product_name, user })
      .eq("id", id)
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove a machine_press record by ID
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Record ID is required for deletion" }, { status: 400 });
    }

    const { error } = await supabase
      .from("machine_press")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ message: "Record deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}