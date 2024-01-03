import { NextResponse } from "next/server";
import { z } from "zod";

// api/chapter/getInfo

const bodyParser = z.object({
    chapterId: z.string(),
  });

export async function POST(req : Request, res : Response) {
    try{
        const body = await req.json();
        
        
    }catch(error){

    }
}