const TicketCommentBlock = ({ title, comment, author, date }) => {
  if (!comment) return null;

  return (
    <div className="card bg-base-100 p-4 shadow">
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm whitespace-pre-wrap">{comment}</p>
      <p className="text-sm whitespace-pre-wrap">{author}</p>
      <p className="text-sm whitespace-pre-wrap">
        {new Date(date).toLocaleString()}
      </p>
    </div>
  );
};

export default TicketCommentBlock;
