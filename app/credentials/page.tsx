import { ContentShell } from "../components/ContentShell";
import { SectionTitle } from "../components/SectionTitle";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { CreateCredentialModal } from "../components/CreateCredentialModal";
import { credentials } from "../lib/data";

export default function CredentialsPage() {
  return (
    <ContentShell variant="wide">
      <header className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-2.5">
          <h1 className="text-metric-lg text-text">API credentials</h1>
          <p className="text-body text-text-muted">
            Each credential has a public API key and a private API secret. The
            secret is shown once when generated.
          </p>
        </div>
        <CreateCredentialModal>
          <Button>Create new credential</Button>
        </CreateCredentialModal>
      </header>

      <section className="flex flex-col gap-5">
        <SectionTitle>Your credentials</SectionTitle>
        <div className="bg-surface border border-border-default rounded-2xl shadow-[0_0_8px_rgba(0,0,0,0.02)] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Label</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last used</TableHead>
                <TableHead style={{ width: 180 }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {credentials.map((cred, i) => (
                <TableRow
                  key={cred.label}
                  className={
                    i === credentials.length - 1 ? "border-b-0" : undefined
                  }
                >
                  <TableCell className="text-body text-text">
                    {cred.label}
                  </TableCell>
                  <TableCell className="text-body text-text">
                    {cred.environment}
                  </TableCell>
                  <TableCell className="text-code text-code-text">
                    {cred.apiKey}
                  </TableCell>
                  <TableCell className="text-body text-text">
                    {cred.created}
                  </TableCell>
                  <TableCell className="text-body text-text">
                    {cred.lastUsed}
                  </TableCell>
                  <TableCell style={{ width: 180 }}>
                    <div className="flex items-center gap-2">
                      <Button variant="subtle" size="default" className="h-[34px]">
                        Edit
                      </Button>
                      <Button variant="destructive" size="default" className="h-[34px]">
                        Revoke
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </ContentShell>
  );
}
