"use client";

import { useState } from "react";

const nodes = [
  { name: "app", children: ["api/route.py", "dashboard.py", "schemas.py"] },
  { name: "models", children: ["train.py", "inference.py", "metrics.py"] },
  { name: "data", children: ["raw/", "processed/", "features.py"] },
  { name: "tests", children: ["test_api.py", "test_model.py"] },
  { name: "README.md" },
  { name: "requirements.txt" },
];

export default function ProjectFileTree() {
  const [open, setOpen] = useState<string[]>(["app", "models"]);
  const toggle = (name: string) => setOpen((current) => current.includes(name) ? current.filter((value) => value !== name) : [...current, name]);
  return <div className="fileTree">{nodes.map((node) => node.children ? <div key={node.name}><button onClick={() => toggle(node.name)} className="treeFolder">{open.includes(node.name) ? "⌄" : "›"} <span>▣</span> {node.name}</button>{open.includes(node.name) && <div className="treeChildren">{node.children.map((child) => <div key={child} className="treeFile">⌁ {child}</div>)}</div>}</div> : <div key={node.name} className="treeFile">⌁ {node.name}</div>)}</div>;
}
