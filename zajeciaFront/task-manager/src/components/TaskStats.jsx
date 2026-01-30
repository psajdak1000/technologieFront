function TaskStats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="task-stats" style={{ textAlign: 'center', marginBottom: '20px' }}>
      <span>Razem: {total} | </span>
      <span>Ukończone: {completed} | </span>
      <span>Postęp: {percentage}%</span>
    </div>
  );
}
export default TaskStats;