import OpenInNewIcon from '@mattermost/compass-icons/components/open-in-new';
import avatarPagerduty from '../assets/avatar-pagerduty.png';
import avatarAirbase from '../assets/avatar-airbase.png';
import avatarSalesforce from '../assets/avatar-salesforce.png';
import avatarEntra from '../assets/avatar-entra.png';
import userLeonardRiley from '../assets/user-leonard-riley.png';
import userAikoTan from '../assets/user-aiko-tan.png';
import userArjunPatel from '../assets/user-arjun-patel.png';
import userDanielleOkoro from '../assets/user-danielle-okoro.png';
import userDariusCole from '../assets/user-darius-cole.png';
import userDavidLiang from '../assets/user-david-liang.png';
import Post from '../components/Post/Post';
import UserList from '../components/UserList/UserList';
import MessageAttachment from '../components/MessageAttachment/MessageAttachment';
import CollapsibleSection from '../components/CollapsibleSection/CollapsibleSection';
import TimelineItem from '../components/TimelineItem/TimelineItem';
import SequenceItem from '../components/SequenceItem/SequenceItem';
import styles from './FramesPage.module.scss';

const timelineEvents = [
  { title: 'Incident triggered', detail: '11:04 AM PST • Datadog alert' },
  { title: 'Acknowledged by Alex Morgan', detail: '11:31 · via mobile' },
  { title: 'Escalation paused', detail: '11:31 · Next: L2 in 25 min' },
];

const entraPagerDutyUsers = [
  { avatarSrc: userLeonardRiley, name: 'Leonard Riley', role: 'Director, Security Engineering' },
  { avatarSrc: userAikoTan, name: 'Aiko Tan', role: 'Senior Manager' },
  { avatarSrc: userArjunPatel, name: 'Arjun Patel', role: 'Platform Administrator' },
  { avatarSrc: userDanielleOkoro, name: 'Danielle Okoro', role: 'Software Engineer' },
  { avatarSrc: userDariusCole, name: 'Darius Cole', role: 'Product Designer' },
  { avatarSrc: userDavidLiang, name: 'David Liang', role: 'Product Manager' },
];

const approvalChain = [
  { step: 1, title: 'Department approval', status: 'completed' as const },
  { step: 2, title: 'Budget Approval', detail: 'Pending • 3 approvers', status: 'active' as const },
  { step: 3, title: 'Vendor Onboarding', status: 'pending' as const },
  { step: 4, title: '3rd Party Paper Legal & Security Review', status: 'pending' as const },
  { step: 5, title: 'OneTrust Security Review', status: 'pending' as const },
  { step: 6, title: 'Finance & Accounting Approval', status: 'pending' as const },
];

export default function FramesPage() {
  return (
    <div className={styles.page}>

      {/* Frame 1 — PagerDuty incident */}
      <Post
        avatarSrc={avatarPagerduty}
        avatarAlt="Pagerduty"
        username="Pagerduty"
        timestamp="10:43 AM"
        isBot={true}
      >
        <MessageAttachment
          title="API latency spike — us-east-1"
          fields={[
            { label: 'Priority', value: 'High' },
            { label: 'Assigned to', value: 'Alex Morgan' },
            { label: 'Triggered', value: '3 minutes ago' },
          ]}
          actions={[
            { label: 'Acknowledge', variant: 'primary' },
            { label: 'Reassign', variant: 'secondary' },
            { label: 'Add a note', variant: 'secondary' },
            { label: 'Resolve', variant: 'secondary' },
          ]}
        >
          <CollapsibleSection title="Timeline" badge="3 events">
            {timelineEvents.map((event, index) => (
              <TimelineItem
                key={event.title}
                title={event.title}
                detail={event.detail}
                isLast={index === timelineEvents.length - 1}
              />
            ))}
          </CollapsibleSection>
        </MessageAttachment>
      </Post>

      {/* Frame 2 — Airbase purchase request */}
      <Post
        avatarSrc={avatarAirbase}
        avatarAlt="Airbase"
        username="Airbase"
        timestamp="10:43 AM"
        isBot={true}
      >
        <MessageAttachment
          title="New purchase request submitted"
          description="Consolidating existing existing seats under a new consolidated subscription with centralized admin, SSO, audit logging, and IT admin controls. Year 1 cost reflects a discount on the standard rate."
          metrics={[
            { value: '$3,129.99', label: 'Amount (USD)' },
            { value: 'Medium', label: 'Urgency (5 business days)' },
            { value: 'Software', label: 'Category' },
          ]}
          fields={[
            { label: 'Requester', value: 'Alex Morgan' },
            { label: 'Vendor', value: 'Acme Corp Software Co' },
            { label: 'Previous vendor', value: 'No' },
            { label: 'Request ID', value: '2ece6f9b-6539' },
            { label: 'Status', value: 'Pending' },
          ]}
          actions={[
            {
              label: 'Open in Airbase',
              variant: 'primary',
              trailingIcon: <OpenInNewIcon size={16} color="currentColor" />,
            },
          ]}
        >
          <CollapsibleSection title="Approval chain" badge="6 steps" defaultOpen={true}>
            {approvalChain.map((item, index) => (
              <SequenceItem
                key={item.step}
                step={item.step}
                title={item.title}
                detail={item.detail}
                status={item.status}
                isLast={index === approvalChain.length - 1}
              />
            ))}
          </CollapsibleSection>
        </MessageAttachment>
      </Post>

      {/* Frame 3 — Salesforce opportunity */}
      <Post
        avatarSrc={avatarSalesforce}
        avatarAlt="Salesforce"
        username="Salesforce"
        timestamp="10:43 AM"
        isBot={true}
      >
        <MessageAttachment
          header={{ initials: 'NP', title: 'NovaPrime Corp', subtitle: 'Professional · New Subscription' }}
          metrics={[
            { value: '$18,000', label: 'Net new ARR' },
            { value: '150', label: 'Seats' },
            { value: 'Professional', label: 'License' },
            { value: '2026-03-17', label: 'Close date' },
          ]}
          labeledText={{
            label: 'Use case',
            text: 'Resilient/Out-of-Band Communication — used by Cyber Security Team for mission critical comms. Business objective: communicate securely.',
          }}
          fields={[
            { label: 'Sales rep', value: 'Dana Mitchell' },
            { label: 'Customer engineer', value: 'Raj Patel' },
            { label: 'Account manager', value: 'Arnold Williamson' },
            { label: 'TAM', value: 'Not assigned', muted: true },
          ]}
          fieldColumns={4}
          actions={[
            {
              label: 'Open Opportunity',
              variant: 'primary',
              trailingIcon: <OpenInNewIcon size={16} color="currentColor" />,
            },
            { label: 'View account', variant: 'secondary' },
            { label: 'View contacts', variant: 'secondary' },
          ]}
        >
          <CollapsibleSection title="Technical details" badge="6 fields" defaultOpen={false} />
        </MessageAttachment>
      </Post>

      {/* Frame 4 — Entra user listing */}
      <Post
        avatarSrc={avatarEntra}
        avatarAlt="Entra"
        username="Entra"
        timestamp="10:43 AM"
        isBot={true}
      >
        <MessageAttachment
          header={{
            initials: 'PD',
            title: 'Users assigned to PagerDuty',
            subtitle: 'Application',
            chip: { label: 'Enabled', variant: 'success' },
          }}
          actions={[
            {
              label: 'Open in Entra',
              variant: 'primary',
              trailingIcon: <OpenInNewIcon size={16} color="currentColor" />,
            },
            { label: 'View groups', variant: 'secondary' },
          ]}
        >
          <UserList users={entraPagerDutyUsers} />
        </MessageAttachment>
      </Post>

    </div>
  );
}
