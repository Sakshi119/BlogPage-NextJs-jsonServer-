import {NextResponse} from "next/server";
import {supabase} from "@/lib/supabaseClient";


//GET blogs, single blog
export async function GET(request){
  const {searchParams} = new URL(request.url);
  const id = searchParams.get("id");


  if(id){
    const {data,error} = await supabase
      .from("blogs")
      .select("*")
      .eq("id",id)
      .single();


    if(error){
      return NextResponse.json({error:error.message},{status:404});
    }  

    return NextResponse.json(data);
  }

  const {data,error} = await supabase
    .from("blogs")
    .select("*")
    .order("created_at",{ascending:false});

    return NextResponse.json(data);
}



// POST – Create new blog
export async function POST(request) {
  const body = await request.json();

  const { title, description, image } = body;

  const { data, error } = await supabase
    .from("blogs")
    .insert([
      {
        title,
        description,
        image
      }
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 201 });
}


// PUT – Update blog
export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const body = await request.json();

  const { title, description, image } = body;

  const { data, error } = await supabase
    .from("blogs")
    .update({
      title,
      description,
      image
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}



// DELETE – Remove blog
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const { error } = await supabase
    .from("blogs")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Blog deleted" });
}


