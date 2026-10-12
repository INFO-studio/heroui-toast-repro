import {Button, Toast, toast} from "@heroui/react";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./styles.css";

const pageStyle = {
  boxSizing: "border-box",
  minHeight: "100vh",
  padding: 32,
  fontFamily: "system-ui, sans-serif",
};

const controlsStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
};

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

function showDangerWithTitleButton() {
  toast.danger(
    <span className="inline-flex items-center gap-2">
      Interactive danger toast
      <Button
        size="sm"
        variant="secondary"
        onPress={() => toast.success("Success toast spawned from inside the danger toast", {timeout: 0})}
      >
        Spawn success toast
      </Button>
    </span>,
    {
      description: "Click the button in this toast title. The newly spawned success toast becomes vertically misaligned.",
      timeout: 0,
    },
  );
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
        <Button variant="danger" onPress={showDangerWithTitleButton}>4. Create an interactive danger toast</Button>
        <Button variant="secondary" onPress={() => toast.clear()}>Clear all toasts</Button>
      </div>
      <ol className="max-w-2xl list-decimal space-y-2 pl-5 text-sm">
        <li>Cases 1 and 2 render correctly.</li>
        <li>Case 3 also renders correctly, so merely having two toasts is not sufficient.</li>
        <li>For case 4, click the prominent <strong>Spawn success toast</strong> button inside the danger toast title.</li>
        <li>Only the success toast spawned from inside the existing toast shows the indicator/title vertical misalignment.</li>
      </ol>
      <Toast.Provider placement="top end" />
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
