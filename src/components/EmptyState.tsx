type Props = {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
};

export default function EmptyState({
  title,
  description,
  buttonText,
  onClick,
}: Props) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onClick}>{buttonText}</button>
    </div>
  );
}
