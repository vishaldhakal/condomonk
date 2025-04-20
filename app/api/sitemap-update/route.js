import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import sitemapGenerator from "../../../utils/sitemapGenerator";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const result = await sitemapGenerator.generateSitemap();

    if (result.success) {
      // Revalidate the sitemap path
      revalidatePath("/sitemap.xml");

      return NextResponse.json({
        success: true,
        message: result.message,
        path: result.path,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
          error: result.error,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in sitemap-update route:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
