import React from 'react';
import moment from 'moment';

interface TodoProps {
    text: string;
    deadline: string;
    isDone: boolean;
    dateCompleted?: string;
    onToggle: () => void;
    onDelete: () => void; // Add onDelete as a prop
}

const Todo: React.FC<TodoProps> = ({ text, deadline, isDone, dateCompleted, onToggle, onDelete }) => {
    const formattedDeadline = moment(deadline).format('LL');
    const formattedDateCompleted = dateCompleted ? moment(dateCompleted).format('LLL') : '';

    return (
        <div className={`card mt-3 ${isDone ? 'done' : ''}`}>
            <div className="card-body">
                <div className='row'>
                    <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12 p-2'>
                        <input type="checkbox" checked={isDone} onChange={onToggle} className="form-check-input" />
                        <span className={`ms-2 ${isDone ? 'text-muted' : ''}`}>{text}</span>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 p-2'>
                        <span className={`badge badge-pill bg-${isDone ? 'success' : 'warning'}`}>
                            {isDone ? 'Completed' : 'Pending'}
                        </span>
                    </div>
                    <div className='d-flex flex-column col-lg-3 col-md-6 col-sm-6 col-xs-6 p-2 small'>
                        <span>Deadline: {formattedDeadline}</span>
                        {isDone && (
                            <span className="text-muted">Completed on: {formattedDateCompleted}</span>
                        )}
                    </div>
                    <div className='col-lg-2 col-md-6 col-sm-6 col-xs-6 p-2'>
                        <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={onDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todo;
