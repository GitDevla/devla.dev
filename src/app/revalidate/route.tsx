import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  if (type === "music") {
    revalidatePath("/music");
    return Response.json({ path: "/music" });
  }
  // if (type === "projects") {
  //   revalidatePath("/projects");
  //   revalidatePath("/blog/[slug]", "page");
  //   return Response.json({ path: "/projects" });
  // }
  return Response.json({ error: "Nuh uh" });
}
