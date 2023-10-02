import { NextResponse } from "next/server";
const BASE_URL = "https://nominatim.openstreetmap.org/search.php"
// ?q=pantai%20merdeka&polygon_geojson=1&format=jsonv2
export async function GET(request : any){
    const { searchParams} = new URL(request.url);
    const searchText =searchParams.get('q')
    const res = await fetch(BASE_URL + `?q=${searchText}&polygon_geojson=1&format=jsonv2`,
    {
        headers:{
            "content-type": "application/json"
        }
    })
    const searchResult =await res.json();
    return NextResponse.json({data: searchResult})
}