import { useState } from "react";
import "./App.css";

function App() {
  // initial state
  const [diff, setDiff] = useState({
    list: {
      [`item-1`]: {
        drag: false,
        diffX: 0,
        diffY: 0,
      },
      [`item-2`]: {
        drag: false,
        diffX: 0,
        diffY: 0,
      },
    },
  });
  // initial state
  const [items, setItems] = useState({
    data: {
      items: {
        movableItem: {
          totalItem: 2,
          itemList: {
            [`item-1`]: {
              h: 10,
              w: 20,
              x: 100,
              y: 50,
            },
            [`item-2`]: {
              h: 10,
              w: 20,
              x: 40,
              y: 300,
            },
          },
        },
      },
    },
  });

  const convertItems = () => {
    const newItems = JSON.stringify(items);
    const converted = JSON.parse(newItems);
    return converted;
  };

  const dragStart = (e) => {
    const id = e.target.id;
    const newDiff = diff;
    const idDiff = newDiff.list[id];

    idDiff.diffX = e.screenX - e.currentTarget.getBoundingClientRect().left;
    idDiff.diffY = e.screenY - e.currentTarget.getBoundingClientRect().top;
    idDiff.drag = true;
    newDiff.list[id] = idDiff;
    setDiff(newDiff);
  };
  const draggingNow = (e) => {
    const id = e.target.id;
    const newItems = convertItems();
    const newDiff = diff.list[id];
    if (newDiff.drag) {
      const x = e.screenX - newDiff.diffX;
      const y = e.screenY - newDiff.diffY;
      const newStyles = newItems.data.items.movableItem.itemList[id];
      newStyles.x = x;
      newStyles.y = y;
      newItems.data.items.movableItem.itemList[id] = newStyles;
      setItems(newItems);
    }
  };
  const dragEnd = (e) => {
    const id = e.target.id;
    const newDiff = diff;
    const idDiff = newDiff.list[id];
    idDiff.drag = false;
    newDiff.list[id] = idDiff;
    setDiff(newDiff);
  };
  console.log(items.data.items.movableItem.itemList['item-1']);
  return (
    <div className="container">
      <div
        className="item-div"
        id="item-1"
        onMouseDown={dragStart}
        onMouseMove={draggingNow}
        onMouseUp={dragEnd}
        style={{
          left: parseInt(`${items.data.items.movableItem.itemList["item-1"].x}`),
          top: parseInt(`${items.data.items.movableItem.itemList["item-1"].y}`),
        }}
      >
        Item 1
      </div>
      <div
        className="item-div-2"
        id="item-2"
        onMouseDown={dragStart}
        onMouseMove={draggingNow}
        onMouseUp={dragEnd}
        style={{
          left: parseInt(`${items.data.items.movableItem.itemList["item-2"].x}`),
          top: parseInt(`${items.data.items.movableItem.itemList["item-2"].y}`),
        }}
      >
        Item 2
      </div>
    </div>
  );
}

export default App;
