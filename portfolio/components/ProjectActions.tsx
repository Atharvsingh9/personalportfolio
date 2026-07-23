"use client";

type Props = {
  githubUrl?: string;
  demoUrl?: string;
};

export default function ProjectActions({ githubUrl, demoUrl }: Props) {
  return (
    <>
      {githubUrl && (
        <button
          onClick={e => { e.stopPropagation(); e.preventDefault(); window.open(githubUrl, "_blank", "noopener"); }}
          style={{ background: "none", border: "none", cursor: "pointer", font: "inherit", color: "inherit", padding: 0 }}
        >
          GitHub ↗
        </button>
      )}
      {demoUrl && (
        <button
          onClick={e => { e.stopPropagation(); e.preventDefault(); window.open(demoUrl, "_blank", "noopener"); }}
          style={{ background: "none", border: "none", cursor: "pointer", font: "inherit", color: "inherit", padding: 0 }}
        >
          Live Demo ↗
        </button>
      )}
    </>
  );
}
