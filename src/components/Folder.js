import { useState } from "react";

function Folder({ explorer, handleInsertNode }) {
  // console.log(explorer);

  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div>
        <div className="folder">
          <span onClick={() => setExpand(!expand)}>
            📁 {explorer.name}
            <br />
          </span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>
              📂Folder +
            </button>
            <button onClick={(e) => handleNewFolder(e, false)}>
              📔 File +
            </button>
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 15 }}>
          {showInput.visible && (
            <div>
              <span>{showInput.isFolder ? "📁 " : "📄"}</span>
              <input
                className="input"
                type="text"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={onAddFolder}
              />
            </div>
          )}

          {explorer.items.map((item) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                key={item.name}
                explorer={item}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <span className="file">
          {explorer.name}
          <br />
        </span>
      </div>
    );
  }
}

export default Folder;
