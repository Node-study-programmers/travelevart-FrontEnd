import { ITravelDetail } from "@/app/hooks/custom/useGetDetailTravelData";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";

// 다운로드 버튼에 onClick으로 넣으33
export const printPdf = async (
  detail: ITravelDetail[] | null,
  travelName: string | undefined,
) => {
  if (!detail) return;

  const loadingTag = document.createElement("div");
  loadingTag.style.position = "fixed";
  loadingTag.style.top = "0";
  loadingTag.style.left = "0";
  loadingTag.style.width = "100vw";
  loadingTag.style.height = "100vh";
  loadingTag.style.display = "flex";
  loadingTag.style.justifyContent = "center";
  loadingTag.style.alignItems = "center";
  loadingTag.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  loadingTag.style.color = "white";
  loadingTag.style.fontSize = "24px";
  loadingTag.style.zIndex = "9999";
  loadingTag.innerText = "다운로드중...";
  document.body.appendChild(loadingTag);

  const tags = detail.map((day) => {
    const tag = document.getElementById(day.date) as HTMLElement;
    return tag;
  });

  const nameTag = document.getElementById("travel-name") as HTMLElement;
  const dayTag = document.getElementById("travel-day") as HTMLElement;

  tags.unshift(nameTag, dayTag);

  const imgPromise = tags.map((tag) =>
    htmlToImage
      .toPng(tag, { quality: 0.9, includeQueryParams: true })
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;

        return img;
      }),
  );

  const canvasArray = await Promise.all(imgPromise);

  const pdf = new jsPDF("p", "mm", "a4");

  pdf.setTextColor("#00A9FF");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  let x: number = 0;
  let y: number = 0;
  let fillHeigth: number = 0;
  const logo = "By. TravelevarT";
  const logoWidth = pdf.getTextWidth(logo);

  canvasArray.forEach((canvas, index) => {
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (index > 2 && fillHeigth + imgHeight > pageHeight) {
      pdf.addPage();
      fillHeigth = 0;
      y = 0;
    }

    if (index === 0 || index === 1) {
      y += 10;
      pdf.addImage(canvas, "png", 10, y, pageWidth, imgHeight);
      fillHeigth += imgHeight;

      index === 1 ? (y += imgHeight + 10) : (y += imgHeight);
      return;
    } else {
      pdf.addImage(canvas, "png", x, y, pageWidth, imgHeight);
    }

    if (index === canvasArray.length - 1) {
      pdf.text(logo, (pageWidth - logoWidth) / 2, pageHeight - 10);
    }

    fillHeigth += imgHeight;
    y += imgHeight;
  });

  loadingTag.remove();
  // PDF 다운로드
  pdf.save(`${travelName ? travelName : "download"}.pdf`);
};
