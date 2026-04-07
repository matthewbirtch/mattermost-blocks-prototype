import { useState } from 'react';
import OpenInNewIcon from '@mattermost/compass-icons/components/open-in-new';
import {
  CollapsibleSection,
  MessageAttachment,
  MultiSelectPicker,
  Post,
  SequenceItem,
  SingleSelectPicker,
  TimelineItem,
} from '@/components';
import avatarMatty from '@/assets/avatar-matty.png';
import BackButton from '@/nav/BackButton';

const msgText: React.CSSProperties = {
  margin: 0,
  fontFamily: 'Open Sans, sans-serif',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px',
  color: 'var(--center-channel-color)',
};

const code: React.CSSProperties = {
  fontFamily: 'ui-monospace, "Cascadia Code", "Fira Code", monospace',
  fontSize: 13,
  background: 'rgba(var(--center-channel-color-rgb), 0.08)',
  padding: '1px 5px',
  borderRadius: 3,
};

const codeBlock: React.CSSProperties = {
  background: 'rgba(var(--center-channel-color-rgb), 0.04)',
  border: '1px solid rgba(var(--center-channel-color-rgb), 0.08)',
  borderRadius: 4,
  padding: '10px 12px',
  fontFamily: 'ui-monospace, "Cascadia Code", "Fira Code", monospace',
  fontSize: 12,
  lineHeight: '18px',
  color: 'var(--center-channel-color)',
  whiteSpace: 'pre' as const,
  overflowX: 'auto' as const,
};

const pickerGroup: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};

export default function AiPostsPage() {
  const [jiraProject, setJiraProject] = useState<number | null>(null);
  const [deployEnv, setDeployEnv] = useState<number | null>(null);
  const [notify, setNotify] = useState({
    leila: true,
    arjun: true,
    marco: false,
    leonard: false,
    security: false,
  });

  return (
    <div className="page">
      <BackButton />
      <h1 className="pageHeading">AI Agent Posts</h1>

      {/* ── Tool call approval — delete stale branches ───────────────────────── */}
      <Post
        avatarSrc={avatarMatty}
        avatarAlt="Matty"
        username="Matty"
        timestamp="just now"
        isBot
        botLabel="Agent"
      >
        <p style={msgText}>
          I found 8 branches in{' '}
          <code style={code}>mattermost/mattermost-server</code> that haven't
          had a commit in over 90 days. I can delete them to keep the repo tidy
          — take a look and let me know if I should go ahead.
        </p>
        <MessageAttachment
          header={{
            title: 'Delete Stale Branches',
            subtitle: 'mattermost/mattermost-server · 8 branches',
            chip: { label: 'APPROVAL NEEDED', variant: 'warning' },
          }}
          actions={[
            { label: 'Approve', variant: 'primary' },
            { label: 'Reject', variant: 'secondary' },
          ]}
        >
          <div style={codeBlock}>
            {`github.delete_branch(repo="mattermost/mattermost-server", branches=[
  "fix/MM-48291-avatar-upload",
  "feat/MM-47100-onboarding-v2",
  "fix/MM-47832-sidebar-scroll",
  ... and 5 more
])`}
          </div>
          <CollapsibleSection
            title="Branches to delete"
            badge="8 branches"
            defaultOpen={false}
          >
            <TimelineItem
              title="fix/MM-48291-avatar-upload"
              detail="Last commit Jan 9, 2026 · Ethan Brooks · 214 days ago"
            />
            <TimelineItem
              title="feat/MM-47100-onboarding-v2"
              detail="Last commit Dec 14, 2025 · Danielle Okoro · 113 days ago"
            />
            <TimelineItem
              title="fix/MM-47832-sidebar-scroll"
              detail="Last commit Dec 28, 2025 · Lukas Meyer · 99 days ago"
            />
            <TimelineItem
              title="chore/update-go-deps-nov"
              detail="Last commit Nov 30, 2025 · automated · 127 days ago"
            />
            <TimelineItem
              title="feat/MM-46500-reactions-v3"
              detail="Last commit Nov 15, 2025 · Isabella Cruz · 142 days ago"
            />
            <TimelineItem
              title="fix/MM-48011-thread-perf"
              detail="Last commit Jan 2, 2026 · Arjun Patel · 95 days ago"
            />
            <TimelineItem
              title="chore/lint-config-cleanup"
              detail="Last commit Oct 22, 2025 · Lukas Meyer · 166 days ago"
            />
            <TimelineItem
              title="feat/MM-45900-mentions-v2"
              detail="Last commit Oct 5, 2025 · Danielle Okoro · 183 days ago"
              isLast
            />
          </CollapsibleSection>
        </MessageAttachment>
      </Post>

      {/* ── Clarification — which Jira project? ──────────────────────────────── */}
      <Post
        avatarSrc={avatarMatty}
        avatarAlt="Matty"
        username="Matty"
        timestamp="just now"
        isBot
        botLabel="Agent"
      >
        <p style={msgText}>
          I have everything I need to file Aiko's bug report, but I'm not sure
          which Jira project it belongs to. Please select the project.
        </p>
        <MessageAttachment
          title="Which project should I create this Jira issue in?"
          actions={[
            { label: 'Confirm', variant: 'primary' },
            { label: 'Cancel', variant: 'secondary' },
          ]}
        >
          <div
            role="listbox"
            aria-label="Jira project"
            style={pickerGroup}
          >
            <SingleSelectPicker
              index={1}
              label="MM — Mattermost"
              description="Core product bugs, features, and improvements"
              selected={jiraProject === 1}
              onClick={() => setJiraProject(1)}
            />
            <SingleSelectPicker
              index={2}
              label="MOBILE — Mobile Apps"
              description="iOS and Android client bugs and platform-specific issues"
              selected={jiraProject === 2}
              onClick={() => setJiraProject(2)}
            />
            <SingleSelectPicker
              index={3}
              label="CLD — Cloud Platform"
              description="Cloud infrastructure, deployment, and reliability"
              selected={jiraProject === 3}
              onClick={() => setJiraProject(3)}
              border={false}
            />
          </div>
        </MessageAttachment>
      </Post>

      {/* ── Multi-select — incident notification targets ──────────────────────── */}
      <Post
        avatarSrc={avatarMatty}
        avatarAlt="Matty"
        username="Matty"
        timestamp="1 minute ago"
        isBot
        botLabel="Agent"
      >
        <p style={msgText}>
          The post-mortem draft for INC-2026-0089 is ready. Who should I send it
          to? I've pre-selected Leila and Arjun based on service ownership — let
          me know if you'd like to add anyone else.
        </p>
        <MessageAttachment
          header={{
            title: 'INC-2026-0089 · Notify Recipients',
            subtitle: 'P1 · Database connection pool exhausted · 47 min',
            chip: { label: 'REVIEW', variant: 'warning' },
          }}
          actions={[
            { label: 'Send notifications', variant: 'primary' },
            { label: 'Skip', variant: 'secondary' },
          ]}
        >
          <div style={pickerGroup}>
            <MultiSelectPicker
              label="Leila Haddad — Engineering Manager"
              checked={notify.leila}
              onChange={(e) =>
                setNotify((s) => ({ ...s, leila: e.target.checked }))
              }
            />
            <MultiSelectPicker
              label="Arjun Patel — On-call Engineer"
              checked={notify.arjun}
              onChange={(e) =>
                setNotify((s) => ({ ...s, arjun: e.target.checked }))
              }
            />
            <MultiSelectPicker
              label="Marco Rinaldi — Database Administrator"
              checked={notify.marco}
              onChange={(e) =>
                setNotify((s) => ({ ...s, marco: e.target.checked }))
              }
            />
            <MultiSelectPicker
              label="Leonard Riley — VP Engineering"
              checked={notify.leonard}
              onChange={(e) =>
                setNotify((s) => ({ ...s, leonard: e.target.checked }))
              }
            />
            <MultiSelectPicker
              label="Security Team"
              checked={notify.security}
              onChange={(e) =>
                setNotify((s) => ({ ...s, security: e.target.checked }))
              }
              border={false}
            />
          </div>
        </MessageAttachment>
      </Post>

      {/* ── Confirmation before DB migration ─────────────────────────────────── */}
      <Post
        avatarSrc={avatarMatty}
        avatarAlt="Matty"
        username="Matty"
        timestamp="2 minutes ago"
        isBot
        botLabel="Agent"
      >
        <p style={msgText}>
          The 1.14.2 schema migration is staged and ready to run on{' '}
          <code style={code}>prod-db-01</code>. A couple of the index operations
          will briefly lock rows, and this one can't be auto-reversed if
          something goes wrong — just want to make sure you're good to proceed.
        </p>
        <MessageAttachment
          header={{
            initials: 'DB',
            title: 'Schema Migration · prod-db-01',
            subtitle: 'mattermost_prod · PostgreSQL 15.4 · Release 1.14.2',
            chip: { label: 'CONFIRMATION NEEDED', variant: 'warning' },
          }}
          metrics={[
            { value: '~2m 30s', label: 'Est. duration' },
            { value: '~840K', label: 'Affected rows' },
            { value: '3', label: 'Tables modified' },
          ]}
          actions={[
            { label: 'Run migration', variant: 'danger' },
            { label: 'Cancel', variant: 'secondary' },
          ]}
        >
          <CollapsibleSection
            title="Migration operations"
            badge="5 operations"
            defaultOpen={false}
          >
            <TimelineItem
              title="ADD INDEX idx_users_created_at ON users (created_at)"
              detail="Estimated row lock: ~800ms"
            />
            <TimelineItem
              title="ADD INDEX idx_users_deactivated ON users (delete_at, active)"
              detail="Estimated row lock: ~600ms"
            />
            <TimelineItem
              title="ADD INDEX idx_sessions_expiry ON sessions (user_id, expire_at)"
              detail="Estimated row lock: ~1.2s"
            />
            <TimelineItem
              title="RENAME COLUMN users.notify_props → notification_preferences"
              detail="No lock required"
            />
            <TimelineItem
              title="RENAME COLUMN posts.channel_id → channel_ref_id"
              detail="No lock required"
              isLast
            />
          </CollapsibleSection>
        </MessageAttachment>
      </Post>

      {/* ── Completed action with revert option ──────────────────────────────── */}
      <Post
        avatarSrc={avatarMatty}
        avatarAlt="Matty"
        username="Matty"
        timestamp="5 minutes ago"
        isBot
        botLabel="Agent"
      >
        <p style={msgText}>
          Done! I've opened a draft pull request for the webhook retry changes.
          I auto-suggested Ethan and Danielle as reviewers based on recent
          activity in those files — let me know if you'd like to swap anyone
          out.
        </p>
        <MessageAttachment
          title="#8841 · feat: add retry logic to webhook dispatcher"
          actions={[
            {
              label: 'View pull request',
              variant: 'primary',
              trailingIcon: <OpenInNewIcon size={16} color="currentColor" />,
            },
            { label: 'Revert this action', variant: 'secondary' },
          ]}
        />
      </Post>

      {/* ── Pipeline paused — environment selection ───────────────────────────── */}
      <Post
        avatarSrc={avatarMatty}
        avatarAlt="Matty"
        username="Matty"
        timestamp="just now"
        isBot
        botLabel="Agent"
      >
        <p style={msgText}>
          Pre-deployment checks for v1.14.2 all passed. Before I continue with
          the pipeline, which environment should I deploy to?
        </p>
        <MessageAttachment
          header={{
            title: 'Deploy v1.14.2',
            subtitle:
              'Pipeline: release-deploy · bld-9c4a7f11 · all checks passed',
            chip: { label: 'AWAITING INPUT', variant: 'warning' },
          }}
          actions={[
            { label: 'Deploy', variant: 'primary' },
            { label: 'Cancel', variant: 'secondary' },
          ]}
        >
          <CollapsibleSection
            title="Pipeline progress"
            badge="2 of 5 complete"
            defaultOpen={false}
          >
            <SequenceItem
              step={1}
              title="Run test suite"
              detail="Passed · 1,847 tests · 4m 12s"
              status="completed"
            />
            <SequenceItem
              step={2}
              title="Build and tag release artifact"
              detail="Completed · bld-9c4a7f11 · 2m 08s"
              status="completed"
            />
            <SequenceItem
              step={3}
              title="Select deployment environment"
              detail="Awaiting your selection"
              status="active"
            />
            <SequenceItem
              step={4}
              title="Run pre-flight checks on target"
              detail="Pending"
              status="pending"
            />
            <SequenceItem
              step={5}
              title="Deploy and verify health"
              detail="Pending"
              status="pending"
              isLast
            />
          </CollapsibleSection>
          <div
            role="listbox"
            aria-label="Deployment environment"
            style={pickerGroup}
          >
            <SingleSelectPicker
              index={1}
              label="Production"
              description="Customer-facing · 3-region active/active · rolling deploy"
              selected={deployEnv === 1}
              onClick={() => setDeployEnv(1)}
            />
            <SingleSelectPicker
              index={2}
              label="Staging"
              description="Pre-production · mirrors production config · safe to deploy anytime"
              selected={deployEnv === 2}
              onClick={() => setDeployEnv(2)}
            />
            <SingleSelectPicker
              index={3}
              label="Development"
              description="Internal testing · relaxed health checks · frequent resets"
              selected={deployEnv === 3}
              onClick={() => setDeployEnv(3)}
              border={false}
            />
          </div>
        </MessageAttachment>
      </Post>

      {/* ── Security — exposed credential ────────────────────────────────────── */}
      <Post
        avatarSrc={avatarMatty}
        avatarAlt="Matty"
        username="Matty"
        timestamp="just now"
        isBot
        botLabel="Agent"
      >
        <p style={msgText}>
          I detected a live AWS access key in{' '}
          <code style={code}>company/infra-scripts</code> — it was pushed to a
          public repo about 14 minutes ago and is still active. I can revoke and
          rotate it right now. Given the exposure window, I'd recommend moving
          quickly on this.
        </p>
        <MessageAttachment
          header={{
            initials: 'SEC',
            title: 'Exposed Credential · AWS Access Key',
            subtitle: 'company/infra-scripts · commit 4f8a29d · Darius Cole',
            chip: { label: 'CRITICAL', variant: 'danger' },
          }}
          fields={[
            {
              label: 'Secret type',
              value: 'AWS Access Key  AKIA••••••••••••J7F2',
            },
            { label: 'Key status', value: 'Active — not yet revoked' },
            {
              label: 'Services at risk',
              value: 'S3 sync, Lambda deploys, ECR push',
            },
            { label: 'Exposure window', value: '14 minutes' },
          ]}
          fieldColumns={2}
          actions={[
            { label: 'Approve rotation', variant: 'danger' },
            { label: 'Dismiss', variant: 'secondary' },
          ]}
        >
          <div style={codeBlock}>
            {`# Exposed in commit 4f8a29d — deploy.sh line 14
export AWS_ACCESS_KEY_ID="AKIA••••••••••••J7F2"
export AWS_SECRET_ACCESS_KEY="••••••••••••••••••••••••••••••••••••••••"`}
          </div>
        </MessageAttachment>
      </Post>
    </div>
  );
}
