export default function HighlightText({
  children,
  as: Tag = "strong",
  tone = "gold",
  className = "",
}) {
  const classes = ["concept-highlight", `concept-highlight--${tone}`, className]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
