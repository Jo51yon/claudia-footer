import { useState, type ReactNode } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { ConnectAIPanel } from '@jo51yon/claudia-connectors';

/**
 * ClaudiaFooter — the app footer chrome: copyright line, a flexible policy-links slot, an
 * optional mobile-app link, support contact, and the Connect-an-AI-assistant toggle + embed.
 *
 * Extracted 2026-08-20 from real PETGI/Lintel/S3 Photobook Footer components, but NOT a full
 * unification -- checked first, not assumed. The Connect-AI toggle/card/ConnectAIPanel wrapper
 * was confirmed byte-identical between Lintel's and S3 Photobook's real Footer files, so that
 * part is extracted verbatim. The copyright line and settings shape (copyright_holder,
 * product_name, mobile_app_url) matched between PETGI's and Lintel's real settings tables, but
 * the SUPPORT CONTACT field name did not (contact_email vs support_email) -- real, different
 * field names for the same concept -- so this component takes already-resolved values as
 * props rather than querying a settings table itself, which differs per project anyway
 * (petgi_settings vs lintel_settings, not a shared table).
 *
 * Policy links are deliberately a free-form slot (policyLinks), not rendered by this
 * component at all: PETGI uses a fixed set of static routes (privacy/terms/cookies, backed by
 * @jo51yon/claudia-policy's shared claudia_policy_documents), while Lintel uses an entirely
 * different, genuinely separate system (claudia_policies, arbitrary named policies keyed by
 * project_id) -- these are two real, different systems already in production, not something to
 * force into one shape here.
 */
export interface ClaudiaFooterProps {
  /** Omit entirely if the project has no copyright/settings source (e.g. S3 Photobook today). */
  copyrightHolder?: string;
  /** Rendered as-is inside the footer row -- each project's own real policy-link markup. */
  policyLinks?: ReactNode;
  mobileAppUrl?: string | null;
  /** A mailto link, a button, whatever the project's own real support contact looks like. */
  supportContact?: ReactNode;
  connectSlug: string;
  connectProductName: string;
  connectMcpUrl: string;
  connectSupabase: SupabaseClient;
  connectSkillUrl?: string;
  /**
   * The Connect-an-AI-assistant toggle only makes sense once there is a real account to
   * connect it to -- pass false to hide it entirely (e.g. before sign-in). Defaults to true.
   */
  showConnect?: boolean;
}

export default function ClaudiaFooter({
  copyrightHolder, policyLinks, mobileAppUrl, supportContact,
  connectSlug, connectProductName, connectMcpUrl, connectSupabase, connectSkillUrl,
  showConnect = true,
}: ClaudiaFooterProps) {
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <>
      <footer className="app-footer">
        {copyrightHolder && <span>\u00a9 {new Date().getFullYear()} {copyrightHolder}</span>}
        {policyLinks}
        {showConnect && (
          <button type="button" className="footer-link" onClick={() => setConnectOpen((v) => !v)}>
            Connect an AI assistant
          </button>
        )}
        {mobileAppUrl && <a href={mobileAppUrl} target="_blank" rel="noopener noreferrer">Mobile app</a>}
        {supportContact}
      </footer>

      {connectOpen && (
        <div className="card" style={{ maxWidth: 560, margin: '0 auto 24px', padding: 20 }}>
          <ConnectAIPanel
            slug={connectSlug}
            productName={connectProductName}
            mcpUrl={connectMcpUrl}
            supabase={connectSupabase}
            skillUrl={connectSkillUrl}
          />
        </div>
      )}
    </>
  );
}
