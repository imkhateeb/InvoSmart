const cols = [
  {
    title: "S/N",
    width: "5%",
  },
  {
    title: "Name",
    width: "20%",
  },
  {
    title: "Quantity",
    width: "10%",
  },
  {
    title: "Unit Price",
    width: "10%",
  },
  {
    title: "Tax",
    width: "10%",
  },
  {
    title: "Final Price",
    width: "15%",
  },
];

const Products = () => {
  return (
    <div className="p-4 bg-white rounded-3xl w-full h-full flex flex-col">
      <div className="p-3 border-b">Filter and actions</div>

      <div className="flex-1 overflow-auto flex-col w-full p-3">
        <div className="flex w-full">
          {cols.map((col, index) => (
            <div
              className="font-semibold"
              key={index}
              style={{ width: col.width }}
            >
              {col.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
