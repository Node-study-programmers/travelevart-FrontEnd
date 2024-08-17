import html2canvas from "html2canvas";
import jsPDF from "jspdf";

//다운로드 버튼에 onClick으로 넣으33
export const printPdf = (tagId: string) => {
  //태그 불러옴
  const html = document.getElementById(tagId) as HTMLElement;

  //불러온 태그 이미지로 만듬
  html2canvas(html).then((canvas) => {
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL("image/jpg");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth(); //pdf 넓이
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width; //pdf 높이

    pdf.addImage(imgData, "jpg", 0, 0, pdfWidth, pdfHeight);

    //2페이지 추가
    const page2 = pdf.addPage();
    page2.addImage(imgData, "jpg", 0, 0, pdfWidth, pdfHeight);

    //pdf 다운로드
    pdf.save("download.pdf");
  });
};
