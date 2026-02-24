import useDelete from "../hooks/useDelete.jsx";

export default function CompletedTaskCard({_id, title, completedAt, status, returnFunc, tasks, taskSetter}) {

    const {DeletePrompt, onDeleteClick} = useDelete('single', _id, tasks, taskSetter)

    console.log(completedAt);

    completedAt = new Date(completedAt).toLocaleTimeString("en-GB", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

    return (
        <div className="task-card">
            <div className="task-info">
                <span className="name">{title}</span>
                <span 
                className={status === 'completed-expired' ? 'expired' : 'deadline'}>
                    {status === 'completed-expired' ? 'Completed After Expiration:' : 'Completed At:'} {completedAt}
                    </span>
            </div>
            <div className="task-actions">
                <button onClick={() => {returnFunc(_id)}}>↩</button>
                <button onClick={onDeleteClick}>🗑</button>
            </div>
            {DeletePrompt}
        </div>
    )
}