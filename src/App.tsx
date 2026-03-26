import Post from './components/Post/Post';
import MessageAttachment from './components/MessageAttachment/MessageAttachment';
import CollapsibleSection from './components/CollapsibleSection/CollapsibleSection';
import TimelineItem from './components/TimelineItem/TimelineItem';

// Bot avatar placeholder — replace with real asset
const botAvatarSrc = 'https://www.gravatar.com/avatar/pagerduty?d=identicon&s=32';

const timelineEvents = [
  { title: 'Incident triggered', detail: '11:04 AM PST • Datadog alert' },
  { title: 'Acknowledged by Alex Morgan', detail: '11:31 · via mobile' },
  { title: 'Escalation paused', detail: '11:31 · Next: L2 in 25 min' },
];

export default function App() {
  return (
    <Post
      avatarSrc={botAvatarSrc}
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
        <CollapsibleSection title="Timeline" eventCount={timelineEvents.length}>
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
  );
}
