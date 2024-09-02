import { useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import explorer from "./foldserdata";
import useTraverseTree from "./hooks/use-traverse-tree";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };
  return (
    <div className="app">
      <Folder handleInsertNode={handleInsertNode} explorer={explorer} />
    </div>
  );
}

export default App;
