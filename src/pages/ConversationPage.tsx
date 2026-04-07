import { useState, useEffect, useRef } from 'react';
import OpenInNewIcon from '@mattermost/compass-icons/components/open-in-new';
import {
  MessageAttachment,
  MultiSelectPicker,
  Post,
  SingleSelectPicker,
  Spinner,
} from '@/components';
import avatarMatty from '@/assets/avatar-matty.png';
import userDavidL from '@/assets/user-david-liang.png';
import BackButton from '@/nav/BackButton';
import styles from './ConversationPage.module.scss';

// ── Phase map ─────────────────────────────────────────────────────────────────
//  0  idle
//  1  David: opening message
//  2  Matty: typing
//  3  Matty: tool picker               ← INTERACTIVE (fade+collapse → 4)
//  4  David: tool selection chip       (auto 300ms  → 5)
//  5  Matty: typing                    (auto 1400ms → 6)
//  6  Matty: team picker               ← INTERACTIVE (fade+collapse → 7)
//  7  David: team selection list       (auto 300ms  → 8)
//  8  Matty: typing                    (auto 1400ms → 9)
//  9  Matty: cadence picker            ← INTERACTIVE (fade+collapse → 10)
// 10  David: cadence selection chip    (auto 300ms  → 11)
// 11  Matty: typing                    (auto 1800ms → 12)
// 12  Matty: summary + confirm         ← INTERACTIVE (fade+collapse → 13)
// 13  David: confirmed chip            (auto 300ms  → 14)
// 14  Matty: typing                    (auto 2000ms → 15)
// 15  Matty: success

const AUTO_DELAYS: Partial<Record<number, number>> = {
  0: 600,
  1: 800,
  2: 1800,
  // 3 → user interaction
  4: 300,
  5: 1400,
  // 6 → user interaction
  7: 300,
  8: 1400,
  // 9 → user interaction
  10: 300,
  11: 1800,
  // 12 → user interaction
  13: 300,
  14: 2000,
};

// Widget fade duration + collapse duration + small buffer
const FADE_MS = 220;
const COLLAPSE_MS = 150;
const DISMISS_MS = FADE_MS + COLLAPSE_MS + 20;

const TOOL_LABELS = ['PagerDuty', 'OpsGenie', 'Linear'];
const CADENCE_LABELS = ['Weekly', 'Bi-weekly', 'Daily'];
const CADENCE_DESC = [
  'Each person covers one full 7-day week',
  'Rotate every two weeks — good for smaller teams',
  'Hand off at midnight each day — high-touch, short shifts',
];

const msgText: React.CSSProperties = {
  margin: 0,
  fontFamily: 'Open Sans, sans-serif',
  fontSize: 14,
  lineHeight: '20px',
  color: 'var(--center-channel-color)',
};

const pickerGroup: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};

// ── Sub-components ────────────────────────────────────────────────────────────

function Msg({ children }: { children: React.ReactNode }) {
  return <div className={styles.messageEnter}>{children}</div>;
}

function TypingPost() {
  return (
    <Post
      avatarSrc={avatarMatty}
      avatarAlt="Matty"
      username="Matty"
      timestamp=""
      isBot
      botLabel="Agent"
    >
      <div className={styles.typingSpinner}>
        <Spinner size={12} aria-label="Thinking" />
        <span className={styles.typingLabel}>Thinking</span>
      </div>
    </Post>
  );
}

function SelectionChips({ items }: { items: string[] }) {
  return (
    <div className={styles.selectionChips}>
      {items.map((item) => (
        <span key={item} className={styles.selectionChip}>
          {item}
        </span>
      ))}
    </div>
  );
}

function SelectionList({ items }: { items: string[] }) {
  return (
    <ul className={styles.selectionList}>
      {items.map((item) => (
        <li key={item} className={styles.selectionListItem}>
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ConversationPage() {
  const [phase, setPhase] = useState(0);
  const [dismissing, setDismissing] = useState<number | null>(null);
  const [tool, setTool] = useState<number | null>(null);
  const [cadence, setCadence] = useState<number | null>(null);
  const [members, setMembers] = useState({
    ethan: true,
    danielle: false,
    isabella: true,
    arjun: true,
    leila: false,
  });
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const delay = AUTO_DELAYS[phase];
    if (delay === undefined) return;
    const t = setTimeout(() => setPhase((p) => p + 1), delay);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [phase]);

  // Fade the widget to opacity 0, then collapse its height, then advance.
  function dismissAndAdvance(fromPhase: number, toPhase: number) {
    setDismissing(fromPhase);
    setTimeout(() => {
      setDismissing(null);
      setPhase(toPhase);
    }, DISMISS_MS);
  }

  const selectedNames = (
    Object.entries({
      'Ethan Brooks': members.ethan,
      'Danielle Okoro': members.danielle,
      'Isabella Cruz': members.isabella,
      'Arjun Patel': members.arjun,
      'Leila Haddad': members.leila,
    }) as [string, boolean][]
  )
    .filter(([, v]) => v)
    .map(([k]) => k);

  const toolLabel = tool !== null ? TOOL_LABELS[tool - 1] : 'PagerDuty';
  const cadenceLabel =
    cadence !== null ? CADENCE_LABELS[cadence - 1] : 'Weekly';

  function restart() {
    setPhase(0);
    setDismissing(null);
    setTool(null);
    setCadence(null);
    setMembers({
      ethan: true,
      danielle: false,
      isabella: true,
      arjun: true,
      leila: false,
    });
  }

  function widgetCls(forPhase: number) {
    return [
      styles.widgetSlot,
      dismissing === forPhase ? styles.widgetDismissing : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  return (
    <div className={['page', styles.conversationPage].join(' ')}>
      <BackButton />
      <h1 className="pageHeading">Agent Demo</h1>

      <div className={styles.messages}>
        {/* 1 ── David: opening ─────────────────────────────────────────────── */}
        {phase >= 1 && (
          <Msg>
            <Post
              avatarSrc={userDavidL}
              avatarAlt="David Liang"
              username="David Liang"
              timestamp="just now"
            >
              <p style={msgText}>
                Hey Matty, can you help me set up an on-call rotation for the
                mobile team?
              </p>
            </Post>
          </Msg>
        )}

        {/* 2 ── Matty: typing ──────────────────────────────────────────────── */}
        {phase === 2 && (
          <Msg>
            <TypingPost />
          </Msg>
        )}

        {/* 3 ── Matty: tool picker ─────────────────────────────────────────── */}
        {phase >= 3 && (
          <Msg>
            <Post
              avatarSrc={avatarMatty}
              avatarAlt="Matty"
              username="Matty"
              timestamp="just now"
              isBot
              botLabel="Agent"
            >
              <p style={msgText}>
                Sure! Let me get that set up. Which scheduling tool should I
                configure this in?
              </p>
              {(phase === 3 || dismissing === 3) && (
                <div className={widgetCls(3)}>
                  <MessageAttachment
                    header={{
                      title: 'Select Scheduling Tool',
                      chip: { label: 'AWAITING INPUT', variant: 'warning' },
                    }}
                    actions={[
                      {
                        label: 'Confirm',
                        variant: 'primary',
                        onClick: () => {
                          if (tool !== null) dismissAndAdvance(3, 4);
                        },
                      },
                      { label: 'Cancel', variant: 'secondary' },
                    ]}
                  >
                    <div
                      role="listbox"
                      aria-label="Scheduling tool"
                      style={pickerGroup}
                    >
                      <SingleSelectPicker
                        index={1}
                        label="PagerDuty"
                        description="Enterprise on-call scheduling and incident response"
                        selected={tool === 1}
                        onClick={() => setTool(1)}
                      />
                      <SingleSelectPicker
                        index={2}
                        label="OpsGenie"
                        description="Flexible alerting and on-call management by Atlassian"
                        selected={tool === 2}
                        onClick={() => setTool(2)}
                      />
                      <SingleSelectPicker
                        index={3}
                        label="Linear"
                        description="Project-based on-call for engineering-first teams"
                        selected={tool === 3}
                        onClick={() => setTool(3)}
                        border={false}
                      />
                    </div>
                  </MessageAttachment>
                </div>
              )}
            </Post>
          </Msg>
        )}

        {/* 4 ── David: tool selection chip ────────────────────────────────── */}
        {phase >= 4 && (
          <Msg>
            <Post
              avatarSrc={userDavidL}
              avatarAlt="David Liang"
              username="David Liang"
              timestamp="just now"
            >
              <SelectionChips items={[toolLabel]} />
            </Post>
          </Msg>
        )}

        {/* 5 ── Matty: typing ──────────────────────────────────────────────── */}
        {phase === 5 && (
          <Msg>
            <TypingPost />
          </Msg>
        )}

        {/* 6 ── Matty: team picker ─────────────────────────────────────────── */}
        {phase >= 6 && (
          <Msg>
            <Post
              avatarSrc={avatarMatty}
              avatarAlt="Matty"
              username="Matty"
              timestamp="just now"
              isBot
              botLabel="Agent"
            >
              <p style={msgText}>
                {toolLabel}, got it. Who should be on the rotation? I've
                suggested a few people based on the #mobile-team channel.
              </p>
              {(phase === 6 || dismissing === 6) && (
                <div className={widgetCls(6)}>
                  <MessageAttachment
                    header={{
                      title: 'Add Team Members',
                      chip: { label: 'AWAITING INPUT', variant: 'warning' },
                    }}
                    actions={[
                      {
                        label: 'Add to rotation',
                        variant: 'primary',
                        onClick: () => dismissAndAdvance(6, 7),
                      },
                      { label: 'Skip', variant: 'secondary' },
                    ]}
                  >
                    <div style={pickerGroup}>
                      <MultiSelectPicker
                        label="Ethan Brooks"
                        checked={members.ethan}
                        onChange={(e) =>
                          setMembers((s) => ({ ...s, ethan: e.target.checked }))
                        }
                      />
                      <MultiSelectPicker
                        label="Danielle Okoro"
                        checked={members.danielle}
                        onChange={(e) =>
                          setMembers((s) => ({
                            ...s,
                            danielle: e.target.checked,
                          }))
                        }
                      />
                      <MultiSelectPicker
                        label="Isabella Cruz"
                        checked={members.isabella}
                        onChange={(e) =>
                          setMembers((s) => ({
                            ...s,
                            isabella: e.target.checked,
                          }))
                        }
                      />
                      <MultiSelectPicker
                        label="Arjun Patel"
                        checked={members.arjun}
                        onChange={(e) =>
                          setMembers((s) => ({ ...s, arjun: e.target.checked }))
                        }
                      />
                      <MultiSelectPicker
                        label="Leila Haddad"
                        checked={members.leila}
                        onChange={(e) =>
                          setMembers((s) => ({ ...s, leila: e.target.checked }))
                        }
                        border={false}
                      />
                    </div>
                  </MessageAttachment>
                </div>
              )}
            </Post>
          </Msg>
        )}

        {/* 7 ── David: team selection list ────────────────────────────────── */}
        {phase >= 7 && (
          <Msg>
            <Post
              avatarSrc={userDavidL}
              avatarAlt="David Liang"
              username="David Liang"
              timestamp="just now"
            >
              <SelectionList
                items={
                  selectedNames.length > 0
                    ? selectedNames
                    : ['Ethan Brooks', 'Isabella Cruz', 'Arjun Patel']
                }
              />
            </Post>
          </Msg>
        )}

        {/* 8 ── Matty: typing ──────────────────────────────────────────────── */}
        {phase === 8 && (
          <Msg>
            <TypingPost />
          </Msg>
        )}

        {/* 9 ── Matty: cadence picker ──────────────────────────────────────── */}
        {phase >= 9 && (
          <Msg>
            <Post
              avatarSrc={avatarMatty}
              avatarAlt="Matty"
              username="Matty"
              timestamp="just now"
              isBot
              botLabel="Agent"
            >
              <p style={msgText}>
                {selectedNames.length > 0
                  ? `Added ${selectedNames.slice(0, 2).join(' and ')}${selectedNames.length > 2 ? ` and ${selectedNames.length - 2} more` : ''}. What rotation interval should I use?`
                  : 'What rotation interval should I use?'}
              </p>
              {(phase === 9 || dismissing === 9) && (
                <div className={widgetCls(9)}>
                  <MessageAttachment
                    header={{
                      title: 'Select Rotation Cadence',
                      chip: { label: 'AWAITING INPUT', variant: 'warning' },
                    }}
                    actions={[
                      {
                        label: 'Confirm',
                        variant: 'primary',
                        onClick: () => {
                          if (cadence !== null) dismissAndAdvance(9, 10);
                        },
                      },
                      { label: 'Cancel', variant: 'secondary' },
                    ]}
                  >
                    <div
                      role="listbox"
                      aria-label="Rotation cadence"
                      style={pickerGroup}
                    >
                      {CADENCE_LABELS.map((label, i) => (
                        <SingleSelectPicker
                          key={label}
                          index={i + 1}
                          label={label}
                          description={CADENCE_DESC[i]}
                          selected={cadence === i + 1}
                          onClick={() => setCadence(i + 1)}
                          border={i < CADENCE_LABELS.length - 1}
                        />
                      ))}
                    </div>
                  </MessageAttachment>
                </div>
              )}
            </Post>
          </Msg>
        )}

        {/* 10 ── David: cadence chip ───────────────────────────────────────── */}
        {phase >= 10 && (
          <Msg>
            <Post
              avatarSrc={userDavidL}
              avatarAlt="David Liang"
              username="David Liang"
              timestamp="just now"
            >
              <SelectionChips items={[cadenceLabel]} />
            </Post>
          </Msg>
        )}

        {/* 11 ── Matty: typing ─────────────────────────────────────────────── */}
        {phase === 11 && (
          <Msg>
            <TypingPost />
          </Msg>
        )}

        {/* 12 ── Matty: summary + confirm ──────────────────────────────────── */}
        {phase >= 12 && (
          <Msg>
            <Post
              avatarSrc={avatarMatty}
              avatarAlt="Matty"
              username="Matty"
              timestamp="just now"
              isBot
              botLabel="Agent"
            >
              <p style={msgText}>
                Here's what I'll set up — take a look before I make any changes.
              </p>
              {(phase === 12 || dismissing === 12) && (
                <div className={widgetCls(12)}>
                  <MessageAttachment
                    header={{
                      title: 'Create On-Call Schedule',
                      chip: {
                        label: 'CONFIRMATION NEEDED',
                        variant: 'warning',
                      },
                    }}
                    fields={[
                      { label: 'Tool', value: toolLabel },
                      { label: 'Cadence', value: cadenceLabel },
                      { label: 'Start date', value: 'Monday, April 7, 2026' },
                      { label: 'Schedule', value: 'Mobile Team On-Call' },
                      {
                        label: 'Rotation',
                        value:
                          selectedNames.length > 0
                            ? selectedNames.join(', ')
                            : 'Ethan Brooks, Isabella Cruz, Arjun Patel',
                        colSpan: 2,
                      },
                      {
                        label: 'Escalation',
                        value: 'Leila Haddad — Engineering Manager',
                        colSpan: 2,
                      },
                    ]}
                    fieldColumns={2}
                    actions={[
                      {
                        label: 'Confirm',
                        variant: 'primary',
                        onClick: () => dismissAndAdvance(12, 13),
                      },
                      { label: 'Cancel', variant: 'secondary' },
                    ]}
                  />
                </div>
              )}
            </Post>
          </Msg>
        )}

        {/* 13 ── David: confirmed chip ─────────────────────────────────────── */}
        {phase >= 13 && (
          <Msg>
            <Post
              avatarSrc={userDavidL}
              avatarAlt="David Liang"
              username="David Liang"
              timestamp="just now"
            >
              <SelectionChips items={['Confirmed']} />
            </Post>
          </Msg>
        )}

        {/* 14 ── Matty: typing ─────────────────────────────────────────────── */}
        {phase === 14 && (
          <Msg>
            <TypingPost />
          </Msg>
        )}

        {/* 15 ── Matty: success ────────────────────────────────────────────── */}
        {phase >= 15 && (
          <Msg>
            <Post
              avatarSrc={avatarMatty}
              avatarAlt="Matty"
              username="Matty"
              timestamp="just now"
              isBot
              botLabel="Agent"
            >
              <p style={msgText}>
                All done! The schedule is live and the first shift kicks off
                Monday. I've sent calendar invites to everyone on the rotation.
              </p>
              <MessageAttachment
                header={{
                  initials: toolLabel.slice(0, 2).toUpperCase(),
                  title: 'Mobile Team On-Call · Created',
                  subtitle: `${toolLabel} · ${cadenceLabel} rotation · ${selectedNames.length || 3} members`,
                  chip: { label: 'COMPLETED', variant: 'success' },
                }}
                actions={[
                  {
                    label: `View in ${toolLabel}`,
                    variant: 'primary',
                    trailingIcon: (
                      <OpenInNewIcon size={16} color="currentColor" />
                    ),
                  },
                ]}
              />
            </Post>
          </Msg>
        )}

        {/* Replay ──────────────────────────────────────────────────────────── */}
        {phase >= 15 && (
          <Msg>
            <div className={styles.replayRow}>
              <button className={styles.replayButton} onClick={restart}>
                Replay conversation
              </button>
            </div>
          </Msg>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
