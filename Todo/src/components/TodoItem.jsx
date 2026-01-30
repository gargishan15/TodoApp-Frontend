export default function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  return (
    <div style={card}>
      <h4
        style={{
          textDecoration: todo.isCompleted ? "line-through" : "none"
        }}
      >
        {todo.title}
      </h4>

      <p>{todo.description}</p>

      <div>
        <button style={btn} onClick={() => onToggle(todo)}>
          {todo.isCompleted ? "Undo" : "Complete"}
        </button>

        <button style={btn} onClick={() => onEdit(todo._id)}>
          Edit
        </button>

        <button
          style={{ ...btn, backgroundColor: "#dc2626", color: "#fff" }}
          onClick={() => onDelete(todo._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

const card = {
  border: "1px solid #ccc",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "5px"
};

const btn = {
  padding: "6px 10px",
  marginRight: "10px",
  cursor: "pointer"
};
