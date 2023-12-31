import { useState } from "react";
import GridLayout, { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);
const TOTAL_IMAGES = 11;
const IMAGES_PER_ROW = 4;
const layout = Array(TOTAL_IMAGES)
  .fill(null)
  .map((_, index) => ({
    i: String(index),
    x: index % IMAGES_PER_ROW,
    y: Math.floor(index / IMAGES_PER_ROW),
    w: 1,
    h: 1,
  }));
layout[0].w = 2;
layout[0].h = 2;
function ImageGallery() {
  const [dynamicLayout, setDynamicLayout] = useState(layout);
  const [selectedItems, setSelectedItems] = useState([]);
  const deleteSelectedItems = () => {
    if (selectedItems.length == 0) {
      alert("Please select at least one item to delete!");
    }
    setDynamicLayout((prevLayout) => {
      let filteredLayout = prevLayout.filter(
        (item) => !selectedItems.includes(item.i)
      );
      return filteredLayout;
    });
    setSelectedItems([]);
  };
  const toggleSelectedItems = (i) => {
    if (checkIfSelected(i)) {
      setSelectedItems((prev) => prev.filter((x) => x != i));
    } else {
      setSelectedItems((prev) => [...prev, i]);
    }
  };
  const checkIfSelected = (i) => {
    return selectedItems.includes(i);
  };
  return (
    <>
      <h1 className="m-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Responsive Image Gallery
      </h1>
      <div className="flex justify-center items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={deleteSelectedItems}
        >
          Delete Selected
        </button>
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={{
          lg: dynamicLayout,
          md: dynamicLayout,
          sm: dynamicLayout,
          xs: dynamicLayout,
          xxs: dynamicLayout,
        }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 4, md: 4, sm: 3, xs: 3, xxs: 3 }}
        rowHeight={256}
        isResizable={false}
        compactType={"horizontal"}
        margin={[10, 10]}
        onLayoutChange={(layout) => {
          setDynamicLayout((_) => {
            let normalizedLayout = layout.map((item) => {
              if (item.x == 0 && item.y == 0) {
                return {
                  ...item,
                  w: 2,
                  h: 2,
                };
              }
              return {
                ...item,
                w: 1,
                h: 1,
              };
            });
            return normalizedLayout;
          });
        }}
      >
        {dynamicLayout.map((item, index) => {
          return (
            <div
              className={`item ${
                checkIfSelected(item.i) ? "item-selected" : ""
              }`}
              key={item.i}
            >
              <input
                type="checkbox"
                checked={checkIfSelected(item.i)}
                onChange={() => toggleSelectedItems(item.i)}
                className="checkbox"
              />
              <img
                src={`/images/image-${index + 1}.webp`}
                alt="Gallery Image"
              />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </>
  );
}
export default ImageGallery;
