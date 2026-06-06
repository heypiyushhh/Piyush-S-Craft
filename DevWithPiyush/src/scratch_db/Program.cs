using System;
using System.Drawing;
using System.Drawing.Imaging;

namespace scratch_db
{
    class Program
    {
        static void Main(string[] args)
        {
            string templatePath = @"..\DevWithPiyush.Web\wwwroot\Images\certificate_template.png";
            string outputDir = @"..\DevWithPiyush.Web\wwwroot\Images\";

            Console.WriteLine("=================================================");
            Console.WriteLine($"Loading template from: {templatePath}");
            Console.WriteLine("=================================================");

            try
            {
                using (Bitmap source = new Bitmap(templatePath))
                {
                    // 1. Crop DevWithPiyush Logo (centered top)
                    // Generous bounding box: X=500 to 1036 (width 536), Y=35 to 335 (height 300)
                    CropAndSave(source, new Rectangle(500, 35, 536, 300), outputDir + "logo.png");

                    // 2. Crop MSME Badge (top right)
                    // Generous bounding box: X=1100 to 1490 (width 390), Y=35 to 355 (height 320)
                    CropAndSave(source, new Rectangle(1100, 35, 390, 320), outputDir + "msme.png");

                    // 3. Crop Certificate of Excellence Seal (middle left)
                    // Generous bounding box: X=25 to 345 (width 320), Y=280 to 740 (height 460)
                    CropAndSave(source, new Rectangle(25, 280, 320, 460), outputDir + "seal.png");
                }
                Console.WriteLine("\nCropping completed successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error cropping images: {ex.Message}");
            }
            Console.WriteLine("=================================================");
        }

        static void CropAndSave(Bitmap source, Rectangle rect, string outputPath)
        {
            using (Bitmap cropped = source.Clone(rect, source.PixelFormat))
            {
                cropped.Save(outputPath, ImageFormat.Png);
                Console.WriteLine($"Saved cropped image to {outputPath} (Size: {rect.Width}x{rect.Height})");
            }
        }
    }
}
