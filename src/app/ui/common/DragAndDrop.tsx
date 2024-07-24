interface IDragAndDropProps {
  items: any[];
}

export default function DragAndDrop({ items }: IDragAndDropProps) {
  console.log(items);
  return <div>drag and drop</div>;
}
