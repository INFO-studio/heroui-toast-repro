import {Button, Toast, toast} from "@heroui/react";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./styles.css";

const pageStyle = {
  boxSizing: "border-box",
  minHeight: "100vh",
  padding: 32,
  fontFamily: "system-ui, sans-serif",
} as const;

const controlsStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
} as const;

function showSingleSuccess() {
  toast.success("Standalone success toast", {timeout: 0});
}

function showSingleDangerWithDescription() {
  toast.danger("Standalone danger toast", {
    description: "A standalone danger toast with a description.",
    timeout: 0,
  });
}

function showDangerThenSuccess() {
  toast.danger("Danger toast created externally", {timeout: 0});
  toast.success("Success toast created immediately after it", {timeout: 0});
}

function spawnSuccessToast() {
  toast.success("Success toast spawned from inside the danger toast", {timeout: 0});
}

function showDangerWithDescriptionButton() {
  toast.danger("Interactive danger toast", {
    description: (
      <div className="flex flex-col items-start gap-2">
        <span>Click the button three times without clearing the stack.</span>
        <Button size="sm" variant="secondary" onPress={spawnSuccessToast}>
          Spawn success toast
        </Button>
        <span className="text-xs">Clicks 1 and 2 reproduce the misalignment; click 3 restores correct alignment.</span>
      </div>
    ),
    timeout: 0,
  });
}

function App() {
  return (
    <main style={pageStyle}>
      <h1 className="text-2xl font-semibold">HeroUI Toast stacking alignment reproduction</h1>
      <p className="max-w-2xl text-sm text-muted">
        HeroUI 3.2.6, React 19.3.0, Tailwind CSS 4.3.3, and Vite 8.3.4. This page uses the official
        <code className="mx-1 rounded bg-surface-secondary px-1">@import &quot;@heroui/styles&quot;;</code>
        setup with no custom theme or custom Toast CSS.
      </p>
      <div style={controlsStyle}>
        <Button onPress={showSingleSuccess}>1. Standalone success</Button>
        <Button onPress={showSingleDangerWithDescription}>2. Standalone danger</Button>
        <Button onPress={showDangerThenSuccess}>3. Create danger + success externally</Button>
        <Button variant="danger" onPress={showDangerWithDescriptionButton}>4. Create an interactive danger toast</Button>
        <Button variant="secondary" onPress={() => toast.clear()}>Clear all toasts</Button>
      </div>
      <ol className="max-w-2xl list-decimal space-y-2 pl-5 text-sm">
        <li>Cases 1 and 2 render correctly.</li>
        <li>Case 3 also renders correctly, so merely having two toasts is not sufficient.</li>
        <li>For case 4, click <strong>Spawn success toast</strong> in the danger toast description three times without clearing.</li>
        <li>The first two clicks reproduce the indicator/title misalignment. After the third consecutive click, alignment becomes correct again.</li>
      </ol>
      <Toast.Provider placement="top end" />
    </main>
  );
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
