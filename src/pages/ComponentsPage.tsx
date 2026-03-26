import OpenInNewIcon from '@mattermost/compass-icons/components/open-in-new';
import Button from '../components/Button/Button';
import Checkbox from '../components/Checkbox/Checkbox';
import Radio from '../components/Radio/Radio';
import Switch from '../components/Switch/Switch';
import TextInput from '../components/TextInput/TextInput';
import StatusBadge from '../components/StatusBadge/StatusBadge';
import UserAvatar from '../components/UserAvatar/UserAvatar';
import CollapsibleSection from '../components/CollapsibleSection/CollapsibleSection';
import Metric from '../components/Metric/Metric';
import ActionBar from '../components/ActionBar/ActionBar';
import Select from '../components/Select/Select';
import KeyValue from '../components/KeyValue/KeyValue';
import LabelTag from '../components/LabelTag/LabelTag';
import SequenceItem from '../components/SequenceItem/SequenceItem';
import TimelineItem from '../components/TimelineItem/TimelineItem';
import UserList from '../components/UserList/UserList';
import Divider from '../components/Divider/Divider';
import MessageAttachment from '../components/MessageAttachment/MessageAttachment';
import EntityHeader from '../components/EntityHeader/EntityHeader';
import userLeonardRiley from '../assets/user-leonard-riley.png';
import userAikoTan from '../assets/user-aiko-tan.png';
import userArjunPatel from '../assets/user-arjun-patel.png';
import styles from './ComponentsPage.module.scss';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

function Row({ label, children, align = 'center' }: { label: string; children: React.ReactNode; align?: 'center' | 'start' }) {
  return (
    <div className={styles.row} style={{ alignItems: align === 'start' ? 'flex-start' : 'center' }}>
      <span className={styles.rowLabel}>{label}</span>
      <div className={styles.rowContent}>{children}</div>
    </div>
  );
}

const demoUsers = [
  { avatarSrc: userLeonardRiley, name: 'Leonard Riley', role: 'Director, Security Engineering' },
  { avatarSrc: userAikoTan, name: 'Aiko Tan', role: 'Senior Manager' },
  { avatarSrc: userArjunPatel, name: 'Arjun Patel', role: 'Platform Administrator' },
];

export default function ComponentsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Components</h1>

      {/* Button */}
      <Section title="Button">
        <Row label="Primary">
          <Button variant="primary">Save changes</Button>
          <Button variant="primary" trailingIcon={<OpenInNewIcon size={16} color="currentColor" />}>
            Open in app
          </Button>
        </Row>
        <Row label="Secondary">
          <Button variant="secondary">Cancel</Button>
          <Button variant="secondary" trailingIcon={<OpenInNewIcon size={16} color="currentColor" />}>
            View details
          </Button>
        </Row>
      </Section>

      {/* Checkbox */}
      <Section title="Checkbox">
        <Row label="Unchecked">
          <Checkbox>Subscribe to notifications</Checkbox>
        </Row>
        <Row label="Checked">
          <Checkbox defaultChecked>Enable two-factor authentication</Checkbox>
        </Row>
        <Row label="Indeterminate">
          <Checkbox indeterminate>Select all</Checkbox>
        </Row>
        <Row label="Sizes">
          <Checkbox size="Small">Small</Checkbox>
          <Checkbox size="Medium">Medium</Checkbox>
          <Checkbox size="Large">Large</Checkbox>
        </Row>
        <Row label="Invalid">
          <Checkbox valid={false} defaultChecked>Accept terms</Checkbox>
        </Row>
      </Section>

      {/* Radio */}
      <Section title="Radio">
        <Row label="Group">
          <Radio name="priority" defaultChecked>High</Radio>
          <Radio name="priority">Medium</Radio>
          <Radio name="priority">Low</Radio>
        </Row>
        <Row label="Sizes">
          <Radio name="size-demo" size="Small">Small</Radio>
          <Radio name="size-demo" size="Medium" defaultChecked>Medium</Radio>
          <Radio name="size-demo" size="Large">Large</Radio>
        </Row>
        <Row label="Invalid">
          <Radio name="invalid-demo" valid={false} defaultChecked>Invalid option</Radio>
        </Row>
      </Section>

      {/* Switch */}
      <Section title="Switch">
        <Row label="Off">
          <Switch>Email notifications</Switch>
        </Row>
        <Row label="On">
          <Switch defaultChecked>Desktop notifications</Switch>
        </Row>
        <Row label="With description">
          <Switch defaultChecked secondaryLabel="Receive alerts when someone mentions you">
            Mentions
          </Switch>
        </Row>
        <Row label="Sizes">
          <Switch size="Small">Small</Switch>
          <Switch size="Medium" defaultChecked>Medium</Switch>
          <Switch size="Large">Large</Switch>
        </Row>
      </Section>

      {/* Text Input */}
      <Section title="Text Input">
        <Row label="Default">
          <TextInput placeholder="Enter a value" />
        </Row>
        <Row label="With label">
          <TextInput label="Email address" placeholder="you@example.com" />
        </Row>
        <Row label="Sizes">
          <TextInput size="Small" placeholder="Small" />
          <TextInput size="Medium" placeholder="Medium" />
          <TextInput size="Large" placeholder="Large" />
        </Row>
        <Row label="Invalid">
          <TextInput label="Username" defaultValue="bad value" invalid />
        </Row>
        <Row label="With character count">
          <TextInput label="Note" maxLength={100} showCharacterCount placeholder="Write a note…" />
        </Row>
      </Section>

      {/* Status Badge */}
      <Section title="Status Badge">
        <Row label="Statuses">
          <StatusBadge status="Online" size="Medium" />
          <StatusBadge status="Away" size="Medium" />
          <StatusBadge status="Do Not Disturb" size="Medium" />
          <StatusBadge status="Offline" size="Medium" />
        </Row>
        <Row label="Sizes">
          <StatusBadge status="Online" size="XX-Small" />
          <StatusBadge status="Online" size="X-Small" />
          <StatusBadge status="Online" size="Small" />
          <StatusBadge status="Online" size="Medium" />
          <StatusBadge status="Online" size="Large" />
        </Row>
      </Section>

      {/* User Avatar */}
      <Section title="User Avatar">
        <Row label="Sizes">
          <UserAvatar src={userLeonardRiley} alt="Leonard Riley" size="24" />
          <UserAvatar src={userLeonardRiley} alt="Leonard Riley" size="32" />
          <UserAvatar src={userLeonardRiley} alt="Leonard Riley" size="40" />
          <UserAvatar src={userLeonardRiley} alt="Leonard Riley" size="48" />
          <UserAvatar src={userLeonardRiley} alt="Leonard Riley" size="64" />
        </Row>
        <Row label="With status">
          <UserAvatar src={userLeonardRiley} alt="Leonard Riley" size="32" status />
          <UserAvatar src={userLeonardRiley} alt="Leonard Riley" size="40" status />
          <UserAvatar src={userLeonardRiley} alt="Leonard Riley" size="48" status />
        </Row>
      </Section>

      {/* Label Tag */}
      <Section title="Label Tag">
        <Row label="Default">
          <LabelTag label="Bot" />
          <LabelTag label="App" />
        </Row>
      </Section>

      {/* Key Value */}
      <Section title="Key Value">
        <Row label="Default">
          <KeyValue label="Assigned to" value="Alex Morgan" />
          <KeyValue label="Priority" value="High" />
        </Row>
        <Row label="Muted value">
          <KeyValue label="TAM" value="Not assigned" muted />
        </Row>
      </Section>

      {/* Metric */}
      <Section title="Metric">
        <Row label="Default">
          <Metric value="$18,000" label="Net new ARR" />
          <Metric value="150" label="Seats" />
          <Metric value="2026-03-17" label="Close date" />
        </Row>
      </Section>

      {/* Select */}
      <Section title="Select">
        <Row label="Default">
          <div style={{ width: 280 }}>
            <Select
              placeholder="Select an option"
              options={[
                { value: 'option-1', label: 'Option 1' },
                { value: 'option-2', label: 'Option 2' },
                { value: 'option-3', label: 'Option 3' },
              ]}
            />
          </div>
        </Row>
        <Row label="With value">
          <div style={{ width: 280 }}>
            <Select
              value="option-2"
              options={[
                { value: 'option-1', label: 'Option 1' },
                { value: 'option-2', label: 'Option 2' },
                { value: 'option-3', label: 'Option 3' },
              ]}
            />
          </div>
        </Row>
      </Section>

      {/* Action Bar */}
      <Section title="Action Bar">
        <Row label="Mixed actions">
          <ActionBar actions={[
            { label: 'Acknowledge', variant: 'primary' },
            { label: 'Reassign', variant: 'secondary' },
            { label: 'Resolve', variant: 'secondary' },
          ]} />
        </Row>
        <Row label="With icon">
          <ActionBar actions={[
            { label: 'Open in app', variant: 'primary', trailingIcon: <OpenInNewIcon size={16} color="currentColor" /> },
            { label: 'View details', variant: 'secondary' },
          ]} />
        </Row>
        <Row label="Select + button">
          <div style={{ width: '100%' }}>
            <ActionBar
              select={{
                placeholder: 'Select an option',
                options: [
                  { value: 'reassign', label: 'Reassign to me' },
                  { value: 'escalate', label: 'Escalate' },
                  { value: 'close', label: 'Close ticket' },
                ],
              }}
              actions={[{ label: 'Apply', variant: 'primary' }]}
            />
          </div>
        </Row>
      </Section>

      {/* Collapsible Section */}
      <Section title="Collapsible Section">
        <Row label="Collapsed" align="start">
          <CollapsibleSection title="Technical details" badge="6 fields" defaultOpen={false} />
        </Row>
        <Row label="Expanded" align="start">
          <CollapsibleSection title="Timeline" badge="3 events" defaultOpen={true}>
            <TimelineItem title="Incident triggered" detail="11:04 AM PST • Datadog alert" />
            <TimelineItem title="Acknowledged by Alex Morgan" detail="11:31 · via mobile" />
            <TimelineItem title="Escalation paused" detail="11:31 · Next: L2 in 25 min" isLast />
          </CollapsibleSection>
        </Row>
      </Section>

      {/* Timeline Item */}
      <Section title="Timeline Item">
        <Row label="Items" align="start">
          <div style={{ width: '100%' }}>
            <TimelineItem title="Incident triggered" detail="11:04 AM PST • Datadog alert" />
            <TimelineItem title="Acknowledged by Alex Morgan" detail="11:31 · via mobile" />
            <TimelineItem title="Escalation paused" detail="11:31 · Next: L2 in 25 min" isLast />
          </div>
        </Row>
      </Section>

      {/* Sequence Item */}
      <Section title="Sequence Item">
        <Row label="States" align="start">
          <div style={{ width: '100%' }}>
            <SequenceItem step={1} title="Department approval" status="completed" />
            <SequenceItem step={2} title="Budget Approval" detail="Pending • 3 approvers" status="active" />
            <SequenceItem step={3} title="Vendor Onboarding" status="pending" />
            <SequenceItem step={4} title="Legal & Security Review" status="pending" isLast />
          </div>
        </Row>
      </Section>

      {/* User List */}
      <Section title="User List">
        <Row label="Filterable" align="start">
          <div style={{ width: '100%' }}>
            <UserList users={demoUsers} />
          </div>
        </Row>
      </Section>

      {/* Divider */}
      <Section title="Divider">
        <Row label="Default" align="start">
          <div style={{ width: '100%' }}>
            <Divider />
          </div>
        </Row>
      </Section>

      {/* Entity Header */}
      <Section title="Entity Header">
        <Row label="Basic" align="start">
          <div style={{ width: '100%' }}>
            <EntityHeader initials="NP" title="NovaPrime Corp" subtitle="Professional · New Subscription" />
          </div>
        </Row>
        <Row label="With chip" align="start">
          <div style={{ width: '100%' }}>
            <EntityHeader initials="PD" title="Users assigned to PagerDuty" subtitle="Application" chip={{ label: 'Enabled', variant: 'success' }} />
          </div>
        </Row>
      </Section>

    </div>
  );
}
