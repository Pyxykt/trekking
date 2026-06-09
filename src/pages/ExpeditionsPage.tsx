import { ExpeditionsSection } from "../components/sections/ExpeditionsSection";
import { PageHeader } from "../components/ui/PageHeader";
import { C } from "../constants/colors";

export function ExpeditionsPage() {
  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ padding: "80px clamp(24px, 6vw, 100px) 0" }}>
        <PageHeader
          eyebrow="CURRENT ROSTER"
          title={
            <>
              Expeditions open
              <br />
              for{" "}
              <em style={{ color: C.gold, fontStyle: "italic" }}>2025–26</em>
            </>
          }
          description="Each route is led by a single guide who has walked it dozens of times. Availability is limited by design."
        />
      </div>
      <ExpeditionsSection showHeader={false} />
    </div>
  );
}
